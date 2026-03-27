"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* Sample points along a GeoJSON geometry at a given spacing (in degrees) */
function sampleGeoCoords(
  fc: FeatureCollection,
  step: number
): [number, number][] {
  const pts: [number, number][] = [];
  for (const feat of fc.features) {
    walkCoords(feat.geometry, step, pts);
  }
  return pts;
}

function walkCoords(
  geom: Geometry,
  step: number,
  out: [number, number][]
) {
  if (geom.type === "Polygon") {
    for (const ring of geom.coordinates) sampleRing(ring, step, out);
  } else if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates)
      for (const ring of poly) sampleRing(ring, step, out);
  } else if (geom.type === "LineString") {
    sampleRing(geom.coordinates, step, out);
  } else if (geom.type === "MultiLineString") {
    for (const line of geom.coordinates) sampleRing(line, step, out);
  } else if (geom.type === "GeometryCollection") {
    for (const g of geom.geometries) walkCoords(g, step, out);
  }
}

function sampleRing(
  coords: number[][],
  step: number,
  out: [number, number][]
) {
  let acc = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const [x0, y0] = coords[i];
    const [x1, y1] = coords[i + 1];
    const d = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    acc += d;
    if (acc >= step) {
      out.push([x1, y1]);
      acc = 0;
    }
  }
}

/* Sample graticule lines as dots */
function sampleGraticule(step: number): [number, number][] {
  const pts: [number, number][] = [];
  const dotSpacing = 3; // degrees between dots along a line
  // Meridians
  for (let lon = -180; lon <= 180; lon += step) {
    for (let lat = -90; lat <= 90; lat += dotSpacing) {
      pts.push([lon, lat]);
    }
  }
  // Parallels
  for (let lat = -90; lat <= 90; lat += step) {
    for (let lon = -180; lon <= 180; lon += dotSpacing) {
      pts.push([lon, lat]);
    }
  }
  return pts;
}

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const countryDotsRef = useRef<[number, number][]>([]);
  const graticulDotsRef = useRef<[number, number][]>([]);

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

    // Pre-compute graticule dots
    graticulDotsRef.current = sampleGraticule(20);

    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!mounted) return;
        const geom = topo.objects.countries as GeometryCollection;
        const countries = feature(topo, geom) as FeatureCollection;
        // Sample country outline dots — smaller step = more dots
        countryDotsRef.current = sampleGeoCoords(countries, 1.5);
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

      ctx.clearRect(0, 0, w, h);

      // Globe outline — very subtle circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(20, 20, 19, 0.06)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Graticule dots
      const gratDots = graticulDotsRef.current;
      ctx.fillStyle = "rgba(20, 20, 19, 0.06)";
      for (let i = 0; i < gratDots.length; i++) {
        const p = projection(gratDots[i]);
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 0.6, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Country outline dots
      const cDots = countryDotsRef.current;
      ctx.fillStyle = "rgba(20, 20, 19, 0.18)";
      for (let i = 0; i < cDots.length; i++) {
        const p = projection(cDots[i]);
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1, 0, 2 * Math.PI);
        ctx.fill();
      }

      rotationRef.current += 0.06;
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
