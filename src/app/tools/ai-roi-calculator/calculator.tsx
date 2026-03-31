"use client";

import { useState } from "react";

const REDUCTION_OPTIONS = [
  { label: "30% — Complex analysis tasks", value: 0.3 },
  { label: "50% — Mixed workflows", value: 0.5 },
  { label: "70% — Structured repeatable tasks", value: 0.7 },
  { label: "85% — Document generation and templates", value: 0.85 },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD ($)", locale: "en-US" },
  { code: "EUR", symbol: "\u20AC", label: "EUR (\u20AC)", locale: "de-DE" },
  { code: "GBP", symbol: "\u00A3", label: "GBP (\u00A3)", locale: "en-GB" },
  { code: "INR", symbol: "\u20B9", label: "INR (\u20B9)", locale: "en-IN" },
  { code: "CAD", symbol: "C$", label: "CAD (C$)", locale: "en-CA" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)", locale: "en-AU" },
  { code: "PKR", symbol: "Rs", label: "PKR (Rs)", locale: "en-PK" },
  { code: "AED", symbol: "AED", label: "AED", locale: "en-AE" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatCurrency(n: number, currencyIndex: number): string {
  const c = CURRENCIES[currencyIndex];
  return c.symbol + n.toLocaleString(c.locale, { maximumFractionDigits: 0 });
}

export function RoiCalculator() {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(75);
  const [reductionIndex, setReductionIndex] = useState(1); // default 50%
  const [currencyIndex, setCurrencyIndex] = useState(0); // default USD

  const reduction = REDUCTION_OPTIONS[reductionIndex].value;

  const weeklyHoursSaved = employees * hoursPerWeek * reduction;
  const monthlyHoursSaved = weeklyHoursSaved * 4.33;
  const annualHoursSaved = weeklyHoursSaved * 52;
  const annualCostSavings = annualHoursSaved * hourlyCost;
  const ftesFreed = annualHoursSaved / 2080;

  const totalWeeklyHours = employees * hoursPerWeek;
  const afterWeeklyHours = totalWeeklyHours - weeklyHoursSaved;

  const barMaxWidth = totalWeeklyHours;
  const beforePct = 100;
  const afterPct = barMaxWidth > 0 ? (afterWeeklyHours / barMaxWidth) * 100 : 0;

  return (
    <div>
      {/* Inputs */}
      <div className="space-y-8 mb-14">
        {/* Employees */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="employees"
              className="text-[0.9375rem] font-medium text-text"
            >
              Employees who would use AI
            </label>
            <span className="text-[0.9375rem] font-heading font-semibold text-text tabular-nums">
              {employees}
            </span>
          </div>
          <input
            id="employees"
            type="range"
            min={5}
            max={500}
            step={5}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full accent-[#d97757] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-text-faint mt-1">
            <span>5</span>
            <span>500</span>
          </div>
        </div>

        {/* Hours per week */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="hours"
              className="text-[0.9375rem] font-medium text-text"
            >
              Avg. hours/week on repeatable tasks (per person)
            </label>
            <span className="text-[0.9375rem] font-heading font-semibold text-text tabular-nums">
              {hoursPerWeek}h
            </span>
          </div>
          <input
            id="hours"
            type="range"
            min={2}
            max={40}
            step={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full accent-[#d97757] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-text-faint mt-1">
            <span>2h</span>
            <span>40h</span>
          </div>
        </div>

        {/* Currency */}
        <div>
          <label
            htmlFor="currency"
            className="block text-[0.9375rem] font-medium text-text mb-3"
          >
            Currency
          </label>
          <div className="flex flex-wrap gap-2">
            {CURRENCIES.map((c, i) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrencyIndex(i)}
                className={`px-3.5 py-2 rounded-lg text-[0.875rem] font-medium border transition-all duration-200 cursor-pointer ${
                  currencyIndex === i
                    ? "border-accent bg-accent-soft text-text"
                    : "border-border-light text-text-muted hover:border-accent-border"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hourly cost */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="cost"
              className="text-[0.9375rem] font-medium text-text"
            >
              Fully loaded hourly cost per employee
            </label>
            <span className="text-[0.9375rem] font-heading font-semibold text-text tabular-nums">
              {CURRENCIES[currencyIndex].symbol}{hourlyCost}
            </span>
          </div>
          <input
            id="cost"
            type="range"
            min={30}
            max={200}
            step={5}
            value={hourlyCost}
            onChange={(e) => setHourlyCost(Number(e.target.value))}
            className="w-full accent-[#d97757] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-text-faint mt-1">
            <span>{CURRENCIES[currencyIndex].symbol}30</span>
            <span>{CURRENCIES[currencyIndex].symbol}200</span>
          </div>
        </div>

        {/* Reduction percentage */}
        <div>
          <label
            htmlFor="reduction"
            className="block text-[0.9375rem] font-medium text-text mb-3"
          >
            Estimated AI time reduction
          </label>
          <select
            id="reduction"
            value={reductionIndex}
            onChange={(e) => setReductionIndex(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-border-light bg-transparent text-text text-[0.9375rem] cursor-pointer focus:outline-none focus:border-accent transition-colors"
          >
            {REDUCTION_OPTIONS.map((opt, i) => (
              <option key={opt.value} value={i}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
          Estimated Savings
        </h2>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border border-border-light rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-text-faint mb-1">
              Weekly hours saved
            </p>
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text font-heading tabular-nums">
              {formatNumber(weeklyHoursSaved)}
            </p>
          </div>
          <div className="border border-border-light rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-text-faint mb-1">
              Monthly hours saved
            </p>
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text font-heading tabular-nums">
              {formatNumber(monthlyHoursSaved)}
            </p>
          </div>
          <div className="border border-border-light rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-text-faint mb-1">
              Annual cost savings
            </p>
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-accent font-heading tabular-nums">
              {formatCurrency(annualCostSavings, currencyIndex)}
            </p>
          </div>
          <div className="border border-border-light rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-text-faint mb-1">
              Equivalent FTEs freed
            </p>
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text font-heading tabular-nums">
              {ftesFreed.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Visual comparison */}
        <div className="mb-8">
          <h3 className="text-[0.9375rem] font-medium text-text mb-4">
            Weekly hours on repeatable tasks
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-text-muted">Before AI</span>
                <span className="text-sm text-text-faint tabular-nums">
                  {formatNumber(totalWeeklyHours)}h
                </span>
              </div>
              <div className="h-6 bg-border-light rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md bg-text/20 transition-all duration-500"
                  style={{ width: `${beforePct}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-text-muted">After AI</span>
                <span className="text-sm text-text-faint tabular-nums">
                  {formatNumber(afterWeeklyHours)}h
                </span>
              </div>
              <div className="h-6 bg-border-light rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md bg-accent transition-all duration-500"
                  style={{ width: `${afterPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="border border-border-light rounded-xl overflow-hidden mb-8">
          <table className="w-full text-[0.9375rem]">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left px-5 py-3 text-text-faint text-xs uppercase tracking-[0.08em] font-medium">
                  Metric
                </th>
                <th className="text-right px-5 py-3 text-text-faint text-xs uppercase tracking-[0.08em] font-medium">
                  Before AI
                </th>
                <th className="text-right px-5 py-3 text-text-faint text-xs uppercase tracking-[0.08em] font-medium">
                  After AI
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light">
                <td className="px-5 py-3 text-text-muted">
                  Weekly task hours
                </td>
                <td className="px-5 py-3 text-right text-text tabular-nums">
                  {formatNumber(totalWeeklyHours)}
                </td>
                <td className="px-5 py-3 text-right text-accent font-medium tabular-nums">
                  {formatNumber(afterWeeklyHours)}
                </td>
              </tr>
              <tr className="border-b border-border-light">
                <td className="px-5 py-3 text-text-muted">
                  Annual task hours
                </td>
                <td className="px-5 py-3 text-right text-text tabular-nums">
                  {formatNumber(totalWeeklyHours * 52)}
                </td>
                <td className="px-5 py-3 text-right text-accent font-medium tabular-nums">
                  {formatNumber(afterWeeklyHours * 52)}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-text-muted">Annual labor cost</td>
                <td className="px-5 py-3 text-right text-text tabular-nums">
                  {formatCurrency(totalWeeklyHours * 52 * hourlyCost, currencyIndex)}
                </td>
                <td className="px-5 py-3 text-right text-accent font-medium tabular-nums">
                  {formatCurrency(afterWeeklyHours * 52 * hourlyCost, currencyIndex)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Orient Printing reference */}
        <p className="text-text-faint text-sm leading-relaxed mb-10">
          Based on results from Settle&apos;s first engagement: Orient Printing
          saw 85% faster document generation, reducing task time from 4 hours to
          30 minutes.
        </p>

        {/* CTA */}
        <div className="bg-accent rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2 font-heading">
            These are estimates. Want to see what&apos;s realistic for your team?
          </h3>
          <p className="text-white/70 text-[0.9375rem] mb-6 max-w-md mx-auto">
            A discovery call maps your actual workflows and identifies which
            savings are achievable in your first 90 days.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Book a Discovery Call
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
