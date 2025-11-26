import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'intro', title: 'The Right Tool for the Job' },
    { id: 'categories', title: 'Tool Categories' },
    { id: 'deep-dives', title: 'Deep Dives' },
  ];

  const totalSteps = sections.length;

  const handleNext = () => {
    setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionContent = [
    // SECTION 1: INTRO
    (
      <section key="intro" id="intro" className="mb-12 animate-fade-in">
        <h2>Stop Using a Hammer for Everything</h2>
        <p>
          We often see people trying to use a standard Chat Assistant (like ChatGPT) for tasks it isn't good at—like 
          browsing live news or analyzing 50-page PDFs.
        </p>
        <p>
          Just like you wouldn't use Excel to write a letter, you shouldn't use a text generator to do deep research. 
          Understanding the <strong>Core Categories</strong> of AI tools will double your efficiency.
        </p>
      </section>
    ),

    // SECTION 2: CATEGORIES
    (
      <section key="categories" id="categories" className="mb-12 animate-fade-in">
        <h2>The 4 Main Tool Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          {/* Chat Assistants */}
          <Card className="p-6 border-t-4 border-t-yellow-500">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-lg text-slate-900">Chat Assistants</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Writing, brainstorming, rewriting, and coding help.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Drafting emails</li>
              <li>Summarizing short text</li>
              <li>Rephrasing tone</li>
            </ul>
          </Card>

          {/* Research Tools */}
          <Card className="p-6 border-t-4 border-t-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900">Research Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Finding facts, citations, and live web info.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Market research</li>
              <li>Competitor news</li>
              <li>Fact-checking</li>
            </ul>
          </Card>

          {/* Your Docs Tools */}
          <Card className="p-6 border-t-4 border-t-purple-500">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-lg text-slate-900">"Your Docs" Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Analyzing YOUR uploaded files without hallucinating.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Summarizing 50 PDFs</li>
              <li>Project onboarding</li>
              <li>Contract review</li>
            </ul>
          </Card>

          {/* Builder Tools */}
          <Card className="p-6 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-2 mb-3">
              <PenTool className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-lg text-slate-900">Builder Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Prototyping reusable tools and templates.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Creating "The Email Bot"</li>
              <li>Testing system prompts</li>
              <li>Advanced workflows</li>
            </ul>
          </Card>
        </div>
      </section>
    ),

    // SECTION 3: DEEP DIVES
    (
      <section key="deep-dives" id="deep-dives" className="mb-12 animate-fade-in">
        <h2>Explore Specific Tools</h2>
        <p className="mb-6">Choose a path to learn more.</p>
        
        <div className="space-y-4 not-prose">
          <Card 
            className="p-4 hover:border-blue-300 cursor-pointer group flex items-center justify-between"
            onClick={() => push('/modules/tool-research')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Research & Web Deep Dive</h3>
                <p className="text-sm text-slate-500">How to get cited, factual answers from the web.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
          </Card>

          <Card 
            className="p-4 hover:border-purple-300 cursor-pointer group flex items-center justify-between"
            onClick={() => push('/modules/tool-documents')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">"Your Docs" Deep Dive</h3>
                <p className="text-sm text-slate-500">How to chat with internal files securely.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500" />
          </Card>

          <Card 
            className="p-4 hover:border-emerald-300 cursor-pointer group flex items-center justify-between bg-slate-50"
            onClick={() => push('/modules/tool-builder')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">Builder's Lab</h3>
                  <Badge variant="neutral">Advanced</Badge>
                </div>
                <p className="text-sm text-slate-500">Create your own reusable AI assistants.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
          </Card>
        </div>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="AI Tools & Research"
      description="Don't just use a chatbot for everything. Learn to pick the right specialized AI tool for research, document analysis, and prototyping."
      duration="10 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/tool-research"
    >
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Current Section Content */}
      <div className="min-h-[400px]">
        {sectionContent[currentStep]}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
        <Button 
          variant="secondary" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button onClick={handleNext}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="outline" disabled className="opacity-75 cursor-not-allowed">
            Module Complete <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </ModuleLayout>
  );
}