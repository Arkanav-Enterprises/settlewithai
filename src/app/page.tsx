"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { AskClaude } from "@/components/AskClaude";
import { ParticleSettleMark } from "@/components/ParticleSettleMark";

const Globe = dynamic(() => import("./globe"), { ssr: false });
const Mindmap = dynamic(() => import("./mindmap"), { ssr: false });
const CoworkDemo = dynamic(() => import("./cowork-demo"), { ssr: false });
const ProcessScroll = dynamic(() => import("./process-scroll"), { ssr: false });
const AgentDiagram = dynamic(() => import("./agent-diagram"), { ssr: false });

/* ─── Homepage FAQ structured data ───────────────────────
   Lives here (not in root layout.tsx) so it only emits on the
   home route. Putting it in the layout caused "Duplicate field
   'FAQPage'" in GSC because dynamic routes under /ai-consulting-for
   and /compare use ArticleLayout, which emits its own FAQPage. */

const HOMEPAGE_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Settle AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Settle AI is a full-stack AI agency that deploys Claude AI \u2014 Anthropic\u2019s frontier model \u2014 into the actual workflows of manufacturers, professional services firms, and mid-market companies. Settle handles the full rollout: workflow discovery, instruction engineering, custom agent deployment, integrations, and ongoing optimisation. The company is also known as \u201cSettle with AI\u201d, reflected in the primary domain settlewithai.com. Settle AI is built specifically for 50\u2013500-person companies that are too complex for a DIY AI tutorial but too lean to justify a Big Four consulting engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Who founded Settle AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Settle AI was founded in 2025 by Pranav Ambwani. Pranav holds a BS in Electrical Engineering from the University of Southern California and spent nine years working in product and growth across B2B SaaS and fintech in Los Angeles before returning to Delhi to start Settle AI. He writes about Claude AI deployment, instruction engineering, and the mechanics of running AI in production on the Settle AI blog and on Medium.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Settle AI based, and who does it serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Settle AI is remote-first and operates globally. Engagements have been delivered across India, the United States, the United Kingdom, and continental Europe. The agency focuses on mid-market companies \u2014 50 to 500 employees \u2014 across thirteen industries: manufacturing, healthcare, legal, finance, logistics, real estate, professional services, construction, education, retail, SaaS, hospitality, and nonprofit. Settle AI works asynchronously by default with synchronous working sessions at deployment checkpoints.",
      },
    },
    {
      "@type": "Question",
      name: "What is Claude AI, and why does Settle AI use it exclusively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude AI is Anthropic\u2019s AI assistant, purpose-built for long, complex reasoning and safe enterprise use. Settle chose to work exclusively with Claude AI because, after testing every major model in production business workflows, it consistently outperforms on the tasks that matter most: multi-step document generation, precise instruction following, and reliable output across hundreds of runs. At Orient Printing, for example, Claude AI handles everything from generating 8-page sales proposals with accurate pricing to troubleshooting industrial printing press issues from technical manuals. One model, deeply understood, produces better results than spreading across three or four.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI realistic for manufacturers and traditional businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Settle\u2019s first client is a 79-year-old printing and packaging manufacturer with 20,000+ units installed across 50 countries. Settle mapped 49 use cases across their 7 departments and deployed 11 in the first engagement, covering offer generation, RFQ drafting, BOM creation, service troubleshooting, and vendor analysis. Traditional businesses often have the most to gain from AI because their workflows are repeatable, documentation-heavy, and largely unchanged for years. The offer generator alone cut document creation time from 4 hours to 30 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How is Settle different from hiring a big consulting firm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Large consulting firms charge enterprise rates, take months to deliver a strategy deck, and then hand you a PDF that your team has to figure out how to implement. Settle does the opposite. Working Claude AI projects ship in the first two to three weeks. Your team is using AI from week one, not waiting for a 200-page assessment. Settle is built specifically for companies with 50 to 500 employees \u2014 too complex for a DIY tutorial but too lean to justify a Big Four engagement. Every project comes with production-grade instructions, safety rules, and review gates. Not a strategy deck. Working tools.",
      },
    },
    {
      "@type": "Question",
      name: "What does a typical Claude AI deployment engagement look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Four phases. First, Discovery: auditing every department\u2019s workflows to identify where AI will have the highest impact. Second, Architecture: building a prioritised rollout plan that groups use cases by workflow cluster, not department. Third, Instruction Engineering: writing production-grade Claude AI project instructions with safety rules, edge case handling, review gates, and knowledge file specifications. Fourth, Deploy and Settle: projects go live, the team gets trained, and Settle iterates based on real usage. Quick wins typically ship in the first 2\u20133 weeks. Deeper integrations with ERP or CRM follow in subsequent phases.",
      },
    },
    {
      "@type": "Question",
      name: "How long until we see results from AI deployment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams see their first working Claude AI project within 2 to 3 weeks. These are typically high-volume, low-complexity tasks like email drafting, document generation, or knowledge base Q&A. The full rollout depends on scope and how many departments are involved. Orient Printing deployed 11 projects across 7 departments over about 6 months, but they were measuring time savings from month one. The key is starting with a quick win that proves the value, then expanding. Once one department sees results, the others start asking when they\u2019re next.",
      },
    },
    {
      "@type": "Question",
      name: "What systems can Claude AI connect to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude AI connects to business systems through MCP (Model Context Protocol), an open standard built by Anthropic specifically for enterprise integration. If your system has an API or structured data export, Settle can build a connector for it. Connectors have been built for ERPs like SAP, CRMs like HubSpot and Salesforce, document stores like SharePoint and Google Drive, email systems, and custom internal databases. Each connector is a lightweight server that translates data between Claude AI and your system. Most take a few days to build and test.",
      },
    },
    {
      "@type": "Question",
      name: "Do employees need technical skills to use Claude AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. Settle engineers the instructions so your team interacts with Claude AI in plain language, exactly the way they\u2019d talk to a knowledgeable colleague. They don\u2019t write prompts, configure settings, or understand anything about AI. They use structured Claude AI projects built and tested specifically for their workflows. A sales engineer types in a customer name and product requirements, and gets back a formatted offer document. A procurement manager describes what they need, and gets a complete RFQ. The complexity is in the instructions, not in what your team has to do.",
      },
    },
    {
      "@type": "Question",
      name: "Is company data safe with Claude AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Claude AI is built by Anthropic, which leads the industry in AI safety research. Data sent to Claude AI via the API is not used for model training by default. Anthropic holds SOC 2 Type II certification and offers HIPAA-eligible plans for healthcare data. Beyond Anthropic\u2019s security, every project Settle deploys includes explicit safety rules, review gates, and output boundaries written into the instructions. Claude AI won\u2019t share data between departments unless configured to. It won\u2019t fabricate information. It won\u2019t take actions without human approval at defined checkpoints.",
      },
    },
  ],
};

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


/* ─── Hero subtitle typewriter ──────────────────────────
   Types out the hero subtitle on first load. Every character
   is rendered upfront at opacity:0 so the liquid-glass card
   has its final size from frame one — no layout shift. */

/* Three styled segments: default, semibold emphasis, and a
   subdued tail that supports the main line. Each character
   inherits its segment's className; the typewriter counter
   walks through all segments as if the string were flat. */
const HERO_SEGMENTS = [
  {
    text: "We settle AI into your team\u2019s actual workflows \u2014 structured rollouts, production-grade instructions, ",
    className: "",
  },
  {
    text: "and end-to-end automation.",
    className: "font-semibold",
  },
  {
    text: " No AI expertise required on your end.",
    className: "text-text-muted",
  },
];

const HERO_LEN = HERO_SEGMENTS.reduce((n, s) => n + s.text.length, 0);

function HeroSubtitle() {
  /* Lazy initializer avoids the setState-in-effect lint. If the user
     prefers reduced motion, start fully revealed and skip the animation. */
  const [i, setI] = useState<number>(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return HERO_LEN;
    }
    return 0;
  });

  /* Intentional mount-only effect. `i` is read once as a reduced-motion
     guard (initial state already at HERO_LEN) — re-running on every
     increment would restart the typewriter in a loop. */
  useEffect(() => {
    if (i >= HERO_LEN) return;

    let cancelled = false;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      n += 1;
      setI(n);
      if (n >= HERO_LEN) return;
      timer = setTimeout(tick, 22);
    };

    const start = setTimeout(tick, 280);
    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let charIdx = 0;
  return (
    <div className="text-text text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.7]">
      {HERO_SEGMENTS.map((segment, si) => (
        <span key={si} className={segment.className}>
          {[...segment.text].map((c) => {
            const myIdx = charIdx++;
            const visible = myIdx < i;
            return (
              <span
                key={myIdx}
                style={{ opacity: visible ? 1 : 0 }}
                aria-hidden={visible ? undefined : true}
              >
                {c}
              </span>
            );
          })}
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

                {/* Browser frame screenshot — the card is clickable since
                   the Orient site is now live at tphorient.com. */}
                <a
                  href="https://www.tphorient.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden border border-[rgba(20,20,19,0.1)] bg-bg shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-3 transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[rgba(20,20,19,0.04)] border-b border-[rgba(20,20,19,0.08)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[rgba(20,20,19,0.18)]" />
                    <div className="flex-1 text-center text-[11px] text-text-faint font-mono px-2 truncate">
                      www.tphorient.com
                    </div>
                    <div className="w-12 shrink-0" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/orient/orient-landing-hero.png"
                    alt="Orient landing page at tphorient.com"
                    loading="lazy"
                    className="w-full block"
                  />
                </a>
                <div className="flex items-start justify-between gap-4 mb-12 text-[12px]">
                  <div className="text-text-muted leading-snug">
                    Next.js · Interactive globe · Embedded AI chat
                  </div>
                  <div className="text-accent font-semibold uppercase tracking-[0.08em] text-[10px] shrink-0 mt-0.5">
                    Live at tphorient.com
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

/* ─── Feature-card spotlight tracking ───────────────────
   Pairs with the `.feature-card::before` radial gradient in globals.css.
   Writes --mx/--my directly on the element so the spotlight follows the
   cursor without a React re-render — one DOM style write per mousemove
   vs. a full reconcile tree if we stashed coords in state. */
function handleFeatureCardMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ─── Corner bracket (dispatch cover) ───────────────────
   4 of these frame the hero like a newspaper masthead. Each
   bracket is just two perpendicular 1px borders on a tiny box;
   the position prop picks which two sides to paint. */
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "top-4 left-4 md:top-6 md:left-6 border-t border-l",
    tr: "top-4 right-4 md:top-6 md:right-6 border-t border-r",
    bl: "bottom-4 left-4 md:bottom-6 md:left-6 border-b border-l",
    br: "bottom-4 right-4 md:bottom-6 md:right-6 border-b border-r",
  };
  return (
    <div
      aria-hidden
      className={`absolute w-5 h-5 md:w-7 md:h-7 pointer-events-none border-text/35 z-20 ${map[position]}`}
    />
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
  const exploreRef = useFadeIn();
  const founderRef = useFadeIn();
  const ctaRef = useFadeIn();
  const whyClaudeRef = useFadeIn();
  const claudeRecommendRef = useFadeIn();
  const gaasRef = useFadeIn();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* Hero: "now surveying" ticker synced to the globe's country cycle.
     The Globe component emits onFocus once per country change (not per
     animation frame), so this re-renders ~1×/6s — cheap. */
  const [globeCountry, setGlobeCountry] = useState("India");
  /* Services highlight state. `hoveredService` is the transient preview
     that fires on pointer enter/leave. `pinnedService` is the sticky
     selection set by clicking a pill — it persists until the same pill
     is clicked again (unpin) or a different pill replaces it. Hover
     wins over pin for the duration of the hover so you can preview
     other branches without losing your baseline. */
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [pinnedService, setPinnedService] = useState<string | null>(null);
  const activeServiceCategory = hoveredService ?? pinnedService;

  /* FAQ category filter. "All" is the default; clicking a category pill
     narrows the index to just those entries. Kept as local state here
     (not URL state) because FAQs aren't typically deep-linked by category. */
  const [faqCategory, setFaqCategory] = useState<string>("All");

  /* Quotes carousel — horizontal scroll-snap container with manual
     nav buttons. Auto-advance is deliberately omitted: auto-moving
     testimonials are distracting mid-read, and scroll-snap + nav
     buttons already signal "there's more" without taking agency
     away from the reader. */
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
      {/* Homepage FAQ schema. Moved out of root layout.tsx (which
         was emitting FAQPage on every page) so it only fires here —
         per-page FAQs on ArticleLayout no longer duplicate it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_FAQ_JSONLD) }}
      />
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
      <Nav variant="full" revealOnScroll />

      {/* ── Hero: Dispatch Cover (editorial masthead) ──
         Editorial split: big stacked-serif title on the LEFT, narrow
         lede/CTA on the RIGHT, and the globe floats centered-top between
         them so its north pole rises up through the gutter. A mono
         dispatch rail and four corner brackets frame the composition
         like a Field Notes cover. The globe is untouched — just
         repositioned from "fills below text" to "emerges behind text". */}
      <section className="relative min-h-[780px] md:min-h-screen overflow-hidden">
        {/* Corner brackets — echo the GAAS ops-canvas framing */}
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* Globe — same positioning as before, just now layered behind.
           z-0 so the two text columns (z-10) sit on top; its top edge
           pokes up behind the dispatch rail and into the gutter between
           the left title and right lede columns. */}
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none z-0">
          <div className="w-[min(150vw,1100px)] aspect-square shrink-0 mt-[calc(2px-min(150vw,1100px)*0.02)]">
            <Globe className="w-full h-full" onFocus={(c) => setGlobeCountry(c.name)} />
          </div>
        </div>

        {/* Top mono dispatch rail — full width, framed by brackets */}
        <div className="relative z-20 pt-8 md:pt-10 px-8 md:px-14">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-text/55">
            <span>Dispatch · 01</span>
            <span className="hidden md:inline tracking-[0.26em]">
              Settle — Full-stack AI layer
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex w-[6px] h-[6px]">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
                <span className="relative inline-block w-full h-full rounded-full bg-accent" />
              </span>
              Live · Apr 2026 · {globeCountry}
            </span>
          </div>
          {/* Hairline under rail, joins the corner brackets visually */}
          <div className="max-w-[1440px] mx-auto mt-3 h-px bg-text/12" />
        </div>

        {/* ── Editorial split: title column ‖ globe gutter ‖ lede column ──
           Grid instead of absolute — lets the browser handle reflow at
           every breakpoint while keeping the two columns anchored to
           the left and right edges of the section. */}
        <div className="relative z-10 px-8 md:px-14 pt-12 md:pt-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-y-8 md:gap-x-12">
            {/* LEFT: poster-type stacked title on desktop, natural-flow
               on mobile (spans collapse to inline so the heading wraps at
               word boundaries like the body copy below, matching its line
               width instead of stacking one word per line). */}
            <h1 className="font-heading font-medium leading-[1.02] md:leading-[0.92] tracking-[-0.035em] text-text text-[clamp(2.4rem,9vw,6.4rem)]">
              <span className="md:block">Your </span>
              <span className="md:block">business, </span>
              <span className="md:block">made </span>
              <span className="md:block text-accent">AI-native.</span>
            </h1>

            {/* RIGHT: narrow lede column — eyebrow, subtitle, CTA */}
            <div className="md:pl-4 md:pt-6 md:max-w-[360px] md:ml-auto">
              {/* Mono label stripe — mirrors the "Lede" column-head of a
                 broadsheet page. Tight vertical rhythm. */}
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-8 bg-accent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-text/60">
                  The Lede
                </span>
              </div>
              <p className="hero-eyebrow text-[11px] md:text-[12px] font-medium uppercase tracking-[0.18em] text-accent/90 mb-5">
                Settle AI · Full-stack AI agency for mid-market teams
              </p>
              <div className="hero-subtitle mb-7">
                <HeroSubtitle />
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
                >
                  Start a conversation
                  <Arrow />
                </a>
                <a
                  href="#case-study"
                  className="text-[11px] font-mono uppercase tracking-[0.2em] text-text/55 hover:text-text transition-colors"
                >
                  Case · 01 ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom mono dateline — completes the masthead frame */}
        <div className="absolute bottom-8 md:bottom-10 left-8 md:left-14 right-8 md:right-14 z-20 hidden sm:flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-text/45">
          <span>Folio · Delhi ↔ New York ↔ London</span>
          <span className="hidden md:inline">Issue 01 / Vol. I</span>
          <span>End of page</span>
        </div>
      </section>

      {/* ── Case Study: Orient ──────────────────────────
         Sits below the Dispatch Cover hero. Earlier versions pulled this
         card up with a huge negative margin to overlap the globe's lower
         curve — with the editorial split layout, the hero now occupies
         the full viewport with the title stack, so the card flows
         naturally beneath instead. */}
      <section
        id="case-study"
        ref={caseRef}
        className="relative z-10"
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

      {/* ── GAAS — Agents-as-a-Service positioning ──
         Visual thesis: this section is the live-infrastructure
         inflection on the page. Eyebrow carries an ops-style
         pulsing dot + mono tag; the diagram below ships the
         full operations-canvas treatment. Copy is unchanged. */}
      <section ref={gaasRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24 text-center">
          <p className="fade-up inline-flex items-center gap-2.5 mb-5">
            <span
              aria-hidden
              className="relative inline-flex w-[7px] h-[7px]"
            >
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
              <span className="relative inline-block w-full h-full rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Agents as a Service
            </span>
            <span
              aria-hidden
              className="hidden sm:inline-block h-px w-8 bg-accent/30"
            />
            <span
              aria-hidden
              className="hidden sm:inline-block text-[10px] tracking-[0.16em] text-accent/60 uppercase"
              style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
            >
              live
            </span>
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

          {/* AgentDiagram is dynamic({ ssr: false }) — its DOM mounts
             AFTER the parent's useFadeIn runs, so attaching `fade-up`
             here would leave it orphaned (never observed) and stuck at
             opacity:0. The component has its own IntersectionObserver
             that fades the canvas/hub/cards in from within. */}
          <AgentDiagram className="mb-12 md:mb-16" />

          {/* Engineering-style separator — ties the copy below to the canvas above */}
          <div
            aria-hidden
            className="fade-up mx-auto mb-10 md:mb-12 flex items-center justify-center gap-3 max-w-[340px]"
          >
            <span className="h-px flex-1 bg-border" />
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-text-faint"
              style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
            >
              how it compounds
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

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

      {/* ── Why Claude — editorial POV + external field guide ──
         Two feature-cards sharing spotlight/accent-rule DNA. Left card
         carries our reasoning as a specimen list (hairline + kicker +
         Fraunces title per reason); right card is the Anthropic link,
         accent-tinted, with a framed Claude plate + Fig. caption. */}
      <section ref={claudeRecommendRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          {/* Editorial header — tiny eyebrow, Fraunces-italic accent on "Claude",
             and a hairline diamond ornament for the magazine-opener feel. */}
          <div className="fade-up text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                The model of record
              </p>
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-[-0.02em] font-medium leading-[1.1]">
              Why we default to{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Claude.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-[1.1fr_1fr] gap-5 md:gap-6 max-w-[1060px] mx-auto stagger">
            {/* LEFT — "Three reasons" specimen list */}
            <div
              className="fade-up feature-card feature-card--lg group"
              onMouseMove={handleFeatureCardMove}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-accent" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Our POV &middot; Three reasons
                </p>
              </div>

              <div className="flex flex-col gap-7">
                {[
                  {
                    title: "Instruction fidelity.",
                    body: "Tell it once — the pattern holds across every run. Zero prompt drift.",
                  },
                  {
                    title: "Refuses before it fabricates.",
                    body: "Says \u201CI don\u2019t know\u201D before it invents citations, numbers, or policy.",
                  },
                  {
                    title: "Best-in-class at tool use.",
                    body: "MCP, function calling, structured workflows \u2014 production-grade agentic loops.",
                  },
                ].map((r) => (
                  <div key={r.title} className="flex gap-4 md:gap-5">
                    <div className="pt-[14px] w-6 shrink-0">
                      <div className="w-full h-px bg-[rgba(20,20,19,0.3)]" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[1.25rem] md:text-[1.4rem] font-normal leading-[1.2] text-text mb-1.5"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {r.title}
                      </h3>
                      <p className="text-text-muted text-[14px] leading-[1.6]">
                        {r.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hairline separator before the footer — editorial coda */}
              <div className="mt-9 pt-6 border-t border-[rgba(20,20,19,0.1)]">
                <p className="text-text-muted text-[13px] leading-[1.6] mb-5 italic"
                   style={{ fontFamily: "var(--font-heading)" }}>
                  Not the only model we deploy. We pick what fits.
                </p>
                <a
                  href="#contact"
                  className="relative z-10 inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
                >
                  Talk to us about your stack
                  <Arrow />
                </a>
              </div>
            </div>

            {/* RIGHT — Anthropic field guide (accent-tinted feature-card) */}
            <a
              href="https://claude.com/resources/use-cases"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleFeatureCardMove}
              className="fade-up feature-card feature-card--lg feature-card--accent group min-h-[360px] md:min-h-[460px]"
            >
              {/* Header — framed Claude plate + Fig. caption + outbound arrow */}
              <div className="flex items-start justify-between mb-auto">
                <div className="relative">
                  <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-xl border border-[rgba(217,119,87,0.25)] bg-[rgba(255,255,255,0.35)] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/claude-color.svg"
                      alt="Claude"
                      width={44}
                      height={44}
                      className="w-10 h-10 md:w-11 md:h-11 animate-breathe"
                    />
                  </div>
                  <span className="block mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                    Plate &middot; Claude
                  </span>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-text-muted group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 mt-1"
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

              {/* Footer block — kicker, italic Fraunces title, body, url caption */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-accent" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Field guide &middot; Anthropic
                  </p>
                </div>
                <h3
                  className="text-[clamp(1.5rem,2.4vw,1.95rem)] font-normal leading-[1.12] tracking-[-0.01em] mb-3 text-text"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Claude <span className="italic">in production.</span>
                </h3>
                <p className="text-text-muted text-[14.5px] leading-[1.6] mb-5">
                  Real enterprise deployments across research, finance, legal,
                  and engineering.
                </p>
                <p className="text-[11.5px] font-medium tracking-[0.08em] text-text-muted/80 font-mono">
                  claude.com/resources/use-cases
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
         Editorial treatment: hairline-flanked eyebrow on the H2, italic
         Fraunces accent on "deliver"; pills get a tiny accent dot on the
         active/hovered state; the mindmap is framed with corner brackets
         and specimen-label annotations (plate title, legend). */}
      <section id="services" ref={servicesRef} className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          {/* Editorial header — eyebrow kicker + Fraunces italic on "deliver" */}
          <div className="fade-up text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Scope &amp; deliverables
              </p>
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-[-0.02em] font-medium leading-[1.1]">
              What we{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                deliver.
              </span>
            </h2>
          </div>

          {/* Pill rail — each pill: Fraunces title · hairline · descriptor.
             Active/pinned state grows a tiny accent dot prefix and warms
             the border so the selected tag reads as "currently isolated". */}
          <div className="fade-up flex flex-wrap justify-center gap-2.5 mb-10 md:mb-14">
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
                    "group inline-flex items-center gap-3 rounded-full pl-4 pr-5 py-2.5 border transition-all duration-300 cursor-pointer",
                    active
                      ? "bg-[rgba(217,119,87,0.1)] border-[rgba(217,119,87,0.45)] shadow-[0_4px_18px_-6px_rgba(217,119,87,0.25)]"
                      : "bg-bg border-[rgba(20,20,19,0.12)] hover:border-[rgba(20,20,19,0.3)] hover:bg-[rgba(20,20,19,0.03)] hover:-translate-y-[1px]",
                  ].join(" ")}
                >
                  {/* Accent indicator — hairline on inactive, filled dot on active */}
                  <span
                    aria-hidden
                    className={[
                      "shrink-0 transition-all duration-300 rounded-full",
                      active
                        ? "w-1.5 h-1.5 bg-accent"
                        : "w-2 h-px bg-[rgba(20,20,19,0.3)] group-hover:bg-[rgba(20,20,19,0.5)]",
                    ].join(" ")}
                  />
                  <span
                    className="text-[13px] font-medium text-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.title}
                  </span>
                  <span
                    aria-hidden
                    className="w-px h-3 bg-[rgba(20,20,19,0.15)] hidden sm:inline-block"
                  />
                  <span className="text-text-muted text-[12.5px] hidden sm:inline">
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mindmap — framed as an editorial plate.
             Corner brackets + specimen-label top-left + legend bottom-right.
             Faint inset border to separate the plate from the page. */}
          <div className="fade-up relative px-2 md:px-4 py-3 md:py-5">
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />

            {/* Top-left specimen tag */}
            <div className="absolute top-4 left-12 md:top-7 md:left-16 z-10 flex items-center gap-3 pointer-events-none">
              <div className="w-5 h-px bg-accent" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                Plate &middot; Service constellation
              </p>
            </div>

            {/* Bottom-right legend */}
            <div className="absolute bottom-4 right-12 md:bottom-7 md:right-16 z-10 flex items-center gap-3 pointer-events-none">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-text-muted">
                Hover a tag to isolate
              </p>
              <div className="w-5 h-px bg-[rgba(20,20,19,0.3)]" />
            </div>

            {/* Full-width mindmap.
               Explicit height is required because the Mindmap reads
               container.clientHeight on mount/resize — without a fixed
               height the component would render at 0 and never lay out. */}
            <div className="w-full h-[520px] md:h-[640px]">
              <Mindmap
                className="w-full h-full"
                highlightCategory={activeServiceCategory}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Process (scroll-pinned) ──────────────────── */}
      {/* Server-rendered heading so non-JS crawlers (CCBot, Common Crawl)
         index "The Settle Method" as a named entity. ProcessScroll below
         is client-only (ssr: false) for GSAP, so its eyebrow alone would
         be invisible to AI training corpora. */}
      <div id="process" ref={processRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 md:pt-24 pb-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted mb-4">
            Our methodology
          </p>
          <h2
            className="text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text max-w-[820px] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Settle Method.
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-text-muted max-w-[640px]">
            A four-phase approach for deploying Claude AI into mid-market
            businesses — Discovery, Architecture, Instruction Engineering, and
            Deploy &amp; Settle. Every engagement runs the same playbook.
          </p>
        </div>
        <ProcessScroll />
      </div>

      {/* ── Who it's for — editorial "client profiles" page ──
         Matched to the Why Claude / What we deliver vocabulary: hairline
         eyebrow, italic Fraunces accent on the H2, and two feature-card
         specimens each carrying a kicker tag, Fraunces title, body, and
         a bottom metadata rail (team size · shape · workflow emphasis). */}
      <section ref={audienceRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          {/* Editorial header */}
          <div className="fade-up text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Client profiles
              </p>
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-[-0.02em] font-medium leading-[1.1]">
              Who we{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                work with.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-[1100px] mx-auto stagger">
            {[
              {
                tag: "Manufacturing & industrial",
                title: "Manufacturers & industrial operators.",
                desc: "Complex operations, multiple departments, heavy documentation overhead. We map your workflows, deploy Claude across teams, and train your people to use it.",
                meta: [
                  "50–500 people",
                  "Multi-department",
                  "Ops + R&D + field",
                ],
              },
              {
                tag: "Growing SMBs",
                title: "Growing SMBs.",
                desc: "Lean teams doing more than they should manually. We find the workflows where Claude saves the most time — and deploy those first, then layer the rest.",
                meta: [
                  "10–100 people",
                  "Lean operations",
                  "High-volume repeat work",
                ],
              },
            ].map((a) => (
              <div
                key={a.title}
                className="fade-up feature-card feature-card--lg group"
                onMouseMove={handleFeatureCardMove}
              >
                {/* Accent kicker */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-accent" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Profile &middot; {a.tag}
                  </p>
                </div>

                {/* Fraunces serif title */}
                <h3
                  className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-normal leading-[1.15] tracking-[-0.01em] text-text mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {a.title}
                </h3>

                <p className="text-text-muted text-[15px] leading-[1.65] mb-7">
                  {a.desc}
                </p>

                <div className="flex-1" />

                {/* Metadata rail — hairline-separated tag row */}
                <div className="pt-5 mt-auto border-t border-[rgba(20,20,19,0.1)] flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px] text-text-muted">
                  {a.meta.map((m, i) => (
                    <span key={m} className="inline-flex items-center">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className="inline-block w-1 h-1 rounded-full bg-[rgba(20,20,19,0.25)] mr-3"
                        />
                      )}
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Quotes — Editorial Mosaic ─────────
         Asymmetric 12-col bento grid. The hero pull quote (col-span-7,
         row-span-2) gets magazine-style treatment: oversized serif
         italic + decorative ❝ watermark in accent terracotta. Two
         stacked cards sit to its right, including one inverted
         accent-filled card that breaks the monotone beige. A 3-card
         bottom row includes a near-black "featured" card for a
         third color-tone step. Subtle hover-lift on every card. */}
      <section ref={quotesRef} className="bg-[#ddd9cc] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24 relative">
          {/* Section header */}
          <div className="fade-up mb-6 md:mb-10 max-w-2xl">
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-accent mb-2.5 flex items-center gap-2.5">
              <span className="inline-block w-6 h-px bg-accent/60" />
              Voices from South Asia
            </p>
            <h2 className="text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-text">
              What business leaders are{" "}
              <em className="not-italic text-accent font-heading italic">
                actually
              </em>{" "}
              saying about AI.
            </h2>
          </div>

          {/* Editorial mosaic grid — 2 cols on mobile (bento), 12 on md */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5">
            {/* HERO pull quote — full width mobile, 7×2 on md */}
            <article className="fade-up group relative col-span-2 md:col-span-7 md:row-span-2 bg-bg rounded-xl md:rounded-2xl p-5 md:p-10 overflow-hidden border border-black/[0.05] flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <span
                aria-hidden
                className="absolute -top-6 md:-top-12 -left-2 md:-left-5 text-[7rem] md:text-[16rem] leading-none font-heading text-accent/25 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-heading italic text-[clamp(1.05rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.01em] text-text mt-5 md:mt-12">
                I had the app in 2 days. It would have taken 2 months
                before.
              </blockquote>
              <div className="relative flex items-center gap-2.5 mt-4 md:mt-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium text-text/70">
                  Small business owner · India
                </span>
              </div>
            </article>

            {/* Top-right card — clean cream */}
            <article className="fade-up col-span-2 md:col-span-5 bg-bg rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/[0.05] flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <blockquote className="text-[13.5px] md:text-[16px] leading-[1.5] text-text/85 font-medium">
                &ldquo;Since I can think faster than I could build, my
                range of ideas has grown.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2.5 mt-3 md:mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] md:text-[10.5px] uppercase tracking-[0.15em] text-text-muted">
                  Entrepreneur · India
                </span>
              </div>
            </article>

            {/* Middle-right card — INVERTED terracotta */}
            <article className="fade-up relative col-span-2 md:col-span-5 bg-accent text-white rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <span
                aria-hidden
                className="absolute -top-4 right-1 md:right-2 text-[5rem] md:text-[7rem] leading-none font-heading text-white/20 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-heading italic text-[clamp(1.1rem,1.9vw,1.6rem)] leading-[1.2] text-white">
                I don&rsquo;t see any limit anymore.
              </blockquote>
              <div className="relative flex items-center gap-2.5 mt-3 md:mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span className="text-[10px] md:text-[10.5px] uppercase tracking-[0.15em] text-white/80">
                  Entrepreneur · India
                </span>
              </div>
            </article>

            {/* Bottom row — 3 cards. On mobile: 2 cols, the dark one spans full. */}
            <article className="fade-up col-span-1 md:col-span-4 bg-bg rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/[0.05] flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <blockquote className="text-[12.5px] md:text-[14px] leading-[1.55] text-text/80">
                &ldquo;My worry isn&rsquo;t intentional harm but
                unexamined assumptions being scaled through
                automation.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2.5 mt-3 md:mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[9.5px] md:text-[10.5px] uppercase tracking-[0.15em] text-text-muted">
                  Entrepreneur · India
                </span>
              </div>
            </article>

            <article className="fade-up col-span-1 md:col-span-4 bg-bg rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/[0.05] flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <blockquote className="text-[12.5px] md:text-[14px] leading-[1.55] text-text/80">
                &ldquo;A laptop crash wiped three months of work. I
                rebuilt my website in four languages within five
                weeks.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2.5 mt-3 md:mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[9.5px] md:text-[10.5px] uppercase tracking-[0.15em] text-text-muted">
                  Entrepreneur · India
                </span>
              </div>
            </article>

            {/* Featured near-black card — spans full on mobile, 4 on md */}
            <article className="fade-up relative col-span-2 md:col-span-4 bg-bg-dark text-bg rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-500">
              <span
                aria-hidden
                className="absolute -top-4 right-2 text-[4.5rem] md:text-[6rem] leading-none font-heading text-accent/30 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-[12.5px] md:text-[14px] leading-[1.55] text-bg/90">
                Accidentally, AI gave me the idea of a new business
                &mdash; enough to retire my family and help people in
                Balochistan and Sindh.
              </blockquote>
              <div className="relative flex items-center gap-2.5 mt-3 md:mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[9.5px] md:text-[10.5px] uppercase tracking-[0.15em] text-bg/60">
                  Entrepreneur · Pakistan
                </span>
              </div>
            </article>
          </div>

          <p className="text-[10.5px] md:text-[11px] text-text-faint mt-7 md:mt-12 max-w-2xl">
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

      {/* ── FAQ ──────────────────────────────────────────
         Archival-catalog treatment. Each entry reads as a museum-style
         reference record: mono `Q.NN` call number, uppercase category
         tag, then the question. Opening an entry surfaces a Fraunces
         italic `A.` specimen marker + an accent hairline rail under the
         meta column — keeping the catalog metaphor intact through the
         answer. Filter pills above let 11 entries stay browseable. */}
      <section ref={faqRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto">
          {/* Editorial header — matches the rest of the site's section vocab */}
          <div className="fade-up text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Reference · FAQ
              </p>
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-[-0.02em] font-medium leading-[1.1]">
              Frequently asked{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                questions.
              </span>
            </h2>
            <p className="mt-5 text-[12px] md:text-[13px] font-mono uppercase tracking-[0.22em] text-text/55">
              Eleven entries ·{" "}
              <a
                href="#ask"
                className="text-accent hover:text-accent/80 transition-colors normal-case tracking-normal font-sans text-[14px]"
              >
                ask AI directly ↑
              </a>
            </p>
          </div>

          {/* Filter rail — editorial pills. Active pill gets the accent
             hairline underline treatment (not a filled pill) so it reads
             as "chapter marker" rather than "button bar". */}
          <div className="fade-up mb-10 md:mb-12 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {[
              "All",
              "The firm",
              "The method",
              "The stack",
              "In practice",
              "Trust",
            ].map((cat) => {
              const active = faqCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFaqCategory(cat)}
                  className="relative px-3 md:px-4 py-2 text-[11px] md:text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-colors"
                  style={{
                    color: active
                      ? "#d97757"
                      : "rgba(20,20,19,0.55)",
                  }}
                >
                  {cat}
                  {/* Active hairline underline — anchored just below the
                     label, extends the full pill width on active, narrows
                     to a stub on inactive so the motion reads as a "cursor
                     ticking along a catalog spine". */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 bottom-[2px] h-px transition-all duration-300"
                    style={{
                      width: active ? "calc(100% - 12px)" : "0px",
                      background: "#d97757",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Entries — catalog rows with a shared top/bottom hairline frame.
             Fade-up is on the container (not each entry) because the filter
             pills above swap child DOM in/out, and `useFadeIn`'s observer
             only binds once on mount — newly-mounted children would never
             get `.visible` applied. One wrapper = one fade, zero bugs. */}
          <div className="fade-up border-t border-[rgba(20,20,19,0.14)]">
            {[
              {
                cat: "The firm",
                q: "What is Settle AI?",
                a: "Settle AI is a full-stack AI agency that deploys Claude AI \u2014 Anthropic\u2019s frontier model \u2014 into the actual workflows of manufacturers, professional services firms, and mid-market companies. Settle handles the full rollout: workflow discovery, instruction engineering, custom agent deployment, integrations, and ongoing optimisation. The company is also known as \u201cSettle with AI\u201d, which is where the domain settlewithai.com comes from. Settle AI is built specifically for 50\u2013500-person companies that are too complex for a DIY AI tutorial but too lean to justify a Big Four consulting engagement.",
              },
              {
                cat: "The firm",
                q: "Who founded Settle AI?",
                a: "Settle AI was founded in 2025 by Pranav Ambwani. Pranav holds a BS in Electrical Engineering from the University of Southern California and spent nine years in product and growth across B2B SaaS and fintech in Los Angeles before returning home to Delhi to start Settle AI. He writes about Claude AI deployment, instruction engineering, and the mechanics of running AI in production on the Settle AI blog and on Medium.",
              },
              {
                cat: "The firm",
                q: "Where is Settle AI based, and who does it serve?",
                a: "Settle AI is remote-first and operates globally. Engagements have been delivered across India, the United States, the United Kingdom, and continental Europe. The agency focuses on mid-market companies \u2014 50 to 500 employees \u2014 across thirteen industries: manufacturing, healthcare, legal, finance, logistics, real estate, professional services, construction, education, retail, SaaS, hospitality, and nonprofit. Settle AI works asynchronously by default with synchronous working sessions at deployment checkpoints.",
              },
              {
                cat: "The stack",
                q: "What is Claude AI, and why does Settle AI use it exclusively?",
                a: "Claude AI is Anthropic\u2019s AI assistant, purpose-built for long, complex reasoning and safe enterprise use. I chose to work exclusively with Claude because, after testing every major model in production business workflows, it consistently outperforms on the tasks that matter most: multi-step document generation, precise instruction following, and reliable output across hundreds of runs. At Orient Printing, for example, Claude handles everything from generating 8-page sales proposals with accurate pricing to troubleshooting industrial printing press issues from technical manuals. One model, deeply understood, produces better results than spreading across three or four.",
              },
              {
                cat: "In practice",
                q: "We\u2019re a manufacturer. Is AI realistic for us?",
                a: "Absolutely. My first client is a 79-year-old printing and packaging manufacturer with 20,000+ units installed across 50 countries. Not exactly a Silicon Valley startup. I mapped 49 use cases across their 7 departments and deployed 11 in the first engagement, covering offer generation, RFQ drafting, BOM creation, service troubleshooting, and vendor analysis. Traditional businesses often have the most to gain from AI because their workflows are repeatable, documentation-heavy, and largely unchanged for years. The offer generator alone cut document creation time from 4 hours to 30 minutes. That\u2019s not incremental. It\u2019s a step change in how the team works.",
              },
              {
                cat: "The method",
                q: "How is Settle different from hiring a big consulting firm?",
                a: "Large consulting firms charge enterprise rates, take months to deliver a strategy deck, and then hand you a PDF that your team has to figure out how to implement. I do the opposite. Working Claude agents ship in the first two to three weeks. Your team is using AI from week one, not waiting for a 200-page assessment to get approved. Settle is built specifically for companies with 50 to 500 employees, the ones too complex for a DIY YouTube tutorial but too lean to justify a Big Four engagement. Every agent I deploy comes with production-grade instructions, safety rules, and review gates. Not a strategy deck. Working tools.",
              },
              {
                cat: "The method",
                q: "What does a typical engagement look like?",
                a: "Four phases. First, Discovery: I spend time with your team to audit every department\u2019s workflows and identify where AI will have the highest impact. Second, Architecture: I build a prioritised rollout plan that groups use cases by workflow cluster, not department, because that\u2019s what produces the best results. Third, Instruction Engineering: I write production-grade Claude agent instructions with safety rules, edge case handling, review gates, and knowledge file specifications. Fourth, Deploy and Settle: agents go live, your team gets trained, and I iterate based on real usage. Quick wins typically ship in the first 2\u20133 weeks. Deeper integrations with your ERP or CRM follow in subsequent phases.",
              },
              {
                cat: "The method",
                q: "How long until we see results?",
                a: "Most teams see their first working Claude agent within 2 to 3 weeks. These are typically high-volume, low-complexity tasks like email drafting, document generation, or knowledge base Q&A. The full rollout depends on your scope and how many departments are involved. Orient Printing deployed 11 agents across 7 departments over about 6 months, but they were measuring time savings from month one. The key is starting with a quick win that proves the value, then expanding from there. I\u2019ve found that once one department sees results, the others start asking when they\u2019re next.",
              },
              {
                cat: "The stack",
                q: "What systems can Claude connect to?",
                a: "Claude connects to your business systems through MCP (Model Context Protocol), an open standard built by Anthropic specifically for this purpose. If your system has an API or structured data export, I can build a connector for it. I\u2019ve built MCP connectors for ERPs like SAP, CRMs like HubSpot and Salesforce, document stores like SharePoint and Google Drive, email systems, and custom internal databases. The connector is a lightweight server that sits between Claude and your system, translating data in both directions. Most connectors take a few days to build and test. Once connected, Claude doesn\u2019t just know about your business in theory. It can read real data, pull actual numbers, and write results back.",
              },
              {
                cat: "In practice",
                q: "Do our employees need technical skills?",
                a: "Not at all. I engineer the instructions so your team interacts with Claude in plain language, exactly the way they\u2019d talk to a knowledgeable colleague. They don\u2019t write prompts, configure settings, or understand anything about AI. They use structured Claude agents that I\u2019ve built and tested specifically for their workflows. A sales engineer types in a customer name and product requirements, and gets back a formatted offer document. A procurement manager describes what they need, and gets a complete RFQ. The complexity is in the instructions I write, not in what your team has to do.",
              },
              {
                cat: "Trust",
                q: "Is our company data safe with Claude?",
                a: "Yes. Claude is built by Anthropic, which leads the industry in AI safety research. Data sent to Claude via the API is not used for model training by default. Anthropic holds SOC 2 Type II certification and offers HIPAA-eligible plans for healthcare data. Beyond Anthropic\u2019s security, every project I deploy includes explicit safety rules, review gates, and output boundaries written into the instructions. Claude won\u2019t share data between departments unless configured to. It won\u2019t fabricate information. It won\u2019t take actions without human approval at checkpoints I define. Your proprietary processes, pricing, and customer data stay private.",
              },
            ]
              .map((faq, i) => ({ ...faq, num: i + 1 }))
              .filter(
                (faq) => faqCategory === "All" || faq.cat === faqCategory,
              )
              .map((faq) => {
                const nn = String(faq.num).padStart(2, "0");
                return (
                  <details
                    key={faq.num}
                    className="faq-entry group border-b border-[rgba(20,20,19,0.14)]"
                  >
                    <summary className="cursor-pointer select-none list-none py-6 md:py-7 relative">
                      <div className="flex items-start gap-4 md:gap-8">
                        {/* Meta rail — desktop only. Q.NN on top, category
                           tag below. The whole column shifts to accent on
                           hover/open via group state. */}
                        <div className="hidden md:flex flex-col items-start shrink-0 w-[140px] pt-[6px]">
                          <span
                            className="font-mono tabular-nums text-[11px] tracking-[0.2em] text-text/55 transition-colors duration-200 group-hover:text-accent group-open:text-accent mb-2"
                          >
                            Q.{nn}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text/45 whitespace-nowrap transition-colors duration-200 group-open:text-accent/80">
                            {faq.cat}
                          </span>
                        </div>

                        {/* Question + mobile meta */}
                        <div className="flex-1 min-w-0">
                          {/* Mobile-only meta row */}
                          <div className="flex items-center gap-3 md:hidden mb-2.5">
                            <span className="font-mono tabular-nums text-[10px] tracking-[0.2em] text-text/55 group-open:text-accent transition-colors">
                              Q.{nn}
                            </span>
                            <span className="w-4 h-px bg-text/20" />
                            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-text/45">
                              {faq.cat}
                            </span>
                          </div>
                          <h3 className="text-[clamp(1.05rem,1.7vw,1.22rem)] font-medium leading-[1.35] text-text pr-8 md:pr-12 transition-colors duration-200">
                            {faq.q}
                          </h3>
                        </div>

                        {/* +/× icon */}
                        <span className="relative shrink-0 w-5 h-5 text-text/55 mt-[6px] transition-colors duration-200 group-hover:text-accent group-open:text-accent">
                          <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2" />
                          <span className="faq-icon-v absolute top-0 left-1/2 h-full w-px bg-current -translate-x-1/2" />
                        </span>
                      </div>
                    </summary>

                    {/* Answer — aligned under the Question column on desktop.
                       The left 140px tracks the summary's meta column and
                       carries the accent hairline rail + Fraunces "A." marker. */}
                    <div className="flex items-start gap-4 md:gap-8 pb-8 md:pb-10">
                      <div className="hidden md:block shrink-0 w-[140px] relative self-stretch">
                        {/* Accent hairline rail — drops from the top of the
                           answer block down its full height. Sits aligned
                           with where the Q.NN label started. */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/35" />
                        {/* "A." specimen marker in Fraunces italic */}
                        <span
                          className="absolute left-3 top-0 italic text-accent leading-none"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "28px",
                          }}
                        >
                          A.
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pr-8 md:pr-12">
                        {/* Mobile "A." marker */}
                        <span
                          className="md:hidden inline-block italic text-accent leading-none mb-3"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "22px",
                          }}
                        >
                          A.
                        </span>
                        <p className="text-text-muted text-[15px] md:text-[15.5px] leading-[1.8]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </details>
                );
              })}
          </div>
          </div>
        </div>
      </section>

      {/* ── Explore: Industries · Compare · Blog ──────
         Three internal-link hubs that give Google (and users) a
         clear crawl path into the topical clusters. Each card links
         to a hub page plus a few high-intent sub-pages. */}
      <section ref={exploreRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="fade-up mb-12 max-w-[760px]">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-5">
              Go deeper
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] font-medium leading-[1.12] mb-4">
              Browse the playbook.
            </h2>
            <p className="text-text-muted text-[16px] md:text-[17px] leading-[1.7]">
              Industry-specific deployment guides, honest comparisons
              against the alternatives, and long-form writing on Claude AI
              in production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {/* By industry */}
            <div
              className="fade-up feature-card group"
              onMouseMove={handleFeatureCardMove}
            >
              <span className="feature-card-index" aria-hidden="true">01</span>
              <div className="text-[10px] uppercase tracking-[0.2em] text-text-faint mb-4 font-medium">
                By industry
              </div>
              <h3
                className="text-[1.3rem] md:text-[1.5rem] font-medium leading-[1.2] text-text mb-3 group-hover:text-accent transition-colors"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                <a
                  href="/ai-consulting"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  AI consulting for your vertical.
                </a>
              </h3>
              <p className="text-text-muted text-[14.5px] leading-[1.65] mb-6">
                Manufacturing, healthcare, legal, finance, logistics, real
                estate, professional services, construction, education,
                retail, SaaS, hospitality, nonprofit.
              </p>
              <div className="flex-1" />
              <div className="relative z-10 pt-4 mt-auto border-t border-[rgba(20,20,19,0.08)] flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px] text-text-muted">
                <a
                  href="/ai-consulting-for/manufacturing"
                  className="hover:text-accent transition-colors"
                >
                  Manufacturing
                </a>
                <span className="text-text-faint">·</span>
                <a
                  href="/ai-consulting-for/professional-services"
                  className="hover:text-accent transition-colors"
                >
                  Professional services
                </a>
                <span className="text-text-faint">·</span>
                <a
                  href="/ai-consulting-for/logistics-supply-chain"
                  className="hover:text-accent transition-colors"
                >
                  Logistics
                </a>
              </div>
            </div>

            {/* Compare */}
            <div
              className="fade-up feature-card group"
              onMouseMove={handleFeatureCardMove}
            >
              <span className="feature-card-index" aria-hidden="true">02</span>
              <div className="text-[10px] uppercase tracking-[0.2em] text-text-faint mb-4 font-medium">
                Compare
              </div>
              <h3
                className="text-[1.3rem] md:text-[1.5rem] font-medium leading-[1.2] text-text mb-3 group-hover:text-accent transition-colors"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                <a
                  href="/compare"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  Settle AI vs the alternatives.
                </a>
              </h3>
              <p className="text-text-muted text-[14.5px] leading-[1.65] mb-6">
                Honest side-by-sides against Big Four consulting, DIY, ERP
                vendor AI, freelancers, and generic AI tools.
              </p>
              <div className="flex-1" />
              <div className="relative z-10 pt-4 mt-auto border-t border-[rgba(20,20,19,0.08)] flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px] text-text-muted">
                <a
                  href="/compare/big-consulting"
                  className="hover:text-accent transition-colors"
                >
                  vs Big Four
                </a>
                <span className="text-text-faint">·</span>
                <a
                  href="/compare/diy"
                  className="hover:text-accent transition-colors"
                >
                  vs DIY
                </a>
                <span className="text-text-faint">·</span>
                <a
                  href="/compare/chatgpt-generic-ai"
                  className="hover:text-accent transition-colors"
                >
                  vs ChatGPT
                </a>
              </div>
            </div>

            {/* Blog */}
            <div
              className="fade-up feature-card group"
              onMouseMove={handleFeatureCardMove}
            >
              <span className="feature-card-index" aria-hidden="true">03</span>
              <div className="text-[10px] uppercase tracking-[0.2em] text-text-faint mb-4 font-medium">
                Writing
              </div>
              <h3
                className="text-[1.3rem] md:text-[1.5rem] font-medium leading-[1.2] text-text mb-3 group-hover:text-accent transition-colors"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                <a
                  href="/blog"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  Field notes from Claude AI deployment.
                </a>
              </h3>
              <p className="text-text-muted text-[14.5px] leading-[1.65] mb-6">
                Instruction engineering, Claude Skills, MCP connectors, and
                the mechanics of running AI in production.
              </p>
              <div className="flex-1" />
              <div className="relative z-10 pt-4 mt-auto border-t border-[rgba(20,20,19,0.08)] flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px] text-text-muted">
                <a
                  href="/blog/claude-best-invention-2026"
                  className="hover:text-accent transition-colors"
                >
                  Why Claude
                </a>
                <span className="text-text-faint">·</span>
                <a
                  href="/blog/erp-crm-claude-connectors-2026"
                  className="hover:text-accent transition-colors"
                >
                  ERP/CRM connectors
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder · Homepage Colophon ─────────────────
         Treated as the editorial "staff box" — a magazine signs its work
         under the masthead, this page does the same. The portrait gets
         the same archival plate treatment we use on the Claude visual
         and the service mindmap: corner brackets + micro-caption. The
         bio column mirrors the same hairline-flanked eyebrow / Fraunces
         italic title vocabulary we've used everywhere else on the page. */}
      <section id="founder" ref={founderRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          {/* Editorial header — matches the section vocabulary used across
             FAQ, Who we work with, What we deliver, etc. */}
          <div className="fade-up text-center mb-14 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Who builds this
              </p>
              <div className="w-8 h-px bg-[rgba(20,20,19,0.2)]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] tracking-[-0.02em] font-medium leading-[1.1]">
              One operator.{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Every agent.
              </span>
            </h2>
          </div>

          {/* Two-column: portrait plate | editorial bio */}
          <div className="fade-up grid md:grid-cols-[minmax(180px,210px)_1fr] gap-10 md:gap-16 items-start max-w-[920px] mx-auto">
            {/* ── Portrait plate ──
               Specimen-frame treatment: 4 corner brackets just outside
               the image, mono caption below, dossier tags under that.
               Hover: subtle grayscale→color shift + faint accent glow
               behind the plate — humanises the plate without breaking
               the archival metaphor. */}
            <div className="group relative mx-auto md:mx-0 w-[170px] md:w-[200px]">
              {/* Corner brackets */}
              <span aria-hidden className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-text/35 pointer-events-none" />
              <span aria-hidden className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-text/35 pointer-events-none" />
              <span aria-hidden className="absolute bottom-[68px] -left-2 w-4 h-4 border-b border-l border-text/35 pointer-events-none" />
              <span aria-hidden className="absolute bottom-[68px] -right-2 w-4 h-4 border-b border-r border-text/35 pointer-events-none" />

              {/* Soft accent glow on hover — implied "gallery light" */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(217,119,87,0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  transform: "scale(1.15)",
                }}
              />

              {/* Portrait — square, not circle. Editorial gravitas > avatar. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pranav-ambwani.jpg"
                alt="Pranav Ambwani, Founder of Settle"
                width={520}
                height={520}
                loading="lazy"
                className="relative z-10 w-full aspect-square object-cover rounded-[2px] border border-[rgba(20,20,19,0.15)] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.015]"
                style={{ filter: "grayscale(0.25) contrast(1.03)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(0) contrast(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(0.25) contrast(1.03)";
                }}
              />

              {/* Micro-caption under plate */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text/55">
                  Plate · The Operator
                </span>
              </div>
              <div className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text/40 whitespace-nowrap">
                File · 01 · Delhi
              </div>
            </div>

            {/* ── Editorial bio column ── */}
            <div className="relative">
              {/* Top kicker — role as a broadsheet-style label */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Founder · Settle AI
                </span>
              </div>

              {/* Name — Fraunces italic for masthead treatment */}
              <h3
                className="text-[clamp(2rem,3.6vw,2.8rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pranav{" "}
                <span className="italic">Ambwani.</span>
              </h3>

              {/* Bio */}
              <p className="text-text-muted text-[16px] md:text-[17px] leading-[1.7] mb-8 max-w-[560px]">
                Pranav holds a BS in Electrical Engineering from the
                University of Southern California and spent nine years in
                Los Angeles before returning home to Delhi. He founded
                Settle AI in 2025 to deploy Claude AI across mid-market
                businesses end-to-end.
              </p>

              {/* Dossier fact rail — 4 credentials at a glance.
                 Reads like the byline/dateline strip at the top of a
                 newspaper column: dense, scan-friendly, high trust. */}
              <div className="mb-8 pt-5 border-t border-[rgba(20,20,19,0.14)]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                  {[
                    { k: "Trained", v: "USC · BSEE" },
                    { k: "Built in", v: "Nine years · LA" },
                    { k: "Based", v: "Delhi, India" },
                    { k: "Operating", v: "Since 2025" },
                  ].map((f) => (
                    <div key={f.k}>
                      <div className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-text/45 mb-1.5">
                        {f.k}
                      </div>
                      <div className="text-[13px] md:text-[13.5px] font-medium text-text leading-tight">
                        {f.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signed byline — editorial credit style replaces the
                 generic "About Settle AI · LinkedIn" link row. Reads as
                 "this piece signed by" rather than a CTA rail. */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text/45">
                  Signed
                </span>
                <span className="w-3 h-px bg-text/20" />
                <a
                  href="/about"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-text hover:text-accent transition-colors"
                >
                  About Settle AI
                  <svg
                    className="w-[11px] h-[11px] transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/pranavambwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-text hover:text-accent transition-colors"
                >
                  LinkedIn
                  <svg
                    className="w-[11px] h-[11px] transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://medium.com/@pranavambwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-text hover:text-accent transition-colors"
                >
                  Medium
                  <svg
                    className="w-[11px] h-[11px] transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA · Closing Dispatch ───────────────────
         Editorial bookend to the Hero's "Dispatch Cover". Same vocab:
         corner brackets, top mono rail, bottom mono dateline, editorial
         split layout. The form lives inside an ivory RSVP-style intake
         card that sits on the accent field — the color tension makes
         the paper read as expensive. ParticleSettleMark is untouched. */}
      <section
        id="contact"
        ref={ctaRef}
        className="relative bg-accent overflow-hidden"
      >
        {/* Corner brackets — white-tinted to read on the accent field */}
        <div aria-hidden className="absolute top-4 left-4 md:top-6 md:left-6 w-5 h-5 md:w-7 md:h-7 border-t border-l border-white/35 pointer-events-none z-20" />
        <div aria-hidden className="absolute top-4 right-4 md:top-6 md:right-6 w-5 h-5 md:w-7 md:h-7 border-t border-r border-white/35 pointer-events-none z-20" />
        <div aria-hidden className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-5 h-5 md:w-7 md:h-7 border-b border-l border-white/35 pointer-events-none z-20" />
        <div aria-hidden className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-5 h-5 md:w-7 md:h-7 border-b border-r border-white/35 pointer-events-none z-20" />

        {/* Top mono dispatch rail — mirrors the Hero's masthead framing */}
        <div className="relative z-20 pt-8 md:pt-10 px-8 md:px-14">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-white/65">
            <span>Dispatch · 02 — Close</span>
            <span className="hidden md:inline tracking-[0.26em]">
              Correspondence
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex w-[6px] h-[6px]">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
                <span className="relative inline-block w-full h-full rounded-full bg-white" />
              </span>
              Availability · Q3 2026
            </span>
          </div>
          {/* Hairline under rail — completes the masthead frame */}
          <div className="max-w-[1440px] mx-auto mt-3 h-px bg-white/18" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-8 md:px-14 py-20 md:py-32">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 md:gap-16 items-center">
            {/* LEFT: editorial title + RSVP intake card.
               No fade-up here on purpose — the CTA sits at the bottom of
               the page, readers who reach it are committed, and the extra
               observation was unreliably firing in this section anyway. */}
            <div className="text-left">
              {/* Mobile-only particle mark — above the title so the animated
                 S reads as a masthead motif on narrow screens. */}
              <div className="md:hidden flex justify-center mb-6">
                <div className="w-[120px] h-[180px] opacity-[0.35]">
                  <ParticleSettleMark />
                </div>
              </div>

              {/* Eyebrow: hairline-flanked label matching the rest of the site */}
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-white/40" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                  The Close
                </p>
              </div>

              <h2
                className="text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] mb-5 text-white"
              >
                Ready to settle in with{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  AI?
                </span>
              </h2>
              <p className="text-white/75 text-[16px] md:text-[17px] leading-[1.65] mb-10 max-w-[460px]">
                We take on a small number of clients each quarter. Tell us
                about the project and we&apos;ll let you know if it&apos;s a
                fit.
              </p>

              {/* RSVP intake card — cream paper on accent field.
                 Inner micro-masthead mirrors the section's framing so the
                 card reads as a nested artifact (document within document). */}
              <div
                className="relative rounded-xl bg-bg border border-[rgba(20,20,19,0.1)] p-6 md:p-8 max-w-[520px]"
                style={{
                  boxShadow:
                    "0 30px 60px -30px rgba(20,20,19,0.35), 0 10px 20px -10px rgba(20,20,19,0.15)",
                }}
              >
                {/* Card corner tickmarks — tiny echoes of the section corners */}
                <span aria-hidden className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[rgba(20,20,19,0.2)]" />
                <span aria-hidden className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[rgba(20,20,19,0.2)]" />
                <span aria-hidden className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[rgba(20,20,19,0.2)]" />
                <span aria-hidden className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[rgba(20,20,19,0.2)]" />

                {/* Card masthead */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[rgba(20,20,19,0.1)]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-text/55">
                      Form · 01
                    </span>
                    <span className="w-4 h-px bg-text/15" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Intake
                    </span>
                  </div>
                  <span className="hidden sm:inline font-mono text-[10px] tracking-[0.22em] uppercase text-text/40">
                    Apr 2026
                  </span>
                </div>

                {submitted ? (
                  <div>
                    {/* Received state — editorial receipt */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="relative inline-flex w-[8px] h-[8px]">
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                        <span className="relative inline-block w-full h-full rounded-full bg-accent" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                        Received
                      </span>
                    </div>
                    <p
                      className="text-text text-[1.4rem] md:text-[1.6rem] leading-[1.15] font-normal mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Thanks — we&apos;ll be{" "}
                      <span className="italic">in touch.</span>
                    </p>
                    <p className="text-text-muted text-[13px] leading-relaxed">
                      Expect a reply within 24 hours. If it&apos;s urgent,
                      reply to the note we send with any context that
                      matters.
                    </p>
                  </div>
                ) : (
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
                  >
                    {/* Field · email — editorial underline treatment,
                       no box. The label sits above as a tiny eyebrow so
                       the input itself stays clean and ledger-like. */}
                    <label
                      htmlFor="cta-email"
                      className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-text/55 mb-2"
                    >
                      Your email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-0 border-b border-[rgba(20,20,19,0.2)] focus:border-accent focus:outline-none text-text placeholder-text/35 text-[16px] py-2 mb-6 transition-colors duration-200"
                    />

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2 bg-text text-bg font-medium text-[15px] px-6 py-3.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
                    >
                      Let&apos;s talk
                      <svg
                        className="w-[14px] h-[14px] transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Micro-caption — replaces the generic "48 hours" line.
                       Mentions Pranav by name: the form feels personally
                       attended rather than routed through a CRM. */}
                    <p className="mt-4 text-text-muted text-[12px] leading-[1.6] flex items-center gap-2">
                      <span className="w-2 h-px bg-text/25" />
                      Reply within 48 hours · usually signed by Pranav
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: particle mark — KEEP untouched.
               The animation morphs S → illustration → bot → S and is the
               signature motif of this page. Opacity / sizing unchanged. */}
            <div className="hidden md:flex justify-center items-center">
              <div className="w-[320px] h-[480px] lg:w-[380px] lg:h-[570px] opacity-[0.32]">
                <ParticleSettleMark />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom mono dateline — completes the masthead frame */}
        <div className="relative z-20 pb-8 md:pb-10 px-8 md:px-14">
          <div className="max-w-[1440px] mx-auto mb-3 h-px bg-white/15" />
          <div className="max-w-[1440px] mx-auto hidden sm:flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/55">
            <span>Folio · Delhi ↔ New York ↔ London</span>
            <span className="hidden md:inline">Issue 01 / Vol. I</span>
            <span>End of issue</span>
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
