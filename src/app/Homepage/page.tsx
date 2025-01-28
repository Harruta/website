'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { ModeToggle } from '../components/ui/ModeToggle'
import Hero from '../components/Hero'
import Journey from '../components/Journey'

export default function Homepage() {
  return (
    <div className='w-full pl-48'> {/* Reduced padding-left */}
      {/* Navbar and ModeToggle Row */}
      <div className='flex justify-start items-center'>
        <Navbar />
        <ModeToggle />
      </div>

      {/* Hero Section */}
      <div className='justify-start items-center mt-20 pl-5  space-y-10'> 
        <Hero />
        <Journey/>
      </div>
    </div>
  )
}