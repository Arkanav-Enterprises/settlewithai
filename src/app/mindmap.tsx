"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

/* ─── Data ──────────────────────────────────────────────── */

/* Tooltip descriptions for every child node.
   Written for SMB owners who don't speak AI — plain verbs, no jargon. */
const nodeDescriptions: Record<string, string> = {
  // The audit
  "Watch every team":
    "Spend a day with each department. Watch how work actually gets done, not how your org chart says it does.",
  "Find what to automate":
    "Rank every repetitive task by time saved and difficulty. Quick wins first.",
  "Phase the launch":
    "Map out the first 30 / 60 / 90 days. What goes live when, and who\u2019s ready for it.",
  "Flag what to avoid":
    "Call out the tasks AI shouldn\u2019t touch \u2014 compliance issues, missing data, culture pushback \u2014 before they stall the project.",
  // Teaching the AI
  "Write the rules":
    "Turn your SOPs and tribal knowledge into instructions the AI follows every time \u2014 the way your best employee would.",
  "Feed it your SOPs":
    "Give the AI access to your templates, contracts, specs, and past work, so its answers are grounded in how you do things.",
  "Set the hard limits":
    "The stuff AI should never touch \u2014 customer data, pricing overrides, anything regulated \u2014 made explicit upfront.",
  "Match your templates":
    "Every output matches your internal format. No stray asterisks, no weird headings, no generic consultant voice.",
  // Rolling it out
  "One dashboard":
    "Every project, every team, every blocker \u2014 on one screen. No more \u201chow\u2019s the AI thing going\u201d meetings.",
  "What launched":
    "At a glance: which tools are in production, which department is using what, who got it live.",
  "Who needs help":
    "See who\u2019s been onboarded, who\u2019s still hesitant, and where to run a refresher.",
  "What stalled":
    "Surface the projects that are drifting \u2014 missing data, unclear owner, lost momentum \u2014 before they die quietly.",
  // Training your team
  "Set up the tools":
    "We install it, connect it to your systems, and make sure it works before your team touches it.",
  "Write it down":
    "Short, plain-language guides and cheat sheets so nobody has to remember what to type.",
  "Train every user":
    "We sit with people one-on-one if we have to. The bar is: everyone\u2019s comfortable, not just the early adopters.",
  "Check back monthly":
    "We come back every month to see what\u2019s working, what isn\u2019t, and tune it as your business changes.",
};

/* Keep the old type for compatibility but we won't use images/urls */
const tooltipItems: Record<string, { heading: string; body: string; image: string; url: string }> = {};

const categories: Record<string, { items: string[] }> = {
  "The audit": {
    items: [
      "Watch every team",
      "Find what to automate",
      "Phase the launch",
      "Flag what to avoid",
    ],
  },
  "Teaching the AI": {
    items: [
      "Write the rules",
      "Feed it your SOPs",
      "Set the hard limits",
      "Match your templates",
    ],
  },
  "Rolling it out": {
    items: ["One dashboard", "What launched", "Who needs help", "What stalled"],
  },
  "Training your team": {
    items: [
      "Set up the tools",
      "Write it down",
      "Train every user",
      "Check back monthly",
    ],
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

export default function Mindmap({ className = "", highlightCategory }: { className?: string; highlightCategory?: string | null }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
  const nodesRef = useRef<MindmapNode[]>([]);

  /* Highlight effect — dims nodes not in the highlighted category */
  useEffect(() => {
    const svg = svgRef.current;
    const nodes = nodesRef.current;
    if (!svg || nodes.length === 0) return;

    if (!highlightCategory) {
      // Reset all
      svg.selectAll<SVGCircleElement, MindmapNode>(".item-circle").transition().duration(300).attr("opacity", 0.8);
      svg.selectAll<SVGGElement, MindmapNode>(".item-label-group").transition().duration(300).attr("opacity", 1);
      svg.selectAll(".categories circle").transition().duration(300).attr("opacity", 0.9);
      svg.selectAll(".categories text").transition().duration(300).attr("opacity", 1);
      svg.selectAll<SVGLineElement, MindmapNode>(".links line").transition().duration(300)
        .attr("opacity", (d: MindmapNode) => d.type === "category" ? 0.6 : 0.4);
    } else {
      // Category circles/labels
      const catTextNodes = svg.selectAll(".categories text").nodes() as SVGTextElement[];
      const catCircleNodes = svg.selectAll(".categories circle").nodes() as SVGCircleElement[];
      catTextNodes.forEach((textEl, i) => {
        const match = textEl.textContent === highlightCategory;
        d3.select(textEl).transition().duration(300).attr("opacity", match ? 1 : 0.15);
        if (catCircleNodes[i]) d3.select(catCircleNodes[i]).transition().duration(300).attr("opacity", match ? 1 : 0.15);
      });

      // Items
      svg.selectAll<SVGCircleElement, MindmapNode>(".item-circle").transition().duration(300)
        .attr("opacity", (d: MindmapNode) => d.category === highlightCategory ? 0.9 : 0.1);
      svg.selectAll<SVGGElement, MindmapNode>(".item-label-group").transition().duration(300)
        .attr("opacity", (d: MindmapNode) => d.category === highlightCategory ? 1 : 0.1);

      // Lines
      svg.selectAll<SVGLineElement, MindmapNode>(".links line").transition().duration(300)
        .attr("opacity", (d: MindmapNode) => {
          if (d.type === "category") return d.name === highlightCategory ? 0.6 : 0.05;
          return d.category === highlightCategory ? 0.4 : 0.05;
        });
    }
  }, [highlightCategory]);

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

    /* Store refs for highlight effect */
    svgRef.current = svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>;
    nodesRef.current = nodes;

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
      const desc = nodeDescriptions[name];
      if (!desc) return;
      if (activeTooltips.includes(name)) {
        const ex = document.getElementById(`mm-tip-${name.toLowerCase().replace(/\s/g, "-")}`);
        if (ex) {
          positionTooltip(ex);
          ex.style.opacity = "1";
          ex.style.transform = "scale(1)";
        }
        return;
      }
      activeTooltips.push(name);
      const el = document.createElement("div");
      el.id = `mm-tip-${name.toLowerCase().replace(/\s/g, "-")}`;
      el.className = "mindmap-tooltip";
      el.innerHTML = `<h3>${name}</h3><p>${desc}</p>`;
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
      const el = document.getElementById(`mm-tip-${name.toLowerCase().replace(/\s/g, "-")}`);
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
        g.append("text")
          .text(d.name)
          .attr("font-size", "11px")
          .attr("font-weight", "400")
          .attr("font-family", "Geist, Inter, system-ui, sans-serif")
          .attr("text-anchor", "middle")
          .attr("x", d.x!)
          .attr("y", d.y! + 3)
          .attr("fill", fgTertiary)
          .style("cursor", nodeDescriptions[d.name] ? "pointer" : "default")
          .style("text-decoration", nodeDescriptions[d.name] ? "underline 0.5px rgba(20,20,19,0.2)" : "none")
          .style("text-underline-offset", "4px");
      });

      /* tooltip events — all nodes with descriptions */
      nodeGroup
        .selectAll<SVGGElement, MindmapNode>(".item-label-group")
        .on("mouseenter", (_event, d) => {
          if (nodeDescriptions[d.name]) showTooltip(d.name);
        })
        .on("mouseleave", (_event, d) => {
          if (nodeDescriptions[d.name]) hideTooltip(d.name);
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

    /* no image preload needed — tooltips are text-only */

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
        const el = document.getElementById(`mm-tip-${name.toLowerCase().replace(/\s/g, "-")}`);
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
        {/* Settle mark */}
        <svg viewBox="0 0 199 298" fill="none" className="w-full h-auto max-w-[80px]">
          <path d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576" stroke="var(--text, #141413)" strokeWidth="8.04054" strokeLinecap="round"/>
          <path d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021" stroke="var(--text, #141413)" strokeWidth="5.74324" strokeLinecap="round"/>
          <path d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237" stroke="var(--text, #141413)" strokeWidth="5.74324" strokeLinecap="round"/>
          <circle cx="106.507" cy="248.486" r="11.4865" fill="#D97757"/>
          <circle cx="187.507" cy="11.4865" r="11.4865" fill="#D97757"/>
          <circle cx="94.5065" cy="98.4865" r="11.4865" fill="#D97757"/>
        </svg>
      </div>
    </div>
  );
}
