'use client'

import { useEffect, useState } from 'react'

const snowflakes = ['❄', '❅', '❆', '*', '✦']

export default function Snowflakes() {
  const [flakes, setFlakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; emoji: string }>>([])

  useEffect(() => {
    // Subtle snowfall - fewer flakes for minimal aesthetic
    const newFlakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20, // Slower, more gentle
      emoji: snowflakes[Math.floor(Math.random() * snowflakes.length)],
    }))
    setFlakes(newFlakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          {flake.emoji}
        </div>
      ))}
    </div>
  )
}

