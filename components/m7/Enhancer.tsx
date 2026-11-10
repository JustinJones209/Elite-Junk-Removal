"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Runs lib/enhance.ts after hydration and after each client-side route change. */
export function Enhancer() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    import("@/lib/enhance").then((m) => {
      if (!cancelled) m.enhance(document);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);
  return null;
}
