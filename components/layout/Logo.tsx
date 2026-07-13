import Link from "next/link";
import { TreePine } from "lucide-react";
import { SITE_NAME, SITE_NAME_HE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
          light ? "bg-white text-teal-dark" : "bg-orange text-white"
        )}
      >
        <TreePine className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-lg font-bold",
            light ? "text-white" : "text-slate"
          )}
        >
          {SITE_NAME_HE}
        </span>
        <span className={cn("text-xs", light ? "text-white/70" : "text-muted")}>
          {SITE_NAME}
        </span>
      </div>
    </Link>
  );
}
