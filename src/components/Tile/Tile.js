import React from 'react';
import './Tile.css';

const Tile = ({ tile, onClick, onHoverStart, onHoverEnd, isDimmed }) => {
  const { type, size, title } = tile;

  const getTileClass = () => {
    let classes = `tile ${type} ${size}`;
    if (isDimmed) classes += ' dimmed';
    return classes;
  };

  // Determine grid span based on size
  const getGridSpan = () => {
    switch (size) {
      case 'small':
        return { gridColumn: 'span 1', gridRow: 'span 1' };
      case 'medium':
        return { gridColumn: 'span 2', gridRow: 'span 2' };
      case 'large':
        return { gridColumn: 'span 3', gridRow: 'span 3' };
      default:
        return { gridColumn: 'span 1', gridRow: 'span 1' };
    }
  };

  return (
    <div
      className={getTileClass()}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={getGridSpan()}
    >
      <div className="tile-title">{title}</div>
    </div>
  );

  <div className={`tile ${tile.size}`}>
    <h3 className="tile-title">{tile.title}</h3>
  </div>
};


export default Tile;