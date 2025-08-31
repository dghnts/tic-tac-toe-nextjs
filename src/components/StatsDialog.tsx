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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">統計情報</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.total_games}</div>
            <div className="text-sm text-gray-600">総ゲーム数</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.wins}</div>
            <div className="text-sm text-gray-600">勝利</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.losses}</div>
            <div className="text-sm text-gray-600">敗北</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.draws}</div>
            <div className="text-sm text-gray-600">引き分け</div>
          </div>
        </div>

        {stats.total_games > 0 && (
          <div className="text-center p-4 bg-purple-50 rounded-lg mb-6">
            <div className="text-3xl font-bold text-purple-600">
              {Math.round((stats.wins / stats.total_games) * 100)}%
            </div>
            <div className="text-sm text-gray-600">勝率</div>
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