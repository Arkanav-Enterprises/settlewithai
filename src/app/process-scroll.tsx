"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard.",
  },
  {
    num: "03",
    title: "Instruction Engineering",
    desc: "Production-grade Claude instructions for every use case. Structured workflows with review gates and safety rules.",
  },
  {
    num: "04",
    title: "Deploy & Settle",
    desc: "We deploy, train your team, and iterate. Quick wins ship in weeks. Deeper integrations follow in phases.",
  },
];

const TOTAL_SLICES = 16;
const SLICE_ANGLE = 360 / TOTAL_SLICES; // 22.5°

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    const totalRotation = SLICE_ANGLE * (PHASES.length - 1); // 67.5°

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
        },
      });
      tl.to(circle, { rotation: -totalRotation, ease: "none", duration: 1 }, 0);
      return () => tl.kill();
    });

    return () => {
      mm.revert();
    };
  }, []);

  /* Bigger circle = more arc length between phases = better spacing */
  const circleSize = "min(180vw, 1600px)";

  return (
    <section
      ref={sectionRef}
      className="bg-[#ddd9cc] relative overflow-hidden"
    >
      {/* "OUR PROCESS" label */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          Our <span className="text-accent">Process</span>
        </p>
      </div>

      {/* Rotating circle */}
      <div
        ref={circleRef}
        className="absolute pointer-events-none left-[-150vw] md:left-[-120vw] lg:left-[-1100px]"
        style={{
          width: circleSize,
          height: circleSize,
          top: "50%",
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
              {/* Dot on circumference */}
              <div
                ref={(el) => { dotRefs.current[i] = el; }}
                className="absolute rounded-full"
                style={{
                  left: "41.6%",
                  top: "-5px",
                  width: "10px",
                  height: "10px",
                  background: "#d97757",
                  filter: "blur(3px)",
                  opacity: 0.2,
                }}
              />

              {/* Content — counter-rotated to stay readable */}
              <div
                ref={(el) => { phaseRefs.current[i] = el; }}
                className="absolute pointer-events-auto"
                style={{
                  left: "43%",
                  top: "-10px",
                  transformOrigin: "0 10px",
                  width: "min(65vw, 420px)",
                  opacity: 1,
                }}
              >
                <span className="text-[14px] block mb-2 text-text-muted">
                  {phase.num}
                </span>
                <h3
                  className="text-[clamp(1.4rem,3.5vw,2.8rem)] font-semibold leading-[1.08] mb-3 text-text"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {phase.title}
                </h3>
                <p className="text-[13px] leading-[1.6] max-w-[260px] md:max-w-[360px] text-text-muted">
                  {phase.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cave art background — desktop only */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cave-art.webp"
        alt=""
        width={1024}
        height={1024}
        loading="lazy"
        className="absolute right-0 top-0 w-[700px] lg:w-[800px] h-auto opacity-[0.04] md:opacity-[0.06] pointer-events-none select-none hidden md:block"
      />

      {/* Spacer for scroll room — desktop height set here; pin handles scroll travel */}
      <div className="relative z-10 h-[130vh] md:h-screen" />
    </section>
  );
}
