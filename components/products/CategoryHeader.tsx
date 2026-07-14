import Link from "next/link";

interface CategoryHeaderProps {
  title: string;
  description: string;
  breadcrumb?: string;
}

export function CategoryHeader({
  title,
  description,
  breadcrumb,
}: CategoryHeaderProps) {
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
