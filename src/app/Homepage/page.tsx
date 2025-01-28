'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { ModeToggle } from '../components/ui/ModeToggle'

export default function Homepage() {
  return (
    <div className='flex justify-start items-center mb-8 w-full pl-96'>
      <div className='flex justify-betwen items-center gap-60'>
      <Navbar />
      <ModeToggle/>
      </div>
    </div>
  )
}