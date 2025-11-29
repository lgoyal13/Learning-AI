import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button, Badge } from '../../../components/ui';
import { 
  Globe, Search, FileText, Mail, Table, Presentation, Image, Video, 
  CheckCircle2, ArrowRight, ArrowLeft, AlertTriangle, ExternalLink, Zap, LayoutGrid, BookOpen
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'gemini-web', title: 'Gemini for Web & Search' },
    { id: 'gemini-workspace', title: 'Gemini in Workspace' },
    { id: 'gemini-images', title: 'Images with Gemini' },
    { id: 'veo-video', title: 'Video Concepts with Veo' },
    { id: 'when-gemini', title: 'When Gemini Is Your Best Choice' },
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

  const handleJumpTo = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Gemini for Web & Search
        return (
          <section id="gemini-web" className="mb-12 animate-fade-in">
            <h2>Gemini for Web & Search</h2>
            <p className="text-lg text-slate-700 mb-6">
              Traditional search gives you ten blue links. Gemini gives you a synthesized answer with clickable references. 
              It's often faster to ask for a "briefing" than to open five tabs yourself.
            </p>

            <div className="mb-8">
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider">
                  <Globe className="w-4 h-4" /> Use Case: The Instant Briefing
                </div>
                <h3 className="font-bold text-slate-900 mb-4">Scenario: You need to understand a new regulation quickly.</h3>
                
                <PromptCard 
                  label="Briefing Prompt"
                  prompt={`Give me a concise briefing on [Topic, e.g., EV roadside charging policy in California] for a [Role, e.g., Product Manager].

Include:
- 3–5 key points in plain language
- Any major recent changes in the last 12 months
- 3 links I can click to read more`}
                />
              </Card>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Good Habits
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex gap-2">• Always skim the sources cited at the bottom or inline.</li>
                <li className="flex gap-2">• Click at least one link to verify the context matches the summary.</li>
                <li className="flex gap-2">• If the topic is very recent (last 24h), explicitly ask it to "Check Google Search."</li>
              </ul>
            </div>
          </section>
        );

      case 1: // Gemini in Workspace
        return (
          <section id="gemini-workspace" className="mb-12 animate-fade-in">
            <h2>Gemini in Workspace</h2>
            <p className="mb-8 text-lg text-slate-700">
              You don't always need to leave your tab. Gemini is integrated directly into the apps you use every day. 
              Look for the <strong>"Help me write"</strong> (pencil) or star icon.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* GMAIL */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-red-600 font-bold">
                  <Mail className="w-5 h-5" /> Gmail
                </div>
                <p className="text-sm text-slate-600 mb-4 h-10">
                  Best for summarizing long threads and drafting polite replies.
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 border border-slate-100">
                  "Draft a reply thanking them for the update and asking to reschedule to next Tuesday."
                </div>
              </Card>

              {/* DOCS */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                  <FileText className="w-5 h-5" /> Docs
                </div>
                <p className="text-sm text-slate-600 mb-4 h-10">
                  Best for outlining, rewriting for tone, and summarizing.
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 border border-slate-100">
                  "Turn these messy meeting notes into a one-page project brief with goals, status, and next steps."
                </div>
              </Card>

              {/* SHEETS */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold">
                  <Table className="w-5 h-5" /> Sheets
                </div>
                <p className="text-sm text-slate-600 mb-4 h-10">
                  Best for creating trackers, organizing data, and simple analysis.
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 border border-slate-100">
                  "Create a project tracker for a website launch with columns for Task, Owner, Status, and Deadline."
                </div>
              </Card>

              {/* SLIDES */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-amber-500 font-bold">
                  <Presentation className="w-5 h-5" /> Slides
                </div>
                <p className="text-sm text-slate-600 mb-4 h-10">
                  Best for generating visuals and slide outlines.
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 border border-slate-100">
                  "Create an outline for a 5-slide deck pitching our Q3 marketing strategy."
                </div>
              </Card>
            </div>
          </section>
        );

      case 2: // Images with Gemini
        return (
          <section id="gemini-images" className="mb-12 animate-fade-in">
            <h2>Images with Gemini</h2>
            <p className="mb-6 text-lg text-slate-700">
              Sometimes you need a visual placeholder, a mood board, or a quick mockup. 
              Gemini models (like the NanoBanana series) can generate images from text descriptions instantly.
            </p>

            <div className="mb-8">
              <Card className="p-6 border-l-4 border-l-purple-500 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-900">Visual Exploration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-2">Best For:</p>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                      <li>Internal mockups & storyboards</li>
                      <li>Presentation title slides</li>
                      <li>Visualizing abstract concepts</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-2">Example Prompt:</p>
                    <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 border border-slate-100">
                      "Create a simple flat-style illustration of a roadside assistance van parked next to an EV on a highway at sunset."
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Callout variant="warning" title="Watch Out">
              Generated images are synthetic. Do not use them as "real" photos of customers or products in external regulated materials without approval.
            </Callout>
          </section>
        );

      case 3: // Video Concepts with Veo
        return (
          <section id="veo-video" className="mb-12 animate-fade-in">
            <h2>Video Concepts with Veo</h2>
            <p className="mb-6 text-lg text-slate-700">
              Veo is Google's video generation model. While you might not be making feature films yet, it is a powerful tool for storyboarding and brainstorming visual concepts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card className="p-6 h-full bg-slate-50 border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-pink-600 font-bold uppercase text-xs tracking-wider">
                    <Video className="w-4 h-4" /> Scenario
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Internal Training Teaser</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    You need to explain the vibe of a new training video to an agency or creative team.
                  </p>
                  
                  <p className="text-xs font-bold text-slate-700 mb-2">Prompt:</p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-700 leading-relaxed">
                    I am planning a 60-second internal video to explain our new roadside EV benefits.
                    <br/><br/>
                    Draft a visual treatment using Veo concepts:
                    <br/>- 3–4 scenes
                    <br/>- Suggested on-screen text
                    <br/>- Notes on pacing (slow, medium, fast)
                  </div>
                </Card>
              </div>

              <div className="md:col-span-1">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 h-full">
                  <h3 className="font-bold text-blue-900 mb-2">Why use AI for video?</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    It's faster to <strong>show</strong> a generated clip or storyboard than to write three paragraphs describing "a cinematic pan over a futuristic city."
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 italic">
              Note: Veo is best for brainstorming visuals, not for final legal review.
            </p>
          </section>
        );

      case 4: // When Gemini Is Your Best Choice
        return (
          <section id="when-gemini" className="mb-12 animate-fade-in">
            <h2>When Gemini is your best choice</h2>
            <p className="mb-8 text-lg text-slate-700">
              You have a lot of tools. Here is when you should reach for Gemini specifically.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Reach for Gemini when...</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>You are deep in Docs, Sheets, or Slides and don't want to switch tabs.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>You want a quick briefing on a topic with clickable links (Search grounding).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>You need to mix text, simple images, and slide concepts in one workflow.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>You are iterating on visual ideas or campaign concepts.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Callout variant="info" title="Need deeper citations?">
                  For live web research with heavy sourcing, see the <strong>Research & Web</strong> module.
                </Callout>
                <Callout variant="info" title="Analyzing 50 PDFs?">
                  For deep document analysis, see the <strong>Your Docs (NotebookLM)</strong> module.
                </Callout>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 pt-8">
              <h3 className="font-bold text-slate-900 mb-4">Explore other specialized tools</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" onClick={() => push('/modules/tool-research')}>
                  <Globe className="w-4 h-4 mr-2" /> Research Module
                </Button>
                <Button variant="secondary" onClick={() => push('/modules/tool-documents')}>
                  <FileText className="w-4 h-4 mr-2" /> Your Docs Module
                </Button>
                <Button variant="outline" onClick={() => push('/advanced')}>
                  <Zap className="w-4 h-4 mr-2" /> Advanced Builders
                </Button>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Gemini: Web, Workspace, Images, and Veo"
      description="Use Gemini as more than a chat box. Learn when to open Gemini instead of search, how to use it inside Docs, Sheets, Gmail, and how to tap into its image and video tools."
      duration="20 mins"
      audience="Employees in Google Workspace"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onJumpTo={handleJumpTo}
    >
      <div className="mb-8 not-prose">
        <Callout variant="info" title="Optional Module">
          This module is best for power users who are already comfortable with basic prompting and want to explore the wider ecosystem.
        </Callout>
      </div>

      {/* Current Section Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
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
          <Button onClick={() => push('/modules')} variant="outline">
            Finish module <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </ModuleLayout>
  );
}