'use client';

import React, { ReactNode } from 'react';
import { useTerminal } from './TerminalContext';
import Terminal from './Terminal';
import Navbar from './Navbar';

interface LayoutContentProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isTerminalMode, setTerminalMode } = useTerminal();

  if (isTerminalMode) {
    return (
      <Terminal onClose={() => setTerminalMode(false)} />
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LayoutContent;