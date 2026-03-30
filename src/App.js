import React, { useState } from 'react';
import Mosaic from './components/Mosaic/Mosaic';
import TileModal from './components/TileModal/TileModal';
/* import GraphView from './components/GraphView/GraphView'; */
import './App.css';

function App() {
  const [selectedTile, setSelectedTile] = useState(null);
  const [hoveredTileId, setHoveredTileId] = useState(null);
  const [viewMode, setViewMode] = useState('mosaic'); // 'mosaic' or 'graph'

  return (
    <div className="App">
      <h1>Project Partager (Beta Build; v0.2 CHS Ed.)</h1>
      <p>Explore various learning and teaching techniques. Concepts associated with learning are in blue, and those related to teaching are in red. Those associated with both are purple.</p>
      <strong>The more 'fundamental' a concept is to 2CH3, the larger it is on the mosaic.</strong>
        <Mosaic
          onTileClick={setSelectedTile}
          hoveredTileId={hoveredTileId}
          setHoveredTileId={setHoveredTileId}
        />

      <TileModal
        tile={selectedTile}
        onClose={() => setSelectedTile(null)}
        onTileClick={setSelectedTile}
      />
    </div>
  );
}

export default App;