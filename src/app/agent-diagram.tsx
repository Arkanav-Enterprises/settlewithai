"use client";

import { useEffect, useId, useRef, useState } from "react";

/* ─── Data ─── */

const AGENTS = [
  { name: "Offer Generator", viz: "doc" },
  { name: "MIS Reporter", viz: "chart" },
  { name: "Support Desk", viz: "chat" },
  { name: "Recruitment Hunter", viz: "search" },
  { name: "Service Report Writer", viz: "clipboard" },
  { name: "BOM Generator", viz: "cube" },
] as const;

type VizKey = (typeof AGENTS)[number]["viz"];

/* ─── Layouts ─── */

interface Layout {
  vb: { w: number; h: number };
  hub: { x: number; y: number; r: number };
  card: { w: number; h: number };
  positions: { x: number; y: number }[];
}

// Positions are intentionally slightly asymmetric (y offsets vary by ~10px
// between left and right columns) so the layout reads as a living system,
// not a PowerPoint diagram.
const DESKTOP: Layout = {
  vb: { w: 860, h: 480 },
  hub: { x: 430, y: 240, r: 52 },
  card: { w: 178, h: 72 },
  positions: [
    { x: 28, y: 22 },
    { x: 4, y: 208 },
    { x: 48, y: 388 },
    { x: 654, y: 32 },
    { x: 690, y: 198 },
    { x: 640, y: 378 },
  ],
};

const MOBILE: Layout = {
  vb: { w: 320, h: 740 },
  hub: { x: 160, y: 370, r: 40 },
  card: { w: 210, h: 50 },
  positions: [
    { x: 10, y: 12 },
    { x: 100, y: 82 },
    { x: 25, y: 152 },
    { x: 100, y: 552 },
    { x: 10, y: 622 },
    { x: 85, y: 692 },
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

/* ─── Live micro-vizes ───────────────────────────
   Each agent card shows a tiny animated SVG specific
   to its job. All animation via SMIL so instances
   don't share CSS class state when multiple diagrams
   render. 24×24 viewBox, uses currentColor for fill. */

function AgentViz({ type }: { type: VizKey }) {
  const stroke = { stroke: "currentColor", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    // Streaming text generation — lines draw in left-to-right, staggered
    case "doc":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <rect x="4.5" y="4" width="15" height="16" rx="1.8" {...stroke} strokeWidth="1.2" opacity="0.35" />
          {[
            { y: 8.5, len: 9, delay: 0 },
            { y: 12, len: 11.5, delay: 0.35 },
            { y: 15.5, len: 7.5, delay: 0.7 },
          ].map((bar, idx) => (
            <line
              key={idx}
              x1="7" y1={bar.y}
              x2={7 + bar.len} y2={bar.y}
              {...stroke}
              strokeWidth="1.4"
              strokeDasharray={bar.len}
              strokeDashoffset={bar.len}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`${bar.len};0;0;${bar.len}`}
                keyTimes="0;0.35;0.85;1"
                dur="3s"
                begin={`${bar.delay}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>
      );

    // Bar chart — bars grow from baseline, staggered
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <line x1="4" y1="20" x2="20" y2="20" {...stroke} strokeWidth="1.2" opacity="0.3" />
          {[
            { x: 5.5, h: 6, delay: 0 },
            { x: 10.5, h: 11, delay: 0.3 },
            { x: 15.5, h: 8, delay: 0.6 },
          ].map((bar, idx) => (
            <rect
              key={idx}
              x={bar.x}
              width="3"
              y={20 - bar.h}
              height={bar.h}
              rx="0.6"
              fill="currentColor"
              opacity="0.55"
            >
              <animate attributeName="height" values={`0;${bar.h};${bar.h};0`} keyTimes="0;0.3;0.85;1" dur="3.2s" begin={`${bar.delay}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`20;${20 - bar.h};${20 - bar.h};20`} keyTimes="0;0.3;0.85;1" dur="3.2s" begin={`${bar.delay}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </svg>
      );

    // Typing indicator — 3 dots bouncing in speech bubble
    case "chat":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M3 10a5 5 0 015-5h8a5 5 0 015 5v2a5 5 0 01-5 5h-4.5L8 20.5V17H8a5 5 0 01-5-5z" {...stroke} strokeWidth="1.2" opacity="0.35" />
          {[8, 12, 16].map((cx, idx) => (
            <circle key={cx} cx={cx} cy="11" r="1.1" fill="currentColor">
              <animate attributeName="cy" values="11;9;11;11" keyTimes="0;0.25;0.5;1" dur="1.4s" begin={`${idx * 0.18}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;1;0.35;0.35" keyTimes="0;0.25;0.5;1" dur="1.4s" begin={`${idx * 0.18}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );

    // Radar sweep — rotating sweep line over nested circles
    case "search":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="8" {...stroke} strokeWidth="1.2" opacity="0.3" />
          <circle cx="12" cy="12" r="5" {...stroke} strokeWidth="1" opacity="0.22" />
          <circle cx="12" cy="12" r="2" {...stroke} strokeWidth="1" opacity="0.5" />
          <g>
            <line x1="12" y1="12" x2="20" y2="12" {...stroke} strokeWidth="1.5" opacity="0.8" />
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="3.6s" repeatCount="indefinite" />
          </g>
          {/* Ping dot that briefly appears where the sweep finds something */}
          <circle cx="17" cy="8" r="1.2" fill="currentColor">
            <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.4;0.5;0.6;1" dur="3.6s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    // Checklist — 3 checks appear in sequence, then reset
    case "clipboard":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <rect x="5" y="4" width="14" height="17" rx="1.8" {...stroke} strokeWidth="1.2" opacity="0.35" />
          <rect x="9" y="2.5" width="6" height="3" rx="0.6" fill="currentColor" opacity="0.45" />
          {[8.5, 13, 17.5].map((cy, idx) => {
            const d = `M7.5 ${cy}l1.6 1.6L12 ${cy - 1.6}`;
            const lineLen = 5.6;
            return (
              <g key={idx}>
                <line x1="14" y1={cy + 0.3} x2="17.5" y2={cy + 0.3} {...stroke} strokeWidth="1.2" opacity="0.28" />
                <path d={d} {...stroke} strokeWidth="1.5" strokeDasharray={lineLen} strokeDashoffset={lineLen}>
                  <animate attributeName="stroke-dashoffset" values={`${lineLen};0;0;${lineLen}`} keyTimes="0;0.3;0.9;1" dur="3.5s" begin={`${idx * 0.35}s`} repeatCount="indefinite" />
                </path>
              </g>
            );
          })}
        </svg>
      );

    // BOM — 3 stacked blocks build up, one at a time
    case "cube":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          {[
            { y: 15.5, delay: 0 },
            { y: 10.5, delay: 0.4 },
            { y: 5.5, delay: 0.8 },
          ].map((b, idx) => (
            <g key={idx}>
              <rect x="7" y={b.y} width="10" height="3.5" rx="0.6" fill="currentColor" opacity="0.55">
                <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.25;0.9;1" dur="3.2s" begin={`${b.delay}s`} repeatCount="indefinite" />
                <animate attributeName="width" values="0;10;10;10" keyTimes="0;0.25;0.9;1" dur="3.2s" begin={`${b.delay}s`} repeatCount="indefinite" />
              </rect>
              {/* Subtle tick between stacks */}
              {idx < 2 && (
                <line x1="12" y1={b.y - 0.8} x2="12" y2={b.y - 1.8} {...stroke} strokeWidth="1" opacity="0.3" />
              )}
            </g>
          ))}
        </svg>
      );
  }
}

/* ─── Settle mark path ─── */

const SETTLE_D =
  "M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576";

/* ─── Shared diagram renderer ─── */

function Diagram({ L, paths, visible, uid }: { L: Layout; paths: string[]; visible: boolean; uid: string }) {
  const { vb, hub, card, positions } = L;
  const isVertical = vb.h > vb.w;
  const markScale = hub.r / 165;

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: vb.w, aspectRatio: `${vb.w}/${vb.h}` }}
    >
      <style>{`
        @keyframes agentFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes agentStatusPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
      >
        <defs>
          {/* Radial glow backdrop behind hub — gives depth, like a subtle sun */}
          <radialGradient id={`hubGlow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#d97757" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
          </radialGradient>

          {/* Hub inner gradient — soft highlight top-left, suggesting volume */}
          <radialGradient id={`hubFill-${uid}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#e89877" />
            <stop offset="60%" stopColor="#d97757" />
            <stop offset="100%" stopColor="#c56642" />
          </radialGradient>

          {/* Invisible path refs for traveling particles */}
          {paths.map((d, i) => (
            <path key={`def-${i}`} id={`${uid}-path-${i}`} d={d} />
          ))}
        </defs>

        {/* Hub glow backdrop */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={hub.r * 3}
          fill={`url(#hubGlow-${uid})`}
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 900ms ease 200ms",
          }}
        />

        {/* Base connecting curves — drawn on entrance, then stay subtle */}
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(20,20,19,0.11)"
            strokeWidth="1.25"
            strokeDasharray="600"
            style={{
              strokeDashoffset: visible ? 0 : 600,
              transition: `stroke-dashoffset 900ms cubic-bezier(0.33,1,0.68,1) ${350 + i * 120}ms`,
            }}
          />
        ))}

        {/* Traveling data packets — two per path, staggered, with faint trail */}
        {visible &&
          paths.map((_, i) => {
            const dur = 2.6 + i * 0.18;
            const begin = 1.2 + i * 0.3;
            return (
              <g key={`packet-${i}`}>
                {/* Trail — bigger, softer, slightly behind */}
                <circle r="4.5" fill="#d97757" opacity="0.12">
                  <animateMotion dur={`${dur}s`} begin={`${begin - 0.08}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${uid}-path-${i}`} />
                  </animateMotion>
                </circle>
                {/* Core packet */}
                <circle r="2.2" fill="#d97757" opacity="0.95">
                  <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${uid}-path-${i}`} />
                  </animateMotion>
                </circle>
                {/* Second packet delayed — creates constant flow */}
                <circle r="1.8" fill="#d97757" opacity="0.6">
                  <animateMotion dur={`${dur}s`} begin={`${begin + dur / 2}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${uid}-path-${i}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

        {/* Sonar pulse rings — expanding outward from hub */}
        {visible && (
          <>
            <circle cx={hub.x} cy={hub.y} r={hub.r} fill="none" stroke="#d97757" strokeWidth="1.4">
              <animate attributeName="r" values={`${hub.r};${hub.r + 42}`} dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1.6;0.4" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={hub.x} cy={hub.y} r={hub.r} fill="none" stroke="#d97757" strokeWidth="1.4">
              <animate attributeName="r" values={`${hub.r};${hub.r + 42}`} dur="3.2s" begin="1.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1.6;0.4" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Hub outer ring — fixed */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={hub.r + 6}
          fill="none"
          stroke="rgba(217,119,87,0.28)"
          strokeWidth="1.5"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 600ms ease 300ms" }}
        />

        {/* Hub filled circle with gradient */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={hub.r}
          fill={`url(#hubFill-${uid})`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.7)",
            transformOrigin: `${hub.x}px ${hub.y}px`,
            transition: "all 600ms cubic-bezier(0.16,1,0.3,1)",
            filter: "drop-shadow(0 4px 12px rgba(217,119,87,0.35))",
          }}
        />

        {/* Settle mark inside hub */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms ease 500ms" }}>
          <g transform={`translate(${hub.x - 100 * markScale},${hub.y - 150 * markScale}) scale(${markScale})`}>
            <path d={SETTLE_D} stroke="rgba(255,255,255,0.7)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* Hub label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{
          top: `${((hub.y + hub.r + 14) / vb.h) * 100}%`,
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease 600ms",
        }}
      >
        <span
          className="text-[11.5px] md:text-[12.5px] uppercase tracking-[0.14em] font-medium text-text-muted"
        >
          Your AI layer
        </span>
      </div>

      {/* Agent cards */}
      {AGENTS.map((agent, i) => {
        const pos = positions[i];
        const floatDur = 3.6 + i * 0.32;
        const floatDelay = 1.9 + i * 0.11;
        const pulseDelay = i * 0.5;
        return (
          <div
            key={agent.name}
            className="absolute rounded-xl overflow-hidden"
            style={{
              left: `${(pos.x / vb.w) * 100}%`,
              top: `${(pos.y / vb.h) * 100}%`,
              width: `${(card.w / vb.w) * 100}%`,
              opacity: visible ? 1 : 0,
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${700 + i * 120}ms`,
              animation: visible
                ? `agentFloat ${floatDur}s ease-in-out ${floatDelay}s infinite`
                : "none",
            }}
          >
            {/* Card surface with subtle gradient + accent left edge */}
            <div
              className="relative flex items-center gap-2.5 border border-black/[0.06]"
              style={{
                padding: isVertical ? "9px 11px 9px 13px" : "12px 14px 12px 16px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow:
                  "0 1px 2px rgba(20,20,19,0.04), 0 8px 24px -8px rgba(20,20,19,0.08)",
                borderRadius: "inherit",
              }}
            >
              {/* Left accent stripe — subtle brand cue */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-accent/35"
              />

              {/* Micro-viz */}
              <div
                className="shrink-0 rounded-lg flex items-center justify-center text-accent"
                style={{
                  width: isVertical ? 30 : 38,
                  height: isVertical ? 30 : 38,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(217,119,87,0.14), rgba(217,119,87,0.04))",
                  border: "1px solid rgba(217,119,87,0.14)",
                }}
              >
                <div style={{ width: isVertical ? 18 : 22, height: isVertical ? 18 : 22 }}>
                  <AgentViz type={agent.viz} />
                </div>
              </div>

              {/* Label */}
              <span
                className="font-medium text-text leading-tight flex-1 min-w-0"
                style={{
                  fontSize: isVertical ? 11.5 : 13,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.005em",
                }}
              >
                {agent.name}
              </span>

              {/* Active status pulse — top right */}
              <span
                aria-hidden
                className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent"
                style={{
                  animation: visible
                    ? `agentStatusPulse 2.4s ease-in-out ${pulseDelay}s infinite`
                    : "none",
                }}
              />
            </div>
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
  const uid = useId().replace(/:/g, "");

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
      <Diagram L={L} paths={P} visible={visible} uid={uid} />
    </div>
  );
}
