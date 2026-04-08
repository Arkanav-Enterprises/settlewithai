"use client";

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

interface BlogTOCProps {
  /**
   * Optional explicit headings list. If provided, auto-discovery is skipped.
   * Use this when mounting the TOC on a non-blog page (like the homepage)
   * where you want full control over labels and target IDs.
   */
  headings?: Heading[];
}

export function BlogTOC({ headings: providedHeadings }: BlogTOCProps = {}) {
  const [headings, setHeadings] = useState<Heading[]>(providedHeadings ?? []);
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Discover h2 headings and assign IDs (skipped when explicit headings provided)
  useEffect(() => {
    if (providedHeadings) return;
    const prose = document.querySelector("article .prose-settle");
    if (!prose) return;

    const found: Heading[] = [];
    prose.querySelectorAll("h2").forEach((node) => {
      if (!node.id) {
        node.id =
          node.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") ?? "";
      }
      found.push({ id: node.id, text: node.textContent ?? "" });
    });
    setHeadings(found);
  }, [providedHeadings]);

  // Track active heading via scroll listener
  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      if (isScrolling.current) return;

      let closestIdx = -1;
      let closestDist = Infinity;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - 80); // 80px nav offset
        if (rect.bottom > 0 && rect.top < window.innerHeight && dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      if (closestIdx >= 0) setActiveId(headings[closestIdx].id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial call
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  // Close mobile panel on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(e.target as Node))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  if (headings.length === 0) return null;

  // Scroll to heading — no React state updates, nothing to cancel the scroll
  function tocGoTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    isScrolling.current = true;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y });

    // Close mobile panel if open
    setMobileOpen(false);

    setTimeout(() => { isScrolling.current = false; }, 800);
  }

  return (
    <>
      {/* ── Desktop: CSS-only hover, no React state ── */}
      <div className="hidden xl:block group fixed right-0 top-1/2 -translate-y-1/2 z-[60]">
        {/* Pills — visible by default, hidden when wrapper is hovered */}
        <div className="flex flex-col gap-1.5 pr-3 pl-2 py-3 cursor-pointer group-hover:hidden">
          {headings.map((h) => (
            <div
              key={h.id}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                activeId === h.id
                  ? "w-5 bg-accent"
                  : "w-3 bg-text/15"
              }`}
            />
          ))}
        </div>

        {/* Panel — hidden by default, shown when wrapper is hovered */}
        <div className="hidden group-hover:block w-[280px] bg-bg/90 backdrop-blur-xl rounded-l-xl border border-r-0 border-border-light shadow-lg">
          <nav className="px-5 py-5 overflow-y-auto max-h-[60vh]">
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-text-faint mb-3 select-none">
              On this page
            </span>
            <ul className="space-y-0.5">
              {headings.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => tocGoTo(h.id)}
                    className={`
                      block w-full text-left py-1.5 text-[13px] leading-snug cursor-pointer transition-colors duration-200
                      ${activeId === h.id
                        ? "text-accent font-medium"
                        : "text-text-muted hover:text-text"
                      }
                    `}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Mobile: morphing FAB → bottom sheet ──
         One container morphs (width, height, border-radius) from a 48px
         circle into a rounded rectangle. Two layered inset-0 children cross-
         fade: the hamburger icon (when closed) and the TOC list (when open).
         Direction-dependent transitionDelay keeps the icon and list from
         appearing while the container is still the "wrong" shape. */}
      <div ref={tocRef} className="xl:hidden">
        {/* Backdrop — captures outside taps, dims the page */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-[65] bg-black/30 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />

        {/* Morphing container */}
        <div
          className="fixed right-4 bottom-6 z-[70] bg-[#141413] shadow-2xl overflow-hidden"
          style={{
            width: mobileOpen ? "min(calc(100vw - 2rem), 20rem)" : "3rem",
            height: mobileOpen
              ? `min(${headings.length * 36 + 76}px, 70vh)`
              : "3rem",
            borderRadius: mobileOpen ? "1.25rem" : "9999px",
            transition:
              "width 450ms cubic-bezier(0.16,1,0.3,1), height 450ms cubic-bezier(0.16,1,0.3,1), border-radius 450ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Closed-state hamburger icon */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open table of contents"
            className="absolute inset-0 flex items-center justify-center text-bg"
            style={{
              opacity: mobileOpen ? 0 : 1,
              pointerEvents: mobileOpen ? "none" : "auto",
              transition: "opacity 180ms ease",
              transitionDelay: mobileOpen ? "0ms" : "260ms",
            }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d="M0 1h18M0 7h12M0 13h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Open-state list panel */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
              transition: "opacity 220ms ease",
              transitionDelay: mobileOpen ? "230ms" : "0ms",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">
                On this page
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/50 hover:text-white p-1 -mr-1"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="px-5 pb-4 pt-1 overflow-y-auto flex-1">
              <ul className="space-y-0.5">
                {headings.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => tocGoTo(h.id)}
                      className={`block w-full text-left py-1.5 text-[13px] leading-snug cursor-pointer transition-colors duration-200 ${
                        activeId === h.id
                          ? "text-accent font-medium"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
