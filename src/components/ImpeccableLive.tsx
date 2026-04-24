"use client";

import { useEffect } from "react";

/**
 * Dev-only loader for the impeccable live picker script.
 * - Bypasses Next.js Server Component script filtering by injecting at runtime.
 * - Auto-noop in production; auto-dedupes if the element already exists.
 * - Safe to leave in the tree; it's an empty component.
 */
export function ImpeccableLive() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const id = "impeccable-live-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "http://localhost:8400/live.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);
  return null;
}
