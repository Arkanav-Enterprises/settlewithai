"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Cinema curtain → letterbox aperture.
   At rest: two cream panels cover a 16:9 full-bleed video
   with the eyebrow + H2 printed at the vertical centre of
   the top curtain (reads like type on theater-curtain fabric).
   On scroll-scrub: the panels retract (50% → 6%) and tint
   cream → bg-dark in parallel. Because the intro copy lives
   inside the top panel, it rides up with the curtain as the
   panel shrinks — and fades before the curtain becomes a
   slim dark bar, so the text never lands on a mixed-contrast
   frame of the video. A film-slate line emerges inside the
   bottom bar in the end state.

   Design choice: text-in-curtain (vs. absolute-centred-on-frame)
   keeps the H2's near-black fill readable at every point in
   the scrub — the text is always against the cream panel,
   never against whatever scene the video happens to be on. */

export default function PromoLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const slateRef = useRef<HTMLDivElement>(null);
  const proscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const intro = introRef.current;
    const slate = slateRef.current;
    const prosc = proscRef.current;
    if (!section || !video || !top || !bottom) return;

    video.play().catch(() => {});

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set([top, bottom], { height: "6%", backgroundColor: "#141413" });
      if (intro) gsap.set(intro, { opacity: 0 });
      if (prosc) gsap.set(prosc, { opacity: 0 });
      if (slate) gsap.set(slate, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 15%",
        scrub: 0.8,
      },
    });

    /* Panels retract and darken in one continuous tween. */
    tl.to(
      [top, bottom],
      {
        height: "6%",
        backgroundColor: "#141413",
        duration: 1,
        ease: "power2.inOut",
      },
      0,
    );

    /* Intro copy fades during the middle third of the retract.
       By this point the curtain has lifted enough to make the
       text feel "carried away" with the opening, but not so
       much that the copy is squeezed into the bar's final dark
       slab — that transition we hide under the fade. */
    if (intro) {
      tl.to(
        intro,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        0.4,
      );
    }

    /* Hairline seam fades with the first third of the opening. */
    if (prosc) {
      tl.to(prosc, { opacity: 0, duration: 0.35, ease: "power1.in" }, 0);
    }

    /* Slate line fades in at the tail. */
    if (slate) {
      tl.to(slate, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.8);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Settle in production — 30-second loop"
      className="relative w-full"
    >
      {/* 16:9 full-bleed. Container bg matches the end-state bar
         colour so any 1-frame drift never flashes page-cream. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9", backgroundColor: "#141413" }}
      >
        <video
          ref={videoRef}
          src="/videos/settle-promo-short.mp4"
          width={2802}
          height={1576}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-label="Thirty-second loop — brief to live system to signed handoff"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── Top curtain → top letterbox bar ───────── */}
        <div
          ref={topRef}
          className="absolute top-0 left-0 right-0 overflow-hidden flex items-center justify-center"
          style={{ height: "50%", backgroundColor: "#e8e6dc", zIndex: 10 }}
        >
          {/* Intro copy — lives inside the top panel and is
             clipped + carried up with it as the panel shrinks.
             Centred vertically so it reads as the printed title
             on the cream curtain. */}
          <div
            ref={introRef}
            className="w-full max-w-[820px] px-6 md:px-10 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
              <div className="w-8 h-px bg-accent/60" />
              <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Thirty seconds &middot; Settle in production
              </p>
              <div className="w-8 h-px bg-accent/60" />
            </div>
            <h2
              className="text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.08] tracking-[-0.02em] text-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              From one brief,{" "}
              <span className="italic text-accent">a system that runs.</span>
            </h2>
          </div>
        </div>

        {/* ── Bottom curtain → bottom letterbox bar ───── */}
        <div
          ref={bottomRef}
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ height: "50%", backgroundColor: "#e8e6dc", zIndex: 10 }}
        >
          {/* Film-slate line — pinned to the bottom of the panel
             so it's always aligned with the final letterbox bar
             regardless of panel size during the tween. */}
          <div
            ref={slateRef}
            className="absolute inset-x-0 bottom-0 h-[48px] flex items-center justify-between px-6 md:px-10 opacity-0 pointer-events-none"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-white/55 font-mono">
              Settle &middot; 2026
            </span>
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.28em] text-white/40 font-mono">
              Composer &middot; Live &middot; Dispatch &middot; Handoff
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-white/55 font-mono">
              Loop &middot; 0:28
            </span>
          </div>
        </div>

        {/* Proscenium seam — hairline where the two curtains meet
           at rest. Above both panels so it reads as a seam line,
           not a gap. Fades with the first third of the opening. */}
        <div
          ref={proscRef}
          aria-hidden
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-accent/40 pointer-events-none"
          style={{ zIndex: 20 }}
        />
      </div>
    </section>
  );
}
