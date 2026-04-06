"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";
import { Footer } from "@/components/layout/Footer";

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
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
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
      Claude
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
            <h3>Claude</h3>
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

/* ─── Animated logo mark (CTA illustration) ───────────── */

function AnimatedSettleMark() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
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
      style={visible ? { animation: "float-gentle 4s ease-in-out 3.5s infinite" } : undefined}
    >
      {/* Main calligraphic stroke */}
      <path
        d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576"
        stroke="white"
        strokeWidth="8.04054"
        strokeLinecap="round"
        strokeDasharray={mainLen}
        strokeDashoffset={visible ? undefined : mainLen}
        style={visible ? {
          animation: `draw-on 2s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
          strokeDashoffset: mainLen,
        } : { strokeDashoffset: mainLen }}
      />
      {/* Top flick */}
      <path
        d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021"
        stroke="white"
        strokeWidth="5.74324"
        strokeLinecap="round"
        strokeDasharray={flick1Len}
        style={visible ? {
          animation: `draw-on 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards`,
          strokeDashoffset: flick1Len,
        } : { strokeDashoffset: flick1Len }}
      />
      {/* Bottom flick */}
      <path
        d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237"
        stroke="white"
        strokeWidth="5.74324"
        strokeLinecap="round"
        strokeDasharray={flick2Len}
        style={visible ? {
          animation: `draw-on 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards`,
          strokeDashoffset: flick2Len,
        } : { strokeDashoffset: flick2Len }}
      />
      {/* Accent dots — pop in after strokes */}
      <circle cx="106.507" cy="248.486" r="11.4865" fill="white" opacity="0"
        style={visible ? { animation: "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards", transformOrigin: "106.507px 248.486px" } : undefined} />
      <circle cx="187.507" cy="11.4865" r="11.4865" fill="white" opacity="0"
        style={visible ? { animation: "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.5s forwards", transformOrigin: "187.507px 11.4865px" } : undefined} />
      <circle cx="94.5065" cy="98.4865" r="11.4865" fill="white" opacity="0"
        style={visible ? { animation: "dot-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.8s forwards", transformOrigin: "94.5065px 98.4865px" } : undefined} />
    </svg>
  );
}

/* ─── Logo mark ─────────────────────────────────────────── */

function SettleMark({ className = "h-6 w-auto", stroke = "#141413" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 199 298" fill="none" className={className}>
      <path d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576" stroke={stroke} strokeWidth="8.04054" strokeLinecap="round"/>
      <path d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021" stroke={stroke} strokeWidth="5.74324" strokeLinecap="round"/>
      <path d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237" stroke={stroke} strokeWidth="5.74324" strokeLinecap="round"/>
      <circle cx="106.507" cy="248.486" r="11.4865" fill="#D97757"/>
      <circle cx="187.507" cy="11.4865" r="11.4865" fill="#D97757"/>
      <circle cx="94.5065" cy="98.4865" r="11.4865" fill="#D97757"/>
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Home() {
  const statsRef = useFadeIn();
  const problemRef = useFadeIn();
  const processRef = useFadeIn();
  const servicesRef = useFadeIn();
  const caseRef = useFadeIn();
  const quotesRef = useFadeIn();
  const audienceRef = useFadeIn();
  const faqRef = useFadeIn();
  const ctaRef = useFadeIn();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Hide Discovery Call button when CTA section is in view
  const ctaObserverRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    ctaObserverRef.current = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    ctaObserverRef.current.observe(el);
    return () => ctaObserverRef.current?.disconnect();
  }, []);

  const calLoaded = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
      // Lazy-load Cal.com SDK when user scrolls past 60% of viewport
      if (!calLoaded.current && window.scrollY > window.innerHeight * 0.6) {
        calLoaded.current = true;
        getCalApi({ namespace: "15min" }).then((cal) => {
          cal("ui", { hideEventTypeDetails: false, layout: "month_view", cssVarsPerTheme: { light: { "cal-brand": "#141413" }, dark: { "cal-brand": "#141413" } } });
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80 transition-transform duration-300 ${scrolled ? "translate-y-0" : "-translate-y-full"}`}>
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

      {/* ── Hero + Globe ─────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Globe background — on mobile, push to bottom edge */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center">
          <div className="w-[min(110vw,900px)] h-[min(110vw,900px)] translate-y-[30%] md:translate-y-0 md:mt-16">
            <Globe className="w-full h-full" />
          </div>
        </div>

        {/* Hero text */}
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-36 md:pt-44">
          <h1
            className="text-[clamp(2.8rem,5.5vw,5rem)] font-medium leading-[1.08] mb-8 max-w-[560px]"
          >
            AI, <span className="text-accent">thoughtfully</span> deployed.
          </h1>
          <p className="text-text-muted text-[clamp(1rem,1.5vw,1.2rem)] max-w-[420px] leading-[1.7] mb-10">
            We settle{" "}
            <ClaudeTooltip />{" "}
            into your team&apos;s actual workflows &mdash;
            structured rollouts, production-grade instructions, and real
            results.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center text-[15px] font-medium bg-text text-bg px-6 py-3 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
            >
              Start a conversation
              <Arrow />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center text-[15px] font-medium text-text px-6 py-3 rounded-lg hover:border-[rgba(20,20,19,0.2)] transition-all duration-200"
              style={{
                background: "rgba(0,0,0,0.04)",
                backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.1), inset -1px -1px 1px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              See how it works
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section ref={statsRef} className="bg-[#ddd9cc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 md:py-12">
          <p className="text-xs text-text-faint uppercase tracking-[0.12em] text-center mb-6">
            From our first engagement &mdash; Orient Printing &amp; Packaging
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 items-start stagger">
            {[
              { value: "85%", label: "Faster document generation" },
              { value: "11", label: "Projects deployed" },
              { value: "49", label: "Use cases mapped" },
              { value: "4hrs → 30min", label: "Task time reduction" },
            ].map((s) => (
              <div key={s.label} className="fade-up text-center">
                <div
                  className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-none mb-2 text-text md:whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-text-muted text-[11px] uppercase tracking-[0.12em] leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────── */}
      <section ref={problemRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36 relative">
          <div className="flex items-start justify-between mb-16">
            <div className="max-w-[70%] sm:max-w-2xl">
              <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-5">
                Most AI adoption stalls at the demo.
              </h2>
              <p className="fade-up text-text-muted text-[17px] leading-relaxed">
                The gap isn&apos;t tools &mdash; it&apos;s deployment.
                Here&apos;s how we deploy Claude differently.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/settle-char-1.svg" alt="" width={1000} height={1000} loading="lazy" className="w-[100px] md:w-[160px] lg:w-[220px] shrink-0 ml-4 md:ml-8 lg:ml-12 -mt-4" />
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

      {/* ── Claude Mind Map ──────────────────────────── */}
      <section>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 md:py-24 text-center">
          <h2
            className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] mb-4 text-text-muted"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            Claude in action.
          </h2>
          <p className="text-text-muted text-[15px] mb-6">
            <a href="/blog/why-claude-over-custom-ai" className="text-accent hover:underline">Why Claude?</a>
          </p>
          <CoworkDemo className="mx-auto w-full max-w-[900px] text-left" />
        </div>
      </section>

      {/* ── Case Study: Orient ────────────────────────── */}
      <section ref={caseRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div
            className="fade-up rounded-xl p-8 md:p-12 lg:p-16"
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
            {/* header */}
            <div className="flex items-center gap-5 mb-10">
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

            {/* stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              {[
                { v: "49", l: "Use cases mapped" },
                { v: "11", l: "Projects deployed" },
                { v: "85%", l: "Time saved on docs" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-accent text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium leading-none mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.v}
                  </div>
                  <div className="text-text-faint text-xs uppercase tracking-[0.12em]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
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

      {/* ── Process ──────────────────────────────────── */}
      <section id="process" ref={processRef} className="bg-[#ddd9cc] relative overflow-hidden">
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
            {/* ── Pulsating curvy path ── */}
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
                className={`fade-up relative py-10 md:py-14 ${
                  p.align === "right" ? "md:flex md:justify-end" : ""
                }`}
              >
                <div className="max-w-md">
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
            <div className="lg:w-[30%] lg:shrink-0 rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#DED9CC" }}>
              {[
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                  title: "AI Readiness Assessment",
                  category: "AI Readiness",
                  desc: "We audit every department\u2019s workflows, discover use cases, and build a tier-based rollout map with blocker analysis.",
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
                  title: "Deployment Dashboard",
                  category: "Deployment Dashboard",
                  desc: "Interactive rollout visualisation with project-level tracking, skill mapping, and a kanban board for execution.",
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
                  title: "Instruction Engineering",
                  category: "Instruction Engineering",
                  desc: "Production-grade Claude instructions with knowledge file specs, review gates, safety rules, and output standards.",
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
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
                    <p className="text-text-muted text-[13px] leading-[1.65]">{s.desc}</p>
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
            <img src="/settle-char-3.svg" alt="" width={1000} height={1000} loading="lazy" className="w-[70px] md:w-[100px] lg:w-[140px] shrink-0 ml-4 md:ml-8 lg:ml-12 -mt-4" />
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
              <details key={i} className="fade-up group" style={{ animationDelay: `${i * 40}ms` }}>
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
                    We&apos;ll respond within 24 hours. Or{" "}
                    <button
                      type="button"
                      data-cal-namespace="15min"
                      data-cal-link="settle-ai/15min"
                      data-cal-config='{"layout":"month_view"}'
                      className="text-white/70 underline hover:text-white transition-colors"
                    >
                      book a 15-min call
                    </button>
                    .
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

      {/* ── Floating Discovery Call button ──────────────── */}
      <button
        data-cal-namespace="15min"
        data-cal-link="settle-ai/15min"
        data-cal-config='{"layout":"month_view"}'
        className={`fixed bottom-6 right-6 z-40 text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-all duration-300 shadow-lg flex items-center gap-2 ${scrolled && !ctaVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <svg viewBox="0 0 664 756" fill="none" className="w-4 h-4">
          <path d="M351.788 43.513C362.966 52.637 378.554 63.986 387.978 74.552C391.229 78.202 394.016 83.445 397.036 87.335C399.218 90.148 402.861 93.022 404.731 95.657C407.279 99.235 411.982 107.879 414.431 112.16C421.2 123.981 424.104 139.327 427.373 152.59C431.256 168.364 433.216 180.096 432.004 196.715C430.49 217.526 427.453 238.266 424.478 258.962C423.784 263.769 424.104 269.973 423.169 274.718C422.064 280.317 420.283 287.482 418.956 293.224C416.782 302.606 413.638 306.62 409.265 314.596C407.297 318.183 406.343 322.883 403.333 326.132C391.469 338.924 381.52 355.596 367.01 366.037C365.951 366.793 360.179 369.669 360.829 370.728C361.836 370.897 363.118 372.295 363.715 373.051C369.584 380.475 375.766 387.738 381.449 395.02C382.33 396.141 385.011 401.669 385.385 401.758C386.606 402.043 390.854 397.183 392.066 396.15C397.187 391.824 401.57 387.249 406.905 383.074C411.795 379.247 416.132 375.508 420.986 371.449C428.949 364.809 434.641 363.634 443.931 368.832C454.236 374.591 463.214 386.092 470.215 395.314C470.75 396.026 472.531 396.56 472.986 397.281C475.257 400.895 475.622 401.171 478.116 404.402C483.914 411.906 486.105 417.816 490.737 425.516C494.068 431.053 499.199 437.016 503.037 442.313C527.923 476.61 554.297 509.741 580.234 542.765C597.469 564.707 614.303 586.622 631.494 608.466C639.287 618.365 647.9 629.972 656.7 638.588C657.386 639.265 658.829 639.47 658.891 639.577C659.052 639.835 658.339 640.903 658.5 641.624C658.767 642.835 660.032 644.063 660.255 645.238C660.397 645.986 659.746 646.867 659.916 647.481C660.085 648.095 661.697 648.692 662.303 649.484C663.897 651.567 664.672 658.75 663.265 661.011C658.188 669.165 652.568 671.194 645.335 676.704C629 689.166 612.335 701.459 598.208 715.968C589.079 725.342 577.758 734.261 567.933 742.717C560.585 749.046 553.941 755.749 543.573 755.998C537.463 756.14 532.208 747.355 529.01 742.913C501.915 705.233 476.931 667.473 447.209 631.076C439.389 621.498 429.751 608.431 421.316 599.939C410.663 589.213 400.803 578.967 390.765 567.698C390.204 567.075 388.138 563.585 387.924 563.443C387.799 563.363 387.06 563.906 387.033 563.861C386.926 563.719 387.131 562.598 386.757 561.948C385.296 559.358 382.117 556.019 380.246 553.411C366.69 534.522 352.314 515.491 339.23 496.398C336.059 491.778 332.309 487.185 329.352 482.503C327.08 478.907 325.29 473.939 323.144 470.851C322.404 469.783 320.934 469.382 320.115 467.958C318.538 465.234 318.361 458.398 320.507 455.887C321.184 455.095 322.36 454.998 322.912 454.41C330.634 446.248 337.884 437.542 346.649 430.474C350.176 427.635 354.719 426.326 358.371 423.362C358.843 422.979 362.646 419.258 362.735 418.964C363.278 417.175 355.244 410.312 353.846 408.505C349.677 403.102 345.162 395.296 342.053 389.261C338.508 382.38 339.247 385.647 333.52 387.774C304.35 406.147 274.396 421.484 239.196 424.581C225.942 425.747 212.581 426.744 199.399 427.065C176.606 427.626 161.767 425.747 139.919 419.516C111.398 411.381 94.7059 401.242 75.8409 378.401C70.7469 372.232 61.5459 370.861 54.7859 366.313C41.7989 357.572 25.0989 327.708 17.8839 313.43C9.85892 297.559 3.1789 277.495 1.8429 259.879C0.2569 239.059 -1.50609 208.554 2.18091 187.724C7.86391 155.626 13.4569 132.046 31.1819 104.247C47.4729 78.709 69.8469 60.203 91.6249 39.846C102.91 29.298 118.31 23.583 132.098 17.218C148.13 9.81203 160.921 6.78603 178.459 4.35603C180.062 4.13303 183.865 3.11003 185.317 3.14503C186.555 3.18103 189.45 5.42403 191.579 5.34403C193.191 5.29003 196.112 3.46602 197.956 2.97602C206.738 0.626023 224.374 0.39503 233.86 0.00303047C235.579 -0.0679695 237.004 1.13303 238.705 1.04403C239.97 0.982031 240.808 0.0740233 242.09 0.0300233C243.827 -0.0329767 250.418 1.40002 253.197 1.68502C276.542 4.06202 298.516 10.453 319.874 20.334C332.567 26.2 341.189 34.879 351.77 43.522L351.788 43.513ZM331.391 46.913C302.8 24.74 254.72 19.577 219.324 18.455C195.133 17.69 175.644 20.44 153.011 28.879C139.642 33.864 124.786 37.576 111.844 43.05C92.4799 51.24 80.3839 67.155 68.0659 83.24C51.0179 105.511 40.0089 127.934 28.3669 153.223C20.5379 170.242 16.7169 190.475 16.1029 209.382C14.7579 251.058 35.9119 307.101 63.0069 338.683C64.8769 340.864 67.9769 342.956 69.7489 345.039C72.0119 347.691 76.8129 355.693 78.7629 357.376C82.6379 360.732 92.4619 364.729 97.3249 367.826C100.291 369.713 103.213 372.562 106.268 374.547C121.187 384.249 139.999 392.323 156.904 398.171C179.786 406.084 205.848 407.642 230.003 407.615C265.809 407.571 276.284 391.406 304.35 377.155C322.458 367.96 340.316 355.693 355.414 341.816C362.913 334.927 367.189 326.363 372.542 318.156C376.211 312.539 382.232 307.662 385.457 301.974C389.616 294.639 395.914 276.471 398.906 267.863C401.899 259.256 406.263 245.192 407.403 236.086C409.47 219.6 405.114 204.049 404.794 187.973C404.642 180.22 401.356 172.414 400.242 165.141C399.859 162.667 400.607 157.228 400.037 154.682C399.725 153.294 398.203 152.466 397.561 150.846C396.742 148.79 397.481 147.437 397.125 145.986C392.146 125.708 385.376 112.499 373.922 95.381C361.533 76.866 349.161 60.71 331.383 46.913H331.391ZM437.705 393.373C437.411 393.026 437.313 391.637 436.805 391.62C435.229 391.548 436.698 394.868 436.565 395.002C436.458 395.1 434.676 395.331 433.786 395.874C426.918 400.111 419.998 404.295 413.104 408.684C404.821 413.953 396.626 419.65 388.369 425.107C381.217 429.825 376.995 436.83 370.618 441.565C365.621 445.277 359.636 448.099 354.541 452.087C349.446 456.075 345.429 460.872 340.432 464.655L339.906 466.08C342.035 467.041 343.024 469.017 344.44 470.566C353.454 480.384 358.255 489.143 365.933 499.789C369.166 504.267 374.118 508.584 377.521 512.955C387.22 525.425 395.085 539.596 405.016 551.835C415.081 564.235 427.738 576.653 438.026 587.833C461.121 612.917 483.024 639.568 503.314 666.726C515.32 682.793 525.652 701.566 539.93 715.515C541.088 716.645 545.515 721.024 546.468 721.594C547.154 722.003 547.474 722.226 548.329 721.986C549.648 721.612 557.325 714.571 559.392 713.12C560.817 712.123 563.062 711.616 564.576 710.583C584.278 697.115 603.268 682.784 622.631 668.844C627.396 665.417 632.83 662.658 637.542 658.75C638.334 658.092 641.559 654.771 641.363 653.97C641.238 653.463 636.339 649.546 635.573 648.558C634.647 647.356 633.427 643.894 632.402 642.514C624.012 631.218 615.31 619.504 606.456 608.618C576.128 571.312 547.367 530.748 516.959 492.722C499.323 470.655 479.897 449.22 462.92 426.878C454.352 415.609 446.701 403.983 437.687 393.391L437.705 393.373Z" fill="currentColor"/>
        </svg>
        Discovery Call
      </button>

      {/* ── Footer ───────────────────────────────────── */}
      <Footer />
    </main>
  );
}
