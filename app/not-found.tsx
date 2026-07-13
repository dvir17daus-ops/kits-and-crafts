import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-narrow flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-slate">404</h1>
      <p className="mt-4 text-xl text-muted">הדף לא נמצא</p>
      <Link href="/" className="mt-8">
        <Button>חזרה לדף הבית</Button>
      </Link>
    </div>
  );
}
