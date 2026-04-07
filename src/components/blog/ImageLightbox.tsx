"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * ImageLightbox
 *
 * Mounts a single document-level click listener that captures clicks on any
 * <img> inside any <article> <figure> and opens it in a fullscreen modal.
 *
 * Mounted once via src/app/blog/layout.tsx — every blog post gets zoomable
 * images for free, no per-post changes.
 *
 * Closes on:
 *   - Backdrop click
 *   - X button click
 *   - Escape key
 *
 * Body scroll is locked while the modal is open. The image itself stops
 * propagation so clicking ON the image doesn't dismiss it.
 */
export function ImageLightbox() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(
    null
  );

  const close = useCallback(() => setActive(null), []);

  // Document-level click listener — captures clicks on any blog figure image
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== "IMG") return;
      // Only zoom images that are inside an <article> <figure> (i.e. blog body images)
      if (!target.closest("article figure")) return;
      e.preventDefault();
      const img = target as HTMLImageElement;
      setActive({ src: img.currentSrc || img.src, alt: img.alt });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Escape key + body scroll lock while modal is open
  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close]);

  // Add a `cursor: zoom-in` style to all blog figure images so users know
  // they're clickable. Done via a style tag rather than per-image CSS so old
  // posts get the affordance for free.
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-lightbox", "true");
    style.textContent = `article figure img { cursor: zoom-in; transition: opacity 150ms ease; } article figure img:hover { opacity: 0.92; }`;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={close}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 md:p-12 cursor-zoom-out backdrop-blur-sm"
      style={{ background: "rgba(20, 20, 19, 0.92)" }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        aria-label="Close image preview"
        className="fixed top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl leading-none border border-white/20 bg-white/10 hover:bg-white/20 transition-colors"
        style={{ backdropFilter: "blur(8px)" }}
      >
        &times;
      </button>
      <img
        src={active.src}
        alt={active.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] max-h-[90vh] object-contain rounded shadow-2xl cursor-default"
      />
    </div>
  );
}
