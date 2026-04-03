"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const COMPARE_LINKS = [
  { label: "Settle vs DIY", href: "/compare/diy" },
  { label: "Settle vs Big Consulting", href: "/compare/big-consulting" },
  { label: "Settle vs Freelancers", href: "/compare/freelance-consultants" },
  { label: "Settle vs ChatGPT", href: "/compare/chatgpt-generic-ai" },
  { label: "Settle vs Offshore Dev", href: "/compare/offshore-development" },
  { label: "Settle vs Internal IT", href: "/compare/internal-it-team" },
];

const INDUSTRY_LINKS = [
  { label: "Manufacturing", href: "/ai-consulting-for/manufacturing" },
  { label: "Healthcare", href: "/ai-consulting-for/healthcare" },
  { label: "Legal", href: "/ai-consulting-for/legal" },
  { label: "Finance", href: "/ai-consulting-for/finance-accounting" },
  { label: "Real Estate", href: "/ai-consulting-for/real-estate" },
  { label: "Professional Services", href: "/ai-consulting-for/professional-services" },
  { label: "Logistics", href: "/ai-consulting-for/logistics-supply-chain" },
  { label: "Education", href: "/ai-consulting-for/education" },
  { label: "Retail", href: "/ai-consulting-for/retail-ecommerce" },
  { label: "Construction", href: "/ai-consulting-for/construction" },
];

const BLOG_LINKS = [
  { label: "Orient Case Study", href: "/blog/orient-case-study" },
  { label: "Deploying Claude for Teams", href: "/blog/claude-team-deployment-beyond-diy" },
  { label: "MCP Explained for Business", href: "/blog/mcp-explained-for-business" },
  { label: "Integrating AI Into Your Company", href: "/blog/integrating-ai-into-your-company" },
  { label: "AI-Powered Outreach with Cowork", href: "/blog/ai-powered-outreach-with-cowork" },
  { label: "Built with Claude Code", href: "/blog/built-with-claude-code" },
  { label: "Claude's Agent Mode", href: "/blog/claude-agent-mode-business-automation" },
  { label: "Structuring Claude for Business", href: "/blog/structuring-claude-for-business" },
  { label: "Why Claude Over Custom AI", href: "/blog/why-claude-over-custom-ai" },
];

const TOOL_LINKS = [
  { label: "AI Readiness Assessment", href: "/tools/ai-readiness" },
  { label: "AI ROI Calculator", href: "/tools/ai-roi-calculator" },
  { label: "Use Case Finder", href: "/tools/use-case-finder" },
  { label: "Workflow Automation Quiz", href: "/tools/workflow-automation-quiz" },
  { label: "AI vs Manual Calculator", href: "/tools/ai-vs-manual-calculator" },
  { label: "Claude Project Planner", href: "/tools/claude-project-planner" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Get Started", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const VERBS = [
  "Accomplishing", "Actioning", "Actualizing", "Architecting", "Baking", "Beaming",
  "Beboppin'", "Befuddling", "Billowing", "Blanching", "Bloviating", "Boogieing",
  "Boondoggling", "Booping", "Bootstrapping", "Brewing", "Bunning", "Burrowing",
  "Calculating", "Canoodling", "Caramelizing", "Cascading", "Catapulting", "Cerebrating",
  "Channeling", "Choreographing", "Churning", "Clauding", "Coalescing",
  "Cogitating", "Combobulating", "Composing", "Computing", "Concocting", "Considering",
  "Contemplating", "Cooking", "Crafting", "Creating", "Crunching", "Crystallizing",
  "Cultivating", "Deciphering", "Deliberating", "Determining", "Dilly-dallying",
  "Discombobulating", "Doing", "Doodling", "Drizzling", "Ebbing", "Effecting",
  "Elucidating", "Embellishing", "Enchanting", "Envisioning", "Evaporating", "Fermenting",
  "Fiddle-faddling", "Finagling", "Flambeing", "Flibbertigibbeting", "Flowing",
  "Flummoxing", "Fluttering", "Forging", "Forming", "Frolicking", "Frosting",
  "Gallivanting", "Galloping", "Garnishing", "Generating", "Gesticulating", "Germinating",
  "Gitifying", "Grooving", "Gusting", "Harmonizing", "Hashing", "Hatching", "Herding",
  "Honking", "Hullaballooing", "Hyperspacing", "Ideating", "Imagining", "Improvising",
  "Incubating", "Inferring", "Infusing", "Ionizing", "Jitterbugging", "Julienning",
  "Kneading", "Leavening", "Levitating", "Lollygagging", "Manifesting", "Marinating",
  "Meandering", "Metamorphosing", "Misting", "Moonwalking", "Moseying", "Mulling",
  "Mustering", "Musing", "Nebulizing", "Nesting", "Newspapering", "Noodling",
  "Nucleating", "Orbiting", "Orchestrating", "Osmosing", "Perambulating", "Percolating",
  "Perusing", "Philosophising", "Photosynthesizing", "Pollinating", "Pondering",
  "Pontificating", "Pouncing", "Precipitating", "Prestidigitating", "Processing",
  "Proofing", "Propagating", "Puttering", "Puzzling", "Quantumizing", "Razzle-dazzling",
  "Razzmatazzing", "Recombobulating", "Reticulating", "Roosting", "Ruminating",
  "Sauteing", "Scampering", "Schlepping", "Scurrying", "Seasoning", "Shenaniganing",
  "Shimmying", "Simmering", "Skedaddling", "Sketching", "Slithering", "Smooshing",
  "Sock-hopping", "Spelunking", "Spinning", "Sprouting", "Stewing", "Sublimating",
  "Swirling", "Swooping", "Symbioting", "Synthesizing", "Tempering", "Thinking",
  "Thundering", "Tinkering", "Tomfoolering", "Topsy-turvying", "Transfiguring",
  "Transmuting", "Twisting", "Undulating", "Unfurling", "Unravelling", "Vibing",
  "Waddling", "Wandering", "Warping", "Whatchamacalliting", "Whirlpooling", "Whirring",
  "Whisking", "Wibbling", "Working", "Wrangling", "Zesting", "Zigzagging",
];

// Wave function shared between canvas and boat
function getWaveY(x: number, t: number): number {
  return (
    Math.sin(x * 0.008 + t * 0.6) * 18 +
    Math.sin(x * 0.015 + t * 1.1 + 2) * 8 +
    Math.sin(x * 0.003 + t * 0.3 + 5) * 12
  );
}

function getWaveTilt(x: number, t: number): number {
  // Approximate derivative of wave for tilt angle
  const dx = 2;
  const y1 = getWaveY(x - dx, t);
  const y2 = getWaveY(x + dx, t);
  return Math.atan2(y2 - y1, dx * 2) * (180 / Math.PI);
}

function WordOcean({ onFrame }: { onFrame: (t: number, h: number, waveTop: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 7;
    const lineHeight = 9;
    const wordGap = 4;
    ctx.font = `${fontSize}px monospace`;

    type WordEntry = { text: string; col: number; row: number; x: number; baseY: number; width: number };
    const words: WordEntry[] = [];
    const canvasW = canvas.width / dpr;
    const canvasH = canvas.height / dpr;
    const rows = Math.ceil(canvasH / lineHeight) + 4;
    const waveTopMargin = canvasH * 0.3;

    for (let row = 0; row < rows; row++) {
      let x = -(Math.random() * 80);
      let col = 0;
      while (x < canvasW + 100) {
        const text = VERBS[(row * 37 + col * 13) % VERBS.length];
        const w = ctx.measureText(text).width;
        words.push({ text, col, row, x, baseY: waveTopMargin + row * lineHeight, width: w });
        x += w + wordGap;
        col++;
      }
    }

    let animId: number;
    let t = 0;

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const waveOffset = getWaveY(word.x, t);
        const y = word.baseY + waveOffset;
        if (y > h + 10 || y < -10) continue;

        const fadeStart = h * 0.15;
        const fadeEnd = h * 0.55;
        let alpha: number;
        if (y > fadeEnd) alpha = 0.7;
        else if (y < fadeStart) alpha = 0.08;
        else alpha = 0.08 + 0.62 * ((y - fadeStart) / (fadeEnd - fadeStart));

        ctx.fillStyle = `rgba(20, 20, 19, ${alpha})`;
        ctx.fillText(word.text, word.x, y);
      }

      onFrame(t, h, waveTopMargin);
      t += 0.02;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, onFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

function BoatWithClaude() {
  const boatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boatX = useRef(0.35); // fraction of container width

  const handleFrame = useCallback((t: number, h: number, waveTopMargin: number) => {
    const boat = boatRef.current;
    const container = containerRef.current;
    if (!boat || !container) return;

    const containerW = container.clientWidth;
    const px = boatX.current * containerW;

    // Slow drift
    boatX.current += 0.00003;
    if (boatX.current > 0.85) boatX.current = 0.15;

    const waveY = getWaveY(px, t);
    const tilt = getWaveTilt(px, t);
    const y = waveTopMargin + waveY - 2; // sit right on the wave surface

    boat.style.transform = `translate(${px - 30}px, ${y - 28}px) rotate(${tilt * 0.7}deg)`;
  }, []);

  return (
    <div ref={containerRef} className="relative h-[180px] sm:h-[220px] overflow-hidden">
      <WordOcean onFrame={handleFrame} />
      {/* Boat + Claude tamagotchi */}
      <div
        ref={boatRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: 60, height: 56, willChange: "transform" }}
      >
        <svg width="60" height="56" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mast */}
          <line x1="587" y1="162" x2="412" y2="580" stroke="#54596E" strokeWidth="22" strokeLinecap="round"/>
          {/* Hull */}
          <path d="M700 570H37V430H788L700 570Z" fill="#C88654" stroke="#54596E" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Claude body */}
          <path fillRule="evenodd" clipRule="evenodd" d="M397.591 289.502H449V342.623H397.625V394.478H372.16V444.5H346.25V394.478H320.785V444.5H294.875V394.478H192.125V444.5H166.232V394.478H140.75V444.5H114.84V394.478H89.375V342.606H38V289.519H89.375V187.625H397.591V289.502ZM140.75 289.502H166.232V240.747H140.75V289.502ZM320.734 289.502H346.25V240.747H320.734V289.502Z" fill="#D97757"/>
        </svg>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3
        className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[0.875rem] text-text-muted hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-light">
      {/* Link columns */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Free Tools" links={TOOL_LINKS} />
          <FooterColumn title="Compare" links={COMPARE_LINKS} />
          <FooterColumn title="Industries" links={INDUSTRY_LINKS.slice(0, 5)} />
          <FooterColumn title="More Industries" links={INDUSTRY_LINKS.slice(5)} />
          <FooterColumn title="Blog" links={BLOG_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-light">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 min-h-16 py-4 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <span
            className="text-[0.95rem] font-medium tracking-[-0.03em] text-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SETTLE
          </span>
          <span className="text-text-faint text-sm">
            AI, thoughtfully deployed. Built on Claude by Anthropic.
          </span>
        </div>
      </div>

      {/* Word ocean with Claude boat */}
      <BoatWithClaude />
    </footer>
  );
}
