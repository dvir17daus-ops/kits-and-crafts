import Link from "next/link";
import Image from "next/image";
import { SITE_NAME_HE, SITE_TAGLINE_HE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo-hasadnaya.png"
          alt={SITE_NAME_HE}
          fill
          className="object-cover"
          sizes="44px"
        />
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
          {SITE_TAGLINE_HE}
        </span>
      </div>
    </Link>
  );
}
