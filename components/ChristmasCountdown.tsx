'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
    <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border-4 border-christmas-gold shadow-2xl transform hover:scale-110 transition-all duration-300">
      <div className="text-6xl md:text-8xl font-bold text-christmas-gold glow mb-2">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xl md:text-2xl font-semibold text-white uppercase tracking-wider">
        {label}
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-7xl font-bold text-christmas-gold glow mb-4">
          🎄 Countdown to Christmas 🎄
        </h2>
        <p className="text-2xl text-white font-light">
          Time until Santa arrives!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>

      <div className="text-center mt-8">
        <div className="flex justify-center animate-bounce">
          <Image 
            src="/oneW.jpg" 
            alt="Santa" 
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-christmas-gold shadow-2xl object-cover"
            unoptimized
          />
        </div>
        <p className="text-xl text-white mt-4 font-semibold">
          Santa is getting ready! 🎁
        </p>
      </div>
    </div>
  )
}

