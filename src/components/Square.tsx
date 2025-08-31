interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight?: boolean
}

export default function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={`
        w-16 h-16 border-2 border-gray-800 dark:border-gray-600 text-2xl font-bold text-gray-900 dark:text-gray-100
        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
        ${highlight ? 'bg-yellow-300 dark:bg-yellow-600 shadow-lg' : 'bg-white dark:bg-gray-800'}
      `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}