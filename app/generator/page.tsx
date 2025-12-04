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
  PenTool,
  Upload,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';
import { generatePromptTemplate } from '../../services/geminiService';
import { PromptGeneratorInput, PromptGeneratorOutput, TaskType, Stakes, ModelEnv, ExampleType } from '../../types';

// --- Recipes ---

type PromptRecipe = {
  id: string;
  label: string;
  icon: React.ReactNode;
  data: Partial<PromptGeneratorInput>;
  // UI-specific mappings
  uiReasoning?: 'fast' | 'deep';
  uiStructure?: 'light' | 'medium' | 'high';
};

const RECIPES: PromptRecipe[] = [
  {
    id: 'email',
    label: 'Exec Update',
    icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    data: {
      rawTaskDescription: 'Draft a project update email highlighting risks and key decisions needed. (Audience: Executives)',
      modelEnvironment: 'workspace'
    },
    uiReasoning: 'fast',
    uiStructure: 'medium'
  },
  {
    id: 'summary',
    label: 'Summarizer',
    icon: <FileText className="w-5 h-5 text-purple-500" />,
    data: {
      rawTaskDescription: 'Summarize the attached user research notes into key themes. (Audience: Product Team)',
      modelEnvironment: 'notebook'
    },
    uiReasoning: 'deep',
    uiStructure: 'high'
  },
  {
    id: 'analysis',
    label: 'Root Cause',
    icon: <Search className="w-5 h-5 text-emerald-500" />,
    data: {
      rawTaskDescription: 'Analyze the provided error logs to explain why the system crashed.',
      modelEnvironment: 'chat'
    },
    uiReasoning: 'deep',
    uiStructure: 'high'
  }
];

export default function GeneratorPage() {
  // --- New UI State ---
  const [taskDescription, setTaskDescription] = useState('');
  const [existingDraft, setExistingDraft] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  
  const [selectedTool, setSelectedTool] = useState<ModelEnv>('chat');
  const [structure, setStructure] = useState<'light' | 'medium' | 'high'>('medium');
  const [reasoning, setReasoning] = useState<'fast' | 'deep'>('fast');
  
  const [isSensitive, setIsSensitive] = useState(false);
  const [selfCritique, setSelfCritique] = useState(false);

  // --- Generation State ---
  const [output, setOutput] = useState<PromptGeneratorOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);

  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const applyRecipe = (recipe: PromptRecipe) => {
    setTaskDescription(recipe.data.rawTaskDescription || '');
    setSelectedTool(recipe.data.modelEnvironment || 'chat');
    setStructure(recipe.uiStructure || 'medium');
    setReasoning(recipe.uiReasoning || 'fast');
    setExistingDraft('');
    setIsSensitive(false);
    setSelfCritique(false);
    setOutput(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!taskDescription.trim()) {
      setError("Please describe your task first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Construct the payload for the backend service
    // We combine our simple UI fields into the structured input the service expects
    let combinedDescription = taskDescription;
    
    if (existingDraft.trim()) {
      combinedDescription += `\n\n[User Draft Provided]:\n${existingDraft}`;
    }

    if (files.length > 0) {
      combinedDescription += `\n\n[User Context]: User has attached ${files.length} file(s) (e.g. ${files[0].name}) containing source material.`;
    }

    let constraints = "";
    if (selfCritique) {
      constraints += "Include a self-critique section where the AI evaluates its own answer. ";
    }
    if (reasoning === 'deep') {
      constraints += "Think step-by-step before answering. ";
    }

    const payload: PromptGeneratorInput = {
      role: '', // Let the LLM infer this from the task description
      audience: '', // Let the LLM infer this
      taskType: 'draft', // Default, LLM will adjust
      rawTaskDescription: combinedDescription,
      stakes: reasoning === 'deep' ? 'high' : 'low',
      isRecurring: false,
      outputFormat: '',
      structureLevel: structure,
      tone: '',
      constraints: constraints,
      dataSensitivity: isSensitive ? 'sensitive' : 'normal',
      willProvideExamples: files.length > 0 || !!existingDraft,
      exampleType: files.length > 0 ? 'docs' : (existingDraft ? 'raw-inputs' : 'none'),
      modelEnvironment: selectedTool,
    };

    try {
      const result = await generatePromptTemplate(payload);
      setOutput(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong generating your template. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Styles ---
  const labelStyles = "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2";
  const cardBase = "bg-white rounded-xl border border-slate-200 shadow-sm p-6";

  return (
    <PageLayout
      title="Prompt Template Generator"
      description="Describe your task in plain language, and we'll build a professional prompt template for you."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recipes */}
          <div className="flex flex-wrap gap-3 pb-2">
            {RECIPES.map(recipe => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => applyRecipe(recipe)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-slate-50 transition-all shrink-0 group shadow-sm"
              >
                <div className="text-slate-500 group-hover:text-blue-500">{recipe.icon}</div>
                <span className="text-sm font-medium text-slate-700">{recipe.label}</span>
              </button>
            ))}
          </div>

          {/* Card 1: Task */}
          <div className={cardBase}>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</div>
               <h3 className="font-bold text-slate-900">Task & Examples</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelStyles}>Describe your task <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 min-h-[140px] shadow-sm resize-y leading-relaxed"
                  placeholder="e.g. Draft a follow-up email to a quiet client who hasn't replied in 2 weeks. Tone should be polite but firm..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>

              <div>
                <label className={labelStyles}>Starting materials (Optional)</label>
                <div className="space-y-3">
                  {/* File Upload Mock */}
                  <div className="relative">
                     <input 
                       type="file" 
                       id="file-upload" 
                       className="hidden" 
                       onChange={handleFileChange}
                       multiple
                     />
                     <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors text-slate-600 text-sm bg-white">
                        <Upload className="w-4 h-4 text-slate-400" />
                        {files.length > 0 ? `${files.length} file(s) selected` : "Upload docs or images"}
                     </label>
                  </div>

                  {/* Existing Draft */}
                  <div>
                    <input 
                      type="text"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 shadow-sm"
                      placeholder="Paste an existing prompt draft here..."
                      value={existingDraft}
                      onChange={(e) => setExistingDraft(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Options */}
          <div className={cardBase}>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
               <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">2</div>
               <h3 className="font-bold text-slate-900">Options</h3>
            </div>

            <div className="space-y-6">
              
              {/* Tool Selection */}
              <div>
                 <label className={labelStyles}>Which tool will you use?</label>
                 <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4"/> },
                      { id: 'notebook', label: 'NotebookLM', icon: <Layers className="w-4 h-4"/> },
                      { id: 'research', label: 'Research', icon: <Search className="w-4 h-4"/> },
                      { id: 'workspace', label: 'Workspace', icon: <Zap className="w-4 h-4"/> },
                    ].map(tool => (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => setSelectedTool(tool.id as ModelEnv)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-sm font-medium transition-all ${
                          selectedTool === tool.id 
                            ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {tool.icon} {tool.label}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Quality Settings */}
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={labelStyles}>Structure</label>
                    <div className="space-y-2">
                       {['light', 'medium', 'high'].map(lvl => (
                         <label key={lvl} className="flex items-center gap-2 cursor-pointer group">
                            <input 
                              type="radio" 
                              name="structure"
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 bg-white"
                              checked={structure === lvl}
                              onChange={() => setStructure(lvl as any)}
                            />
                            <span className="text-sm text-slate-700 capitalize group-hover:text-slate-900">{lvl}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className={labelStyles}>Reasoning</label>
                    <div className="space-y-2">
                       <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="reasoning"
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 bg-white"
                            checked={reasoning === 'fast'}
                            onChange={() => setReasoning('fast')}
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900">Fast / Simple</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="reasoning"
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 bg-white"
                            checked={reasoning === 'deep'}
                            onChange={() => setReasoning('deep')}
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900">Deep Reasoning</span>
                       </label>
                    </div>
                 </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="flex items-center justify-between cursor-pointer group">
                   <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${isSensitive ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">Includes PII / Secrets</span>
                   </div>
                   <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={isSensitive}
                        onChange={(e) => setIsSensitive(e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                   </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                   <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${selfCritique ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">Include Self-Critique</span>
                   </div>
                   <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={selfCritique}
                        onChange={(e) => setSelfCritique(e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                   </div>
                </label>
              </div>

            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2 animate-fade-in">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Action Button */}
          <Button 
            onClick={handleGenerate}
            isLoading={isGenerating} 
            className="w-full h-12 text-base font-bold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20"
            icon={<Wand2 className="w-5 h-5" />}
          >
            Generate my prompt template
          </Button>
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div className="lg:col-span-7 sticky top-8">
          
          {!output ? (
            // EMPTY STATE
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center bg-slate-50/50 min-h-[600px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Sparkles className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Build</h3>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">
                Describe your task on the left and we will architect a professional prompt template for you.
              </p>
            </div>
          ) : (
            // RESULT STATE
            <div className="space-y-6 animate-fade-in pb-12">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">Your Template</h2>
                   <p className="text-xs text-slate-500 mt-1">Generated by Gemini • {output.modelRecommendation}</p>
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
                    <span className="text-[10px] text-slate-400">Optional</span>
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
                <Button variant="outline" onClick={() => {
                   setTaskDescription('');
                   setExistingDraft('');
                   setOutput(null);
                }} className="w-full">
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