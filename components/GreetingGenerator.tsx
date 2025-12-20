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
      ? `Dear ${customName},\n\n${selectedGreeting}\n\nMerry Christmas! 🎄`
      : `${selectedGreeting}\n\nMerry Christmas! 🎄`
    
    navigator.clipboard.writeText(fullGreeting)
    alert('Greeting copied to clipboard!')
  }

  const finalGreeting = customName 
    ? `Dear ${customName},\n\n${selectedGreeting}`
    : selectedGreeting

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-7xl font-bold text-christmas-gold glow mb-4">
          🎄 Greeting Generator 🎄
        </h2>
        <p className="text-2xl text-white font-light">
          Create the perfect Christmas greeting!
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border-4 border-christmas-gold shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-white text-xl font-semibold mb-3">
              Recipient Name (Optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/30 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-christmas-gold text-lg"
              placeholder="Enter name (e.g., John, Family, Friends)"
            />
          </div>

          <div>
            <label className="block text-white text-xl font-semibold mb-3">
              Choose Greeting Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {greetingTemplates.map((category) => (
                <button
                  key={category.category}
                  onClick={() => {
                    setSelectedCategory(category.category)
                    setShowPreview(false)
                  }}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.category
                      ? 'bg-christmas-gold text-red-900 border-4 border-white shadow-lg'
                      : 'bg-white/20 text-white border-2 border-christmas-gold hover:bg-white/30'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-5 bg-gradient-to-r from-christmas-red to-christmas-green text-white text-2xl font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-christmas-gold"
          >
            🎲 Generate Greeting 🎲
          </button>

          {showPreview && selectedGreeting && (
            <div className="mt-8 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl p-8 border-4 border-christmas-gold">
              <div className="text-center">
                <div className="flex justify-center mb-4 animate-bounce">
                  <Image 
                    src="/twoW.jpg" 
                    alt="Santa" 
                    width={128}
                    height={128}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-christmas-gold shadow-xl object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-2xl md:text-3xl text-white font-semibold leading-relaxed whitespace-pre-wrap mb-6">
                  {finalGreeting}
                </div>
                <div className="flex justify-center mb-6">
                  <Image 
                    src="/threeW.jpg" 
                    alt="Christmas" 
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-christmas-gold object-cover"
                    unoptimized
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className="px-8 py-4 bg-christmas-gold text-red-900 font-bold rounded-xl hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  📋 Copy Greeting
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

