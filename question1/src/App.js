
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import URLForm from './components/URLForm';
import URLList from './components/URLList';
import AnalyticsPanel from './components/AnalyticsPanel';
import { isValidUrl, generateShortCode, getAnalytics } from './utils/helpers';
import './App.css';

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputUrl, setInputUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('shorten');

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(savedUrls);
  }, []);

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const shortenUrl = () => {
    if (!inputUrl.trim()) return;
    if (!isValidUrl(inputUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    const shortCode = customAlias || generateShortCode();
    if (customAlias && urls.some(url => url.shortCode === customAlias)) {
      alert('Custom alias already exists.');
      return;
    }

    const fullUrl = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    const shortUrl = `short.ly/${shortCode}`;

    const newUrl = {
      id: Date.now(),
      original: fullUrl,
      short: shortUrl,
      shortCode,
      clicks: 0,
      createdAt: new Date().toISOString(),
      clickHistory: []
    };

    setUrls([newUrl, ...urls]);
    setInputUrl('');
    setCustomAlias('');
  };

  const handleClick = (id) => {
    setUrls(urls.map(url =>
      url.id === id
        ? { ...url, clicks: url.clicks + 1, clickHistory: [...url.clickHistory, { timestamp: new Date().toISOString() }] }
        : url
    ));
    const clickedUrl = urls.find(url => url.id === id);
    if (clickedUrl) window.open(clickedUrl.original, '_blank');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteUrl = (id) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  const analytics = getAnalytics(urls);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'shorten' ? (
          <>
            <URLForm
              inputUrl={inputUrl}
              setInputUrl={setInputUrl}
              customAlias={customAlias}
              setCustomAlias={setCustomAlias}
              shortenUrl={shortenUrl}
            />
            <URLList
              urls={urls}
              handleClick={handleClick}
              copyToClipboard={copyToClipboard}
              deleteUrl={deleteUrl}
              copiedId={copiedId}
            />
          </>
        ) : (
          <AnalyticsPanel urls={urls} analytics={analytics} />
        )}
      </div>
    </div>
  );
};

export default App;


