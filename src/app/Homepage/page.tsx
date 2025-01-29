'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Journey from '../components/Journey';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { BaseFooter } from '@/components/layout/footer/BaseFooter';

export default function Homepage() {
  return (
    <div className="w-full px-4 sm:px-12 lg:px-48"> {/* Consistent padding */}
      {/* Unified container for Navbar and ModeToggle */}
      <div className="flex justify-between items-center gap-4">
        <Navbar />
        <ThemeToggle/>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center w-full max-w-7xl mx-auto mt-20 space-y-10">
        <Hero />
        <Journey />
        <BaseFooter/>
      </div>
    </div>
  );
}
