# Ruben Hassid's Claude Playbook Is Great. Here's What It Misses When You Deploy at Scale.

*A 7-day framework gets you started. Here's what the next 90 days actually look like — from deploying 11 Claude projects at a 200-person manufacturer.*

---

Everyone's seen the demo. The CEO watches a two-minute video of Claude drafting a perfect email, summarizing a 40-page contract, or turning meeting notes into action items. Eyes light up. "We need this for the whole company."

Then nothing happens.

Or worse — someone buys 50 Team licenses, sends a Slack message that says "check out Claude," and three weeks later usage has flatlined. Sound familiar?

That's why I was genuinely excited when I saw Ruben Hassid's piece, ["How to set up Claude for your team in 7 days."](https://x.com/rubenhassid/status/2031666815554736227) It's the best tactical playbook I've seen for getting a team from zero to productive with Claude. If you haven't read it, go do that first. I'll be here when you get back.

But here's the thing: Ruben's framework is built for teams that are mostly knowledge workers — marketers, writers, analysts — who already live in text. My company, Settle, deploys Claude for manufacturers and mid-market companies where the people who need AI the most have never opened a chatbot in their lives.

That's a different problem. And it requires a different layer on top of Ruben's playbook.

## What Ruben Gets Right (And Why It Matters)

The core of Ruben's framework is deceptively simple: **Claude Projects + prompt templates + one internal champion, deployed in a structured week.**

Day 1-2, you set up Projects — dedicated workspaces with custom instructions so Claude already knows your company's context. Day 3-4, you build prompt templates so people don't stare at a blank chat box. Day 5-7, you train your champion and roll out.

This is genuinely good advice. The two biggest reasons AI adoption fails inside companies are (1) people don't know what to ask, and (2) every conversation starts from scratch with no context. Projects and templates solve both.

At Settle, we've seen this pattern over and over. **The blank prompt box is the single biggest adoption killer.** It's the enterprise equivalent of writer's block. When you hand someone a template that says "Paste the customer complaint below and Claude will draft a response in our brand voice," adoption goes from 10% to 80% overnight.

Ruben nails that insight. Full credit.

## Where the Framework Hits a Wall

Here's what happens when you take that 7-day playbook into a 200-person manufacturing company.

Our first client was Orient Printing & Packaging. They don't have a "content team" or a "marketing department" that lives in Google Docs all day. They have procurement managers, quality engineers, production planners, and sales reps who spend half their time on a factory floor and the other half buried in Excel and ERP systems.

When we walked in, we didn't start with Claude Projects. **We started with a clipboard.**

We spent two weeks shadowing people. Sitting in on calls. Reading the emails they hated writing. Watching them copy-paste between five different systems to generate a single quote.

We mapped **49 distinct use cases** across the organization before we opened Claude once.

That's the first thing Ruben's playbook misses for larger orgs: **discovery has to come before deployment.** In a 10-person marketing team, you can probably guess the use cases. In a manufacturing company with multiple departments, dozens of document types, and complex approval workflows — you can't.

## 5 Lessons From Deploying Claude at Scale

Here's what we learned at Orient that complements Ruben's framework. These aren't theoretical. They come from 11 deployed projects, 85% faster document generation, and over 400 hours saved per month.

### 1. Map Use Cases Before You Map Projects

Ruben recommends setting up Projects on Day 1. For teams under 20 people, that works. For larger orgs, **you need a use case audit first.**

We use a simple framework: watch someone do a task, then ask two questions. First, "Is this task mostly about transforming information from one format to another?" Second, "Does it follow a roughly predictable pattern?"

If both answers are yes, Claude can probably do 80% of it. If only one is yes, Claude can assist but won't replace the workflow. If neither, move on.

At Orient, 49 use cases passed the first filter. We prioritized the 11 with the highest time savings and lowest risk of error. Those became our Claude Projects.

**The lesson:** Don't let the tool define the problem. Define the problem, then match the tool.

### 2. Prompt Templates Aren't Enough — You Need Workflow Templates

Ruben's prompt templates are a great start. But in a manufacturing environment, a single task often spans multiple prompts in sequence.

For example, Orient's sales team generates quotes that require pulling specs from a product database, calculating pricing based on quantity tiers, drafting the quote in a specific format, and then generating a follow-up email. That's not one prompt. That's a workflow.

We build what we call **workflow templates** — a documented sequence of 3-5 prompts that chain together, with clear instructions on what to paste in at each step and what to carry forward to the next.

It sounds simple, but the difference in adoption is massive. **A single prompt template gets used. A workflow template replaces a process.**

### 3. The Champion Model Needs a Layer: Department Translators

Ruben's "one champion" model is smart. Having a single person who owns the rollout, answers questions, and builds enthusiasm — that works.

But in a company with multiple departments, one champion isn't enough. They don't speak procurement. They don't understand the nuances of quality control documentation. They can't sit in on every sales call.

At Orient, we trained **one translator per department** — someone who understood both Claude's capabilities and their team's daily pain points. These weren't technical people. They were the person in each department who was already the go-to for "how do I do this in Excel?"

The champion coordinated. The translators customized. Adoption went company-wide in weeks, not months.

### 4. Measure in Hours Saved, Not "Usage"

Most companies track AI adoption by looking at how many people logged in or how many messages were sent. That tells you almost nothing.

At Orient, we measure one thing: **hours saved per month per use case.** Every deployed project has a baseline — how long the task took before Claude — and a current average. We review these numbers monthly.

The 400+ hours per month we saved didn't come from 200 people each saving 2 hours. It came from about 35 people saving 10-15 hours each on high-volume, repetitive tasks. That concentration matters because it tells you where to double down.

**If you can't quantify the time saved, you can't justify the investment.** And you definitely can't expand it.

### 5. The Custom Instructions Are the Product

In Ruben's playbook, custom instructions in Projects are a setup step — something you configure in the first two days. In our experience, **the custom instructions are the most important thing you'll build.**

At Orient, our custom instructions for the document generation project are over 2,000 words long. They include the company's formatting standards, terminology preferences, common errors to avoid, regulatory language that must appear in certain document types, and examples of approved outputs.

We iterated on those instructions for three weeks after initial deployment. Every time someone flagged an output that wasn't quite right, we updated the instructions. The quality curve was steep — outputs went from "okay, I can edit this" to "this is ready to send" within a month.

**Treat your custom instructions like a product, not a configuration file.** Version them. Review them. Improve them weekly.

## The Real Gap: AI Demos vs. AI Deployment

Here's what I keep coming back to. There are a thousand tutorials on how to use Claude. Ruben's is one of the best for teams getting started. But the gap in the market isn't "how to use the tool." It's **"how to change the work."**

Using Claude is easy. Figuring out which of your company's 200 recurring tasks should be reimagined with Claude, building the templates and instructions to make it reliable, training the people who've never used a chatbot, and measuring whether it's actually working — that's the hard part.

That's the part that takes more than 7 days. And honestly, that's the part most companies need help with.

## What I'd Tell a CEO Who Just Read Ruben's Article

Read it again. Seriously, the framework is solid.

Then, before you do anything, sit with your team for a week. Not to talk about AI — to watch them work. Count the tasks that are just moving information from one place to another. Count the documents that follow a template but still take an hour to produce. Count the emails that get written from scratch every time even though they're 90% identical.

**That list is your deployment roadmap.** Not a list of Claude features. A list of your company's pain.

Then build Projects and templates around that list. Put a champion and translators in place. Measure hours saved, not logins. And iterate on your custom instructions like your ROI depends on it — because it does.

If you want help with that process, that's what we do at Settle. We're a Claude AI deployment studio for manufacturers and mid-market companies. We handle the discovery, the project architecture, the training, and the measurement so your team gets real results — not just another tool they forget about.

**Check us out at [settlewithai.com](https://settlewithai.com).**

---

*Pranav is the founder of Settle, a Claude AI deployment studio that helps manufacturers and mid-market companies turn AI potential into measurable operational gains. Settle's first engagement — 49 use cases mapped, 11 projects deployed, 400+ hours/month saved. He writes about what actually works when you move past the demo.*

<!-- Tags: AI, Claude AI, Artificial Intelligence, Business, Productivity -->
