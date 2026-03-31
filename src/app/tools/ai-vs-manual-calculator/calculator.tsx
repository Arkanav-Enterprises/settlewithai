"use client";

import { useState, useMemo } from "react";

/* ── Preset tasks with manual and AI times in minutes ── */

interface PresetTask {
  label: string;
  manualMinutes: number;
  aiMinutes: number;
}

const PRESET_TASKS: PresetTask[] = [
  { label: "Sales proposal", manualMinutes: 180, aiMinutes: 45 },
  { label: "Monthly financial report", manualMinutes: 360, aiMinutes: 90 },
  { label: "Customer email response", manualMinutes: 15, aiMinutes: 3 },
  { label: "Job description", manualMinutes: 60, aiMinutes: 10 },
  { label: "Meeting summary", manualMinutes: 30, aiMinutes: 5 },
  { label: "Product description", manualMinutes: 45, aiMinutes: 8 },
  { label: "Contract review summary", manualMinutes: 120, aiMinutes: 30 },
  { label: "RFQ / vendor comparison", manualMinutes: 240, aiMinutes: 60 },
  { label: "Training documentation", manualMinutes: 300, aiMinutes: 60 },
  { label: "Compliance checklist", manualMinutes: 120, aiMinutes: 25 },
];

const CUSTOM_KEY = "__custom__";

/* ── Helpers ── */

function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function formatHours(totalMinutes: number): string {
  const hours = totalMinutes / 60;
  if (hours < 1) return `${Math.round(totalMinutes)}m`;
  return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`;
}

/* ── Component ── */

export function Calculator() {
  const [selectedTask, setSelectedTask] = useState(PRESET_TASKS[0].label);
  const [customHours, setCustomHours] = useState(1);
  const [customMinutes, setCustomMinutes] = useState(0);
  const [frequency, setFrequency] = useState(4);
  const [people, setPeople] = useState(2);

  const isCustom = selectedTask === CUSTOM_KEY;

  const { manualMinutes, aiMinutes } = useMemo(() => {
    if (isCustom) {
      const manual = customHours * 60 + customMinutes;
      // AI estimate: 75% reduction for custom tasks (conservative middle ground)
      const ai = Math.max(Math.round(manual * 0.25), 1);
      return { manualMinutes: manual, aiMinutes: ai };
    }
    const preset = PRESET_TASKS.find((t) => t.label === selectedTask);
    return preset
      ? { manualMinutes: preset.manualMinutes, aiMinutes: preset.aiMinutes }
      : { manualMinutes: 60, aiMinutes: 15 };
  }, [selectedTask, isCustom, customHours, customMinutes]);

  const monthlyManual = manualMinutes * frequency * people;
  const monthlyAi = aiMinutes * frequency * people;
  const annualManual = monthlyManual * 12;
  const annualAi = monthlyAi * 12;
  const annualSavedMinutes = annualManual - annualAi;
  const annualSavedHours = annualSavedMinutes / 60;
  const percentReduction =
    manualMinutes > 0
      ? Math.round(((manualMinutes - aiMinutes) / manualMinutes) * 100)
      : 0;
  const workWeeksFreed = annualSavedHours / 40;
  const aiBarWidth =
    manualMinutes > 0 ? Math.max((aiMinutes / manualMinutes) * 100, 4) : 4;

  return (
    <div className="space-y-10">
      {/* ── Task selection ── */}
      <section>
        <label className="block text-sm font-medium text-text mb-2">
          Select a task
        </label>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="w-full border border-border-light rounded-lg px-4 py-3 text-[0.9375rem] text-text bg-transparent focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
        >
          {PRESET_TASKS.map((t) => (
            <option key={t.label} value={t.label}>
              {t.label} — {formatTime(t.manualMinutes)} manual,{" "}
              {formatTime(t.aiMinutes)} with AI
            </option>
          ))}
          <option value={CUSTOM_KEY}>Custom task...</option>
        </select>

        {isCustom && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-text mb-2">
              How long does this task take manually?
            </label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={customHours}
                  onChange={(e) =>
                    setCustomHours(
                      Math.max(0, Math.min(24, Number(e.target.value)))
                    )
                  }
                  className="w-20 border border-border-light rounded-lg px-3 py-2.5 text-[0.9375rem] text-text bg-transparent focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-sm text-text-muted">hours</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={customMinutes}
                  onChange={(e) =>
                    setCustomMinutes(
                      Math.max(0, Math.min(59, Number(e.target.value)))
                    )
                  }
                  className="w-20 border border-border-light rounded-lg px-3 py-2.5 text-[0.9375rem] text-text bg-transparent focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-sm text-text-muted">minutes</span>
              </div>
            </div>
            <p className="text-xs text-text-faint mt-2">
              AI time estimated at 75% reduction (conservative average)
            </p>
          </div>
        )}
      </section>

      {/* ── Frequency & team size ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Times per month
          </label>
          <input
            type="number"
            min={1}
            max={200}
            value={frequency}
            onChange={(e) =>
              setFrequency(Math.max(1, Math.min(200, Number(e.target.value))))
            }
            className="w-full border border-border-light rounded-lg px-4 py-3 text-[0.9375rem] text-text bg-transparent focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            People doing this task
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={people}
            onChange={(e) =>
              setPeople(Math.max(1, Math.min(50, Number(e.target.value))))
            }
            className="w-full border border-border-light rounded-lg px-4 py-3 text-[0.9375rem] text-text bg-transparent focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </section>

      {/* ── Side-by-side comparison cards ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Manual card */}
        <div className="border border-border-light rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-faint mb-4">
            Manual
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted mb-1">Per task</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatTime(manualMinutes)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Monthly total</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatHours(monthlyManual)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Annual total</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatHours(annualManual)}
              </p>
            </div>
          </div>
        </div>

        {/* AI card */}
        <div className="border border-accent/30 rounded-2xl p-6 shadow-sm bg-accent-soft/30">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            With Claude AI
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted mb-1">Per task</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatTime(aiMinutes)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Monthly total</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatHours(monthlyAi)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Annual total</p>
              <p className="text-2xl font-semibold text-text font-heading tracking-[-0.02em]">
                {formatHours(annualAi)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual bar comparison ── */}
      <section>
        <p className="text-sm text-text-muted mb-3">Time per task comparison</p>
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-faint">Manual</span>
              <span className="text-xs text-text-faint">
                {formatTime(manualMinutes)}
              </span>
            </div>
            <div className="h-3 bg-text/15 rounded-full w-full" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-accent">With AI</span>
              <span className="text-xs text-accent">
                {formatTime(aiMinutes)}
              </span>
            </div>
            <div className="h-3 bg-border-light rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${aiBarWidth}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Key metrics ── */}
      <section className="text-center py-8 border border-border-light rounded-2xl shadow-sm">
        <p className="text-sm text-text-muted mb-2">Hours saved per year</p>
        <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-semibold text-accent font-heading tracking-[-0.03em] leading-none">
          {annualSavedHours.toFixed(annualSavedHours >= 10 ? 0 : 1)}
        </p>
        <p className="text-sm text-text-muted mt-3">
          {percentReduction}% reduction
        </p>
        <p className="text-text-muted text-[0.9375rem] mt-4 max-w-sm mx-auto">
          That&apos;s equivalent to{" "}
          <span className="font-semibold text-text">
            {workWeeksFreed.toFixed(1)} work weeks
          </span>{" "}
          freed up per year
        </p>
      </section>

      {/* ── Reference ── */}
      <section className="border-l-2 border-accent/40 pl-5 py-1">
        <p className="text-[0.9375rem] text-text-muted leading-relaxed">
          At Orient Printing, document generation went from 4 hours to 30
          minutes — an 87.5% reduction.
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="bg-accent rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2 font-heading">
          Ready to see these savings across your whole operation?
        </h3>
        <p className="text-white/70 text-[0.9375rem] mb-6 max-w-md mx-auto">
          Settle maps every repeatable workflow in your business and deploys
          Claude AI where it has the most impact.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
        >
          Book a Discovery Call
          <span aria-hidden="true">&rarr;</span>
        </a>
      </section>
    </div>
  );
}
