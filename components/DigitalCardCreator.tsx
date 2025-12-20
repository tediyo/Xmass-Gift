'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const cardTemplates = [
  { id: 1, name: 'Classic Red', bg: 'bg-primary-red', text: 'text-white' },
  { id: 2, name: 'Forest Green', bg: 'bg-secondary-green', text: 'text-white' },
  { id: 3, name: 'Elegant Gold', bg: 'bg-accent-gold', text: 'text-secondary-green' },
  { id: 4, name: 'Snow White', bg: 'bg-white', text: 'text-secondary-green', border: 'border-2 border-secondary-green/20' },
]

const santaImages = [
  { id: 1, url: '/oneW.jpg', name: 'Santa 1' },
  { id: 2, url: '/twoW.jpg', name: 'Santa 2' },
  { id: 3, url: '/threeW.jpg', name: 'Santa 3' },
  { id: 4, url: '/fourW.jpg', name: 'Santa 4' },
  { id: 5, url: '/fiveW.jpg', name: 'Santa 5' },
]

export default function DigitalCardCreator() {
  const [cardData, setCardData] = useState({
    recipient: '',
    sender: '',
    message: '',
    template: 1,
    santaImage: santaImages[0].url,
  })
  const [showPreview, setShowPreview] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleChange = (field: string, value: string | number) => {
    setCardData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    if (cardData.recipient && cardData.sender && cardData.message) {
      setShowPreview(true)
    } else {
      alert('Please fill in all fields!')
    }
  }

  const handleDownload = () => {
    if (!cardRef.current) return
    window.print()
  }

  const selectedTemplate = cardTemplates.find(t => t.id === cardData.template)

  return (
    <div className="w-full max-w-4xl mx-auto fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green mb-4">
          Digital Card Creator
        </h2>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Design your personalized Christmas card
        </p>
      </div>

      {!showPreview ? (
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12 border border-secondary-green/10">
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                  To (Recipient)
                </label>
                <input
                  type="text"
                  value={cardData.recipient}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-secondary-green/20 text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
                  placeholder="Recipient name"
                />
              </div>

              <div>
                <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                  From (Your Name)
                </label>
                <input
                  type="text"
                  value={cardData.sender}
                  onChange={(e) => handleChange('sender', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-secondary-green/20 text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                Your Message
              </label>
              <textarea
                value={cardData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-secondary-green/20 text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all resize-none font-inter"
                placeholder="Write your Christmas message here..."
                rows={5}
              />
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
                Choose Card Template
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {cardTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleChange('template', template.id)}
                    className={`h-16 rounded-lg transition-all ${
                      cardData.template === template.id
                        ? 'ring-4 ring-accent-gold shadow-soft-lg scale-105'
                        : 'hover-lift'
                    } ${template.bg} ${template.text} ${template.border || ''}`}
                  >
                    <span className="font-inter font-semibold text-sm">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
                Choose Image
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {santaImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => handleChange('santaImage', image.url)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all overflow-hidden ${
                      cardData.santaImage === image.url
                        ? 'border-accent-gold ring-4 ring-accent-gold/30 shadow-soft-lg scale-105'
                        : 'border-secondary-green/20 hover:border-secondary-green/40 hover-lift'
                    }`}
                  >
                    <Image 
                      src={image.url} 
                      alt={image.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-4 bg-primary-red text-white text-lg font-inter font-semibold rounded-lg shadow-soft hover-lift transition-all duration-300"
            >
              Create Digital Card
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex gap-4 justify-center">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 bg-white text-secondary-green font-inter font-semibold rounded-lg border-2 border-secondary-green/20 hover:border-secondary-green/40 hover-lift transition-all"
            >
              ← Edit Card
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-primary-red text-white font-inter font-semibold rounded-lg shadow-soft hover-lift transition-all"
            >
              Print/Download
            </button>
          </div>

          <div
            ref={cardRef}
            className={`${selectedTemplate?.bg} ${selectedTemplate?.text} rounded-2xl shadow-soft-lg p-12 border border-secondary-green/10 relative overflow-hidden min-h-[600px] print:border-2`}
          >
            <div className="relative z-10 text-center h-full flex flex-col justify-center">
              <div className="mb-8 flex justify-center animate-gentle-float">
                <Image 
                  src={cardData.santaImage} 
                  alt="Santa" 
                  width={140}
                  height={140}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-accent-gold/30 shadow-soft object-cover"
                  unoptimized
                />
              </div>

              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-8">
                Merry Christmas!
              </h1>

              <div className="my-8">
                <p className="text-sm opacity-70 font-inter uppercase tracking-wide mb-2">To</p>
                <p className="text-3xl md:text-4xl font-playfair font-bold">
                  {cardData.recipient}
                </p>
              </div>

              <div className="my-8 bg-white/20 backdrop-blur-sm rounded-xl p-6 mx-auto max-w-xl border border-white/30">
                <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-inter">
                  {cardData.message}
                </p>
              </div>

              <div className="mt-12">
                <p className="text-sm opacity-70 font-inter uppercase tracking-wide mb-2">From</p>
                <p className="text-2xl md:text-3xl font-playfair font-bold">
                  {cardData.sender}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
