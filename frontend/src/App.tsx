import { useEffect, useState } from 'react'
import { useNotes } from './hooks/useNotes'
import { NotesList } from './components/NotesList'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import './App.css'

function App() {
  const { notes, loading, error, setError, saveNote, deleteNote } = useNotes()
  
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768)

  // Sync editor with selected note
  useEffect(() => {
    const activeNote = notes.find(n => n.id === selectedId)
    if (activeNote) {
      setTitle(activeNote.title)
      setContent(activeNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [selectedId, notes])

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const newId = await saveNote(selectedId, title, content)
    if (newId) setSelectedId(newId)
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    const success = await deleteNote(id)
    if (success && id === selectedId) {
      setSelectedId(null)
    }
  }

  const handleNewNote = () => {
    setSelectedId(null)
    setTitle('')
    setContent('')
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  const handleSelectNote = (id: number) => {
    setSelectedId(id)
    if (window.innerWidth < 768) setSidebarOpen(false)
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
            {sidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
          <div className="brand-text">
            <h1>Notes</h1>
          </div>
        </div>
        <button className="new-note-btn" onClick={handleNewNote}>
          New Note
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} aria-label="Dismiss error">&times;</button>
        </div>
      )}

      <div className="workspace">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          setSelectedId={handleSelectNote}
          onDelete={handleDelete}
          loading={loading}
        />

        <main className="main-content">
          <div className="editor-preview-container">
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              onSave={handleSave}
              onDelete={() => selectedId && handleDelete(selectedId)}
              isExistingNote={!!selectedId}
              saving={saving}
            />
            <Preview content={content} />
          </div>
        </main>
      </div>
    </div>
  )
}

// Simple icons moved out of component to keep it clean
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
)

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

export default App
