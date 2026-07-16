import Link from "next/link";
import Image from "next/image";

interface CategoryHeaderProps {
  title: string;
  description: string;
  breadcrumb?: string;
  /** Optional full-bleed theme image behind the category title */
  image?: string;
}

export function CategoryHeader({
  title,
  description,
  breadcrumb,
  image,
}: CategoryHeaderProps) {
  if (image) {
    return (
      <div className="relative mb-10 overflow-hidden rounded-3xl">
        <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px]">
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-slate/75 via-slate/45 to-teal-deep/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate/55 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative flex min-h-[220px] flex-col justify-end p-6 sm:min-h-[280px] sm:p-8 md:min-h-[320px] md:p-10">
            {breadcrumb ? (
              <nav
                className="mb-3 text-sm text-white/80"
                aria-label="breadcrumb"
              >
                <Link href="/" className="hover:text-white">
                  דף הבית
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">{breadcrumb}</span>
              </nav>
            ) : null}
            <h1 className="font-logo text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {breadcrumb && (
        <nav className="mb-4 text-sm text-muted" aria-label="breadcrumb">
          <Link href="/" className="hover:text-primary">
            דף הבית
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate">{breadcrumb}</span>
        </nav>
      )}
      <h1 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted leading-relaxed sm:text-lg">
        {description}
      </p>
    </div>
  );
}
