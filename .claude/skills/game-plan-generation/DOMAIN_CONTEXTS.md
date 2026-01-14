# Domain Contexts

These context blurbs help the AI understand what different professional domains care about. The AI infers the relevant domain from the user's task and applies the appropriate flavor.

---

## Finance & FP&A

**Priorities:**
- Accuracy and auditability (numbers must be defensible)
- Clear data lineage (where did this come from?)
- Timeliness (monthly close, quarterly reporting, board deadlines)
- Stakeholder management (CFO, board, auditors)

**Common stakeholders:** CFO and finance leadership, Board of directors, External auditors, Department heads

**Typical deliverables:** Variance analyses, Financial reports (P&L, balance sheet, cash flow), Board presentations, Forecasts and models

**Tone:** Precise, professional, metrics-driven, conservative

**AI opportunities:** Narrative generation for variance commentary, Pattern detection in datasets, Draft creation for recurring reports, Scenario modeling

**Cautions:** Financial data is sensitive, Outputs may be audited, Precision matters more than creativity, Always validate AI-generated numbers

---

## Marketing

**Priorities:**
- Speed and agility (market moves fast)
- Creativity and differentiation
- Audience resonance (does it connect?)
- Measurable impact (attribution, ROI)

**Common stakeholders:** CMO and marketing leadership, Brand teams, Agencies, Sales (for alignment)

**Typical deliverables:** Campaign plans and briefs, Content (blog, social, email), Performance reports, Competitive positioning

**Tone:** Persuasive, audience-aware, brand-consistent, action-oriented

**AI opportunities:** Content generation and ideation, Performance analysis, Competitive monitoring, A/B test hypothesis generation

**Cautions:** Brand voice matters—generic AI content stands out, Creative judgment requires humans, Trends move fast—AI knowledge may be outdated, Verify claims and statistics

---

## Business Operations / Strategy

**Priorities:**
- Cross-functional alignment (getting people on same page)
- Executive communication (clear, structured, actionable)
- Actionable insights (so what? now what?)
- Strategic coherence (connects to bigger picture)

**Common stakeholders:** Executives (CEO, COO, division heads), Department heads, Cross-functional teams, Board (for major initiatives)

**Typical deliverables:** Strategy documents, OKRs and goal frameworks, Business reviews (monthly, quarterly), Executive briefings and decision memos

**Tone:** Executive-friendly, strategic framing, options-oriented, action-focused

**AI opportunities:** Research synthesis, Framework application (OKRs, strategy models), Document drafting, Meeting preparation

**Cautions:** Political sensitivity (stakeholder dynamics matter), Context is everything (AI may miss organizational nuance), Strategic judgment is human, Confidentiality concerns

---

## General Business (Default)

Use when the domain is unclear or doesn't fit the above categories.

**Priorities:** Clarity and efficiency, Getting things done, Appropriate to the situation

**Common stakeholders:** Varies by task

**Typical deliverables:** Documents, presentations, analyses, communications

**Tone:** Professional, clear, flexible based on context

**AI opportunities:** Drafting and editing, Research and synthesis, Analysis and summarization, Brainstorming

**Cautions:** When uncertain, ask for clarification, Don't assume domain-specific knowledge, Be explicit about assumptions

---

## Domain Inference Rules

**Use Finance & FP&A when:**
- Task mentions: variance, budget, forecast, CFO, board, audit, P&L, revenue, margin, ROI, IRR
- Stakeholder is financial (CFO, finance team, auditors)
- Output is financial (model, analysis, report with numbers)

**Use Marketing when:**
- Task mentions: campaign, content, brand, audience, engagement, CTR, conversion, funnel, leads
- Stakeholder is marketing (CMO, brand team, agency)
- Output is marketing (campaign, content, creative brief)

**Use Business Ops / Strategy when:**
- Task mentions: OKR, strategy, cross-functional, executive, competitive analysis, business review
- Stakeholder is executive (CEO, COO, division head)
- Output is strategic (plan, review, recommendation)

**Use General Business when:**
- Mixed signals from multiple domains
- Domain unclear from task description
- Task is generic (email, document without domain context)

**Always state the inferred domain and reasoning in the output.**
