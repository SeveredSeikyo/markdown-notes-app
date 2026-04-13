import { useEffect, useMemo, useState } from 'react'
import api from './services/api'
import { NotesList } from './components/NotesList'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import './App.css'

type Note = {
  id: number
  title: string
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedId) ?? null,
    [notes, selectedId]
  )

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [selectedNote])

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function fetchNotes() {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get<Note[]>('/notes')
      setNotes(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Failed to fetch notes:', err)
      setError('Could not load notes. Please check if the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  async function saveNote() {
    if (!title.trim() && !content.trim()) return

    setSaving(true)
    setError(null)
    try {
      if (selectedId) {
        // Many backends prefer PUT or PATCH. Let's ensure the structure is correct.
        await api.put(`/notes/${selectedId}`, {
          title: title.trim(),
          content: content.trim()
        })
      } else {
        const response = await api.post('/notes', {
          title: title.trim(),
          content: content.trim()
        })
        // If the backend returns the new note, we can select it
        if (response.data && response.data.id) {
          setSelectedId(response.data.id)
        }
      }
      await fetchNotes()
      // Optionally show a success message or just keep the note selected
    } catch (err) {
      console.error('Failed to save note:', err)
      setError('Failed to save note. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteNote(id: number) {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${id}`)
      if (selectedId === id) {
        setSelectedId(null)
      }
      await fetchNotes()
    } catch (err) {
      console.error('Failed to delete note:', err)
      setError('Failed to delete note.')
    }
  }

  function startNewNote() {
    setSelectedId(null)
    setTitle('')
    setContent('')
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <header className="app-header">
        <div className="brand">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '☰'}
          </button>
          <div className="brand-text">
            <p className="eyebrow">Minimal</p>
            <h1>Notes</h1>
          </div>
        </div>
        <button className="new-note-btn" onClick={startNewNote}>
          + New Note
        </button>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>&times;</button>
        </div>
      )}

      <div className="workspace">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          setSelectedId={(id) => {
            setSelectedId(id)
            if (window.innerWidth < 768) setSidebarOpen(false)
          }}
          onDelete={deleteNote}
          loading={loading}
        />

        <main className="main-content">
          <div className="editor-preview-container">
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              onSave={saveNote}
              saving={saving}
            />
            <Preview content={content} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
