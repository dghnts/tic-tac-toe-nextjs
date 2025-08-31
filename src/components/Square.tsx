import { useState, useEffect } from 'react'

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight: boolean
}

export default function Square({ value, onSquareClick, highlight }: SquareProps) {
  const [isClicked, setIsClicked] = useState(false)

  // Reset animation when value changes
  useEffect(() => {
    if (value && !isClicked) {
      setIsClicked(true)
      // Reset after animation completes
      const timer = setTimeout(() => setIsClicked(false), 600)
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <button
      className={`
        w-16 h-16 border-2 border-theme text-2xl font-bold text-theme-primary
        hover:bg-theme-primary active:scale-95
        transition-all duration-200
        ${highlight ? 'bg-winning animate-winning' : 'bg-theme-secondary'}
        ${isClicked && !highlight ? 'animate-bounce' : ''}
      `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}