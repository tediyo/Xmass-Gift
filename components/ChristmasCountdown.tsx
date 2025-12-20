'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AccentIcons from './AccentIcons'

export default function ChristmasCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let christmas = new Date(currentYear, 11, 25) // December 25

      // If Christmas has passed this year, set it for next year
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25)
      }

      const difference = christmas.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-soft p-6 md:p-8 border border-secondary-green/10 hover-lift transition-all duration-300">
      <div className="text-5xl md:text-7xl font-playfair font-bold text-primary-red mb-2">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base font-inter font-semibold text-secondary-green uppercase tracking-wider">
        {label}
      </div>
    </div>
  )

  return (
    <div className="w-full fade-in">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AccentIcons type="bell" size="md" />
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green">
            Countdown to Christmas
          </h2>
          <AccentIcons type="bell" size="md" />
        </div>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Time until the holidays arrive
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>

      <div className="text-center">
        <div className="flex justify-center mb-4 animate-gentle-float">
          <Image 
            src="/oneW.jpg" 
            alt="Santa" 
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-gold/30 shadow-soft object-cover"
            unoptimized
          />
        </div>
        <p className="text-lg text-secondary-green/70 font-inter">
          The holidays are approaching
        </p>
      </div>
    </div>
  )
}
