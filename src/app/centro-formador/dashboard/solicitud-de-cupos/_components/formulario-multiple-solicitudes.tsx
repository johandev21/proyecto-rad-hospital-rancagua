"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download, File, UploadCloud, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define la estructura de una fila del Excel
interface SolicitudRow {
  "Carrera": string;
  "Año de Formación": string;
  "Tipo de Practica": "Curricular" | "Profesional" | "Internado";
  "Servicio Clínico": string;
  "N° de Cupos": number;
  "Tipo de Jornada": "Diurna" | "4 Turno";
  "N° de Alumnos": number;
  "Asignatura": string;
  "Fecha Inicio": string; // Se mantiene como string para simplicidad en la lectura
  "Fecha Termino": string;
}

// Las cabeceras deben coincidir exactamente con las del archivo Excel
const requiredColumns = [
    "Carrera",
    "Año de Formación",
    "Tipo de Practica",
    "Servicio Clínico",
    "N° de Cupos",
    "Tipo de Jornada",
    "N° de Alumnos",
    "Asignatura",
    "Fecha Inicio",
    "Fecha Termino",
];

export function FormularioMultipleSolicitudes() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<SolicitudRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setError(null);
      setData([]);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const binaryStr = event.target?.result;
          if (!binaryStr) {
            throw new Error("Error al leer el archivo.");
          }
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
          const missingColumns = requiredColumns.filter(col => !headers?.includes(col));

          if (missingColumns.length > 0) {
              throw new Error(`Faltan las siguientes columnas obligatorias: ${missingColumns.join(", ")}`);
          }

          // Convertimos fechas de Excel (números de serie) a formato dd/mm/yyyy
          const jsonData = XLSX.utils.sheet_to_json<any>(worksheet).map(row => {
            const formatDate = (dateValue: any) => {
              if (typeof dateValue === 'number') {
                const date = XLSX.SSF.parse_date_code(dateValue);
                return `${String(date.d).padStart(2, '0')}/${String(date.m).padStart(2, '0')}/${date.y}`;
              }
              return dateValue;
            };
            
            row["Fecha Inicio"] = formatDate(row["Fecha Inicio"]);
            row["Fecha Termino"] = formatDate(row["Fecha Termino"]);
            return row;
          });

          if (jsonData.length === 0) {
            throw new Error("El archivo Excel está vacío o no contiene datos.");
          }
          
          setData(jsonData as SolicitudRow[]);
        } catch (e: any) {
          setError(`Error al procesar el archivo: ${e.message}`);
          setFile(null);
          setData([]);
        }
      };
      reader.onerror = () => {
        setError("Hubo un error crítico al leer el archivo.");
        setFile(null);
      }
      reader.readAsBinaryString(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    multiple: false,
  });
  
  const handleRemoveFile = () => {
    setFile(null);
    setData([]);
    setError(null);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length > 0) {
      console.log("Datos de solicitudes a enviar:", data);
      alert(`${data.length} solicitudes han sido procesadas (revisa la consola para ver los datos).`);
      handleRemoveFile();
    } else {
      setError("No hay datos para enviar. Por favor, sube un archivo válido.");
    }
  };
  
  const handleDownloadTemplate = () => {
    // Crear una fila de ejemplo para guiar al usuario
    const exampleRow = {
      "Carrera": "Tens",
      "Año de Formación": "4º Semestre",
      "Tipo de Practica": "Curricular",
      "Servicio Clínico": "Medicina",
      "N° de Cupos": 8,
      "Tipo de Jornada": "Diurna",
      "N° de Alumnos": 8,
      "Asignatura": "Introducción a la Clínica",
      "Fecha Inicio": "03/03/2025",
      "Fecha Termino": "12/04/2025",
    };
    const ws = XLSX.utils.json_to_sheet([exampleRow], { header: requiredColumns });
    // Añadir una nota sobre el formato de fecha
    XLSX.utils.sheet_add_aoa(ws, [["NOTA: Asegúrese de que las columnas de fecha tengan formato de fecha (ej. DD/MM/AAAA) en Excel."]], { origin: "A3" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla Solicitudes");
    XLSX.writeFile(wb, "plantilla_solicitud_cupos.xlsx");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground max-w-md">
          Sube un archivo Excel (.xlsx, .xls) con las solicitudes. Las columnas deben coincidir con la plantilla.
        </p>
        <Button type="button" variant="outline" size="sm" onClick={handleDownloadTemplate} className="flex-shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Descargar Plantilla
        </Button>
      </div>
      
      {!file ? (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-muted-foreground" />
          <p className="mt-4 text-center text-muted-foreground">
            {isDragActive
              ? "Suelta el archivo aquí..."
              : "Arrastra y suelta un archivo, o haz clic para seleccionar"}
          </p>
        </div>
      ) : (
         <div className="flex items-center justify-between p-4 border rounded-md bg-muted/50">
            <div className="flex items-center gap-3">
                <File className="w-6 h-6 text-primary" />
                <span className="font-medium">{file.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                <X className="w-5 h-5" />
            </Button>
         </div>
      )}

      {error && (
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data.length > 0 && (
         <div className="space-y-4">
            <h3 className="font-semibold">Previsualización de Datos ({data.length} solicitudes encontradas)</h3>
            <div className="rounded-md border max-h-72 overflow-auto">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                        <TableRow>
                            {requiredColumns.map(col => <TableHead key={col}>{col}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 5).map((row, index) => (
                            <TableRow key={index}>
                               <TableCell className="whitespace-nowrap">{row.Carrera}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Año de Formación"]}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Tipo de Practica"]}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Servicio Clínico"]}</TableCell>
                               <TableCell className="text-center">{row["N° de Cupos"]}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Tipo de Jornada"]}</TableCell>
                               <TableCell className="text-center">{row["N° de Alumnos"]}</TableCell>
                               <TableCell>{row.Asignatura}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Fecha Inicio"]}</TableCell>
                               <TableCell className="whitespace-nowrap">{row["Fecha Termino"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {data.length > 5 && <p className="text-sm text-center text-muted-foreground">Mostrando 5 de {data.length} solicitudes.</p>}
         </div>
      )}
      
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={data.length === 0}>Enviar {data.length > 0 ? data.length : ''} Solicitudes</Button>
      </div>
    </form>
  );
}