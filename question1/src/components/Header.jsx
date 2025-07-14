import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="icon-wrapper">
          <i className="icon-link" />
        </div>
      </div>
      <h1 className="main-title">LinkShort</h1>
      <p className="subtitle">Transform long URLs into short, shareable links with powerful analytics</p>

      <div className="tab-wrapper">
        <button
          onClick={() => setActiveTab('shorten')}
          className={`tab-button ${activeTab === 'shorten' ? 'active' : ''}`}
        >
          Shorten URL
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
        >
          Analytics
        </button>
      </div>
    </div>
  );
};

export default Header;
