"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLazyVideo } from "@/lib/use-lazy-video";

gsap.registerPlugin(ScrollTrigger);

/* Broadway horizontal curtain + cinema-hall player.
   At rest: two cream panels meet at center, sealing the frame.
   On scroll-scrub: panels part left/right to reveal the paused
   first frame of the video, with a liquid-glass play button
   haloed by a warm popcorn-projector glow at center.
   The user chooses when to play. Controls (play/pause, scrub,
   time, speed) appear on hover after playback starts. */

const PLAYBACK_RATES = [1, 1.5, 2] as const;

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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(19);
  const [rate, setRate] = useState<number>(1);
  const [hovered, setHovered] = useState(false);

  // ── Curtain scroll-scrub ────────────────────────────
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const seam = seamRef.current;
    if (!frame || !video || !left || !right) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(left, { xPercent: -100 });
      gsap.set(right, { xPercent: 100 });
      if (seam) gsap.set(seam, { opacity: 0 });
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

    tl.to(left, { xPercent: -100, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(right, { xPercent: 100, duration: 1, ease: "power2.inOut" }, 0);
    if (seam) tl.to(seam, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0);

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

        {/* ── Left curtain ───────────────────────────────
           Four layered CSS gradients, innermost to outermost:
           1. Body gradient — light top to slightly weighted bottom,
              so the fabric has mass rather than reading as a flat rect.
           2. Pleat texture — repeating-linear-gradient with ≤2% alpha
              spikes; perceptible as "light vertical banding," never
              as a pattern. Whisper-level, not theatrical.
           3. Bottom hem — single vertical gradient on the lower 8%
              with 5% alpha; seats the fabric on the floor.
           4. Inner-edge gather — 8% narrow shadow on the side that
              meets the seam. Reads as "the curtain is gathered here"
              without any drawn detail.
           No valance, no fringe, no tassels — professional cinema
           lobby, not community-theater set dressing. */}
        <div
          ref={leftRef}
          aria-hidden
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: "50%",
            zIndex: 10,
            backgroundImage: [
              "linear-gradient(to right, transparent 92%, rgba(20,20,19,0.10) 100%)",
              "linear-gradient(to bottom, transparent 92%, rgba(20,20,19,0.06) 100%)",
              "repeating-linear-gradient(to right, rgba(20,20,19,0) 0%, rgba(20,20,19,0.018) 4%, rgba(20,20,19,0) 8%)",
              "linear-gradient(to bottom, #ece9df 0%, #e2ded0 100%)",
            ].join(", "),
          }}
        />

        {/* ── Right curtain ──────────────────────────── */}
        <div
          ref={rightRef}
          aria-hidden
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: "50%",
            zIndex: 10,
            backgroundImage: [
              // Inner edge on the LEFT side of this panel (the side meeting the seam)
              "linear-gradient(to right, rgba(20,20,19,0.10) 0%, transparent 8%)",
              "linear-gradient(to bottom, transparent 92%, rgba(20,20,19,0.06) 100%)",
              "repeating-linear-gradient(to right, rgba(20,20,19,0) 0%, rgba(20,20,19,0.018) 4%, rgba(20,20,19,0) 8%)",
              "linear-gradient(to bottom, #ece9df 0%, #e2ded0 100%)",
            ].join(", "),
          }}
        />

        {/* Vertical seam — thin salmon spotlight where the two curtain
           inner edges meet. Fades with the first third of the parting. */}
        <div
          ref={seamRef}
          aria-hidden
          className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-accent/40 pointer-events-none"
          style={{ zIndex: 15 }}
        />

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

