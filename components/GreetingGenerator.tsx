'use client'

import { useState } from 'react'
import Image from 'next/image'
import AccentIcons from './AccentIcons'

const greetingTemplates = [
  {
    category: 'Classic',
    greetings: [
      'Happy New Year 2026! Wishing you joy and prosperity!',
      'Wishing you a wonderful and prosperous New Year 2026!',
      'May the New Year bring you happiness, health, and success!',
      'Sending you warm wishes for a fantastic New Year 2026!',
    ],
  },
  {
    category: 'Funny',
    greetings: [
      'Hope your New Year is as bright as fireworks!',
      'May your New Year be merry and your resolutions achievable!',
      'Wishing you a New Year that\'s as awesome as you are!',
      'Hope 2026 brings you everything you wished for... and more!',
    ],
  },
  {
    category: 'Heartfelt',
    greetings: [
      'May the New Year fill your heart with joy and new beginnings!',
      'Wishing you and your family a New Year filled with love and happiness!',
      'May this New Year bring you closer to your dreams and goals!',
      'Sending you love, peace, and endless possibilities for 2026!',
    ],
  },
  {
    category: 'Formal',
    greetings: [
      'Wishing you a prosperous and successful New Year 2026!',
      'May the New Year bring you peace, happiness, and great achievements!',
      'Sending you warm wishes for a wonderful and successful year ahead!',
      'May your New Year be filled with joy, success, and celebration!',
    ],
  },
]

export default function GreetingGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('Classic')
  const [selectedGreeting, setSelectedGreeting] = useState('')
  const [customName, setCustomName] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const currentGreetings = greetingTemplates.find(c => c.category === selectedCategory)?.greetings || []

  const handleGenerate = () => {
    const randomGreeting = currentGreetings[Math.floor(Math.random() * currentGreetings.length)]
    setSelectedGreeting(randomGreeting)
    setShowPreview(true)
  }

  const handleCopy = () => {
    const fullGreeting = customName 
      ? `Dear ${customName},\n\n${selectedGreeting}\n\nHappy New Year 2026!`
      : `${selectedGreeting}\n\nHappy New Year 2026!`
    
    navigator.clipboard.writeText(fullGreeting)
    alert('Greeting copied to clipboard!')
  }

  const finalGreeting = customName 
    ? `Dear ${customName},\n\n${selectedGreeting}`
    : selectedGreeting

  return (
    <div className="w-full max-w-3xl mx-auto fade-in">
      <div className="text-center mb-6 sm:mb-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <AccentIcons type="star" size="md" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-secondary-green px-2">
            New Year Greeting Generator
          </h2>
          <AccentIcons type="star" size="md" />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-secondary-green/70 font-inter px-4">
          Create the perfect New Year greeting
        </p>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft-lg p-4 sm:p-6 md:p-8 lg:p-12 border-4 border-t-primary-red border-r-primary-red border-b-primary-red border-l-primary-red relative">
        {/* Subtle decorative element */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20 hidden sm:block">
          <AccentIcons type="champagne" size="md" />
        </div>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
              Recipient Name (Optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full min-h-[44px] px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-primary-red text-base text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-primary-red focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
              placeholder="Enter name (e.g., John, Family, Friends)"
            />
          </div>

          <div>
            <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
              Choose Greeting Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {greetingTemplates.map((category) => (
                <button
                  key={category.category}
                  onClick={() => {
                    setSelectedCategory(category.category)
                    setShowPreview(false)
                  }}
                  className={`min-h-[44px] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-inter font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                    selectedCategory === category.category
                      ? 'bg-primary-red text-white shadow-soft border-2 border-primary-red'
                      : 'bg-snow-white text-secondary-green border-2 border-l-primary-red border-r-primary-red active:bg-primary-red/10 hover-lift'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full min-h-[44px] py-4 bg-primary-red text-white text-base sm:text-lg font-inter font-semibold rounded-lg shadow-soft active:bg-primary-red/90 transition-all duration-300 touch-manipulation hover-lift"
          >
            Generate Greeting
          </button>

          {showPreview && selectedGreeting && (
            <div className="mt-6 sm:mt-8 bg-secondary-green/5 rounded-xl p-4 sm:p-6 md:p-8 border border-primary-red/10 fade-in">
              <div className="text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <Image 
                    src="/twoW.jpg" 
                    alt="Santa" 
                    width={100}
                    height={100}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-accent-gold/30 shadow-soft object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-green font-inter leading-relaxed whitespace-pre-wrap mb-6 sm:mb-8 px-2">
                  {finalGreeting}
                </div>
                <button
                  onClick={handleCopy}
                  className="min-h-[44px] w-full sm:w-auto px-6 sm:px-8 py-3 bg-accent-gold text-secondary-green font-inter font-semibold rounded-lg active:bg-accent-gold/90 transition-all duration-300 shadow-soft touch-manipulation hover-lift"
                >
                  Copy Greeting
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
