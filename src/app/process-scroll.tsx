"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume.",
    image: "/cave-art.webp",
    // cave-art is black-on-white, so grayscale + multiply works without inverting first.
    invertColors: false,
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard.",
    image: "/Architecture.webp",
    invertColors: true,
  },
  {
    num: "03",
    title: "Instruction Engineering",
    desc: "Production-grade Claude instructions for every use case. Structured workflows with review gates and safety rules.",
    image: "/Instruction%20Engineering.webp",
    invertColors: true,
  },
  {
    num: "04",
    title: "Deploy & Settle",
    desc: "We deploy, train your team, and iterate. Quick wins ship in weeks. Deeper integrations follow in phases.",
    image: "/Deploy%20and%20Settle.webp",
    invertColors: true,
  },
];

const TOTAL_SLICES = 16;
const SLICE_ANGLE = 360 / TOTAL_SLICES; // 22.5°

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activePhaseRef = useRef(0);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    const totalRotation = SLICE_ANGLE * (PHASES.length - 1); // 67.5°

    /* Map scroll progress (0–1) to phase index. Uses round so the swap
       happens at the midpoint between phases, aligning with the wheel rotation. */
    const updateActivePhase = (progress: number) => {
      const idx = Math.min(
        PHASES.length - 1,
        Math.max(0, Math.round(progress * (PHASES.length - 1))),
      );
      if (idx !== activePhaseRef.current) {
        activePhaseRef.current = idx;
        setActivePhase(idx);
      }
    };

    const mm = gsap.matchMedia();

    /* Desktop: pin the section so all 4 phases have full viewport dwell time */
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => updateActivePhase(self.progress),
        },
      });
      tl.to(circle, { rotation: -totalRotation, ease: "none", duration: 1 }, 0);
      return () => tl.kill();
    });

    /* Mobile: scroll-scrubbed without pin (existing behaviour) */
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          onUpdate: (self) => updateActivePhase(self.progress),
        },
      });
      tl.to(circle, { rotation: -totalRotation, ease: "none", duration: 1 }, 0);
      return () => tl.kill();
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#ddd9cc] relative overflow-hidden">
      {/* Left-edge running label — editorial museum-tag treatment.
         Hairline vertical rule + method name + live "phase 0X / 04" counter. */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10 flex items-center gap-4">
        <div className="w-px h-12 bg-[rgba(20,20,19,0.22)]" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted mb-2">
            The Settle <span className="text-accent">Method</span>
          </p>
          <p
            className="text-[10px] font-medium tracking-[0.18em] text-text-muted/70 tabular-nums"
            aria-live="polite"
          >
            {String(activePhase + 1).padStart(2, "0")}
            <span className="opacity-50"> / 04</span>
          </p>
        </div>
      </div>

      {/* Rotating circle. Mobile uses a larger radius so the arc between
         phases (r × 22.5° ≈ 55vw at 280vw) clears the phase text blocks. */}
      <div
        ref={circleRef}
        className="absolute pointer-events-none left-[-262vw] md:left-[-120vw] lg:left-[-1100px] w-[280vw] h-[280vw] md:w-[min(180vw,1600px)] md:h-[min(180vw,1600px)] top-[50%]"
        style={{
          transform: "translateY(-50%)",
        }}
      >
        {/* Circumference */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1.5px solid rgba(20,20,19,0.1)" }}
        />

        {/* All radial lines */}
        {Array.from({ length: TOTAL_SLICES }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: "200%",
              height: "1px",
              background: "rgba(20,20,19,0.07)",
              transform: `rotate(${i * SLICE_ANGLE}deg)`,
            }}
          />
        ))}

        {/* Phase content on radial lines */}
        {PHASES.map((phase, i) => {
          const angle = i * SLICE_ANGLE;

          return (
            <div
              key={phase.num}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: "120%",
                transform: `rotate(${angle}deg)`,
              }}
            >
              {/* Dot on circumference — crisp accent marker for the active
                 phase (with a soft halo ring), hairline mute for the others.
                 The halo is built from layered box-shadows rather than blur()
                 so the mark stays sharp at any scale. */}
              <div
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="absolute rounded-full"
                style={{
                  left: "41.6%",
                  top: "-4px",
                  width: "8px",
                  height: "8px",
                  background:
                    activePhase === i ? "#d97757" : "rgba(20,20,19,0.35)",
                  transform: activePhase === i ? "scale(1.25)" : "scale(0.7)",
                  boxShadow:
                    activePhase === i
                      ? "0 0 0 4px rgba(217,119,87,0.14), 0 0 0 10px rgba(217,119,87,0.05)"
                      : "none",
                  opacity: activePhase === i ? 1 : 0.55,
                  transition:
                    "background 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease, opacity 500ms ease",
                }}
              />

              {/* Content — counter-rotated to stay readable */}
              <div
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                className="absolute pointer-events-auto"
                style={{
                  left: "43%",
                  top: "-10px",
                  transformOrigin: "0 10px",
                  width: "min(65vw, 420px)",
                  opacity: 1,
                }}
              >
                {/* Editorial kicker — hairline rule + uppercase micro-label.
                   Replaces the bare "01" text for a magazine-tag feel. */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-px transition-all duration-500"
                    style={{
                      width: activePhase === i ? "32px" : "18px",
                      background:
                        activePhase === i
                          ? "#d97757"
                          : "rgba(20,20,19,0.25)",
                    }}
                  />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.22em] tabular-nums transition-colors duration-500"
                    style={{
                      color:
                        activePhase === i
                          ? "#d97757"
                          : "rgba(20,20,19,0.55)",
                    }}
                  >
                    Phase {phase.num}
                  </span>
                </div>
                <h3
                  className="text-[clamp(1.4rem,3.5vw,2.8rem)] font-normal leading-[1.08] mb-3 text-text"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {phase.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.6] max-w-[300px] md:max-w-[440px] md:text-black text-text-muted font-normal">
                  {phase.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Faint cave-art silhouette per phase. grayscale + multiply blends the
         image into the cream background as a texture; white-on-dark source
         PNGs get inverted first so multiply renders consistently across the
         whole set. Desktop only to preserve mobile scroll room. */}
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-[min(56vw,760px)] pointer-events-none select-none hidden md:flex items-center justify-center"
      >
        {/* Soft warm halo behind the numeral — implied "gallery light" on
           the active phase without adding noisy imagery. */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,87,0.08) 0%, rgba(217,119,87,0.02) 45%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {PHASES.map((phase, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={phase.num}
            src={phase.image}
            alt=""
            width={1024}
            height={1024}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 m-auto object-contain"
            style={{
              width: "min(52vw, 640px)",
              height: "min(52vw, 640px)",
              opacity: activePhase === i ? 0.08 : 0,
              transform:
                activePhase === i
                  ? "translateY(0) scale(1)"
                  : "translateY(8px) scale(0.985)",
              filter: phase.invertColors
                ? "invert(1) grayscale(1)"
                : "grayscale(1)",
              mixBlendMode: "multiply",
              transition:
                "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}

        {/* Editorial specimen caption — tiny uppercase label under the
           numeral, crossfades with the active phase title. */}
        <div
          className="absolute bottom-[18%] flex flex-col items-center gap-2"
          style={{ minWidth: "260px" }}
        >
          <div className="w-10 h-px bg-[rgba(20,20,19,0.2)]" />
          {PHASES.map((phase, i) => (
            <span
              key={phase.num}
              className="absolute top-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted whitespace-nowrap"
              style={{
                opacity: activePhase === i ? 0.75 : 0,
                transition: "opacity 600ms ease",
              }}
            >
              Phase {phase.num} &middot; {phase.title}
            </span>
          ))}
        </div>
      </div>

      {/* Spacer for scroll room — desktop height set here; pin handles scroll travel */}
      <div className="relative z-10 h-[130vh] md:h-screen" />
    </section>
  );
}
