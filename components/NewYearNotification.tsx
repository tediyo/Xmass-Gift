'use client'

import { useEffect, useState } from 'react'

/**
 * New Year Notification Component
 * 
 * This component automatically triggers a browser notification
 * when the countdown reaches zero (January 1, 2026 at midnight).
 * It also checks for notification permissions and provides a manual trigger.
 */
export default function NewYearNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check notification permission status
    if ('Notification' in window) {
      setPermission(Notification.permission)

      // Request permission if not already granted/denied
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((perm) => {
          setPermission(perm)
        })
      }
    }

    // Check if we should trigger notification
    const checkAndNotify = () => {
      const now = new Date()
      const newYear2026 = new Date(2026, 0, 1, 0, 0, 0, 0) // January 1, 2026, 00:00:00
      const newYear2026End = new Date(2026, 0, 1, 0, 0, 59, 999) // First minute of 2026

      // Check if we're in the first minute of 2026 and haven't triggered yet
      if (
        now >= newYear2026 &&
        now <= newYear2026End &&
        !hasTriggered &&
        Notification.permission === 'granted'
      ) {
        triggerNotification()
        setHasTriggered(true)
      }
    }

    // Check immediately
    checkAndNotify()

    // Check every second during the countdown period
    const interval = setInterval(checkAndNotify, 1000)

    // Check if we're close to new year (within 1 hour) and set up a more frequent check
    const now = new Date()
    const newYear2026 = new Date(2026, 0, 1, 0, 0, 0, 0)
    const oneHourBefore = new Date(newYear2026.getTime() - 60 * 60 * 1000)

    if (now >= oneHourBefore && now < newYear2026) {
      // We're within 1 hour of new year, check more frequently
      clearInterval(interval)
      const frequentInterval = setInterval(checkAndNotify, 100)
      return () => clearInterval(frequentInterval)
    }

    return () => clearInterval(interval)
  }, [hasTriggered])

  const triggerNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('🎉 Happy New Year 2026! 🎊', {
        body: 'Welcome to a brand new year! May 2026 bring you joy, success, and amazing opportunities!',
        icon: '/oneW.jpg', // You can add a custom icon
        badge: '/oneW.jpg',
        tag: 'new-year-2026',
        requireInteraction: false,
        silent: false,
      })

      // Auto-close after 10 seconds
      setTimeout(() => {
        notification.close()
      }, 10000)

      // Handle click on notification
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    }
  }

  const requestPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission()
      setPermission(perm)
      if (perm === 'granted') {
        // Show a test notification
        triggerNotification()
      }
    }
  }

  const testNotification = () => {
    if (permission === 'granted') {
      triggerNotification()
    } else {
      requestPermission()
    }
  }

  // This component doesn't render anything visible
  // It works silently in the background
  return null
}

/**
 * Standalone function to trigger notification programmatically
 * Can be called from anywhere in the app
 */
export function triggerNewYearNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('🎉 Happy New Year 2026! 🎊', {
      body: 'Welcome to a brand new year! May 2026 bring you joy, success, and amazing opportunities!',
      icon: '/oneW.jpg',
      tag: 'new-year-2026',
    })
  }
}

