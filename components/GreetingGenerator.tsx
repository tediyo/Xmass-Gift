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
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AccentIcons type="star" size="md" />
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green">
            New Year Greeting Generator
          </h2>
          <AccentIcons type="star" size="md" />
        </div>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Create the perfect New Year greeting
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12 border-4 border-t-secondary-green border-r-primary-red border-b-secondary-green border-l-primary-red relative">
        {/* Subtle decorative element */}
        <div className="absolute top-6 right-6 opacity-20">
          <AccentIcons type="champagne" size="md" />
        </div>
        <div className="space-y-8">
          <div>
            <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
              Recipient Name (Optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-secondary-green border-r-primary-red text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-primary-red focus:border-r-secondary-green focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
              placeholder="Enter name (e.g., John, Family, Friends)"
            />
          </div>

          <div>
            <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
              Choose Greeting Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {greetingTemplates.map((category) => (
                <button
                  key={category.category}
                  onClick={() => {
                    setSelectedCategory(category.category)
                    setShowPreview(false)
                  }}
                  className={`px-4 py-3 rounded-lg font-inter font-semibold transition-all duration-300 ${
                    selectedCategory === category.category
                      ? 'bg-primary-red text-white shadow-soft border-2 border-secondary-green'
                      : 'bg-snow-white text-secondary-green border-2 border-l-primary-red border-r-secondary-green hover:border-l-secondary-green hover:border-r-primary-red hover-lift'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-4 bg-primary-red text-white text-lg font-inter font-semibold rounded-lg shadow-soft hover-lift transition-all duration-300"
          >
            Generate Greeting
          </button>

          {showPreview && selectedGreeting && (
            <div className="mt-8 bg-secondary-green/5 rounded-xl p-8 border border-secondary-green/10 fade-in">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Image 
                    src="/twoW.jpg" 
                    alt="Santa" 
                    width={100}
                    height={100}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-accent-gold/30 shadow-soft object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-xl md:text-2xl text-secondary-green font-inter leading-relaxed whitespace-pre-wrap mb-8">
                  {finalGreeting}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-8 py-3 bg-accent-gold text-secondary-green font-inter font-semibold rounded-lg hover-lift transition-all duration-300 shadow-soft"
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
