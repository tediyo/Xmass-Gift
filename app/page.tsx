'use client'

import { useState } from 'react'
import Confetti from '@/components/Confetti'
import NewYearCountdown from '@/components/NewYearCountdown'
import GreetingGenerator from '@/components/GreetingGenerator'
import DigitalCardCreator from '@/components/DigitalCardCreator'
import HeroIllustration from '@/components/HeroIllustration'
import AccentIcons from '@/components/AccentIcons'
import ResolutionTracker from '@/components/ResolutionTracker'
import NewYearNotification from '@/components/NewYearNotification'

type TabType = 'countdown' | 'greeting' | 'digitalcard' | 'resolutions'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('countdown')

  const tabs = [
    { id: 'countdown' as TabType, label: 'Countdown' },
    { id: 'resolutions' as TabType, label: 'Resolutions' },
    { id: 'greeting' as TabType, label: 'Greeting' },
    { id: 'digitalcard' as TabType, label: 'Digital Card' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden bg-snow-white">
      <Confetti />
      <NewYearNotification />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in">
          <HeroIllustration />
          <div className="flex justify-center items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
            <AccentIcons type="star" size="sm" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-secondary-green px-2">
              New Year 2026
            </h1>
            <AccentIcons type="star" size="sm" />
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-green/70 font-inter font-light max-w-2xl mx-auto px-4">
            Countdown to a brand new year
          </p>
        </div>

        {/* Navigation Tabs - Mobile-first responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
              }}
              className={`min-h-[44px] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-inter text-sm sm:text-base md:text-lg transition-all duration-300 touch-manipulation ${
                activeTab === tab.id
                  ? 'bg-primary-red text-white shadow-soft-lg border-2 border-primary-red'
                  : 'bg-white text-secondary-green border-2 border-l-primary-red border-r-primary-red active:bg-primary-red/10 hover-lift'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area - Mobile-first responsive */}
        <div className="w-full max-w-4xl mx-auto fade-in px-2 sm:px-4">
          {activeTab === 'countdown' && (
            <NewYearCountdown />
          )}

          {activeTab === 'resolutions' && (
            <ResolutionTracker />
          )}

          {activeTab === 'greeting' && (
            <GreetingGenerator />
          )}

          {activeTab === 'digitalcard' && (
            <DigitalCardCreator />
          )}
        </div>
      </div>
    </main>
  )
}

