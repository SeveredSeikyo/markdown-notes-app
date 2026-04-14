import React from 'react'
import ReactMarkdown from 'react-markdown'

interface PreviewProps {
  content: string
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="preview-panel">
      <div className="preview-content">
        {content.trim() ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <p className="empty-state">Live preview appears here.</p>
        )}
      </div>
    </div>
  )
}
