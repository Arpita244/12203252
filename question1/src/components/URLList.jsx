import React from 'react';

const URLList = ({ urls, handleClick, copyToClipboard, deleteUrl, copiedId }) => {
  return (
    <div className="url-list">
      {urls.map((url) => (
        <div key={url.id} className="url-card">
          <div className="url-meta">
            <p><strong>Original:</strong> <a href={url.original} target="_blank" rel="noopener noreferrer">{url.original}</a></p>
            <p><strong>Short:</strong> <button onClick={() => handleClick(url.id)}>{url.short}</button></p>
            <small>{url.clicks} clicks | {new Date(url.createdAt).toLocaleDateString()}</small>
          </div>
          <div className="url-actions">
            <button onClick={() => copyToClipboard(url.short, url.id)}>
              {copiedId === url.id ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={() => deleteUrl(url.id)}>Delete</button>
          </div>
        </div>
      ))}

      {urls.length === 0 && <p className="empty-message">No URLs shortened yet.</p>}
    </div>
  );
};

export default URLList;