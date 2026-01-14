# Game Plan Generation Schema

The JSON schema for generated game plans. The Gemini API returns this structure, which the frontend renders.

---

## TypeScript Interface

```typescript
interface GeneratedGamePlan {
  // Metadata
  planName: string;                    // Concise name based on task
  generatedAt: string;                 // ISO timestamp
  
  // Domain and confidence
  inferredDomain: string;              // "Finance & FP&A" | "Marketing" | "Business Ops / Strategy" | "General Business"
  domainReasoning: string;             // One sentence explaining why this domain
  confidence: "High" | "Medium" | "Low";
  confidenceReasoning: string;         // One sentence explaining confidence level
  
  // User context summary
  userContextSummary: string;          // 2-3 sentences summarizing what we understood
  
  // Time estimates
  totalTimeMinutes: number;
  
  // Gap tracking
  insertMarkers: string[];             // List of all [INSERT: x] markers used
  
  // The steps
  steps: GeneratedStep[];
}

interface GeneratedStep {
  stepNumber: number;
  stepName: string;                    // Short, action-oriented name
  
  // Who does this
  actor: "Human" | "AI-Assisted" | "Mixed";
  
  // Time
  timeMinutes: number;
  
  // Tool (only for AI-Assisted or Mixed)
  tool: string | null;                 // "ChatGPT" | "Claude" | "Gemini" | "Perplexity" | "NotebookLM" | null
  toolRationale: string | null;        // One sentence on why this tool
  
  // Instructions
  whatToDo: string;                    // 2-3 sentences, plain language
  
  // Prompt (only for AI-Assisted or Mixed)
  prompt: string | null;               // Full PCTR-structured prompt with [INSERT] markers
  
  // Learning content
  whyThisMatters: string;              // One sentence
  watchOut: string;                    // One sentence, common mistake or pitfall
}
```

---

## Example Output

```json
{
  "planName": "Competitive Analysis for VP",
  "generatedAt": "2026-01-12T14:30:00Z",
  "inferredDomain": "Business Ops / Strategy",
  "domainReasoning": "Task involves strategic analysis for executive stakeholders, with competitive positioning focus.",
  "confidence": "High",
  "confidenceReasoning": "Clear goal and audience specified; fits Research → Synthesize → Present pattern well.",
  "userContextSummary": "You're creating a competitive analysis for your VP and leadership team to help them understand market positioning. You have some internal data but need to research recent competitor moves.",
  "totalTimeMinutes": 150,
  "insertMarkers": [
    "[INSERT: your 3-5 key competitors]",
    "[INSERT: specific questions leadership wants answered]",
    "[INSERT: your company's industry]"
  ],
  "steps": [
    {
      "stepNumber": 1,
      "stepName": "Define Your Focus",
      "actor": "Human",
      "timeMinutes": 15,
      "tool": null,
      "toolRationale": null,
      "whatToDo": "Before diving into research, clarify what matters most. Which competitors should you focus on? What specific questions does your VP want answered?",
      "prompt": null,
      "whyThisMatters": "A focused analysis beats a comprehensive one that doesn't answer the real questions.",
      "watchOut": "Don't try to cover everything—pick 3-5 competitors and 2-3 key questions."
    },
    {
      "stepNumber": 2,
      "stepName": "Research Competitors",
      "actor": "AI-Assisted",
      "timeMinutes": 30,
      "tool": "Perplexity",
      "toolRationale": "Best for research with citations—you can verify findings before presenting to leadership.",
      "whatToDo": "Use Perplexity to research each competitor's recent moves, positioning, and public metrics. Focus on the last 6 months.",
      "prompt": "[P] You are a competitive intelligence analyst.\n\n[C] I'm researching [INSERT: competitor name] for a strategic analysis. My company is in the [INSERT: your company's industry] space.\n\n[T] Find recent news, strategic moves, and market positioning for this competitor from the last 6 months.\n\n[R] Cite your sources. Flag anything unverified. Organize by category (product, pricing, partnerships).",
      "whyThisMatters": "Fresh competitor intel prevents building on outdated assumptions.",
      "watchOut": "Don't just copy-paste results—extract the 3-5 findings most relevant to your questions."
    }
  ]
}
```

---

## Validation Rules

Before rendering, validate:

1. **Required fields:** All top-level fields must be present
2. **Steps count:** 3-7 steps (flag if outside this range)
3. **Actor values:** Must be "Human", "AI-Assisted", or "Mixed"
4. **Confidence values:** Must be "High", "Medium", or "Low"
5. **Tool consistency:** AI-Assisted steps must have `tool` and `prompt`; Human steps should have `null`
6. **Insert markers:** Array should match markers found in prompts
7. **Time sanity:** Total should roughly equal sum of step times

---

## Error Handling

**If generation returns invalid JSON:**
1. Retry once with the same prompt
2. If still invalid, show fallback:
   > "I had trouble building a custom game plan. Here's a general template that might help as a starting point."
3. Show a general-purpose plan from the closest matching pattern

**If validation fails:**
1. Attempt to fix obvious issues (e.g., calculate missing totalTimeMinutes)
2. If unfixable, treat as invalid JSON and follow error handling above
