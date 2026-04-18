"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const videoRef = useRef<HTMLVideoElement>(null);
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
      <div className="min-h-screen flex flex-col justify-center py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 w-full">
          {/* Header block — eyebrow + Fraunces headline + body */}
          <div className="max-w-[860px] mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-accent/60" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Sample output &middot; Orient
              </p>
            </div>
            <h2
              className="text-[clamp(2rem,5.4vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-text mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Marketing, decks, identity —{" "}
              <span className="italic text-accent">generated in a week.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.6] text-text-muted max-w-[560px]">
              Design tokens, slide systems, icon vocabularies, brand voice
              rules. Claude drafts each asset. Humans approve in the same
              canvas. The whole system ships inside the engagement — not
              after it.
            </p>
          </div>

          {/* Video frame — editorial inset with hairline border and subtle
             shadow so it reads like a framed specimen plate, not a hero. */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-lg md:rounded-xl border border-black/[0.08] bg-black/5"
              style={{
                boxShadow:
                  "0 1px 0 rgba(20,20,19,0.04), 0 30px 60px -30px rgba(20,20,19,0.25)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <video
                ref={videoRef}
                src="/videos/orient-design-system.mp4"
                muted
                playsInline
                preload="auto"
                /* autoPlay primes iOS; we pause immediately in effect */
                autoPlay
                className="block w-full h-auto"
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

            {/* Caption rail — three crossfading labels, one per scrub third.
               Absolute-positioned so they stack without layout shift. */}
            <div className="relative mt-6 md:mt-7 h-12 md:h-10">
              {CAPTIONS.map((c, i) => (
                <p
                  key={c}
                  className="absolute inset-0 text-[13px] md:text-[14px] tracking-[0.02em] text-text-muted flex items-center gap-3"
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
                    className="inline-block w-5 h-px bg-accent/60"
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
        </div>
      </div>
    </section>
  );
}
