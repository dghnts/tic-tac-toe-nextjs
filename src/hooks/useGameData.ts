'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface GameStats {
  total_games: number
  wins: number
  losses: number
  draws: number
}

interface GameMove {
  squares: (string | null)[]
  position: number | null
}

export function useGameData() {
  const { user } = useAuth()
  const [stats, setStats] = useState<GameStats>({
    total_games: 0,
    wins: 0,
    losses: 0,
    draws: 0
  })

  useEffect(() => {
    if (user) {
      loadStats()
    }
  }, [user])

  const loadStats = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Error loading stats:', error.message || error)
        }
        return
      }

      if (data) {
        setStats(data)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const saveGame = async (
    winner: string,
    movesCount: number,
    gameHistory: GameMove[],
    durationSeconds: number
  ) => {
    if (!user) return

    try {
      // Save game record
      const { error: gameError } = await supabase
        .from('games')
        .insert({
          user_id: user.id,
          winner,
          moves_count: movesCount,
          game_data: gameHistory,
          duration_seconds: durationSeconds
        })

      if (gameError) {
        console.error('Error saving game:', gameError)
        return
      }

      // Update stats
      const newStats = { ...stats }
      newStats.total_games += 1

      if (winner === 'X') {
        newStats.wins += 1
      } else if (winner === 'O') {
        newStats.losses += 1
      } else {
        newStats.draws += 1
      }

      const { error: statsError } = await supabase
        .from('game_stats')
        .upsert({
          user_id: user.id,
          ...newStats
        })

      if (statsError) {
        console.error('Error updating stats:', statsError)
        return
      }

      setStats(newStats)
    } catch (error) {
      console.error('Error saving game:', error)
    }
  }

  return {
    stats,
    saveGame,
    loadStats
  }
}