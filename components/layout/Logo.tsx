import Link from "next/link";
import Image from "next/image";
import { SITE_NAME_HE } from "@/lib/constants";
import { BrandMark } from "@/components/brand/BrandMark";
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
      {!small && <BrandMark size="md" light={light} showSlogan={false} />}
      {small && (
        <span
          className={cn(
            "font-brand text-base font-bold sm:hidden",
            light ? "text-white" : "text-brand-teal"
          )}
        >
          {SITE_NAME_HE}
        </span>
      )}
    </Link>
  );
}
