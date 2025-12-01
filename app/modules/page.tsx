import React from 'react';
import { Card, Badge, Button, PageLayout } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  BookOpen, 
  Shield, 
  MessageSquare, 
  Briefcase, 
  Lock, 
  ArrowRight, 
  Globe, 
  Zap, 
  Layers, 
  PenTool, 
  Cpu, 
  Workflow 
} from 'lucide-react';
import { Module } from '../../types';

// Extended Module type locally to include path
interface ModuleWithRoute extends Omit<Module, 'icon'> {
  icon: string;
  path: string;
  tag?: string;
  tagVariant?: 'blue' | 'warning' | 'neutral' | 'success';
}

interface Track {
  id: string;
  title: string;
  tagline: string;
  description: string;
  modules: ModuleWithRoute[];
}

export default function Page() {
  const { push } = useRouter();

  const tracks: Track[] = [
    {
      id: 'core',
      title: 'Core Skillset: Foundations',
      tagline: 'Build the habits that make every AI tool more useful.',
      description: 'Build the fundamentals first. These modules explain what AI is actually doing, how to stay safe, and how to talk to it like a capable teammate.',
      modules: [
        {
          id: 'fundamentals',
          title: 'AI Fundamentals & Safe Use',
          description: 'Understand what modern AI is actually doing under the hood, why it sometimes makes things up, and the simple habits that keep you safe at work.',
          duration: '15 min',
          icon: 'BookOpen',
          path: '/modules/fundamentals',
          tag: 'Start here',
          tagVariant: 'blue',
          locked: false
        },
        {
          id: 'prompting',
          title: 'Prompting Foundations',
          description: 'Learn the PCTR pattern and how to talk to AI like a capable intern. Practice turning vague asks into clear tasks and running reliable back-and-forth conversations.',
          duration: '20 min',
          icon: 'MessageSquare',
          path: '/modules/prompting',
          tag: 'Core Prompting',
          tagVariant: 'success',
          locked: false
        },
        {
          id: 'workflow',
          title: 'Modern Chatbots & Modes',
          description: 'See how fast vs deep modes work in practice, when to turn on web search or Deep Research, and how to use attachments and screenshots as part of your prompt.',
          duration: '20 min',
          icon: 'Zap',
          path: '/modules/workflow',
          tag: 'Fast vs Deep',
          tagVariant: 'neutral',
          locked: false
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Deep Dives',
      tagline: 'Learn how each tool works, then see how they combine inside real workflows.',
      description: 'Once the core skills feel natural, these modules walk you through each tool on its own, then finish with a capstone module that chains them into full workflows.',
      modules: [
        {
          id: 'tool-research',
          title: 'Research & Web',
          description: 'Use Perplexity and Deep Research features for live web research, market scans, and competitive intel with citations you can click and check.',
          duration: '15 min',
          icon: 'Globe',
          path: '/modules/tool-research',
          locked: false
        },
        {
          id: 'tool-documents',
          title: 'Your Documents (NotebookLM)',
          description: 'Turn piles of PDFs, decks, and notes into a private research space with NotebookLM and similar "your docs" tools.',
          duration: '15 min',
          icon: 'Layers',
          path: '/modules/tool-documents',
          locked: false
        },
        {
          id: 'tool-builder',
          title: 'Gemini & Workspace',
          description: 'Use Gemini for briefings with links, inside Docs, Sheets, Gmail, and Slides, and experiment with its image and video tools for internal campaigns.',
          duration: '20 min',
          icon: 'PenTool',
          path: '/modules/tool-builder',
          locked: false
        },
        {
          id: 'tools-overview',
          title: 'Workflows: Your AI Toolkit in Action',
          description: 'Use this capstone after you know the tools. Walk through three real workflows that combine NotebookLM, Perplexity, Gemini, and chat from first question to final output.',
          duration: 'Capstone · 15 min',
          icon: 'Briefcase',
          path: '/modules/tools-overview',
          locked: false
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced & Coming Soon',
      tagline: 'Look at pilots and automation ideas that require extra approvals.',
      description: 'Come here after you have finished the foundations and tools tracks. These modules point you to the Advanced page, where pilots and automation experiments live under extra guardrails.',
      modules: [
        {
          id: 'advanced-hub',
          title: 'Advanced Workflows & Pilots',
          description: 'Explore early pilots, advanced workflows, and automation experiments. Best for champions and people who already live in the tools.',
          duration: 'Ongoing',
          icon: 'Cpu',
          path: '/advanced',
          tag: 'Advanced',
          tagVariant: 'warning',
          locked: false
        },
        {
          id: 'automation-future',
          title: 'Workflow Automation',
          description: 'Future modules on connecting AI to other tools and automating parts of your job.',
          duration: 'TBD',
          icon: 'Workflow',
          path: '',
          locked: true
        }
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Workflow': return <Workflow className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <PageLayout 
      title="Learning modules" 
      description="Most people get the most value from the Academy by moving through three stages."
    >
      <div className="max-w-4xl mb-8 -mt-2">
        <ol className="space-y-3 text-slate-700 list-decimal pl-5">
           <li className="pl-2"><span className="font-bold text-slate-900">Foundations:</span> Learn the core habits of prompting and safe use.</li>
           <li className="pl-2"><span className="font-bold text-slate-900">Tools and deep dives:</span> Get hands on with research, your docs, and builder tools, and end with a workflows capstone.</li>
           <li className="pl-2"><span className="font-bold text-slate-900">Advanced pilots:</span> Explore automation and experimental use cases on the Advanced page once you are comfortable with the basics.</li>
        </ol>
      </div>

      {/* Hero Buttons */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button onClick={() => push('/quick-start')} size="md">
            Start Prompting Quickstart <Zap className="w-4 h-4 ml-2" />
          </Button>
          <Button onClick={() => push('/reference')} variant="outline" size="md">
            Browse Prompt Templates <BookOpen className="w-4 h-4 ml-2" />
          </Button>
          <Button onClick={() => push('/reference/resources')} variant="outline" size="md">
            See Advanced Resources <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="space-y-16">
        {tracks.map((track) => (
          <section key={track.id} className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{track.title}</h2>
              <p className="text-lg font-medium text-slate-700 mt-1">{track.tagline}</p>
              <p className="text-lg text-slate-600 mt-2 max-w-3xl">
                {track.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {track.modules.map((module) => (
                <Card 
                  key={module.id} 
                  className={`group h-full flex flex-col ${module.locked ? 'opacity-75 bg-slate-50' : 'bg-white'}`}
                  hover={!module.locked}
                  onClick={() => !module.locked && module.path && push(module.path)}
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg ${module.locked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                        {getIcon(module.icon)}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {module.tag && (
                          <Badge variant={module.tagVariant || 'neutral'}>{module.tag}</Badge>
                        )}
                        <Badge variant={module.locked ? 'neutral' : 'success'}>
                          {module.locked ? <Lock className="w-3 h-3 mr-1 inline" /> : null}
                          {module.locked ? 'Coming Soon' : module.duration}
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
                      {module.locked ? 'Not available yet' : 'Start module'}
                      {!module.locked && <ArrowRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}