'use client';

import React, { useState, useEffect, useRef } from 'react';
import { monoFont } from '../styles/fonts/fonts';
import { cn } from '@/lib/utils';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Haru\'s Terminal! Type "help" to get started.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // Force scroll to bottom immediately with multiple attempts
      const element = scrollAreaRef.current;
      element.scrollTop = element.scrollHeight;
      
      // Double-check with a small delay
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, 5);
    }
  };

  // Focus input and scroll to bottom when terminal mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Initial scroll to bottom
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      });
    }
  }, [lines]);

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { type, content }]);
    
    // Force scroll to bottom after adding line
    setTimeout(() => {
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  const executeLinuxCommand = async (command: string) => {
    try {
      const response = await fetch('/api/terminal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Split output into lines and add each line
        const outputLines = result.output.split('\n');
        outputLines.forEach((line, index) => {
          setLines(prev => [...prev, { type: 'output', content: line || '\u00A0' }]);
        });
        // Force scroll after all lines are added
        setTimeout(() => {
          scrollToBottom();
        }, 20);
      } else {
        setLines(prev => [...prev, { type: 'error', content: result.error || 'Command execution failed' }]);
        if (result.output) {
          const outputLines = result.output.split('\n');
          outputLines.forEach(line => {
            setLines(prev => [...prev, { type: 'output', content: line || '\u00A0' }]);
          });
        }
        // Force scroll after all lines are added
        setTimeout(() => {
          scrollToBottom();
        }, 20);
      }
    } catch (error) {
      addLine('error', 'Failed to execute command: Network error');
    }
  };

  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();
    const originalCommand = command.trim();
    
    // Add command to history
    if (originalCommand && !commandHistory.includes(originalCommand)) {
      setCommandHistory(prev => [...prev, originalCommand]);
    }
    
    // Add input line
    addLine('input', `$ ${originalCommand}`);
    
    // Handle built-in commands first
    switch (cmd) {
      case 'help':
        addLine('output', 'Built-in commands:');
        addLine('output', '  help     - Show this help message');
        addLine('output', '  about    - Learn about Haru');
        addLine('output', '  projects - View my projects');
        addLine('output', '  blogs    - View blog status');
        addLine('output', '  clear    - Clear the terminal');
        addLine('output', '  exit     - Close terminal');
        addLine('output', '');
        addLine('output', 'Linux commands:');
        addLine('output', '  ls, pwd, whoami, date, uptime, cat, grep, etc.');
        addLine('output', '  (Safe commands only - destructive commands are blocked)');
        break;
        
      case 'about':
        addLine('output', 'Hi, Haru here!');
        addLine('output', '');
        addLine('output', 'I love cs, math, competitive programming, ml, art and chess.');
        addLine('output', 'I have just started my CS journey currently trying to master');
        addLine('output', 'web development and competitive programming.');
        addLine('output', '');
        addLine('output', 'My dream is to have my own Startup someday');
        addLine('output', '');
        addLine('output', 'Connect with me:');
        addLine('output', '  Twitter: https://x.com/codebyharu');
        addLine('output', '  GitHub:  https://github.com/Harruta');
        addLine('output', '  Email:   ka46774336@gmail.com');
        break;
        
      case 'projects':
        addLine('output', 'My Projects:');
        addLine('output', '');
        addLine('output', '1. Terminal Wallet (Aug 2025)');
        addLine('output', '   A terminal based solana wallet made with rust');
        addLine('output', '   Status: ongoing project');
        addLine('output', '   GitHub: https://github.com/Harruta/terminal-wallet');
        addLine('output', '');
        addLine('output', '2. Jozu (June 2025)');
        addLine('output', '   A gamified site for learning Japanese');
        addLine('output', '   Features: JLPT style tests for learning Japanese');
        addLine('output', '   Live: https://jozu-git-main-harrutas-projects.vercel.app/');
        addLine('output', '');
        addLine('output', '3. QuietChat (Feb 2025)');
        addLine('output', '   A privacy-focused chat app');
        addLine('output', '   Features: Encrypted Messages, Temporary Accounts, Local storage mode');
        addLine('output', '   Live: https://qchat-jw2m.onrender.com/');
        addLine('output', '');
        addLine('output', '4. Brainly (Mar 2025)');
        addLine('output', '   A place where one can store all their bookmarks');
        addLine('output', '   Features: User accounts and bookmark storage');
        addLine('output', '   Live: https://brain-bay-two.vercel.app/');
        addLine('output', '');
        addLine('output', 'View more: https://github.com/Harruta');
        break;
        
      case 'blogs':
        addLine('output', 'Blog Status: Still in construction 🚧');
        addLine('output', 'Coming soon with exciting content!');
        break;
        
      case 'clear':
        setLines([]);
        return;
        
      case 'exit':
        onClose();
        return;
        
      case '':
        // Empty command, just add a new prompt
        break;
        
      default:
        // If it's not a built-in command, try to execute it as a Linux command
        await executeLinuxCommand(originalCommand);
        break;
    }
    
    addLine('output', '');
    
    // Final scroll to bottom after command execution
    setTimeout(() => {
      scrollToBottom();
    }, 30);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-green-400 flex flex-col"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-green-400/30">
        <div className={cn("text-sm", monoFont.className)}>
          haru@terminal:~$
        </div>
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-300 text-xl font-bold px-2"
          title="Close terminal (ESC)"
        >
          ×
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Scrollable Content Area */}
        <div 
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
        >
          {lines.map((line, index) => (
            <div key={index} className={cn(
              monoFont.className,
              line.type === 'input' && 'text-white',
              line.type === 'output' && 'text-green-400',
              line.type === 'error' && 'text-red-400'
            )}>
              {line.content || '\u00A0'}
            </div>
          ))}
          {/* Spacer to push input to bottom */}
          <div className="h-4"></div>
        </div>
        
        {/* Fixed Input Line at Bottom */}
        <div className="border-t border-green-400/30 p-4 bg-black">
          <div className={cn("flex items-center", monoFont.className)}>
            <span className="text-white mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;