"use client";

import { useState } from "react";

interface Option {
  label: string;
  score: number;
}

interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "size",
    question: "How many employees does your company have?",
    subtitle: "AI deployment ROI scales with team size and workflow volume.",
    options: [
      { label: "1-10", score: 1 },
      { label: "11-50", score: 2 },
      { label: "51-200", score: 3 },
      { label: "200+", score: 4 },
    ],
  },
  {
    id: "workflows",
    question: "How many repeatable workflows does your team run weekly?",
    subtitle:
      "Think: reports, emails, document generation, data entry, customer responses.",
    options: [
      { label: "A handful (under 10)", score: 1 },
      { label: "A steady stream (10-30)", score: 2 },
      { label: "High volume (30-100)", score: 3 },
      { label: "Constant (100+)", score: 4 },
    ],
  },
  {
    id: "ai_usage",
    question: "How is your team currently using AI?",
    subtitle: "Be honest — most companies are early in this journey.",
    options: [
      { label: "Not at all", score: 1 },
      { label: "A few people use ChatGPT for ad-hoc tasks", score: 2 },
      { label: "We have paid AI subscriptions but no structure", score: 3 },
      { label: "We have some structured AI workflows in place", score: 4 },
    ],
  },
  {
    id: "documentation",
    question: "How well-documented are your processes?",
    subtitle:
      "AI deployment works best when workflows are defined — even if imperfectly.",
    options: [
      { label: "Mostly tribal knowledge", score: 1 },
      { label: "Some SOPs, but outdated or incomplete", score: 2 },
      { label: "Most processes are documented", score: 3 },
      { label: "Well-documented with templates and checklists", score: 4 },
    ],
  },
  {
    id: "standardization",
    question: "How standardized are workflows across your team?",
    subtitle: "Do different people do the same task the same way?",
    options: [
      { label: "Everyone has their own approach", score: 1 },
      { label: "Loosely standardized — general guidelines exist", score: 2 },
      { label: "Mostly standardized with some variation", score: 3 },
      { label: "Highly standardized with clear processes", score: 4 },
    ],
  },
  {
    id: "leadership",
    question: "Does leadership support AI adoption?",
    subtitle: "Deployment succeeds when it has top-down backing.",
    options: [
      { label: "Not yet — still convincing them", score: 1 },
      { label: "Curious but cautious", score: 2 },
      { label: "Actively interested and willing to invest", score: 3 },
      { label: "Championing it — AI is a strategic priority", score: 4 },
    ],
  },
  {
    id: "data",
    question: "How accessible is your business data?",
    subtitle:
      "Claude AI works best when it can connect to your systems (ERP, CRM, databases).",
    options: [
      { label: "Mostly in people's heads or scattered files", score: 1 },
      { label: "In systems, but siloed and hard to extract", score: 2 },
      { label: "In systems with some APIs or export capability", score: 3 },
      { label: "Well-organized with APIs and structured exports", score: 4 },
    ],
  },
  {
    id: "capacity",
    question: "Does your team have bandwidth for a new initiative?",
    subtitle:
      "AI deployment requires some attention during rollout — typically 2-4 hours/week from key stakeholders.",
    options: [
      { label: "Everyone is at 100% — no room", score: 1 },
      { label: "Tight, but we could carve out time for the right thing", score: 2 },
      { label: "We have dedicated people who could own this", score: 3 },
      { label: "We've already allocated resources for AI", score: 4 },
    ],
  },
];

interface Result {
  grade: string;
  color: string;
  summary: string;
  details: string[];
  cta: string;
}

function getResult(score: number, answers: Record<string, number>): Result {
  const base: Result =
    score >= 25
      ? {
          grade: "Ready to Deploy",
          color: "#2d8a4e",
          summary:
            "Your organization has the structure, volume, and leadership backing for immediate Claude AI deployment.",
          details: [],
          cta: "You're in a strong position. A discovery call would map your highest-impact use cases and define a rollout plan.",
        }
      : score >= 17
        ? {
            grade: "High Potential",
            color: "#d97757",
            summary:
              "Strong foundations with a few gaps to close. You'd see real results from structured AI deployment.",
            details: [],
            cta: "A discovery call would identify your quick wins and what to shore up before a full rollout.",
          }
        : {
            grade: "Building Foundations",
            color: "#8b7355",
            summary:
              "Your team would benefit from some process groundwork before a full AI deployment — but there are likely quick wins available now.",
            details: [],
            cta: "A discovery call could identify 2-3 quick wins to start with while you build toward a broader rollout.",
          };

  // Add specific recommendations based on weak areas
  if (answers.documentation <= 2) {
    base.details.push(
      "Process documentation is a gap. Even basic SOPs dramatically improve AI deployment — Claude AI works best with clear workflow definitions.",
    );
  }
  if (answers.leadership <= 2) {
    base.details.push(
      "Leadership buy-in is still developing. Sharing concrete ROI examples (like 85% faster document generation) can help build the case.",
    );
  }
  if (answers.data <= 2) {
    base.details.push(
      "Data accessibility is limited. Start by identifying which systems have APIs or export capabilities — Claude AI connects via MCP (Model Context Protocol).",
    );
  }
  if (answers.ai_usage <= 1) {
    base.details.push(
      "Your team hasn't started with AI yet. That's fine — Settle's first client had zero AI experience and deployed 11 projects across 7 departments.",
    );
  }
  if (answers.standardization <= 2) {
    base.details.push(
      "Workflow standardization is low. AI deployment actually helps here — structured Claude AI projects enforce consistency that manual processes don't.",
    );
  }
  if (answers.capacity <= 1) {
    base.details.push(
      "Bandwidth is tight. Settle handles the heavy lifting — your team typically needs 2-4 hours/week during rollout, not a full-time commitment.",
    );
  }
  if (answers.workflows >= 3) {
    base.details.push(
      "Your high workflow volume is a strong indicator of AI ROI — more repeatable tasks means more time saved per deployment.",
    );
  }
  if (answers.size >= 3 && answers.workflows >= 3) {
    base.details.push(
      "Your combination of team size and workflow volume is similar to Orient Printing, where Settle mapped 49 use cases and deployed 11 projects.",
    );
  }

  // Cap at 4 recommendations
  base.details = base.details.slice(0, 4);

  return base;
}

export function AiReadinessGrader() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const question = QUESTIONS[current];
  const totalQuestions = QUESTIONS.length;
  const progress = result
    ? 100
    : (Object.keys(answers).length / totalQuestions) * 100;

  function handleSelect(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  function handleNext() {
    if (selectedOption === null) return;

    const newAnswers = {
      ...answers,
      [question.id]: question.options[selectedOption].score,
    };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
    } else {
      const totalScore = Object.values(newAnswers).reduce((a, b) => a + b, 0);
      setResult(getResult(totalScore, newAnswers));
    }
  }

  function handleBack() {
    if (current > 0) {
      setCurrent(current - 1);
      setSelectedOption(null);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setAnswers({});
    setSelectedOption(null);
    setResult(null);
  }

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-faint">
            {result
              ? "Assessment complete"
              : `Question ${current + 1} of ${totalQuestions}`}
          </span>
          {!result && (
            <span className="text-sm text-text-faint">
              {Math.round(progress)}%
            </span>
          )}
        </div>
        <div className="h-1 bg-border-light rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {result ? (
        /* ── Results ── */
        <div>
          {/* Score header */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 text-white text-2xl font-semibold"
              style={{ backgroundColor: result.color }}
            >
              {totalScore}
            </div>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-text mb-2 font-heading">
              {result.grade}
            </h2>
            <p className="text-text-muted text-[1rem] leading-relaxed max-w-lg mx-auto">
              {result.summary}
            </p>
            <p className="text-text-faint text-sm mt-2">
              Score: {totalScore} out of {totalQuestions * 4}
            </p>
          </div>

          {/* Recommendations */}
          {result.details.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-text mb-4 font-heading">
                What we noticed
              </h3>
              <ul className="space-y-3">
                {result.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-text-muted text-[0.9375rem] leading-relaxed"
                  >
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dimension breakdown */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-text mb-4 font-heading">
              Your scores by dimension
            </h3>
            <div className="space-y-3">
              {QUESTIONS.map((q) => {
                const score = answers[q.id] || 0;
                return (
                  <div key={q.id} className="flex items-center gap-3">
                    <span className="text-sm text-text-muted w-40 shrink-0">
                      {q.id === "ai_usage"
                        ? "Current AI usage"
                        : q.id === "size"
                          ? "Company size"
                          : q.id.charAt(0).toUpperCase() +
                            q.id.slice(1).replace(/_/g, " ")}
                    </span>
                    <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(score / 4) * 100}%`,
                          backgroundColor:
                            score >= 3
                              ? "#2d8a4e"
                              : score >= 2
                                ? "#d97757"
                                : "#8b7355",
                        }}
                      />
                    </div>
                    <span className="text-sm text-text-faint w-8 text-right">
                      {score}/4
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-accent rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2 font-heading">
              Want to see what AI could do for your team?
            </h3>
            <p className="text-white/70 text-[0.9375rem] mb-6 max-w-md mx-auto">
              {result.cta}
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
              Take the assessment again
            </button>
          </div>
        </div>
      ) : (
        /* ── Question ── */
        <div>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-2 font-heading">
            {question.question}
          </h2>
          <p className="text-text-muted text-[0.9375rem] mb-8">
            {question.subtitle}
          </p>

          <div className="space-y-3 mb-8">
            {question.options.map((option, i) => (
              <button
                key={option.label}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedOption === i
                    ? "border-accent bg-accent-soft text-text"
                    : "border-border-light hover:border-accent-border text-text-muted hover:text-text"
                }`}
              >
                <span className="text-[0.9375rem]">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                current === 0
                  ? "text-text-faint cursor-not-allowed"
                  : "text-text-muted hover:text-text"
              }`}
            >
              &larr; Back
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`text-[0.9375rem] font-medium px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedOption !== null
                  ? "bg-text text-bg hover:bg-[#30302e]"
                  : "bg-border-light text-text-faint cursor-not-allowed"
              }`}
            >
              {current === totalQuestions - 1 ? "See results" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
