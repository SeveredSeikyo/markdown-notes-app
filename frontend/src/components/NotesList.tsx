import React from 'react'

type Note = {
  id: number
  title: string
  content: string
}

interface NotesListProps {
  notes: Note[]
  selectedId: number | null
  setSelectedId: (id: number | null) => void
  onDelete: (id: number) => void
  loading: boolean
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  selectedId,
  setSelectedId,
  onDelete,
  loading,
}) => {
  return (
    <aside className="notes-panel">
      <div className="panel-heading">
        <h2>Notes</h2>
        <span className="count-badge">{notes.length} saved</span>
      </div>
      <div className="note-list">
        {loading ? (
          <div className="empty-state">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">No notes yet</div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${note.id === selectedId ? 'active' : ''}`}
              onClick={() => setSelectedId(note.id)}
            >
              <div className="note-item-content">
                <strong>{note.title || 'Untitled note'}</strong>
                <p>{note.content.slice(0, 60) || 'No content...'}</p>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(note.id)
                }}
                aria-label="Delete note"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
