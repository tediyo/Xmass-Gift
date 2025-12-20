'use client'

import Image from 'next/image'

const santaImages = [
  '/oneW.jpg',
  '/twoW.jpg',
  '/threeW.jpg',
  '/fourW.jpg',
  '/fiveW.jpg',
]

export default function Decorations() {
  return (
    <>
      {/* Top left decoration - Santa */}
      <div className="fixed top-10 left-10 z-5 w-24 h-24 md:w-32 md:h-32 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-2xl">
        <Image 
          src={santaImages[0]} 
          alt="Santa" 
          width={200}
          height={200}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      {/* Top right decoration */}
      <div className="fixed top-10 right-10 z-5 w-20 h-20 md:w-28 md:h-28 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-2xl" style={{ animationDelay: '1s' }}>
        <Image 
          src={santaImages[1]} 
          alt="Santa" 
          width={200}
          height={200}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      {/* Bottom left decoration - More Santa */}
      <div className="fixed bottom-20 left-10 z-5 w-24 h-24 md:w-32 md:h-32 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-2xl" style={{ animationDelay: '2s' }}>
        <Image 
          src={santaImages[2]} 
          alt="Santa" 
          width={200}
          height={200}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      {/* Bottom right decoration */}
      <div className="fixed bottom-20 right-10 z-5 w-20 h-20 md:w-28 md:h-28 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-2xl" style={{ animationDelay: '1.5s' }}>
        <Image 
          src={santaImages[3]} 
          alt="Santa" 
          width={200}
          height={200}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      {/* Middle left - Santa */}
      <div className="fixed top-1/3 left-5 z-5 w-16 h-16 md:w-24 md:h-24 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-xl" style={{ animationDelay: '0.5s' }}>
        <Image 
          src={santaImages[4]} 
          alt="Santa" 
          width={150}
          height={150}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      {/* Middle right */}
      <div className="fixed top-1/3 right-5 z-5 w-16 h-16 md:w-24 md:h-24 animate-float rounded-full overflow-hidden border-4 border-christmas-gold shadow-xl" style={{ animationDelay: '1.2s' }}>
        <Image 
          src={santaImages[0]} 
          alt="Santa" 
          width={150}
          height={150}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>

      {/* Additional Santa decorations */}
      <div className="fixed top-1/2 left-1/4 z-5 w-14 h-14 md:w-20 md:h-20 animate-twinkle rounded-full overflow-hidden border-3 border-christmas-gold shadow-lg">
        <Image 
          src={santaImages[1]} 
          alt="Santa" 
          width={150}
          height={150}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      <div className="fixed top-1/2 right-1/4 z-5 w-14 h-14 md:w-20 md:h-20 animate-twinkle rounded-full overflow-hidden border-3 border-christmas-gold shadow-lg" style={{ animationDelay: '1s' }}>
        <Image 
          src={santaImages[2]} 
          alt="Santa" 
          width={150}
          height={150}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    </>
  )
}

