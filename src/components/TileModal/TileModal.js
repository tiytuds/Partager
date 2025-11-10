import React from 'react';
import './TileModal.css';
import tilesData from '../../data/tiles.json';

const TileModal = ({ tile, onClose, onTileClick }) => {
  if (!tile) return null;

  // Get related tile objects (links refer to other tiles by id)
  const relatedTiles = (tile.links || [])
    .map(linkId => tilesData.find(t => t.id === linkId))
    .filter(Boolean) // remove any undefined
    .sort((a, b) => a.title.localeCompare(b.title));

  // Build references list. Support two kinds of refs:
  // - external URLs (strings starting with http/https)
  // - internal tile references (ids that match other tiles)
  const tileRefs = (tile.ref || [])
    .map(r => {
      // support object refs: { title?, url?, id? }
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

      // try to find a tile with this id
      const found = tilesData.find(t => t.id === r);
      if (found) return { type: 'tile', tile: found };
      return null;
    })
    .filter(Boolean);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{tile.title}</h2>
        <p>{tile.content}</p>
        <br></br>
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

                // tile reference
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
      </div>
    </div>
  );
};

export default TileModal;