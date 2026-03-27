"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/* Easing: cubic ease-out */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const landRef = useRef<ReturnType<typeof feature> | null>(null);
  const startTimeRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    startTimeRef.current = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const graticule = geoGraticule().step([10, 10])();

    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!mounted) return;
        const geom = topo.objects.countries as GeometryCollection;
        landRef.current = feature(topo, geom);
        draw();
      });

    function draw() {
      if (!ctx || !canvas || !mounted) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;

      /* ── Intro animation: zoom from 0.82 → 1.0 over 2.5s ── */
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const introDuration = 2.5;
      const introProgress = Math.min(elapsed / introDuration, 1);
      const introScale = 0.82 + 0.18 * easeOut(introProgress);

      /* ── Scroll-linked zoom: slight scale-up as user scrolls ── */
      const scrollZoom = 1 + Math.min(scrollYRef.current / 4000, 0.08);

      const baseRadius = h * 0.48;
      const radius = baseRadius * introScale * scrollZoom;

      /* ── Rotation: faster during intro, then settles ── */
      const introRotationBoost = introProgress < 1 ? (1 - introProgress) * 0.15 : 0;
      rotationRef.current += 0.03 + introRotationBoost;

      /* ── Tilt: start at -35° and ease to -20° ── */
      const tilt = -35 + 15 * easeOut(introProgress);

      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([rotationRef.current, tilt, 0])
        .clipAngle(90);

      const path = geoPath(projection, ctx);

      ctx.clearRect(0, 0, w, h);

      /* ── Globe disk ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#e8e6dc";
      ctx.fill();

      /* ── Graticule ── */
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.063)";
      ctx.lineWidth = 0.35;
      ctx.stroke();

      if (landRef.current) {
        /* ── Land fill ── */
        ctx.beginPath();
        path(landRef.current as Parameters<typeof path>[0]);
        ctx.fillStyle = "rgba(20, 20, 19, 0.035)";
        ctx.fill();

        /* ── Country outlines ── */
        ctx.beginPath();
        path(landRef.current as Parameters<typeof path>[0]);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.32)";
        ctx.lineWidth = 0.55;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      /* ── Inner rim ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.55)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      /* ── Outer rim ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.35)";
      ctx.lineWidth = 0.4;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
