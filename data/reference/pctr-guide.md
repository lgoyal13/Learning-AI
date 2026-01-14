# PCTR Framework for Effective Prompts

The PCTR framework is the foundational prompting structure. All generated prompts should follow this pattern, with labels visible but not intrusive.

---

## P - Persona

**What it is:** Who should the AI be?

**Why it matters:** Gives the AI a perspective, expertise level, and shapes tone.

**Good example:**
```
You are a senior financial analyst with expertise in variance analysis.
```

**Weak example:**
```
You are an AI assistant.
```

**When generating:** Always include a specific, relevant persona. Match expertise to the task.

---

## C - Context

**What it is:** What background does the AI need?

**Why it matters:** Helps the AI understand the situation and tailor its response.

**Include:**
- User's role and situation
- The audience for the output
- Relevant constraints or history
- What they've already done

**Good example:**
```
I'm preparing a monthly report for my CFO. We were 15% over budget on marketing spend last quarter. I've already gathered the raw data from our finance system.
```

**Weak example:**
```
I have some data.
```

**When generating:** Include all context the user provided. Use `[INSERT: description]` for gaps.

---

## T - Task

**What it is:** What specifically should the AI do?

**Why it matters:** Clear tasks get clear outputs.

**Use action verbs:** Analyze, Identify, Draft, Compare, Summarize, Create, Explain, Generate, Review

**Good example:**
```
Identify the top 3 root causes for the budget variance and suggest one follow-up question I should ask each department head.
```

**Weak example:**
```
Help me with this.
```

**When generating:** Be specific about the action. Include scope (top 3, main points, etc.).

---

## R - Requirements

**What it is:** What are the constraints on the output?

**Why it matters:** Without requirements, the AI guesses - and often guesses wrong.

**Include:**
- Format (bullets, table, narrative, JSON)
- Length (2 sentences, 1 page, 500 words)
- Tone (formal, casual, technical)
- Other constraints (cite sources, include examples, etc.)

**Good example:**
```
Format as a bulleted list. Keep each item to 2 sentences max. Use professional tone suitable for an executive audience.
```

**Weak example:** (no requirements = AI guesses)

**When generating:** Always include format and length. Add tone when audience is specified.

---

## Marking Gaps with [INSERT]

When information is unknown, mark it clearly.

**Format:** `[INSERT: description of what's needed]`

**Be specific:** Describe what type of information belongs there.

**Good examples:**
- `[INSERT: your 3-5 key competitors]`
- `[INSERT: the time period for analysis, e.g., Q3 2025]`
- `[INSERT: your company's industry]`
- `[INSERT: specific metrics you want to highlight]`
- `[INSERT: your stakeholder's priorities]`

**Bad examples:**
- `[INSERT: data]` - too vague
- `[INSERT: info]` - not descriptive
- `[TBD]` - wrong format

**Placement:** Keep markers inline in the prompt. Also list all markers at the bottom of generated game plans for easy reference.

---

## Visual Display

When displaying prompts, make PCTR structure visible but not intrusive.

**Recommended format:**
```
[P] You are a senior financial analyst...

[C] I'm preparing a monthly report for my CFO...

[T] Identify the top 3 root causes...

[R] Format as a bulleted list...
```

The labels help users absorb the pattern through repeated exposure without being distracting.

---

## Quality Checklist

Before outputting any prompt, verify:

- [ ] Persona is specific and relevant to the task
- [ ] Context includes all user-provided information
- [ ] Unknown context is marked with `[INSERT: ...]`
- [ ] Task uses clear action verb and specific scope
- [ ] Requirements include format and length at minimum
- [ ] Tone matches the specified audience
- [ ] Overall prompt is copy-paste ready (except INSERT markers)
