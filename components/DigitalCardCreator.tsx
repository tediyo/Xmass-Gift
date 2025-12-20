'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const cardTemplates = [
  { id: 1, name: 'Classic Red', bg: 'bg-gradient-to-br from-red-600 to-red-800' },
  { id: 2, name: 'Elegant Gold', bg: 'bg-gradient-to-br from-yellow-600 to-yellow-800' },
  { id: 3, name: 'Forest Green', bg: 'bg-gradient-to-br from-green-700 to-green-900' },
  { id: 4, name: 'Winter Blue', bg: 'bg-gradient-to-br from-blue-600 to-blue-800' },
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
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-7xl font-bold text-christmas-gold glow mb-4">
          🎄 Digital Card Creator 🎄
        </h2>
        <p className="text-2xl text-white font-light">
          Design your personalized Christmas card!
        </p>
      </div>

      {!showPreview ? (
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border-4 border-christmas-gold shadow-2xl">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-lg font-semibold mb-2">
                  To (Recipient)
                </label>
                <input
                  type="text"
                  value={cardData.recipient}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/30 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                  placeholder="Recipient name"
                />
              </div>

              <div>
                <label className="block text-white text-lg font-semibold mb-2">
                  From (Your Name)
                </label>
                <input
                  type="text"
                  value={cardData.sender}
                  onChange={(e) => handleChange('sender', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/30 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Your Message
              </label>
              <textarea
                value={cardData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/30 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold resize-none"
                placeholder="Write your Christmas message here..."
                rows={5}
              />
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Choose Card Template
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cardTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleChange('template', template.id)}
                    className={`h-20 rounded-xl border-4 transition-all transform hover:scale-105 ${
                      cardData.template === template.id
                        ? 'border-christmas-gold shadow-2xl scale-105'
                        : 'border-white/50'
                    } ${template.bg}`}
                  >
                    <span className="text-white font-semibold">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                Choose Santa/Christmas Image
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {santaImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => handleChange('santaImage', image.url)}
                    className={`w-full aspect-square rounded-xl border-4 transition-all transform hover:scale-125 overflow-hidden ${
                      cardData.santaImage === image.url
                        ? 'border-christmas-gold bg-white/30 shadow-lg scale-110'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  >
                    <Image 
                      src={image.url} 
                      alt={image.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-5 bg-gradient-to-r from-christmas-red to-christmas-green text-white text-2xl font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-christmas-gold"
            >
              🎨 Create Digital Card 🎨
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex gap-4 justify-center">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-christmas-gold hover:bg-white/30 transition-all"
            >
              ← Edit Card
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-christmas-red to-christmas-green text-white font-semibold rounded-lg border-2 border-christmas-gold hover:shadow-lg transition-all"
            >
              🖨️ Print/Download
            </button>
          </div>

          <div
            ref={cardRef}
            className={`${selectedTemplate?.bg} rounded-3xl shadow-2xl p-12 border-8 border-christmas-gold relative overflow-hidden min-h-[600px] print:border-4`}
          >
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 text-6xl animate-twinkle">❄</div>
            <div className="absolute top-6 right-6 text-6xl animate-twinkle" style={{ animationDelay: '0.5s' }}>❄</div>
            <div className="absolute bottom-6 left-6 text-6xl">🎄</div>
            <div className="absolute bottom-6 right-6 text-6xl">🎄</div>

            <div className="relative z-10 text-center h-full flex flex-col justify-center">
              <div className="mb-6 flex justify-center animate-bounce">
                <Image 
                  src={cardData.santaImage} 
                  alt="Santa" 
                  width={192}
                  height={192}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-christmas-gold shadow-2xl object-cover"
                  unoptimized
                />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 glow">
                Merry Christmas!
              </h1>

              <div className="my-8">
                <p className="text-2xl text-white/90 mb-2">To:</p>
                <p className="text-4xl font-bold text-christmas-gold mb-6">
                  {cardData.recipient}
                </p>
              </div>

              <div className="my-8 bg-white/20 backdrop-blur-md rounded-2xl p-8 mx-auto max-w-2xl border-4 border-christmas-gold">
                <p className="text-white text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
                  {cardData.message}
                </p>
              </div>

              <div className="mt-12">
                <p className="text-xl text-white/90 mb-2">From:</p>
                <p className="text-3xl font-bold text-christmas-gold">
                  {cardData.sender}
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                {santaImages.slice(0, 5).map((image, i) => (
                  <div 
                    key={image.id} 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-christmas-gold animate-float shadow-lg" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <Image 
                      src={image.url} 
                      alt={image.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

