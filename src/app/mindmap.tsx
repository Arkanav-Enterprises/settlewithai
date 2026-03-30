"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

/* ─── Data ──────────────────────────────────────────────── */

const tooltipItems: Record<
  string,
  { heading: string; body: string; image: string; url: string }
> = {
  Debugging: {
    heading: "Perfect code, every time",
    body: "JetBrains uses Claude to power Junie, achieving 100% syntactically correct code generation.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/40ab6434838c7cd995e4ef74862e1df2d051f8b4-4800x2520.jpg",
    url: "https://claude.com/customers/jetbrains",
  },
  Visualizations: {
    heading: "Autonomous data insights",
    body: "Claude agents autonomously analyze massive datasets, delivering 50%+ KPI improvements for Triple Whale\u2019s brands.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/150dfe21dd8e8ee77fe0edacc93765a038ee25bf-4800x2520.jpg",
    url: "https://claude.com/customers/triple-whale",
  },
  Queries: {
    heading: "4,000 employees, one platform",
    body: "Block employees solve data problems independently using Claude, saving engineers 8-10+ hours weekly.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/c772aa1a4ce89077edc8731fcb832822ab77d4a3-4800x2520.jpg",
    url: "https://claude.com/customers/block",
  },
  Marketing: {
    heading: "Smarter ad campaigns",
    body: "Advolve uses Claude to manage millions of ads simultaneously with 90% less operational work.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/777a5cbda7fbf7dede631821f6de45f12991ede6-4800x2520.jpg",
    url: "https://claude.com/customers/advolve",
  },
  Growth: {
    heading: "Enterprise AI transformation",
    body: "IG Group boosts productivity and saves operational costs with Claude.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/1cb9e73bbea501aa7d268e93235cc9070023d0c3-4800x2520.jpg",
    url: "https://claude.com/customers/ig-group",
  },
  Prototypes: {
    heading: "From words to working apps",
    body: "Spring.new enables business teams to build functional applications using plain English descriptions.",
    image: "https://cdn.sanity.io/images/4zrzovbb/website/92ed261f46696d6cd181408764ab5abd048a82f5-4800x2520.jpg",
    url: "https://claude.com/customers/spring-new",
  },
};

const categories: Record<string, { items: string[] }> = {
  "Software development": {
    items: ["Debugging", "Testing", "Optimization", "Documentation", "Reviews"],
  },
  "Data analysis": {
    items: ["Visualizations", "Queries", "Processing", "Reports", "Patterns"],
  },
  "Content creation": {
    items: ["Marketing", "Education", "Documentation", "Translation", "Editing"],
  },
  Design: {
    items: ["Prototypes", "Components", "Flows", "Responsive", "Visuals"],
  },
  "Business strategy": {
    items: ["Growth", "Markets", "Campaigns", "Modeling", "Competition"],
  },
};

/* ─── Types ─────────────────────────────────────────────── */

interface MindmapNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: "category" | "item";
  category?: string;
  visible: boolean;
}

/* ─── Force config ──────────────────────────────────────── */

const FC = {
  charge: { categoryStrength: 0.3, itemStrength: -0.25 },
  collision: {
    categoryRadius: 2,
    itemRadius: 1.5,
    mobileItemRadius: 2.2,
    strength: 0.05,
    mobileStrength: 0.15,
  },
  center: { strength: 0.25 },
  radial: { radius: 0.9, mobileRadius: 0.25, strength: 0.001 },
  categoryStabilize: { damping: 0.75, resizeDamping: 0.75 },
  categoryRepulsion: { minDistance: 7.5, force: 0.01, resizeForce: 0.01 },
  itemRepulsion: { minDistance: 1.5, force: 0.1, resizeForce: 0.85 },
  crossCategoryRepulsion: {
    minDistance: 2.8,
    force: 0.25,
    resizeMinDistance: 2.8,
    resizeForce: 0.25,
  },
  itemToCategoryDistance: {
    minDistance: 0.5,
    maxDistance: 1.5,
    mobileMinDistance: 0.25,
    mobileMaxDistance: 1.25,
    repulsionForce: 0.04,
    attractionForce: 0.025,
    crossCategoryDistance: 2.5,
    crossCategoryForce: 0.09,
  },
  bounds: {
    marginPercent: 0.08,
    minMargin: 80,
    mobileMarginPercent: 0.15,
    mobileMinMargin: 80,
  },
  centerRepulsion: { logoMultiplier: 1.1, force: 0.25 },
  alpha: { min: 0.01, decay: 0.001, restart: 0.25, resizeRestart: 0.25 },
  resizeDamping: 0.65,
};

const MOBILE_BP = 800;
const ANIM_DUR = 450;
const MOBILE_MAX_CATS = 4;
const MOBILE_MAX_NODES = 3;

/* ─── Component ─────────────────────────────────────────── */

export default function Mindmap({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = wrapRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    /* ── colors (Settle light theme) ── */
    const strokeColor = "rgba(20,20,19,0.12)";
    const bgColor = "var(--bg, #e8e6dc)";
    const fgPrimary = "var(--text, #141413)";
    const fgTertiary = "var(--text-muted, rgba(20,20,19,0.5))";

    /* ── dimensions ── */
    let width = container.clientWidth;
    let height = container.clientHeight;
    let centerX = width / 2;
    let centerY = height / 2;
    let circleWidth = Math.min(40, window.innerWidth / 8);
    let isMobile = window.innerWidth < MOBILE_BP;

    const mouse = { x: 0, y: 0 };
    const activeTooltips: string[] = [];

    /* ── helpers ── */
    function getActiveCatNames() {
      const names = Object.keys(categories);
      return isMobile ? names.slice(0, MOBILE_MAX_CATS) : names;
    }

    function createNodes(cx: number, cy: number): MindmapNode[] {
      const all: MindmapNode[] = [];
      const catNames = Object.keys(categories);
      const catCount = isMobile
        ? Math.min(catNames.length, MOBILE_MAX_CATS)
        : catNames.length;

      catNames.forEach((name, ci) => {
        let angle: number, radius: number;
        if (isMobile) {
          const vBias = 0.7;
          const hSpread = 0.3;
          angle =
            (ci / catCount) * Math.PI * 2 * vBias +
            Math.PI * hSpread * (ci % 2 === 0 ? -1 : 1) +
            (Math.random() * 0.05 - 0.025);
          const base = Math.min(width, height) * 0.2;
          radius = base + (Math.random() - 0.5) * base * 0.05;
        } else {
          angle = (ci / catCount + (Math.random() * 0.1 - 0.05)) * Math.PI * 2;
          const base = Math.min(width, height) * 0.25;
          radius = base + (Math.random() - 0.5) * base * 0.1;
        }

        const catNode: MindmapNode = {
          id: `cat-${ci}`,
          name,
          type: "category",
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          visible: false,
        };
        all.push(catNode);

        categories[name].items.forEach((itemName, ii) => {
          const itemAngle =
            (ii / categories[name].items.length) * Math.PI * 2;
          const bIR = isMobile ? 1.8 : 2.8;
          const itemR =
            circleWidth * bIR + Math.random() * (circleWidth * 0.05);
          all.push({
            id: `item-${name}-${ii}`,
            name: itemName,
            type: "item",
            category: name,
            x: catNode.x! + Math.cos(itemAngle) * itemR,
            y: catNode.y! + Math.sin(itemAngle) * itemR,
            visible: false,
          });
        });
      });
      return all;
    }

    let nodes = createNodes(centerX, centerY);

    /* ── SVG ── */
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const linkGroup = svg.append("g").attr("class", "links");
    const categoryGroup = svg.append("g").attr("class", "categories");
    const nodeGroup = svg.append("g").attr("class", "nodes");

    /* ── Force helpers ── */
    function chargeForce() {
      return d3
        .forceManyBody<MindmapNode>()
        .strength((d) =>
          d.type === "category"
            ? -(circleWidth * FC.charge.categoryStrength)
            : -(circleWidth * FC.charge.itemStrength)
        );
    }

    function collisionForce() {
      return d3
        .forceCollide<MindmapNode>()
        .radius((d) => {
          if (d.type === "category")
            return circleWidth * FC.collision.categoryRadius;
          const r = isMobile
            ? FC.collision.mobileItemRadius
            : FC.collision.itemRadius;
          return circleWidth * r;
        })
        .strength(
          isMobile ? FC.collision.mobileStrength : FC.collision.strength
        );
    }

    function radialForce() {
      const r = isMobile ? FC.radial.mobileRadius : FC.radial.radius;
      return d3
        .forceRadial<MindmapNode>(
          Math.min(width, height) * r,
          centerX,
          centerY
        )
        .strength(FC.radial.strength);
    }

    function catStabilize() {
      return () => {
        nodes
          .filter((d) => d.type === "category")
          .forEach((d) => {
            if (d.vx) d.vx *= FC.categoryStabilize.damping;
            if (d.vy) d.vy *= FC.categoryStabilize.damping;
          });
      };
    }

    function catRepulsion() {
      const min = circleWidth * FC.categoryRepulsion.minDistance;
      const f = FC.categoryRepulsion.force;
      return () => {
        const cats = nodes.filter((d) => d.type === "category");
        for (let i = 0; i < cats.length; i++) {
          for (let j = i + 1; j < cats.length; j++) {
            const a = cats[i],
              b = cats[j];
            const dx = b.x! - a.x!;
            const dy = b.y! - a.y!;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < min && dist > 0) {
              const fv = (min - dist) * f;
              const fx = (dx / dist) * fv;
              const fy = (dy / dist) * fv;
              a.vx = (a.vx || 0) - fx;
              a.vy = (a.vy || 0) - fy;
              b.vx = (b.vx || 0) + fx;
              b.vy = (b.vy || 0) + fy;
            }
          }
        }
      };
    }

    function itemRepulsion(isResize: boolean) {
      const min = circleWidth * FC.itemRepulsion.minDistance;
      const f = isResize ? FC.itemRepulsion.resizeForce : FC.itemRepulsion.force;
      return () => {
        const items = nodes.filter((d) => d.type === "item");
        const cats = nodes.filter((d) => d.type === "category");
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i],
              b = items[j];
            const dx = b.x! - a.x!;
            const dy = b.y! - a.y!;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < min && dist > 0) {
              const fv = (min - dist) * f;
              const fx = (dx / dist) * fv;
              const fy = (dy / dist) * fv;
              a.vx = (a.vx || 0) - fx;
              a.vy = (a.vy || 0) - fy;
              b.vx = (b.vx || 0) + fx;
              b.vy = (b.vy || 0) + fy;
            }
          }
        }
        if (isResize) {
          for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < cats.length; j++) {
              const item = items[i],
                cat = cats[j];
              const dx = item.x! - cat.x!;
              const dy = item.y! - cat.y!;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (item.category === cat.name) {
                const minD =
                  circleWidth *
                  (isMobile
                    ? FC.itemToCategoryDistance.mobileMinDistance
                    : FC.itemToCategoryDistance.minDistance);
                const maxD =
                  circleWidth *
                  (isMobile
                    ? FC.itemToCategoryDistance.mobileMaxDistance
                    : FC.itemToCategoryDistance.maxDistance);
                if (dist < minD && dist > 0) {
                  const fv =
                    (minD - dist) * FC.itemToCategoryDistance.repulsionForce;
                  item.vx = (item.vx || 0) + (dx / dist) * fv;
                  item.vy = (item.vy || 0) + (dy / dist) * fv;
                } else if (dist > maxD) {
                  const fv =
                    (dist - maxD) * FC.itemToCategoryDistance.attractionForce;
                  item.vx = (item.vx || 0) - (dx / dist) * fv;
                  item.vy = (item.vy || 0) - (dy / dist) * fv;
                }
              } else {
                const cd =
                  circleWidth * FC.itemToCategoryDistance.crossCategoryDistance;
                if (dist < cd && dist > 0) {
                  const fv =
                    (cd - dist) * FC.itemToCategoryDistance.crossCategoryForce;
                  item.vx = (item.vx || 0) + (dx / dist) * fv;
                  item.vy = (item.vy || 0) + (dy / dist) * fv;
                }
              }
            }
          }
        }
      };
    }

    function crossCatRepulsion(isResize: boolean) {
      const minD =
        circleWidth *
        (isResize
          ? FC.crossCategoryRepulsion.resizeMinDistance
          : FC.crossCategoryRepulsion.minDistance);
      const f = isResize
        ? FC.crossCategoryRepulsion.resizeForce
        : FC.crossCategoryRepulsion.force;
      return () => {
        const items = nodes.filter((d) => d.type === "item");
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i],
              b = items[j];
            if (a.category !== b.category) {
              const dx = b.x! - a.x!;
              const dy = b.y! - a.y!;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < minD && dist > 0) {
                const fv = (minD - dist) * f;
                const fx = (dx / dist) * fv;
                const fy = (dy / dist) * fv;
                a.vx = (a.vx || 0) - fx;
                a.vy = (a.vy || 0) - fy;
                b.vx = (b.vx || 0) + fx;
                b.vy = (b.vy || 0) + fy;
              }
            }
          }
        }
      };
    }

    function boundsForce() {
      return () => {
        const mp = isMobile
          ? FC.bounds.mobileMarginPercent
          : FC.bounds.marginPercent;
        const mm = isMobile ? FC.bounds.mobileMinMargin : FC.bounds.minMargin;
        const margin = Math.max(Math.min(width, height) * mp, mm);
        nodes.forEach((n) => {
          n.x = Math.max(margin, Math.min(width - margin, n.x!));
          n.y = Math.max(margin, Math.min(height - margin, n.y!));
        });
      };
    }

    function centerRepulsion() {
      return () => {
        if (!logo) return;
        const lr = Math.max(
          logo.clientWidth * FC.centerRepulsion.logoMultiplier,
          logo.clientHeight * FC.centerRepulsion.logoMultiplier
        );
        nodes.forEach((n) => {
          const dx = n.x! - centerX;
          const dy = n.y! - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lr && dist > 0) {
            const fv = (lr - dist) * FC.centerRepulsion.force;
            n.vx = (n.vx || 0) + (dx / dist) * fv;
            n.vy = (n.vy || 0) + (dy / dist) * fv;
          }
        });
      };
    }

    /* ── Simulation ── */
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", chargeForce())
      .force("collision", collisionForce())
      .force(
        "center",
        d3
          .forceCenter<MindmapNode>(centerX, centerY)
          .strength(FC.center.strength)
      )
      .force("radial", radialForce())
      .force("categoryStabilize", catStabilize())
      .force("categoryRepulsion", catRepulsion())
      .force("itemRepulsion", itemRepulsion(false))
      .force("crossCategoryRepulsion", crossCatRepulsion(false))
      .force("bounds", boundsForce())
      .force("centerRepulsion", centerRepulsion())
      .on("tick", ticked);

    /* ── Tick ── */
    function ticked() {
      const vis = nodes.filter((d) => d.visible);

      linkGroup
        .selectAll<SVGLineElement, MindmapNode>("line")
        .data(vis, (d) => d.id)
        .attr("x1", (d) => {
          if (d.type === "category") return centerX;
          const cat = nodes.find(
            (n) => n.type === "category" && n.name === d.category
          );
          return cat ? cat.x! : centerX;
        })
        .attr("y1", (d) => {
          if (d.type === "category") return centerY;
          const cat = nodes.find(
            (n) => n.type === "category" && n.name === d.category
          );
          return cat ? cat.y! : centerY;
        })
        .attr("x2", (d) => d.x!)
        .attr("y2", (d) => d.y!);

      categoryGroup
        .selectAll<SVGCircleElement, MindmapNode>("circle")
        .data(
          nodes.filter((d) => d.type === "category" && d.visible),
          (d) => d.id
        )
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      categoryGroup
        .selectAll<SVGTextElement, MindmapNode>("text")
        .data(
          nodes.filter((d) => d.type === "category" && d.visible),
          (d) => d.id
        )
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y! + 5);

      nodeGroup
        .selectAll<SVGCircleElement, MindmapNode>(".item-circle")
        .data(
          nodes.filter((d) => d.type === "item" && d.visible),
          (d) => d.id
        )
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      nodeGroup
        .selectAll<SVGGElement, MindmapNode>(".item-label-group")
        .data(
          nodes.filter((d) => d.type === "item" && d.visible),
          (d) => d.id
        )
        .each(function (d) {
          const txt = d3.select(this).select("text");
          if (!txt.empty()) {
            txt.attr("x", d.x!).attr("y", d.y! + 3);
          }
          const aTxt = d3.select(this).select("a text");
          if (!aTxt.empty()) {
            aTxt.attr("x", d.x!).attr("y", d.y! + 3);
          }
        });
    }

    /* ── Tooltips (CSS-driven, no gsap) ── */
    function positionTooltip(el: HTMLElement) {
      const tw = el.offsetWidth || 260;
      const th = el.offsetHeight || 180;
      const left =
        mouse.x > window.innerWidth / 2 ? mouse.x - (tw - 8) : mouse.x - 8;
      const top =
        mouse.y < window.innerHeight / 2 ? mouse.y + 20 : mouse.y - th - 20;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    }

    function showTooltip(name: string) {
      if (activeTooltips.includes(name)) {
        const ex = document.getElementById(`mm-tip-${name.toLowerCase()}`);
        if (ex) {
          positionTooltip(ex);
          ex.style.opacity = "1";
          ex.style.transform = "scale(1)";
        }
        return;
      }
      activeTooltips.push(name);
      const item = tooltipItems[name];
      const el = document.createElement("div");
      el.id = `mm-tip-${name.toLowerCase()}`;
      el.className = "mindmap-tooltip";
      el.innerHTML = `<h3>${item.heading}</h3><img src="${item.image}" crossorigin="anonymous" alt="" /><p>${item.body}</p>`;
      const ox = mouse.x < window.innerWidth / 2 ? "left" : "right";
      const oy = mouse.y < window.innerHeight / 2 ? "top" : "bottom";
      el.style.transformOrigin = `${oy} ${ox}`;
      el.style.opacity = "0";
      el.style.transform = "scale(0.95)";
      document.body.appendChild(el);
      positionTooltip(el);
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      });
    }

    function hideTooltip(name: string) {
      const idx = activeTooltips.indexOf(name);
      if (idx >= 0) activeTooltips.splice(idx, 1);
      const el = document.getElementById(`mm-tip-${name.toLowerCase()}`);
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "scale(0.95)";
        setTimeout(() => el.remove(), 300);
      }
    }

    /* ── Reveal animation ── */
    let catRevealIdx = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function revealCategory() {
      const activeCats = getActiveCatNames();
      if (catRevealIdx >= activeCats.length) {
        if (intervalId) clearInterval(intervalId);
        setTimeout(() => {
          intervalId = setInterval(revealItem, 100);
        }, 200);
        return;
      }
      const catName = activeCats[catRevealIdx];
      const catNode = nodes.find(
        (n) => n.name === catName && n.type === "category"
      );
      if (catNode) {
        catNode.visible = true;
        renderEnter();
      }
      catRevealIdx++;
    }

    function revealItem() {
      const activeCats = getActiveCatNames();
      const hidden = nodes.filter(
        (n) =>
          n.type === "item" && !n.visible && activeCats.includes(n.category!)
      );
      if (hidden.length === 0) {
        if (intervalId) clearInterval(intervalId);
        return;
      }
      hidden[0].visible = true;
      renderEnter();
      simulation.alpha(0.2).restart();
    }

    function renderEnter() {
      /* links */
      linkGroup
        .selectAll<SVGLineElement, MindmapNode>("line")
        .data(
          nodes.filter((d) => d.visible),
          (d) => d.id
        )
        .enter()
        .append("line")
        .attr("stroke", strokeColor)
        .attr("stroke-width", 1)
        .attr("x1", (d) => {
          if (d.type === "category") return centerX;
          const cat = nodes.find(
            (n) => n.type === "category" && n.name === d.category
          );
          return cat ? cat.x! : centerX;
        })
        .attr("y1", (d) => {
          if (d.type === "category") return centerY;
          const cat = nodes.find(
            (n) => n.type === "category" && n.name === d.category
          );
          return cat ? cat.y! : centerY;
        })
        .attr("x2", (d) => d.x!)
        .attr("y2", (d) => d.y!)
        .attr("opacity", 0)
        .transition()
        .duration(ANIM_DUR)
        .attr("opacity", (d) => (d.type === "category" ? 0.6 : 0.4));

      /* category circles */
      categoryGroup
        .selectAll<SVGCircleElement, MindmapNode>("circle")
        .data(
          nodes.filter((d) => d.type === "category" && d.visible),
          (d) => d.id
        )
        .enter()
        .append("circle")
        .attr("r", circleWidth * 0.8)
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!)
        .attr("fill", bgColor)
        .attr("opacity", 0)
        .transition()
        .duration(ANIM_DUR)
        .attr("opacity", 0.9);

      /* category labels */
      categoryGroup
        .selectAll<SVGTextElement, MindmapNode>("text")
        .data(
          nodes.filter((d) => d.type === "category" && d.visible),
          (d) => d.id
        )
        .enter()
        .append("text")
        .text((d) => d.name)
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .attr("font-family", "Sentient, Georgia, serif")
        .attr("text-anchor", "middle")
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y! + 5)
        .attr("fill", fgPrimary)
        .attr("opacity", 0)
        .transition()
        .duration(ANIM_DUR)
        .attr("opacity", 1);

      /* item circles */
      nodeGroup
        .selectAll<SVGCircleElement, MindmapNode>(".item-circle")
        .data(
          nodes.filter((d) => d.type === "item" && d.visible),
          (d) => d.id
        )
        .enter()
        .append("circle")
        .attr("class", "item-circle")
        .attr("r", circleWidth * 0.5)
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!)
        .attr("fill", bgColor)
        .attr("stroke-width", 0)
        .attr("opacity", 0)
        .transition()
        .duration(ANIM_DUR)
        .attr("opacity", 0.8);

      /* item labels */
      const enterGroups = nodeGroup
        .selectAll<SVGGElement, MindmapNode>(".item-label-group")
        .data(
          nodes.filter((d) => d.type === "item" && d.visible),
          (d) => d.id
        )
        .enter()
        .append("g")
        .attr("class", "item-label-group")
        .attr("pointer-events", "all")
        .attr("opacity", 0);

      enterGroups.transition().duration(ANIM_DUR).attr("opacity", 1);

      enterGroups.each(function (d) {
        const g = d3.select(this);
        if (tooltipItems[d.name]) {
          const a = g
            .append("a")
            .attr("href", tooltipItems[d.name].url)
            .attr("target", "_blank")
            .attr("rel", "noopener noreferrer");
          a.append("text")
            .text(d.name)
            .attr("font-size", "11px")
            .attr("font-weight", "400")
            .attr("font-family", "Inter, sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", d.x!)
            .attr("y", d.y! + 3)
            .attr("fill", fgTertiary)
            .style("cursor", "pointer")
            .style("text-decoration", "underline 0.5px rgba(20,20,19,0.2)")
            .style("text-underline-offset", "4px");
        } else {
          g.append("text")
            .text(d.name)
            .attr("font-size", "11px")
            .attr("font-weight", "400")
            .attr("font-family", "Inter, sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", d.x!)
            .attr("y", d.y! + 3)
            .attr("fill", fgTertiary)
            .style("cursor", "default");
        }
      });

      /* tooltip events */
      nodeGroup
        .selectAll<SVGGElement, MindmapNode>(".item-label-group")
        .on("mouseenter", (_event, d) => {
          if (tooltipItems[d.name]) showTooltip(d.name);
        })
        .on("mouseleave", (_event, d) => {
          if (tooltipItems[d.name]) hideTooltip(d.name);
        });
    }

    /* ── Intersection observer — start on scroll ── */
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            intervalId = setInterval(revealCategory, 100);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(container);

    /* ── Preload tooltip images ── */
    Object.values(tooltipItems).forEach((item) => {
      const img = new Image();
      img.src = item.image;
      img.crossOrigin = "anonymous";
    });

    /* ── Resize ── */
    function handleResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      centerX = width / 2;
      centerY = height / 2;
      circleWidth = Math.min(40, window.innerWidth / 8);
      isMobile = window.innerWidth < MOBILE_BP;

      svg.attr("viewBox", `0 0 ${width} ${height}`);

      simulation
        .force(
          "center",
          d3.forceCenter<MindmapNode>(centerX, centerY).strength(0.005)
        )
        .force("radial", radialForce())
        .force("collision", collisionForce())
        .force("bounds", boundsForce())
        .force("centerRepulsion", centerRepulsion())
        .force("itemRepulsion", itemRepulsion(true))
        .force("crossCategoryRepulsion", crossCatRepulsion(true))
        .alpha(FC.alpha.resizeRestart)
        .restart();
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      activeTooltips.forEach((name) => {
        const el = document.getElementById(`mm-tip-${name.toLowerCase()}`);
        if (el) positionTooltip(el);
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      simulation.stop();
      svg.remove();
      document
        .querySelectorAll(".mindmap-tooltip")
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={{ minHeight: 600 }}>
      {/* Mind map container */}
      <div
        ref={wrapRef}
        className="w-full h-full"
        style={{ aspectRatio: "1 / 1", minHeight: 600 }}
      />
      {/* Center logo */}
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ maxWidth: 180 }}
      >
        {/* Soft glow behind logo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          style={{
            width: "calc(100% + 100px)",
            height: "calc(100% + 60px)",
            background: "var(--bg, #e8e6dc)",
            filter: "blur(16px)",
            borderRadius: "50%",
          }}
        />
        {/* Claude wordmark */}
        <svg
          width="122"
          height="27"
          viewBox="0 0 122 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M5.1373 17.4108L10.2887 14.5221L10.4303 14.2989L10.2887 14.1282H10.034L9.17071 14.0757L6.22703 13.9969L3.67961 13.8919L1.20295 13.7606H0.806683L0.580246 13.6293L0.297199 13.3666L0.0566093 13.1172L0 12.8546L0.0566093 12.4738L0.226437 12.1849L0.367961 12.1193H0.580246L1.33032 12.1849L2.98614 12.3031L5.47695 12.4738L7.2743 12.5788L9.94909 12.8546H10.3737L10.4303 12.6839L10.2887 12.5788L10.1755 12.4738L7.5998 10.7275L4.81179 8.88921L3.3541 7.82566L2.57573 7.28732L2.17946 6.78837L2.00963 6.42072L1.92472 6.03994L2.00963 5.68542L2.17946 5.37029L2.39174 5.13395L2.71725 4.8976H3.07106L3.67961 4.96325L3.9202 5.0289L4.89671 5.77733L6.9771 7.39236L9.69435 9.38817L10.0906 9.71642H10.2746V9.5326L10.0906 9.2306L8.61877 6.56515L7.04786 3.84718L6.34025 2.71797L6.15627 2.04833C6.11853 1.89952 6.04305 1.59927 6.04305 1.58877V1.24738L6.18457 0.827209L6.43931 0.393909L6.84973 0.144433L7.30261 0H7.65641L7.91116 0.0393909L8.39233 0.144433L8.84521 0.538342L9.52452 2.08772L10.6143 4.51682L12.3125 7.82566L12.8079 8.81043L13.0768 9.71642L13.1758 9.99216H13.3457V9.83459L13.4872 7.97009L13.7419 5.68542L13.9967 2.74423L14.0816 1.91702L14.492 0.919121L14.6901 0.682776L15.0864 0.380779H15.3128L15.9497 0.682776L16.3176 1.08982L16.4733 1.4312L16.4026 1.91702L16.0912 3.93909L15.4827 7.10349L15.0864 9.2306H15.3128L15.5817 8.95487L16.6573 7.53679L18.4546 5.27838L19.2472 4.38552L20.1812 3.40075L20.7756 2.92806L21.2993 2.74423L21.9078 2.92806L22.4456 3.37449L22.7287 4.16231V4.51682L22.3607 5.43594L21.2002 6.90654L20.2378 8.15392L19.6434 9.11243L18.0018 11.489V11.5941H18.2848L21.3983 10.9244L23.0825 10.6224L25.0921 10.281L25.4884 10.3861L25.9978 10.7012L26.0969 11.1345L25.9978 11.6597L25.7431 12.0142L23.5919 12.5394L21.0728 13.0515L17.3215 13.9346C17.2972 13.9403 17.28 13.9621 17.28 13.9871C17.28 14.0149 17.3013 14.0382 17.329 14.0407L19.0207 14.1939L19.7425 14.2332H21.5116L24.809 14.4827L25.6723 15.0473L26.0969 15.3756L26.1818 15.7432L26.0969 16.2816L25.9271 16.531L25.2195 16.8593L24.7666 16.9512L22.9834 16.531L18.8085 15.5331L17.3791 15.1786H17.1809V15.2968L18.3697 16.4654L20.5633 18.4349L23.2947 20.9822L23.4363 21.4286V21.6125L23.0825 22.1114L22.7853 22.1246L22.7145 22.0589L20.3086 20.2469L20.1246 20.1681L19.3745 19.4328L17.28 17.6603H17.1385V17.8441L17.6197 18.5531L20.1812 22.4003L20.3086 23.582L20.1246 23.9628L19.4595 24.1991L19.0915 24.1466L18.7377 24.0678L18.4263 23.7921L17.2234 21.9539L15.6808 19.5904L14.4354 17.4633H14.3892C14.3352 17.4633 14.29 17.5044 14.285 17.5583L13.5438 25.4728L13.2041 25.8798L12.5107 26.1818H12.4116L11.7464 25.6829L11.3926 24.8688L11.7464 23.2538L12.171 21.1529L12.5107 19.4854L12.822 17.4108L13.0122 16.7177C13.0169 16.7003 13.0102 16.6817 12.9954 16.6714C12.9462 16.6372 12.8787 16.6485 12.8435 16.6969L11.2794 18.842L8.90182 22.0589L7.01956 24.0678L6.56668 24.2517H6.22703L5.78831 23.8446V23.6477L5.85907 23.1225L6.29779 22.4791L8.90182 19.1702L10.4727 17.1088L11.4852 15.9255C11.5284 15.875 11.524 15.7995 11.4753 15.7543C11.46 15.7401 11.4369 15.7381 11.4194 15.7495L4.50044 20.2601L3.26919 20.4176L2.7314 19.9187L2.80216 19.1046L3.0569 18.842L5.1373 17.4108Z"
            fill="#d97757"
          />
          <path
            d="M42.1645 22.1146C38.8622 22.1146 36.6001 20.2786 35.534 17.46C34.9879 16.0637 34.7279 14.538 34.7279 12.8572C34.7279 8.12507 36.8601 4.84103 41.5664 4.84103C44.7387 4.84103 46.6888 6.21153 47.8069 9.49557H49.159L48.977 4.97032C47.0788 3.75497 44.7127 3.13436 41.8264 3.13436C37.7701 3.13436 34.3119 4.94446 32.3877 8.20264C31.4257 9.83173 30.9316 11.7194 30.9316 13.8657C30.9316 17.4859 32.6478 20.6923 35.872 22.4766C37.4841 23.3816 39.4083 23.8212 41.6184 23.8212C44.7647 23.8212 47.2608 23.2265 49.471 22.1921L50.043 17.2014H48.6649C47.8329 19.477 46.8448 20.8475 45.2067 21.5715C44.4006 21.9336 43.3866 22.1146 42.1645 22.1146ZM56.4135 4.84103L56.5435 2.61719H55.6075L51.4472 3.8584V4.53072L53.2933 5.38406V20.9509C53.2933 22.0111 52.7472 22.2439 51.3171 22.4249V23.5626H58.3897V22.4249C56.9596 22.2439 56.4135 22.0111 56.4135 20.9509V4.84103ZM84.5476 23.8212H85.0936L89.878 22.9162V21.7525L89.2019 21.7008C88.0839 21.5974 87.7978 21.3647 87.7978 20.4596V12.159L87.9278 9.49557H87.1738L82.6495 10.142V11.2798L83.0915 11.3574C84.3136 11.5384 84.6776 11.8746 84.6776 12.7279V20.1235C83.5075 21.0285 82.3894 21.5974 81.0633 21.5974C79.5812 21.5974 78.6712 20.8475 78.6712 19.115V12.159L78.8012 9.49557H78.0211L73.4968 10.142V11.2798L73.9648 11.3574C75.1869 11.5384 75.5509 11.8746 75.5509 12.7279V19.5546C75.5509 22.4507 77.1891 23.8212 79.8152 23.8212C81.8174 23.8212 83.4555 22.761 84.6776 21.2871L84.5476 23.8212ZM71.3906 14.6156C71.3906 10.9178 69.4145 9.49557 65.8522 9.49557C62.706 9.49557 60.4178 10.7885 60.4178 12.9348C60.4178 13.5812 60.6518 14.0725 61.1199 14.4087L63.512 14.0984C63.408 13.3744 63.356 12.9348 63.356 12.7538C63.356 11.5384 64.0061 10.9178 65.3322 10.9178C67.2823 10.9178 68.2704 12.2883 68.2704 14.4863V15.2103L63.33 16.6843C61.6919 17.1239 60.7558 17.5117 60.1318 18.4168C59.8198 18.8822 59.6638 19.5028 59.6638 20.2527C59.6638 22.3473 61.1199 23.8212 63.59 23.8212C65.3842 23.8212 66.9703 23.0196 68.3484 21.494C68.8424 23.0196 69.5965 23.8212 70.9486 23.8212C72.0407 23.8212 73.0287 23.3816 73.9128 22.5283L73.6528 21.6232C73.2628 21.7267 72.8987 21.7784 72.5087 21.7784C71.7547 21.7784 71.3906 21.1837 71.3906 20.02V14.6156ZM65.0722 21.7267C63.7201 21.7267 62.888 20.9509 62.888 19.5804C62.888 18.6495 63.33 18.1065 64.2661 17.7962L68.2704 16.5291V20.3562C66.9963 21.3129 66.2422 21.7267 65.0722 21.7267ZM106.727 22.9162V21.7525L106.051 21.7008C104.933 21.5974 104.647 21.3647 104.647 20.4596V4.84103L104.777 2.61719H103.841L99.6807 3.8584V4.53072L101.527 5.38406V10.5041C100.617 9.83173 99.4207 9.49557 97.9906 9.49557C93.8563 9.49557 90.632 12.6245 90.632 17.3049C90.632 21.1578 92.9462 23.8212 96.7685 23.8212C98.7446 23.8212 100.461 22.8645 101.527 21.3905L101.397 23.8212H101.943L106.727 22.9162ZM98.0686 11.0471C100.045 11.0471 101.527 12.1849 101.527 14.2794V20.1752C100.695 21.0285 99.4727 21.5457 98.0946 21.5457C95.2604 21.5457 93.8303 19.3218 93.8303 16.3481C93.8303 13.0123 95.4684 11.0471 98.0686 11.0471ZM116.842 13.995C116.478 12.2624 115.412 11.2798 113.93 11.2798C111.72 11.2798 110.185 12.9348 110.185 15.3138C110.185 18.8305 112.058 21.1061 115.074 21.1061C117.076 21.1061 118.974 19.9683 119.936 18.2616L120.82 18.4944C120.43 21.5457 117.648 23.8212 114.242 23.8212C110.237 23.8212 107.481 20.8734 107.481 16.6843C107.481 12.4693 110.472 9.49557 114.476 9.49557C117.466 9.49557 119.572 11.2798 120.248 14.3828L109.821 17.5635V16.1671L116.842 13.995Z"
            fill="var(--text, #141413)"
          />
        </svg>
      </div>
    </div>
  );
}
