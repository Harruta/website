import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// List of allowed commands for security
const ALLOWED_COMMANDS = [
  'ls', 'pwd', 'whoami', 'date', 'uptime', 'uname',
  'cat', 'head', 'tail', 'grep', 'find', 'wc',
  'echo', 'which', 'type', 'history', 'ps',
  'df', 'du', 'free', 'top', 'htop', 'tree',
  'git', 'node', 'npm', 'yarn', 'python', 'python3',
  'curl', 'wget', 'ping', 'netstat', 'ss'
];

// Dangerous commands to block
const BLOCKED_COMMANDS = [
  'rm', 'rmdir', 'mv', 'cp', 'chmod', 'chown',
  'sudo', 'su', 'passwd', 'useradd', 'userdel',
  'systemctl', 'service', 'kill', 'killall',
  'reboot', 'shutdown', 'halt', 'poweroff',
  'dd', 'fdisk', 'mkfs', 'mount', 'umount'
];

function isCommandAllowed(command: string): boolean {
  const cmd = command.trim().split(' ')[0].toLowerCase();
  
  // Block dangerous commands
  if (BLOCKED_COMMANDS.includes(cmd)) {
    return false;
  }
  
  // Allow specific safe commands
  if (ALLOWED_COMMANDS.includes(cmd)) {
    return true;
  }
  
  // Block everything else by default
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();
    
    if (!command || typeof command !== 'string') {
      return NextResponse.json(
        { error: 'Invalid command' },
        { status: 400 }
      );
    }
    
    // Security check
    if (!isCommandAllowed(command)) {
      return NextResponse.json(
        { 
          error: `Command '${command.split(' ')[0]}' is not allowed for security reasons`,
          output: '',
          success: false
        }
      );
    }
    
    try {
      // Execute command with timeout and limits
      const { stdout, stderr } = await execAsync(command, {
        timeout: 10000, // 10 second timeout
        maxBuffer: 1024 * 1024, // 1MB max output
        cwd: process.cwd(),
        env: {
          ...process.env,
          PATH: process.env.PATH,
          HOME: process.env.HOME,
          USER: process.env.USER
        }
      });
      
      return NextResponse.json({
        output: stdout + (stderr ? `\nSTDERR:\n${stderr}` : ''),
        error: null,
        success: true
      });
      
    } catch (execError: unknown) {
      // Handle command execution errors
      const errorMessage = execError instanceof Error ? execError.message : 'Command execution failed';
      const output = (execError as { stdout?: string }).stdout || '';
      const stderr = (execError as { stderr?: string }).stderr || '';
      
      return NextResponse.json({
        output: output + (stderr ? `\nERROR:\n${stderr}` : ''),
        error: errorMessage,
        success: false
      });
    }
    
  } catch (error) {
    console.error('Terminal API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}