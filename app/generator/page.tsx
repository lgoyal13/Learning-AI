import React, { useState } from 'react';
import { PageLayout, Card, Button, Badge, PromptCard, Callout } from '../../components/ui';
import { 
  Sparkles, 
  MessageSquare, 
  FileText, 
  Search, 
  Settings, 
  ChevronRight, 
  Copy,
  Wand2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Layers,
  BrainCircuit,
  PenTool
} from 'lucide-react';
import { generatePromptTemplate } from '../../services/geminiService';
import { PromptGeneratorInput, PromptGeneratorOutput, TaskType, Stakes, ModelEnv, ExampleType } from '../../types';

// --- Recipes ---

type PromptRecipe = {
  id: string;
  label: string;
  icon: React.ReactNode;
  data: Partial<PromptGeneratorInput>;
};

const RECIPES: PromptRecipe[] = [
  {
    id: 'email',
    label: 'Executive Update',
    icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    data: {
      role: 'Communications Partner',
      audience: 'Senior Executives',
      taskType: 'draft',
      rawTaskDescription: 'Draft a project update email highlighting risks and key decisions needed.',
      outputFormat: 'Email with "TL;DR" bullets at top',
      tone: 'Concise, Direct, Professional',
      stakes: 'high',
      structureLevel: 'medium',
      modelEnvironment: 'workspace'
    }
  },
  {
    id: 'summary',
    label: 'Doc Summarizer',
    icon: <FileText className="w-5 h-5 text-purple-500" />,
    data: {
      role: 'Research Assistant',
      audience: 'Product Team',
      taskType: 'summarize',
      rawTaskDescription: 'Summarize the attached user research notes into key themes.',
      outputFormat: 'Markdown list with quote citations',
      tone: 'Objective',
      stakes: 'medium',
      structureLevel: 'high',
      modelEnvironment: 'notebook'
    }
  },
  {
    id: 'analysis',
    label: 'Root Cause Analysis',
    icon: <Search className="w-5 h-5 text-emerald-500" />,
    data: {
      role: 'Senior Data Analyst',
      audience: 'Engineering Lead',
      taskType: 'analyze',
      rawTaskDescription: 'Analyze the provided error logs to explain why the system crashed.',
      outputFormat: 'Step-by-step reasoning + Root Cause + Solution',
      tone: 'Analytical and helpful',
      stakes: 'high',
      structureLevel: 'high',
      willProvideExamples: true,
      exampleType: 'past-outputs',
      modelEnvironment: 'chat'
    }
  }
];

// --- Constants ---

const TASK_TYPE_OPTIONS: { value: TaskType; label: string }[] = [
  { value: 'draft', label: 'Drafting (Email, Blog, Memo)' },
  { value: 'rewrite', label: 'Rewriting / Editing' },
  { value: 'summarize', label: 'Summarizing' },
  { value: 'analyze', label: 'Analyzing / Reasoning' },
  { value: 'compare', label: 'Comparing Options' },
  { value: 'brainstorm', label: 'Brainstorming' },
  { value: 'transform-data', label: 'Transforming Data (JSON/CSV)' },
];

const ENV_OPTIONS: { value: ModelEnv; label: string }[] = [
  { value: 'chat', label: 'Standard Chat (Gemini/ChatGPT)' },
  { value: 'workspace', label: 'Workspace (Docs/Gmail)' },
  { value: 'research', label: 'Research Tool (Perplexity)' },
  { value: 'notebook', label: 'Docs Tool (NotebookLM)' },
];

const INITIAL_INPUT: PromptGeneratorInput = {
  role: '',
  audience: '',
  taskType: 'draft',
  rawTaskDescription: '',
  stakes: 'low',
  isRecurring: false,
  outputFormat: '',
  structureLevel: 'medium',
  tone: '',
  constraints: '',
  dataSensitivity: 'normal',
  willProvideExamples: false,
  exampleType: 'none',
  modelEnvironment: 'chat',
};

export default function GeneratorPage() {
  const [input, setInput] = useState<PromptGeneratorInput>(INITIAL_INPUT);
  const [output, setOutput] = useState<PromptGeneratorOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);

  const handleInputChange = (field: keyof PromptGeneratorInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const applyRecipe = (recipe: PromptRecipe) => {
    setInput({ ...INITIAL_INPUT, ...recipe.data, recipeId: recipe.id });
    setOutput(null); 
    setError(null);
  };

  const handleGenerate = async () => {
    // Basic Client-Side Validation
    if (!input.rawTaskDescription.trim()) {
      setError("Please describe what you need to do in the 'Task Basics' section.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Call Real Gemini Service
      const result = await generatePromptTemplate(input);
      setOutput(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong generating your template. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Styles
  const inputStyles = "w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 transition-shadow";
  const labelStyles = "block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5";
  const sectionTitleStyles = "font-bold text-slate-900 flex items-center gap-2 text-sm";
  const sectionHeaderStyles = "flex items-center gap-2 pb-2 border-b border-slate-100 mb-4";
  const circleNumberStyles = (colorClass: string) => `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colorClass}`;

  return (
    <PageLayout
      title="Prompt Template Generator"
      description="Answer a few questions about your task and we’ll build a reusable prompt template you can paste into Gemini, ChatGPT, or Claude."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recipes */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Quick Start Recipes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {RECIPES.map(recipe => (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() => applyRecipe(recipe)}
                  className={`p-3 border rounded-xl hover:shadow-sm transition-all text-left flex flex-col gap-2 group ${input.recipeId === recipe.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                >
                  <div className={`p-1.5 rounded-lg w-fit transition-colors ${input.recipeId === recipe.id ? 'bg-white' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                    {recipe.icon}
                  </div>
                  <span className={`text-xs font-bold ${input.recipeId === recipe.id ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-700'}`}>{recipe.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Main Form */}
          <Card className="p-6 border-t-4 border-t-blue-500 shadow-sm">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
              
              {/* Section 1: Task Basics */}
              <div className="space-y-4">
                <div className={sectionHeaderStyles}>
                  <div className={circleNumberStyles("bg-blue-100 text-blue-600")}>1</div>
                  <h4 className={sectionTitleStyles}>Task Basics</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyles}>Task Type</label>
                    <div className="relative">
                      <select 
                        className={inputStyles} 
                        value={input.taskType} 
                        onChange={(e) => handleInputChange('taskType', e.target.value)}
                      >
                        {TASK_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelStyles}>Stakes</label>
                    <select 
                      className={inputStyles} 
                      value={input.stakes}
                      onChange={(e) => handleInputChange('stakes', e.target.value)}
                    >
                      <option value="low">Low (Quick email)</option>
                      <option value="medium">Medium (Internal doc)</option>
                      <option value="high">High (Client facing)</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className={labelStyles}>What do you need to do? <span className="text-red-500">*</span></label>
                   <textarea 
                     className={inputStyles}
                     rows={2}
                     placeholder="e.g. Summarize these meeting notes for the VP of Sales."
                     value={input.rawTaskDescription}
                     onChange={(e) => handleInputChange('rawTaskDescription', e.target.value)}
                     required
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyles}>Role / Persona</label>
                    <input 
                      className={inputStyles}
                      placeholder="e.g. Senior Editor"
                      value={input.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Audience</label>
                    <input 
                      className={inputStyles}
                      placeholder="e.g. Engineering Team"
                      value={input.audience}
                      onChange={(e) => handleInputChange('audience', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Output & Structure */}
              <div className="space-y-4">
                <div className={sectionHeaderStyles}>
                  <div className={circleNumberStyles("bg-purple-100 text-purple-600")}>2</div>
                  <h4 className={sectionTitleStyles}>Output & Structure</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyles}>Tone</label>
                    <input 
                      className={inputStyles}
                      placeholder="e.g. Friendly, Direct"
                      value={input.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Structure Level</label>
                    <select 
                      className={inputStyles}
                      value={input.structureLevel}
                      onChange={(e) => handleInputChange('structureLevel', e.target.value)}
                    >
                      <option value="light">Light (Free form)</option>
                      <option value="medium">Medium (Standard)</option>
                      <option value="high">High (Strict format)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelStyles}>Specific Format</label>
                  <input 
                    className={inputStyles}
                    placeholder="e.g. Bullet points, Table, JSON, Email draft"
                    value={input.outputFormat}
                    onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                  />
                </div>
              </div>

              {/* Section 3: Constraints & Safety */}
              <div className="space-y-4">
                <div className={sectionHeaderStyles}>
                  <div className={circleNumberStyles("bg-emerald-100 text-emerald-600")}>3</div>
                  <h4 className={sectionTitleStyles}>Constraints & Safety</h4>
                </div>

                <div>
                   <label className={labelStyles}>Hard Constraints</label>
                   <textarea 
                     className={inputStyles}
                     rows={2}
                     placeholder="e.g. Under 200 words. Do not use jargon."
                     value={input.constraints}
                     onChange={(e) => handleInputChange('constraints', e.target.value)}
                   />
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                   <div className={`p-1.5 rounded-full ${input.dataSensitivity === 'sensitive' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                     {input.dataSensitivity === 'sensitive' ? <AlertTriangle className="w-4 h-4"/> : <CheckCircle2 className="w-4 h-4"/>}
                   </div>
                   <div className="flex-1">
                     <p className="text-xs font-bold text-slate-700">Does this involve PII/Secrets?</p>
                     <p className="text-[10px] text-slate-500">If yes, the template will include safety placeholders.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={input.dataSensitivity === 'sensitive'}
                        onChange={(e) => handleInputChange('dataSensitivity', e.target.checked ? 'sensitive' : 'normal')}
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                   </label>
                </div>
              </div>

              {/* Section 4: Examples & Usage */}
              <div className="space-y-4">
                <div className={sectionHeaderStyles}>
                  <div className={circleNumberStyles("bg-amber-100 text-amber-600")}>4</div>
                  <h4 className={sectionTitleStyles}>Examples & Usage</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className={labelStyles}>Environment</label>
                    <select 
                      className={inputStyles} 
                      value={input.modelEnvironment}
                      onChange={(e) => handleInputChange('modelEnvironment', e.target.value)}
                    >
                      {ENV_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                   </div>
                   
                   <div className="flex items-center mt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 font-medium select-none">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          checked={input.willProvideExamples}
                          onChange={(e) => handleInputChange('willProvideExamples', e.target.checked)}
                        />
                        I will provide examples
                      </label>
                   </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <Button 
                  type="submit" 
                  isLoading={isGenerating} 
                  className="w-full h-12 text-base shadow-md"
                  icon={<Wand2 className="w-4 h-4" />}
                >
                  Generate Template
                </Button>
              </div>

            </form>
          </Card>
        </div>

        {/* RIGHT COLUMN: RESULT */}
        <div className="lg:col-span-7 sticky top-8">
          
          {!output ? (
            // EMPTY STATE
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center bg-slate-50/50 min-h-[600px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Sparkles className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Build</h3>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">
                Fill out the form on the left to generate a structured prompt template optimized for modern LLMs.
              </p>
            </div>
          ) : (
            // RESULT STATE
            <div className="space-y-6 animate-fade-in pb-12">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">Your Template</h2>
                   <p className="text-xs text-slate-500 mt-1">Generated by Gemini</p>
                </div>
                <div className="flex gap-2">
                   <Badge variant={output.complexityLevel === 'Advanced' ? 'warning' : 'blue'}>
                     {output.complexityLevel} Complexity
                   </Badge>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 italic">
                <span className="font-bold text-slate-900 not-italic">Snapshot: </span> 
                {output.taskSnapshot}
              </div>

              {/* System Prompt (Conditional) */}
              {output.systemPromptTemplate && (
                <div className="animate-slide-up">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Settings className="w-3 h-3" /> System Instructions
                    </span>
                    <span className="text-[10px] text-slate-400">Optional but recommended</span>
                  </div>
                  <PromptCard 
                    label="SYSTEM PROMPT" 
                    prompt={output.systemPromptTemplate} 
                  />
                </div>
              )}

              {/* Task Prompt */}
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Task Prompt
                  </span>
                </div>
                <PromptCard 
                  label="TASK PROMPT" 
                  prompt={output.taskPromptTemplate} 
                />
              </div>

              {/* Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 bg-purple-50 border-purple-100">
                   <div className="flex items-center gap-2 mb-2 font-bold text-purple-700 text-xs uppercase">
                     <BrainCircuit className="w-4 h-4" /> Mode Recommendation
                   </div>
                   <p className="text-sm font-bold text-slate-900">{output.modeRecommendation}</p>
                   <p className="text-xs text-slate-600 mt-1">Best suited environment for this task.</p>
                </Card>
                <Card className="p-4 bg-emerald-50 border-emerald-100">
                   <div className="flex items-center gap-2 mb-2 font-bold text-emerald-700 text-xs uppercase">
                     <Layers className="w-4 h-4" /> Example Guidance
                   </div>
                   <p className="text-xs text-slate-700 leading-relaxed">{output.exampleGuidance}</p>
                </Card>
              </div>

              {/* Follow ups */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Suggested Iterations</h4>
                <div className="space-y-2">
                   {output.followUpPrompts.map((prompt, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg group hover:border-blue-300 transition-colors">
                        <span className="text-sm text-slate-700 font-mono">{prompt}</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(prompt)}
                          className="text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                     </div>
                   ))}
                </div>
              </div>

              {/* Reasoning Toggle */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <button 
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showReasoning ? "Hide Generator Logic" : "Show Generator Logic"}
                  <ChevronRight className={`w-4 h-4 transition-transform ${showReasoning ? 'rotate-90' : ''}`} />
                </button>
                
                {showReasoning && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 animate-fade-in leading-relaxed">
                    <p className="mb-2 font-bold text-slate-900">Why this structure?</p>
                    <p>{output.reasoning}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setInput(INITIAL_INPUT)} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                </Button>
                <Button onClick={() => window.open('https://gemini.google.com', '_blank')} className="w-full">
                  Open Gemini <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}