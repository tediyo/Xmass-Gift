'use client'

import { useRef } from 'react'
import AccentIcons from './AccentIcons'

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

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="mb-6 flex gap-4 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white text-secondary-green font-inter font-semibold rounded-lg border-2 border-secondary-green/20 hover:border-secondary-green/40 hover-lift transition-all"
        >
          ← Edit Card
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-primary-red text-white font-inter font-semibold rounded-lg shadow-soft hover-lift transition-all"
        >
          Print Card
        </button>
      </div>

      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-soft-lg p-12 border border-secondary-green/10 relative overflow-hidden print:shadow-none"
        style={{ minHeight: '500px' }}
      >
        {/* Subtle decorative corner elements */}
        <div className="absolute top-4 right-4 opacity-30">
          <AccentIcons type="sparkle" size="sm" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-30">
          <AccentIcons type="fireworks" size="sm" />
        </div>
        {/* Card content */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AccentIcons type="star" size="sm" />
              <div className="w-16 h-1 bg-accent-gold"></div>
              <AccentIcons type="star" size="sm" />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-secondary-green mb-2">
              New Year Gift Card
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <AccentIcons type="star" size="sm" />
              <div className="w-16 h-1 bg-accent-gold"></div>
              <AccentIcons type="star" size="sm" />
            </div>
          </div>
          
          <div className="my-8">
            <p className="text-sm text-secondary-green/60 font-inter uppercase tracking-wide mb-2">To</p>
            <p className="text-3xl md:text-4xl font-playfair font-bold text-secondary-green">
              {data.recipient}
            </p>
          </div>

          <div className="my-10 bg-secondary-green/5 rounded-xl p-8 mx-auto max-w-md border border-secondary-green/10">
            <p className="text-xs text-secondary-green/60 font-inter uppercase tracking-wide mb-2">Gift Amount</p>
            <p className="text-5xl md:text-6xl font-playfair font-bold text-primary-red">
              ${parseFloat(data.amount || '0').toFixed(2)}
            </p>
          </div>

          <div className="my-8 bg-snow-white rounded-xl p-6 mx-auto max-w-lg border border-secondary-green/10">
            <p className="text-secondary-green text-lg leading-relaxed whitespace-pre-wrap font-inter">
              {data.message}
            </p>
          </div>

          <div className="mt-12">
            <p className="text-sm text-secondary-green/60 font-inter uppercase tracking-wide mb-2">From</p>
            <p className="text-2xl md:text-3xl font-playfair font-bold text-secondary-green">
              {data.sender}
            </p>
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
