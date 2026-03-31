"use client";

import { useState } from "react";

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

const INDUSTRIES = [
  "Manufacturing",
  "Healthcare",
  "Legal",
  "Finance & Accounting",
  "Real Estate",
  "Professional Services",
  "Logistics",
  "Education",
  "Retail & E-commerce",
  "Construction",
  "Other",
] as const;

interface Department {
  id: string;
  label: string;
  color: string;
  timeDrains: string[];
  useCases: UseCase[];
}

interface UseCase {
  name: string;
  description: string;
  timeBefore: string;
  timeAfter: string;
  difficulty: "Quick Win" | "Medium" | "Advanced";
}

const DEPARTMENTS: Department[] = [
  {
    id: "sales",
    label: "Sales & Marketing",
    color: "#d97757",
    timeDrains: [
      "Writing proposals and pitch decks",
      "Lead follow-up and email sequences",
      "Competitive research and analysis",
      "CRM data entry and enrichment",
      "Quote and pricing generation",
    ],
    useCases: [
      { name: "Proposal drafting", description: "Generate tailored proposals from templates, past wins, and client context", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Quick Win" },
      { name: "Lead qualification emails", description: "Draft personalized outreach based on lead data and company research", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Quick Win" },
      { name: "Competitive analysis briefs", description: "Synthesize competitor positioning, pricing, and feature comparisons from public data", timeBefore: "6 hrs/month", timeAfter: "1 hr/month", difficulty: "Medium" },
      { name: "CRM data enrichment", description: "Clean, deduplicate, and enrich contact records with missing fields", timeBefore: "5 hrs/week", timeAfter: "1 hr/week", difficulty: "Medium" },
      { name: "Follow-up sequence generation", description: "Create multi-touch email sequences tailored to deal stage and buyer persona", timeBefore: "2 hrs/week", timeAfter: "20 min/week", difficulty: "Quick Win" },
      { name: "Quote generation", description: "Produce formatted quotes with line items, terms, and approval-ready language", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Medium" },
    ],
  },
  {
    id: "customer_service",
    label: "Customer Service",
    color: "#2d8a4e",
    timeDrains: [
      "Responding to repeat customer questions",
      "Summarizing tickets for escalation",
      "Writing customer-facing documentation",
      "Analyzing satisfaction surveys",
      "Training new support reps",
    ],
    useCases: [
      { name: "FAQ response drafting", description: "Generate accurate, on-brand responses to common customer inquiries", timeBefore: "6 hrs/week", timeAfter: "1 hr/week", difficulty: "Quick Win" },
      { name: "Ticket summarization", description: "Condense long ticket threads into clear summaries for escalation or handoff", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Quick Win" },
      { name: "Escalation draft preparation", description: "Write structured escalation notes with context, timeline, and recommended action", timeBefore: "2 hrs/week", timeAfter: "20 min/week", difficulty: "Quick Win" },
      { name: "Satisfaction survey analysis", description: "Parse open-ended survey responses into themes, sentiment scores, and action items", timeBefore: "8 hrs/month", timeAfter: "1.5 hrs/month", difficulty: "Medium" },
      { name: "Knowledge base updates", description: "Draft and revise help articles based on recent ticket patterns and product changes", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Medium" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    color: "#5b7fa5",
    timeDrains: [
      "Writing and updating SOPs",
      "Process documentation and mapping",
      "Incident and exception reporting",
      "Vendor communication and follow-ups",
      "Inventory and supply chain reporting",
    ],
    useCases: [
      { name: "SOP generation", description: "Draft standard operating procedures from process notes, interviews, or existing docs", timeBefore: "8 hrs/month", timeAfter: "1.5 hrs/month", difficulty: "Quick Win" },
      { name: "Process documentation", description: "Convert informal workflows into structured, versioned process documents", timeBefore: "6 hrs/month", timeAfter: "1 hr/month", difficulty: "Quick Win" },
      { name: "Incident report drafting", description: "Generate structured incident reports from raw notes with root cause templates", timeBefore: "2 hrs/week", timeAfter: "20 min/week", difficulty: "Quick Win" },
      { name: "Vendor communication", description: "Draft purchase orders, follow-up emails, and performance review communications", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Medium" },
      { name: "Inventory reporting narratives", description: "Turn raw inventory data into readable reports with variance callouts", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Medium" },
      { name: "Workflow optimization analysis", description: "Analyze process data to identify bottlenecks and recommend improvements", timeBefore: "10 hrs/month", timeAfter: "2 hrs/month", difficulty: "Advanced" },
    ],
  },
  {
    id: "finance",
    label: "Finance & Accounting",
    color: "#6b5b8a",
    timeDrains: [
      "Month-end reporting and commentary",
      "Variance analysis and explanations",
      "Audit preparation and documentation",
      "Expense report review",
      "Budget commentary and narratives",
    ],
    useCases: [
      { name: "Invoice processing narratives", description: "Generate descriptions and coding suggestions for incoming invoices", timeBefore: "5 hrs/week", timeAfter: "1 hr/week", difficulty: "Medium" },
      { name: "Variance analysis commentary", description: "Draft explanations for budget-vs-actual variances with contextual drivers", timeBefore: "6 hrs/month", timeAfter: "1 hr/month", difficulty: "Quick Win" },
      { name: "Audit preparation docs", description: "Compile supporting documentation, narratives, and checklists for audit requests", timeBefore: "20 hrs/quarter", timeAfter: "4 hrs/quarter", difficulty: "Medium" },
      { name: "Expense report review", description: "Flag policy violations, missing receipts, and unusual patterns in expense submissions", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Quick Win" },
      { name: "Budget commentary drafting", description: "Write executive-ready budget narratives from raw financial data", timeBefore: "8 hrs/month", timeAfter: "1.5 hrs/month", difficulty: "Quick Win" },
      { name: "Financial report generation", description: "Compile periodic financial summaries with key metrics and trend analysis", timeBefore: "6 hrs/month", timeAfter: "1 hr/month", difficulty: "Advanced" },
    ],
  },
  {
    id: "hr",
    label: "HR & People",
    color: "#8b6b4a",
    timeDrains: [
      "Writing job descriptions and postings",
      "Drafting offer letters and contracts",
      "Creating onboarding materials",
      "Updating policies and handbooks",
      "Performance review preparation",
    ],
    useCases: [
      { name: "Job description generation", description: "Create role-specific JDs with skills, responsibilities, and compliance language", timeBefore: "3 hrs/posting", timeAfter: "30 min/posting", difficulty: "Quick Win" },
      { name: "Offer letter drafting", description: "Generate personalized offer letters with correct compensation, benefits, and terms", timeBefore: "1.5 hrs/letter", timeAfter: "15 min/letter", difficulty: "Quick Win" },
      { name: "Onboarding checklist creation", description: "Build department-specific onboarding plans with tasks, timelines, and owners", timeBefore: "4 hrs/hire", timeAfter: "45 min/hire", difficulty: "Quick Win" },
      { name: "Policy update drafting", description: "Revise handbook sections with current regulations and company-specific language", timeBefore: "8 hrs/update", timeAfter: "1.5 hrs/update", difficulty: "Medium" },
      { name: "Performance review templates", description: "Generate review frameworks with role-aligned competencies and rating criteria", timeBefore: "2 hrs/cycle", timeAfter: "20 min/cycle", difficulty: "Quick Win" },
      { name: "Training material development", description: "Draft training guides, quizzes, and reference materials from subject matter input", timeBefore: "10 hrs/module", timeAfter: "2 hrs/module", difficulty: "Medium" },
    ],
  },
  {
    id: "legal",
    label: "Legal & Compliance",
    color: "#4a6b5b",
    timeDrains: [
      "Reviewing contracts and agreements",
      "Compliance checklist maintenance",
      "Drafting NDAs and standard agreements",
      "Regulatory filing support",
      "Legal research and case synthesis",
    ],
    useCases: [
      { name: "Contract review summaries", description: "Extract key terms, obligations, risks, and renewal dates from agreements", timeBefore: "4 hrs/contract", timeAfter: "45 min/contract", difficulty: "Medium" },
      { name: "Compliance checklist generation", description: "Build regulation-specific checklists with evidence requirements and deadlines", timeBefore: "6 hrs/checklist", timeAfter: "1 hr/checklist", difficulty: "Quick Win" },
      { name: "NDA drafting", description: "Generate NDAs with appropriate mutual/unilateral terms and jurisdiction-specific clauses", timeBefore: "2 hrs/NDA", timeAfter: "15 min/NDA", difficulty: "Quick Win" },
      { name: "Regulatory filing support", description: "Compile filing narratives, supporting documentation, and submission checklists", timeBefore: "12 hrs/filing", timeAfter: "3 hrs/filing", difficulty: "Advanced" },
      { name: "Case research synthesis", description: "Summarize relevant precedents, statutes, and regulatory guidance into briefing docs", timeBefore: "8 hrs/research", timeAfter: "2 hrs/research", difficulty: "Advanced" },
    ],
  },
  {
    id: "it",
    label: "IT & Engineering",
    color: "#5a7a8a",
    timeDrains: [
      "Writing and updating documentation",
      "Triaging bug reports and tickets",
      "Code review and PR summaries",
      "System status and incident reporting",
      "Vendor evaluation and comparisons",
    ],
    useCases: [
      { name: "Bug report triage", description: "Categorize, prioritize, and route incoming bug reports with suggested severity", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Quick Win" },
      { name: "Documentation generation", description: "Draft technical docs, API references, and runbooks from code and team notes", timeBefore: "6 hrs/week", timeAfter: "1.5 hrs/week", difficulty: "Medium" },
      { name: "Code review summaries", description: "Summarize PR changes, flag potential issues, and suggest review focus areas", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Medium" },
      { name: "System status reports", description: "Compile uptime metrics, incident summaries, and performance data into stakeholder reports", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Quick Win" },
      { name: "Vendor evaluation briefs", description: "Compare tools and platforms across features, pricing, security, and integration criteria", timeBefore: "10 hrs/evaluation", timeAfter: "2 hrs/evaluation", difficulty: "Medium" },
    ],
  },
  {
    id: "executive",
    label: "Executive / Leadership",
    color: "#7a5a4a",
    timeDrains: [
      "Board report preparation",
      "Strategic memo and briefing writing",
      "Meeting summarization and action items",
      "Stakeholder communication drafting",
      "Data synthesis for decision-making",
    ],
    useCases: [
      { name: "Board report drafts", description: "Compile departmental inputs into structured board-ready reports with key metrics", timeBefore: "12 hrs/quarter", timeAfter: "2 hrs/quarter", difficulty: "Medium" },
      { name: "Strategic memo synthesis", description: "Distill research, data, and team input into concise strategic recommendations", timeBefore: "6 hrs/memo", timeAfter: "1 hr/memo", difficulty: "Medium" },
      { name: "Meeting summary generation", description: "Transform meeting notes into structured summaries with decisions and action items", timeBefore: "3 hrs/week", timeAfter: "20 min/week", difficulty: "Quick Win" },
      { name: "Stakeholder communication", description: "Draft investor updates, partner communications, and internal announcements", timeBefore: "4 hrs/week", timeAfter: "45 min/week", difficulty: "Quick Win" },
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    color: "#6a7b5a",
    timeDrains: [
      "Creating RFQs and RFPs",
      "Vendor scoring and evaluation",
      "Contract comparison and analysis",
      "Purchase order documentation",
      "Supplier communication and follow-up",
    ],
    useCases: [
      { name: "RFQ generation", description: "Draft detailed requests for quotation with specs, timelines, and evaluation criteria", timeBefore: "4 hrs/RFQ", timeAfter: "45 min/RFQ", difficulty: "Quick Win" },
      { name: "Vendor scorecards", description: "Compile performance data into standardized vendor scorecards with trend analysis", timeBefore: "6 hrs/month", timeAfter: "1 hr/month", difficulty: "Medium" },
      { name: "Contract comparison", description: "Side-by-side analysis of vendor contracts highlighting terms, pricing, and risk differences", timeBefore: "5 hrs/comparison", timeAfter: "1 hr/comparison", difficulty: "Medium" },
      { name: "Purchase order documentation", description: "Generate POs with line items, delivery schedules, and approval routing", timeBefore: "3 hrs/week", timeAfter: "30 min/week", difficulty: "Quick Win" },
      { name: "Supplier follow-up sequences", description: "Draft delivery confirmations, payment status updates, and performance feedback", timeBefore: "2 hrs/week", timeAfter: "20 min/week", difficulty: "Quick Win" },
    ],
  },
  {
    id: "quality",
    label: "Quality & Safety",
    color: "#8a5a6b",
    timeDrains: [
      "Creating inspection checklists",
      "Writing audit documentation",
      "Drafting corrective action reports",
      "Updating training materials",
      "Compliance evidence gathering",
    ],
    useCases: [
      { name: "Inspection checklists", description: "Generate role-specific and equipment-specific inspection checklists with regulatory references", timeBefore: "4 hrs/checklist", timeAfter: "30 min/checklist", difficulty: "Quick Win" },
      { name: "Audit documentation", description: "Compile audit evidence, narratives, and findings into structured reports", timeBefore: "12 hrs/audit", timeAfter: "3 hrs/audit", difficulty: "Medium" },
      { name: "Corrective action reports", description: "Draft CAPA reports with root cause analysis templates and tracking requirements", timeBefore: "6 hrs/report", timeAfter: "1 hr/report", difficulty: "Medium" },
      { name: "Training material updates", description: "Revise safety training content with current regulations and incident learnings", timeBefore: "8 hrs/update", timeAfter: "1.5 hrs/update", difficulty: "Medium" },
      { name: "Compliance evidence packages", description: "Assemble documentation packages for regulatory submissions and certifications", timeBefore: "15 hrs/package", timeAfter: "3 hrs/package", difficulty: "Advanced" },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */

function difficultyClasses(d: UseCase["difficulty"]): string {
  switch (d) {
    case "Quick Win":
      return "bg-[#2d8a4e]/10 text-[#2d8a4e]";
    case "Medium":
      return "bg-[#d97757]/10 text-[#d97757]";
    case "Advanced":
      return "bg-[#8b7355]/10 text-[#8b7355]";
  }
}

/* ────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────── */

type Step = 1 | 2 | 3 | 4; // 4 = results

export function UseCaseFinder() {
  const [step, setStep] = useState<Step>(1);
  const [industry, setIndustry] = useState("");
  const [selectedDepts, setSelectedDepts] = useState<Set<string>>(new Set());
  const [timeDrains, setTimeDrains] = useState<Record<string, string>>({});

  const selectedDepartments = DEPARTMENTS.filter((d) =>
    selectedDepts.has(d.id),
  );

  const totalUseCases = selectedDepartments.reduce(
    (sum, d) => sum + d.useCases.length,
    0,
  );

  // Rough estimate of weekly hours saved
  const estimatedHoursSaved = selectedDepartments.reduce((sum, d) => {
    // Approximate: each use case saves ~2.5 hrs/week on average
    return sum + d.useCases.length * 2.5;
  }, 0);

  const progress =
    step === 4 ? 100 : step === 3 ? 66 : step === 2 ? 33 : 10;

  function toggleDept(id: string) {
    setSelectedDepts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function setTimeDrain(deptId: string, value: string) {
    setTimeDrains((prev) => ({ ...prev, [deptId]: value }));
  }

  function handleRestart() {
    setStep(1);
    setIndustry("");
    setSelectedDepts(new Set());
    setTimeDrains({});
  }

  const canAdvanceStep2 = selectedDepts.size > 0;
  const canAdvanceStep3 =
    selectedDepartments.every((d) => timeDrains[d.id]) &&
    selectedDepartments.length > 0;

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-faint">
            {step === 4
              ? "Results"
              : `Step ${step} of 3`}
          </span>
        </div>
        <div className="h-1 bg-border-light rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {["Industry", "Departments", "Time Drains"].map((label, i) => (
            <span
              key={label}
              className={`text-xs ${
                step > i + 1 || step === 4
                  ? "text-accent"
                  : step === i + 1
                    ? "text-text"
                    : "text-text-faint"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Step 1: Industry ── */}
      {step === 1 && (
        <div>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-2 font-heading">
            What industry are you in?
          </h2>
          <p className="text-text-muted text-[0.9375rem] mb-8">
            This helps us tailor use case recommendations to your context.
          </p>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-5 py-4 rounded-lg border border-border-light bg-transparent text-text text-[0.9375rem] appearance-none cursor-pointer focus:outline-none focus:border-accent transition-colors"
          >
            <option value="" disabled>
              Select your industry
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => industry && setStep(2)}
              disabled={!industry}
              className={`text-[0.9375rem] font-medium px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                industry
                  ? "bg-text text-bg hover:bg-[#30302e]"
                  : "bg-border-light text-text-faint cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Departments ── */}
      {step === 2 && (
        <div>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-2 font-heading">
            Which departments exist in your company?
          </h2>
          <p className="text-text-muted text-[0.9375rem] mb-8">
            Select all that apply. More departments means more AI opportunities
            to uncover.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => toggleDept(dept.id)}
                className={`text-left px-5 py-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedDepts.has(dept.id)
                    ? "border-accent bg-accent-soft text-text"
                    : "border-border-light hover:border-accent-border text-text-muted hover:text-text"
                }`}
              >
                <span className="text-[0.9375rem]">{dept.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-sm font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
            <button
              onClick={() => canAdvanceStep2 && setStep(3)}
              disabled={!canAdvanceStep2}
              className={`text-[0.9375rem] font-medium px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                canAdvanceStep2
                  ? "bg-text text-bg hover:bg-[#30302e]"
                  : "bg-border-light text-text-faint cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Time Drains ── */}
      {step === 3 && (
        <div>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-2 font-heading">
            What is the biggest time drain in each department?
          </h2>
          <p className="text-text-muted text-[0.9375rem] mb-8">
            This helps us prioritize the most impactful use cases for your team.
          </p>

          <div className="space-y-5 mb-8">
            {selectedDepartments.map((dept) => (
              <div key={dept.id}>
                <label className="block text-[0.9375rem] font-medium text-text mb-2">
                  {dept.label}
                </label>
                <select
                  value={timeDrains[dept.id] || ""}
                  onChange={(e) => setTimeDrain(dept.id, e.target.value)}
                  className="w-full px-5 py-3.5 rounded-lg border border-border-light bg-transparent text-text text-[0.875rem] appearance-none cursor-pointer focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="" disabled>
                    Select biggest time drain
                  </option>
                  {dept.timeDrains.map((td) => (
                    <option key={td} value={td}>
                      {td}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-sm font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
            <button
              onClick={() => canAdvanceStep3 && setStep(4)}
              disabled={!canAdvanceStep3}
              className={`text-[0.9375rem] font-medium px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                canAdvanceStep3
                  ? "bg-text text-bg hover:bg-[#30302e]"
                  : "bg-border-light text-text-faint cursor-not-allowed"
              }`}
            >
              See results
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Results ── */}
      {step === 4 && (
        <div>
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center p-4 rounded-xl border border-border-light">
              <div className="text-2xl font-semibold text-text font-heading">
                {totalUseCases}
              </div>
              <div className="text-xs text-text-muted mt-1">Use Cases</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-border-light">
              <div className="text-2xl font-semibold text-text font-heading">
                ~{Math.round(estimatedHoursSaved)}
              </div>
              <div className="text-xs text-text-muted mt-1">Hrs Saved / Week</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-border-light">
              <div className="text-2xl font-semibold text-text font-heading">
                {selectedDepartments.length}
              </div>
              <div className="text-xs text-text-muted mt-1">Departments</div>
            </div>
          </div>

          <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-2 font-heading">
            Your AI Use Cases
          </h2>
          <p className="text-text-muted text-[0.9375rem] mb-8">
            {totalUseCases} Claude AI opportunities across{" "}
            {selectedDepartments.length} departments in {industry}.
          </p>

          {/* Department sections */}
          <div className="space-y-8 mb-10">
            {selectedDepartments.map((dept) => (
              <div key={dept.id}>
                <div
                  className="flex items-center gap-3 mb-4 pb-3 border-b"
                  style={{ borderColor: `${dept.color}30` }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-text font-heading">
                    {dept.label}
                  </h3>
                  <span className="text-xs text-text-faint ml-auto">
                    {dept.useCases.length} use cases
                  </span>
                </div>

                <div className="space-y-3">
                  {dept.useCases.map((uc) => (
                    <div
                      key={uc.name}
                      className="p-4 rounded-lg border border-border-light"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <span className="text-[0.9375rem] font-medium text-text">
                          {uc.name}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full shrink-0 ${difficultyClasses(uc.difficulty)}`}
                        >
                          {uc.difficulty}
                        </span>
                      </div>
                      <p className="text-text-muted text-[0.8125rem] leading-relaxed mb-2">
                        {uc.description}
                      </p>
                      <div className="text-xs text-text-faint">
                        <span>{uc.timeBefore}</span>
                        <span className="mx-1.5">&rarr;</span>
                        <span className="text-[#2d8a4e] font-medium">
                          {uc.timeAfter}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Orient reference */}
          <div className="p-5 rounded-xl border border-border-light bg-accent-soft mb-8">
            <p className="text-[0.875rem] text-text-muted leading-relaxed">
              <span className="font-medium text-text">For reference:</span>{" "}
              Settle mapped 49 use cases across 7 departments at Orient Printing
              &amp; Packaging in one discovery session. Your results above are a
              starting point -- a full discovery session goes deeper into your
              specific workflows, tools, and team structure.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-accent rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2 font-heading">
              Want a complete use case map for your business?
            </h3>
            <p className="text-white/70 text-[0.9375rem] mb-6 max-w-md mx-auto">
              This tool shows what is possible. A discovery session with Settle
              maps your exact workflows, prioritizes by ROI, and builds a
              deployment plan.
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
              Start over with different selections
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
