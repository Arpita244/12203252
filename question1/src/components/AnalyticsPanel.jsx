import React from 'react';

const AnalyticsPanel = ({ urls, analytics }) => {
  return (
    <div className="analytics">
      <div className="analytics-cards">
        <div className="card">Total URLs: {analytics.totalUrls}</div>
        <div className="card">Total Clicks: {analytics.totalClicks}</div>
        <div className="card">Avg Clicks: {analytics.avgClicks}</div>
        <div className="card">Today's Clicks: {analytics.todayClicks}</div>
      </div>

      <div className="top-urls">
        <h3>Top Performing URLs</h3>
        {urls.length > 0 ? (
          urls
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 5)
            .map((url, index) => (
              <div key={url.id} className="top-url">
                <strong>{index + 1}.</strong> {url.short} ({url.clicks} clicks)
              </div>
            ))
        ) : (
          <p>No data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;