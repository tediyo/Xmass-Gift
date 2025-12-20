'use client'

import Image from 'next/image'
import AccentIcons from './AccentIcons'

export default function HeroIllustration() {
  return (
    <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
      {/* Decorative stars above */}
      <div className="flex gap-8 mb-4">
        <AccentIcons type="star" size="sm" />
        <AccentIcons type="star" size="sm" />
      </div>
      
      {/* Main hero image */}
      <div className="relative animate-gentle-float">
        <Image 
          src="/oneW.jpg" 
          alt="Christmas illustration" 
          width={200}
          height={200}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover opacity-90 shadow-soft border-4 border-accent-gold/20"
          unoptimized
          priority
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-accent-gold/10 blur-2xl -z-10"></div>
      </div>
      
      {/* Decorative elements below */}
      <div className="flex gap-12 mt-4">
        <AccentIcons type="bell" size="sm" />
        <AccentIcons type="ornament" size="sm" />
      </div>
    </div>
  )
}

