'use client'

import { useState, FormEvent } from 'react'

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
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-red-900/90 via-green-900/90 to-red-900/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-christmas-gold relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-3xl">🎄</div>
        <div className="absolute top-4 right-4 text-3xl">🎄</div>
        <div className="absolute bottom-4 left-4 text-3xl">🎄</div>
        <div className="absolute bottom-4 right-4 text-3xl">🎄</div>
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-8 text-christmas-gold glow">
            Create Your Gift Card
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => handleChange('recipient', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold focus:border-transparent"
                placeholder="Who is this gift for?"
                required
              />
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Your Name (Sender)
              </label>
              <input
                type="text"
                value={formData.sender}
                onChange={(e) => handleChange('sender', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Gift Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-christmas-gold text-xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Personal Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-christmas-gold text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmas-gold focus:border-transparent resize-none"
                placeholder="Write a heartfelt message..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-christmas-red to-christmas-green text-white text-xl font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-christmas-gold hover:border-white"
            >
              🎁 Create Gift Card 🎁
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

