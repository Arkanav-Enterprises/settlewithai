"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── Palette ────────────────────────────────────────
   Solid orange body, black eye pixels, muted-gray staircase
   trail. Matches Aurelien's sprite — no dark outline. */

const O = "#D97757";
const E = "#141413";
const G = "#7A7370";
type Pixel = string | null;
const _: Pixel = null;

/* ─── Sprite frames ───────────────────────────────────
   Canvas 18×9. The pet is asymmetric: left eye is a 1×2
   vertical block, right eye is a 1×1 pixel positioned LOWER
   and further RIGHT — which reads as "tilted head, looking
   down at the input bar." The gray staircase tail drops
   down-right from the body's lower-right.

   Four frames:
   0 IDLE        — both eyes open, looking at laptop
   1 WINK        — left eye closed (horizontal slit), right eye open
   2 WALK_A      — stride A, left/inner legs lifted
   3 WALK_B      — stride B, right/outer legs lifted */

/* Canvas 22×10: body occupies cols 2-11; staircase tail extends
   from col 11 at row 4 down-right to col 21 at row 9 (5 steps,
   each step 2 wide × 1 tall). Bottom 2 rows are legs, designed
   to clip *into* the input bar's top edge via a negative offsetY. */

const IDLE: Pixel[][] = [
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, E, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, G, G, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _, _, _, _],
  [_, _, O, _, O, _, O, _, O, _, O, O, _, _, _, _, _, _, G, G, _, _],
  [_, _, O, _, _, _, _, _, _, _, O, _, _, _, _, _, _, _, _, _, G, G],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WINK: Pixel[][] = [
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, E, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, E, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, G, G, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _, _, _, _],
  [_, _, O, _, O, _, O, _, O, _, O, O, _, _, _, _, _, _, G, G, _, _],
  [_, _, O, _, _, _, _, _, _, _, O, _, _, _, _, _, _, _, _, _, G, G],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK_A: Pixel[][] = [
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, E, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, G, G, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _, _, _, _],
  [_, _, _, O, _, O, _, O, _, O, O, O, _, _, _, _, _, _, G, G, _, _],
  [_, _, _, _, _, O, _, _, _, O, _, _, _, _, _, _, _, _, _, _, G, G],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK_B: Pixel[][] = [
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, E, O, O, O, O, O, O, _, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, E, _, _, _, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, G, G, _, _, _, _, _, _],
  [_, _, O, O, O, O, O, O, O, O, O, O, _, _, _, _, G, G, _, _, _, _],
  [_, _, O, _, O, _, _, _, O, _, _, O, _, _, _, _, _, _, G, G, _, _],
  [_, _, O, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, G, G],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FRAMES: Pixel[][][] = [IDLE, WINK, WALK_A, WALK_B];
const F_IDLE = 0;
const F_WINK = 1;
const F_WALK_A = 2;
const F_WALK_B = 3;

const SPRITE_W = FRAMES[0][0].length;
const SPRITE_H = FRAMES[0].length;

interface PixelPetProps {
  scale?: number;
  walkSpeed?: number;
  frameMs?: number;
  idleMs?: number;
  minWalkPx?: number;
  offsetY?: number;
  className?: string;
}

/* ─── Behaviour state machine ─────────────────────────
   On mount: wink → idle pause → walk loop.
   During idle: random winks punctuate the pause.
   During walk: legs cycle between WALK_A and WALK_B. */

type Behaviour =
  | { kind: "wink"; msLeft: number; direction: 1 | -1 }
  | { kind: "idle"; msLeft: number; direction: 1 | -1 }
  | { kind: "walk"; direction: 1 | -1; distanceLeft: number };

export function PixelPet({
  scale = 4,
  walkSpeed = 20,
  frameMs = 220,
  idleMs = 1600,
  minWalkPx = 50,
  offsetY = -10,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<number>(F_WINK);
  const [x, setX] = useState(14);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const behaviourRef = useRef<Behaviour>({
    kind: "wink",
    msLeft: 650,
    direction: 1,
  });

  /* Respect prefers-reduced-motion. */
  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Measure parent width for walk bounds. */
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

  /* Sprite-frame cycler. Chooses the visible frame based on the
     current behaviour phase — wink holds F_WINK, idle uses F_IDLE
     (with occasional wink blinks), walk alternates F_WALK_A/B. */
  useEffect(() => {
    if (reduced) return;
    let strideToggle = F_WALK_A;
    const id = setInterval(() => {
      const b = behaviourRef.current;
      if (b.kind === "wink") {
        setFrame(F_WINK);
      } else if (b.kind === "idle") {
        /* Random quick blinks during idle, otherwise face forward */
        setFrame(Math.random() < 0.15 ? F_WINK : F_IDLE);
      } else {
        strideToggle = strideToggle === F_WALK_A ? F_WALK_B : F_WALK_A;
        setFrame(strideToggle);
      }
    }, frameMs);
    return () => clearInterval(id);
  }, [reduced, frameMs]);

  /* rAF loop: drive position and behaviour transitions. */
  useEffect(() => {
    if (reduced || containerWidth === 0) return;
    const spritePx = SPRITE_W * scale;
    const maxX = Math.max(0, containerWidth - spritePx);

    let last = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dtMs = now - last;
      last = now;
      const b = behaviourRef.current;

      if (b.kind === "walk") {
        setX((prev) => {
          const step = walkSpeed * b.direction * (dtMs / 1000);
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
            const flip = hitEdge || Math.random() < 0.5;
            const nextDir: 1 | -1 = flip
              ? ((-b.direction) as 1 | -1)
              : b.direction;
            behaviourRef.current = {
              kind: "idle",
              msLeft: idleMs * (0.7 + Math.random() * 0.8),
              direction: nextDir,
            };
            setDirection(nextDir);
          } else {
            behaviourRef.current = { ...b, distanceLeft };
          }
          return next;
        });
      } else if (b.kind === "wink") {
        const msLeft = b.msLeft - dtMs;
        if (msLeft <= 0) {
          /* First wink finishes → slide into idle */
          behaviourRef.current = {
            kind: "idle",
            msLeft: idleMs * 0.8,
            direction: b.direction,
          };
        } else {
          behaviourRef.current = { ...b, msLeft };
        }
      } else {
        const msLeft = b.msLeft - dtMs;
        if (msLeft <= 0) {
          const distance = minWalkPx + Math.random() * 220;
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
        /* Negative offsetY lets the pet's bottom legs overlap the input's
           top edge — reads as "standing on the laptop" not floating. */
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
