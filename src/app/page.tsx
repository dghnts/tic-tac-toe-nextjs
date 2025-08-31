'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Auth from '@/components/Auth'
import Game from '@/components/Game'
import ProfileDialog from '@/components/ProfileDialog'
import StatsDialog from '@/components/StatsDialog'
import GameHistoryDialog from '@/components/GameHistoryDialog'
import { useProfile } from '@/hooks/useProfile'

export default function Home() {
  const { user, loading, signOut } = useAuth()
  const { profile } = useProfile()
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showStatsDialog, setShowStatsDialog] = useState(false)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Tic Tac Toe</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                {profile.display_name || user.email}
              </span>
              
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="設定"
                >
                  ⚙️
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-10">
                    <button
                      onClick={() => {
                        setShowProfileDialog(true)
                        setShowDropdown(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      👤 プロフィール設定
                    </button>
                    <button
                      onClick={() => {
                        setShowStatsDialog(true)
                        setShowDropdown(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      📊 統計情報
                    </button>
                    <button
                      onClick={() => {
                        setShowHistoryDialog(true)
                        setShowDropdown(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      📋 ゲーム履歴
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      🚺 ログアウト
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main onClick={() => setShowDropdown(false)}>
        <Game />
      </main>
      
      <ProfileDialog 
        isOpen={showProfileDialog} 
        onClose={() => setShowProfileDialog(false)} 
      />
      <StatsDialog 
        isOpen={showStatsDialog} 
        onClose={() => setShowStatsDialog(false)} 
      />
      <GameHistoryDialog 
        isOpen={showHistoryDialog} 
        onClose={() => setShowHistoryDialog(false)} 
      />
    </div>
  )
}