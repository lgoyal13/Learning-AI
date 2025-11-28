import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Zap, BookOpen, Book, Menu, X } from 'lucide-react';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon, label }: { view: View; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        currentView === view
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">Enterprise<span className="text-blue-600">AI</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem view="home" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <NavItem view="quick-start" icon={<Zap className="w-5 h-5" />} label="Quick Start" />
          <NavItem view="modules" icon={<Book className="w-5 h-5" />} label="Learning Modules" />
          <NavItem view="reference" icon={<BookOpen className="w-5 h-5" />} label="Reference Guide" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 font-medium uppercase mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-700">System Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg text-slate-900">Enterprise AI</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16 px-4 md:hidden">
           <nav className="space-y-2">
            <NavItem view="home" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
            <NavItem view="quick-start" icon={<Zap className="w-5 h-5" />} label="Quick Start" />
            <NavItem view="modules" icon={<Book className="w-5 h-5" />} label="Learning Modules" />
            <NavItem view="reference" icon={<BookOpen className="w-5 h-5" />} label="Reference Guide" />
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 md:p-8 pt-20 p-4">
        {children}
      </main>
    </div>
  );
};