'use client'

import { useState, useEffect } from 'react'
import Board from './Board'
import GameControls from './GameControls'
import MoveHistory from './MoveHistory'
import { calculateWinner } from '@/utils/gameLogic'
import { getAIMove, AIDifficulty } from '@/utils/aiPlayer'
import { formatPlayTime } from '@/utils/gameLogic'
import { useGameData } from '@/hooks/useGameData'
import { useProfile } from '@/hooks/useProfile'

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
  
  const { stats, saveGame } = useGameData()
  const { profile } = useProfile()
  
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
      const durationSeconds = Math.floor((Date.now() - (gameStartTime || Date.now())) / 1000)
      const finalWinner = winner || 'draw'
      saveGame(finalWinner, nextHistory.length - 1, nextHistory, durationSeconds)
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

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
    setGameEnded(false)
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start justify-center min-h-screen p-4">
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
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md min-w-[300px] transition-colors">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">ゲーム情報</h3>
          <div className="text-sm space-y-2">
            <p className="text-gray-700 dark:text-gray-300">モード: {isAIMode ? `AI対戦 (${aiDifficulty})` : '人対人'}</p>
            <p className="text-gray-700 dark:text-gray-300">プレイ時間: {formatPlayTime(currentPlayTime)}</p>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-700 pt-4">
          <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">統計情報</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{stats.total_games}</div>
              <div className="text-gray-600 dark:text-gray-400">総ゲーム数</div>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="font-bold text-lg text-green-600 dark:text-green-400">{stats.wins}</div>
              <div className="text-gray-600 dark:text-gray-400">勝利</div>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="font-bold text-lg text-red-600 dark:text-red-400">{stats.losses}</div>
              <div className="text-gray-600 dark:text-gray-400">敗北</div>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="font-bold text-lg text-yellow-600 dark:text-yellow-400">{stats.draws}</div>
              <div className="text-gray-600 dark:text-gray-400">引き分け</div>
            </div>
          </div>
          {stats.total_games > 0 && (
            <div className="mt-3 text-center">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {Math.round((stats.wins / stats.total_games) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">勝率</div>
            </div>
          )}
        </div>
        </div>
        
        {gameStarted && (
          <MoveHistory
            history={history}
            currentMove={currentMove}
            onJumpTo={jumpTo}
          />
        )}
      </div>
    </div>
  )
}