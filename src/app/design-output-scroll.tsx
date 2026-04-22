"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLazyVideo } from "@/lib/use-lazy-video";

gsap.registerPlugin(ScrollTrigger);

/* Three captions tied to scrub progress — 0–34%, 34–67%, 67–100%.
   Kept short so they read at a glance while the video is moving. */
const CAPTIONS = [
  "Start with the brief.",
  "Settle's canvas lays out the system.",
  "Humans approve. It ships.",
];

export default function DesignOutputScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Larger rootMargin on a scroll-scrub video: we need the buffer to
  // be filling BEFORE the user scrolls in, so seeks feel responsive
  // instead of stalling on network.
  const { ref: videoRef, videoProps } = useLazyVideo(
    "/videos/orient-design-system.mp4",
    "600px",
  );
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!section || !video) return;

    /* iOS Safari will ignore programmatic `currentTime` seeks until a
       user-initiated OR muted-autoplay `play()` call has primed the
       element. Kick it once on metadata-load, then immediately pause
       so the first scroll lands on frame 0. */
    const prime = () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      }
    };
    if (video.readyState >= 1) prime();
    else video.addEventListener("loadedmetadata", prime, { once: true });

    const mm = gsap.matchMedia();

    /* Desktop: pin + scrub currentTime to scroll progress.
       300% pin travel = three full viewport heights of scroll to
       play an ~11s video. Reads slow enough that the canvas feels
       like it's being built, not fast-forwarded. */
    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const d = video.duration || 0;
          if (d > 0) video.currentTime = self.progress * d;
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          const idx =
            self.progress < 0.34 ? 0 : self.progress < 0.67 ? 1 : 2;
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
      return () => st.kill();
    });

    /* Mobile: plain autoplay-loop. Scroll-scrub on touch is jittery
       across browsers, so we fall back to a looping inline preview. */
    mm.add("(max-width: 767px)", () => {
      video.loop = true;
      video.play().catch(() => {});
      return () => {
        video.loop = false;
        video.pause();
      };
    });

    return () => {
      mm.revert();
      video.removeEventListener("loadedmetadata", prime);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ebe6d9] overflow-hidden"
    >
      {/* One-viewport shell. During the desktop pin this owns exactly 100vh,
         so the grid below never scrolls internally. Text left / video right
         on desktop, stacked on mobile. */}
      <div className="h-screen flex items-center py-6 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          {/* md:grid-cols-[34%_1fr] keeps the text column narrow and
             lets the video own the remaining ~two-thirds. No comma
             inside the arbitrary value so Tailwind v4 parses cleanly. */}
          <div className="grid grid-cols-1 md:grid-cols-[34%_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
            {/* ── Copy column (left on desktop) ───────── */}
            <div className="max-w-[460px]">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 h-px bg-accent/60" />
                <p className="text-[10.5px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Sample output &middot; Orient
                </p>
              </div>
              <h2
                className="text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-text mb-4 md:mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Marketing, decks, identity —{" "}
                <span className="italic text-accent">
                  generated in a week.
                </span>
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-text-muted mb-6 md:mb-8">
                Design tokens, slide systems, icon vocabularies, brand voice
                rules. Claude drafts each asset; humans approve in the same
                canvas. The whole system ships inside the engagement — not
                after it.
              </p>

              {/* Caption rail — lives with the copy so it reads as a
                 live narration of the scrub happening alongside. */}
              <div className="relative h-14 md:h-12">
                {CAPTIONS.map((c, i) => (
                  <p
                    key={c}
                    className="absolute inset-0 text-[13px] md:text-[14px] leading-[1.45] tracking-[0.01em] text-text flex items-start gap-3"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform:
                        active === i ? "translateY(0)" : "translateY(4px)",
                      transition:
                        "opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    aria-hidden={active !== i}
                  >
                    <span
                      className="inline-block w-5 h-px bg-accent/60 shrink-0 mt-[0.7em]"
                      aria-hidden
                    />
                    <span>
                      <span className="tabular-nums text-accent font-semibold mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* ── Video column (right on desktop) ────────
               max-h caps the frame to what fits in a pinned viewport.
               aspect-video isn't quite right (clip is 1600×816 ≈ 1.96:1)
               so we let the intrinsic aspect drive height and cap it. */}
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-lg md:rounded-xl border border-black/[0.08] bg-black/5 mx-auto"
                style={{
                  maxHeight: "min(78vh, 780px)",
                  aspectRatio: "1600 / 816",
                  boxShadow:
                    "0 1px 0 rgba(20,20,19,0.04), 0 30px 60px -30px rgba(20,20,19,0.25)",
                }}
              >
                <video
                  ref={videoRef}
                  {...videoProps}
                  muted
                  playsInline
                  /* autoPlay primes iOS; we pause immediately in effect.
                     Safe to keep: until useLazyVideo attaches src, there's
                     no media to auto-play. */
                  autoPlay
                  className="block w-full h-full object-contain"
                />

                {/* Scrub indicator — hairline fills left→right as scroll
                   advances. Inline style + scaleX on transform is GPU-cheap. */}
                <div
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[3px] origin-left"
                  ref={progressRef}
                  style={{
                    background: "#d97757",
                    transform: "scaleX(0)",
                    transition: "transform 80ms linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
