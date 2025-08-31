'use client'

import { formatPosition } from '@/utils/gameLogic'

interface GameMove {
  squares: (string | null)[]
  position: number | null
}

interface MoveHistoryProps {
  history: GameMove[]
  currentMove: number
  onJumpTo: (move: number) => void
}

export default function MoveHistory({ history, currentMove, onJumpTo }: MoveHistoryProps) {
  const moves = history.map((step, move) => {
    let description: string
    if (move > 0) {
      const player = move % 2 === 1 ? 'X' : 'O'
      const position = step.position !== null ? formatPosition(step.position) : ''
      description = `${player}${position}`
    } else {
      description = 'ゲーム開始'
    }

    return (
      <li key={move} className="mb-1">
        <button
          onClick={() => onJumpTo(move)}
          className={`
            w-full text-left px-3 py-2 rounded text-sm transition-colors
            ${currentMove === move 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {move === 0 ? description : `${move}. ${description}`}
        </button>
      </li>
    )
  })

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 transition-colors">
      <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">手番履歴</h4>
      <div className="max-h-48 overflow-y-auto">
        <ol className="list-none">{moves}</ol>
      </div>
    </div>
  )
}