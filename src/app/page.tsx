"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { AskClaude } from "@/components/AskClaude";

const Globe = dynamic(() => import("./globe"), { ssr: false });
const Mindmap = dynamic(() => import("./mindmap"), { ssr: false });
const CoworkDemo = dynamic(() => import("./cowork-demo"), { ssr: false });
const ProcessScroll = dynamic(() => import("./process-scroll"), { ssr: false });
const AgentDiagram = dynamic(() => import("./agent-diagram"), { ssr: false });

/* ─── Scroll-triggered fade-in ──────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll(".fade-up"));
    if (targets.length === 0) return;

    // Mark elements already in viewport as visible immediately
    targets.forEach((t) => {
      const rect = t.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        t.classList.add("visible");
      }
    });

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
    );
    targets.forEach((t) => {
      if (!t.classList.contains("visible")) obs.observe(t);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Arrow icon ────────────────────────────────────────── */

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M1 7h11m0 0L8 3m4 4L8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Claude tooltip ───────────────────────────────────── */

function ClaudeTooltip() {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const hide = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <span
      className="inline items-baseline text-accent relative cursor-default"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <img
        src="/claude-color.svg"
        alt=""
        className="inline-block w-[0.85em] h-[0.85em] mr-1 align-baseline animate-breathe"
        aria-hidden="true"
      />
      Claude (or any AI you use!)
      {open && (
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="claude-tooltip"
          onMouseEnter={show}
          onMouseLeave={hide}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="claude-tooltip-header">
            <img
              src="/claude-color.svg"
              alt="Claude"
              className="w-8 h-8 rounded-md"
            />
            <h3>Claude AI</h3>
          </div>
          <p>
            Anthropic&apos;s AI assistant &mdash; built to be helpful,
            harmless, and honest. The model we deploy for every client.
          </p>
          <span className="claude-tooltip-link">
            claude.ai
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h11m0 0L8 3m4 4L8 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      )}
    </span>
  );
}

/* ─── Hero subtitle typewriter ──────────────────────────
   Types out the hero subtitle on first load. Every character
   is rendered upfront at opacity:0 so the liquid-glass card
   has its final size from frame one — no layout shift. The
   <ClaudeTooltip /> in the middle is treated as a single
   typing tick (with a slightly longer pause) so it pops in
   between the prefix and suffix without breaking interactivity. */

const HERO_PREFIX = "We settle ";
const HERO_SUFFIX =
  " into your team\u2019s actual workflows \u2014 structured rollouts, production-grade instructions, and real results. No AI expertise required on your end.";
const HERO_TOTAL = HERO_PREFIX.length + 1 + HERO_SUFFIX.length;

function HeroSubtitle() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setI(HERO_TOTAL);
      return;
    }

    let cancelled = false;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      n += 1;
      setI(n);
      if (n >= HERO_TOTAL) return;
      // longer pause when the tooltip pops in (the "atom" tick)
      const isTooltipTick = n === HERO_PREFIX.length;
      timer = setTimeout(tick, isTooltipTick ? 140 : 22);
    };

    const start = setTimeout(tick, 280);
    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="text-text text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.7]">
      {[...HERO_PREFIX].map((c, idx) => (
        <span
          key={`p${idx}`}
          style={{ opacity: idx < i ? 1 : 0 }}
          aria-hidden={idx < i ? undefined : true}
        >
          {c}
        </span>
      ))}
      <span
        style={{ opacity: i > HERO_PREFIX.length ? 1 : 0 }}
        aria-hidden={i > HERO_PREFIX.length ? undefined : true}
      >
        <ClaudeTooltip />
      </span>
      {[...HERO_SUFFIX].map((c, idx) => (
        <span
          key={`s${idx}`}
          style={{ opacity: idx + HERO_PREFIX.length + 1 < i ? 1 : 0 }}
          aria-hidden={idx + HERO_PREFIX.length + 1 < i ? undefined : true}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* ─── Orient case study card (expandable) ───────────────
   Always-visible: header, pull quote, the three headline stats.
   Plus button (top-right) reveals brochure-style detail below:
   the challenge, what we did, and the missing 4hr→30m metric.
   The reveal animates via grid-template-rows 0fr→1fr so the
   inner content's natural height is honored without max-height
   guesswork. */
function OrientCaseStudyCard() {
  const [open, setOpen] = useState(false);

  /* The .fade-up wrapper is intentionally a separate element from the card
     itself. useFadeIn() imperatively adds a `visible` class via classList.add
     to trigger the opacity-0 → opacity-1 transition. If we put fade-up on the
     same element whose className React re-renders based on `open` state,
     React would overwrite the imperative `visible` class on every re-render
     and the card would snap back to opacity 0 (disappearing on click).
     Splitting them keeps the fade-up wrapper's className stable so React
     never touches it. */
  return (
    <div className="fade-up">
      <div
        className={`rounded-xl p-8 md:p-12 lg:p-16 relative transition-colors duration-200 ${
          !open ? "cursor-pointer hover:bg-[rgba(0,0,0,0.02)]" : ""
        }`}
        onClick={() => {
          // Whole card opens the detail. Only opens — never auto-collapses,
          // so users reading the expanded content can't close it by accident.
          // The +/× button (which calls stopPropagation) handles collapsing.
          if (!open) setOpen(true);
        }}
        role={!open ? "button" : undefined}
        tabIndex={!open ? 0 : undefined}
        onKeyDown={(e) => {
          if (!open && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={{
          background: "rgba(0,0,0,0.04)",
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow:
            "inset 1px 1px 1px rgba(0,0,0,0.1), inset -1px -1px 1px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* Expand/collapse button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          aria-expanded={open}
          aria-controls="orient-case-detail"
          aria-label={
            open ? "Collapse case study details" : "Expand case study details"
          }
          className="absolute top-5 right-5 md:top-6 md:right-6 w-10 h-10 rounded-full border border-[rgba(20,20,19,0.15)] bg-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.75)] flex items-center justify-center transition-colors duration-200 z-10"
        >
          <span className="relative block w-4 h-4" aria-hidden="true">
            {/* Horizontal bar — always visible (becomes the minus when open) */}
            <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-text -translate-y-1/2 rounded-full" />
            {/* Vertical bar — collapses to form the minus */}
            <span
              className="absolute top-0 left-1/2 h-full w-[1.5px] bg-text rounded-full origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: open
                  ? "translateX(-50%) scaleY(0)"
                  : "translateX(-50%) scaleY(1)",
              }}
            />
          </span>
        </button>

        {/* header — stack on mobile so the title doesn't squish next to the logo.
         items-start prevents the <img> from stretching to full width when the
         flex container is in column mode (default align-items: stretch). */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-5 mb-10 pr-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/orient-logo.png"
            alt="Orient Printing & Packaging"
            width={259}
            height={78}
            loading="lazy"
            className="h-10 w-auto"
          />
          <div>
            <div className="font-medium text-[17px]">
              Orient Printing & Packaging
            </div>
            <div className="text-sm text-text-faint mt-0.5">
              Manufacturing · 79 years in operation · 50+ countries
            </div>
          </div>
        </div>

        {/* quote */}
        <blockquote className="border-l-2 border-accent pl-6 md:pl-8 text-text-muted text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.8] mb-12 max-w-3xl">
          &ldquo;49 use cases mapped across 7 departments. 18 agents
          structured. 11 deployed in the first engagement &mdash; from offer
          generation to BOM creation to service troubleshooting. Phased from
          quick wins to ERP integration over six months.&rdquo;
        </blockquote>

        {/* stats — 4-up bordered strip, identical to the homepage band that
         used to live above this card. Hairline dividers form a 2×2 cross on
         mobile and a single row of verticals on desktop so the four metrics
         read as one cohesive object. */}
        <div className="grid grid-cols-2 md:grid-cols-4 items-stretch">
          {[
            {
              key: "docs",
              value: "85%",
              label: "Faster document generation" as React.ReactNode,
            },
            {
              key: "projects",
              value: "11",
              label: "Agents deployed" as React.ReactNode,
            },
            {
              key: "usecases",
              value: "49",
              label: "Use cases mapped" as React.ReactNode,
            },
            {
              key: "tasktime",
              value: "8×",
              label: (
                <>
                  Faster task time
                  <span className="block mt-1 text-text-faint normal-case tracking-[0.12em] text-[9.5px] md:text-[10px]">
                    4h <span className="text-accent">→</span> 30m
                  </span>
                </>
              ),
            },
          ].map((s, i) => (
            <div
              key={s.key}
              className={[
                "text-center px-3 py-6 md:py-4 flex flex-col justify-center",
                "border-[rgba(20,20,19,0.12)]",
                i % 2 === 1 ? "border-l" : "",
                i >= 2 ? "border-t md:border-t-0" : "",
                i >= 1 ? "md:border-l" : "",
              ].join(" ")}
            >
              <div
                className="text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-[1.15] mb-3 text-text"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </div>
              <div className="text-text-muted text-[10.5px] md:text-[11px] uppercase tracking-[0.16em] leading-relaxed">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Expandable detail — grid-rows 0fr→1fr trick */}
        <div
          id="orient-case-detail"
          className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div
              className="pt-12 mt-12 border-t border-[rgba(20,20,19,0.08)] transition-opacity duration-500"
              style={{
                opacity: open ? 1 : 0,
                transitionDelay: open ? "120ms" : "0ms",
              }}
            >
              {/* ── Section A: Featured case study (brochure page 4) ── */}
              <div className="mb-16">
                <div className="text-[11px] uppercase tracking-[0.15em] text-text-faint mb-4">
                  Featured case study
                </div>
                <h3
                  className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-[1.15] mb-10 max-w-2xl text-text"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  From manual offer-making to an AI-native operating layer.
                </h3>
                <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-4xl">
                  <div>
                    <h4
                      className="text-text text-[14px] font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      The challenge
                    </h4>
                    <p className="text-text-muted text-[14.5px] leading-[1.75]">
                      Orient&rsquo;s sales engineers were spending half-days
                      hand-building branded customer quotations across four
                      machine lines, with pricing logic, terms, and
                      configurations buried across spreadsheets and email
                      threads. Marketing was running on instinct. Prospects had
                      no way to self-serve product information after hours.
                    </p>
                  </div>
                  <div>
                    <h4
                      className="text-text text-[14px] font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      What we did
                    </h4>
                    <p className="text-text-muted text-[14.5px] leading-[1.75]">
                      We mapped every repeatable workflow across seven
                      departments, deployed eleven production-grade Claude
                      agents starting with a fully branded Offer Generator,
                      codified the brand and pricing logic into a single
                      knowledge base, and surfaced that same knowledge base to
                      prospects through a customer-facing landing page and chat
                      widget.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Section B: Inside the build (brochure page 5) ── */}
              <div className="mb-16 pt-14 border-t border-[rgba(20,20,19,0.06)]">
                <div className="text-[11px] uppercase tracking-[0.15em] text-text-faint mb-4">
                  Inside the build
                </div>
                <h3
                  className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-[1.15] mb-6 max-w-2xl text-text"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Production-grade Claude. Not a ChatGPT subscription.
                </h3>
                <p
                  className="text-text text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.55] max-w-2xl mb-10 italic"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;Capability without structure is just a chat window. The
                  structure is where the value lives.&rdquo;
                </p>

                {/* Claude frame screenshot */}
                <div className="rounded-xl overflow-hidden border border-[rgba(20,20,19,0.1)] bg-bg shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-3">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[rgba(20,20,19,0.04)] border-b border-[rgba(20,20,19,0.08)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <div className="flex-1 text-center text-[11px] text-text-faint font-medium px-2 truncate">
                      claude.ai · OrientPrint &mdash; Sales Proposals &amp;
                      Pricing{" "}
                      <span className="text-accent">/ Price generation</span>
                    </div>
                    <div className="w-12 shrink-0" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/orient/claude-pricing-output.png"
                    alt="Real Claude-generated sales proposal for Orient with line items, GST, and an open question flagged"
                    loading="lazy"
                    className="w-full block"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 mb-12 text-[12px]">
                  <div className="text-text-muted leading-snug">
                    An actual proposal generated by Orient&rsquo;s Claude
                    agent. Branded line items. GST math. A flagged ambiguity.
                  </div>
                  <div className="text-accent font-semibold uppercase tracking-[0.08em] text-[10px] shrink-0 mt-0.5">
                    Real output
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-4xl">
                  <div>
                    <h4
                      className="text-text text-[14px] font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      The structure behind it
                    </h4>
                    <p className="text-text-muted text-[14.5px] leading-[1.75]">
                      Eight branded machine spec docs. Three knowledge files for
                      pricing logic, domestic terms, and international terms.
                      One project instructions file that wires it all together.
                      Not a clever prompt &mdash; a production-grade Claude
                      agent trained on the entire sales surface of an
                      eight-decade-old manufacturer.
                    </p>
                  </div>
                  <div>
                    <h4
                      className="text-text text-[14px] font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      What your team gets
                    </h4>
                    <p className="text-text-muted text-[14.5px] leading-[1.75]">
                      Four-hour quotation work compressed to thirty minutes.
                      Branded outputs that look like yours, not like a chatbot.
                      An LLM that knows your products by name, your prices to
                      the rupee, and your terms by version. And the safety to
                      flag what it doesn&rsquo;t know instead of inventing it.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Section C: Customer-facing layer (brochure page 6) ── */}
              <div className="mb-12 pt-14 border-t border-[rgba(20,20,19,0.06)]">
                <div className="text-[11px] uppercase tracking-[0.15em] text-text-faint mb-4">
                  The customer-facing layer
                </div>
                <h3
                  className="text-[clamp(1.15rem,1.9vw,1.55rem)] font-medium leading-[1.35] mb-10 max-w-3xl text-text-muted"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  An LLM specialist trained only on Orient&rsquo;s product
                  knowledge, embedded into a public site and exposed as a chat
                  any prospect can ask anything.
                </h3>

                {/* Browser frame screenshot */}
                <div className="rounded-xl overflow-hidden border border-[rgba(20,20,19,0.1)] bg-bg shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-3">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[rgba(20,20,19,0.04)] border-b border-[rgba(20,20,19,0.08)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <div className="flex-1 text-center text-[11px] text-text-faint font-mono px-2 truncate">
                      orient-landing-opal.vercel.app
                    </div>
                    <div className="w-12 shrink-0" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/orient/orient-landing-hero.png"
                    alt="Orient landing page concept"
                    loading="lazy"
                    className="w-full block"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 mb-12 text-[12px]">
                  <div className="text-text-muted leading-snug">
                    Concept site · Next.js · Interactive globe · Embedded AI
                    chat
                  </div>
                  <div className="text-accent font-semibold uppercase tracking-[0.08em] text-[10px] shrink-0 mt-0.5">
                    Launching soon
                  </div>
                </div>

                <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14 items-start">
                  <div>
                    <div className="rounded-xl overflow-hidden border border-[rgba(20,20,19,0.1)] bg-bg shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/orient/orient-chat-response.png"
                        alt="The Orient AI chat answering a real C-Series vs L&P Series comparison question with a structured table"
                        loading="lazy"
                        className="w-full block"
                      />
                    </div>
                    <div className="text-[12px] text-text-faint">
                      The same chat answering a real product question
                    </div>
                  </div>
                  <div>
                    <h4
                      className="text-text text-[15px] font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      One knowledge base. Three surfaces.
                    </h4>
                    <p className="text-text-muted text-[14.5px] leading-[1.75] mb-4">
                      The same structured knowledge base that powers
                      Orient&rsquo;s internal Offer Generator also feeds the
                      public site and the embedded chat widget. One place to
                      update. Three places it shows up. Always consistent.
                    </p>
                    <p className="text-text-faint text-[13.5px] leading-[1.7]">
                      No hallucinated specs. No invented prices. Sub-second
                      streaming responses across four machine lines, with
                      guardrails for out-of-scope questions and pricing
                      redirects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Final read-more link */}
              <div className="pt-8 border-t border-[rgba(20,20,19,0.06)]">
                <a
                  href="/blog/orient-case-study"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-[14px] text-text font-medium underline decoration-text/20 underline-offset-[5px] hover:decoration-text/60 transition-colors"
                >
                  Read the full case study
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Animated logo mark (CTA illustration) ───────────── */

function AnimatedSettleMark() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Path lengths measured from the SVG geometry
  const mainLen = 820;
  const flick1Len = 30;
  const flick2Len = 30;

  return (
    <svg
      ref={ref}
      viewBox="0 0 199 298"
      fill="none"
      className="w-full h-full"
      style={
        visible
          ? { animation: "float-gentle 4s ease-in-out 3.5s infinite" }
          : undefined
      }
    >
      {/* Main calligraphic stroke */}
      <path
        d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576"
        stroke="white"
        strokeWidth="8.04054"
        strokeLinecap="round"
        strokeDasharray={mainLen}
        strokeDashoffset={visible ? undefined : mainLen}
        style={
          visible
            ? {
                animation: `draw-on 2s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                strokeDashoffset: mainLen,
              }
            : { strokeDashoffset: mainLen }
        }
      />
      {/* Top flick */}
      <path
        d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021"
        stroke="white"
        strokeWidth="5.74324"
        strokeLinecap="round"
        strokeDasharray={flick1Len}
        style={
          visible
            ? {
                animation: `draw-on 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards`,
                strokeDashoffset: flick1Len,
              }
            : { strokeDashoffset: flick1Len }
        }
      />
      {/* Bottom flick */}
      <path
        d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237"
        stroke="white"
        strokeWidth="5.74324"
        strokeLinecap="round"
        strokeDasharray={flick2Len}
        style={
          visible
            ? {
                animation: `draw-on 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards`,
                strokeDashoffset: flick2Len,
              }
            : { strokeDashoffset: flick2Len }
        }
      />
      {/* Accent dots — pop in after strokes */}
      <circle
        cx="106.507"
        cy="248.486"
        r="11.4865"
        fill="white"
        opacity="0"
        style={
          visible
            ? {
                animation:
                  "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards",
                transformOrigin: "106.507px 248.486px",
              }
            : undefined
        }
      />
      <circle
        cx="187.507"
        cy="11.4865"
        r="11.4865"
        fill="white"
        opacity="0"
        style={
          visible
            ? {
                animation:
                  "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.5s forwards",
                transformOrigin: "187.507px 11.4865px",
              }
            : undefined
        }
      />
      <circle
        cx="94.5065"
        cy="98.4865"
        r="11.4865"
        fill="white"
        opacity="0"
        style={
          visible
            ? {
                animation:
                  "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.8s forwards",
                transformOrigin: "94.5065px 98.4865px",
              }
            : undefined
        }
      />
    </svg>
  );
}

/* ─── Logo mark ─────────────────────────────────────────── */

function SettleMark({
  className = "h-6 w-auto",
  stroke = "#141413",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 199 298" fill="none" className={className}>
      <path
        d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576"
        stroke={stroke}
        strokeWidth="8.04054"
        strokeLinecap="round"
      />
      <path
        d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021"
        stroke={stroke}
        strokeWidth="5.74324"
        strokeLinecap="round"
      />
      <path
        d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237"
        stroke={stroke}
        strokeWidth="5.74324"
        strokeLinecap="round"
      />
      <circle cx="106.507" cy="248.486" r="11.4865" fill="#D97757" />
      <circle cx="187.507" cy="11.4865" r="11.4865" fill="#D97757" />
      <circle cx="94.5065" cy="98.4865" r="11.4865" fill="#D97757" />
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Home() {
  const problemRef = useFadeIn();
  const processRef = useFadeIn();
  const servicesRef = useFadeIn();
  const caseRef = useFadeIn();
  const quotesRef = useFadeIn();
  const audienceRef = useFadeIn();
  const faqRef = useFadeIn();
  const founderRef = useFadeIn();
  const ctaRef = useFadeIn();
  const whyClaudeRef = useFadeIn();
  const claudeRecommendRef = useFadeIn();
  const gaasRef = useFadeIn();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  /* Services highlight state. `hoveredService` is the transient preview
     that fires on pointer enter/leave. `pinnedService` is the sticky
     selection set by clicking a pill — it persists until the same pill
     is clicked again (unpin) or a different pill replaces it. Hover
     wins over pin for the duration of the hover so you can preview
     other branches without losing your baseline. */
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [pinnedService, setPinnedService] = useState<string | null>(null);
  const activeServiceCategory = hoveredService ?? pinnedService;

  /* Quotes carousel — horizontal scroll-snap container with manual
     nav buttons. Auto-advance is deliberately omitted: auto-moving
     testimonials are distracting mid-read, and scroll-snap + nav
     buttons already signal "there's more" without taking agency
     away from the reader. */
  const quotesScrollRef = useRef<HTMLDivElement>(null);
  const scrollQuotes = (dir: 1 | -1) => {
    const el = quotesScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-quote-card]");
    const step = (card?.offsetWidth ?? 320) + 24; /* card width + gap-6 */

    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === -1 && el.scrollLeft <= 4) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  // Discovery Call button state/observer removed while the CTA is hidden.
  // See the commented-out floating button below.

  const calLoaded = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      // Lazy-load Cal.com SDK when user scrolls past 60% of viewport
      if (!calLoaded.current && window.scrollY > window.innerHeight * 0.6) {
        calLoaded.current = true;
        getCalApi({ namespace: "15min" }).then((cal) => {
          cal("ui", {
            hideEventTypeDetails: false,
            layout: "month_view",
            cssVarsPerTheme: {
              light: { "cal-brand": "#141413" },
              dark: { "cal-brand": "#141413" },
            },
          });
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <BlogTOC
        headings={[
          { id: "case-study", text: "Case study" },
          { id: "ask", text: "Ask Claude" },
          { id: "services", text: "Services" },
          { id: "process", text: "How we work" },
          { id: "founder", text: "Who builds this" },
          { id: "contact", text: "Get in touch" },
        ]}
      />
      {/* ── Nav ──────────────────────────────────────── */}
      <Nav variant="full" />

      {/* ── Hero + Globe ───────────────────────────────
         Flex-column in flow: text card on top, globe below taking
         whatever space is left. Globe is anchored to the TOP of its
         container so its north pole sits directly under the card,
         and the card's negative bottom margin lets it visually rest
         on the pole. Same layout at every breakpoint by design. */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Hero text — no glass card, type sits directly on the bg */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 pt-28">
          <div className="mx-auto max-w-[640px] text-center">
            <h1 className="text-[clamp(2.4rem,4.8vw,4.2rem)] font-medium leading-[1.08] mb-8">
              Your business, made{" "}
              <span className="text-accent whitespace-nowrap">AI-native</span>.
            </h1>
            <HeroSubtitle />
            <div className="mt-8 flex justify-center">
              <a
                href="#contact"
                className="group inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
              >
                Start a conversation
                <Arrow />
              </a>
            </div>
          </div>
        </div>

        {/* Globe fills the remaining viewport height. The square canvas
           is anchored to the top so its north pole starts right below
           the text card; the rest of the sphere falls off-screen and
           gets clipped by the section's overflow-hidden. */}
        <div className="relative flex-1 flex justify-center items-start">
          {/* The sphere sits at a ~2% inset from the canvas top (sphere
             radius = ch * 0.48, centered in the square canvas). Pull the
             wrapper up by (2% of canvas width − 2px) so the north pole
             lands exactly 2px below the text edge at every viewport. */}
          <div className="w-[min(150vw,1100px)] aspect-square shrink-0 mt-[calc(2px-min(150vw,1100px)*0.02)]">
            <Globe className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* ── Case Study: Orient ──────────────────────────
         Pulled up with a negative top margin so the card overlaps
         the lower curve of the hero globe. `relative z-10` keeps it
         stacked above the hero section that precedes it. */}
      <section
        id="case-study"
        ref={caseRef}
        className="relative z-10 -mt-[60vh] md:-mt-[100vh]"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-16 md:pb-20">
          <OrientCaseStudyCard />
        </div>
      </section>

      {/* ── Ask Claude ─────────────────────────────────── */}
      <AskClaude />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-border-light" />
      </div>

      {/* ── GAAS — Agents-as-a-Service positioning ── */}
      <section ref={gaasRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24 text-center">
          <p className="fade-up text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-5">
            Agents as a Service
          </p>
          <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-6 max-w-[720px] mx-auto">
            You don&apos;t need more employees. You need agents.
          </h2>
          <p className="fade-up text-text-muted text-[16px] md:text-[17px] leading-[1.7] max-w-[640px] mx-auto mb-12 md:mb-16">
            Every workflow we deploy becomes an AI agent. Your offer
            generator. Your MIS reporter. Your support desk. Your
            procurement analyst. Each one trained on your data, your
            rules, your voice.
          </p>

          <AgentDiagram className="mb-12 md:mb-16" />

          <p className="fade-up text-text text-[16px] md:text-[17px] leading-[1.7] max-w-[640px] mx-auto font-medium">
            Each agent costs a fraction of the employee doing the same
            work. One engagement with Settle. Every agent your business
            requires.
          </p>

          {/* Engagement vs. marketplace CTA pair.
             Primary: full engagement (every agent, custom-built).
             Secondary: pre-built individual agents on the marketplace
             for buyers who want a single agent without an engagement. */}
          <div className="fade-up mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
            >
              Start an engagement
              <Arrow />
            </a>
            <a
              href="https://marketplace.settlewithai.com"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center text-[14px] font-medium text-text border border-border hover:border-text px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              Or buy individual agents
              <Arrow />
            </a>
          </div>
          <p className="fade-up mt-5 text-text-faint text-[13.5px] leading-[1.6] max-w-[560px] mx-auto">
            An engagement gives you every agent your business needs, custom-built around how you actually run. Want one agent today, or a consult to figure out what you need? The marketplace and a quick call are both there.
          </p>
        </div>
      </section>

      {/* ── Problem — hidden per advisor feedback (less is more) ── */}
      <section id="problem" ref={problemRef} className="hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24 relative">
          <div className="flex items-start justify-between mb-8">
            <div className="max-w-[70%] sm:max-w-2xl">
              <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.02em] mb-4">
                Most AI adoption stalls at the demo.
              </h2>
              <p className="fade-up text-text-muted text-[16px] leading-relaxed">
                The gap isn&apos;t tools &mdash; it&apos;s deployment.
                Here&apos;s how we close it.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/settle-char-1.svg"
              alt=""
              width={1000}
              height={1000}
              loading="lazy"
              className="w-[70px] md:w-[120px] lg:w-[160px] shrink-0 ml-4 md:ml-8 lg:ml-12 -mt-4"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                wrong: "Generic prompts",
                right: "Structured, role-specific instructions",
              },
              {
                wrong: "One-size-fits-all demos",
                right: "Department-by-department rollout",
              },
              {
                wrong: "Advice without implementation",
                right: "Knowledge files, review gates, safety rules",
              },
              {
                wrong: "No way to measure impact",
                right: "Before/after time and error tracking",
              },
            ].map((p) => (
              <div key={p.wrong} className="fade-up bg-bg p-7 md:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-accent/60 text-sm mt-0.5">✕</span>
                  <span className="text-text-faint line-through decoration-border">
                    {p.wrong}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-sm mt-0.5">✓</span>
                  <span className="text-text font-medium">{p.right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Claude recommendation + use cases link ──────
         Left card: three compressed reasons, a muted flexibility
         line, and the CTA. Right card: a visual Claude card with
         accent-tinted background that links out to Anthropic's
         enterprise use cases page. The separate rounded cards
         signal "different kinds of things" — our reasoning vs
         Anthropic's proof — where a shared-border grid would
         flatten them into sibling panels. */}
      <section ref={claudeRecommendRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-10 md:mb-12 text-center">
            Why we default to Claude.
          </h2>

          <div className="grid md:grid-cols-[1.05fr_1fr] gap-4 md:gap-6 max-w-[1040px] mx-auto stagger">
            {/* LEFT — three compressed reasons + flexibility line + CTA */}
            <div className="fade-up bg-bg border border-border-light rounded-2xl p-7 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-7">
                Why Claude wins in production
              </p>
              <div className="space-y-5">
                {[
                  { num: "01", text: "Instruction fidelity." },
                  { num: "02", text: "Refuses before it fabricates." },
                  { num: "03", text: "Best-in-class at tool use." },
                ].map((r) => (
                  <div key={r.num} className="flex items-baseline gap-4">
                    <span className="text-accent/50 text-[13px] font-medium shrink-0 tabular-nums">
                      {r.num}
                    </span>
                    <h3 className="text-text font-medium text-[17px] md:text-[18px] leading-[1.3]">
                      {r.text}
                    </h3>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-text-muted text-[13.5px] leading-[1.6]">
                Not the only model we deploy. We pick what fits.
              </p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="group inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
                >
                  Talk to us about your stack
                  <Arrow />
                </a>
              </div>
            </div>

            {/* RIGHT — Claude visual card linking to Anthropic's
               enterprise use cases page */}
            <a
              href="https://claude.com/resources/use-cases"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up group relative bg-[rgba(217,119,87,0.06)] hover:bg-[rgba(217,119,87,0.09)] border border-[rgba(217,119,87,0.2)] hover:border-[rgba(217,119,87,0.4)] rounded-2xl p-7 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[320px] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/claude-color.svg"
                  alt="Claude"
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 animate-breathe"
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-text-muted group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10L10 4M10 4H5M10 4V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                  From Anthropic
                </p>
                <h3
                  className="text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em] mb-3 text-text"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  See Claude in production.
                </h3>
                <p className="text-text-muted text-[14px] leading-[1.6]">
                  Real enterprise deployments across research, finance,
                  legal, and engineering.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Claude ───────────────────────────────── */}
      <section ref={whyClaudeRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-10 text-center">
            Built for production, not demos.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-2xl overflow-hidden stagger mb-16">
            {[
              {
                title: "Same output. Every time.",
                body: "Attempt #1 and attempt #1,000 land identically.",
              },
              {
                title: "Stays in scope.",
                body: "Guardrails hold. Brand voice doesn\u2019t drift.",
              },
              {
                title: "Works inside your stack.",
                body: "SAP, HubSpot, Salesforce, Google Drive \u2014 via MCP.",
              },
            ].map((c) => (
              <div key={c.title} className="fade-up bg-bg p-7 md:p-8 text-center">
                <h3 className="text-text font-medium text-[16px] mb-2">
                  {c.title}
                </h3>
                <p className="text-text-muted text-[14.5px] leading-[1.7]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <CoworkDemo className="mx-auto w-full max-w-[900px] text-left" />
        </div>
      </section>

      {/* ── Services — pill rail above full-width mindmap ────
         Pills are above the mindmap on every device. Click toggles a
         sticky pin; hover still previews any branch without losing the
         pinned baseline. Same data drives both the pill label row and
         the mindmap's highlight state via the shared category key. */}
      <section id="services" ref={servicesRef} className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-10 text-center">
            What we deliver.
          </h2>

          {/* Pill rail */}
          <div className="fade-up flex flex-wrap justify-center gap-2.5 mb-10 md:mb-12">
            {[
              {
                title: "The audit",
                category: "The audit",
                desc: "A week inside your business.",
              },
              {
                title: "Teaching the AI your business",
                category: "Teaching the AI",
                desc: "Answers the way your best employee would.",
              },
              {
                title: "Rolling it out",
                category: "Rolling it out",
                desc: "We stay until every team uses it.",
              },
              {
                title: "Training your team",
                category: "Training your team",
                desc: "On-site for a month, one-on-one.",
              },
            ].map((s) => {
              const active = pinnedService === s.category;
              return (
                <button
                  key={s.title}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setPinnedService((p) =>
                      p === s.category ? null : s.category,
                    )
                  }
                  onMouseEnter={() => setHoveredService(s.category)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={[
                    "inline-flex items-center gap-2.5 rounded-full pl-4 pr-5 py-2.5 border transition-all duration-200 cursor-pointer",
                    active
                      ? "bg-[rgba(217,119,87,0.1)] border-[rgba(217,119,87,0.4)]"
                      : "bg-bg border-[rgba(20,20,19,0.12)] hover:border-[rgba(20,20,19,0.25)] hover:bg-[rgba(20,20,19,0.03)]",
                  ].join(" ")}
                >
                  <span
                    className="text-[13px] font-medium text-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.title}
                  </span>
                  <span className="text-text-faint text-[12px] hidden sm:inline">
                    ·
                  </span>
                  <span className="text-text-muted text-[12.5px] hidden sm:inline">
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Full-width mindmap.
             Explicit height is required because the Mindmap reads
             container.clientHeight on mount/resize — without a fixed
             height the component would render at 0 and never lay out. */}
          <div className="fade-up w-full h-[520px] md:h-[640px]">
            <Mindmap
              className="w-full h-full"
              highlightCategory={activeServiceCategory}
            />
          </div>

        </div>
      </section>

      {/* ── Process (scroll-pinned) ──────────────────── */}
      <div id="process" ref={processRef}>
        <ProcessScroll />
      </div>

      {/* ── Who it's for ─────────────────────────────── */}
      <section ref={audienceRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="flex items-start justify-between mb-10">
            <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] max-w-2xl">
              Who we work with.
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/settle-char-3.svg"
              alt=""
              width={1000}
              height={1000}
              loading="lazy"
              className="w-[70px] md:w-[100px] lg:w-[140px] shrink-0 ml-4 md:ml-8 lg:ml-12 -mt-4"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                title: "Manufacturers & Industrial Companies",
                desc: "Complex operations, multiple departments, high documentation overhead. We map your workflows, deploy Claude across teams, and train your people to use it.",
              },
              {
                title: "Growing SMBs",
                desc: "Lean teams doing more than they should manually. We find the workflows where Claude saves the most time and deploy them first.",
              },
            ].map((a) => (
              <div key={a.title} className="fade-up bg-bg p-8 md:p-10">
                <h3 className="text-lg font-medium mb-3">{a.title}</h3>
                <p className="text-text-muted text-[15px] leading-[1.7]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Quotes ───────────────────────────
         Horizontal scroll-snap carousel. The quote text sizing is
         kept small per the design brief — the carousel is the
         mechanism, not a reason to re-inflate the section. Cards
         are viewport-responsive (85vw capped at 340px) so on mobile
         one card fills the viewport and on desktop ~3 cards sit
         alongside each other. Edge fade via mask-image lets cards
         dissolve instead of clipping hard at the section gutter. */}
      <section ref={quotesRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 md:py-20">
          <div className="fade-up flex items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <p className="text-[10.5px] uppercase tracking-[0.15em] text-text-faint mb-2.5">
                Voices from South Asia
              </p>
              <h2 className="text-[clamp(1rem,1.4vw,1.2rem)] font-medium leading-[1.35] max-w-xl text-text-muted">
                What business leaders are saying about AI.
              </h2>
            </div>
            {/* Nav buttons — hidden on xs where swipe is more natural */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Previous quote"
                onClick={() => scrollQuotes(-1)}
                className="w-9 h-9 rounded-full border border-[rgba(20,20,19,0.18)] bg-bg hover:bg-[rgba(20,20,19,0.04)] hover:border-[rgba(20,20,19,0.3)] transition-colors flex items-center justify-center text-text cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next quote"
                onClick={() => scrollQuotes(1)}
                className="w-9 h-9 rounded-full border border-[rgba(20,20,19,0.18)] bg-bg hover:bg-[rgba(20,20,19,0.04)] hover:border-[rgba(20,20,19,0.3)] transition-colors flex items-center justify-center text-text cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* The scroll container extends past the section's content
             gutter with negative margin + matching positive padding,
             so the first and last cards can fade into the viewport
             edges via mask-image instead of butting hard against the
             container wall. */}
          <div
            ref={quotesScrollRef}
            className="fade-up no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          >
            {[
              {
                q: "I had the app in 2 days. It would have taken 2 months before.",
                attr: "Small business owner, India",
              },
              {
                q: "Since I can think faster than I could build, my range of ideas has grown.",
                attr: "Entrepreneur, India",
              },
              {
                q: "I don\u2019t see any limit anymore.",
                attr: "Entrepreneur, India",
              },
              {
                q: "My worry isn\u2019t intentional harm but unexamined assumptions being scaled through automation.",
                attr: "Entrepreneur, India",
              },
              {
                q: "A laptop crash wiped three months of work. I rebuilt my website in four languages within five weeks.",
                attr: "Entrepreneur, India",
              },
              {
                q: "Accidentally, AI gave me the idea of a new business \u2014 enough to retire my family and help people in Balochistan and Sindh.",
                attr: "Entrepreneur, Pakistan",
              },
            ].map((quote, i) => (
              <div
                key={i}
                data-quote-card
                className="snap-start shrink-0 w-[min(85vw,340px)] md:w-[320px] flex flex-col justify-between py-1"
              >
                <blockquote className="text-[13.5px] leading-[1.7] text-text-muted mb-4">
                  &ldquo;{quote.q}&rdquo;
                </blockquote>
                <div className="text-[10.5px] text-text-faint uppercase tracking-[0.08em]">
                  {quote.attr}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10.5px] text-text-faint mt-8 max-w-2xl">
            From Anthropic&rsquo;s{" "}
            <a
              href="https://www.anthropic.com/features/81k-interviews#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text-muted transition-colors"
            >
              81,000 Conversations About AI
            </a>
            , edited for clarity.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section ref={faqRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[860px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div className="fade-up mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-3">
              Frequently asked questions.
            </h2>
            <a
              href="#ask"
              className="text-[14px] text-accent hover:text-accent/80 transition-colors"
            >
              Want to ask AI instead? ↑
            </a>
          </div>

          <div className="divide-y divide-border-light">
            {[
              {
                q: "What is Claude AI, and why does Settle use it exclusively?",
                a: "Claude is Anthropic\u2019s AI assistant, purpose-built for long, complex reasoning and safe enterprise use. I chose to work exclusively with Claude because, after testing every major model in production business workflows, it consistently outperforms on the tasks that matter most: multi-step document generation, precise instruction following, and reliable output across hundreds of runs. At Orient Printing, for example, Claude handles everything from generating 8-page sales proposals with accurate pricing to troubleshooting industrial printing press issues from technical manuals. One model, deeply understood, produces better results than spreading across three or four.",
              },
              {
                q: "We\u2019re a manufacturer. Is AI realistic for us?",
                a: "Absolutely. My first client is a 79-year-old printing and packaging manufacturer with 20,000+ units installed across 50 countries. Not exactly a Silicon Valley startup. I mapped 49 use cases across their 7 departments and deployed 11 in the first engagement, covering offer generation, RFQ drafting, BOM creation, service troubleshooting, and vendor analysis. Traditional businesses often have the most to gain from AI because their workflows are repeatable, documentation-heavy, and largely unchanged for years. The offer generator alone cut document creation time from 4 hours to 30 minutes. That\u2019s not incremental. It\u2019s a step change in how the team works.",
              },
              {
                q: "How is Settle different from hiring a big consulting firm?",
                a: "Large consulting firms charge enterprise rates, take months to deliver a strategy deck, and then hand you a PDF that your team has to figure out how to implement. I do the opposite. Working Claude agents ship in the first two to three weeks. Your team is using AI from week one, not waiting for a 200-page assessment to get approved. Settle is built specifically for companies with 50 to 500 employees, the ones too complex for a DIY YouTube tutorial but too lean to justify a Big Four engagement. Every agent I deploy comes with production-grade instructions, safety rules, and review gates. Not a strategy deck. Working tools.",
              },
              {
                q: "What does a typical engagement look like?",
                a: "Four phases. First, Discovery: I spend time with your team to audit every department\u2019s workflows and identify where AI will have the highest impact. Second, Architecture: I build a prioritised rollout plan that groups use cases by workflow cluster, not department, because that\u2019s what produces the best results. Third, Instruction Engineering: I write production-grade Claude agent instructions with safety rules, edge case handling, review gates, and knowledge file specifications. Fourth, Deploy and Settle: agents go live, your team gets trained, and I iterate based on real usage. Quick wins typically ship in the first 2\u20133 weeks. Deeper integrations with your ERP or CRM follow in subsequent phases.",
              },
              {
                q: "How long until we see results?",
                a: "Most teams see their first working Claude agent within 2 to 3 weeks. These are typically high-volume, low-complexity tasks like email drafting, document generation, or knowledge base Q&A. The full rollout depends on your scope and how many departments are involved. Orient Printing deployed 11 agents across 7 departments over about 6 months, but they were measuring time savings from month one. The key is starting with a quick win that proves the value, then expanding from there. I\u2019ve found that once one department sees results, the others start asking when they\u2019re next.",
              },
              {
                q: "What systems can Claude connect to?",
                a: "Claude connects to your business systems through MCP (Model Context Protocol), an open standard built by Anthropic specifically for this purpose. If your system has an API or structured data export, I can build a connector for it. I\u2019ve built MCP connectors for ERPs like SAP, CRMs like HubSpot and Salesforce, document stores like SharePoint and Google Drive, email systems, and custom internal databases. The connector is a lightweight server that sits between Claude and your system, translating data in both directions. Most connectors take a few days to build and test. Once connected, Claude doesn\u2019t just know about your business in theory. It can read real data, pull actual numbers, and write results back.",
              },
              {
                q: "Do our employees need technical skills?",
                a: "Not at all. I engineer the instructions so your team interacts with Claude in plain language, exactly the way they\u2019d talk to a knowledgeable colleague. They don\u2019t write prompts, configure settings, or understand anything about AI. They use structured Claude agents that I\u2019ve built and tested specifically for their workflows. A sales engineer types in a customer name and product requirements, and gets back a formatted offer document. A procurement manager describes what they need, and gets a complete RFQ. The complexity is in the instructions I write, not in what your team has to do.",
              },
              {
                q: "Is our company data safe with Claude?",
                a: "Yes. Claude is built by Anthropic, which leads the industry in AI safety research. Data sent to Claude via the API is not used for model training by default. Anthropic holds SOC 2 Type II certification and offers HIPAA-eligible plans for healthcare data. Beyond Anthropic\u2019s security, every project I deploy includes explicit safety rules, review gates, and output boundaries written into the instructions. Claude won\u2019t share data between departments unless configured to. It won\u2019t fabricate information. It won\u2019t take actions without human approval at checkpoints I define. Your proprietary processes, pricing, and customer data stay private.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="fade-up group"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer select-none">
                  <span className="text-[clamp(1rem,1.5vw,1.1rem)] font-medium leading-snug">
                    {faq.q}
                  </span>
                  <span className="relative shrink-0 w-5 h-5 text-text-faint">
                    {/* horizontal line (always visible = minus when open) */}
                    <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2" />
                    {/* vertical line (fades out on open = plus → minus) */}
                    <span className="faq-icon-v absolute top-0 left-1/2 h-full w-px bg-current -translate-x-1/2" />
                  </span>
                </summary>
                <div className="pb-6 pr-11 text-text-muted text-[15px] leading-[1.75]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ──────────────────────────────────── */}
      <section id="founder" ref={founderRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div className="max-w-[860px] mx-auto">
            <span className="fade-up block text-[10px] font-medium uppercase tracking-[0.18em] text-text-faint mb-5">
              Who builds this
            </span>
            <h2 className="fade-up text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-14 max-w-2xl">
              One operator. Every agent.
            </h2>

            <div className="grid sm:grid-cols-[180px_1fr] gap-8 sm:gap-12 items-start">
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pranav-ambwani.jpg"
                alt="Pranav Ambwani, Founder of Settle"
                width={360}
                height={360}
                loading="lazy"
                className="fade-up w-[140px] sm:w-[180px] h-[140px] sm:h-[180px] rounded-full object-cover border border-border-light"
                style={{ filter: "grayscale(0.15) contrast(1.02)" }}
              />

              {/* Bio — operational, not resume */}
              <div className="fade-up">
                <div
                  className="text-[clamp(1.4rem,2vw,1.8rem)] font-medium leading-[1.15] mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pranav Ambwani
                </div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent mb-6">
                  Founder · Settle
                </div>
                <p className="text-text-muted text-[16px] md:text-[17px] leading-[1.7] mb-4">
                  Pranav holds a BS in Electrical Engineering from the
                  University of Southern California and spent nine years in
                  Los Angeles before returning home to Delhi.
                </p>
                <a
                  href="https://www.linkedin.com/in/pranavambwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-accent text-[14px] font-medium hover:underline mt-2"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section id="contact" ref={ctaRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: text + form */}
            <div className="text-center md:text-left">
              <h2 className="fade-up text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.1] mb-5 text-white">
                Ready to settle in with AI?
              </h2>
              <p className="fade-up text-white/70 text-[17px] leading-relaxed mb-12">
                We take on a small number of clients each quarter. Tell us
                about the project and we&apos;ll let you know if it&apos;s a
                fit.
              </p>
              {submitted ? (
                <div className="fade-up visible">
                  <p className="text-white text-lg font-medium mb-2">
                    Thanks — we&apos;ll be in touch.
                  </p>
                  <p className="text-white/50 text-sm">
                    Expect a reply within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });
                      if (res.ok) {
                        setSubmitted(true);
                      }
                    }}
                    className="fade-up flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="bg-white text-accent font-medium px-7 py-3.5 rounded-lg hover:bg-white/90 transition-colors duration-200 whitespace-nowrap text-[15px]"
                    >
                      Let&apos;s talk
                    </button>
                  </form>
                  <p className="fade-up text-white/40 text-sm mt-5">
                    We respond within 48 hours.
                  </p>
                </>
              )}
            </div>
            {/* Right: animated illustration */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-[320px] h-[480px] lg:w-[380px] lg:h-[570px] opacity-[0.15]">
                <AnimatedSettleMark />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating Discovery Call button (hidden for now) ──────────────── */}
      {/*
      <button
        data-cal-namespace="15min"
        data-cal-link="settle-ai/15min"
        data-cal-config='{"layout":"month_view"}'
        className={`fixed bottom-6 right-6 z-40 text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-all duration-300 shadow-lg flex items-center gap-2 ${scrolled && !ctaVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Discovery Call
      </button>
      */}

      {/* ── Footer ───────────────────────────────────── */}
      <Footer />
    </main>
  );
}
