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
  card: { w: 188, h: 78 },
  positions: [
    { x: 22, y: 22 },
    { x: 0, y: 204 },
    { x: 42, y: 386 },
    { x: 650, y: 30 },
    { x: 688, y: 200 },
    { x: 636, y: 378 },
  ],
};

const MOBILE: Layout = {
  vb: { w: 320, h: 760 },
  hub: { x: 160, y: 380, r: 40 },
  card: { w: 216, h: 56 },
  positions: [
    { x: 8, y: 14 },
    { x: 96, y: 92 },
    { x: 22, y: 170 },
    { x: 96, y: 570 },
    { x: 8, y: 648 },
    { x: 82, y: 726 },
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
              opacity="0.6"
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
              <rect x="7" y={b.y} width="10" height="3.5" rx="0.6" fill="currentColor" opacity="0.6">
                <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.25;0.9;1" dur="3.2s" begin={`${b.delay}s`} repeatCount="indefinite" />
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

/* ─── Corner bracket (engineering-drawing mark) ─── */

function CornerBracket({
  pos,
  size = 18,
  strokeWidth = 1.25,
}: {
  pos: "tl" | "tr" | "bl" | "br";
  size?: number;
  strokeWidth?: number;
}) {
  const offsets: Record<typeof pos, { top?: number; left?: number; right?: number; bottom?: number; d: string }> = {
    tl: { top: 10, left: 10, d: `M ${size} 0 L 0 0 L 0 ${size}` },
    tr: { top: 10, right: 10, d: `M 0 0 L ${size} 0 L ${size} ${size}` },
    bl: { bottom: 10, left: 10, d: `M 0 0 L 0 ${size} L ${size} ${size}` },
    br: { bottom: 10, right: 10, d: `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size}` },
  };
  const o = offsets[pos];
  const d = pos === "br" ? `M 0 ${size} L ${size} ${size} L ${size} 0` : o.d;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none"
      style={{ top: o.top, left: o.left, right: o.right, bottom: o.bottom }}
      fill="none"
    >
      <path d={d} stroke="rgba(217,119,87,0.55)" strokeWidth={strokeWidth} strokeLinecap="square" />
    </svg>
  );
}

/* ─── Shared diagram renderer ─── */

function Diagram({ L, paths, visible, uid }: { L: Layout; paths: string[]; visible: boolean; uid: string }) {
  const { vb, hub, card, positions } = L;
  const isVertical = vb.h > vb.w;
  const markScale = hub.r / 165;

  return (
    <div
      className="relative mx-auto w-full"
      // On mobile (isVertical layout) we drop the vb.w cap so the canvas
      // fills the parent's available width — viewBox keeps positions
      // proportional, aspectRatio keeps the frame from distorting.
      style={{ maxWidth: isVertical ? undefined : vb.w, aspectRatio: `${vb.w}/${vb.h}` }}
    >
      <style>{`
        @keyframes agentFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes agentScan-${uid} {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translateX(220%); opacity: 0; }
        }
        @keyframes agentStatus-${uid} {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes canvasNoise-${uid} {
          0%, 100% { background-position: 0 0; }
          50% { background-position: 40px 20px; }
        }
      `}</style>

      {/* ── Canvas frame — hairline graph grid on the page's cream bg,
         corner brackets to anchor the diagram as a technical drawing. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[18px] md:rounded-[22px] overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 700ms ease",
        }}
      >
        {/* Hairline grid — faint, editorial graph-paper feel */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(20,20,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 95%)",
          }}
        />
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />
      </div>

      <svg
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
      >
        <defs>
          {/* Radial glow backdrop behind hub — gives depth on the dark canvas */}
          <radialGradient id={`hubGlow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#d97757" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
          </radialGradient>

          {/* Hub inner gradient — soft highlight top-left, suggesting volume */}
          <radialGradient id={`hubFill-${uid}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#eea487" />
            <stop offset="60%" stopColor="#d97757" />
            <stop offset="100%" stopColor="#b95a3a" />
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
          r={hub.r * 3.2}
          fill={`url(#hubGlow-${uid})`}
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 900ms ease 200ms",
          }}
        />

        {/* Base connecting curves — ink-tinted hairlines on cream */}
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(20,20,19,0.22)"
            strokeWidth="1.15"
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
                <circle r="5" fill="#eea487" opacity="0.18">
                  <animateMotion dur={`${dur}s`} begin={`${begin - 0.08}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${uid}-path-${i}`} />
                  </animateMotion>
                </circle>
                {/* Core packet */}
                <circle r="2.4" fill="#f5b896" opacity="1">
                  <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${uid}-path-${i}`} />
                  </animateMotion>
                </circle>
                {/* Second packet delayed — creates constant flow */}
                <circle r="1.9" fill="#d97757" opacity="0.75">
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
              <animate attributeName="r" values={`${hub.r};${hub.r + 48}`} dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1.6;0.4" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={hub.x} cy={hub.y} r={hub.r} fill="none" stroke="#d97757" strokeWidth="1.4">
              <animate attributeName="r" values={`${hub.r};${hub.r + 48}`} dur="3.2s" begin="1.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
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
          stroke="rgba(217,119,87,0.45)"
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
            filter: "drop-shadow(0 6px 22px rgba(217,119,87,0.55))",
          }}
        />

        {/* Settle mark inside hub */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms ease 500ms" }}>
          <g transform={`translate(${hub.x - 100 * markScale},${hub.y - 150 * markScale}) scale(${markScale})`}>
            <path d={SETTLE_D} stroke="rgba(255,250,242,0.85)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* Hub label — ink-gray on cream */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{
          top: `${((hub.y + hub.r + 16) / vb.h) * 100}%`,
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease 600ms",
        }}
      >
        <span
          className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-medium"
          style={{
            color: "rgba(20,20,19,0.55)",
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          }}
        >
          your · ai · layer
        </span>
      </div>

      {/* Agent cards — ledger entries with mono index, serif name, framed viz.
         Each card carries a subtle pseudo-random tilt so the grid feels
         hand-placed rather than CMS-generated. */}
      {AGENTS.map((agent, i) => {
        const pos = positions[i];
        const floatDur = 3.6 + i * 0.32;
        const floatDelay = 1.9 + i * 0.11;
        // Packet arrival cadence — status pulse syncs with incoming data flow
        const packetDur = 2.6 + i * 0.18;
        const packetBegin = 1.2 + i * 0.3;
        // Subtle tilt — alternating, ~1deg
        const tilt = (i % 2 === 0 ? -1 : 1) * (0.5 + (i % 3) * 0.25);
        const indexLabel = `AGT-${String(i + 1).padStart(2, "0")}`;

        return (
          <div
            key={agent.name}
            className="absolute group"
            style={{
              left: `${(pos.x / vb.w) * 100}%`,
              top: `${(pos.y / vb.h) * 100}%`,
              width: `${(card.w / vb.w) * 100}%`,
              opacity: visible ? 1 : 0,
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${700 + i * 120}ms`,
              animation: visible
                ? `agentFloat ${floatDur}s ease-in-out ${floatDelay}s infinite`
                : "none",
              transform: `rotate(${tilt}deg)`,
            }}
          >
            {/* Card: cream ledger entry against dark canvas */}
            <div
              className="relative overflow-hidden rounded-[10px]"
              style={{
                background:
                  "linear-gradient(180deg, #efede3 0%, #e4e1d4 100%)",
                border: "1px solid rgba(20,20,19,0.14)",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.4) inset, 0 0 0 1px rgba(255,255,255,0.04), 0 10px 28px -14px rgba(0,0,0,0.55)",
              }}
            >
              {/* Scan line — a subtle highlight travels across once in a while,
                 signalling the agent is "active" (not just rendered) */}
              <span
                aria-hidden
                className="absolute inset-y-0 w-[40%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(217,119,87,0.18), transparent)",
                  animation: visible
                    ? `agentScan-${uid} ${6 + i * 0.7}s ease-in-out ${2 + i * 0.8}s infinite`
                    : "none",
                }}
              />

              {/* Accent gutter on the left — a small "tabbed" mark */}
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(217,119,87,0.9), rgba(217,119,87,0.35))",
                }}
              />

              <div
                className="relative flex items-stretch gap-2.5"
                style={{ padding: isVertical ? "8px 10px 8px 12px" : "10px 12px 10px 14px" }}
              >
                {/* Micro-viz — framed like a specimen window */}
                <div
                  className="shrink-0 flex items-center justify-center text-[#a94f2f]"
                  style={{
                    width: isVertical ? 34 : 44,
                    height: isVertical ? 34 : 44,
                    borderRadius: 6,
                    background:
                      "linear-gradient(180deg, rgba(217,119,87,0.1), rgba(217,119,87,0.04))",
                    border: "1px solid rgba(217,119,87,0.28)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                  }}
                >
                  <div style={{ width: isVertical ? 20 : 26, height: isVertical ? 20 : 26 }}>
                    <AgentViz type={agent.viz} />
                  </div>
                </div>

                {/* Text stack */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-[2px]">
                    <span
                      style={{
                        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                        fontSize: isVertical ? 8.5 : 9.5,
                        letterSpacing: "0.12em",
                        color: "#a94f2f",
                        fontWeight: 600,
                      }}
                    >
                      {indexLabel}
                    </span>
                    <span
                      aria-hidden
                      className="h-[1px] flex-1"
                      style={{ background: "rgba(20,20,19,0.14)" }}
                    />
                    <span
                      aria-hidden
                      className="shrink-0 rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: "#d97757",
                        animation: visible
                          ? `agentStatus-${uid} ${packetDur}s ease-in-out ${packetBegin}s infinite`
                          : "none",
                      }}
                    />
                  </div>
                  <span
                    className="font-medium block"
                    style={{
                      fontSize: isVertical ? 12.5 : 13.5,
                      lineHeight: 1.2,
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "-0.015em",
                      color: "#141413",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {agent.name}
                  </span>
                </div>
              </div>
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
  // Lazy init so the first render already reflects viewport width.
  // Component is loaded via dynamic({ ssr: false }), so `window` is safe,
  // but the typeof guard keeps the lazy initializer lint-clean.
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches,
  );
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
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
      {/* ── Top ribbon — mono status banner above the canvas.
         Pulsing dot + monospaced caps set the "live ops" tone. */}
      <div
        className="relative mx-auto w-full flex items-center justify-between mb-3 md:mb-4 px-1"
        style={{ maxWidth: mobile ? undefined : L.vb.w }}
      >
        <div
          className="flex items-center gap-2"
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "rgba(20,20,19,0.55)",
            textTransform: "uppercase",
          }}
        >
          <span
            aria-hidden
            className="inline-block w-[7px] h-[7px] rounded-full"
            style={{
              background: "#d97757",
              boxShadow: "0 0 0 3px rgba(217,119,87,0.18)",
              animation: visible ? `agentStatus-${uid} 2.4s ease-in-out infinite` : "none",
            }}
          />
          <span>settle · agent layer</span>
        </div>
        <div
          className="flex items-center gap-3"
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "rgba(20,20,19,0.4)",
            textTransform: "uppercase",
          }}
        >
          <span className="hidden sm:inline">06 / 06 online</span>
          <span className="hidden md:inline text-accent/70">●</span>
          <span>v2026.04</span>
        </div>
      </div>

      <Diagram L={L} paths={P} visible={visible} uid={uid} />

      {/* ── Bottom ribbon — caption line beneath the canvas.
         Left: orchestration credit. Right: legend key. */}
      <div
        className="relative mx-auto w-full flex items-center justify-between mt-3 md:mt-4 px-1"
        style={{ maxWidth: mobile ? undefined : L.vb.w }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "rgba(20,20,19,0.4)",
            textTransform: "uppercase",
          }}
        >
          orchestrated by claude
        </div>
        <div
          className="hidden sm:flex items-center gap-3"
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "rgba(20,20,19,0.32)",
            textTransform: "uppercase",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
            />
            packet
          </span>
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block w-3 h-[1px]"
              style={{ background: "rgba(20,20,19,0.35)" }}
            />
            flow
          </span>
        </div>
      </div>
    </div>
  );
}
