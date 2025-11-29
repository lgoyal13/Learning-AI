import React from 'react';
import { PageLayout, Badge, Button, ProgressBar } from './ui';
import { Clock, Users, ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid, CheckCircle2, Circle } from 'lucide-react';
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
  onJumpTo: (step: number) => void;
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
  onJumpTo,
  isNextDisabled = false
}) => {
  const { push } = useRouter();

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
          <div className="sticky top-8 space-y-6">
            
            {/* Progress Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">In this module</h3>
                <span className="text-xs font-bold text-slate-500">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>
              <ProgressBar current={currentStep + 1} total={totalSteps} />
              <p className="text-xs text-slate-400 font-medium mt-2">
                 Step {currentStep + 1} of {totalSteps}
               </p>
            </div>

            <nav className="space-y-1">
              {sections.map((section, idx) => {
                const isComplete = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <button
                    key={section.id}
                    onClick={() => onJumpTo(idx)}
                    className={`group flex items-start gap-3 w-full text-left p-2 rounded-lg transition-colors ${
                       isCurrent ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className={`mt-0.5 shrink-0 ${
                      isComplete ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-slate-300'
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full border-[2.5px] border-current relative">
                           <div className="absolute inset-1 bg-current rounded-full opacity-0" />
                        </div>
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      isCurrent ? 'font-bold text-blue-900' : 'font-medium text-slate-600 group-hover:text-slate-900'
                    }`}>
                      {section.title}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-3">
          <article className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:text-slate-900 prose-a:text-blue-600">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
};