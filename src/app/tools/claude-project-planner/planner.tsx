"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ─── Types ─── */

interface FormData {
  workflowName: string;
  department: string;
  outputType: string;
  audience: string;
  inputFields: string;
  referenceFiles: string[];
  rules: string;
  length: string;
  tone: string;
  mustInclude: string;
}

const INITIAL: FormData = {
  workflowName: "",
  department: "",
  outputType: "",
  audience: "",
  inputFields: "",
  referenceFiles: [],
  rules: "",
  length: "",
  tone: "",
  mustInclude: "",
};

/* ─── Options ─── */

const DEPARTMENTS = [
  "Sales", "Marketing", "Customer Service", "Operations", "Finance",
  "HR", "Legal", "IT", "Executive", "Procurement", "Quality",
];

const OUTPUT_TYPES = [
  "Document", "Email", "Report", "Analysis", "Checklist", "Template", "Other",
];

const AUDIENCES = [
  "Internal team", "Clients/customers", "Vendors/partners", "Leadership", "Regulators",
];

const REFERENCE_FILES = [
  "Company policies", "Product catalog", "Pricing sheets", "Templates/examples",
  "SOPs/procedures", "Customer data", "Industry regulations", "None — I'll describe it",
];

const LENGTHS: Record<string, string> = {
  short: "Short (1 paragraph)",
  medium: "Medium (half page)",
  long: "Long (full page)",
  detailed: "Detailed (multi-page)",
};

const TONES = ["Formal", "Professional", "Conversational", "Technical"];

const TOTAL_STEPS = 3;

/* ─── Helpers ─── */

function computeComplexity(data: FormData) {
  const fileCount = data.referenceFiles.filter((f) => f !== "None — I'll describe it").length;
  const isExternal = data.audience === "Clients/customers" || data.audience === "Regulators" || data.audience === "Vendors/partners";
  const isLong = data.length === "long" || data.length === "detailed";
  const hasRegulations = data.referenceFiles.includes("Industry regulations");

  if ((fileCount >= 5 && isLong) || (fileCount >= 5 && isExternal) || (isLong && isExternal && hasRegulations)) {
    return "advanced" as const;
  }
  if (fileCount >= 3 || isLong || isExternal) return "medium" as const;
  return "simple" as const;
}

const COMPLEXITY_META = {
  simple: { label: "Simple", description: "1-2 knowledge files, short output, internal audience", time: "1-2 hours with Settle" },
  medium: { label: "Medium", description: "3-4 knowledge files, medium output, mixed audience", time: "Half day with Settle" },
  advanced: { label: "Advanced", description: "5+ knowledge files, long output, external audience, regulations", time: "1-2 days with Settle" },
};

function buildInstructionOutline(data: FormData): string {
  const inputDesc = data.inputFields.trim() ? data.inputFields.trim() : "the relevant details";
  const sections = data.mustInclude.trim() ? ` The output must include: ${data.mustInclude.trim()}.` : "";
  const lengthLabel = LENGTHS[data.length]?.split(" (")[0]?.toLowerCase() ?? "medium-length";
  return `You are a ${data.department.toLowerCase()} assistant. When given ${inputDesc}, produce a ${lengthLabel} ${data.outputType.toLowerCase()} for ${data.audience.toLowerCase()}. Use a ${data.tone.toLowerCase()} tone.${sections}`;
}

function buildSafetyRules(data: FormData): string[] {
  const rules: string[] = [];
  if (data.rules.trim()) {
    data.rules.split(/\n|;|,/).map((r) => r.trim()).filter(Boolean).forEach((r) => rules.push(r));
  }
  rules.push("Flag uncertainty rather than guessing");
  if (data.audience === "Clients/customers" || data.audience === "Regulators") {
    rules.push("Include review gate — human approval required before sending");
  }
  return rules;
}

function buildBlueprintText(data: FormData): string {
  const complexity = computeComplexity(data);
  const meta = COMPLEXITY_META[complexity];
  const safetyRules = buildSafetyRules(data);
  const knowledgeFiles = data.referenceFiles.filter((f) => f !== "None — I'll describe it");

  let text = `CLAUDE PROJECT BLUEPRINT\n========================\n\n`;
  text += `Project: ${data.workflowName}\nDepartment: ${data.department}\nOutput type: ${data.outputType}\nAudience: ${data.audience}\n\n`;
  text += `INSTRUCTION OUTLINE\n${buildInstructionOutline(data)}\n\n`;
  text += `KNOWLEDGE FILES NEEDED\n`;
  if (knowledgeFiles.length > 0) knowledgeFiles.forEach((f) => (text += `- ${f}\n`));
  else text += `- None selected (describe context directly in instructions)\n`;
  text += `\nSAFETY RULES\n`;
  safetyRules.forEach((r) => (text += `- ${r}\n`));
  text += `\nCOMPLEXITY: ${meta.label}\n${meta.description}\n\nESTIMATED SETUP TIME: ${meta.time}\n`;
  return text;
}

/* ─── Shared styles ─── */

const selectCls = "w-full rounded-lg border border-border-light bg-transparent px-4 py-3 text-[0.9375rem] text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 appearance-none cursor-pointer";
const inputCls = "w-full rounded-lg border border-border-light bg-transparent px-4 py-3 text-[0.9375rem] text-text placeholder:text-text-faint outline-none focus:border-accent focus:ring-1 focus:ring-accent/30";
const textareaCls = `${inputCls} resize-none`;
const labelCls = "block text-[0.9375rem] font-medium text-text mb-2";

/* ─── Select wrapper (stable, outside component) ─── */

function SelectField({ value, onChange, placeholder, options, id }: {
  value: string; onChange: (v: string) => void; placeholder: string; options: string[]; id?: string;
}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/* ─── Component ─── */

export function Planner() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [copied, setCopied] = useState(false);

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) =>
      setData((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const toggleRef = useCallback((file: string) => {
    setData((prev) => {
      const has = prev.referenceFiles.includes(file);
      const next = has ? prev.referenceFiles.filter((f) => f !== file) : [...prev.referenceFiles, file];
      return { ...prev, referenceFiles: next };
    });
  }, []);

  const canAdvance = (): boolean => {
    if (step === 0) return data.workflowName.trim() !== "" && data.department !== "" && data.outputType !== "" && data.audience !== "";
    if (step === 1) return true;
    if (step === 2) return data.length !== "" && data.tone !== "";
    return true;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildBlueprintText(data));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  const reset = () => { setData(INITIAL); setStep(0); setCopied(false); };

  /* ─── Results view ─── */
  if (step >= TOTAL_STEPS) {
    const complexity = computeComplexity(data);
    const meta = COMPLEXITY_META[complexity];
    const safetyRules = buildSafetyRules(data);
    const knowledgeFiles = data.referenceFiles.filter((f) => f !== "None — I'll describe it");
    const instruction = buildInstructionOutline(data);
    const complexityColor = complexity === "simple" ? "text-green-700 bg-green-50 border-green-200" : complexity === "medium" ? "text-amber-700 bg-amber-50 border-amber-200" : "text-red-700 bg-red-50 border-red-200";

    return (
      <div>
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-text font-heading mb-1">Your Claude Project Blueprint</h2>
        <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-8">Here is everything you need to set up this project in Claude.</p>

        <div className="border border-border-light rounded-xl bg-[#fdfcfa] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text font-heading mb-3">Project: {data.workflowName}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.875rem] text-text-muted">
              <span><strong className="text-text">Department:</strong> {data.department}</span>
              <span><strong className="text-text">Output:</strong> {data.outputType}</span>
              <span><strong className="text-text">Audience:</strong> {data.audience}</span>
            </div>
          </div>

          <hr className="border-border-light" />

          <div>
            <h4 className="text-[0.9375rem] font-semibold text-text mb-2">Instruction Outline</h4>
            <p className="text-[0.875rem] text-text-muted leading-relaxed bg-transparent rounded-lg px-4 py-3 border border-border-light">{instruction}</p>
          </div>

          <div>
            <h4 className="text-[0.9375rem] font-semibold text-text mb-2">Knowledge Files Needed</h4>
            {knowledgeFiles.length > 0 ? (
              <ul className="space-y-1">
                {knowledgeFiles.map((f) => <li key={f} className="text-[0.875rem] text-text-muted flex items-start gap-2"><span className="text-accent mt-0.5">-</span>{f}</li>)}
              </ul>
            ) : (
              <p className="text-[0.875rem] text-text-faint">None selected — describe context directly in the project instructions.</p>
            )}
          </div>

          <div>
            <h4 className="text-[0.9375rem] font-semibold text-text mb-2">Safety Rules</h4>
            <ul className="space-y-1">
              {safetyRules.map((r) => <li key={r} className="text-[0.875rem] text-text-muted flex items-start gap-2"><span className="text-accent mt-0.5">-</span>{r}</li>)}
            </ul>
          </div>

          <hr className="border-border-light" />

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <h4 className="text-[0.9375rem] font-semibold text-text mb-2">Complexity Rating</h4>
              <span className={`inline-block text-[0.8125rem] font-semibold px-3 py-1 rounded-full border ${complexityColor}`}>{meta.label}</span>
              <p className="text-[0.8125rem] text-text-faint mt-1.5">{meta.description}</p>
            </div>
            <div className="flex-1 min-w-[180px]">
              <h4 className="text-[0.9375rem] font-semibold text-text mb-2">Estimated Setup Time</h4>
              <span className="text-[0.9375rem] font-heading font-semibold text-text">{meta.time}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={handleCopy} className="px-5 py-2.5 rounded-lg border border-border-light text-[0.9375rem] font-medium text-text hover:border-accent/40 transition-colors cursor-pointer">
            {copied ? "Copied" : "Copy blueprint"}
          </button>
          <button type="button" onClick={reset} className="px-5 py-2.5 rounded-lg border border-border-light text-[0.9375rem] font-medium text-text-muted hover:border-accent/40 transition-colors cursor-pointer">
            Start over
          </button>
        </div>

        <div className="mt-10 space-y-4">
          <Link href="/#contact" className="block w-full text-center px-6 py-3 rounded-lg bg-accent text-white text-[0.9375rem] font-semibold hover:opacity-90 transition-opacity">
            Want Settle to build this project (and more) for your team?
          </Link>
          <Link href="/blog/orient-case-study" className="block text-center text-[0.875rem] text-text-muted hover:text-accent transition-colors">
            This is one project. Settle typically maps 15-49 use cases per company.
          </Link>
        </div>
      </div>
    );
  }

  /* ─── Steps view ─── */
  return (
    <div>
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => i < step && setStep(i)}
            disabled={i >= step && step < TOTAL_STEPS}
            aria-label={`Step ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              i === step ? "bg-accent" : i < step ? "bg-accent/40 cursor-pointer hover:bg-accent/60" : "bg-border-light"
            }`}
          />
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text font-heading mb-1">What&apos;s the workflow?</h2>
          <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-6">Describe the task you want Claude to help with.</p>
          <div>
            <label htmlFor="workflowName" className={labelCls}>Workflow name</label>
            <input id="workflowName" type="text" value={data.workflowName} onChange={(e) => set("workflowName", e.target.value)} placeholder="e.g., Customer proposal generation" className={inputCls} />
          </div>
          <div>
            <label htmlFor="department" className={labelCls}>Department</label>
            <SelectField id="department" value={data.department} onChange={(v) => set("department", v)} placeholder="Select department" options={DEPARTMENTS} />
          </div>
          <div>
            <label htmlFor="outputType" className={labelCls}>What&apos;s the output?</label>
            <SelectField id="outputType" value={data.outputType} onChange={(v) => set("outputType", v)} placeholder="Select output type" options={OUTPUT_TYPES} />
          </div>
          <div>
            <label htmlFor="audience" className={labelCls}>Who uses the output?</label>
            <SelectField id="audience" value={data.audience} onChange={(v) => set("audience", v)} placeholder="Select audience" options={AUDIENCES} />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text font-heading mb-1">What does Claude need to know?</h2>
          <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-6">Help Claude understand what goes in and what rules to follow.</p>
          <div>
            <label htmlFor="inputFields" className={labelCls}>What information does the user provide each time?</label>
            <textarea id="inputFields" value={data.inputFields} onChange={(e) => set("inputFields", e.target.value)} placeholder="e.g., Customer name, product specs, pricing tier" rows={3} className={textareaCls} />
          </div>
          <div>
            <span className={labelCls}>What reference materials does Claude need?</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {REFERENCE_FILES.map((file) => (
                <label key={file} className="flex items-center gap-3 rounded-lg border border-border-light px-4 py-3 cursor-pointer hover:border-accent/40 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                  <input type="checkbox" checked={data.referenceFiles.includes(file)} onChange={() => toggleRef(file)} className="accent-accent w-4 h-4 rounded" />
                  <span className="text-[0.875rem] text-text">{file}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="rules" className={labelCls}>Are there rules Claude must follow?</label>
            <textarea id="rules" value={data.rules} onChange={(e) => set("rules", e.target.value)} placeholder="e.g., Never promise delivery dates, always include disclaimer, use formal tone" rows={3} className={textareaCls} />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text font-heading mb-1">What does good output look like?</h2>
          <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-6">Define the shape and style of the final result.</p>
          <div>
            <label htmlFor="length" className={labelCls}>Expected length</label>
            <div className="relative">
              <select id="length" value={data.length} onChange={(e) => set("length", e.target.value)} className={selectCls}>
                <option value="" disabled>Select expected length</option>
                {Object.entries(LENGTHS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
            </div>
          </div>
          <div>
            <label htmlFor="tone" className={labelCls}>Tone</label>
            <SelectField id="tone" value={data.tone} onChange={(v) => set("tone", v)} placeholder="Select tone" options={TONES} />
          </div>
          <div>
            <label htmlFor="mustInclude" className={labelCls}>Must-include sections</label>
            <textarea id="mustInclude" value={data.mustInclude} onChange={(e) => set("mustInclude", e.target.value)} placeholder="e.g., Executive summary, pricing table, next steps" rows={3} className={textareaCls} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-[0.9375rem] font-medium text-text-muted hover:text-text transition-colors cursor-pointer">&larr; Back</button>
        ) : <span />}
        <button
          type="button"
          disabled={!canAdvance()}
          onClick={() => setStep(step + 1)}
          className="px-6 py-2.5 rounded-lg bg-accent text-white text-[0.9375rem] font-semibold transition-opacity disabled:opacity-40 hover:opacity-90 cursor-pointer"
        >
          {step === TOTAL_STEPS - 1 ? "Generate blueprint" : "Continue"}
        </button>
      </div>
    </div>
  );
}
