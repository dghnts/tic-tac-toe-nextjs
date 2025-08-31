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
        hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 active:scale-95
        transition-all duration-200 transform
        ${highlight ? 'bg-yellow-300 dark:bg-yellow-600 shadow-lg animate-pulse' : 'bg-white dark:bg-gray-800'}
        ${value ? 'animate-bounce' : ''}
      `}
      onClick={onSquareClick}
    >
      <span className={value ? 'animate-fadeIn' : ''}>{value}</span>
    </button>
  )
}