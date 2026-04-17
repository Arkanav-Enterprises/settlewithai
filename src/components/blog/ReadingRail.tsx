"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReadingRail — thin accent-orange progress bar pinned to the left edge.
 *
 * Fills from 0 → 100% as the article is scrolled. Uses a CSS custom
 * property (`--progress`) animated by the scroll listener so we don't
 * churn React state on every frame. Renders nothing on pages that don't
 * have an `<article>` element (the blog index, for example).
 *
 * The visual (fixed left rail, ::after fills) is defined in
 * `globals.css → .reading-rail`.
 */
export function ReadingRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [hasArticle, setHasArticle] = useState(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    setHasArticle(true);

    let frame = 0;
    const update = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;
      const start = article.getBoundingClientRect().top + window.scrollY;
      const end = start + article.scrollHeight - window.innerHeight;
      const raw = (window.scrollY - start) / Math.max(1, end - start);
      const clamped = Math.min(1, Math.max(0, raw));
      rail.style.setProperty("--progress", String(clamped));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!hasArticle) return null;

  return (
    <div
      ref={railRef}
      className="reading-rail hidden md:block"
      aria-hidden="true"
    />
  );
}
