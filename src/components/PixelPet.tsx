"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── Palette ──────────────────────────────────────── */
const O = "#D97757"; // body
const E = "#141413"; // eyes
type Pixel = string | null;
const _: Pixel = null;

/* ─── Sprite grids ─────────────────────────────────────
   Canvas 13×10. Body is a rounded block (cols 3-9, rows 0-4).
   Four legs are vertical sticks at cols 3, 5, 7, 9.
   Two arms are 3-pixel diagonals that oscillate between a
   45° pose (FRAME_A) and a 30° pose (FRAME_B). The leg
   cycle alternates which pair is fully extended vs short.

   Eyes ride on IDLE/WINK/BLINK variants that share the same
   arm+leg frame so the eye-change doesn't disturb stride. */

/* ── FRAME A: arms at 45°, legs 1+3 long, legs 2+4 short ── */
const FRAME_A_IDLE: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, E, O, O, O, E, O, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, O, _, O, _, O, _, O, O, _, _], // arm segment 1 (col 2, col 10), legs
  [_, O, _, O, _, _, _, _, _, O, _, O, _], // arm segment 2, long legs
  [O, _, _, _, _, _, _, _, _, _, _, _, O], // arm tips
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAME_A_WINK: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, O, O, O, O, E, O, _, _, _], // left eye closed
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, O, _, O, _, O, _, O, O, _, _],
  [_, O, _, O, _, _, _, _, _, O, _, O, _],
  [O, _, _, _, _, _, _, _, _, _, _, _, O],
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAME_A_BLINK: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _], // both eyes closed
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, O, _, O, _, O, _, O, O, _, _],
  [_, O, _, O, _, _, _, _, _, O, _, O, _],
  [O, _, _, _, _, _, _, _, _, _, _, _, O],
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

/* ── FRAME B: arms at 30° (more horizontal), legs 1+3 short, 2+4 long ── */
const FRAME_B_IDLE: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, E, O, O, O, E, O, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, _, _, O, _, O, _, _, O, _, _], // arms shift + different leg pair long
  [_, O, _, _, O, O, _, O, O, _, _, O, _],
  [O, _, _, _, _, _, _, _, _, _, _, _, O],
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAME_B_WINK: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, O, O, O, O, E, O, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, _, _, O, _, O, _, _, O, _, _],
  [_, O, _, _, O, O, _, O, O, _, _, O, _],
  [O, _, _, _, _, _, _, _, _, _, _, _, O],
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAME_B_BLINK: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _],
  [_, _, O, _, _, O, _, O, _, _, O, _, _],
  [_, O, _, _, O, O, _, O, O, _, _, O, _],
  [O, _, _, _, _, _, _, _, _, _, _, _, O],
  [_, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAMES = {
  a_idle: FRAME_A_IDLE,
  a_wink: FRAME_A_WINK,
  a_blink: FRAME_A_BLINK,
  b_idle: FRAME_B_IDLE,
  b_wink: FRAME_B_WINK,
  b_blink: FRAME_B_BLINK,
} as const;

type FrameKey = keyof typeof FRAMES;

const SPRITE_W = FRAME_A_IDLE[0].length;
const SPRITE_H = FRAME_A_IDLE.length;

interface PixelPetProps {
  scale?: number;
  frameMs?: number;
  offsetY?: number;
  className?: string;
}

export function PixelPet({
  scale = 4,
  frameMs = 280,
  offsetY = 2,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<FrameKey>("a_idle");

  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Typing loop: alternate arm/leg frames A ↔ B at frameMs cadence.
     Eye state (idle/wink/blink) is a separate overlay — ~8% chance
     per tick of a wink or blink on either arm frame. */
  useEffect(() => {
    if (reduced) return;
    let armToggle: "a" | "b" = "a";
    const id = setInterval(() => {
      armToggle = armToggle === "a" ? "b" : "a";
      const roll = Math.random();
      const eye: "idle" | "wink" | "blink" =
        roll < 0.06 ? "blink" : roll < 0.12 ? "wink" : "idle";
      setFrame(`${armToggle}_${eye}` as FrameKey);
    }, frameMs);
    return () => clearInterval(id);
  }, [reduced, frameMs]);

  const sprite = FRAMES[frame];

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute ${className}`}
      style={{
        bottom: `calc(100% + ${offsetY}px)`,
        left: 14,
        width: SPRITE_W * scale,
        height: SPRITE_H * scale,
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
