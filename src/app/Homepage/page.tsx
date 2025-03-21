'use client';
import { monoFont } from '../styles/fonts/fonts';
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Contact from '../components/contactForm';
import CodeforcesLink from '../components/CodeForces';
import Projects from '../Projects/product';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { BaseFooter } from '@/components/layout/footer/BaseFooter';
import GitHubContributions from '../components/GitHubContributions';

export default function Homepage() {
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-12 lg:px-48">
      {/* Navbar and ThemeToggle in a properly aligned container */}
      <div className="w-full max-w-7xl flex justify-between items-center py-4">
        <Navbar />
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col items-center mt-20 space-y-10">
        <Hero />

        <div className="w-full flex justify-center">
          <div className="max-w-7xl overflow-hidden"> 
            <GitHubContributions />
          </div>
        </div>
        <CodeforcesLink />
        <h2 className={`${monoFont.className}`}>
          My latest work</h2>
        <Projects/>
        <Contact/>
        <BaseFooter />
      </div>
    </div>
  );
}
