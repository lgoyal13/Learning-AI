import React from 'react';
import { Card, Badge, Button, PageLayout, Callout } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { BookOpen, Shield, MessageSquare, Briefcase, Lock, ArrowRight, Globe } from 'lucide-react';
import { Module } from '../../types';

// Updated track data with friendlier, blog-style copy
const tracks = [
  {
    id: 'foundations',
    title: 'Track 1: The Mental Model',
    description: 'Start here if you want to understand **how AI actually works** and **how to talk to it** (Prompting) without wasting time.',
    moduleIds: ['fundamentals', 'prompting', 'responsible-use'],
  },
  {
    id: 'applied',
    title: 'Track 2: Applying It to Real Work',
    description: 'Once you know the basics, this track helps you **pick the right tool** (Research vs Docs vs Chat) and build **repeatable workflows**.',
    moduleIds: ['tools-overview', 'workflow'],
  },
];

export default function Page() {
  const { push } = useRouter();

  // Module Data - Updated descriptions for punchiness
  const modules: Module[] = [
    {
      id: 'fundamentals',
      title: '1. AI Fundamentals',
      description: 'Look under the hood. Learn why AI hallucinates and when to trust it (vs when to doubt it).',
      duration: '15 min',
      icon: 'BookOpen',
      locked: false
    },
    {
      id: 'prompting',
      title: '2. Prompting Patterns',
      description: 'Stop guessing. Learn the TCRE framework (Task, Context, Requirements, Examples) to get better answers instantly.',
      duration: '20 min',
      icon: 'MessageSquare',
      locked: false
    },
    {
      id: 'responsible-use',
      title: '3. Safety & Ethics',
      description: 'The rules of the road. How to protect PII and use AI without leaking company data.',
      duration: '10 min',
      icon: 'Shield',
      locked: false
    },
    {
      id: 'tools-overview',
      title: '4. Tools & Research Hub',
      description: 'You have more than just a chatbot. Learn when to use Perplexity, NotebookLM, or Gemini Deep Research.',
      duration: '15 min',
      icon: 'Globe',
      locked: false
    },
    {
      id: 'workflow',
      title: '5. Business Workflows',
      description: 'Real scenarios: Summarizing minutes, comparing contracts, and drafting client emails.',
      duration: '25 min',
      icon: 'Briefcase',
      locked: false
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const handleModuleClick = (moduleId: string) => {
    // Direct routing based on ID
    push(`/modules/${moduleId}`);
  };

  return (
    <PageLayout 
      title="AI Academy Syllabus" 
      description="Your guided path from 'curious' to 'competent.' Follow the tracks below, or jump straight to the specific skill you need right now."
    >
      {/* Recommended Path Hint */}
      <div className="text-sm text-slate-500 mb-8 bg-slate-50 p-3 rounded border border-slate-200 inline-block">
        <strong>Recommended Path:</strong> Fundamentals → Prompting → Safety → Tools → Workflows.
      </div>

      <div className="space-y-12">
        {tracks.map((track) => {
          const trackModules = modules.filter((m) => track.moduleIds.includes(m.id));
          
          return (
            <section key={track.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{track.title}</h2>
                <div className="text-slate-600 mt-2 max-w-3xl prose prose-slate">
                   {/* Render simple markdown-like bolding */}
                   {track.description.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
                   )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trackModules.map((module) => (
                  <Card 
                    key={module.id} 
                    className={`group h-full flex flex-col ${module.locked ? 'opacity-75 bg-slate-50' : 'bg-white'}`}
                    hover={!module.locked}
                    onClick={() => !module.locked && handleModuleClick(module.id)}
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${module.locked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                          {getIcon(module.icon)}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {module.id === 'fundamentals' && (
                            <Badge variant="blue">Start Here</Badge>
                          )}
                          {module.id === 'tools-overview' && (
                            <Badge variant="warning">New: Deep Dives</Badge>
                          )}
                          <Badge variant={module.locked ? 'neutral' : 'success'}>
                            {module.locked ? <Lock className="w-3 h-3 mr-1 inline" /> : null}
                            {module.locked ? 'Locked' : module.duration}
                          </Badge>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                        {module.description}
                      </p>

                      <Button 
                        variant={module.locked ? 'secondary' : 'outline'} 
                        className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200"
                        disabled={module.locked}
                      >
                        {module.locked ? 'Complete previous modules' : 'Start Module'}
                        {!module.locked && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageLayout>
  );
}
