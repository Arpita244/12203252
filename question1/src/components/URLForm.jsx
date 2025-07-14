import React from 'react';

const URLForm = ({ inputUrl, setInputUrl, customAlias, setCustomAlias, shortenUrl }) => {
  return (
    <div className="card">
      <label>Enter your long URL</label>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="https://example.com/very-long-url"
        onKeyPress={(e) => e.key === 'Enter' && shortenUrl()}
      />

      <label>Custom alias (optional)</label>
      <input
        type="text"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        placeholder="my-custom-link"
      />

      <button onClick={shortenUrl} className="primary-button">
        Shorten URL
      </button>
    </div>
  );
};

export default URLForm;
