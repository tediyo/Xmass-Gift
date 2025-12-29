'use client'

interface AccentIconsProps {
  type?: 'star' | 'fireworks' | 'champagne' | 'sparkle' | 'party' | 'clock'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const iconStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export default function AccentIcons({ type = 'star', size = 'md', className = '' }: AccentIconsProps) {
  const sizeClass = iconStyles[size]
  
  const icons = {
    star: (
      <svg className={`${sizeClass} text-accent-gold opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    fireworks: (
      <svg className={`${sizeClass} text-primary-red opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    champagne: (
      <svg className={`${sizeClass} text-accent-gold opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4m0 0v4m0-4h4m-4 0H8" />
      </svg>
    ),
    sparkle: (
      <svg className={`${sizeClass} text-accent-gold opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
      </svg>
    ),
    party: (
      <svg className={`${sizeClass} text-primary-red opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    clock: (
      <svg className={`${sizeClass} text-secondary-green opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  return icons[type]
}
