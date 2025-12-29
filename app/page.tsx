'use client'

import { useState } from 'react'
import GiftCardForm from '@/components/GiftCardForm'
import GiftCardPreview from '@/components/GiftCardPreview'
import Confetti from '@/components/Confetti'
import NewYearCountdown from '@/components/NewYearCountdown'
import GreetingGenerator from '@/components/GreetingGenerator'
import DigitalCardCreator from '@/components/DigitalCardCreator'
import HeroIllustration from '@/components/HeroIllustration'
import AccentIcons from '@/components/AccentIcons'

type TabType = 'giftcard' | 'countdown' | 'greeting' | 'digitalcard'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('giftcard')
  const [giftCardData, setGiftCardData] = useState({
    recipient: '',
    sender: '',
    amount: '',
    message: '',
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleFormSubmit = (data: typeof giftCardData) => {
    setGiftCardData(data)
    setShowPreview(true)
  }

  const handleBackToEdit = () => {
    setShowPreview(false)
  }

  const tabs = [
    { id: 'giftcard' as TabType, label: 'Gift Card' },
    { id: 'countdown' as TabType, label: 'Countdown' },
    { id: 'greeting' as TabType, label: 'Greeting' },
    { id: 'digitalcard' as TabType, label: 'Digital Card' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden bg-snow-white">
      <Confetti />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 fade-in">
          <HeroIllustration />
          <div className="flex justify-center gap-2 mb-6">
            <AccentIcons type="star" size="sm" />
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-secondary-green">
              New Year 2026
            </h1>
            <AccentIcons type="star" size="sm" />
          </div>
          <p className="text-xl md:text-2xl text-secondary-green/70 font-inter font-light max-w-2xl mx-auto">
            Countdown to a brand new year
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setShowPreview(false)
              }}
              className={`px-6 md:px-8 py-3 rounded-full font-inter text-base md:text-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-red text-white shadow-soft-lg'
                  : 'bg-white text-secondary-green border-2 border-secondary-green/20 hover:border-secondary-green/40 hover-lift'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto fade-in">
          {activeTab === 'giftcard' && (
            <>
              {!showPreview ? (
                <GiftCardForm onSubmit={handleFormSubmit} initialData={giftCardData} />
              ) : (
                <GiftCardPreview 
                  data={giftCardData} 
                  onBack={handleBackToEdit}
                />
              )}
            </>
          )}

          {activeTab === 'countdown' && (
            <NewYearCountdown />
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

