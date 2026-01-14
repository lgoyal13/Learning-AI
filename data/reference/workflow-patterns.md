# Universal Workflow Patterns for AI-Augmented Work

These patterns serve as structural templates for game plan generation. Match the user's task to an appropriate pattern, then customize based on their specific context.

---

## Pattern A: Research > Synthesize > Present

**Best for:** Competitive analysis, market research, due diligence, landscape scans

**Structure:**
1. Define focus and questions (Human)
2. Gather information (AI + search tools)
3. Synthesize findings (AI + human review)
4. Create deliverable (AI draft + human polish)
5. Present/share (Human)

**Characteristics:**
- Front-loaded with information gathering
- AI excels at synthesis across many sources
- Human judgment critical for "so what" interpretation
- Usually ends with a presentation or document

**Tool recommendations:**
- Step 2: Perplexity (research with citations)
- Step 3: Claude (synthesis and analysis)
- Step 4: ChatGPT or Claude (drafting)

**Signal words:** "research", "competitive", "analysis", "landscape", "due diligence"

---

## Pattern B: Analyze Data > Find Patterns > Recommend

**Best for:** Variance analysis, performance reviews, root cause analysis, diagnostics

**Structure:**
1. Gather/prepare data (Human)
2. Explore and describe data (AI)
3. Identify patterns/anomalies (AI + human validation)
4. Generate hypotheses (AI)
5. Recommend actions (Human with AI input)

**Characteristics:**
- Requires structured data as input
- AI good at pattern spotting, humans good at context
- Recommendations need human validation
- Often feeds into a decision or action

**Tool recommendations:**
- Step 2: Claude or ChatGPT (data exploration)
- Step 3: Claude (pattern identification)
- Step 4: Claude (hypothesis generation)

**Signal words:** "variance", "performance", "root cause", "metrics", "diagnose"

---

## Pattern C: Draft > Feedback > Refine

**Best for:** Reports, emails, presentations, proposals, communications

**Structure:**
1. Define purpose and audience (Human)
2. Create first draft (AI)
3. Review and give feedback (Human)
4. Revise based on feedback (AI)
5. Final polish (Human)

**Characteristics:**
- Iterative by nature
- AI generates volume, human provides taste
- May loop multiple times
- Quality depends on clear initial direction

**Tool recommendations:**
- Step 2: ChatGPT (general drafting) or Claude (complex documents)
- Step 4: Same tool as Step 2 for consistency

**Signal words:** "write", "draft", "email", "report", "presentation", "proposal"

---

## Pattern D: Plan > Structure > Execute

**Best for:** Project plans, OKRs, campaign plans, event coordination

**Structure:**
1. Define goals and constraints (Human)
2. Generate structure/framework (AI)
3. Review and adjust (Human)
4. Fill in details (AI + Human)
5. Finalize plan (Human)

**Characteristics:**
- Strategic thinking upfront
- AI good at structure, human good at priorities
- Details often need human knowledge
- Output is usually a plan document

**Tool recommendations:**
- Step 2: Claude (strategic structuring)
- Step 4: ChatGPT or Claude (detail filling)

**Signal words:** "plan", "OKR", "campaign", "project", "launch", "strategy"

---

## Pattern E: Collect > Organize > Maintain

**Best for:** Documentation, knowledge bases, SOPs, tracking systems

**Structure:**
1. Define what to capture (Human)
2. Create template/structure (AI)
3. Populate initial content (Human + AI)
4. Review and refine (Human)
5. Establish update cadence (Human)

**Characteristics:**
- Ongoing, not one-time
- AI good at structure and templates
- Content often requires human input
- Success depends on maintenance

**Tool recommendations:**
- Step 2: Claude or ChatGPT (template creation)
- Step 3: NotebookLM (if working from existing docs)

**Signal words:** "document", "SOP", "knowledge base", "process", "track"

---

## Pattern Matching Guidelines

**When patterns overlap:**
- Prioritize the pattern that matches the PRIMARY output
- "Competitive analysis presentation" -> Pattern A (research -> present), not Pattern C
- "Quarterly business review" -> Pattern B (analyze -> recommend), not Pattern C

**When nothing fits clearly:**
- Use Pattern A (Research -> Present) as a safe default
- Or combine elements from multiple patterns
- State lower confidence in the output

**Variations:**
Each pattern can be shortened (3 steps for quick version) or expanded (6-7 steps for deep dive). Match to the user's stated scope and timeline.
