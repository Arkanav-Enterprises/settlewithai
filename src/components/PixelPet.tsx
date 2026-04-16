"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── Sprite palette ─────────────────────────────────
   Matches Aurelien's original: solid orange body (no dark
   outline), black eye pixels, a muted-gray trailing leg that
   appears only in profile frames. */

const O = "#D97757";
const E = "#141413";
const G = "#7A7370";
type Pixel = string | null;
const _: Pixel = null;

/* ─── Frame set ──────────────────────────────────────
   Three poses:
   0 FORWARD_IDLE    — head-on, 2 eyes symmetric, 4 legs planted
   1 PROFILE_STRIDE_A — facing right, body extended, back legs lifted
   2 PROFILE_STRIDE_B — facing right, body compressed, front legs lifted
   When walking left, the entire sprite flips via scaleX(-1). */

/* Sprite grids. Canvas is 18 wide × 8 tall — wide enough to
   include the gray staircase trail that rises up-right from
   the pet's back in the profile frames. All frames share a
   common canvas so direction flips are stable. */

const FORWARD_IDLE: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _],
  [_, _, _, O, E, O, O, O, E, O, _, _, _, _, _, _, _, _],
  [_, O, O, O, O, O, O, O, O, O, O, O, _, _, _, _, _, _],
  [_, O, O, O, O, O, O, O, O, O, O, O, _, _, _, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _, _, _, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, _, _, _, _, _, _, _, _],
];

const PROFILE_A: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, _, _, _, _, _, _, _, G, G],
  [_, _, _, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _],
  [_, _, _, O, E, O, O, O, E, O, O, _, _, _, G, G, _, _],
  [_, _, _, O, O, O, O, O, O, O, O, O, _, G, G, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, O, O, G, G, _, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, O, O, _, _, _, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, O, _, _, _, _, _, _, _],
  [_, _, _, O, _, O, _, _, _, O, _, _, _, _, _, _, _, _],
];

const PROFILE_B: Pixel[][] = [
  [_, _, _, O, O, O, O, O, O, _, _, _, _, _, _, _, G, G],
  [_, _, _, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _],
  [_, _, _, O, E, O, O, O, E, O, O, _, _, _, G, G, _, _],
  [_, _, _, O, O, O, O, O, O, O, O, O, _, G, G, _, _, _],
  [_, _, _, O, O, O, O, O, O, O, O, O, G, G, _, _, _, _],
  [_, _, _, _, O, _, O, _, O, O, O, O, _, _, _, _, _, _],
  [_, _, _, O, O, O, _, O, _, O, O, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, O, _, _, _, _, _, _, _, _],
];

const FRAMES: Pixel[][][] = [FORWARD_IDLE, PROFILE_A, PROFILE_B];
const FORWARD = 0;
const WALK_A = 1;
const WALK_B = 2;

const SPRITE_W = FRAMES[0][0].length;
const SPRITE_H = FRAMES[0].length;

interface PixelPetProps {
  /** Pixel size multiplier. Final sprite width = SPRITE_W × scale. */
  scale?: number;
  /** Walking speed in screen-pixels per second. */
  walkSpeed?: number;
  /** Walk-cycle frame duration (ms per stride frame). */
  frameMs?: number;
  /** Idle dwell duration when pet stops to face forward (ms). */
  idleMs?: number;
  /** Minimum pixels walked before an idle is allowed to trigger. */
  minWalkPx?: number;
  /** Gap in px between pet bottom and the parent's top edge. */
  offsetY?: number;
  className?: string;
}

/* Simple state machine: the pet walks a random distance, pauses
   in forward-idle, flips direction some of the time, then walks again.
   All durations are parameterised so tuning feels natural. */
type Behaviour =
  | { kind: "walk"; direction: 1 | -1; distanceLeft: number }
  | { kind: "idle"; direction: 1 | -1; msLeft: number };

export function PixelPet({
  scale = 3,
  walkSpeed = 22,
  frameMs = 200,
  idleMs = 1400,
  minWalkPx = 60,
  offsetY = 4,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(FORWARD);
  const [x, setX] = useState(12);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const behaviourRef = useRef<Behaviour>({
    kind: "walk",
    direction: 1,
    distanceLeft: 140,
  });

  /* Respect prefers-reduced-motion via useSyncExternalStore — avoids
     the cascading-render warning that plain useEffect + setState hits. */
  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Watch parent width so the pet bounces between its edges. */
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

  /* Walk-cycle frame advance. Only animates stride frames while walking;
     during idle the sprite stays on FORWARD. */
  useEffect(() => {
    if (reduced) return;
    let strideToggle: 1 | 2 = WALK_A;
    const id = setInterval(() => {
      const b = behaviourRef.current;
      if (b.kind === "walk") {
        strideToggle = strideToggle === WALK_A ? WALK_B : WALK_A;
        setFrame(strideToggle);
      } else {
        setFrame(FORWARD);
      }
    }, frameMs);
    return () => clearInterval(id);
  }, [reduced, frameMs]);

  /* Position + behaviour state machine driven by rAF for smooth motion. */
  useEffect(() => {
    if (reduced || containerWidth === 0) return;
    const spritePx = SPRITE_W * scale;
    const maxX = Math.max(0, containerWidth - spritePx);

    let last = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dtMs = now - last;
      const dt = dtMs / 1000;
      last = now;
      const b = behaviourRef.current;

      if (b.kind === "walk") {
        setX((prev) => {
          const step = walkSpeed * b.direction * dt;
          let next = prev + step;
          let hitEdge = false;
          if (next >= maxX) {
            next = maxX;
            hitEdge = true;
          } else if (next <= 0) {
            next = 0;
            hitEdge = true;
          }

          const walked = Math.abs(step);
          const distanceLeft = b.distanceLeft - walked;

          if (hitEdge || distanceLeft <= 0) {
            /* Pause in forward-idle, then pick a new direction */
            const flip = hitEdge || Math.random() < 0.45;
            const nextDir: 1 | -1 = flip
              ? ((-b.direction) as 1 | -1)
              : b.direction;
            behaviourRef.current = {
              kind: "idle",
              direction: nextDir,
              msLeft: idleMs * (0.6 + Math.random() * 0.8),
            };
            setDirection(nextDir);
          } else {
            behaviourRef.current = { ...b, distanceLeft };
          }
          return next;
        });
      } else {
        /* idle — count down, then resume walking */
        const msLeft = b.msLeft - dtMs;
        if (msLeft <= 0) {
          const distance = minWalkPx + Math.random() * 180;
          behaviourRef.current = {
            kind: "walk",
            direction: b.direction,
            distanceLeft: distance,
          };
        } else {
          behaviourRef.current = { ...b, msLeft };
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced, containerWidth, walkSpeed, idleMs, minWalkPx, scale]);

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
