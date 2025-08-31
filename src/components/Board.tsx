import Square from './Square'
import { calculateWinner, BOARD_SIZE } from '@/utils/gameLogic'

interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  currentMove: number
  onPlay: (nextSquares: (string | null)[], position: number) => void
  isAIMode: boolean
}

export default function Board({ xIsNext, squares, currentMove, onPlay, isAIMode }: BoardProps) {
  const [winner, a, b, c] = calculateWinner(squares)
  
  function handleClick(i: number) {
    if (squares[i] || winner) {
      return
    }
    
    // AIモードでOの手番の場合はクリックを無視
    if (isAIMode && !xIsNext) {
      return
    }
    
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares, i)
  }

  let status: string
  if (winner) {
    status = "Winner: " + winner
  } else if (currentMove === 9) {
    status = "Draw!"
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  // 勝利ラインのインデックス配列
  const winLine = [a, b, c]

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-lg font-bold text-center p-3 bg-gray-100 rounded-lg border">
        {status}
      </div>
      {Array.from({length: BOARD_SIZE}, (_, row) => (
        <div className="flex" key={row}>
          {Array.from({length: BOARD_SIZE}, (_, col) => {
            const idx = row * BOARD_SIZE + col
            const highlight = winLine.includes(idx) && winner
            return (
              <Square
                key={idx}
                value={squares[idx]}
                onSquareClick={() => handleClick(idx)}
                highlight={highlight}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}