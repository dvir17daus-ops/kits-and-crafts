"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lastRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const next = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));

      // Ignore tiny jitter so the bar doesn't flicker on small scroll / layout shifts
      if (Math.abs(next - lastRef.current) < 0.15) return;
      lastRef.current = next;
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-right bg-gradient-to-l from-orange via-pink to-accent will-change-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
