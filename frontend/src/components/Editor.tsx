import React from 'react'

interface EditorProps {
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  onSave: () => void
  onDelete: () => void
  isExistingNote: boolean
  saving: boolean
}

export const Editor: React.FC<EditorProps> = ({
  title,
  setTitle,
  content,
  setContent,
  onSave,
  onDelete,
  isExistingNote,
  saving,
}) => {
  return (
    <div className="editor-shell">
      <div className="split-header">
        <div className="title-container">
          <input
            className="note-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            aria-label="Note title"
          />
        </div>
        <div className="button-group">
          {isExistingNote && (
            <button
              className="delete-button-secondary"
              onClick={onDelete}
              title="Delete Note"
            >
              Delete
            </button>
          )}
          <button
            className="save-button"
            onClick={onSave}
            disabled={saving || (!title.trim() && !content.trim())}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="editor-panel">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          aria-label="Note content"
        />
      </div>
    </div>
  )
}
