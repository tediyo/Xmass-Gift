'use client'

import { useRef } from 'react'

interface GiftCardPreviewProps {
  data: {
    recipient: string
    sender: string
    amount: string
    message: string
  }
  onBack: () => void
}

export default function GiftCardPreview({ data, onBack }: GiftCardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!cardRef.current) return
    
    // Create a canvas to capture the card
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const card = cardRef.current
    canvas.width = card.offsetWidth
    canvas.height = card.offsetHeight

    // Use html2canvas if available, otherwise just print
    window.print()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex gap-4 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-christmas-gold hover:bg-white/30 transition-all"
        >
          ← Edit Card
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-gradient-to-r from-christmas-red to-christmas-green text-white font-semibold rounded-lg border-2 border-christmas-gold hover:shadow-lg transition-all"
        >
          🖨️ Print Card
        </button>
      </div>

      <div
        ref={cardRef}
        className="bg-gradient-to-br from-red-50 via-white to-green-50 rounded-3xl shadow-2xl p-12 border-8 border-christmas-gold relative overflow-hidden print:shadow-none print:border-4"
        style={{ minHeight: '500px' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 text-4xl animate-twinkle">❄</div>
        <div className="absolute top-6 right-6 text-4xl animate-twinkle" style={{ animationDelay: '0.5s' }}>❄</div>
        <div className="absolute bottom-6 left-6 text-4xl">🎄</div>
        <div className="absolute bottom-6 right-6 text-4xl">🎄</div>
        
        {/* Card content */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-christmas-red mb-4 glow">
            🎄 Gift Card 🎄
          </h1>
          
          <div className="my-8">
            <p className="text-2xl text-gray-700 mb-2">To:</p>
            <p className="text-4xl font-bold text-christmas-green mb-6">
              {data.recipient}
            </p>
          </div>

          <div className="my-8 bg-gradient-to-r from-christmas-red to-christmas-green rounded-2xl p-6 mx-auto max-w-md">
            <p className="text-white text-sm mb-2">Gift Amount</p>
            <p className="text-5xl font-bold text-christmas-gold">
              ${parseFloat(data.amount || '0').toFixed(2)}
            </p>
          </div>

          <div className="my-8 bg-white/50 rounded-xl p-6 mx-auto max-w-lg">
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
              {data.message}
            </p>
          </div>

          <div className="mt-12">
            <p className="text-xl text-gray-600 mb-2">From:</p>
            <p className="text-3xl font-bold text-christmas-red">
              {data.sender}
            </p>
          </div>

          <div className="mt-8 text-4xl">
            🎁 🎅 ⛄ 🦌 🎄
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

