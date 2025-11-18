"use client"

import { useState } from "react"
import { CircularDots } from "./components/Stars"
import { ShootingStar } from "./components/ShootingStar"

export default function Home() {
  const [animationEnabled, setAnimationEnabled] = useState(true)

  return (
    <div className="relative w-full min-h-screen">
      {animationEnabled && (
        <>
          <CircularDots />
          <ShootingStar />
        </>
      )}

      <button
        onClick={() => setAnimationEnabled(!animationEnabled)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
      >
        {animationEnabled ? "Turn Off" : "Turn On"}
      </button>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Site Under Construction</h1>
          <p className="text-lg">Please visit sometime later</p>
        </div>
      </div>
    </div>
  )
}

