import React from 'react';
import { monoFont } from '../styles/fonts/fonts';
import { Mail, Twitter, Github, Code,Coffee } from 'lucide-react'; 

const Hero = () => {
  return (
    <div className={`${monoFont.className}`}>
      {/* Main Heading */}
      <div className="text-gray-900 dark:text-white mb-4">
        <h1 className='text-2xl font-bold'>
        Hi, Haru here!
        </h1>
      </div>
      

      {/* Smaller Description */}
      <p className="text-lg text-muted-foreground items-center dark:text-gray-300 mb-4">
       I love cs, math, competitive programming, ml, art and chess.I have just started my CS journey currently trying to master 
       web development and competitive programming.

       My dream is to have my own Startup someday
      </p>

      {/* Social Icons */}
      <div className="flex space-x-4">
        <a 
          href="https://x.com/codebyharu" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all duration-300 hover:-translate-y-1"
        >
          <Twitter size={20} />
        </a>
        <a 
          href="mailto:your-ka46774336@gmail.com" 
          className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-all duration-300 hover:-translate-y-1"
        >
          <Mail size={20} />
        </a>
        <a 
          href="https://github.com/Harruta" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://codeforces.com/profile/haruta" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-all duration-300 hover:-translate-y-1"
        >
          <Code size={20} />
        </a>
        <a 
          href="https://buymeacoffee.com/codebyharu" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-all duration-300 hover:-translate-y-1"
        >
          <Coffee size={20} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
