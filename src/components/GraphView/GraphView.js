import React, { useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import tilesData from '../../data/tiles.json';

const GraphView = ({ onTileClick }) => {
  const graphRef = useRef();

  // Convert tile data to graph format
  const nodes = tilesData.map(tile => ({
    id: tile.id,
    name: tile.title,
    group: tile.type // used for color coding
  }));

  const links = tilesData.flatMap(tile =>
    tile.links.map(linkId => ({
      source: tile.id,
      target: linkId
    }))
  );

  const graphData = { nodes, links };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        onNodeClick={node => {
          const tile = tilesData.find(t => t.id === node.id);
          if (tile) onTileClick(tile);
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default GraphView;