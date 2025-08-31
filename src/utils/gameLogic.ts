export const BOARD_SIZE = 3
export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function calculateWinner(squares: (string | null)[]): [string | null, number, number, number] {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i]
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return [squares[a], a, b, c]
    }
  }
  return [null, -1, -1, -1]
}

export function formatPosition(position: number): string {
  return ` (${Math.floor(position / 3) + 1}, ${position % 3 + 1})`
}

export function formatPlayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  
  if (minutes > 0) {
    return `${minutes}分${secs}秒`
  } else {
    return `${secs}秒`
  }
}