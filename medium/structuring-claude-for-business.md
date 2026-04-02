# How to Structure Claude for Your Business: Skills, MCP, and the Instruction Architecture That Actually Scales

*A designer named Katherine Yeh recently published a [guide to organising Claude Code for design work](https://medium.com/design-bootcamp/a-designers-guide-to-organizing-ai-skills-and-tools-in-claude-code-f87477c35b82). Her three-layer architecture — reference knowledge, capability workflows, and tool connectors — is exactly the pattern we use for deploying Claude across entire companies. But most businesses never get there. They dump everything into one Claude project and wonder why the results are inconsistent.*

---

## The one-project trap

Here's what the first week of Claude adoption looks like at most companies. Someone creates a project called "Company AI" or "Marketing Assistant." They paste in the company website, a few product descriptions, maybe a brand guide PDF. They write a system prompt that says something like "You are a helpful assistant for [Company Name]. Use a professional tone."

It works — sort of. Claude knows the basics. It can draft emails that sound vaguely on-brand. But by week three, the cracks appear:

- Sales uses the same project for proposals, cold emails, and CRM summaries — and the instructions that help with one hurt the others
- Someone updates the pricing sheet but forgets to update the knowledge file, so Claude quotes last quarter's rates
- The project instructions are now 3,000 words of accumulated patches, and nobody remembers which rules are still relevant
- Two departments have created their own projects with conflicting versions of the company description

This is the one-project trap. And it's why most companies plateau at "Claude is useful for drafts" and never reach "Claude runs our workflows."

## The three-layer architecture

The solution is the same pattern Katherine Yeh describes for design work, adapted for business operations. Three layers, each with a clear purpose.

### Layer 1: Reference knowledge

This is everything Claude needs to *know* about your business. Not what to *do* — what to know. It's the foundation that every workflow builds on.

We split reference knowledge into two categories:

**Company-wide references** are shared across every project and department:

- **Brand voice and tone** — Not just "professional," but specific patterns. Do you use contractions? Do you address the reader as "you" or by role? What words do you avoid? What's the difference between how you write to customers vs. partners?
- **Product and service specs** — What you sell, how it works, pricing tiers, technical capabilities. This is the "source of truth" that every project references.
- **Compliance and legal rails** — What Claude must never say. What claims require disclaimers. What data can be shared externally. What regulatory language is mandatory in certain contexts.

**Domain-specific references** are shared within a department or function:

- **Sales**: competitor positioning, objection handling playbook, pricing negotiation boundaries
- **Procurement**: vendor evaluation criteria, approved supplier list, RFQ templates
- **Customer service**: escalation policies, SLA definitions, common issue resolution scripts
- **HR**: job description standards, compensation bands, interview scoring rubrics

The critical principle: **separate knowledge from instructions.** Yeh puts it well — specs answer definitional questions ("what is our return policy?") while workflow instructions handle judgment calls ("how should we respond to this complaint?"). Most companies mash these together. Separating them means you can update a policy without touching every workflow that references it.

### Layer 2: Capability workflows

This is where Claude learns what to *do*. Each capability is a specific, repeatable workflow — not a vague description of a role.

**Bad:** "You are a helpful sales assistant."

**Good:** "Generate an offer document. Pull the customer's history from the CRM connector. Reference the current pricing sheet. Use the formal proposal template. Include delivery timelines based on current production capacity. Flag any line items that exceed the customer's credit limit."

A well-structured capability specifies:

- **Trigger** — What initiates this workflow? A user request, a scheduled event, a data change?
- **Inputs** — What information does Claude need? Where does it come from?
- **References** — Which Layer 1 knowledge files should Claude consult?
- **Steps** — The specific sequence of actions, in order
- **Tools** — Which MCP connectors or external tools are needed?
- **Output format** — What does the finished product look like?
- **Review gates** — Where does a human check the work before it goes further?
- **Edge cases** — What happens when data is missing, conflicting, or outside normal ranges?

At [Orient Printing & Packaging](https://settlewithai.com/blog/orient-case-study), we deployed 11 capabilities in the first engagement. Each one is a distinct workflow with its own instructions, not a monolithic "Orient AI" project. The offer generator references the pricing knowledge file, the product spec sheet, and the proposal template — but it doesn't know anything about HR policies, because it doesn't need to.

### Layer 3: Connectors (MCP)

This is the integration layer. Model Context Protocol servers that connect Claude to your actual business systems.

Common connectors we build:

- **ERP connectors** — Read inventory levels, production schedules, cost data. Write back order updates.
- **CRM connectors** — Pull customer history, deal stage, contact information. Log interactions.
- **Document systems** — Access templates, past proposals, knowledge bases from SharePoint, Google Drive, or Notion.
- **Email and calendar** — Read incoming requests, draft responses, schedule follow-ups.
- **Custom databases** — Any system with an API can become an MCP server.

The key insight about MCP is that it creates a clean boundary between *what Claude knows* (Layer 1), *what Claude does* (Layer 2), and *what Claude can reach* (Layer 3). Changing your CRM from Salesforce to HubSpot means rebuilding one connector — not rewriting every workflow that touches customer data.

## Why the layers matter

This architecture might seem like overkill for a company that just wants Claude to help with emails. But the layers solve three problems that kill every single-project deployment:

**Problem 1: Drift.** Without shared reference files, every project slowly develops its own version of reality. Sales says the product does X. Marketing says it does Y. Customer service says something else entirely. The three-layer architecture forces a single source of truth.

**Problem 2: Maintenance.** When your pricing changes, do you want to update one knowledge file, or hunt through 15 projects to find every place the old price appears? Layered architecture means one update cascades everywhere.

**Problem 3: Quality at scale.** A prompt that works for one use case breaks when you try to stretch it across five. Separate capabilities with explicit specifications produce consistent results on the 500th run, not just the first.

## What this looks like in practice

Let's make this concrete. Here's a simplified version of the architecture we deployed at a 200-person manufacturer:

| Layer | Name | Type | Shared with |
|-------|------|------|-------------|
| L1 | Brand voice guide | Reference | All projects |
| L1 | Product catalogue & specs | Reference | All projects |
| L1 | Pricing & margin rules | Reference | Sales, Procurement |
| L1 | Compliance requirements | Reference | All projects |
| L2 | Offer generator | Capability | Sales |
| L2 | RFQ drafter | Capability | Procurement |
| L2 | Troubleshooting assistant | Capability | Service |
| L2 | Email writer | Capability | All departments |
| L3 | ERP connector (SAP) | MCP | Sales, Procurement, Service |
| L3 | Email connector (Outlook) | MCP | All departments |
| L3 | Document store (SharePoint) | MCP | All departments |

Notice the pattern: the offer generator (L2) references the pricing rules and product catalogue (L1) and uses the ERP connector (L3) to pull real-time data. If the pricing rules change, the offer generator automatically uses the new numbers. If we swap SAP for Oracle, we rebuild the connector but the workflow stays identical.

## How to get started

You don't need to build all three layers at once. Here's the progression we recommend:

**Week 1: Start with Layer 1.** Gather your core reference materials — brand guide, product information, compliance rules. Upload them to a Claude project as knowledge files. Even without workflows or connectors, this immediately improves every conversation because Claude has accurate context.

**Week 2: Build your first capability.** Pick the workflow that eats the most time. Write explicit instructions following the trigger → inputs → references → steps → output → review pattern. Test it 20 times. Find the edge cases. Refine.

**Week 3+: Add connectors.** Once a workflow is reliable with manually provided data, add MCP connectors so Claude can pull the data itself. This is the step that turns Claude from an assistant into an agent.

**Month 2: Scale.** Add more capabilities, one at a time. Each new workflow builds on the reference knowledge you already have. The marginal cost of each new capability drops because the foundation is in place.

## The instruction engineering difference

Katherine Yeh's article demonstrates something important: a designer with no coding experience built a scalable Claude architecture in four weeks. The core skill wasn't technical. It was architectural thinking — deciding what goes where, what references what, and how pieces compose.

That's what we call instruction engineering. It's not prompt writing. It's not software engineering. It's a new discipline that sits between the two — understanding your business well enough to decompose workflows into structured specifications, and understanding Claude well enough to write instructions that produce reliable results at scale.

The companies that figure this out build a compounding advantage. Every workflow they deploy makes the next one cheaper to build, because the reference layer grows and the connectors multiply. The companies that don't end up with 20 disconnected Claude projects and a team that says "AI is useful but not transformative."

The difference is architecture.

---

*[Pranav Ambwani](https://settlewithai.com) is the founder of Settle, a Claude AI deployment studio that helps mid-market companies and manufacturers go from AI experiments to production workflows. Read more at [settlewithai.com](https://settlewithai.com).*
