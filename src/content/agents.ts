/**
 * Marketplace agent data.
 *
 * Source of truth for /agents/[slug] programmatic pages. Each entry is
 * shaped for SoftwareApplication + FAQPage JSON-LD emission and for
 * passage-citable hero descriptions (LLMs extract the first clean chunk
 * after the H1, so lead with the definition).
 */
export interface AgentFAQ {
  question: string;
  answer: string;
}

export interface AgentUseCase {
  title: string;
  description: string;
}

export interface Agent {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  department: string;
  heroDescription: string;
  longDescription: string;
  inputs: string[];
  outputs: string[];
  useCases: AgentUseCase[];
  sampleRun: {
    input: string;
    output: string;
  };
  faqs: AgentFAQ[];
  pricing: {
    creditsPerRun: number;
    estimatedUsdPerRun: string;
    billing: string;
  };
  timeSavedPerRun: string;
  deploymentTime: string;
  keywords: string[];
  provenAt?: string;
}

export const AGENTS: Agent[] = [
  {
    slug: "offer-generator",
    name: "Offer Generator",
    tagline:
      "Turn a one-line customer brief into a fully branded, priced sales proposal.",
    category: "Sales & Proposals",
    department: "Sales",
    heroDescription:
      "Offer Generator is an AI sales-proposal agent that produces fully branded, multi-page customer quotations in under 30 minutes — with accurate pricing, correct terms, and flagged ambiguities. Built on Claude AI and trained on a manufacturer's product, pricing, and brand data. Replaces 4-hour manual offer creation.",
    longDescription:
      "Offer Generator is the flagship Settle agent — the first production deployment that took Orient Printing's sales engineers from 4-hour proposal drafts to 30-minute AI-assisted ones. It ingests a short customer brief (company name, product line, quantities, country, any special terms), and generates a multi-page branded PDF-ready offer with accurate line-item pricing, GST/tax handling, domestic or international terms, and an explicit list of open questions where inputs are ambiguous. Unlike generic ChatGPT prompts, Offer Generator runs on a structured Claude project with versioned knowledge files — so a customer name always maps to the right price, the right currency, and the right terms version.",
    inputs: [
      "Customer name and country",
      "Product line / SKU family",
      "Quantity or capacity requirement",
      "Any special commercial terms (payment, delivery, warranty)",
      "Contact person for the offer",
      "Optional: competitive context or prior offer reference",
    ],
    outputs: [
      "Multi-page branded proposal (PDF-ready)",
      "Line-item pricing with tax / GST math",
      "Domestic or international terms (auto-selected)",
      "Explicit list of flagged ambiguities (not fabricated assumptions)",
      "Editable source doc for sales-engineer final review",
    ],
    useCases: [
      {
        title: "Multi-line industrial manufacturers",
        description:
          "Four machine lines, dozens of SKUs, and thousands of configuration permutations — Offer Generator handles the combinatorial pricing logic that spreadsheets can't.",
      },
      {
        title: "International quotations",
        description:
          "Switches terms, currency, incoterms, and tax handling based on the customer country. No sales engineer has to remember whether Vietnam gets FOB or CIF.",
      },
      {
        title: "High-velocity B2B sales",
        description:
          "Teams generating 50+ quotations per month. Each quotation that used to cost half a day of senior engineer time now costs 30 minutes.",
      },
    ],
    sampleRun: {
      input:
        "Customer: Acme Packaging Ltd (Vietnam). Product: C-Series 105 with auto-feeder. Qty: 1 unit. Terms: 30% advance, balance against BL. Contact: Mr. Tran, Plant Head.",
      output:
        "8-page branded offer with machine specs, price breakdown in USD, CIF Haiphong terms, 18-month warranty, GST-exempt export terms, 4 flagged ambiguities (colour variant, commissioning country, training package, spare parts kit).",
    },
    faqs: [
      {
        question: "What does the Offer Generator AI actually do?",
        answer:
          "Offer Generator converts a short customer brief into a fully branded, multi-page sales proposal with accurate pricing, correct terms, tax handling, and flagged ambiguities. It is a production Claude AI agent deployed live at Orient Printing & Packaging — cutting offer creation time from 4 hours to 30 minutes.",
      },
      {
        question: "How is this different from a prompt template in ChatGPT?",
        answer:
          "A prompt template is a string. Offer Generator is a versioned Claude project with knowledge files for pricing, terms, and brand, plus explicit safety rules (it flags ambiguity, it refuses to invent prices). The same brief will produce the same output on run 1 and run 10,000 — consistency a chat prompt can't guarantee.",
      },
      {
        question: "Can it handle our specific products, pricing, and terms?",
        answer:
          "Yes. Settle loads your product spec sheets, pricing logic (including GST or VAT math), and terms versions into Claude knowledge files during deployment. The agent only uses your data — it never invents products or pricing from generic training data.",
      },
      {
        question: "How much does it cost per offer?",
        answer:
          "Pre-paid credits. A typical full 8-page offer costs ~$0.50–$1.50 in Claude API costs, billed through Settle credits. No subscriptions, no seat licenses, no minimums.",
      },
      {
        question: "How long does deployment take?",
        answer:
          "For a company with clean product data, a first working Offer Generator ships in 2–3 weeks. Companies with scattered pricing and terms typically need an extra 1–2 weeks for data cleanup.",
      },
    ],
    pricing: {
      creditsPerRun: 150,
      estimatedUsdPerRun: "$0.50–$1.50",
      billing: "Pre-paid credits. No subscriptions, no minimums.",
    },
    timeSavedPerRun: "3.5 hours (4 hr manual → 30 min AI-assisted)",
    deploymentTime: "2–3 weeks",
    keywords: [
      "AI offer generator",
      "AI sales proposal generator",
      "AI quotation generator",
      "Claude AI for sales",
      "automated proposal writing",
      "sales engineer AI",
      "manufacturing offer AI",
    ],
    provenAt: "Orient Printing & Packaging (79-year-old industrial manufacturer)",
  },
  {
    slug: "mis-reporter",
    name: "MIS Reporter",
    tagline:
      "Weekly and monthly management reports from raw operational data — without a BI team.",
    category: "Finance & Operations",
    department: "Finance / Operations",
    heroDescription:
      "MIS Reporter is an AI management-reporting agent that turns raw operational and financial data into ready-to-circulate MIS reports — weekly, monthly, or on demand. Built on Claude AI, it handles variance commentary, trend callouts, and KPI formatting without a BI team or a dashboard rebuild. Typical use: reduces 2-day manual MIS prep to 45 minutes.",
    longDescription:
      "Most mid-market companies run their MIS (Management Information System) reports on Excel stitched together by a lone analyst. MIS Reporter replaces the stitching with a structured Claude agent that ingests raw CSVs, ERP exports, or database dumps, and produces a formatted weekly or monthly MIS with variance commentary, trend callouts, and anomaly flagging. The agent uses a versioned report template so every month's output looks identical in structure — what changes is only the data and the commentary. No BI tool rebuild. No dashboard license. No analyst burnout on the last working day of the month.",
    inputs: [
      "Raw data files (CSV, XLSX, ERP export)",
      "Report period (weekly, monthly, quarterly)",
      "KPI definition file (what to report, how to calculate)",
      "Previous period report for comparison",
      "Optional: context notes (new launches, one-off events)",
    ],
    outputs: [
      "Formatted MIS report (Word/PDF-ready)",
      "KPI table with variance vs target and vs prior period",
      "Trend commentary (3–5 sentences per section)",
      "Anomaly flags (unusual values highlighted)",
      "Executive summary (first-page view)",
    ],
    useCases: [
      {
        title: "Monthly finance close MIS",
        description:
          "CFO teams generating monthly management accounts. Revenue, margins, opex, working capital — formatted exactly the way the board sees it every month.",
      },
      {
        title: "Weekly operations review",
        description:
          "Plant managers reviewing production, quality, downtime, yield. Agent produces the same report structure every week so managers can scan trends, not hunt data.",
      },
      {
        title: "Multi-entity roll-up reporting",
        description:
          "Group holdings with 3–10 subsidiaries. Agent consolidates individual entity data into a group view with per-entity drill-downs.",
      },
    ],
    sampleRun: {
      input:
        "Period: March 2026 monthly MIS. Attached: general ledger export, sales register, headcount file. Template: standard monthly pack. Context: new SKU launched mid-March.",
      output:
        "12-page monthly MIS with revenue (₹X.X cr, +12% YoY), gross margin (28.4%, -0.8pp MoM due to raw material price spike), headcount (214, +6 MoM), and a flagged anomaly in collections aging requiring CFO review. Commentary references the mid-March SKU launch as a contributor to revenue lift.",
    },
    faqs: [
      {
        question: "What is an AI MIS Reporter?",
        answer:
          "An AI MIS Reporter is a Claude-based agent that turns raw operational data into formatted management reports with KPIs, variance commentary, and anomaly flags. Settle's MIS Reporter replaces 1–2 days of manual MIS prep with a 45-minute structured run — without needing a BI tool or a dedicated analyst.",
      },
      {
        question: "Does it connect to our ERP / accounting system?",
        answer:
          "Yes, via MCP (Model Context Protocol) connectors. Native connectors exist for SAP, Oracle NetSuite, Tally, Sage, QuickBooks, and others. For systems without a native connector, Settle builds a lightweight CSV/API bridge in 2–5 days.",
      },
      {
        question: "Will the reports look the same every month?",
        answer:
          "Yes — structurally identical. The template is versioned in a Claude knowledge file. Only data and commentary change month to month. Board members and auditors see a consistent format.",
      },
      {
        question: "Can it handle multi-entity roll-ups?",
        answer:
          "Yes. Multi-entity roll-up is one of the most common deployment patterns. The agent consolidates entity-level data, produces a group view, and keeps per-entity detail as appendices or drill-down sections.",
      },
      {
        question: "How is this different from Power BI or Tableau?",
        answer:
          "Power BI and Tableau are dashboard tools — they show numbers. MIS Reporter produces narrative reports — it explains the numbers. Most boards want a written monthly MIS, not a dashboard login.",
      },
    ],
    pricing: {
      creditsPerRun: 200,
      estimatedUsdPerRun: "$0.80–$2.00",
      billing: "Pre-paid credits. Typical monthly MIS: ~$1.20 per run.",
    },
    timeSavedPerRun: "1.5–2 days (manual MIS prep → 45-minute AI run)",
    deploymentTime: "3–4 weeks (includes template versioning)",
    keywords: [
      "AI MIS report",
      "automated management report",
      "AI financial reporting",
      "Claude AI for finance",
      "monthly MIS automation",
      "AI variance analysis",
      "AI board pack generator",
    ],
  },
  {
    slug: "support-desk",
    name: "Support Desk",
    tagline:
      "Answers customer and employee questions from your real knowledge — not generic training data.",
    category: "Customer Support",
    department: "Support / Customer Success",
    heroDescription:
      "Support Desk is an AI customer-support agent that answers product, policy, and troubleshooting questions from your own knowledge base — not from generic training data. Runs as a chat widget on your site or inside Slack / Teams. Claude-powered, versioned, and honest: it says \"I don't know, let me escalate\" instead of fabricating.",
    longDescription:
      "Generic AI chatbots hallucinate because they answer from training data. Support Desk only answers from your knowledge — product manuals, policy documents, FAQ libraries, prior ticket resolutions — grounded in a Claude project with explicit retrieval boundaries. When a question sits outside its knowledge base, Support Desk escalates to a human with a pre-drafted handoff summary, instead of inventing an answer. Deployed as a public-facing chat widget, a gated customer-portal agent, or an internal employee support layer. Built with the same production-grade instruction engineering Settle uses for every deployment.",
    inputs: [
      "Customer / employee question (natural language)",
      "Session history (for multi-turn context)",
      "User identity or account context (optional, for personalization)",
    ],
    outputs: [
      "Grounded answer with citations to source docs",
      "Escalation handoff note (when outside knowledge)",
      "Suggested next actions for the user",
      "Ticket-ready summary if the user asks to open a ticket",
    ],
    useCases: [
      {
        title: "Product Q&A on a public site",
        description:
          "Prospects land on your site outside business hours. Support Desk answers technical product questions from your real spec sheets — and captures leads when users ask for pricing.",
      },
      {
        title: "Internal IT / HR helpdesk",
        description:
          "Employees asking about policy, payroll, leave, or IT. Support Desk answers from your HR handbook and IT knowledge base — routing edge cases to humans.",
      },
      {
        title: "Tier-1 ticket deflection",
        description:
          "30–60% of inbound tickets are \"where do I find X\" or \"how do I reset Y.\" Support Desk resolves these without a human, freeing your team for complex issues.",
      },
    ],
    sampleRun: {
      input:
        "Customer question: \"Does the C-Series 105 support UV printing on recycled board, and what's the typical GSM range?\"",
      output:
        "\"Yes — the C-Series 105 supports UV-curable inks on recycled board. The certified GSM range is 80–600 GSM, with best performance in the 150–450 range for recycled substrates. For loadings above 500 GSM, we recommend the heavy-duty feeder variant. Source: C-Series Technical Manual, Rev 4.2, Sec 3.1. Want me to connect you with a sales engineer for a specific substrate test?\"",
    },
    faqs: [
      {
        question: "What is an AI support desk?",
        answer:
          "An AI support desk is an agent that answers customer and employee questions from a defined knowledge base. Settle's Support Desk runs on Claude AI with grounded retrieval — it only uses your docs, not generic training data, so it can't hallucinate about your products or policies.",
      },
      {
        question: "How is this different from ChatGPT or Intercom's AI?",
        answer:
          "Both tools answer from a mix of training data and your docs. Support Desk answers only from your versioned knowledge base. If the answer isn't there, it escalates with a handoff summary — it doesn't guess.",
      },
      {
        question: "Will it hallucinate?",
        answer:
          "It is engineered not to. Explicit safety rules in the Claude project instructions forbid answering without a source citation, and require escalation for out-of-scope questions. The agent's prompt is designed to refuse, not to guess.",
      },
      {
        question: "Can it embed on our website?",
        answer:
          "Yes, as a chat widget (three lines of script tag). It can also run inside Slack, Microsoft Teams, or a Zendesk / Intercom integration.",
      },
      {
        question: "How much does it cost per conversation?",
        answer:
          "Pre-paid credits. A typical 5-message conversation costs $0.05–$0.20 in Claude API costs. Volume pricing available for >10,000 conversations/month.",
      },
    ],
    pricing: {
      creditsPerRun: 30,
      estimatedUsdPerRun: "$0.05–$0.20 per conversation",
      billing: "Pre-paid credits. Volume discounts above 10,000 conversations/month.",
    },
    timeSavedPerRun: "5–15 minutes of support agent time per deflected query",
    deploymentTime: "1–3 weeks (depends on knowledge base cleanup)",
    keywords: [
      "AI customer support",
      "AI chatbot for business",
      "AI support desk",
      "Claude AI chat widget",
      "AI helpdesk",
      "tier-1 ticket deflection",
      "grounded AI customer service",
    ],
    provenAt: "Orient Printing (tphorient.com public chat)",
  },
  {
    slug: "recruitment-hunter",
    name: "Recruitment Hunter",
    tagline:
      "Sources, screens, and drafts first outreach for engineering, sales, and operations roles.",
    category: "Talent & HR",
    department: "People / Talent",
    heroDescription:
      "Recruitment Hunter is an AI talent-sourcing agent that takes a job description and returns a ranked candidate list with screening notes and first-draft outreach messages. Built on Claude AI, it reviews LinkedIn / GitHub / portfolio data, applies role-specific criteria, and refuses to guess on demographics or other protected attributes.",
    longDescription:
      "Internal recruiters spend 60–70% of their day sourcing — searching LinkedIn, filtering profiles, reading resumes, drafting cold messages. Recruitment Hunter handles the first-pass sourcing and screening. Given a structured job description and role criteria, it returns a ranked candidate list with evidence-based screening notes (skills matched, experience fit, likely salary range based on tenure and geography) and first-draft outreach messages tuned to the role. It refuses to rank on demographic signals and flags any outreach draft that edges into compliance-sensitive territory. Recruiters still close — they spend their time on conversations, not searches.",
    inputs: [
      "Structured job description (title, seniority, skills, location)",
      "Must-have and nice-to-have criteria",
      "Company context (for outreach personalization)",
      "Target list size (10, 25, 50 candidates)",
      "Optional: exclusion list (prior rejections, current employees)",
    ],
    outputs: [
      "Ranked candidate list (with evidence for ranking)",
      "Per-candidate screening notes",
      "First-draft personalized outreach messages",
      "Compliance flag log (any draft requiring human review)",
      "Salary band estimate per candidate",
    ],
    useCases: [
      {
        title: "Engineering hiring at scale",
        description:
          "Tech teams hiring 5–20 engineers per quarter. Hunter screens hundreds of profiles per week and surfaces the top 20–30 for recruiter review.",
      },
      {
        title: "Sales and GTM recruitment",
        description:
          "Sales leaders hiring AEs, SDRs, or CSMs with specific industry experience. Hunter filters on company target list and tenure patterns.",
      },
      {
        title: "Specialist / niche roles",
        description:
          "Hard-to-fill roles (embedded engineers, compliance specialists, rare domain expertise). Hunter searches deeper signals than job boards — GitHub activity, publications, conference talks.",
      },
    ],
    sampleRun: {
      input:
        "Role: Senior Backend Engineer (Python + Postgres). Location: remote India. Must-have: 5+ yrs, distributed systems, recent Postgres-at-scale experience. List size: 25.",
      output:
        "25 ranked candidates with per-candidate evidence: matched skills, relevant projects, likely current salary band, and a 3-sentence draft outreach each. Top candidate: Rahul S. (7 yrs, ex-Razorpay, Postgres shard migration blog post, currently open per LinkedIn signal). Zero demographic ranking signals used.",
    },
    faqs: [
      {
        question: "What is Recruitment Hunter?",
        answer:
          "Recruitment Hunter is an AI agent for the first-pass sourcing and screening work in recruitment. Given a job description, it returns a ranked candidate list with evidence, screening notes, and draft outreach messages — letting recruiters spend their time on conversations instead of searches.",
      },
      {
        question: "Does it replace recruiters?",
        answer:
          "No. It replaces the sourcing and screening hours that recruiters hate anyway. Recruiters still close — they run discovery calls, negotiate offers, and manage the candidate experience. Hunter handles the hundreds-of-profiles review that used to eat their mornings.",
      },
      {
        question: "How does it handle bias and compliance?",
        answer:
          "Explicit refusal rules in the Claude project instructions forbid ranking on demographic signals (age, gender, ethnicity, nationality, parental status, etc). Any outreach draft that edges into sensitive territory is flagged for recruiter review before sending. Full audit log of all candidate evaluations is retained.",
      },
      {
        question: "Can it send messages automatically?",
        answer:
          "By default, no — it drafts; humans send. On request, Settle can wire it to send via LinkedIn / email with a rate limit and explicit opt-in per campaign. For compliance reasons, automatic sending is off by default.",
      },
      {
        question: "What data sources does it use?",
        answer:
          "LinkedIn (via approved scraping or API partners), GitHub, personal portfolio sites, and any company ATS you connect. It never uses scraped personal data that violates platform TOS.",
      },
    ],
    pricing: {
      creditsPerRun: 250,
      estimatedUsdPerRun: "$1.00–$3.00 per ranked list of 25 candidates",
      billing: "Pre-paid credits. Bulk pricing for recruitment agencies.",
    },
    timeSavedPerRun: "4–6 hours of recruiter sourcing time per 25-candidate list",
    deploymentTime: "2–3 weeks",
    keywords: [
      "AI recruiter",
      "AI sourcing tool",
      "AI candidate screening",
      "Claude AI for HR",
      "automated recruitment outreach",
      "AI talent acquisition",
      "AI hiring assistant",
    ],
  },
  {
    slug: "service-report-writer",
    name: "Service Report Writer",
    tagline:
      "Field service technicians speak; the agent writes the branded, compliant service report.",
    category: "Field Service",
    department: "Service / Operations",
    heroDescription:
      "Service Report Writer is an AI field-service-report agent that turns a technician's voice note or rough text into a branded, compliant service report — with part numbers, failure codes, and recommended follow-ups extracted and formatted correctly. Built on Claude AI. Cuts 45-minute report writeups to 3 minutes per visit.",
    longDescription:
      "Field service technicians don't want to write reports. They want to fix machines and go home. Yet every service visit generates paperwork: the customer needs a signed service report, the company needs a warranty record, and the service manager needs a failure-mode log. Service Report Writer bridges the gap — the technician records a 60-second voice note (\"Replaced the feeder motor, serial ABC-123, under warranty, customer happy, recommended oil change in 90 days\"), and the agent generates the full branded service report with the correct part numbers, warranty flags, customer-signable format, and a structured failure-mode log for the back office. Technicians finish paperwork 15x faster. Service managers get clean data for the first time.",
    inputs: [
      "Technician voice note or rough text",
      "Visit metadata (customer, machine serial, date)",
      "Parts used / replaced",
      "Customer signoff status",
    ],
    outputs: [
      "Branded service report (customer-signable)",
      "Warranty claim draft (if applicable)",
      "Structured failure-mode entry for service manager dashboard",
      "Follow-up recommendations with due dates",
      "Flagged discrepancies for service manager review",
    ],
    useCases: [
      {
        title: "Industrial machinery service",
        description:
          "Multi-line manufacturers with field technicians visiting installed base. Every visit needs a report; most reports are skipped or written days later.",
      },
      {
        title: "Medical equipment service",
        description:
          "Regulated environment — service reports are compliance artifacts. Agent enforces the report structure required by regulators.",
      },
      {
        title: "HVAC / facilities service",
        description:
          "High-volume low-complexity visits. Agent turns technicians' shorthand into full reports customers actually read.",
      },
    ],
    sampleRun: {
      input:
        "Voice note: \"Went to Acme, replaced the auto-feeder belt on C-Series 105 serial 44812. Used part number BLT-8842, under warranty. Recommend full lubrication at next scheduled visit. Customer happy, signed off.\"",
      output:
        "2-page branded service report: customer ID, machine serial, visit date, parts replaced (BLT-8842 × 1, warranty), labor hours (0.75), next recommended service (full lubrication, due ~90 days), customer signoff. Backend failure log: \"feeder belt premature wear on C-Series 105, Q1 2026 — 3rd occurrence this quarter, recommend root-cause review.\"",
    },
    faqs: [
      {
        question: "What is the Service Report Writer?",
        answer:
          "Service Report Writer is an AI agent that turns a technician's voice note or rough text into a branded, compliant service report with parts, warranty flags, and follow-ups. Built on Claude AI. It cuts 45-minute manual reports to 3-minute voice-note dictations.",
      },
      {
        question: "Does the technician need a special app?",
        answer:
          "No. A voice note on WhatsApp or a typed note in any tool works. Settle integrates with whatever the technicians already use.",
      },
      {
        question: "How does it handle warranty logic?",
        answer:
          "Warranty rules are loaded into a Claude knowledge file during deployment. The agent checks the machine age, part category, and warranty terms — then flags the report as warranty-covered or out-of-warranty with supporting evidence.",
      },
      {
        question: "Does it surface failure-mode patterns?",
        answer:
          "Yes. Each service report generates a structured failure-mode entry that feeds a service manager dashboard. Recurring failures (e.g., premature belt wear on specific serials) surface as patterns within weeks.",
      },
      {
        question: "What about regulated industries (medical, aviation)?",
        answer:
          "Report structure is configurable per regulatory requirement. The agent enforces the exact field set required — and refuses to close a report with missing regulated fields.",
      },
    ],
    pricing: {
      creditsPerRun: 80,
      estimatedUsdPerRun: "$0.30–$0.60 per report",
      billing: "Pre-paid credits. Volume pricing for >500 reports/month.",
    },
    timeSavedPerRun: "40+ minutes per report (45 min manual → 3 min voice-note)",
    deploymentTime: "2–3 weeks",
    keywords: [
      "AI service report",
      "AI field service assistant",
      "voice-to-report AI",
      "Claude AI for field service",
      "technician report automation",
      "AI warranty claim writer",
      "AI failure-mode analyzer",
    ],
  },
  {
    slug: "bom-generator",
    name: "BOM Generator",
    tagline:
      "Product specs in, full Bill of Materials out — with costs, alternates, and procurement-ready line items.",
    category: "Engineering & Procurement",
    department: "Engineering / Procurement",
    heroDescription:
      "BOM Generator is an AI Bill-of-Materials agent that turns a product spec or customer configuration into a complete, costed BOM with vendor alternates and procurement-ready line items. Built on Claude AI. Replaces the 1-to-2 day engineer-and-procurement tennis match with a 30-minute first draft.",
    longDescription:
      "Generating a Bill of Materials for a configured product is one of the most error-prone, cross-functional processes in any manufacturing business — engineering writes specs, procurement matches suppliers, finance prices it, and half the time nobody realizes an alternate supplier has been qualified for a key component. BOM Generator consolidates all three: it ingests a product spec or customer configuration, references a versioned components library (with preferred vendors, qualified alternates, current pricing bands, and lead times), and returns a procurement-ready BOM with line-item costs, alternate supplier flags, and total landed cost estimates. First draft in 30 minutes instead of 1–2 days of cross-team back-and-forth.",
    inputs: [
      "Product spec or customer configuration",
      "Target quantity",
      "Components library (loaded at deployment)",
      "Supplier preference list (optional)",
      "Cost target or budget (optional)",
    ],
    outputs: [
      "Procurement-ready BOM (spreadsheet-exportable)",
      "Per-line-item cost, lead time, and preferred vendor",
      "Alternate vendor flags for risk-sensitive items",
      "Total landed cost estimate",
      "Flagged items requiring engineering review (ambiguous specs)",
    ],
    useCases: [
      {
        title: "Configured-to-order manufacturing",
        description:
          "Every customer order has a slightly different BOM. Manual BOM creation is the bottleneck that delays quotations and production starts.",
      },
      {
        title: "New product introduction",
        description:
          "R&D teams need initial BOMs to estimate product cost. BOM Generator produces a first-pass BOM the day specs freeze, not two weeks later.",
      },
      {
        title: "Cost re-optimization",
        description:
          "Procurement re-running BOMs with alternate suppliers to identify cost savings. Agent produces dozens of re-costed variants in a day.",
      },
    ],
    sampleRun: {
      input:
        "Product: C-Series 105 base config, auto-feeder, UV-enabled, 220V. Quantity: 1 unit. Preference: use domestic suppliers where possible.",
      output:
        "BOM: 847 line items, total cost estimate ₹X.X cr (±3%), 12 items flagged for procurement review (custom castings with single-source supplier), 34 items with domestic alternates qualified, 8 items with lead times > 10 weeks flagged for early procurement.",
    },
    faqs: [
      {
        question: "What is an AI BOM Generator?",
        answer:
          "An AI BOM Generator is an agent that turns product specs into a complete Bill of Materials with costs, vendors, and alternates. Settle's BOM Generator runs on Claude AI with a versioned components library — producing procurement-ready BOMs in 30 minutes instead of 1–2 days of cross-team work.",
      },
      {
        question: "How does it know our vendors and pricing?",
        answer:
          "During deployment, Settle loads your components library into a Claude knowledge file: part numbers, preferred vendors, qualified alternates, recent pricing bands, and lead times. The agent only uses your library — it never invents vendors or prices.",
      },
      {
        question: "What about ECO (engineering change order) workflows?",
        answer:
          "BOM Generator produces drafts. ECO approvals stay with your engineering change board. The agent produces the revised BOM and flags all changes vs the prior version for reviewer sign-off.",
      },
      {
        question: "Does it integrate with our PLM or ERP?",
        answer:
          "Yes. Common integrations: SAP, Oracle, Teamcenter, Windchill, Arena. For proprietary systems, Settle builds a lightweight MCP connector in 3–5 days.",
      },
      {
        question: "How accurate is the cost estimate?",
        answer:
          "Typically within ±3–5% of the final procurement-validated cost, assuming the components library is current. The agent surfaces items where pricing is stale (>90 days) as flags for procurement refresh.",
      },
    ],
    pricing: {
      creditsPerRun: 300,
      estimatedUsdPerRun: "$1.50–$4.00 per BOM",
      billing: "Pre-paid credits. Volume pricing for >100 BOMs/month.",
    },
    timeSavedPerRun: "1–2 days per BOM (cross-team → single AI run)",
    deploymentTime: "3–5 weeks (includes components library structuring)",
    keywords: [
      "AI BOM generator",
      "AI Bill of Materials",
      "Claude AI for manufacturing",
      "automated BOM creation",
      "AI procurement assistant",
      "AI product costing",
      "engineering BOM AI",
    ],
  },
];

export function getAllAgentSlugs(): string[] {
  return AGENTS.map((a) => a.slug);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}
