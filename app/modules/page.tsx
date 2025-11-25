
import React from 'react';
import { Card, Badge, Button, PageLayout } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { BookOpen, Shield, MessageSquare, Briefcase, Lock, ArrowRight, Globe } from 'lucide-react';
import { Module } from '../../types';

export default function Page() {
  const { push } = useRouter();

  // Module Data
  const modules: Module[] = [
    {
      id: 'fundamentals',
      title: 'AI Fundamentals',
      description: 'Understanding LLMs, how they work, and why they hallucinate.',
      duration: '15 min',
      icon: 'BookOpen',
      locked: false
    },
    {
      id: 'prompting',
      title: 'Prompt Engineering 101',
      description: 'The art of asking: Context, Persona, Task, and Constraints.',
      duration: '20 min',
      icon: 'MessageSquare',
      locked: false
    },
    // NEW: Tools Module
    {
      id: 'tools-overview',
      title: 'AI Tools & Research',
      description: 'Beyond the chatbot: Research tools, Doc analysis, and more.',
      duration: '15 min',
      icon: 'Globe',
      locked: false
    },
    {
      id: 'workflow',
      title: 'Business Workflows',
      description: 'Specific use cases: Meeting minutes, contract comparisons, and excel help.',
      duration: '25 min',
      icon: 'Briefcase',
      locked: false
    },
    {
      id: 'responsible-use',
      title: 'Ethics & Responsible Use',
      description: 'Data privacy, PII protection, and company policy compliance.',
      duration: '10 min',
      icon: 'Shield',
      locked: false
    }
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
      title="Learning Path" 
      description="Master the skills you need to boost your productivity safely."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
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
                <Badge variant={module.locked ? 'neutral' : 'success'}>
                  {module.locked ? <Lock className="w-3 h-3 mr-1 inline" /> : null}
                  {module.locked ? 'Locked' : module.duration}
                </Badge>
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
    </PageLayout>
  );
}
