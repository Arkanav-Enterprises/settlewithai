"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const landRef = useRef<ReturnType<typeof feature> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    /* 10° grid — matches Anthropic's density */
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
      /* Globe fills 80% of height, matching Anthropic's proportions */
      const radius = h * 0.48;
      const cx = w / 2;
      const cy = h / 2;

      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([rotationRef.current, -20, 0])
        .clipAngle(90);

      const path = geoPath(projection, ctx);

      ctx.clearRect(0, 0, w, h);

      /* ── Globe disk ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#e8e6dc";
      ctx.fill();

      /* ── Graticule — rgba(20,20,19,0.063), width 0.35 ── */
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.063)";
      ctx.lineWidth = 0.35;
      ctx.stroke();

      if (landRef.current) {
        /* ── Land fill — very subtle ── */
        ctx.beginPath();
        path(landRef.current as Parameters<typeof path>[0]);
        ctx.fillStyle = "rgba(20, 20, 19, 0.035)";
        ctx.fill();

        /* ── Country outlines — rgba(20,20,19,0.32), width 0.55 ── */
        ctx.beginPath();
        path(landRef.current as Parameters<typeof path>[0]);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.32)";
        ctx.lineWidth = 0.55;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      /* ── Inner rim — 0.55 opacity, width 0.6 ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.55)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      /* ── Outer rim — 0.35 opacity, width 0.4, +6px out ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.35)";
      ctx.lineWidth = 0.4;
      ctx.stroke();

      rotationRef.current += 0.03;
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
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
