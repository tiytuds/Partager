import React, { useState, useEffect } from 'react';
import './TileModal.css';
import tilesData from '../../data/tiles.json';

const TileModal = ({ tile, onClose, onTileClick }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFeedback('');
    setSubmitted(false);
  }, [tile]);

  if (!tile) return null;

  const relatedTiles = (tile.links || [])
    .map(linkId => tilesData.find(t => t.id === linkId))
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));

  const tileRefs = (tile.ref || [])
    .map(r => {
      if (r && typeof r === 'object') {
        if (r.url && typeof r.url === 'string') {
          return { type: 'url', url: r.url, title: r.title };
        }
        if (r.id && typeof r.id === 'string') {
          const found = tilesData.find(t => t.id === r.id);
          if (found) return { type: 'tile', tile: found };
        }
        return null;
      }
      if (typeof r === 'string' && /^https?:\/\//i.test(r)) {
        return { type: 'url', url: r };
      }
      const found = tilesData.find(t => t.id === r);
      if (found) return { type: 'tile', tile: found };
      return null;
    })
    .filter(Boolean);

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    const existing = JSON.parse(localStorage.getItem('tileFeedback') || '{}');
    existing[tile.id] = [...(existing[tile.id] || []), {
      text: feedback,
      timestamp: new Date().toISOString()
    }];
    localStorage.setItem('tileFeedback', JSON.stringify(existing));
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{tile.title}</h2>
        <p>{tile.content}</p>
        <br />
        <p>{tile.content2}</p>

        {relatedTiles.length > 0 && (
          <div className="related-tiles">
            <h4>Related Ideas:</h4>
            <div className="related-list">
              {relatedTiles.map(related => (
                <button
                  key={related.id}
                  className="related-button"
                  onClick={() => onTileClick(related)}
                >
                  {related.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {tileRefs.length > 0 && (
          <div className="ref-tiles">
            <h4>References:</h4>
            <div className="ref-list">
              {tileRefs.map((r, idx) => {
                if (r.type === 'url') {
                  const label = r.title || r.url;
                  return (
                    <button
                      key={`ref-url-${idx}`}
                      className="ref-button"
                      onClick={() => window.open(r.url, '_blank', 'noopener')}
                    >
                      {label}
                    </button>
                  );
                }
                return (
                  <button
                    key={r.tile.id}
                    className="ref-button"
                    onClick={() => onTileClick(r.tile)}
                  >
                    {r.tile.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="tile-feedback">
          <h4>Suggest an improvement!</h4>
          {submitted ? (
            <p className="feedback-success">Thanks for your feedback!</p>
          ) : (
            <>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={`Suggestions for "${tile.title}"...`}
                rows={3}
              />
              <button className="feedback-submit-btn" onClick={handleFeedbackSubmit}>
                Submit
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default TileModal;