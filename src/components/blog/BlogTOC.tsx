"use client";

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function BlogTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Discover headings and assign IDs
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const prose = article.querySelector(".prose-settle");
    if (!prose) return;
    const nodes = prose.querySelectorAll("h2");
    const found: Heading[] = [];

    nodes.forEach((node) => {
      if (!node.id) {
        node.id = node.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ?? "";
      }
      found.push({
        id: node.id,
        text: node.textContent ?? "",
        level: node.tagName === "H3" ? 3 : 2,
      });
    });

    setHeadings(found);
  }, []);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 1,
    });

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (headings.length === 0) return null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    setOpen(false);
  };

  const tocLinks = (
    <ul className="space-y-0.5">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(h.id); }}
            className={`
              block py-1.5 text-[13px] leading-snug transition-colors duration-200
              ${h.level === 3 ? "pl-4" : ""}
            `}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: pill indicators + hover panel */}
      <div
        className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-[60] items-center"
        onMouseLeave={() => setOpen(false)}
      >
        {/* Pills */}
        <div
          className={`flex flex-col gap-1.5 pr-3 pl-2 py-3 group cursor-pointer transition-opacity duration-200 ${open ? "opacity-0 pointer-events-none" : ""}`}
          onMouseEnter={() => setOpen(true)}
        >
          {headings.map((h) => (
            <div
              key={h.id}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                activeId === h.id
                  ? "w-5 bg-accent"
                  : "w-3 bg-text/15 group-hover:bg-text/30"
              }`}
            />
          ))}
        </div>

        {/* Desktop panel */}
        <div
          className={`
            absolute right-0
            w-[280px]
            bg-bg/90 backdrop-blur-xl
            rounded-l-xl border border-r-0 border-border-light
            shadow-lg
            transition-all duration-300 ease-out
            ${open
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
            }
          `}
        >
          <nav className="px-5 py-5 overflow-y-auto max-h-[60vh]">
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-text-faint mb-3 select-none">
              On this page
            </span>
            <ul className="space-y-0.5">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(h.id); }}
                    className={`
                      block py-1.5 text-[13px] leading-snug transition-colors duration-200
                      ${activeId === h.id
                        ? "text-accent font-medium"
                        : "text-text-muted hover:text-text"
                      }
                    `}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile: FAB + slide-over panel */}
      <div ref={tocRef} className="xl:hidden">
        {/* Toggle button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`fixed right-4 bottom-6 z-[70] w-10 h-10 rounded-full bg-text text-bg flex items-center justify-center shadow-lg transition-opacity duration-200 ${open ? "opacity-0 pointer-events-none" : ""}`}
          aria-label="Table of contents"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M0 1h18M0 7h12M0 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Panel */}
        <div
          className={`
            fixed right-0 top-0 z-[70]
            h-full
            w-[280px] max-w-[80vw]
            bg-[#141413] backdrop-blur-xl
            border-l border-white/10
            shadow-2xl
            transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/50">
              On this page
            </span>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white p-1" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="px-5 py-4 overflow-y-auto max-h-[80vh]">
            <ul className="space-y-0.5">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(h.id); }}
                    className={`
                      block py-1.5 text-[13px] leading-snug transition-colors duration-200
                      ${activeId === h.id
                        ? "text-accent font-medium"
                        : "text-white/60 hover:text-white"
                      }
                    `}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
