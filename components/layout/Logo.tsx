import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE_NAME_HE } from "@/lib/constants";
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
      <BrandMark
        size={small ? "sm" : "md"}
        light={light}
        showSlogan={!small && !light}
        className={cn(
          "transition-all duration-300",
          small && "scale-95",
          light && "[&_.text-brand-orange]:text-orange [&_.text-brand-teal]:text-white"
        )}
      />
    </Link>
  );
}
