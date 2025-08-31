'use client'

import { useGameData } from '@/hooks/useGameData'

interface StatsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function StatsDialog({ isOpen, onClose }: StatsDialogProps) {
  const { stats } = useGameData()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-theme-secondary rounded-lg p-6 w-full max-w-md mx-4 animate-slideIn transition-colors border border-theme">
        <h3 className="text-lg font-semibold mb-4 text-theme-primary">統計情報</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="text-2xl font-bold text-blue-600">{stats.total_games}</div>
            <div className="text-sm text-theme-secondary">総ゲーム数</div>
          </div>
          <div className="text-center p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="text-2xl font-bold text-green-600">{stats.wins}</div>
            <div className="text-sm text-theme-secondary">勝利</div>
          </div>
          <div className="text-center p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="text-2xl font-bold text-red-600">{stats.losses}</div>
            <div className="text-sm text-theme-secondary">敗北</div>
          </div>
          <div className="text-center p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="text-2xl font-bold text-yellow-600">{stats.draws}</div>
            <div className="text-sm text-theme-secondary">引き分け</div>
          </div>
        </div>

        {stats.total_games > 0 && (
          <div className="text-center p-4 bg-theme-primary rounded-lg border border-theme mb-6">
            <div className="text-3xl font-bold text-purple-600">
              {Math.round((stats.wins / stats.total_games) * 100)}%
            </div>
            <div className="text-sm text-theme-secondary">勝率</div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}