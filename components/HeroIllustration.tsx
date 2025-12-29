'use client'

import Image from 'next/image'
import AccentIcons from './AccentIcons'

export default function HeroIllustration() {
  return (
    <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
      {/* Decorative fireworks above */}
      <div className="flex gap-8 mb-4">
        <AccentIcons type="fireworks" size="sm" />
        <AccentIcons type="sparkle" size="sm" />
        <AccentIcons type="fireworks" size="sm" />
      </div>
      
      {/* Main hero image */}
      <div className="relative animate-gentle-float">
        <Image 
          src="/oneW.jpg" 
          alt="New Year illustration" 
          width={200}
          height={200}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover opacity-90 shadow-soft border-4 border-accent-gold/30"
          unoptimized
          priority
        />
        {/* Subtle glow effect with gold sparkle */}
        <div className="absolute inset-0 rounded-full bg-accent-gold/15 blur-2xl -z-10"></div>
        {/* Sparkle effect */}
        <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
      </div>
      
      {/* Decorative elements below */}
      <div className="flex gap-12 mt-4">
        <AccentIcons type="champagne" size="sm" />
        <AccentIcons type="party" size="sm" />
        <AccentIcons type="champagne" size="sm" />
      </div>
    </div>
  )
}

