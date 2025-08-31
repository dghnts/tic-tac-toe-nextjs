'use client'

import { useEffect } from 'react'
import { useGameHistory } from '@/hooks/useGameHistory'
import { formatPlayTime } from '@/utils/gameLogic'

interface GameHistoryDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function GameHistoryDialog({ isOpen, onClose }: GameHistoryDialogProps) {
  const { gameHistory, loading, loadGameHistory } = useGameHistory()

  useEffect(() => {
    if (isOpen) {
      loadGameHistory()
    }
  }, [isOpen])

  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getWinnerText = (winner: string) => {
    if (winner === 'X') return '勝利'
    if (winner === 'O') return '敗北'
    return '引き分け'
  }

  const getWinnerStyle = (winner: string) => {
    if (winner === 'X') return 'bg-green-100 text-green-800'
    if (winner === 'O') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">ゲーム履歴</h3>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-500">読み込み中...</div>
          ) : gameHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">ゲーム履歴がありません</div>
          ) : (
            <div className="space-y-3">
              {gameHistory.map((game) => (
                <div key={game.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWinnerStyle(game.winner)}`}>
                      {getWinnerText(game.winner)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(game.created_at)}
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span>手数: {game.moves_count}</span>
                    <span>時間: {formatPlayTime(game.duration_seconds || 0)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t">
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