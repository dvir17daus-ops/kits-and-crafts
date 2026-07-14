"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface FlightItem {
  id: number;
  src: string;
  start: { top: number; left: number; width: number; height: number };
  end: { top: number; left: number };
}

interface FlyToCartContextValue {
  registerTarget: (el: HTMLElement | null) => void;
  fly: (src: string, fromEl: HTMLElement | null) => void;
}

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

function FlyingImage({
  item,
  onDone,
}: {
  item: FlightItem;
  onDone: (id: number) => void;
}) {
  const [phase, setPhase] = useState<"start" | "flying">("start");

  const handleRef = (el: HTMLImageElement | null) => {
    if (!el) return;
    requestAnimationFrame(() => setPhase("flying"));
  };

  const style =
    phase === "start"
      ? {
          top: item.start.top,
          left: item.start.left,
          width: item.start.width,
          height: item.start.height,
          opacity: 1,
          transform: "scale(1) rotate(0deg)",
        }
      : {
          top: item.end.top,
          left: item.end.left,
          width: 16,
          height: 16,
          opacity: 0,
          transform: "scale(0.3) rotate(25deg)",
        };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={handleRef}
      src={item.src}
      alt=""
      aria-hidden="true"
      onTransitionEnd={() => onDone(item.id)}
      style={{
        position: "fixed",
        zIndex: 100,
        borderRadius: "9999px",
        objectFit: "cover",
        pointerEvents: "none",
        boxShadow: "0 8px 20px -4px rgba(28,43,58,0.4)",
        transition: "all 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        ...style,
      }}
    />
  );
}

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const targets = useRef<HTMLElement[]>([]);
  const [items, setItems] = useState<FlightItem[]>([]);

  const registerTarget = useCallback((el: HTMLElement | null) => {
    if (!el || targets.current.includes(el)) return;
    targets.current.push(el);
  }, []);

  const fly = useCallback((src: string, fromEl: HTMLElement | null) => {
    if (!fromEl) return;
    const target = targets.current.find((t) => {
      const r = t.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (!target) return;

    const startRect = fromEl.getBoundingClientRect();
    const endRect = target.getBoundingClientRect();

    const item: FlightItem = {
      id: Date.now() + Math.random(),
      src,
      start: {
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
      },
      end: {
        top: endRect.top + endRect.height / 2 - 8,
        left: endRect.left + endRect.width / 2 - 8,
      },
    };

    setItems((prev) => [...prev, item]);
  }, []);

  const handleDone = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <FlyToCartContext.Provider value={{ registerTarget, fly }}>
      {children}
      {items.map((item) => (
        <FlyingImage key={item.id} item={item} onDone={handleDone} />
      ))}
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}
