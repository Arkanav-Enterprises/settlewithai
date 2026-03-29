"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Feature, Geometry } from "geojson";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/* Ease in-out cubic */
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* Country IDs to highlight (cycle through) — ISO 3166-1 numeric */
const FOCUS_COUNTRIES = [
  "356", // India
  "840", // USA
  "276", // Germany
  "076", // Brazil
  "392", // Japan
  "826", // UK
  "036", // Australia
];

/* Target rotation [lon, lat] for each country (approximate centers) */
const COUNTRY_CENTERS: Record<string, [number, number]> = {
  "356": [-78, -22],  // India
  "840": [100, -40],  // USA
  "276": [-10, -51],  // Germany
  "076": [50, 10],    // Brazil
  "392": [-138, -36], // Japan
  "826": [2, -54],    // UK
  "036": [-133, 25],  // Australia
};

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const landRef = useRef<FeatureCollection | null>(null);
  const startTimeRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    startTimeRef.current = performance.now();

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
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
        landRef.current = feature(topo, geom) as FeatureCollection;
        draw();
      });

    /* ── Animation state ── */
    const FOCUS_DURATION = 4; // seconds per country focus
    const TRANSITION_DURATION = 2; // seconds to transition between countries
    const CYCLE_DURATION = FOCUS_DURATION + TRANSITION_DURATION;
    const INTRO_DURATION = 3; // initial intro animation

    function draw() {
      if (!ctx || !canvas || !mounted || w === 0) return;

      const cx = w / 2;
      const cy = h / 2;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      /* ── Intro zoom: 0.8 → 1.0 over 3s ── */
      const introProgress = Math.min(elapsed / INTRO_DURATION, 1);
      const introScale = 0.8 + 0.2 * easeInOut(introProgress);

      /* ── Scroll zoom ── */
      const scrollZoom = 1 + Math.min(scrollYRef.current / 4000, 0.08);

      const baseRadius = h * 0.48;
      const radius = baseRadius * introScale * scrollZoom;

      /* ── Country focus cycling ── */
      const cycleTime = Math.max(0, elapsed - INTRO_DURATION);
      const cycleIndex = Math.floor(cycleTime / CYCLE_DURATION);
      const cyclePhase = (cycleTime % CYCLE_DURATION) / CYCLE_DURATION;

      const currentCountryIdx = cycleIndex % FOCUS_COUNTRIES.length;
      const nextCountryIdx = (cycleIndex + 1) % FOCUS_COUNTRIES.length;

      const currentId = FOCUS_COUNTRIES[currentCountryIdx];
      const nextId = FOCUS_COUNTRIES[nextCountryIdx];

      const currentCenter = COUNTRY_CENTERS[currentId];
      const nextCenter = COUNTRY_CENTERS[nextId];

      /* During intro, use starting rotation; after, interpolate between country centers */
      let rotLon: number, rotLat: number;
      let highlightId: string | null = null;

      if (elapsed < INTRO_DURATION) {
        // Intro: rotate from initial position toward first country
        const target = COUNTRY_CENTERS[FOCUS_COUNTRIES[0]];
        rotLon = 30 + (target[0] - 30) * easeInOut(introProgress);
        rotLat = -35 + (target[1] - (-35)) * easeInOut(introProgress);
      } else {
        // Transition phase (last portion of cycle)
        const transitionStart = FOCUS_DURATION / CYCLE_DURATION;
        if (cyclePhase < transitionStart) {
          // Holding on current country
          rotLon = currentCenter[0];
          rotLat = currentCenter[1];
          highlightId = currentId;
        } else {
          // Transitioning to next country
          const t = easeInOut(
            (cyclePhase - transitionStart) / (1 - transitionStart)
          );
          rotLon = currentCenter[0] + (nextCenter[0] - currentCenter[0]) * t;
          rotLat = currentCenter[1] + (nextCenter[1] - currentCenter[1]) * t;
          // Fade highlight during transition
          highlightId = t < 0.5 ? currentId : nextId;
        }
      }

      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([rotLon, rotLat, 0])
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
        path(landRef.current as unknown as Parameters<typeof path>[0]);
        ctx.fillStyle = "rgba(20, 20, 19, 0.035)";
        ctx.fill();

        /* ── Highlighted country fill ── */
        if (highlightId) {
          const highlightFeature = landRef.current.features.find(
            (f) => f.id === highlightId
          );
          if (highlightFeature) {
            ctx.beginPath();
            path(highlightFeature as unknown as Parameters<typeof path>[0]);
            ctx.fillStyle = "rgba(217, 119, 87, 0.2)";
            ctx.fill();
            ctx.strokeStyle = "rgba(217, 119, 87, 0.5)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        /* ── Country outlines ── */
        ctx.beginPath();
        path(landRef.current as unknown as Parameters<typeof path>[0]);
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
