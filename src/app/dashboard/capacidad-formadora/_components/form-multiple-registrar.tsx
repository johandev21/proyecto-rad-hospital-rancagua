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
  TableRow 
} from "@/components/ui/table";

// Define the expected structure of a row from the Excel file
interface CapacidadRow {
  Servicio: string;
  Carrera: string;
  "Nivel de Formacion": string;
  "Tipo de Practica": "Curricular" | "Internado";
  "Centro Formador": string;
  "Año de Formacion": string;
  "Tipo de Jornada": "AM - PM" | "Diurno" | "Cuarto Turno";
  "N° de Cupos": number;
}

// These must match the Excel column headers exactly
const requiredColumns = [
    "Servicio",
    "Carrera",
    "Nivel de Formacion",
    "Tipo de Practica",
    "Centro Formador",
    "Año de Formacion",
    "Tipo de Jornada",
    "N° de Cupos",
];

export function FormularioRegistrarMultiple() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CapacidadRow[]>([]);
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
          
          // Validate headers
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
          const missingColumns = requiredColumns.filter(col => !headers?.includes(col));

          if (missingColumns.length > 0) {
              throw new Error(`Faltan las siguientes columnas obligatorias: ${missingColumns.join(", ")}`);
          }
          
          const jsonData = XLSX.utils.sheet_to_json<CapacidadRow>(worksheet);

          if (jsonData.length === 0) {
            throw new Error("El archivo Excel está vacío o no contiene datos.");
          }
          
          setData(jsonData);
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
      console.log("Datos a enviar:", data);
      // NOTE: Replace console.log with your API call to save the data
      alert(`${data.length} registros han sido procesados exitosamente (revisa la consola para ver los datos).`);
      handleRemoveFile();
    } else {
      setError("No hay datos para guardar. Por favor, sube un archivo válido.");
    }
  };
  
  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{}], { header: requiredColumns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, "plantilla_capacidad_formadora.xlsx");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Sube un archivo Excel (.xlsx, .xls) con los registros. Las columnas deben coincidir exactamente con los campos del formulario.
        </p>
        <Button type="button" variant="outline" size="sm" onClick={handleDownloadTemplate}>
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
              : "Arrastra y suelta un archivo aquí, o haz clic para seleccionar"}
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
            <h3 className="font-semibold">Previsualización de Datos ({data.length} registros encontrados)</h3>
            <div className="rounded-md border max-h-60 overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-background">
                        <TableRow>
                            {requiredColumns.map(col => <TableHead key={col}>{col}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 5).map((row, index) => (
                            <TableRow key={index}>
                               <TableCell>{row.Servicio}</TableCell>
                               <TableCell>{row.Carrera}</TableCell>
                               <TableCell>{row["Nivel de Formacion"]}</TableCell>
                               <TableCell>{row["Tipo de Practica"]}</TableCell>
                               <TableCell>{row["Centro Formador"]}</TableCell>
                               <TableCell>{row["Año de Formacion"]}</TableCell>
                               <TableCell>{row["Tipo de Jornada"]}</TableCell>
                               <TableCell className="text-right">{row["N° de Cupos"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {data.length > 5 && <p className="text-sm text-center text-muted-foreground">Mostrando 5 de {data.length} registros.</p>}
         </div>
      )}
      
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={data.length === 0}>Guardar {data.length > 0 ? data.length : ''} Registros</Button>
      </div>
    </form>
  );
}