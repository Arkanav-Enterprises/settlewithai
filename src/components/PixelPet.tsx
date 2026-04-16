"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── Sprite assets ──────────────────────────────────
   Native-resolution PNGs traced directly from Aurelien's
   source video. We render them as <img> with
   image-rendering: pixelated so every source pixel maps
   1:1 to SCALE screen pixels at any size. */

const SPRITES = {
  forward: "/pixel-pet/forward.png", // 11×7: head-on, two eyes open
  wink: "/pixel-pet/wink.png",       // 11×7: left eye closed
  blink: "/pixel-pet/blink.png",     // 11×7: both eyes closed
  profile: "/pixel-pet/profile.png", // 18×7: profile with gray staircase tail
} as const;

type SpriteKey = keyof typeof SPRITES;

/* Each sprite has a native size. Keeping these in sync with the PNGs
   lets us compute screen dimensions and hit-box without loading the
   image to inspect. */
const SPRITE_META: Record<SpriteKey, { w: number; h: number }> = {
  forward: { w: 11, h: 7 },
  wink: { w: 11, h: 7 },
  blink: { w: 11, h: 7 },
  profile: { w: 18, h: 7 },
};

interface PixelPetProps {
  scale?: number;
  walkSpeed?: number;
  frameMs?: number;
  idleMs?: number;
  minWalkPx?: number;
  offsetY?: number;
  className?: string;
}

type Behaviour =
  | { kind: "wink"; msLeft: number; direction: 1 | -1 }
  | { kind: "idle"; msLeft: number; direction: 1 | -1 }
  | { kind: "walk"; direction: 1 | -1; distanceLeft: number };

export function PixelPet({
  scale = 4,
  walkSpeed = 24,
  frameMs = 220,
  idleMs = 1500,
  minWalkPx = 50,
  offsetY = 2,
  className = "",
}: PixelPetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [sprite, setSprite] = useState<SpriteKey>("wink");
  const [x, setX] = useState(14);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const behaviourRef = useRef<Behaviour>({
    kind: "wink",
    msLeft: 600,
    direction: 1,
  });

  const reduced = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  /* Measure parent width for bounce bounds. */
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

  /* Sprite frame cycler. Picks the visible PNG based on behaviour. */
  useEffect(() => {
    if (reduced) return;
    let walkToggle = 0;
    const id = setInterval(() => {
      const b = behaviourRef.current;
      if (b.kind === "wink") {
        setSprite("wink");
      } else if (b.kind === "idle") {
        /* Idle: mostly forward, occasional quick blinks/winks. */
        const roll = Math.random();
        if (roll < 0.08) setSprite("blink");
        else if (roll < 0.16) setSprite("wink");
        else setSprite("forward");
      } else {
        /* Walk: alternate sprite to suggest stride rhythm. We use
           profile for both halves but the position changes each tick
           so the eye reads motion. */
        walkToggle = (walkToggle + 1) % 2;
        setSprite("profile");
      }
    }, frameMs);
    return () => clearInterval(id);
  }, [reduced, frameMs]);

  /* rAF loop: position + behaviour transitions. */
  useEffect(() => {
    if (reduced || containerWidth === 0) return;
    const meta = SPRITE_META.profile;
    const spritePx = meta.w * scale;
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
          if (next >= maxX) { next = maxX; hitEdge = true; }
          else if (next <= 0) { next = 0; hitEdge = true; }

          const walked = Math.abs(step);
          const distanceLeft = b.distanceLeft - walked;
          if (hitEdge || distanceLeft <= 0) {
            const flip = hitEdge || Math.random() < 0.5;
            const nextDir: 1 | -1 = flip ? ((-b.direction) as 1 | -1) : b.direction;
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

  const meta = SPRITE_META[sprite];
  const spriteW = meta.w * scale;
  const spriteH = meta.h * scale;
  /* All sprites render into the PROFILE width box so the visual
     anchor doesn't jump when the sprite swaps mid-animation. */
  const boxW = SPRITE_META.profile.w * scale;

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute ${className}`}
      style={{
        bottom: `calc(100% + ${offsetY}px)`,
        left: `${x}px`,
        width: boxW,
        height: spriteH,
        transform: direction === -1 ? "scaleX(-1)" : undefined,
        transformOrigin: "center",
      }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SPRITES[sprite]}
        alt=""
        width={spriteW}
        height={spriteH}
        style={{
          display: "block",
          width: spriteW,
          height: spriteH,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
