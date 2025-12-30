'use client'

import { useEffect, useState } from 'react'

interface Firework {
  id: number
  x: number
  y: number
  particles: Array<{
    id: number
    angle: number
    velocity: number
    color: string
  }>
}

const colors = ['#B11226', '#0F3D2E', '#E6B65C', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']

export default function Fireworks({ active }: { active: boolean }) {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    if (!active) {
      setFireworks([])
      return
    }

    // Create initial fireworks
    const createFirework = (id: number): Firework => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 50 + 10, // Between 10% and 60% from top
      particles: Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (Math.PI * 2 * i) / 20,
        velocity: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    })

    // Initial burst
    const initialFireworks = Array.from({ length: 5 }, (_, i) => createFirework(i))
    setFireworks(initialFireworks)

    // Continue creating fireworks periodically
    const interval = setInterval(() => {
      setFireworks((prev) => {
        const newFirework = createFirework(Date.now())
        return [...prev.slice(-10), newFirework] // Keep last 10 fireworks
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {firework.particles.map((particle) => {
            const x = Math.cos(particle.angle) * particle.velocity * 100
            const y = Math.sin(particle.angle) * particle.velocity * 100
            return (
              <div
                key={particle.id}
                className="firework-particle"
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  '--color': particle.color,
                } as React.CSSProperties}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

