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
            placeholder="Note title"
            aria-label="Note title"
          />
          <p className="help-text">Use Markdown syntax for headers and lists.</p>
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="editor-panel">
        <label className="panel-label">EDITOR</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="# New Note..."
          aria-label="Note content"
        />
      </div>
    </div>
  )
}
