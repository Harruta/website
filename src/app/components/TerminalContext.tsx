'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalContextType {
  isTerminalMode: boolean;
  setTerminalMode: (mode: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};

interface TerminalProviderProps {
  children: ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const setTerminalMode = (mode: boolean) => {
    setIsTerminalMode(mode);
  };

  return (
    <TerminalContext.Provider value={{ isTerminalMode, setTerminalMode }}>
      {children}
    </TerminalContext.Provider>
  );
};