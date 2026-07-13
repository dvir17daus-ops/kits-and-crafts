import Link from "next/link";
import { TreePine } from "lucide-react";
import { SITE_NAME, SITE_NAME_HE } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-105">
        <TreePine className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-slate">{SITE_NAME_HE}</span>
        <span className="text-xs text-muted">{SITE_NAME}</span>
      </div>
    </Link>
  );
}
