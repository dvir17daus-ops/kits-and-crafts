"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    lockScroll();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && panelRef.current) {
        const focusable =
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus({ preventScroll: true });
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };
    document.addEventListener("keydown", handleKey);

    // Focus close button without scrolling the page underneath.
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    });

    return () => {
      unlockScroll();
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <button
        type="button"
        aria-label="סגור חלון"
        tabIndex={-1}
        className="absolute inset-0 bg-slate/50 backdrop-blur-sm"
        onClick={() => onCloseRef.current()}
      />

      <div
        ref={panelRef}
        className={cn(
          "relative z-10 flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl",
          "max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)]",
          "animate-[modal-in_0.35s_cubic-bezier(0.16,1,0.3,1)_both]",
          {
            "max-w-lg": size === "md",
            "max-w-2xl": size === "lg",
            "max-w-4xl": size === "xl",
          },
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-sand bg-white px-4 py-3 sm:px-6 sm:py-4">
          {title ? (
            <h2
              id="modal-title"
              className="min-w-0 flex-1 truncate text-lg font-bold text-slate sm:text-xl"
            >
              {title}
            </h2>
          ) : (
            <span className="flex-1" />
          )}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => onCloseRef.current()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-dark text-slate transition-colors hover:bg-sand hover:text-slate"
            aria-label="סגור"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
