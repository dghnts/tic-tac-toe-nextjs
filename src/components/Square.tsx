interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight?: boolean
}

export default function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={`
        w-16 h-16 border-2 border-gray-800 text-2xl font-bold
        hover:bg-gray-100 transition-colors duration-200
        ${highlight ? 'bg-yellow-300 shadow-lg' : 'bg-white'}
      `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}