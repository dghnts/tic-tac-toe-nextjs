'use client'

import { AIDifficulty } from '@/utils/aiPlayer'

interface GameControlsProps {
  gameStarted: boolean
  isAIMode: boolean
  aiDifficulty: AIDifficulty
  onStartGame: () => void
  onResetGame: () => void
  onToggleAI: () => void
  onDifficultyChange: (difficulty: AIDifficulty) => void
}

export default function GameControls({
  gameStarted,
  isAIMode,
  aiDifficulty,
  onStartGame,
  onResetGame,
  onToggleAI,
  onDifficultyChange
}: GameControlsProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-center">
        {!gameStarted ? (
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            onClick={onStartGame}
          >
            Start Game
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            onClick={onResetGame}
          >
            Reset Game
          </button>
        )}
      </div>
      
      <div className="bg-theme-secondary p-4 rounded-lg shadow-sm border border-theme transition-colors">
        <div className="flex items-center justify-center gap-4 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium text-theme-secondary">手動</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isAIMode}
                onChange={onToggleAI}
                className="sr-only"
              />
              <div className={`w-14 h-7 rounded-full transition-colors ${isAIMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out mt-1 ml-1 ${isAIMode ? 'translate-x-7' : ''}`} />
              </div>
            </div>
            <span className="text-sm font-medium text-theme-secondary">AI</span>
          </label>
        </div>
        
        {isAIMode && (
          <div className="flex items-center justify-center gap-2">
            <label className="text-sm font-medium text-theme-secondary">難易度:</label>
            <select
              value={aiDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value as AIDifficulty)}
              className="px-3 py-1 border border-theme rounded-md text-sm bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">簡単</option>
              <option value="normal">普通</option>
              <option value="hard">難しい</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}