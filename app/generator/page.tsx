import React, { useState } from 'react';
import { PageLayout, Card, Button, Badge } from '../../components/ui';
import { PromptDisplay } from '../../components/PromptDisplay';
import { GamePlanView } from '../../components/GamePlanView';
import { RefinementChat } from '../../components/RefinementChat';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  Users,
  Target,
  Wrench,
  RefreshCw,
  ExternalLink,
  Lightbulb,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { generateSimplePrompt, generateGamePlan } from '../../services/geminiService';
import {
  SimpleGeneratorInput,
  SimpleGeneratorOutput,
  AITool,
  GamePlanStage,
  GeneratedGamePlan,
  PlanQuestionsInput,
  RefinementMessage,
  GeneratorFlowState
} from '../../types';

// --- Example chips for quick start ---

const EXAMPLES = [
  { label: 'Board presentation', task: 'A board presentation summarizing Q4 financial results and strategic recommendations' },
  { label: 'Competitive analysis', task: 'A competitive analysis of our top 3 competitors for our leadership team' },
  { label: 'Data analysis', task: 'Analysis of customer churn data to identify key drivers and recommend retention strategies' },
  { label: 'Campaign plan', task: 'A marketing campaign plan for launching our new product next quarter' },
];

// --- Question options ---

const AUDIENCE_OPTIONS = [
  { label: 'Board/Execs', value: 'Board members and executives' },
  { label: 'Leadership', value: 'Senior leadership team' },
  { label: 'Team', value: 'My direct team or colleagues' },
  { label: 'Clients', value: 'External clients or customers' },
];

const GOAL_OPTIONS = [
  { label: 'Inform', value: 'Inform and share information clearly' },
  { label: 'Persuade', value: 'Persuade and influence a decision' },
  { label: 'Analyze', value: 'Analyze data and provide insights' },
  { label: 'Get approval', value: 'Get approval or buy-in for a proposal' },
];

const TOOL_OPTIONS = [
  { label: 'ChatGPT', value: 'chatgpt' as AITool, icon: '🤖' },
  { label: 'Claude', value: 'claude' as AITool, icon: '🟠' },
  { label: 'Gemini', value: 'gemini' as AITool, icon: '✨' },
  { label: 'Not sure', value: 'unsure' as AITool, icon: '❓' },
];

// --- Initial State ---

const initialState: GeneratorFlowState = {
  stage: 'prompt-input',
  task: '',
  audience: '',
  goal: '',
  tool: 'unsure',
  generatedPrompt: null,
  planQuestions: {
    successCriteria: '',
    startingPoint: '',
    constraints: ''
  },
  gamePlan: null,
  refinementMessages: [],
  isLoading: false,
  error: null,
  copied: false
};

// --- Main Component ---

export default function GeneratorPage() {
  const [state, setState] = useState<GeneratorFlowState>(initialState);

  // --- State Update Helpers ---

  const updateState = (updates: Partial<GeneratorFlowState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updatePlanQuestions = (updates: Partial<PlanQuestionsInput>) => {
    setState(prev => ({
      ...prev,
      planQuestions: { ...prev.planQuestions, ...updates }
    }));
  };

  // --- Stage Navigation ---

  const goToStage = (stage: GamePlanStage) => {
    updateState({ stage, error: null });
  };

  // --- Handlers ---

  const handleGeneratePrompt = async () => {
    if (!state.audience || !state.goal) {
      updateState({ error: 'Please answer the questions above.' });
      return;
    }

    updateState({ isLoading: true, error: null });

    try {
      const input: SimpleGeneratorInput = {
        task: state.task,
        audience: state.audience,
        goal: state.goal,
        tool: state.tool,
      };

      const output = await generateSimplePrompt(input);
      updateState({
        generatedPrompt: output,
        stage: 'prompt-output',
        isLoading: false
      });
    } catch (err) {
      console.error(err);
      updateState({
        error: 'Something went wrong. Please try again.',
        isLoading: false
      });
    }
  };

  const handleWantGamePlan = (wantPlan: boolean) => {
    if (wantPlan) {
      goToStage('plan-questions');
    }
    // If not, they stay on prompt-output with their prompt
  };

  const handleGenerateGamePlan = async () => {
    updateState({ stage: 'plan-generating', isLoading: true, error: null });

    try {
      const plan = await generateGamePlan({
        task: state.task,
        audience: state.audience,
        goal: state.goal,
        tool: state.tool,
        generatedPrompt: state.generatedPrompt?.prompt || '',
        successCriteria: state.planQuestions.successCriteria,
        startingPoint: state.planQuestions.startingPoint,
        constraints: state.planQuestions.constraints
      });

      updateState({
        gamePlan: plan,
        stage: 'plan-view',
        isLoading: false
      });
    } catch (err) {
      console.error(err);
      updateState({
        error: 'Failed to generate game plan. Please try again.',
        stage: 'plan-questions',
        isLoading: false
      });
    }
  };

  const handleCopyPrompt = async () => {
    if (state.generatedPrompt) {
      await navigator.clipboard.writeText(state.generatedPrompt.prompt);
      updateState({ copied: true });
      setTimeout(() => updateState({ copied: false }), 2000);
    }
  };

  const handleStartOver = () => {
    setState(initialState);
  };

  // --- Styles ---

  const chipBase = "px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer";
  const chipInactive = "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50";
  const chipActive = "bg-blue-600 border-blue-600 text-white";

  // --- Render ---

  return (
    <PageLayout
      title="Prompt Generator"
      description="Get an expert-level prompt in seconds, or go deeper with a full game plan."
    >
      <div className="max-w-2xl mx-auto pb-20">

        {/* === STAGE 1a: PROMPT INPUT === */}
        {state.stage === 'prompt-input' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-3">
                What are you trying to create or accomplish?
              </label>
              <p className="text-sm text-slate-500 mb-3">
                Be as specific as you'd like - the more context you give, the better I can help.
              </p>
              <textarea
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-slate-900 bg-white placeholder:text-slate-400 min-h-[160px] shadow-sm resize-none leading-relaxed"
                placeholder="A presentation summarizing quarterly results for the board..."
                value={state.task}
                onChange={(e) => updateState({ task: e.target.value, error: null })}
                autoFocus
              />
            </div>

            {/* Example chips */}
            <div>
              <p className="text-sm text-slate-500 mb-3">Or try one of these:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((example) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => updateState({ task: example.task })}
                    className={`${chipBase} ${chipInactive}`}
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            {state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {state.error}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => {
                  if (!state.task.trim()) {
                    updateState({ error: 'Please describe what you want to create.' });
                    return;
                  }
                  goToStage('prompt-questions');
                }}
                disabled={!state.task.trim()}
                className="px-6"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* === STAGE 1b: PROMPT QUESTIONS === */}
        {state.stage === 'prompt-questions' && (
          <div className="space-y-6 animate-fade-in">
            {/* Task summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Your task</p>
                  <p className="text-slate-900 leading-relaxed">{state.task}</p>
                </div>
                <button
                  onClick={() => goToStage('prompt-input')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium shrink-0"
                >
                  Edit
                </button>
              </div>
            </div>

            <p className="text-lg font-semibold text-slate-900">
              A few questions to make this great:
            </p>

            {/* Question 1: Audience */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Who is this for?</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">The person or group who will see/use the output</p>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateState({ audience: option.value })}
                    className={`${chipBase} ${state.audience === option.value ? chipActive : chipInactive}`}
                  >
                    {option.label}
                  </button>
                ))}
                <input
                  type="text"
                  placeholder="Other..."
                  className="px-4 py-2 rounded-full text-sm border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400 w-32"
                  value={!AUDIENCE_OPTIONS.find(o => o.value === state.audience) ? state.audience : ''}
                  onChange={(e) => updateState({ audience: e.target.value })}
                  onFocus={() => {
                    if (AUDIENCE_OPTIONS.find(o => o.value === state.audience)) {
                      updateState({ audience: '' });
                    }
                  }}
                />
              </div>
            </Card>

            {/* Question 2: Goal */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-slate-900">What's the goal?</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">What should this help them understand, decide, or do?</p>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateState({ goal: option.value })}
                    className={`${chipBase} ${state.goal === option.value ? chipActive : chipInactive}`}
                  >
                    {option.label}
                  </button>
                ))}
                <input
                  type="text"
                  placeholder="Other..."
                  className="px-4 py-2 rounded-full text-sm border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400 w-32"
                  value={!GOAL_OPTIONS.find(o => o.value === state.goal) ? state.goal : ''}
                  onChange={(e) => updateState({ goal: e.target.value })}
                  onFocus={() => {
                    if (GOAL_OPTIONS.find(o => o.value === state.goal)) {
                      updateState({ goal: '' });
                    }
                  }}
                />
              </div>
            </Card>

            {/* Question 3: Tool */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-slate-900">Which AI tool will you use?</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">We'll optimize the prompt format (or recommend one)</p>
              <div className="flex flex-wrap gap-2">
                {TOOL_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateState({ tool: option.value })}
                    className={`${chipBase} ${state.tool === option.value ? chipActive : chipInactive}`}
                  >
                    <span className="mr-1.5">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>

            {state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {state.error}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => goToStage('prompt-input')}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                onClick={handleGeneratePrompt}
                isLoading={state.isLoading}
                disabled={!state.audience || !state.goal}
                className="px-6"
              >
                Generate Prompt <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* === STAGE 2: PROMPT OUTPUT + INVITATION === */}
        {state.stage === 'prompt-output' && state.generatedPrompt && (
          <div className="space-y-6 animate-fade-in">
            {/* Success header */}
            <div className="flex items-center gap-2 text-emerald-600">
              <Check className="w-5 h-5" />
              <span className="font-semibold">Your prompt is ready</span>
            </div>

            {/* The prompt with PCTR labels */}
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Prompt</span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {state.copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-5">
                <pre className="whitespace-pre-wrap text-sm text-slate-900 leading-relaxed font-sans">
                  {state.generatedPrompt.prompt}
                </pre>
              </div>
            </Card>

            {/* Why this works - PCTR breakdown */}
            <Card className="p-5 bg-blue-50 border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Why this works</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">[P] Persona</span>
                  <p className="text-blue-700 mt-1">{state.generatedPrompt.pctrBreakdown.persona}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">[C] Context</span>
                  <p className="text-blue-700 mt-1">{state.generatedPrompt.pctrBreakdown.context}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">[T] Task</span>
                  <p className="text-blue-700 mt-1">{state.generatedPrompt.pctrBreakdown.task}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">[R] Requirements</span>
                  <p className="text-blue-700 mt-1">{state.generatedPrompt.pctrBreakdown.requirements}</p>
                </div>
              </div>
            </Card>

            {/* Tool suggestion (only if user was unsure) */}
            {state.generatedPrompt.toolSuggestion && (
              <Card className="p-4 bg-amber-50 border-amber-100">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="font-medium text-amber-900">
                      Tool tip: We recommend <span className="font-bold capitalize">{state.generatedPrompt.toolSuggestion.recommended}</span>
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      {state.generatedPrompt.toolSuggestion.reason}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* === INVITATION TO GO DEEPER === */}
            <Card className="p-6 bg-gradient-to-br from-violet-50 to-blue-50 border-violet-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-violet-900 mb-2">
                    Want to take this further?
                  </h3>
                  <p className="text-sm text-violet-700 mb-4">
                    This sounds like it might be part of a bigger effort. I can help you think through the full process - showing where AI can help at each step, what's best handled by you, and where to watch out for common mistakes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => handleWantGamePlan(true)}>
                      Yes, help me think through this
                    </Button>
                    <Button variant="outline" onClick={() => handleWantGamePlan(false)}>
                      No, the prompt is enough
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" onClick={handleStartOver} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" /> Start Over
              </Button>
              <Button
                onClick={() => {
                  const tool = state.generatedPrompt?.toolSuggestion?.recommended || state.tool;
                  const urls: Record<string, string> = {
                    chatgpt: 'https://chat.openai.com',
                    claude: 'https://claude.ai',
                    gemini: 'https://gemini.google.com',
                    unsure: 'https://gemini.google.com',
                  };
                  window.open(urls[tool], '_blank');
                }}
                className="flex-1"
              >
                Open {state.generatedPrompt.toolSuggestion?.recommended || (state.tool === 'unsure' ? 'Gemini' : state.tool)}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* === STAGE 3: CLARIFYING QUESTIONS FOR GAME PLAN === */}
        {state.stage === 'plan-questions' && (
          <div className="space-y-6 animate-fade-in">
            {/* Context reminder */}
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <p className="text-sm text-violet-700">
                <span className="font-medium">Building a game plan for:</span> {state.task}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                A few more questions to make your game plan as useful as possible.
              </h2>
              <p className="text-sm text-slate-500">
                The more detail you give, the more tailored this will be.
              </p>
            </div>

            {/* Question 1: Success Criteria */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-2">
                You mentioned this is for {state.audience}. What would make this successful in their eyes?
              </h3>
              <p className="text-sm text-slate-500 mb-3">What are they hoping to learn or decide?</p>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 min-h-[100px] resize-none"
                placeholder="They want to understand the competitive landscape and make a decision about our positioning..."
                value={state.planQuestions.successCriteria}
                onChange={(e) => updatePlanQuestions({ successCriteria: e.target.value })}
              />
            </Card>

            {/* Question 2: Starting Point */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-2">
                What do you already have to work with, and what will you need to figure out?
              </h3>
              <p className="text-sm text-slate-500 mb-3">Data you have, research you've done, gaps you know about</p>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 min-h-[100px] resize-none"
                placeholder="I have last quarter's sales data and some competitor pricing info. I still need to research their recent product launches..."
                value={state.planQuestions.startingPoint}
                onChange={(e) => updatePlanQuestions({ startingPoint: e.target.value })}
              />
            </Card>

            {/* Question 3: Constraints */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-2">
                Anything else I should know?
              </h3>
              <p className="text-sm text-slate-500 mb-3">Timeline, tools you can or can't use, specific constraints, format requirements</p>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 min-h-[80px] resize-none"
                placeholder="I need this by Friday. I have access to ChatGPT and Perplexity. Should be a slide deck format..."
                value={state.planQuestions.constraints}
                onChange={(e) => updatePlanQuestions({ constraints: e.target.value })}
              />
            </Card>

            {state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {state.error}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => goToStage('prompt-output')}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Prompt
              </Button>
              <Button
                onClick={handleGenerateGamePlan}
                isLoading={state.isLoading}
                className="px-6"
              >
                Build My Game Plan <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* === STAGE 4: GENERATING === */}
        {state.stage === 'plan-generating' && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Building your game plan...</h2>
            <p className="text-slate-500 text-center max-w-md">
              Analyzing your context, matching to the best workflow pattern, and creating step-by-step guidance.
            </p>
          </div>
        )}

        {/* === STAGE 5: PLAN VIEW === */}
        {state.stage === 'plan-view' && state.gamePlan && (
          <GamePlanView
            plan={state.gamePlan}
            onRefine={() => goToStage('refinement')}
            onStartOver={handleStartOver}
          />
        )}

        {/* === STAGE 6: REFINEMENT CHAT === */}
        {state.stage === 'refinement' && state.gamePlan && (
          <RefinementChat
            plan={state.gamePlan}
            messages={state.refinementMessages}
            onMessagesUpdate={(messages) => updateState({ refinementMessages: messages })}
            onBack={() => goToStage('plan-view')}
          />
        )}
      </div>
    </PageLayout>
  );
}
