'use client'

import { useEffect, useState } from 'react'

const confettiEmojis = ['✨', '🎉', '🎊', '⭐', '💫', '🌟', '🎈', '🎆', '🎇']

export default function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; emoji: string }>>([])

  useEffect(() => {
    // New Year confetti - festive and celebratory
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 20 + Math.random() * 25, // Slow and gentle
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="snowflake"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  )
}

