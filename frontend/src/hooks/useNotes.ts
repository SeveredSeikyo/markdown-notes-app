import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export type Note = {
  id: number
  title: string
  content: string
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Note[]>('/notes')
      setNotes(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load notes', err)
      setError('Could not load notes. Please check the connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const saveNote = async (id: number | null, title: string, content: string) => {
    if (!title.trim() && !content.trim()) return null

    try {
      if (id) {
        await api.put(`/notes/${id}`, {
          title: title.trim(),
          content: content.trim()
        })
        await fetchNotes()
        return id
      } else {
        const { data } = await api.post('/notes', {
          title: title.trim(),
          content: content.trim()
        })
        await fetchNotes()
        return data.id as number
      }
    } catch (err) {
      console.error('Failed to save note', err)
      setError('Failed to save your changes.')
      return null
    }
  }

  const deleteNote = async (id: number) => {
    if (!confirm('Permanently delete this note?')) return false

    try {
      await api.delete(`/notes/${id}`)
      await fetchNotes()
      return true
    } catch (err) {
      console.error('Failed to delete note', err)
      setError('Failed to delete the note.')
      return false
    }
  }

  return {
    notes,
    loading,
    error,
    setError,
    saveNote,
    deleteNote,
    refresh: fetchNotes
  }
}
