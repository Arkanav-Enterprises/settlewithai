"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLazyVideo } from "@/lib/use-lazy-video";

gsap.registerPlugin(ScrollTrigger);

/* Slice-fold manifest + cinema-hall player.
   At rest: a twelve-line agent manifest covers the frame, rendered
   like a real config artifact. On scroll-scrub: each line folds
   backward in 3D from the top down (staggered rotateX with bottom-
   edge transform-origin), peeling away to reveal the paused first
   frame of the video underneath. The play button + warm projector
   glow sit at center; the user chooses when to play.

   This replaced an earlier two-curtain reveal. Slice manifest is
   on-brand: Settle ships agent manifests, so the cover IS a sample
   of the work, not stage dressing. */

const PLAYBACK_RATES = [1, 1.5, 2] as const;
const SLICE_COUNT = 12;

/* The lines that compose the cover. Reads as a real agent manifest
   — the kind of file Settle actually checks into a client repo.
   Keep the slice count and this list aligned. */
const MANIFEST_LINES: { text: string; tone: "comment" | "key" | "value" | "list" | "tag" }[] = [
  { text: "# /agents/orient-printing.yaml", tone: "comment" },
  { text: "project: Orient Printing & Packaging", tone: "key" },
  { text: "version: 2.4", tone: "key" },
  { text: "deployed: 2026-04-12", tone: "key" },
  { text: "instructions:", tone: "key" },
  { text: "  - Generate offer documents from the price list", tone: "list" },
  { text: "  - Match brand template for proposals", tone: "list" },
  { text: "  - Pull live spec data from the BOM sheet", tone: "list" },
  { text: "guardrails:", tone: "key" },
  { text: "  - Refuse to fabricate part numbers", tone: "list" },
  { text: "tools: [knowledge-base, pricing-sheet, brand-pdf]", tone: "key" },
  { text: "status: production", tone: "tag" },
];

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function PromoLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { ref: videoRef, videoProps } = useLazyVideo(
    "/videos/settle-promo-cinema.mp4",
  );
  const slicesRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(19);
  const [rate, setRate] = useState<number>(1);
  const [hovered, setHovered] = useState(false);

  // ── Slice fold scroll-scrub ─────────────────────────
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    const slicesEl = slicesRef.current;
    if (!frame || !video || !slicesEl) return;

    const sliceEls = Array.from(
      slicesEl.querySelectorAll<HTMLDivElement>("[data-slice]"),
    );
    if (sliceEls.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(sliceEls, { autoAlpha: 0 });
      gsap.set(slicesEl, { autoAlpha: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: "top 95%",
        end: "center 55%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // Slices fold top-down: each rotates -100deg around its bottom
    // edge with a small backward Z lift, staggered by 0.07s. Power3.in
    // matches Settle's house easing curve (cubic-bezier(0.16, 1, 0.3, 1)).
    sliceEls.forEach((el, i) => {
      tl.to(
        el,
        {
          rotateX: -100,
          z: -40,
          opacity: 0,
          duration: 1,
          ease: "power3.in",
        },
        i * 0.07,
      );
    });

    // NOTE: do NOT call ScrollTrigger.refresh() on loadedmetadata.
    // With preload="none" the metadata event fires when the user is
    // already scrolling, and a refresh mid-scroll recalculates every
    // trigger on the page — which breaks the ProcessScroll pin above
    // us, leaving a visible empty strip after the wheel. The frame
    // container has a fixed aspect-[16/9], so video load doesn't
    // change layout anyway. If a refresh is ever needed later, gate
    // it on !ScrollTrigger.isInViewport() of all pinned triggers.

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // ── Video event wiring (no autoplay — user controls) ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      setDuration(video.duration || 19);
    };
    const onTime = () => setCurrentTime(video.currentTime);
    const onPlay = () => { setIsPlaying(true); setHasStarted(true); };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setHasStarted(false); };

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const cycleRate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const idx = PLAYBACK_RATES.indexOf(rate as (typeof PLAYBACK_RATES)[number]);
    const next = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length];
    video.playbackRate = next;
    setRate(next);
  }, [rate]);

  const handleScrub = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      const bar = scrubRef.current;
      if (!video || !bar) return;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = pct * (video.duration || duration);
    },
    [duration],
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Settle in production — sixteen-second loop"
      className="relative w-full py-14 md:py-0 md:h-screen md:flex md:items-center md:justify-center"
    >
      {/* Frame sizing: on desktop the section is capped at 100vh and the
         16:9 frame fits inside. Width resolves to the narrower of
         "full parent width" and "what a 100vh-tall 16:9 frame would be",
         so the frame stretches full-bleed on viewports wider than 16:9
         and shrinks height-limited on taller/squarer ones. Either way,
         the frame never overflows 100vh — the whole container ≤ 100vh. */}
      <div
        ref={frameRef}
        className="relative overflow-hidden aspect-[16/9] bg-transparent w-full md:w-[min(100%,calc(100vh*16/9))]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={videoRef}
          {...videoProps}
          poster="/videos/settle-promo-cinema-poster.jpg"
          width={1920}
          height={1080}
          muted
          playsInline
          aria-label="Sixteen-second loop — use-case stats, live three-pane system, tile montage, configurable controls, closing tagline"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── Slice manifest cover ─────────────────────
           Twelve horizontal slices of a Settle agent manifest stack
           over the video, each with its own bottom-edge transform-
           origin so they fold backward in sequence on scroll-scrub.
           Each slice is a real line of YAML-styled config — Settle's
           cover is a sample of the work, not stage dressing.

           Layout: a flex column with 3D `perspective` on the parent
           and `transform-style: preserve-3d` so each rotateX renders
           into actual depth rather than flattening to a 2D shear. */}
        <div
          ref={slicesRef}
          aria-hidden
          className="absolute inset-0 flex flex-col pointer-events-none"
          style={{
            zIndex: 10,
            perspective: "2000px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            backgroundImage: "linear-gradient(to bottom, #ece9df 0%, #e2ded0 100%)",
          }}
        >
          {MANIFEST_LINES.slice(0, SLICE_COUNT).map((line, i) => {
            const isComment = line.tone === "comment";
            const isList = line.tone === "list";
            const isTag = line.tone === "tag";
            // Split "key: value" into a coloured key + neutral value where
            // applicable. List items don't split (the whole line is value).
            const colonIdx = !isList && !isComment ? line.text.indexOf(":") : -1;
            const head = colonIdx > 0 ? line.text.slice(0, colonIdx + 1) : null;
            const tail = colonIdx > 0 ? line.text.slice(colonIdx + 1) : line.text;
            return (
              <div
                key={i}
                data-slice
                className="relative flex items-center w-full px-6 md:px-12 lg:px-20 select-none will-change-transform"
                style={{
                  flex: "1 1 0",
                  transformOrigin: "50% 100%",
                  transformStyle: "preserve-3d",
                  // Hairline rule between slices reads as the natural break
                  // between code lines. Salmon-tinted under shadow on the
                  // lower edge gives each slice a faint paper weight.
                  borderBottom:
                    i < SLICE_COUNT - 1
                      ? "1px solid rgba(20, 20, 19, 0.06)"
                      : "none",
                  boxShadow:
                    i < SLICE_COUNT - 1
                      ? "0 1px 0 0 rgba(255, 255, 255, 0.4) inset"
                      : "none",
                }}
              >
                {/* Faint line-number gutter — reads like a code editor without
                   making it look like one. Tabular nums keep the column rigid. */}
                <span
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-[9px] md:text-[10px] font-mono tabular-nums"
                  style={{ color: "rgba(20, 20, 19, 0.25)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <pre
                  className="font-mono text-[11px] md:text-[14px] lg:text-[16px] leading-none whitespace-pre"
                  style={{
                    color: isComment
                      ? "var(--accent)"
                      : isTag
                        ? "var(--text)"
                        : "rgba(20, 20, 19, 0.78)",
                    fontWeight: isTag ? 600 : 400,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {head ? (
                    <>
                      <span style={{ color: "rgba(20, 20, 19, 0.55)" }}>{head}</span>
                      <span>{tail}</span>
                    </>
                  ) : (
                    line.text
                  )}
                </pre>
              </div>
            );
          })}
        </div>

        {/* ── Cinema play button (center) ─────────────
           Visible until playback begins. Liquid-glass surface
           over a breathing popcorn-warm projector glow.
           Optical-center fix on the play triangle: +2px x to
           counter the geometric bias of an asymmetric glyph. */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play the feature"
          className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
          style={{
            zIndex: 25,
            transitionProperty: "opacity, scale, filter",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            opacity: hasStarted ? 0 : 1,
            scale: hasStarted ? "0.85" : "1",
            filter: hasStarted ? "blur(6px)" : "blur(0px)",
            pointerEvents: hasStarted ? "none" : "auto",
          }}
        >
          {/* Popcorn projector glow — behind the glass disc */}
          <span
            aria-hidden
            className="cinema-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ width: 260, height: 260 }}
          />

          {/* Liquid glass disc — layered shadows (no hard border).
             Inset highlights give the top-left lift and bottom-right
             seat that make glass read as a physical disc rather than
             a flat circle. */}
          <span
            className="relative flex items-center justify-center w-[96px] h-[96px] rounded-full transition-[scale,background-color,box-shadow] duration-300 ease-out group-hover:scale-[1.04] group-active:scale-[0.96]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              boxShadow: [
                "inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                "inset 0 -1px 2px rgba(0, 0, 0, 0.18)",
                "0 8px 32px rgba(20, 20, 19, 0.35)",
                "0 2px 8px rgba(217, 119, 87, 0.18)",
              ].join(", "),
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              aria-hidden
              style={{ transform: "translateX(2px)" }}
            >
              <path
                d="M7 5v14l11-7z"
                fill="#FFFFFF"
                fillOpacity="0.94"
              />
            </svg>
          </span>

          {/* Marquee label — mono, wide-tracked, reads like the LED
             strip on a cinema entrance. Tabular nums on the runtime. */}
          <span className="absolute left-1/2 top-full -translate-x-1/2 mt-6 whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.3em] text-white/65 tabular-nums">
            Press to begin · 0:19 feature
          </span>
        </button>

        {/* ── Control bar (bottom) ────────────────────
           Appears on hover once playback has started.
           Stays tucked otherwise — respects the rule that
           chrome shouldn't steal focus from the content. */}
        <div
          className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 flex items-center gap-3"
          style={{
            zIndex: 30,
            transitionProperty: "opacity, translate",
            transitionDuration: "260ms",
            transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            opacity: hasStarted && hovered ? 1 : 0,
            translate: hasStarted && hovered ? "0 0" : "0 6px",
            pointerEvents: hasStarted && hovered ? "auto" : "none",
          }}
        >
          {/* Play/pause toggle */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex items-center justify-center w-10 h-10 rounded-full outline-none transition-[scale,background-color] duration-200 ease-out hover:bg-white/15 active:scale-[0.96]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              boxShadow: [
                "inset 0 1px 1px rgba(255, 255, 255, 0.30)",
                "inset 0 -1px 1px rgba(0, 0, 0, 0.15)",
                "0 4px 14px rgba(20, 20, 19, 0.30)",
              ].join(", "),
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" fill="#FFF" fillOpacity="0.92" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="#FFF" fillOpacity="0.92" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden style={{ transform: "translateX(1px)" }}>
                <path d="M7 5v14l11-7z" fill="#FFF" fillOpacity="0.92" />
              </svg>
            )}
          </button>

          {/* Scrub bar — full 40px hit area, 3px visible rail.
             Concentric radii: outer pill rounded-full, inner fill
             rounded-full. Fill is a warm gradient that echoes the
             projector glow. */}
          <div
            ref={scrubRef}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onClick={handleScrub}
            className="flex-1 h-10 flex items-center cursor-pointer group/scrub"
          >
            <div
              className="relative w-full h-[3px] rounded-full overflow-hidden transition-[height] duration-150 group-hover/scrub:h-[5px]"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.18)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, rgba(255, 203, 128, 0.95), rgba(217, 119, 87, 0.95))",
                  transition: "width 120ms linear",
                }}
              />
            </div>
          </div>

          {/* Time — tabular-nums prevents layout shift every frame. */}
          <span className="text-[11px] font-mono text-white/75 tabular-nums whitespace-nowrap select-none">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Speed pill — cycles 1× → 1.5× → 2×. Tabular nums keep the
             pill width stable as the label changes. */}
          <button
            type="button"
            onClick={cycleRate}
            aria-label={`Playback speed: ${rate}x, click to change`}
            className="flex items-center justify-center h-10 min-w-[48px] px-3 rounded-full outline-none text-[11px] font-mono uppercase tracking-[0.12em] text-white/80 tabular-nums transition-[scale,background-color] duration-200 ease-out hover:bg-white/15 active:scale-[0.96]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              boxShadow: [
                "inset 0 1px 1px rgba(255, 255, 255, 0.30)",
                "inset 0 -1px 1px rgba(0, 0, 0, 0.15)",
                "0 4px 14px rgba(20, 20, 19, 0.30)",
              ].join(", "),
            }}
          >
            {rate}×
          </button>
        </div>
      </div>
    </section>
  );
}

