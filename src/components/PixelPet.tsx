"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── Sprite palette ─────────────────────────────────
   Matches the Settle accent (#D97757) with a darker
   shade for outline/shadow. Pet faces right; direction
   flips the entire SVG via scaleX(-1). */

const O = "#D97757";
const D = "#A8553E";
const E = "#141413";
type Pixel = string | null;
const _: Pixel = null;

/* Three-frame walk cycle. Grid is 14×10 — small enough
   to render as SVG rects without blowing up the DOM,
   big enough for a visible blob with eyes + legs. */
const FRAMES: Pixel[][][] = [
  /* Frame 0 — contact pose, all legs planted */
  [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, O, O, O, O, O, O, D, _, _, _],
    [_, _, D, O, O, O, O, O, O, O, O, D, _, _],
    [_, D, O, O, E, O, O, O, O, E, O, O, D, _],
    [_, D, O, O, O, O, O, O, O, O, O, O, D, _],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [_, D, D, _, D, _, D, D, _, D, _, D, D, _],
    [_, D, _, _, D, _, _, D, _, D, _, _, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ],
  /* Frame 1 — stride A (left legs lifted) */
  [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, O, O, O, O, O, O, D, _, _, _],
    [_, _, D, O, O, O, O, O, O, O, O, D, _, _],
    [_, D, O, O, E, O, O, O, O, E, O, O, D, _],
    [_, D, O, O, O, O, O, O, O, O, O, O, D, _],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [_, _, _, D, D, _, D, _, _, D, D, _, D, _],
    [_, _, _, _, _, _, _, _, _, _, D, _, D, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ],
  /* Frame 2 — stride B (right legs lifted) */
  [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, O, O, O, O, O, O, D, _, _, _],
    [_, _, D, O, O, O, O, O, O, O, O, D, _, _],
    [_, D, O, O, E, O, O, O, O, E, O, O, D, _],
    [_, D, O, O, O, O, O, O, O, O, O, O, D, _],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [D, O, O, O, O, O, O, O, O, O, O, O, O, D],
    [_, D, _, _, D, D, _, D, _, _, D, D, _, _],
    [_, D, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ],
];

const SPRITE_W = FRAMES[0][0].length;
const SPRITE_H = FRAMES[0].length;

interface PixelPetProps {
  /** Pixel size multiplier. Final sprite width = SPRITE_W × scale. */
  scale?: number;
  /** Walking speed in screen-pixels per second. */
  walkSpeed?: number;
  /** Milliseconds between sprite frames (walk cycle speed). */
  frameMs?: number;
  /** Optional offset from the top of the parent, in pixels. */
  offsetY?: number;
  className?: string;
}

export function PixelPet({
  scale = 4,
  walkSpeed = 28,
  frameMs = 180,
  offsetY = 4,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [x, setX] = useState(12);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [containerWidth, setContainerWidth] = useState(0);

  /* Respect prefers-reduced-motion. useSyncExternalStore is the canonical
     pattern for subscribing to external sources like matchMedia — it
     handles SSR and avoids the "setState in effect" cascading-render
     warning that plain useEffect + setState triggers. */
  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Measure the parent's width so the pet bounces between its edges.
     ResizeObserver fires its callback on `observe`, so no synchronous
     initial setState is needed — the first callback delivers the starting
     width asynchronously (avoids the cascading-render lint). */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el?.parentElement) return;
    const parent = el.parentElement;
    const ro = new ResizeObserver(() => {
      setContainerWidth(parent.clientWidth);
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  /* Walk-cycle frame advance */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, frameMs);
    return () => clearInterval(id);
  }, [reduced, frameMs]);

  /* Position: move at walkSpeed px/s, bounce at edges.
     rAF for smooth motion; direction flips on contact. */
  useEffect(() => {
    if (reduced || containerWidth === 0) return;
    const spritePx = SPRITE_W * scale;
    const maxX = Math.max(0, containerWidth - spritePx);

    let last = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setX((prev) => {
        let next = prev + walkSpeed * direction * dt;
        if (next >= maxX) {
          next = maxX;
          setDirection(-1);
        } else if (next <= 0) {
          next = 0;
          setDirection(1);
        }
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced, containerWidth, direction, walkSpeed, scale]);

  const sprite = FRAMES[frame];

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute ${className}`}
      style={{
        bottom: `calc(100% + ${offsetY}px)`,
        left: `${x}px`,
        width: SPRITE_W * scale,
        height: SPRITE_H * scale,
        transform: direction === -1 ? "scaleX(-1)" : undefined,
        transformOrigin: "center",
      }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${SPRITE_W} ${SPRITE_H}`}
        width={SPRITE_W * scale}
        height={SPRITE_H * scale}
        shapeRendering="crispEdges"
        style={{ display: "block" }}
      >
        {sprite.map((row, y) =>
          row.map((color, px) =>
            color ? (
              <rect
                key={`${y}-${px}`}
                x={px}
                y={y}
                width={1}
                height={1}
                fill={color}
              />
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}
