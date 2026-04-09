"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

const Globe = dynamic(() => import("./globe"), { ssr: false });
const Mindmap = dynamic(() => import("./mindmap"), { ssr: false });
const CoworkDemo = dynamic(() => import("./cowork-demo"), { ssr: false });

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
      className="inline items-baseline text-accent relative underline decoration-accent/40 underline-offset-4 cursor-pointer"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <img
        src="/claude-color.svg"
        alt=""
        className="inline-block w-[0.85em] h-[0.85em] mr-1 align-baseline animate-breathe"
        aria-hidden="true"
      />
      Claude AI
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
          <img
            src="/claude-color.svg"
            alt="Claude"
            className="w-8 h-8 rounded-md"
          />
          <div>
            <h3>Claude AI</h3>
            <p>
              Anthropic&apos;s AI assistant &mdash; built to be helpful,
              harmless, and honest. The model we deploy for every client.
            </p>
          </div>
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
    <p className="text-text text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.7]">
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
    </p>
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
          &ldquo;49 use cases mapped across 7 departments. 18 projects
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
              label: "Projects deployed" as React.ReactNode,
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
                      projects starting with a fully branded Offer Generator,
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
                    project. Branded line items. GST math. A flagged ambiguity.
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
                      project trained on the entire sales surface of an
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

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

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
          { id: "problem", text: "The problem" },
          { id: "process", text: "How we work" },
          { id: "services", text: "Services" },
          { id: "founder", text: "Who builds this" },
          { id: "contact", text: "Get in touch" },
        ]}
      />
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <SettleMark className="h-7 w-auto" />
            <span
              className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SETTLE
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-7">
            <a
              href="#process"
              className="text-[15px] text-text-muted hover:text-text transition-colors duration-200 hidden sm:block"
            >
              Process
            </a>
            <a
              href="#services"
              className="text-[15px] text-text-muted hover:text-text transition-colors duration-200 hidden sm:block"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

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

      {/* ── Problem ──────────────────────────────────── */}
      <section id="problem" ref={problemRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36 relative">
          <div className="flex items-start justify-between mb-16">
            <div className="max-w-[70%] sm:max-w-2xl">
              <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-5">
                Most AI adoption stalls at the demo.
              </h2>
              <p className="fade-up text-text-muted text-[17px] leading-relaxed">
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
              className="w-[100px] md:w-[160px] lg:w-[220px] shrink-0 ml-4 md:ml-8 lg:ml-12 -mt-4"
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

      {/* ── Why Claude ───────────────────────────────── */}
      <section ref={whyClaudeRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-6 md:pt-10 pb-16 md:pb-24">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-5 text-center">
            Built for production, not demos.
          </h2>
          <p
            className="fade-up text-text-muted text-[17px] leading-relaxed mb-12 text-center max-w-3xl mx-auto"
            style={{ animationDelay: "60ms" }}
          >
            Most AI models are great in a sandbox and unpredictable in
            production. Claude is the opposite. It treats your instructions as a
            contract, not a suggestion &mdash; so the offer template stays
            branded, the chat agent stays in scope, and your rollout
            doesn&rsquo;t quietly drift over time.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-2xl overflow-hidden stagger mb-16">
            {[
              {
                title: "Same output. Every time.",
                body: "When your offer document needs to land identically on attempt #1 and attempt #1,000 — that\u2019s Claude.",
              },
              {
                title: "Stays in scope.",
                body: "Customer-facing chat that won\u2019t go off-script, brand voice that won\u2019t drift, guardrails that actually hold.",
              },
              {
                title: "Works inside your stack.",
                body: "Cowork, Claude Projects, Skills, MCP — Claude ships with the deployment surfaces other models are still building.",
              },
            ].map((c) => (
              <div key={c.title} className="fade-up bg-bg p-7 md:p-8">
                <h3 className="text-text font-medium text-[16px] mb-3">
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

      {/* ── Process ──────────────────────────────────── */}
      <section
        id="process"
        ref={processRef}
        className="bg-[#ddd9cc] relative overflow-hidden"
      >
        {/* Cave art background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cave-art.webp"
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="absolute right-0 top-0 w-[500px] md:w-[700px] lg:w-[800px] h-auto opacity-[0.04] md:opacity-[0.06] pointer-events-none select-none"
        />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-14 max-w-2xl text-text">
            From zero to settled in four phases.
          </h2>

          <div className="relative">
            {/* ── Desktop: pulsating curvy path ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 80,60 C 80,140 920,100 920,250 S 80,340 80,500 S 920,600 920,750 S 80,850 80,940"
                stroke="#d97757"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                opacity="0.2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Fuse glow that travels along the path */}
              <path
                d="M 80,60 C 80,140 920,100 920,250 S 80,340 80,500 S 920,600 920,750 S 80,850 80,940"
                stroke="#d97757"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="0.08 0.92"
                className="path-fuse"
              />
              <circle cx="80" cy="60" r="4" fill="#d97757" opacity="0.3" />
              <circle cx="920" cy="250" r="4" fill="#d97757" opacity="0.3" />
              <circle cx="80" cy="500" r="4" fill="#d97757" opacity="0.3" />
              <circle cx="920" cy="750" r="4" fill="#d97757" opacity="0.3" />
            </svg>

            {/* ── Mobile: straight vertical dotted arrow ──
               Split into two SVGs: a stretched stem (preserveAspectRatio=none
               so it fills the full column height) and a fixed-size arrowhead
               pinned at the bottom so the triangle doesn't get vertically
               elongated by the stretch. Same fuse animation as desktop — the
               pathLength="1" normalization makes it length-independent. */}
            <svg
              className="absolute left-0 top-0 w-8 pointer-events-none md:hidden"
              style={{ height: "calc(100% - 18px)" }}
              viewBox="0 0 32 1000"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 16,20 L 16,980"
                stroke="#d97757"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                opacity="0.2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 16,20 L 16,980"
                stroke="#d97757"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="0.08 0.92"
                className="path-fuse"
              />
              <circle cx="16" cy="20" r="4" fill="#d97757" opacity="0.3" />
            </svg>
            <svg
              className="absolute left-0 bottom-0 w-8 h-5 pointer-events-none md:hidden"
              viewBox="0 0 32 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 8,4 L 16,18 L 24,4"
                stroke="#d97757"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
              />
            </svg>

            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume.",
                detail:
                  "You get a prioritised use-case matrix, not a pitch deck.",
                align: "left" as const,
                examples: [
                  "Offer generation",
                  "Vendor RFQs",
                  "Troubleshooting",
                  "Payroll processing",
                  "BOM creation",
                ],
              },
              {
                num: "02",
                title: "Architecture",
                desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard.",
                detail:
                  "Live project tracking. Tier-based phasing. Gap analysis built in.",
                align: "right" as const,
                examples: [
                  "18 functional projects",
                  "4-tier phased rollout",
                  "Dependency mapping",
                  "Skills gap analysis",
                ],
              },
              {
                num: "03",
                title: "Instruction Engineering",
                desc: "We write production-grade Claude project instructions for every use case. Not prompts \u2014 structured workflows with review gates, safety rules, and knowledge files.",
                detail:
                  "Your team uses Claude. They don\u2019t need to understand the engineering behind it.",
                align: "left" as const,
                examples: [
                  "Pricing calculator",
                  "Config suggestor",
                  "Email writer",
                  "RFQ template builder",
                  "Service diagnostics",
                ],
              },
              {
                num: "04",
                title: "Deploy & Settle",
                desc: "We deploy, train your team, and iterate. Quick wins ship in weeks. Deeper integrations follow in phases.",
                detail: "A roadmap you can actually execute.",
                align: "right" as const,
                examples: [
                  "85% faster docs",
                  "400+ hrs/mo saved",
                  "$200K+ annual savings",
                  "11 projects live",
                ],
              },
            ].map((p) => (
              <div
                key={p.num}
                className={`fade-up relative py-10 md:py-14 pl-8 md:pl-0 ${
                  p.align === "right" ? "md:flex md:justify-end" : ""
                }`}
              >
                <div
                  className="max-w-md px-9 py-10 md:px-12 md:py-12"
                  style={{
                    /* Rounded frosted-glass card that dissipates into the
                       background: translucent radial fill, backdrop-filter
                       blur, a wide ellipse mask that produces a rounded-
                       rectangle shape with feathered edges (no hard border),
                       and an explicit border-radius so the underlying shape
                       is rounded even before the mask softens it. */
                    backgroundImage:
                      "radial-gradient(ellipse 95% 90% at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0) 100%)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    borderRadius: "32px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 95% 88% at center, #000 55%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 95% 88% at center, #000 55%, transparent 100%)",
                  }}
                >
                  <span
                    className="text-text-muted text-[15px] font-medium block mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {p.num}
                  </span>
                  <h3 className="text-accent text-[clamp(1.5rem,2.5vw,2rem)] font-medium mb-4">
                    {p.title}
                  </h3>
                  <p className="text-text-muted leading-[1.75] mb-3">
                    {p.desc}
                  </p>
                  <p className="text-text-faint text-sm mb-5">{p.detail}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-[rgba(20,20,19,0.06)] text-text border border-[rgba(20,20,19,0.1)]"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — text left + mindmap right ─── */}
      <section id="services" ref={servicesRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-16">
            What we deliver.
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column — text (compact) */}
            <div
              className="lg:w-[30%] lg:shrink-0 rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: "#DED9CC" }}
            >
              {[
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  ),
                  title: "AI Readiness Assessment",
                  category: "AI Readiness",
                  desc: "We audit every department\u2019s workflows, discover use cases, and build a tier-based rollout map with blocker analysis.",
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  ),
                  title: "Deployment Dashboard",
                  category: "Deployment Dashboard",
                  desc: "Interactive rollout visualisation with project-level tracking, skill mapping, and a kanban board for execution.",
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  ),
                  title: "Instruction Engineering",
                  category: "Instruction Engineering",
                  desc: "Production-grade Claude instructions with knowledge file specs, review gates, safety rules, and output standards.",
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Setup & Training",
                  category: "Setup & Training",
                  desc: "Project creation, knowledge file preparation, team onboarding, and ongoing iteration support.",
                },
              ].map((s, i) => (
                <div
                  key={s.title}
                  onMouseEnter={() => setHoveredService(s.category)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {i > 0 && <div className="h-px bg-border-light my-6" />}
                  <div className="fade-up cursor-default">
                    <div className="text-accent mb-3">{s.icon}</div>
                    <h3
                      className="text-[1rem] font-medium mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-text-muted text-[13px] leading-[1.65]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column — mindmap (primary visual, sticky) */}
            <div className="lg:flex-1 lg:sticky lg:top-24 lg:self-start">
              <Mindmap className="w-full" highlightCategory={hoveredService} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────── */}
      <section ref={audienceRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="flex items-start justify-between mb-10">
            <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] max-w-2xl">
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

      {/* ── Customer Quotes ─────────────────────────── */}
      <section ref={quotesRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <p className="fade-up text-xs uppercase tracking-[0.15em] text-text-faint mb-4">
            Voices from South Asia
          </p>
          <h2
            className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-16 max-w-3xl text-text"
            style={{ animationDelay: "80ms" }}
          >
            What business leaders are saying about AI adoption.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-2xl overflow-hidden">
            {[
              {
                q: "My worry isn\u2019t intentional harm but unexamined assumptions being scaled through automation.",
                attr: "Entrepreneur, India",
                span: "md:row-span-2",
                featured: true,
              },
              {
                q: "I\u2019m a father, small business owner in a small town in India \u2014 not rich, not Ivy League. I tried building an app in a programming language I\u2019d never touched\u2026 in 2 days with an AI tool, I had the app. It would have taken at least 2 months before.",
                attr: "Entrepreneur, India",
              },
              {
                q: "It\u2019s not AI giving me ideas \u2014 it\u2019s me discovering ideas myself, as AI writes the code. Since I could think faster than I could build, my range of ideas has grown.",
                attr: "Entrepreneur, India",
              },
              {
                q: "A laptop crash wiped three months of work \u2014 my website, gone. I rebuilt it in four languages within five weeks\u2026 then built a financial data tool for a charity in four days. I don\u2019t see any limit anymore.",
                attr: "Entrepreneur, India",
              },
              {
                q: "I was finding ways to earn, and accidentally AI gave me the idea of a new business\u2026 so I can marry the love of my life, retire my family, and help people in Balochistan and Sindh with food, schools, and hospitals.",
                attr: "Entrepreneur, Pakistan",
              },
            ].map((quote, i) => (
              <div
                key={i}
                className={`fade-up bg-bg p-8 md:p-10 flex flex-col justify-between ${
                  quote.span ?? ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <blockquote
                  className={`leading-[1.7] mb-8 ${
                    quote.featured
                      ? "text-[clamp(1.1rem,1.8vw,1.35rem)] text-text"
                      : "text-[clamp(0.95rem,1.2vw,1.05rem)] text-text-muted"
                  }`}
                  style={{
                    fontFamily: quote.featured
                      ? "Sentient, Georgia, serif"
                      : "inherit",
                  }}
                >
                  &ldquo;{quote.q}&rdquo;
                </blockquote>
                <div className="text-xs text-text-faint uppercase tracking-[0.08em]">
                  {quote.attr}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-faint mt-6 max-w-2xl">
            Quotes sampled from Anthropic&rsquo;s{" "}
            <a
              href="https://www.anthropic.com/features/81k-interviews#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text-muted transition-colors"
            >
              81,000 Conversations About AI
            </a>
            , filtered by South Asia. Edited for clarity.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section ref={faqRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[860px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-14">
            Frequently asked questions.
          </h2>

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
                a: "Large consulting firms charge enterprise rates, take months to deliver a strategy deck, and then hand you a PDF that your team has to figure out how to implement. I do the opposite. Working Claude projects ship in the first two to three weeks. Your team is using AI from week one, not waiting for a 200-page assessment to get approved. Settle is built specifically for companies with 50 to 500 employees, the ones too complex for a DIY YouTube tutorial but too lean to justify a Big Four engagement. Every project I deploy comes with production-grade instructions, safety rules, and review gates. Not a strategy deck. Working tools.",
              },
              {
                q: "What does a typical engagement look like?",
                a: "Four phases. First, Discovery: I spend time with your team to audit every department\u2019s workflows and identify where AI will have the highest impact. Second, Architecture: I build a prioritised rollout plan that groups use cases by workflow cluster, not department, because that\u2019s what produces the best results. Third, Instruction Engineering: I write production-grade Claude project instructions with safety rules, edge case handling, review gates, and knowledge file specifications. Fourth, Deploy and Settle: projects go live, your team gets trained, and I iterate based on real usage. Quick wins typically ship in the first 2\u20133 weeks. Deeper integrations with your ERP or CRM follow in subsequent phases.",
              },
              {
                q: "How long until we see results?",
                a: "Most teams see their first working Claude project within 2 to 3 weeks. These are typically high-volume, low-complexity tasks like email drafting, document generation, or knowledge base Q&A. The full rollout depends on your scope and how many departments are involved. Orient Printing deployed 11 projects across 7 departments over about 6 months, but they were measuring time savings from month one. The key is starting with a quick win that proves the value, then expanding from there. I\u2019ve found that once one department sees results, the others start asking when they\u2019re next.",
              },
              {
                q: "What systems can Claude connect to?",
                a: "Claude connects to your business systems through MCP (Model Context Protocol), an open standard built by Anthropic specifically for this purpose. If your system has an API or structured data export, I can build a connector for it. I\u2019ve built MCP connectors for ERPs like SAP, CRMs like HubSpot and Salesforce, document stores like SharePoint and Google Drive, email systems, and custom internal databases. The connector is a lightweight server that sits between Claude and your system, translating data in both directions. Most connectors take a few days to build and test. Once connected, Claude doesn\u2019t just know about your business in theory. It can read real data, pull actual numbers, and write results back.",
              },
              {
                q: "Do our employees need technical skills?",
                a: "Not at all. I engineer the instructions so your team interacts with Claude in plain language, exactly the way they\u2019d talk to a knowledgeable colleague. They don\u2019t write prompts, configure settings, or understand anything about AI. They use structured Claude projects that I\u2019ve built and tested specifically for their workflows. A sales engineer types in a customer name and product requirements, and gets back a formatted offer document. A procurement manager describes what they need, and gets a complete RFQ. The complexity is in the instructions I write, not in what your team has to do.",
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
            <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-14 max-w-2xl">
              One operator. Every project.
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

              {/* Bio */}
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
                  University of Southern California and spent nine years in Los
                  Angeles before returning home to Delhi. Settle runs through
                  him directly &mdash; discovery, deployment, iteration. No
                  account managers, no junior hand-offs.
                </p>
                <a
                  href="https://www.linkedin.com/in/pranavambwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-accent text-[14px] font-medium hover:underline mt-2"
                >
                  Connect on LinkedIn &rarr;
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
                Tell us about your team. We&apos;ll scope your rollout and come
                back with a concrete plan &mdash; what ships first, what comes
                next.
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
                    We&apos;re receiving a high volume of requests right now, so
                    responses might be delayed.
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
