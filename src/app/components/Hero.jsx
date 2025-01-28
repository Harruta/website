import React from 'react'
import { monoFont } from '../styles/fonts/fonts'

const Hero = () => {
  return (
    <div className={`${monoFont.className}`}>
      {/* Main Heading */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Hey, I am Haru!
      </h1>

      {/* Smaller Description */}
      <p className="text-lg text-muted-foreground dark:text-gray-300">
        A passionate developer exploring the world of code and design.
      </p>
    </div>
  )
}

export default Hero