"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume. You get a prioritised use-case matrix, not a pitch deck.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard. Live project tracking. Tier-based phasing. Gap analysis built in.",
  },
  {
    num: "03",
    title: "Instruction Engineering",
    desc: "Production-grade Claude project instructions for every use case. Structured workflows with review gates, safety rules, and knowledge files. Your team uses Claude in plain language.",
  },
  {
    num: "04",
    title: "Deploy & Settle",
    desc: "We deploy, train your team, and iterate based on real usage. Quick wins ship in weeks. Deeper integrations follow in phases. We stay until adoption sticks.",
  },
];

const TOTAL_SLICES = 8;
const SLICE_ANGLE = 360 / TOTAL_SLICES; // 45deg per slice
const ROTATION_RANGE = SLICE_ANGLE * (PHASES.length - 1); // total rotation

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (mobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        /* Reserve the last 20% of scroll as dwell time on phase 04 */
        const progress = Math.min(self.progress / 0.8, 1);
        const idx = Math.min(
          PHASES.length - 1,
          Math.floor(progress * PHASES.length)
        );
        setActive(idx);
        setRotation(progress * ROTATION_RANGE);
      },
    });

    return () => trigger.kill();
  }, []);

  /* Mobile: simple vertical stack */
  if (isMobile) {
    return (
      <section className="bg-[#ddd9cc] relative overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.15em] text-text-faint mb-4">
            Our Process
          </p>
          <h2
            className="text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-14 text-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From zero to settled in four phases.
          </h2>
          <div className="space-y-12">
            {PHASES.map((p) => (
              <div key={p.num} className="fade-up">
                <span className="text-accent/50 text-sm block mb-2">
                  {p.num}
                </span>
                <h3
                  className="text-text text-[clamp(1.5rem,3vw,2.2rem)] font-medium mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {p.title}
                </h3>
                <p className="text-text-muted text-sm leading-[1.7] max-w-sm">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="bg-[#ddd9cc] relative overflow-hidden h-screen"
    >
      {/* "PROCESS" label */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          Our Process
        </p>
      </div>

      {/* Rotating circle — anchored left, centered vertically */}
      <div
        ref={circleRef}
        className="absolute pointer-events-none"
        style={{
          width: "100vw",
          height: "100vw",
          left: "-60vw",
          top: "50%",
          transform: `translateY(-50%) rotate(${-rotation}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Circumference */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1.5px solid rgba(20,20,19,0.12)",
          }}
        />

        {/* Radial slice lines */}
        {Array.from({ length: TOTAL_SLICES }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: "200%",
              height: "1px",
              background: "rgba(20,20,19,0.1)",
              transform: `rotate(${i * SLICE_ANGLE}deg)`,
            }}
          />
        ))}

        {/* Glowing dot on circumference — at the active slice intersection */}
        {PHASES.map((_, i) => {
          const angle = i * SLICE_ANGLE;
          const rad = (angle * Math.PI) / 180;
          const r = 50; // % from center
          const cx = 50 + r * Math.cos(rad);
          const cy = 50 + r * Math.sin(rad);
          const isActive = i === active;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Glow */}
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: isActive ? "20px" : "6px",
                  height: isActive ? "20px" : "6px",
                  background: "#d97757",
                  opacity: isActive ? 0.6 : 0.2,
                  filter: isActive ? "blur(8px)" : "blur(2px)",
                }}
              />
              {/* Core dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                style={{
                  width: isActive ? "8px" : "4px",
                  height: isActive ? "8px" : "4px",
                  background: "#d97757",
                  opacity: isActive ? 1 : 0.3,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Content — right side, vertically centered */}
      <div className="absolute right-0 top-0 h-full w-[48%] lg:w-[45%] flex flex-col justify-center px-10 lg:px-16 z-10">
        {PHASES.map((p, i) => {
          const isActive = i === active;
          const isPast = i < active;

          return (
            <div
              key={p.num}
              className="absolute transition-all duration-700 ease-out"
              style={{
                opacity: isActive ? 1 : isPast ? 0 : 0,
                transform: isActive
                  ? "translateY(0)"
                  : isPast
                    ? "translateY(-60px)"
                    : "translateY(60px)",
              }}
            >
              <span className="text-text-faint text-sm block mb-3">
                {p.num}
              </span>
              <h3
                className="text-text text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {p.title}
              </h3>
              <p className="text-text-muted text-[15px] leading-[1.7] max-w-md">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
