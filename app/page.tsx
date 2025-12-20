'use client'

import { useState } from 'react'
import GiftCardForm from '@/components/GiftCardForm'
import GiftCardPreview from '@/components/GiftCardPreview'
import Snowflakes from '@/components/Snowflakes'
import Decorations from '@/components/Decorations'
import ChristmasCountdown from '@/components/ChristmasCountdown'
import GreetingGenerator from '@/components/GreetingGenerator'
import DigitalCardCreator from '@/components/DigitalCardCreator'

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
    { id: 'giftcard' as TabType, label: '🎁 Gift Card', emoji: '🎁' },
    { id: 'countdown' as TabType, label: '⏰ Countdown', emoji: '⏰' },
    { id: 'greeting' as TabType, label: '💌 Greeting', emoji: '💌' },
    { id: 'digitalcard' as TabType, label: '🎨 Digital Card', emoji: '🎨' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Snowflakes />
      <Decorations />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl md:text-8xl font-bold mb-4 glow text-christmas-gold">
            🎄 Merry Christmas 🎄
          </h1>
          <p className="text-xl md:text-3xl text-white font-light">
            Your Complete Christmas Experience
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setShowPreview(false)
              }}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-110 ${
                activeTab === tab.id
                  ? 'bg-christmas-gold text-red-900 border-4 border-white shadow-2xl scale-105'
                  : 'bg-white/20 text-white border-2 border-christmas-gold hover:bg-white/30'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
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
            <ChristmasCountdown />
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

