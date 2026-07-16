"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4000;

export function getProductImages(product: Product): string[] {
  if (product.images?.length) {
    return product.images.filter(Boolean);
  }
  return product.image ? [product.image] : [];
}

interface ProductImageGalleryProps {
  product: Product;
  /** Card grid vs modal detail */
  variant?: "card" | "modal";
  className?: string;
  imageRef?: React.Ref<HTMLDivElement>;
  enableLightbox?: boolean;
  /** When false, only the maximize button opens lightbox (card click still opens product). */
  lightboxOnImageClick?: boolean;
}

export function ProductImageGallery({
  product,
  variant = "modal",
  className,
  imageRef,
  enableLightbox = true,
  lightboxOnImageClick = true,
}: ProductImageGalleryProps) {
  const images = getProductImages(product);
  const count = images.length;
  const multi = count > 1;
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
    setLightbox(false);
  }, [product.id]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count < 2) return;
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  const goTo = useCallback(
    (i: number) => {
      if (count < 1) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  // Autoplay — shared between compact view and lightbox
  useEffect(() => {
    if (!multi || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [multi, paused, count, index]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setLightbox(false);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        go(1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightbox, go]);

  if (count === 0) return null;

  const current = images[index] ?? images[0];
  const isCard = variant === "card";

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null || count < 2) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    // Swipe left → next; swipe right → previous (natural for RTL browsing)
    go(delta < 0 ? 1 : -1);
  };

  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const openLightbox = (e: React.MouseEvent) => {
    if (!enableLightbox) return;
    e.stopPropagation();
    setLightbox(true);
  };

  const arrows = multi ? (
    <>
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          go(-1);
        }}
        aria-label="תמונה קודמת"
        className={cn(
          "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate shadow-md transition hover:bg-white",
          isCard ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          go(1);
        }}
        aria-label="תמונה הבאה"
        className={cn(
          "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate shadow-md transition hover:bg-white",
          isCard ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </>
  ) : null;

  const dots = multi ? (
    <div
      className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5"
      onClick={stop}
    >
      {images.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`תמונה ${i + 1}`}
          aria-current={i === index}
          onClick={(e) => {
            stop(e);
            goTo(i);
          }}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i === index ? "w-4 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
          )}
        />
      ))}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={imageRef}
        className={cn(
          "relative overflow-hidden bg-cream-dark",
          isCard ? "aspect-[4/5] sm:aspect-square" : "aspect-square rounded-xl",
          className
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {lightboxOnImageClick && enableLightbox ? (
          <button
            type="button"
            className="absolute inset-0 z-0"
            onClick={openLightbox}
            aria-label={`הגדלת תמונה — ${product.title}`}
          >
            <Image
              src={current}
              alt={`${product.title}${multi ? ` — תמונה ${index + 1} מתוך ${count}` : ""}`}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isCard && "group-hover:scale-105"
              )}
              sizes={
                isCard
                  ? "(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  : "(max-width:768px) 100vw, 50vw"
              }
              priority={variant === "modal"}
            />
          </button>
        ) : (
          <Image
            src={current}
            alt={`${product.title}${multi ? ` — תמונה ${index + 1} מתוך ${count}` : ""}`}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              isCard && "group-hover:scale-105"
            )}
            sizes={
              isCard
                ? "(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                : "(max-width:768px) 100vw, 50vw"
            }
            priority={variant === "modal"}
          />
        )}

        {enableLightbox && (
          <button
            type="button"
            onClick={openLightbox}
            aria-label="הגדלת תמונה"
            className={cn(
              "absolute left-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-slate shadow-md transition hover:bg-white",
              isCard ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}

        {arrows}
        {dots}
      </div>

      {lightbox && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={`גלריית תמונות — ${product.title}`}
              onClick={() => setLightbox(false)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(false);
                }}
                aria-label="סגור תמונה מוגדלת"
                className="absolute left-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate shadow-lg transition hover:bg-cream sm:left-5 sm:top-5"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>

              {multi ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    aria-label="תמונה קודמת"
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 text-slate shadow-lg transition hover:bg-cream sm:right-6"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    aria-label="תמונה הבאה"
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 text-slate shadow-lg transition hover:bg-cream sm:left-6"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </>
              ) : null}

              <div
                className="relative z-10 h-[min(85vh,900px)] w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onKeyDown={(e: ReactKeyboardEvent) => e.stopPropagation()}
              >
                <Image
                  src={current}
                  alt={`${product.title} — תמונה מוגדלת`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  unoptimized={current.includes("googleusercontent") || current.includes("drive.google")}
                />
              </div>

              {multi ? (
                <p className="absolute bottom-5 z-20 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white">
                  {index + 1} / {count}
                </p>
              ) : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
