"use client";

import { useEffect, useRef } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Tab" && panelRef.current) {
          const focusable =
            panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKey);
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      return () => {
        unlockScroll();
        document.removeEventListener("keydown", handleKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate/50 backdrop-blur-sm" />
      <div
        ref={panelRef}
        className={cn(
          "relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl transition-all duration-300 sm:rounded-2xl",
          {
            "max-w-lg": size === "md",
            "max-w-2xl": size === "lg",
            "max-w-4xl": size === "xl",
          },
          className
        )}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-sand bg-white px-6 py-4">
          {title && (
            <h2 id="modal-title" className="text-xl font-bold text-slate">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="mr-auto rounded-lg p-2 text-muted transition-colors hover:bg-cream-dark hover:text-slate"
            aria-label="סגור"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
