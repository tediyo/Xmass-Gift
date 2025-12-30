'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AccentIcons from './AccentIcons'
import Fireworks from './Fireworks'

type CountdownState = 'counting' | 'celebrating' | 'passed'

export default function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [state, setState] = useState<CountdownState>('counting')
  const [daysPassed, setDaysPassed] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const newYear2026 = new Date(2026, 0, 1, 0, 0, 0, 0) // January 1, 2026
      const newYear2026End = new Date(2026, 0, 1, 23, 59, 59, 999) // End of January 1, 2026
      
      // Check if we're on January 1, 2026
      if (now >= newYear2026 && now <= newYear2026End) {
        setState('celebrating')
        setShowFireworks(true)
        return
      }
      
      // Check if January 1, 2026 has passed
      if (now > newYear2026End) {
        setState('passed')
        setShowFireworks(false)
        const difference = now.getTime() - newYear2026.getTime()
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        setDaysPassed(days)
        return
      }
      
      // Countdown to January 1, 2026
      setState('counting')
      setShowFireworks(false)
      const difference = newYear2026.getTime() - now.getTime()
      
      // Show fireworks when countdown reaches zero (within last 5 seconds)
      if (difference <= 5000 && difference > 0) {
        setShowFireworks(true)
      }
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const TimeBox = ({ value, label, isGlowing }: { value: number; label: string; isGlowing?: boolean }) => (
    <div className={`flex flex-col items-center justify-center bg-white rounded-xl shadow-soft p-6 md:p-8 border-2 border-l-primary-red border-r-secondary-green hover-lift transition-all duration-300 ${isGlowing ? 'glowing-number' : ''}`}>
      <div className={`text-5xl md:text-7xl font-playfair font-bold text-primary-red mb-2 ${isGlowing ? 'animate-pulse' : ''}`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base font-inter font-semibold text-secondary-green uppercase tracking-wider">
        {label}
      </div>
    </div>
  )

  // Celebration mode - January 1, 2026
  if (state === 'celebrating') {
    return (
      <div className="w-full fade-in relative">
        <Fireworks active={showFireworks} />
        <div className="text-center mb-12 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl animate-bounce">🎉</span>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-primary-red glowing-text">
              Happy New Year 2026!
            </h2>
            <span className="text-4xl animate-bounce">🎊</span>
          </div>
          <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
            Welcome to a brand new year!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-lg p-12 border-4 border-t-primary-red border-r-secondary-green border-b-primary-red border-l-secondary-green mb-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-8 flex-wrap text-6xl md:text-8xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎆</span>
              <span className="animate-bounce" style={{ animationDelay: '1s' }}>🎇</span>
              <span className="animate-bounce" style={{ animationDelay: '1.2s' }}>🥳</span>
              <span className="animate-bounce" style={{ animationDelay: '1.4s' }}>🎁</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-playfair font-bold text-secondary-green mb-4 glowing-text">
              It's January 1, 2026!
            </h3>
            <p className="text-xl md:text-2xl text-secondary-green/70 font-inter">
              Celebrate this special day! 🎊
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4 animate-gentle-float">
            <Image 
              src="/oneW.jpg" 
              alt="Celebration" 
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-gold/30 shadow-soft object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    )
  }

  // Days passed mode - After January 1, 2026
  if (state === 'passed') {
    return (
      <div className="w-full fade-in">
        <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AccentIcons type="sparkle" size="md" />
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green">
            Days Since New Year 2026
          </h2>
          <AccentIcons type="sparkle" size="md" />
        </div>
          <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
            Time since we welcomed 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-lg p-12 border-4 border-t-secondary-green border-r-primary-red border-b-secondary-green border-l-primary-red mb-8">
          <div className="text-center">
            <div className="text-7xl md:text-9xl font-playfair font-bold text-primary-red mb-4">
              {daysPassed}
            </div>
            <div className="text-2xl md:text-3xl font-inter font-semibold text-secondary-green uppercase tracking-wider mb-6">
              Days Passed
            </div>
            <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
              {daysPassed === 1 ? 'One day has passed' : `${daysPassed} days have passed`} since January 1, 2026
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4 animate-gentle-float">
            <Image 
              src="/oneW.jpg" 
              alt="New Year" 
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-gold/30 shadow-soft object-cover"
              unoptimized
            />
          </div>
          <p className="text-lg text-secondary-green/70 font-inter">
            Making the most of 2026! ✨
          </p>
        </div>
      </div>
    )
  }

  // Countdown mode - Before January 1, 2026
  return (
    <div className="w-full fade-in">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AccentIcons type="clock" size="md" />
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green">
            Countdown to New Year 2026
          </h2>
          <AccentIcons type="clock" size="md" />
        </div>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Time until January 1, 2026
        </p>
      </div>

      <div className="relative z-10">
        <Fireworks active={showFireworks} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
          <TimeBox value={timeLeft.days} label="Days" isGlowing={showFireworks && timeLeft.days === 0} />
          <TimeBox value={timeLeft.hours} label="Hours" isGlowing={showFireworks && timeLeft.hours === 0} />
          <TimeBox value={timeLeft.minutes} label="Minutes" isGlowing={showFireworks && timeLeft.minutes === 0} />
          <TimeBox value={timeLeft.seconds} label="Seconds" isGlowing={showFireworks} />
        </div>
      </div>

      <div className="text-center">
        <div className="flex justify-center mb-4 animate-gentle-float">
          <Image 
            src="/oneW.jpg" 
            alt="New Year" 
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-gold/30 shadow-soft object-cover"
            unoptimized
          />
        </div>
        <p className="text-lg text-secondary-green/70 font-inter">
          Get ready for 2026! 🎉
        </p>
      </div>
    </div>
  )
}

