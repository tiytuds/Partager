import React from 'react';
import Tile from '../Tile/Tile';
import './Mosaic.css';
import tilesData from '../../data/tiles.json';

const Mosaic = ({ onTileClick, hoveredTileId, setHoveredTileId }) => {
  return (
    <div className="mosaic-grid">
      {tilesData.map(tile => (
        <Tile
          key={tile.id}
          tile={tile}
          onClick={() => onTileClick(tile)}
          onHoverStart={() => setHoveredTileId(tile.id)}
          onHoverEnd={() => setHoveredTileId(null)}
          isDimmed={hoveredTileId && hoveredTileId !== tile.id}
        />
      ))}
    </div>
  );
};

export default Mosaic;