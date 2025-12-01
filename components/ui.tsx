import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';

// --- Typography & Layout ---

export const PageLayout: React.FC<{ 
  title: string; 
  description?: string; 
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, description, children, actions }) => (
  <div className="max-w-5xl mx-auto animate-fade-in">
    <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-2 text-lg text-slate-600">{description}</p>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
    <div className="space-y-8">
      {children}
    </div>
  </div>
);

export const Heading: React.FC<{ level?: 1 | 2 | 3 | 4; children: React.ReactNode; className?: string }> = ({ 
  level = 2, 
  children, 
  className = '' 
}) => {
  const styles = {
    1: "text-3xl font-bold tracking-tight text-slate-900",
    2: "text-2xl font-bold text-slate-900",
    3: "text-lg font-bold text-slate-800",
    4: "text-base font-semibold text-slate-800",
  };
  const Tag = `h${level}` as React.ElementType;
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

// --- Interactive Elements ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

// --- Containers ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover, ...props }) => (
  <div 
    onClick={onClick}
    className={`
      bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden 
      ${hover || onClick ? 'transition-all duration-200 hover:shadow-md hover:border-blue-200 cursor-pointer' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-fade-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {actions && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Data Display ---

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'blue'; className?: string }> = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div 
      className="w-full bg-slate-200 rounded-full h-2.5" 
      role="progressbar" 
      aria-valuenow={percent} 
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-label="Progress"
    >
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

// --- Specialized Components ---

export const Callout: React.FC<{ 
  variant?: 'info' | 'warning' | 'danger' | 'success'; 
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'info', title, children, className = '' }) => {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-900', icon: <Info className="w-5 h-5 text-blue-600" /> },
    warning: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-900', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
    danger: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-900', icon: <XCircle className="w-5 h-5 text-red-600" /> },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-900', icon: <CheckCircle className="w-5 h-5 text-emerald-600" /> },
  };

  const s = styles[variant];

  // Fix for success icon
  const IconComponent = variant === 'success' ? CheckCircle : s.icon.type;
  
  return (
    <div className={`p-4 rounded-lg border ${s.bg} ${s.border} ${className}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {variant === 'success' ? <IconComponent className="w-5 h-5 text-emerald-600" /> : s.icon}
        </div>
        <div className="flex-1">
          {title && <h4 className={`font-semibold mb-1 ${s.text}`}>{title}</h4>}
          <div className={`text-sm ${s.text} opacity-90`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const PromptCard: React.FC<{ prompt: string; label?: string }> = ({ prompt, label = "PROMPT TEMPLATE" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const processText = (text: string) => {
    const parts = text.split(/(\{\{.*?\}\})/g);
    return parts.map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return <span key={index} className="bg-amber-100 text-amber-800 font-semibold px-1 rounded mx-0.5 border border-amber-200/50">{part}</span>;
      }
      return part;
    });
  };

  const renderContent = () => {
    if (!prompt) return null;
    return prompt.split('\n').map((line, i) => {
      if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      }
      
      // Check for structural keys like "Context:" or "Task:"
      const keyMatch = line.match(/^([A-Za-z\s]+:)(.*)/);
      // Heuristic: Key is short and at start of line
      if (keyMatch && keyMatch[1].length < 40) {
        return (
          <div key={i} className="mb-1">
            <span className="font-bold text-slate-800 mr-2">{keyMatch[1]}</span>
            <span className="text-slate-600">{processText(keyMatch[2])}</span>
          </div>
        );
      }
      
      // Check for numbered steps or bullets that act as headers
      const headerMatch = line.match(/^(\d+\.|-)\s+(.*)/);
      if (headerMatch && headerMatch[2].trim().endsWith(':')) {
         return <div key={i} className="font-bold text-slate-900 mt-4 mb-2">{processText(line)}</div>;
      }

      return <div key={i} className="mb-1">{processText(line)}</div>;
    });
  };

  return (
    <div className="relative group rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied && <span className="text-xs font-medium">Copied</span>}
        </button>
      </div>
      <div className="p-5 font-mono text-sm text-slate-600 leading-relaxed">
        {renderContent()}
      </div>
    </div>
  );
};