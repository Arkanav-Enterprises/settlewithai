"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Data ─── */

const AGENTS = [
  { name: "Offer Generator", icon: "doc" },
  { name: "MIS Reporter", icon: "chart" },
  { name: "Support Desk", icon: "chat" },
  { name: "Recruitment Hunter", icon: "search" },
  { name: "Service Report Writer", icon: "clipboard" },
  { name: "BOM Generator", icon: "cube" },
] as const;

type IconKey = (typeof AGENTS)[number]["icon"];

/* ─── Layouts ─── */

interface Layout {
  vb: { w: number; h: number };
  hub: { x: number; y: number; r: number };
  card: { w: number; h: number };
  positions: { x: number; y: number }[];
}

const DESKTOP: Layout = {
  vb: { w: 860, h: 480 },
  hub: { x: 430, y: 240, r: 50 },
  card: { w: 170, h: 68 },
  positions: [
    { x: 25, y: 25 },
    { x: 5, y: 200 },
    { x: 35, y: 375 },
    { x: 665, y: 25 },
    { x: 685, y: 200 },
    { x: 655, y: 375 },
  ],
};

const MOBILE: Layout = {
  vb: { w: 320, h: 740 },
  hub: { x: 160, y: 370, r: 38 },
  card: { w: 210, h: 46 },
  positions: [
    { x: 10, y: 15 },
    { x: 100, y: 85 },
    { x: 25, y: 155 },
    { x: 100, y: 550 },
    { x: 10, y: 620 },
    { x: 85, y: 690 },
  ],
};

function buildPaths(L: Layout) {
  const { hub, card, positions, vb } = L;
  const isVertical = vb.h > vb.w;

  return positions.map((pos, i) => {
    if (isVertical) {
      const above = i < 3;
      const cx = pos.x + card.w / 2;
      const cy = above ? pos.y + card.h : pos.y;
      const cp1y = above ? hub.y - (hub.y - cy) * 0.6 : hub.y + (cy - hub.y) * 0.6;
      const cp2y = above ? cy + (hub.y - cy) * 0.25 : cy - (cy - hub.y) * 0.25;
      return `M ${hub.x} ${hub.y} C ${hub.x + (cx - hub.x) * 0.3} ${cp1y}, ${cx} ${cp2y}, ${cx} ${cy}`;
    }
    const left = i < 3;
    const ex = left ? pos.x + card.w : pos.x;
    const ey = pos.y + card.h / 2;
    const cp1x = left ? hub.x - 120 : hub.x + 120;
    const cp2x = left ? ex + 100 : ex - 100;
    return `M ${hub.x} ${hub.y} C ${cp1x} ${hub.y}, ${cp2x} ${ey}, ${ex} ${ey}`;
  });
}

const DESKTOP_PATHS = buildPaths(DESKTOP);
const MOBILE_PATHS = buildPaths(MOBILE);

/* ─── Icons ─── */

function AgentIcon({ icon, className = "" }: { icon: IconKey; className?: string }) {
  const c = `w-5 h-5 ${className}`;
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "doc":
      return <svg viewBox="0 0 24 24" className={c} {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>;
    case "chart":
      return <svg viewBox="0 0 24 24" className={c} {...p}><path d="M18 20V10M12 20V4M6 20v-6" /></svg>;
    case "chat":
      return <svg viewBox="0 0 24 24" className={c} {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
    case "search":
      return <svg viewBox="0 0 24 24" className={c} {...p}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
    case "clipboard":
      return <svg viewBox="0 0 24 24" className={c} {...p}><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1M9 13l2 2 4-4" /></svg>;
    case "cube":
      return <svg viewBox="0 0 24 24" className={c} {...p}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>;
  }
}

/* ─── Settle mark path ─── */

const SETTLE_D =
  "M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576";

/* ─── Shared diagram renderer ─── */

function Diagram({ L, paths, visible }: { L: Layout; paths: string[]; visible: boolean }) {
  const { vb, hub, card, positions } = L;
  const isVertical = vb.h > vb.w;
  const markScale = hub.r / 165;

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: vb.w, aspectRatio: `${vb.w}/${vb.h}` }}
    >
      {/* Scoped keyframes for float + flow animations */}
      <style>{`
        @keyframes agentFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes agentFlow {
          to { stroke-dashoffset: -34; }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
      >
        {/* Base connecting curves — rendered FIRST so hub paints on top */}
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(20,20,19,0.1)"
            strokeWidth="1.5"
            strokeDasharray="600"
            style={{
              strokeDashoffset: visible ? 0 : 600,
              transition: `stroke-dashoffset 900ms cubic-bezier(0.33,1,0.68,1) ${350 + i * 120}ms`,
            }}
          />
        ))}

        {/* Flowing orange current overlay — same paths, short dashes that animate */}
        {paths.map((d, i) => (
          <path
            key={`flow-${i}`}
            d={d}
            stroke="rgba(217,119,87,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="6 28"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 400ms ease ${1400 + i * 100}ms`,
              animation: visible
                ? `agentFlow ${2.2 + i * 0.15}s linear ${1.5 + i * 0.1}s infinite`
                : "none",
            }}
          />
        ))}

        {/* Hub glow ring */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={hub.r + 7}
          fill="none"
          stroke="rgba(217,119,87,0.15)"
          strokeWidth="3.5"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 600ms ease" }}
        />

        {/* Hub filled circle */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={hub.r}
          fill="#d97757"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.7)",
            transformOrigin: `${hub.x}px ${hub.y}px`,
            transition: "all 600ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Settle mark inside hub */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms ease 300ms" }}>
          <g transform={`translate(${hub.x - 100 * markScale},${hub.y - 150 * markScale}) scale(${markScale})`}>
            <path d={SETTLE_D} stroke="rgba(255,255,255,0.55)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* Hub label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{
          top: `${((hub.y + hub.r + 12) / vb.h) * 100}%`,
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease 400ms",
        }}
      >
        <span
          className="text-[12px] md:text-[13px] font-medium text-text-muted"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Your AI layer
        </span>
      </div>

      {/* Agent cards — float gently after entrance */}
      {AGENTS.map((agent, i) => {
        const pos = positions[i];
        const fromStart = isVertical ? i < 3 : i < 3;
        const floatDur = 3.4 + i * 0.35;
        const floatDelay = 1.8 + i * 0.12;
        return (
          <div
            key={agent.name}
            className="absolute flex items-center gap-2.5 rounded-xl border border-border-light"
            style={{
              left: `${(pos.x / vb.w) * 100}%`,
              top: `${(pos.y / vb.h) * 100}%`,
              width: `${(card.w / vb.w) * 100}%`,
              padding: isVertical ? "8px 10px" : "12px 14px",
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              opacity: visible ? 1 : 0,
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${650 + i * 120}ms`,
              animation: visible
                ? `agentFloat ${floatDur}s ease-in-out ${floatDelay}s infinite`
                : "none",
            }}
          >
            <div
              className="rounded-full flex items-center justify-center bg-[rgba(20,20,19,0.05)] text-text-muted shrink-0"
              style={{ width: isVertical ? 28 : 36, height: isVertical ? 28 : 36 }}
            >
              <AgentIcon icon={agent.icon} className={isVertical ? "!w-3.5 !h-3.5" : ""} />
            </div>
            <span
              className="font-medium text-text leading-tight"
              style={{
                fontSize: isVertical ? 11 : 12.5,
                fontFamily: "var(--font-heading)",
              }}
            >
              {agent.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Component ─── */

export default function AgentDiagram({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const L = mobile ? MOBILE : DESKTOP;
  const P = mobile ? MOBILE_PATHS : DESKTOP_PATHS;

  return (
    <div ref={ref} className={className}>
      <Diagram L={L} paths={P} visible={visible} />
    </div>
  );
}
