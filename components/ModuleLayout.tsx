import React from 'react';
import { PageLayout, Badge, Card, Button, ProgressBar } from './ui';
import { Clock, Users, ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { useRouter } from '../lib/routerContext';

interface ModuleSection {
  id: string;
  title: string;
}

interface ModuleLayoutProps {
  title: string;
  description: string;
  duration: string;
  audience: string;
  sections: ModuleSection[];
  children: React.ReactNode;
  
  // Navigation State
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  title,
  description,
  duration,
  audience,
  sections,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled = false
}) => {
  const { push } = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      {/* Header / Meta */}
      <div className="mb-8 border-b border-slate-200 pb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => push('/modules')} 
          className="mb-4 text-slate-500 pl-0 hover:bg-transparent hover:text-blue-600"
        >
          <LayoutGrid className="w-4 h-4 mr-2" /> Back to Curriculum
        </Button>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-xl text-slate-600 max-w-3xl mb-6 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-4">
          <Badge variant="neutral">
            <Clock className="w-3 h-3 mr-1.5 inline" />
            {duration}
          </Badge>
          <Badge variant="blue">
            <Users className="w-3 h-3 mr-1.5 inline" />
            {audience}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Table of Contents */}
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-8 space-y-4">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">In this module</h3>
            <nav className="space-y-1">
              {sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    idx === currentStep 
                      ? 'text-blue-700 bg-blue-50 font-medium' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3">
          
          {/* Top Step Navigation & Progress */}
          <div className="mb-10 bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-4 z-20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-700">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={onPrev} 
                  disabled={currentStep === 0}
                  className="h-8 w-8 p-0"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={onNext} 
                  disabled={currentStep === totalSteps - 1 ? false : isNextDisabled} 
                  className="h-8 w-8 p-0"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ProgressBar current={currentStep + 1} total={totalSteps} />
          </div>

          <article className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:text-slate-900 prose-a:text-blue-600">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
};