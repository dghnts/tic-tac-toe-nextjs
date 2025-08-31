interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight?: boolean
}

export default function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={`
        w-16 h-16 border-2 border-theme text-2xl font-bold text-theme-primary
        hover:bg-theme-primary hover:scale-105 active:scale-95
        transition-all duration-200 transform
        ${highlight ? 'bg-yellow-300 shadow-lg animate-pulse' : 'bg-theme-secondary'}
        ${value ? 'animate-bounce' : ''}
      `}
      onClick={onSquareClick}
    >
      <span className={value ? 'animate-fadeIn' : ''}>{value}</span>
    </button>
  )
}