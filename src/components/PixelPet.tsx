"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── PixelPet ───────────────────────────────────────
   Renders the pet as a single animated WebP built from
   every frame of Aurelien's source video (284 frames at
   24fps, downsampled to native 16×9 design-pixel resolution
   with a transparent background).

   The WebP animates itself via the browser — no JS frame
   cycling needed. image-rendering: pixelated ensures each
   native pixel maps crisply to scale screen pixels. */

const NATIVE_W = 16;
const NATIVE_H = 9;

interface PixelPetProps {
  scale?: number;
  offsetY?: number;
  className?: string;
}

export function PixelPet({
  scale = 4,
  offsetY = -8,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  /* Respect prefers-reduced-motion: browsers already pause animated
     WebPs when the system setting is on, but we also freeze the
     position logic here for consistency. */
  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Measure parent width so the pet sits inside the input bar. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el?.parentElement) return;
    const parent = el.parentElement;
    const ro = new ResizeObserver(() => setContainerWidth(parent.clientWidth));
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const spriteW = NATIVE_W * scale;
  const spriteH = NATIVE_H * scale;
  /* Anchor just to the left of center, same visual position the
     source video uses relative to its input bar. */
  const left = Math.max(12, Math.floor((containerWidth - spriteW) / 2));

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute ${className}`}
      style={{
        bottom: `calc(100% + ${offsetY}px)`,
        left: `${left}px`,
        width: spriteW,
        height: spriteH,
      }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pixel-pet.webp"
        alt=""
        width={spriteW}
        height={spriteH}
        style={{
          display: "block",
          width: spriteW,
          height: spriteH,
          imageRendering: "pixelated",
          animationPlayState: reduced ? "paused" : "running",
        }}
      />
    </div>
  );
}
