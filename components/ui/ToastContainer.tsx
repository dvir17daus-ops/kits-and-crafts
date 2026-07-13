"use client";

import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-sand bg-white px-4 py-3 shadow-lg",
            "animate-in slide-in-from-bottom-2 duration-300"
          )}
        >
          <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
          <span className="text-sm font-medium text-slate">{toast.message}</span>
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                dismissToast(toast.id);
              }}
              className="mr-2 text-sm font-semibold text-primary hover:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
