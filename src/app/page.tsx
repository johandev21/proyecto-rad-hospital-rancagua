import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button variant="link" asChild>
        <Link href="/dashboard">Go to the Dashboard</Link>
      </Button>
    </div>
  );
}
