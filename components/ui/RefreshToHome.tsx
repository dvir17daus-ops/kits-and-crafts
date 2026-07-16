"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * On a hard browser refresh (F5 / pull-to-refresh), always return to the homepage.
 * Normal link navigation is unaffected.
 */
export function RefreshToHome() {
  const router = useRouter();

  useEffect(() => {
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;

    if (nav?.type !== "reload") return;
    if (window.location.pathname === "/") return;

    router.replace("/");
  }, [router]);

  return null;
}
