'use client'

import { useState } from 'react'
import Image from 'next/image'

const greetingTemplates = [
  {
    category: 'Classic',
    greetings: [
      'Merry Christmas and a Happy New Year!',
      'Wishing you joy, peace, and love this Christmas!',
      'May your Christmas be filled with warmth and happiness!',
      'Sending you warm Christmas wishes and holiday cheer!',
    ],
  },
  {
    category: 'Funny',
    greetings: [
      'Hope your Christmas is as sweet as Santa\'s cookies!',
      'May your Christmas be merry and your WiFi strong!',
      'Wishing you a Christmas that\'s as awesome as you are!',
      'Hope Santa brings you everything you asked for... and more!',
    ],
  },
  {
    category: 'Heartfelt',
    greetings: [
      'May the magic of Christmas fill your heart with joy!',
      'Wishing you and your family a Christmas filled with love!',
      'May this Christmas bring you closer to those you love!',
      'Sending you love, peace, and happiness this Christmas!',
    ],
  },
  {
    category: 'Formal',
    greetings: [
      'Wishing you a joyous Christmas and a prosperous New Year!',
      'May the spirit of Christmas bring you peace and happiness!',
      'Sending you warm wishes for a wonderful Christmas season!',
      'May your holiday season be filled with joy and celebration!',
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
      ? `Dear ${customName},\n\n${selectedGreeting}\n\nMerry Christmas!`
      : `${selectedGreeting}\n\nMerry Christmas!`
    
    navigator.clipboard.writeText(fullGreeting)
    alert('Greeting copied to clipboard!')
  }

  const finalGreeting = customName 
    ? `Dear ${customName},\n\n${selectedGreeting}`
    : selectedGreeting

  return (
    <div className="w-full max-w-3xl mx-auto fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green mb-4">
          Greeting Generator
        </h2>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Create the perfect Christmas greeting
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12 border border-secondary-green/10">
        <div className="space-y-8">
          <div>
            <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
              Recipient Name (Optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-secondary-green/20 text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
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
                      ? 'bg-primary-red text-white shadow-soft'
                      : 'bg-snow-white text-secondary-green border-2 border-secondary-green/20 hover:border-secondary-green/40 hover-lift'
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
