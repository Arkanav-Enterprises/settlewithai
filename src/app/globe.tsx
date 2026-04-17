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

export default function Globe({
  className = "",
  onFocus,
}: {
  className?: string;
  /* Fires once per country change (not every frame). Used by the hero
     to sync a "now surveying" ticker with whichever country the globe
     is currently rotating toward. */
  onFocus?: (country: { name: string; index: number }) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  /* Stash callback in a ref so the mount-only effect below doesn't need
     to re-run (and tear down the rAF loop) when the parent re-renders. */
  const onFocusRef = useRef(onFocus);
  onFocusRef.current = onFocus;

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

    /* On mobile the globe sits behind the stacked hero text — the pin/label
       lands on top of the body copy. Country name is already surfaced in the
       dispatch rail ("Live · Apr 2026 · {country}"), so we drop the label
       below 768px rather than repositioning it. */
    const mobileMQ = window.matchMedia("(max-width: 767px)");
    let isMobile = mobileMQ.matches;
    const onMQChange = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mobileMQ.addEventListener("change", onMQChange);

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
    // Fill with bg color immediately to prevent black flash before data loads
    ctx.fillStyle = "#e8e6dc";
    ctx.fillRect(0, 0, cw, ch);
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

    /* Tracks the last-emitted highlight so onFocus only fires on change,
       not every animation frame. -1 sentinel forces emit on first tick. */
    let lastEmitted = -1;

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

      /* Emit on change only — tick runs ~60×/s, we want ~1 per country. */
      if (highlightIdx !== lastEmitted) {
        lastEmitted = highlightIdx;
        onFocusRef.current?.({
          name: FOCUS[highlightIdx].name,
          index: highlightIdx,
        });
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
      ctx.strokeStyle = "rgba(20,20,19,0.04)";
      ctx.lineWidth = 0.35;
      ctx.stroke();

      if (land) {
        const allLand = land as unknown as Parameters<typeof pathGen>[0];

        /* ── Land fill + outlines in two passes ──
           Dialled the country-outline stroke down from 0.32 → 0.16 so the
           globe reads as a subdued background wallpaper rather than
           competing with the hero text. The highlighted country keeps its
           warm accent tint, so the "currently surveying" signal still lands. */
        ctx.beginPath();
        pathGen(allLand);
        ctx.fillStyle = "rgba(20,20,19,0.025)";
        ctx.fill();
        ctx.strokeStyle = "rgba(20,20,19,0.16)";
        ctx.lineWidth = 0.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        /* ── Highlighted country ──
           Very soft accent tint — the same orange used for CTAs, dropped
           to ~15% alpha so it reads as a warm highlight rather than a fill. */
        const hi = FOCUS[highlightIdx];
        const feat = featuresById.get(hi.id);
        if (feat) {
          ctx.beginPath();
          pathGen(feat);
          ctx.fillStyle = "rgba(217, 119, 87, 0.14)";
          ctx.fill();
          /* Re-stroke with a slightly warmer, still-subtle border — enough
             to define the highlighted country without pulling focus. */
          ctx.strokeStyle = "rgba(217,119,87,0.35)";
          ctx.lineWidth = 0.6;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          /* ── Pin + Label (desktop only) ── */
          const center = !isMobile ? projection([-(hi.lon), -(hi.lat)]) : null;
          if (center) {
            const [px, py] = center;
            const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
            /* Only show label if on visible hemisphere */
            if (dist < radius * 0.95) {
              /* Pin dot */
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, 2 * Math.PI);
              ctx.fillStyle = "#141413";
              ctx.fill();

              /* Pin line */
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px, py - 18);
              ctx.strokeStyle = "#141413";
              ctx.lineWidth = 1.5;
              ctx.stroke();

              /* Label background */
              ctx.font = "600 10px Manrope, Inter, system-ui, sans-serif";
              const label = hi.name.toUpperCase();
              const tw = ctx.measureText(label).width;
              const lx = px - tw / 2;
              const ly = py - 24;

              ctx.fillStyle = "#141413";
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

      /* ── Inner rim — softened from 0.55 → 0.28 so the globe edge
         reads as a subtle frame rather than a hard stroke. */
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20,20,19,0.28)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      /* ── Outer rim ── */
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20,20,19,0.18)";
      ctx.lineWidth = 0.4;
      ctx.stroke();

      animRef.current = requestAnimationFrame(tick);
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      mobileMQ.removeEventListener("change", onMQChange);
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
