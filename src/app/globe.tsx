"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const worldRef = useRef<ReturnType<typeof feature> | null>(null);

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

    const graticule = geoGraticule().step([15, 15])();

    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!mounted) return;
        const geom = topo.objects.countries as GeometryCollection;
        worldRef.current = feature(topo, geom);
        draw();
      });

    function draw() {
      if (!ctx || !canvas || !mounted) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const radius = Math.min(w, h) * 0.45;

      const projection = geoOrthographic()
        .scale(radius)
        .translate([w / 2, h / 2])
        .rotate([rotationRef.current, -20, 0])
        .clipAngle(90);

      const path = geoPath(projection, ctx);

      ctx.clearRect(0, 0, w, h);

      // Globe outline circle
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Graticule lines — thin dotted
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([1, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Country outlines — dotted
      if (worldRef.current) {
        ctx.beginPath();
        path(worldRef.current as Parameters<typeof path>[0]);
        ctx.strokeStyle = "rgba(20, 20, 19, 0.18)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([1, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Faint fill for land
        ctx.beginPath();
        path(worldRef.current as Parameters<typeof path>[0]);
        ctx.fillStyle = "rgba(20, 20, 19, 0.03)";
        ctx.fill();
      }

      rotationRef.current += 0.08;
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
