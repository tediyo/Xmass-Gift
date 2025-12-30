'use client'

import { useState, FormEvent } from 'react'
import AccentIcons from './AccentIcons'

interface GiftCardFormProps {
  onSubmit: (data: {
    recipient: string
    sender: string
    amount: string
    message: string
  }) => void
  initialData: {
    recipient: string
    sender: string
    amount: string
    message: string
  }
}

export default function GiftCardForm({ onSubmit, initialData }: GiftCardFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12 border-4 border-t-primary-red border-r-secondary-green border-b-primary-red border-l-secondary-green relative">
        {/* Subtle accent icon */}
        <div className="absolute top-6 right-6">
          <AccentIcons type="sparkle" size="sm" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <AccentIcons type="star" size="sm" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-secondary-green">
              Create Your New Year Gift Card
            </h2>
            <AccentIcons type="star" size="sm" />
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                Recipient Name
              </label>
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => handleChange('recipient', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-secondary-green text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-secondary-green focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all"
                placeholder="Who is this gift for?"
                required
              />
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                Your Name (Sender)
              </label>
              <input
                type="text"
                value={formData.sender}
                onChange={(e) => handleChange('sender', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-secondary-green text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-secondary-green focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                Gift Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-green text-lg font-semibold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-secondary-green text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-secondary-green focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-secondary-green text-sm font-inter font-semibold mb-2 uppercase tracking-wide">
                Personal Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-snow-white border-2 border-l-primary-red border-r-secondary-green text-secondary-green placeholder-secondary-green/40 focus:outline-none focus:border-l-secondary-green focus:border-r-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all resize-none"
                placeholder="Write a heartfelt message..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary-red text-white text-lg font-inter font-semibold rounded-lg shadow-soft hover-lift transition-all duration-300"
            >
              Create Gift Card
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
