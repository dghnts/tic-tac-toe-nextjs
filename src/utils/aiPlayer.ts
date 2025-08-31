import { calculateWinner } from './gameLogic'

export type AIDifficulty = 'easy' | 'normal' | 'hard'

export function getAIMove(squares: (string | null)[], difficulty: AIDifficulty): number | null {
  const availableMoves = squares
    .map((square, index) => square === null ? index : null)
    .filter((val): val is number => val !== null)

  if (availableMoves.length === 0) return null

  switch (difficulty) {
    case 'easy':
      return getRandomMove(availableMoves)
    case 'normal':
      return Math.random() < 0.7 ? getBestMove(squares, availableMoves) : getRandomMove(availableMoves)
    case 'hard':
      return getBestMove(squares, availableMoves)
    default:
      return getRandomMove(availableMoves)
  }
}

function getRandomMove(availableMoves: number[]): number {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

function getBestMove(squares: (string | null)[], availableMoves: number[]): number {
  // Try to win
  for (const move of availableMoves) {
    const testSquares = [...squares]
    testSquares[move] = 'O'
    const [winner] = calculateWinner(testSquares)
    if (winner === 'O') return move
  }

  // Block player from winning
  for (const move of availableMoves) {
    const testSquares = [...squares]
    testSquares[move] = 'X'
    const [winner] = calculateWinner(testSquares)
    if (winner === 'X') return move
  }

  // Take center if available
  if (availableMoves.includes(4)) return 4

  // Take corners
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter(corner => availableMoves.includes(corner))
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)]
  }

  // Take any available move
  return getRandomMove(availableMoves)
}