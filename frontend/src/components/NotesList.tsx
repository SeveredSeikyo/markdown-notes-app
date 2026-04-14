import type { Note } from '../hooks/useNotes'

interface Props {
  notes: Note[]
  selectedId: number | null
  setSelectedId: (id: number) => void
  onDelete: (id: number) => void
  loading: boolean
}

export function NotesList({ notes, selectedId, setSelectedId, onDelete, loading }: Props) {
  if (loading) return <div className="notes-panel"><div className="empty-state">Loading notes...</div></div>

  return (
    <aside className="notes-panel">
      <div className="panel-heading">
        <h2>Notes</h2>
        <span className="count-badge">{notes.length}</span>
      </div>
      <div className="note-list">
        {notes.length === 0 ? (
          <div className="empty-state">No notes yet</div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${note.id === selectedId ? 'active' : ''}`}
              onClick={() => setSelectedId(note.id)}
            >
              <div className="note-item-content">
                <strong>{note.title || 'Untitled'}</strong>
                <p>{note.content || 'No content'}</p>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(note.id)
                }}
                aria-label="Delete note"
              >
                <TrashIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
)
