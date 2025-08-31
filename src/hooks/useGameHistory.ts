'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface GameHistoryItem {
  id: string
  winner: string
  moves_count: number
  duration_seconds: number
  created_at: string
}

export function useGameHistory() {
  const { user } = useAuth()
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([])
  const [loading, setLoading] = useState(false)

  const loadGameHistory = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('games')
        .select('id, winner, moves_count, duration_seconds, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error loading game history:', error)
        return
      }

      setGameHistory(data || [])
    } catch (error) {
      console.error('Error loading game history:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    gameHistory,
    loading,
    loadGameHistory
  }
}