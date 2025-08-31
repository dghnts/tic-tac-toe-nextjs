'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem('installPromptDismissed', 'true')
  }

  // Check if already dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed')
    if (dismissed) {
      setShowInstallPrompt(false)
    }
  }, [])

  if (!showInstallPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 xl:left-auto xl:right-4 xl:w-80 bg-theme-secondary border border-theme rounded-lg shadow-lg p-4 z-50 animate-slideIn">
      <div className="flex items-start gap-3">
        <div className="text-2xl">📱</div>
        <div className="flex-1">
          <h3 className="font-semibold text-theme-primary text-sm mb-1">
            アプリをインストール
          </h3>
          <p className="text-theme-secondary text-xs mb-3">
            ホーム画面に追加してより快適にプレイ
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
            >
              インストール
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-theme-secondary hover:text-theme-primary text-xs transition-colors"
            >
              後で
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-theme-secondary hover:text-theme-primary text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}