# Few-Shot Examples for Prompting

This document contains example structures to include in API prompts. These serve as few-shot examples that teach the model the patterns we want.

---

## Game Plan Example (For API Use)

When generating game plans, include 1-2 abbreviated examples in the prompt:

```
EXAMPLE GAME PLAN:

Plan Name: Monthly Variance Analysis for CFO
Confidence: High
Confidence Reasoning: Clear analytical task with defined stakeholders, follows Analyze → Pattern → Recommend pattern.

Summary: Creating a variance analysis to explain budget deviations to the CFO, with root cause identification and recommendations.

Total Time: 120 minutes

Steps:

Step 1: Gather Data
Actor: Human
Time: 20 min
What to do: Export actual vs budget figures from finance system. Ensure you have department-level breakdowns.
Why this matters: Clean data is the foundation—garbage in, garbage out.
Watch out: Make sure you're comparing the same time periods and account structures.

Step 2: Identify Major Variances
Actor: AI-Assisted
Tool: Claude
Tool rationale: Strong at pattern recognition in structured data
Time: 15 min
Prompt:
[P] You are a senior financial analyst.
[C] I have variance data showing actual vs budget by department. [INSERT: paste your variance summary]
[T] Identify the top 5 variances by dollar amount and flag any that are greater than 10% off budget.
[R] Format as a table with columns: Department, Variance $, Variance %, Flagged (Y/N)
Why this matters: Focus attention on what matters most—materiality over completeness.
Watch out: Don't just look at percentages—a 50% variance on a small line item may be less important than 8% on a large one.

[... additional steps follow same pattern ...]

Insert Markers Used:
- [INSERT: paste your variance summary]
- [INSERT: your CFO's known priorities]
```

---

## User-Facing Prompt Example

When the prompt generator creates prompts for users, output should look like:

```
[P] You are a senior marketing strategist with expertise in B2B technology campaigns.

[C] I'm the marketing manager at [INSERT: your company name], a [INSERT: your company's product/service] company. We're planning our Q1 campaign targeting [INSERT: your target audience]. Our budget is [INSERT: approximate budget range] and we've historically seen success with [INSERT: channels that have worked].

[T] Create a campaign brief that outlines the key messaging pillars, recommended channels, and a rough timeline for a 6-week campaign launch.

[R] Structure as:
1. Campaign objective (2-3 sentences)
2. Key messages (3 pillars, 1 paragraph each)
3. Channel recommendations (prioritized list with rationale)
4. 6-week timeline (high-level milestones)

Keep the total length under 2 pages.
```

---

## Task Complexity Examples

For recognizing when to suggest a game plan vs. just providing a prompt:

**Simple tasks (prompt is sufficient):**
- "Help me write an email to my team about the meeting time change"
- "Summarize this article"
- "Explain what a P/E ratio is"
- "Proofread this paragraph"

**Complex tasks (game plan would help):**
- "I need to create a competitive analysis for my VP" → Research + Synthesis + Presentation
- "Help me prepare for my quarterly business review" → Data gathering + Analysis + Deliverable
- "I'm launching a new marketing campaign and need to plan it out" → Planning + Execution + Tracking
- "I need to build a financial model for this investment" → Research + Modeling + Validation

**Signals of complexity:**
- Multiple outputs mentioned ("analyze AND present")
- Research component ("competitive analysis", "market research")
- Stakeholder deliverable ("for my VP", "board presentation")
- Time-intensive keywords ("quarterly review", "annual planning")
- Iteration implied ("draft and refine", "get feedback")

---

## Domain Inference Examples

For inferring which domain context to apply:

**Finance signals:**
- Keywords: "variance", "budget", "forecast", "CFO", "board", "audit", "P&L", "revenue", "margin", "ROI", "IRR"
- Stakeholders: CFO, finance team, board, auditors

**Marketing signals:**
- Keywords: "campaign", "content", "brand", "audience", "engagement", "CTR", "conversion", "funnel", "leads"
- Stakeholders: CMO, brand team, agencies

**Business Ops / Strategy signals:**
- Keywords: "OKR", "strategy", "cross-functional", "executive", "competitive analysis", "business review"
- Stakeholders: Executives, department heads

**General Business (default):**
- Doesn't clearly fit above categories
- Mixed signals
- Unknown domain

---

## Clarifying Question Examples

Questions should build on prior context (cumulative):

**Context:** User said "I need to create a competitive analysis for my VP"

**Good questions (cumulative):**
1. "You mentioned this is for your VP. What would make this analysis successful in their eyes? What are they hoping to learn or decide?"

2. "What do you already have to work with, and what will you need to figure out? (competitors you're tracking, data you have, research you've done)"

3. "Anything else I should know? (timeline, specific competitors to focus on, format preferences)"

**Bad questions (repetitive/generic):**
1. "What are you trying to accomplish?" — already told us
2. "Who is your audience?" — already told us (VP)
3. "Please describe your task in detail" — feels like a form

---

## Step Actor Examples

For deciding who does each step:

**Human steps:**
- Gathering proprietary data ("Export from your CRM")
- Making judgment calls ("Decide which 3 competitors matter most")
- Stakeholder interactions ("Get input from your manager")
- Final approval ("Review and approve before sending")

**AI-Assisted steps:**
- Research and synthesis ("Research competitor positioning")
- Pattern recognition ("Identify trends in the data")
- Drafting ("Create first draft of the report")
- Reformatting ("Convert findings into presentation format")

**Mixed steps:**
- AI drafts + human reviews ("Generate draft, then review for accuracy")
- Human provides input + AI processes ("Paste your data, AI will analyze")
