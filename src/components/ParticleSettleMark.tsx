"use client";

import { useEffect, useRef, useState } from "react";

export function ParticleSettleMark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
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

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    let anim: { destroy: () => void } | null = null;
    let cancelled = false;

    import("lottie-web").then((mod) => {
      if (cancelled || !containerRef.current) return;
      anim = mod.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/settle-morph.json",
      });
    });

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [visible]);

  return <div ref={containerRef} className="w-full h-full" aria-hidden />;
}
