'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'

interface ProfileDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const { profile, saveProfile, loading } = useProfile()
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setDisplayName(profile.display_name || '')
    }
  }, [isOpen, profile.display_name])

  if (!isOpen) return null

  const handleSave = async () => {
    setSaving(true)
    const result = await saveProfile(displayName.trim())
    setSaving(false)
    
    if (result.success) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">プロフィール設定</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ユーザー名:
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="ユーザー名を入力"
            maxLength={50}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
}