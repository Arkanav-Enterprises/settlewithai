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
  const countriesRef = useRef<ReturnType<typeof feature> | null>(null);

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

    const graticule = geoGraticule().step([20, 20])();

    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!mounted) return;
        const geom = topo.objects.countries as GeometryCollection;
        countriesRef.current = feature(topo, geom);
        draw();
      });

    function draw() {
      if (!ctx || !canvas || !mounted) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const radius = Math.min(w, h) * 0.45;
      const cx = w / 2;
      const cy = h / 2;

      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([rotationRef.current, -20, 0])
        .clipAngle(90);

      const path = geoPath(projection, ctx);

      ctx.clearRect(0, 0, w, h);

      // Globe disk — filled with page bg
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#e8e6dc";
      ctx.fill();

      // Graticule — very faint continuous lines
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.063)";
      ctx.lineWidth = 0.35;
      ctx.stroke();

      // Country outlines — thin continuous strokes
      if (countriesRef.current) {
        ctx.beginPath();
        path(countriesRef.current as Parameters<typeof path>[0]);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.32)";
        ctx.lineWidth = 0.55;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Inner rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.55)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Outer rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.35)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      rotationRef.current += 0.04;
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
