import Link from "next/link";
import Image from "next/image";
import { SITE_NAME_HE, SITE_TAGLINE_HE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
  small?: boolean;
}

export function Logo({ light = false, small = false }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full bg-white shadow-sm transition-all duration-300 group-hover:scale-105",
          small
            ? "h-9 w-9"
            : "h-14 w-14 sm:h-12 sm:w-12 lg:h-11 lg:w-11"
        )}
      >
        <Image
          src="/images/logo-hasadnaya.png"
          alt={SITE_NAME_HE}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-logo transition-all duration-300",
            small ? "text-base" : "text-xl sm:text-lg",
            light ? "text-white" : "text-slate"
          )}
        >
          {SITE_NAME_HE}
        </span>
        <span
          className={cn(
            "text-xs transition-all duration-300",
            small ? "max-h-0 opacity-0" : "max-h-4 opacity-100",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {SITE_TAGLINE_HE}
        </span>
      </div>
    </Link>
  );
}
