'use client'

import { useState, useEffect } from 'react'
import Board from './Board'
import GameControls from './GameControls'
import { calculateWinner } from '@/utils/gameLogic'
import { getAIMove, AIDifficulty } from '@/utils/aiPlayer'
import { formatPlayTime } from '@/utils/gameLogic'

interface GameMove {
  squares: (string | null)[]
  position: number | null
}

export default function Game() {
  const [history, setHistory] = useState<GameMove[]>([{ squares: Array(9).fill(null), position: null }])
  const [currentMove, setCurrentMove] = useState(0)
  const [gameStartTime, setGameStartTime] = useState<number | null>(null)
  const [currentPlayTime, setCurrentPlayTime] = useState(0)
  const [isAIMode, setIsAIMode] = useState(false)
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>('normal')
  const [gameEnded, setGameEnded] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove].squares

  // 現在のゲーム時間を1秒ごとに更新
  useEffect(() => {
    if (!gameStarted || gameEnded || !gameStartTime) return
    
    const timer = setInterval(() => {
      setCurrentPlayTime(Math.floor((Date.now() - gameStartTime) / 1000))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameStartTime, gameEnded, gameStarted])

  // AIの手番処理
  useEffect(() => {
    if (gameStarted && isAIMode && !xIsNext && currentMove === history.length - 1) {
      const [winner] = calculateWinner(currentSquares)
      if (!winner && currentSquares.includes(null)) {
        const timer = setTimeout(() => {
          const aiMove = getAIMove([...currentSquares], aiDifficulty)
          if (aiMove !== null) {
            const nextSquares = [...currentSquares]
            nextSquares[aiMove] = 'O'
            handlePlay(nextSquares, aiMove)
          }
        }, 500)
        
        return () => clearTimeout(timer)
      }
    }
  }, [gameStarted, isAIMode, xIsNext, currentSquares, currentMove, history.length, aiDifficulty])

  function handlePlay(nextSquares: (string | null)[], position: number) {
    if (!gameStarted) return
    
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, position },
    ]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    
    // ゲーム終了チェック
    const [winner] = calculateWinner(nextSquares)
    const isGameEnd = winner || nextHistory.length === 10
    
    if (isGameEnd) {
      setGameEnded(true)
    }
  }

  function startGame() {
    setGameStarted(true)
    setGameStartTime(Date.now())
    setCurrentPlayTime(0)
    setGameEnded(false)
  }
  
  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), position: null }])
    setCurrentMove(0)
    setGameStartTime(null)
    setCurrentPlayTime(0)
    setGameEnded(false)
    setGameStarted(false)
  }

  function toggleAI() {
    setIsAIMode(!isAIMode)
    resetGame()
  }

  function handleDifficultyChange(difficulty: AIDifficulty) {
    setAiDifficulty(difficulty)
    resetGame()
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center min-h-screen p-6">
      <div className="flex flex-col items-center">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
          isAIMode={isAIMode}
        />
        <GameControls
          gameStarted={gameStarted}
          isAIMode={isAIMode}
          aiDifficulty={aiDifficulty}
          onStartGame={startGame}
          onResetGame={resetGame}
          onToggleAI={toggleAI}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg min-w-[300px]">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">ゲーム情報</h3>
          <div className="text-sm space-y-1">
            <p>モード: {isAIMode ? `AI対戦 (${aiDifficulty})` : '人対人'}</p>
            <p>プレイ時間: {formatPlayTime(currentPlayTime)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}