import React, { useState, useEffect } from 'react';
import Tile from '../Tile/Tile';
import './Mosaic.css';
import tilesData from '../../data/tiles.json';

// Function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Mosaic = ({ onTileClick, hoveredTileId, setHoveredTileId }) => {
  const [shuffledTiles, setShuffledTiles] = useState([]);

  useEffect(() => {
    setShuffledTiles(shuffleArray(tilesData));
  }, []);

  return (
    <div className="mosaic-grid">
      {shuffledTiles.map(tile => (
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