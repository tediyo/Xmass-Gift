'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import AccentIcons from './AccentIcons'

const cardTemplates = [
  { id: 1, name: 'Classic Red', bg: 'bg-primary-red', text: 'text-white', type: 'color' },
  { id: 2, name: 'Forest Green', bg: 'bg-secondary-green', text: 'text-white', type: 'color' },
  { id: 3, name: 'Elegant Gold', bg: 'bg-accent-gold', text: 'text-secondary-green', type: 'color' },
  { id: 4, name: 'Snow White', bg: 'bg-white', text: 'text-secondary-green', border: 'border-2 border-primary-red/20', type: 'color' },
]

const backgroundImages = [
  { id: 1, url: '/oneW.jpg', name: 'Background 1' },
  { id: 2, url: '/twoW.jpg', name: 'Background 2' },
  { id: 3, url: '/threeW.jpg', name: 'Background 3' },
  { id: 4, url: '/fourW.jpg', name: 'Background 4' },
  { id: 5, url: '/fiveW.jpg', name: 'Background 5' },
]

export default function DigitalCardCreator() {
  const [cardData, setCardData] = useState({
    recipient: '',
    sender: '',
    message: '',
    template: 1,
    backgroundImage: null as string | null,
    useImageBackground: false,
  })
  const [showPreview, setShowPreview] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleChange = (field: string, value: string | number | boolean | null) => {
    setCardData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    if (cardData.recipient && cardData.sender && cardData.message) {
      if (cardData.useImageBackground && !cardData.backgroundImage) {
        alert('Please select a background image!')
        return
      }
      setShowPreview(true)
    } else {
      alert('Please fill in all fields!')
    }
  }

  const handleDownload = () => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    
    // Get background color from template
    const getBgColor = () => {
      if (cardData.useImageBackground && cardData.backgroundImage) {
        return ''
      }
      if (!selectedTemplate) return '#F9FAF7'
      
      const colorMap: Record<number, string> = {
        1: '#B11226', // primary-red
        2: '#0F3D2E', // secondary-green
        3: '#E6B65C', // accent-gold
        4: '#FFFFFF', // white
      }
      return colorMap[selectedTemplate.id] || '#F9FAF7'
    }
    
    const bgImage = cardData.useImageBackground && cardData.backgroundImage
      ? `url(${cardData.backgroundImage})`
      : ''
    const bgColor = getBgColor()
    const textColor = cardData.useImageBackground && cardData.backgroundImage
      ? 'white'
      : (selectedTemplate?.id === 3 || selectedTemplate?.id === 4 ? '#0F3D2E' : 'white')
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    
    if (!printWindow) {
      // Fallback to regular print if popup is blocked
      card.scrollIntoView({ behavior: 'instant', block: 'start' })
      setTimeout(() => {
        window.print()
      }, 100)
      return
    }
    
    // Get the card content HTML
    const cardContent = card.innerHTML
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>New Year Card 2026</title>
          <meta charset="utf-8">
          <style>
            @page {
              margin: 0.5cm;
              size: A4;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
              background: white;
            }
            #print-card {
              width: 100%;
              min-height: 90vh;
              padding: 2.5cm;
              margin: 0;
              ${bgImage ? `background-image: ${bgImage};` : ''}
              ${bgColor ? `background-color: ${bgColor};` : ''}
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              color: ${textColor};
              position: relative;
            }
            #print-card > div {
              position: relative;
              z-index: 10;
            }
            #print-card .absolute {
              position: absolute;
            }
            #print-card h1 {
              font-size: 3rem;
              font-weight: bold;
              margin-bottom: 2rem;
              ${cardData.useImageBackground && cardData.backgroundImage ? 'text-shadow: 2px 2px 4px rgba(0,0,0,0.5);' : ''}
            }
            #print-card p {
              margin: 0.5rem 0;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 0; 
                background: white;
              }
              #print-card { 
                margin: 0; 
                padding: 2.5cm;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-card">
            ${cardContent}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `)
    
    printWindow.document.close()
  }

  const selectedTemplate = cardTemplates.find(t => t.id === cardData.template)

  return (
    <div className="w-full max-w-4xl mx-auto fade-in">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AccentIcons type="star" size="md" />
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-secondary-green">
            New Year Card Creator
          </h2>
          <AccentIcons type="star" size="md" />
        </div>
        <p className="text-lg md:text-xl text-secondary-green/70 font-inter">
          Design your personalized New Year card
        </p>
      </div>

      {!showPreview ? (
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12 border-4 border-t-primary-red border-r-primary-red border-b-primary-red border-l-primary-red relative">
          {/* Subtle decorative element */}
          <div className="absolute top-6 left-6 opacity-20">
            <AccentIcons type="party" size="md" />
          </div>
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
                  className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-primary-red text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-primary-red focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
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
                  className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-primary-red text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-primary-red focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all font-inter"
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
                  className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-primary-red text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-primary-red focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all resize-none font-inter"
                placeholder="Write your New Year message here..."
                rows={5}
              />
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
                Card Style
              </label>
              <div className="mb-4">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => {
                      handleChange('useImageBackground', false)
                      handleChange('backgroundImage', null)
                    }}
                    className={`px-6 py-3 rounded-lg font-inter font-semibold transition-all border-2 ${
                      !cardData.useImageBackground
                        ? 'bg-primary-red text-white border-l-primary-red border-r-primary-red shadow-soft-lg'
                        : 'bg-white text-secondary-green border-l-primary-red border-r-primary-red hover-lift'
                    }`}
                  >
                    Solid Colors
                  </button>
                  <button
                    onClick={() => {
                      handleChange('useImageBackground', true)
                      if (!cardData.backgroundImage) {
                        handleChange('backgroundImage', backgroundImages[0].url)
                      }
                    }}
                    className={`px-6 py-3 rounded-lg font-inter font-semibold transition-all border-2 ${
                      cardData.useImageBackground
                        ? 'bg-primary-red text-white border-l-primary-red border-r-primary-red shadow-soft-lg'
                        : 'bg-white text-secondary-green border-l-primary-red border-r-primary-red hover-lift'
                    }`}
                  >
                    Image Background
                  </button>
                </div>
              </div>

              {!cardData.useImageBackground ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cardTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleChange('template', template.id)}
                      className={`h-16 rounded-lg transition-all border-2 ${
                        cardData.template === template.id
                          ? 'ring-4 ring-accent-gold shadow-soft-lg scale-105 border-l-primary-red border-r-primary-red'
                          : 'border-l-primary-red border-r-primary-red hover-lift'
                      } ${template.bg} ${template.text} ${template.border || ''}`}
                    >
                      <span className="font-inter font-semibold text-sm">{template.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <label className="block text-secondary-green text-sm font-inter font-semibold mb-3 uppercase tracking-wide">
                    Choose Background Image
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {backgroundImages.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => {
                          handleChange('backgroundImage', image.url)
                        }}
                        className={`w-full aspect-square rounded-lg border-2 transition-all overflow-hidden relative ${
                          cardData.backgroundImage === image.url
                            ? 'border-l-primary-red border-r-primary-red ring-4 ring-accent-gold/30 shadow-soft-lg scale-105'
                            : 'border-l-primary-red border-r-primary-red hover:border-l-primary-red hover:border-r-primary-red hover-lift'
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
                        {cardData.backgroundImage === image.url && (
                          <div className="absolute inset-0 bg-primary-red/20 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
          <div className="mb-6 flex gap-4 justify-center no-print">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 bg-white text-secondary-green font-inter font-semibold rounded-lg border-2 border-l-primary-red border-r-primary-red hover:border-l-primary-red hover:border-r-primary-red hover-lift transition-all"
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
            id="printable-digital-card"
            className={`${
              cardData.useImageBackground && cardData.backgroundImage
                ? ''
                : `${selectedTemplate?.bg} ${selectedTemplate?.text}`
            } rounded-2xl shadow-soft-lg p-12 border-4 border-t-primary-red border-r-primary-red border-b-primary-red border-l-primary-red relative overflow-hidden min-h-[600px]`}
            style={
              cardData.useImageBackground && cardData.backgroundImage
                ? {
                    backgroundImage: `url(${cardData.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }
                : undefined
            }
          >
            {/* Overlay for better text readability when using image background */}
            {cardData.useImageBackground && cardData.backgroundImage && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            )}
            
            <div className="relative z-10 text-center h-full flex flex-col justify-center">
              <h1 className={`text-4xl md:text-6xl font-playfair font-bold mb-8 ${
                cardData.useImageBackground && cardData.backgroundImage
                  ? 'text-white drop-shadow-lg'
                  : ''
              }`}>
                Happy New Year 2026!
              </h1>

              <div className="my-8">
                <p className={`text-sm font-inter uppercase tracking-wide mb-2 ${
                  cardData.useImageBackground && cardData.backgroundImage
                    ? 'text-white/90 drop-shadow'
                    : 'opacity-70'
                }`}>
                  To
                </p>
                <p className={`text-3xl md:text-4xl font-playfair font-bold ${
                  cardData.useImageBackground && cardData.backgroundImage
                    ? 'text-white drop-shadow-lg'
                    : ''
                }`}>
                  {cardData.recipient}
                </p>
              </div>

              <div className={`my-8 rounded-xl p-6 mx-auto max-w-xl border ${
                cardData.useImageBackground && cardData.backgroundImage
                  ? 'bg-white/90 backdrop-blur-sm border-white/50'
                  : 'bg-white/20 backdrop-blur-sm border-white/30'
              }`}>
                <p className={`text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-inter ${
                  cardData.useImageBackground && cardData.backgroundImage
                    ? 'text-secondary-green'
                    : ''
                }`}>
                  {cardData.message}
                </p>
              </div>

              <div className="mt-12">
                <p className={`text-sm font-inter uppercase tracking-wide mb-2 ${
                  cardData.useImageBackground && cardData.backgroundImage
                    ? 'text-white/90 drop-shadow'
                    : 'opacity-70'
                }`}>
                  From
                </p>
                <p className={`text-2xl md:text-3xl font-playfair font-bold ${
                  cardData.useImageBackground && cardData.backgroundImage
                    ? 'text-white drop-shadow-lg'
                    : ''
                }`}>
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
