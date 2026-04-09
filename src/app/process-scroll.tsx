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
const SLICE_ANGLE = 360 / TOTAL_SLICES;
/* Each phase occupies 2 slices (22.5° x 2 = 45°) */
const PHASE_ANGLE = SLICE_ANGLE * 2;
const ROTATION_RANGE = PHASE_ANGLE * (PHASES.length - 1);

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const r = self.progress * ROTATION_RANGE;
          setRotation(r);
          circle.style.transform = `translateY(-50%) rotate(${-r}deg)`;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const circleSize = "min(100vw, 1000px)";

  return (
    <section
      ref={sectionRef}
      className="bg-[#ddd9cc] relative overflow-hidden"
    >
      {/* "OUR PROCESS" label */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          Our Process
        </p>
      </div>

      {/* Rotating circle with content attached */}
      <div
        ref={circleRef}
        className="absolute pointer-events-none left-[-85vw] md:left-[-65vw] lg:left-[-580px]"
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

        {/* Phase content — attached to the circle, rotates with it */}
        {PHASES.map((phase, i) => {
          const angle = i * PHASE_ANGLE;
          const rad = (angle * Math.PI) / 180;
          const r = 50; // percentage from center to circumference
          /* Position the dot on the circumference */
          const dotX = 50 + r * Math.cos(rad);
          const dotY = 50 + r * Math.sin(rad);

          /* Counter-rotate the content so text stays readable.
             The circle rotates by -rotation, so content needs +rotation
             to stay upright. */
          const counterRotation = rotation;

          /* Binary active state — the phase closest to current rotation is fully active */
          const phaseCenter = i * PHASE_ANGLE;
          const dist = Math.abs(rotation - phaseCenter);
          const isClosest = dist <= PHASE_ANGLE / 2;
          const activeness = isClosest ? 1 : Math.max(0, 0.15 - dist / (PHASE_ANGLE * 8));

          return (
            <div
              key={phase.num}
              className="absolute"
              style={{
                left: `${dotX}%`,
                top: `${dotY}%`,
              }}
            >
              {/* Glowing dot */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: `${8 + activeness * 12}px`,
                    height: `${8 + activeness * 12}px`,
                    background: "#d97757",
                    opacity: 0.15 + activeness * 0.45,
                    filter: `blur(${3 + activeness * 5}px)`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: `${4 + activeness * 4}px`,
                    height: `${4 + activeness * 4}px`,
                    background: "#d97757",
                    opacity: 0.3 + activeness * 0.5,
                  }}
                />
              </div>

              {/* Content — counter-rotated to stay readable */}
              <div
                className="absolute left-6 pointer-events-auto"
                style={{
                  transform: `rotate(${counterRotation}deg)`,
                  transformOrigin: "-24px 0",
                  width: "min(50vw, 480px)",
                  opacity: 0.15 + activeness * 0.85,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                {/* Number */}
                <span
                  className="text-[15px] font-medium block mb-3 transition-colors duration-300"
                  style={{ color: activeness > 0.3 ? "#141413" : "rgba(20,20,19,0.25)" }}
                >
                  {phase.num}
                </span>
                {/* Title */}
                <h3
                  className="text-[clamp(1.4rem,3.5vw,2.8rem)] font-medium leading-[1.1] mb-3 transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: activeness > 0.5 ? "#141413" : "rgba(20,20,19,0.15)",
                  }}
                >
                  {phase.title}
                </h3>
                {/* Description */}
                <p
                  className="text-[14px] leading-[1.65] max-w-[280px] transition-colors duration-300"
                  style={{
                    color: activeness > 0.5
                      ? "rgba(20,20,19,0.5)"
                      : "rgba(20,20,19,0.1)",
                  }}
                >
                  {phase.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer for scroll room */}
      <div className="relative z-10 h-[220vh] md:h-[180vh]" />
    </section>
  );
}
