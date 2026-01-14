---
name: game-plan-generation
description: Reference documents and schema for generating custom game plans in the AI Learning App. Use when implementing the game plan generator feature (Stage 4 of the user flow), building the generation prompt, working on plan presentation UI, or debugging generation quality issues.
---

# Game Plan Generation

This skill contains the reference documents and patterns for generating custom game plans for users. These documents get injected into the Gemini API call when generating plans.

## Overview

The generation prompt has this structure:

1. **System instruction** — AI's role and principles (always included)
2. **Workflow patterns** — Universal structural templates (always included)
3. **Domain context** — Flavor for the user's professional context (selected based on inference)
4. **PCTR guide** — How to construct prompts within the plan (always included)
5. **User context** — Everything gathered from Stages 1 and 3
6. **Instructions** — What to generate
7. **Output schema** — JSON structure for parsing

## Reference Documents

- [WORKFLOW_PATTERNS.md](WORKFLOW_PATTERNS.md) — The 5 universal patterns
- [DOMAIN_CONTEXTS.md](DOMAIN_CONTEXTS.md) — Flavor for finance, marketing, ops, general
- [GENERATION_SCHEMA.md](GENERATION_SCHEMA.md) — JSON schema for generated plans

## System Instruction (Always Included)

```
You are an AI game plan coach helping non-technical business professionals complete tasks using AI tools effectively.

PRINCIPLES:
- Teach, don't just answer. Every output should help users get better at AI.
- Be honest about uncertainty. Use [INSERT: description] markers for information gaps.
- Keep it scannable. Busy professionals skim first.
- Use the PCTR framework for all prompts you generate.
- Mark human steps clearly. Not everything should be AI-assisted.
- Plans should be starting points, not finished products.

CONSTRAINTS:
- Game plans must have 3-7 steps (aim for 4-5)
- Only recommend these tools: ChatGPT, Claude, Gemini, Perplexity, NotebookLM
- Each step needs: stepNumber, stepName, actor, timeMinutes, whatToDo
- AI-Assisted steps also need: tool, toolRationale, prompt (PCTR-structured)
- Mark unknown information with [INSERT: description of what's needed]
- Include "whyThisMatters" (1 sentence) for each step
- Include "watchOut" (1 sentence) for each step
- Always state confidence level (High/Medium/Low) and reasoning
```

## Domain Inference

The AI infers domain from the user's task description:

| Domain | Signal Words |
|--------|--------------|
| Finance & FP&A | variance, budget, forecast, CFO, board, audit, P&L, revenue, margin, ROI |
| Marketing | campaign, content, brand, audience, engagement, CTR, conversion, funnel |
| Business Ops / Strategy | OKR, strategy, cross-functional, executive, competitive analysis, business review |
| General Business | Default when unclear or mixed signals |

State the inferred domain and reasoning in the output.

## Confidence Assessment

| Level | When to Use |
|-------|-------------|
| **High** | Task clearly matches a pattern, substantial context provided, domain is clear |
| **Medium** | Task partially matches patterns, some context provided, domain inferrable |
| **Low** | Task is unusual, limited context, domain unclear |

Always explain the confidence reasoning in one sentence.

## Tool Recommendations

| Tool | Best For |
|------|----------|
| **Perplexity** | Research with citations, fact-finding, current information |
| **Claude** | Analysis, reasoning, complex synthesis, long documents |
| **ChatGPT** | General drafting, brainstorming, conversational tasks |
| **Gemini** | Google ecosystem integration, multimodal tasks |
| **NotebookLM** | Working with uploaded documents, source-grounded Q&A |

Include a brief rationale for each tool choice in the step.

## [INSERT] Marker Guidelines

Mark gaps with descriptive placeholders:

**Good:**
- `[INSERT: your 3-5 key competitors]`
- `[INSERT: paste your variance data here]`
- `[INSERT: your stakeholder's main priorities]`

**Bad:**
- `[INSERT: data]` — too vague
- `[INSERT: info]` — not descriptive

Collect all markers and list them at the end of the plan.

## Validation Checklist

Before returning a generated plan:

- [ ] 3-7 steps (ideally 4-5)
- [ ] Each step has all required fields
- [ ] AI-Assisted steps have tool + prompt
- [ ] Prompts follow PCTR structure
- [ ] Gaps marked with `[INSERT: ...]`
- [ ] Confidence and reasoning included
- [ ] Domain inference stated
- [ ] Total time is reasonable
- [ ] INSERT markers collected at end
