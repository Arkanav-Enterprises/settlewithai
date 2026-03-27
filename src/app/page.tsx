"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./globe"), { ssr: false });

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
  const audienceRef = useFadeIn();
  const ctaRef = useFadeIn();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <SettleMark className="h-7 w-auto" />
            <span
              className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
              style={{ fontFamily: "Sentient, Georgia, serif" }}
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
              className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-full hover:bg-[#30302e] transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero + Globe ─────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Globe background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[min(90vw,900px)] h-[min(90vw,900px)] mt-16">
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
            We settle AI into your team&apos;s actual workflows &mdash;
            structured rollouts, production-grade instructions, and real
            results.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center text-[15px] font-medium bg-text text-bg px-6 py-3 rounded-full hover:bg-[#30302e] transition-colors duration-200"
            >
              Start a conversation
              <Arrow />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center text-[15px] font-medium border border-border text-text px-6 py-3 rounded-full hover:border-text-muted transition-colors duration-200"
            >
              See how it works
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section ref={statsRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 items-start stagger">
            {[
              { value: "85%", label: "Faster document generation" },
              { value: "11", label: "Projects deployed per engagement" },
              { value: "49", label: "Use cases mapped per company" },
              { value: "4hrs → 30min", label: "Typical task time reduction" },
            ].map((s) => (
              <div key={s.label} className="fade-up text-center">
                <div
                  className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-none mb-3 text-white md:whitespace-nowrap"
                  style={{
                    fontFamily: "Sentient, Georgia, serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-white/80 text-xs uppercase tracking-[0.12em] leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────── */}
      <section ref={problemRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div className="max-w-2xl mb-16">
            <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-5">
              Most AI adoption stalls at the demo.
            </h2>
            <p className="fade-up text-text-muted text-[17px] leading-relaxed">
              The gap isn&apos;t tools &mdash; it&apos;s deployment. Here&apos;s
              what we do differently.
            </p>
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
                      fontFamily: "Sentient, Georgia, serif",
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

      {/* ── Process ──────────────────────────────────── */}
      <section id="process" ref={processRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-20 max-w-2xl text-white">
            From zero to settled in four phases.
          </h2>

          <div className="relative">
            {/* ── Curvy dotted path ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 80,60 C 80,140 920,100 920,250 S 80,340 80,500 S 920,600 920,750 S 80,850 80,940"
                stroke="#e8e6dc"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
              {/* Dots at each phase */}
              <circle cx="80" cy="60" r="5" fill="#e8e6dc" opacity="0.5" />
              <circle cx="920" cy="250" r="5" fill="#e8e6dc" opacity="0.5" />
              <circle cx="80" cy="500" r="5" fill="#e8e6dc" opacity="0.5" />
              <circle cx="920" cy="750" r="5" fill="#e8e6dc" opacity="0.5" />
            </svg>

            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume.",
                detail:
                  "You get a prioritised use-case matrix, not a pitch deck.",
                align: "left" as const,
              },
              {
                num: "02",
                title: "Architecture",
                desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard.",
                detail:
                  "Live project tracking. Tier-based phasing. Gap analysis built in.",
                align: "right" as const,
              },
              {
                num: "03",
                title: "Instruction Engineering",
                desc: "We write production-grade project instructions for every use case. Not prompts \u2014 structured workflows with review gates, rules, and knowledge files.",
                detail:
                  "Your team uses the tool. They don\u2019t need to understand the tool.",
                align: "left" as const,
              },
              {
                num: "04",
                title: "Deploy & Settle",
                desc: "We deploy, train your team, and iterate. Quick wins ship in weeks. Deeper integrations follow in phases.",
                detail: "A roadmap you can actually execute.",
                align: "right" as const,
              },
            ].map((p) => (
              <div
                key={p.num}
                className={`fade-up relative py-14 md:py-20 ${
                  p.align === "right" ? "md:flex md:justify-end" : ""
                }`}
              >
                <div className="max-w-md">
                  <span
                    className="text-white/70 text-[15px] font-medium block mb-4"
                    style={{ fontFamily: "Sentient, Georgia, serif" }}
                  >
                    {p.num}
                  </span>
                  <h3 className="text-white text-[clamp(1.5rem,2.5vw,2rem)] font-medium mb-4">
                    {p.title}
                  </h3>
                  <p className="text-white/85 leading-[1.75] mb-3">
                    {p.desc}
                  </p>
                  <p className="text-white/60 text-sm">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section id="services" ref={servicesRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-20">
            What we deliver.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                title: "AI Readiness Assessment",
                items: [
                  "Department-by-department workflow audit",
                  "Use case discovery and prioritisation",
                  "Tier-based rollout map and blocker analysis",
                ],
              },
              {
                title: "Deployment Dashboard",
                items: [
                  "Interactive rollout visualisation",
                  "Project-level tracking",
                  "Skill mapping and architecture recommendations",
                  "Kanban board for execution",
                ],
              },
              {
                title: "Instruction Engineering",
                items: [
                  "Production-grade Claude instructions",
                  "Per-project knowledge file specifications",
                  "Review gates and safety rules",
                  "Output format and formatting standards",
                ],
              },
              {
                title: "Setup & Training",
                items: [
                  "Project creation and configuration",
                  "Knowledge file preparation",
                  "Team training and onboarding",
                  "Ongoing iteration and support",
                ],
              },
            ].map((s) => (
              <div key={s.title} className="fade-up bg-bg p-8 md:p-10">
                <h3 className="text-lg font-medium mb-5">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-text-muted leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────── */}
      <section ref={audienceRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-20 max-w-2xl">
            Built for teams who&apos;d rather ship than strategise.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                title: "Startups",
                desc: "Small team, no time to waste. We deploy AI across your workflows so five people operate like fifty.",
              },
              {
                title: "SMBs & Manufacturers",
                desc: "Departments, processes, documents. We map the complexity, structure the rollout, and deploy without disruption.",
              },
              {
                title: "Solo Operators",
                desc: "You\u2019re one person doing everything. We build your AI operating system so you can focus on the work that matters.",
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

      {/* ── CTA ──────────────────────────────────────── */}
      <section id="contact" ref={ctaRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <div className="max-w-xl mx-auto text-center">
            <div className="fade-up mb-10">
              <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-2xl bg-[rgba(0,0,0,0.12)] flex items-center justify-center">
                <SettleMark className="h-16 md:h-20 w-auto" stroke="white" />
              </div>
            </div>
            <h2 className="fade-up text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.1] mb-5 text-white">
              Ready to settle in?
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
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="bg-white text-accent font-medium px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-200 whitespace-nowrap text-[15px]"
                  >
                    Let&apos;s talk
                  </button>
                </form>
                <p className="fade-up text-white/40 text-sm mt-5">
                  We&apos;ll respond within 24 hours.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="bg-bg-dark text-[#e8e6dc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <SettleMark className="h-6 w-auto" stroke="#e8e6dc" />
            <span
              className="text-[1rem] font-medium tracking-[-0.03em]"
              style={{ fontFamily: "Sentient, Georgia, serif" }}
            >
              SETTLE
            </span>
          </span>
          <span className="text-[rgba(232,230,220,0.4)] text-sm">
            AI, thoughtfully deployed.
          </span>
        </div>
      </footer>
    </main>
  );
}
