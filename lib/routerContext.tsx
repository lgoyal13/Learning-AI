import React, { createContext, useContext, useState } from 'react';

// Simulating Next.js App Router navigation for this environment
type RouterContextType = {
  path: string;
  push: (path: string) => void;
};

const RouterContext = createContext<RouterContextType>({ path: '/', push: () => {} });

export const useRouter = () => useContext(RouterContext);

export const RouterProvider = ({ children }: { children?: React.ReactNode }) => {
  // Initialize from browser URL instead of hardcoded '/'
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const push = (newPath: string) => {
    setPath(newPath);
    // Update browser URL without page reload
    window.history.pushState({}, '', newPath);
    window.scrollTo(0, 0);
  };

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  );
};