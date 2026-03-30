"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";

/* Use 110m — much lighter than 50m, still looks great, 60fps stable */
const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* Countries to cycle through */
const FOCUS = [
  { id: "356", name: "India", lon: -78, lat: -22 },
  { id: "840", name: "United States", lon: 100, lat: -40 },
  { id: "276", name: "Germany", lon: -10, lat: -51 },
  { id: "076", name: "Brazil", lon: 50, lat: 10 },
  { id: "392", name: "Japan", lon: -138, lat: -36 },
  { id: "826", name: "United Kingdom", lon: 2, lat: -54 },
  { id: "036", name: "Australia", lon: -133, lat: 25 },
];

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let mounted = true;
    let cw = 0;
    let ch = 0;
    let scrollY = 0;
    const t0 = performance.now();

    /* Reuse projection — just update rotation/scale each frame */
    const projection = geoOrthographic().clipAngle(90);
    const pathGen = geoPath(projection, ctx);

    const graticule = geoGraticule().step([15, 15])();
    let land: FeatureCollection | null = null;
    /* Pre-index features by id for O(1) highlight lookup */
    const featuresById = new Map<string, Parameters<typeof pathGen>[0]>();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener(
      "scroll",
      () => {
        scrollY = window.scrollY;
      },
      { passive: true }
    );

    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!mounted) return;
        const geom = topo.objects.countries as GeometryCollection;
        land = feature(topo, geom) as FeatureCollection;
        for (const f of land.features) {
          if (f.id) featuresById.set(String(f.id), f as unknown as Parameters<typeof pathGen>[0]);
        }
        tick();
      });

    const HOLD = 4;
    const MOVE = 2;
    const CYCLE = HOLD + MOVE;
    const INTRO = 3;

    function tick() {
      if (!ctx || !mounted || cw === 0) return;

      const elapsed = (performance.now() - t0) / 1000;
      const cx = cw / 2;
      const cy = ch / 2;

      /* Intro */
      const ip = Math.min(elapsed / INTRO, 1);
      const scale = 0.8 + 0.2 * easeInOut(ip);
      const radius = ch * 0.48 * scale;

      /* Country cycling */
      const ct = Math.max(0, elapsed - INTRO);
      const ci = Math.floor(ct / CYCLE) % FOCUS.length;
      const ni = (ci + 1) % FOCUS.length;
      const phase = (ct % CYCLE) / CYCLE;
      const holdEnd = HOLD / CYCLE;

      let lon: number, lat: number, highlightIdx: number;

      if (elapsed < INTRO) {
        const tgt = FOCUS[0];
        lon = 30 + (tgt.lon - 30) * easeInOut(ip);
        lat = -35 + (tgt.lat + 35) * easeInOut(ip);
        highlightIdx = 0;
      } else if (phase < holdEnd) {
        lon = FOCUS[ci].lon;
        lat = FOCUS[ci].lat;
        highlightIdx = ci;
      } else {
        const t = easeInOut((phase - holdEnd) / (1 - holdEnd));
        lon = FOCUS[ci].lon + (FOCUS[ni].lon - FOCUS[ci].lon) * t;
        lat = FOCUS[ci].lat + (FOCUS[ni].lat - FOCUS[ci].lat) * t;
        highlightIdx = t < 0.5 ? ci : ni;
      }

      /* Update projection in-place */
      projection.scale(radius).translate([cx, cy]).rotate([lon, lat, 0]);

      /* ── Clear with bg color (alpha:false canvas) ── */
      ctx.fillStyle = "#e8e6dc";
      ctx.fillRect(0, 0, cw, ch);

      /* ── Globe disk ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#e8e6dc";
      ctx.fill();

      /* ── Graticule ── */
      ctx.beginPath();
      pathGen(graticule);
      ctx.strokeStyle = "rgba(20,20,19,0.063)";
      ctx.lineWidth = 0.35;
      ctx.stroke();

      if (land) {
        const allLand = land as unknown as Parameters<typeof pathGen>[0];

        /* ── Land fill + outlines in two passes ── */
        ctx.beginPath();
        pathGen(allLand);
        ctx.fillStyle = "rgba(20,20,19,0.035)";
        ctx.fill();
        ctx.strokeStyle = "rgba(20,20,19,0.32)";
        ctx.lineWidth = 0.55;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        /* ── Highlighted country ── */
        const hi = FOCUS[highlightIdx];
        const feat = featuresById.get(hi.id);
        if (feat) {
          ctx.beginPath();
          pathGen(feat);
          ctx.fillStyle = "rgba(217,119,87,0.2)";
          ctx.fill();
          ctx.strokeStyle = "rgba(217,119,87,0.5)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          /* ── Pin + Label ── */
          const center = projection([-(hi.lon), -(hi.lat)]);
          if (center) {
            const [px, py] = center;
            const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
            /* Only show label if on visible hemisphere */
            if (dist < radius * 0.95) {
              /* Pin dot */
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, 2 * Math.PI);
              ctx.fillStyle = "#d97757";
              ctx.fill();

              /* Pin line */
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px, py - 18);
              ctx.strokeStyle = "#d97757";
              ctx.lineWidth = 1.5;
              ctx.stroke();

              /* Label background */
              ctx.font = "600 10px Inter, system-ui, sans-serif";
              const label = hi.name.toUpperCase();
              const tw = ctx.measureText(label).width;
              const lx = px - tw / 2;
              const ly = py - 24;

              ctx.fillStyle = "rgba(217,119,87,0.9)";
              ctx.beginPath();
              ctx.roundRect(lx - 5, ly - 10, tw + 10, 16, 3);
              ctx.fill();

              /* Label text */
              ctx.fillStyle = "#fff";
              ctx.textBaseline = "middle";
              ctx.fillText(label, lx, ly - 2);
            }
          }
        }
      }

      /* ── Inner rim ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20,20,19,0.55)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      /* ── Outer rim ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20,20,19,0.35)";
      ctx.lineWidth = 0.4;
      ctx.stroke();

      animRef.current = requestAnimationFrame(tick);
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
