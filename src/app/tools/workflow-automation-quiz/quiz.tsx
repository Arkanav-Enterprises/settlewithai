"use client";

import { useState } from "react";

/* ── Types ── */

interface Workflow {
  name: string;
  frequency: string;
  duration: string;
  structure: string;
  output: string;
  people: string;
}

interface ScoredWorkflow {
  workflow: Workflow;
  score: number;
  frequencyScore: number;
  durationScore: number;
  structureScore: number;
  outputScore: number;
  peopleScore: number;
  annualHoursSaved: number;
  verdict: string;
  recommendation: string;
}

/* ── Scoring Maps ── */

const FREQUENCY_SCORES: Record<string, number> = {
  Daily: 4,
  Weekly: 3,
  Monthly: 2,
  Quarterly: 1,
};

const DURATION_SCORES: Record<string, number> = {
  "15 min": 0.5,
  "30 min": 1,
  "1 hour": 2,
  "2+ hours": 3,
  "Half day+": 4,
};

const STRUCTURE_SCORES: Record<string, number> = {
  Freeform: 1,
  "Somewhat templated": 2,
  "Highly templated": 3,
  "Follows strict rules": 4,
};

const OUTPUT_SCORES: Record<string, number> = {
  Document: 4,
  Email: 3,
  Analysis: 3,
  "Data entry": 2,
  Other: 1,
};

const PEOPLE_SCORES: Record<string, number> = {
  "1": 1,
  "2-5": 2,
  "6-10": 3,
  "10+": 4,
};

/* ── Duration in hours for annual calculation ── */

const DURATION_HOURS: Record<string, number> = {
  "15 min": 0.25,
  "30 min": 0.5,
  "1 hour": 1,
  "2+ hours": 2.5,
  "Half day+": 4,
};

const FREQUENCY_ANNUAL: Record<string, number> = {
  Daily: 260, // 5 days × 52 weeks
  Weekly: 52,
  Monthly: 12,
  Quarterly: 4,
};

/* ── Helpers ── */

function emptyWorkflow(): Workflow {
  return {
    name: "",
    frequency: "",
    duration: "",
    structure: "",
    output: "",
    people: "",
  };
}

function scoreWorkflow(w: Workflow): ScoredWorkflow {
  const frequencyScore = FREQUENCY_SCORES[w.frequency] ?? 0;
  const durationScore = DURATION_SCORES[w.duration] ?? 0;
  const structureScore = STRUCTURE_SCORES[w.structure] ?? 0;
  const outputScore = OUTPUT_SCORES[w.output] ?? 0;
  const peopleScore = PEOPLE_SCORES[w.people] ?? 0;
  const score =
    frequencyScore + durationScore + structureScore + outputScore + peopleScore;

  // Annual hours saved: occurrences × duration × reduction factor
  const occurrences = FREQUENCY_ANNUAL[w.frequency] ?? 0;
  const hours = DURATION_HOURS[w.duration] ?? 0;
  // Reduction factor: higher structure = more automatable
  const reductionFactor =
    structureScore >= 4
      ? 0.8
      : structureScore >= 3
        ? 0.65
        : structureScore >= 2
          ? 0.45
          : 0.25;
  const annualHoursSaved = Math.round(occurrences * hours * reductionFactor);

  const verdict =
    score >= 15
      ? "High Priority"
      : score >= 10
        ? "Good Candidate"
        : "Lower Priority";

  const recommendation = getRecommendation(w, score, structureScore);

  return {
    workflow: w,
    score,
    frequencyScore,
    durationScore,
    structureScore,
    outputScore,
    peopleScore,
    annualHoursSaved,
    verdict,
    recommendation,
  };
}

function getRecommendation(
  w: Workflow,
  score: number,
  structureScore: number,
): string {
  if (score >= 15 && structureScore >= 3) {
    return "High frequency + structured output = perfect for Claude Projects with templated instructions.";
  }
  if (score >= 15 && w.output === "Document") {
    return "Document-heavy and frequent — ideal for automated generation with Claude and MCP integrations.";
  }
  if (score >= 15) {
    return "Strong automation candidate across the board. Deploy Claude with clear SOPs for fast ROI.";
  }
  if (score >= 10 && structureScore >= 3) {
    return "Structured enough for automation — start with a Claude Project and refine the template over time.";
  }
  if (score >= 10 && w.output === "Email") {
    return "Repetitive email workflows respond well to Claude drafting with human review in the loop.";
  }
  if (score >= 10) {
    return "Solid candidate. Document the workflow steps first, then automate with Claude for consistent output.";
  }
  if (structureScore <= 1) {
    return "Too freeform for full automation right now. Standardize the process first, then revisit.";
  }
  return "Lower priority for now, but could become a candidate once frequency or structure increases.";
}

function isWorkflowComplete(w: Workflow): boolean {
  return (
    w.name.trim() !== "" &&
    w.frequency !== "" &&
    w.duration !== "" &&
    w.structure !== "" &&
    w.output !== "" &&
    w.people !== ""
  );
}

/* ── Select Field Component ── */

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-muted mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 cursor-pointer ${
              value === opt
                ? "border-accent bg-accent-soft text-text"
                : "border-border-light hover:border-accent-border text-text-muted hover:text-text"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Workflow Card Component ── */

function WorkflowCard({
  index,
  workflow,
  onChange,
  onRemove,
  canRemove,
}: {
  index: number;
  workflow: Workflow;
  onChange: (w: Workflow) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  function update(field: keyof Workflow, value: string) {
    onChange({ ...workflow, [field]: value });
  }

  return (
    <div className="border border-border-light rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-faint">
          Workflow {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-text-faint hover:text-accent transition-colors cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">
          Workflow name
        </label>
        <input
          type="text"
          placeholder="e.g., Weekly sales report"
          value={workflow.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-2.5 text-[0.9375rem] text-text bg-transparent border border-border-light rounded-lg focus:outline-none focus:border-accent transition-colors placeholder:text-text-faint"
        />
      </div>

      <SelectField
        label="How often is it done?"
        value={workflow.frequency}
        options={Object.keys(FREQUENCY_SCORES)}
        onChange={(v) => update("frequency", v)}
      />

      <SelectField
        label="How long does it take?"
        value={workflow.duration}
        options={Object.keys(DURATION_SCORES)}
        onChange={(v) => update("duration", v)}
      />

      <SelectField
        label="How structured is it?"
        value={workflow.structure}
        options={Object.keys(STRUCTURE_SCORES)}
        onChange={(v) => update("structure", v)}
      />

      <SelectField
        label="What's the output?"
        value={workflow.output}
        options={Object.keys(OUTPUT_SCORES)}
        onChange={(v) => update("output", v)}
      />

      <SelectField
        label="How many people do it?"
        value={workflow.people}
        options={Object.keys(PEOPLE_SCORES)}
        onChange={(v) => update("people", v)}
      />
    </div>
  );
}

/* ── Score Bar Component ── */

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 20) * 100;
  const color =
    score >= 15 ? "#2d8a4e" : score >= 10 ? "#d97757" : "#8b7355";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 bg-border-light rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="text-sm font-semibold shrink-0 w-12 text-right"
        style={{ color }}
      >
        {score}/20
      </span>
    </div>
  );
}

/* ── Main Quiz Component ── */

export function WorkflowAutomationQuiz() {
  const [workflows, setWorkflows] = useState<Workflow[]>([emptyWorkflow()]);
  const [results, setResults] = useState<ScoredWorkflow[] | null>(null);

  function updateWorkflow(index: number, w: Workflow) {
    const next = [...workflows];
    next[index] = w;
    setWorkflows(next);
  }

  function removeWorkflow(index: number) {
    setWorkflows(workflows.filter((_, i) => i !== index));
  }

  function addWorkflow() {
    if (workflows.length < 5) {
      setWorkflows([...workflows, emptyWorkflow()]);
    }
  }

  function handleScore() {
    const complete = workflows.filter(isWorkflowComplete);
    if (complete.length === 0) return;
    const scored = complete.map(scoreWorkflow).sort((a, b) => b.score - a.score);
    setResults(scored);
  }

  function handleRestart() {
    setWorkflows([emptyWorkflow()]);
    setResults(null);
  }

  const completeCount = workflows.filter(isWorkflowComplete).length;
  const totalAnnualHours = results
    ? results.reduce((sum, r) => sum + r.annualHoursSaved, 0)
    : 0;

  if (results) {
    return (
      <div>
        {/* Summary */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-text mb-2 font-heading">
            Your Automation Scorecard
          </h2>
          <p className="text-text-muted text-[1rem] leading-relaxed max-w-lg mx-auto">
            {results.length} workflow{results.length > 1 ? "s" : ""} scored.{" "}
            {results[0].verdict === "High Priority"
              ? `"${results[0].workflow.name}" is your top automation candidate.`
              : `"${results[0].workflow.name}" scored highest at ${results[0].score}/20.`}
          </p>
          {totalAnnualHours > 0 && (
            <p className="text-text-faint text-sm mt-2">
              Estimated total hours saved annually: ~{totalAnnualHours}
            </p>
          )}
        </div>

        {/* Individual Results */}
        <div className="space-y-6 mb-10">
          {results.map((r, i) => {
            const verdictColor =
              r.score >= 15
                ? "#2d8a4e"
                : r.score >= 10
                  ? "#d97757"
                  : "#8b7355";

            return (
              <div
                key={i}
                className="border border-border-light rounded-xl p-6"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animation: "fadeSlideIn 0.4s ease-out both",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-text font-heading">
                      {r.workflow.name}
                    </h3>
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-[0.08em] mt-1"
                      style={{ color: verdictColor }}
                    >
                      {r.verdict}
                    </span>
                  </div>
                  <span className="text-text-faint text-sm shrink-0 ml-4">
                    ~{r.annualHoursSaved} hrs/yr saved
                  </span>
                </div>

                <ScoreBar score={r.score} />

                <p className="text-text-muted text-[0.9375rem] leading-relaxed mt-3">
                  {r.recommendation}
                </p>

                {/* Dimension breakdown */}
                <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-border-light">
                  {[
                    { label: "Freq", val: r.frequencyScore, max: 4 },
                    { label: "Time", val: r.durationScore, max: 4 },
                    { label: "Structure", val: r.structureScore, max: 4 },
                    { label: "Output", val: r.outputScore, max: 4 },
                    { label: "People", val: r.peopleScore, max: 4 },
                  ].map((d) => (
                    <div key={d.label} className="text-center">
                      <span className="block text-xs text-text-faint">
                        {d.label}
                      </span>
                      <span className="block text-sm font-medium text-text-muted mt-0.5">
                        {d.val}/{d.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-accent rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2 font-heading">
            Want Settle to map all your automatable workflows?
          </h3>
          <p className="text-white/70 text-[0.9375rem] mb-6 max-w-md mx-auto">
            A discovery call covers every department, not just the{" "}
            {results.length} workflow{results.length > 1 ? "s" : ""} you scored
            here. We identify your full automation surface and build a
            prioritized deployment plan.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Book a Discovery Call
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Restart */}
        <div className="text-center mt-8">
          <button
            onClick={handleRestart}
            className="text-sm text-text-faint hover:text-accent transition-colors cursor-pointer"
          >
            Score different workflows
          </button>
        </div>

        {/* Keyframe animation */}
        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6 mb-8">
        {workflows.map((w, i) => (
          <WorkflowCard
            key={i}
            index={i}
            workflow={w}
            onChange={(updated) => updateWorkflow(i, updated)}
            onRemove={() => removeWorkflow(i)}
            canRemove={workflows.length > 1}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        {workflows.length < 5 ? (
          <button
            type="button"
            onClick={addWorkflow}
            className="text-[0.9375rem] font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            + Add another workflow
          </button>
        ) : (
          <span className="text-sm text-text-faint">
            Maximum 5 workflows reached
          </span>
        )}

        <button
          type="button"
          onClick={handleScore}
          disabled={completeCount === 0}
          className={`text-[0.9375rem] font-medium px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
            completeCount > 0
              ? "bg-text text-bg hover:bg-[#30302e]"
              : "bg-border-light text-text-faint cursor-not-allowed"
          }`}
        >
          Score my workflows
        </button>
      </div>
    </div>
  );
}
