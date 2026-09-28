import EmptyState from '../components/ui/EmptyState';
import './DependencyGraph.css';

export default function DependencyGraph({ nodes = [], edges = [] }) {
  /* Convert percentage positions to SVG coords */
  const W = 800, H = 320;
  const nodeCoords = Object.fromEntries(
    nodes.map((n) => [n.id, { x: (n.x / 100) * W, y: (n.y / 100) * H + 20 }])
  );

  return (
    <div className="dep-graph">
      <div className="dep-graph__header">
        <div>
          <h2 className="dep-graph__title">Dependency Graph</h2>
          <p className="dep-graph__subtitle">
            Visualize import/export relationships between modules.
          </p>
        </div>
        <div className="dep-graph__controls">
          <button className="dep-graph__ctrl-btn" aria-label="Zoom in" disabled={nodes.length === 0}>+</button>
          <button className="dep-graph__ctrl-btn" aria-label="Zoom out" disabled={nodes.length === 0}>−</button>
          <button className="dep-graph__ctrl-btn dep-graph__ctrl-btn--text" aria-label="Fit view" disabled={nodes.length === 0}>Fit</button>
        </div>
      </div>

      <div className="dep-graph__notice">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6.5 5.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6.5" cy="4" r="0.6" fill="currentColor"/>
        </svg>
        Real dependency engine will be connected in Phase 2.
      </div>

      {/* Graph canvas */}
      <div className="dep-graph__canvas">
        {nodes.length === 0 ? (
          <EmptyState
            icon={
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="14" cy="34" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="34" cy="34" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M22 19l-6 10M26 19l6 10M17 34h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
            title="No Dependency Data"
            description="Import a repository and wait for dependency analysis to complete."
          />
        ) : (
          <>
            <div className="dep-graph__minimap" aria-hidden="true">
              <span className="dep-graph__minimap-label">Minimap</span>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H + 40}`}
              className="dep-graph__svg"
              aria-label="Dependency graph visualization"
              role="img"
            >
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0 L0 6 L8 3 z" fill="rgba(0, 240, 255,0.4)"/>
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {edges.map((e) => {
                const from = nodeCoords[e.from];
                const to   = nodeCoords[e.to];
                if (!from || !to) return null;
                return (
                  <line
                    key={`${e.from}-${e.to}`}
                    x1={from.x} y1={from.y + 12}
                    x2={to.x}   y2={to.y - 12}
                    stroke="rgba(0, 240, 255,0.25)"
                    strokeWidth="1.2"
                    markerEnd="url(#arrow)"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((n) => {
                const c = nodeCoords[n.id];
                return (
                  <g key={n.id} className="dep-graph__node" transform={`translate(${c.x},${c.y})`}>
                    <rect
                      x="-38" y="-12" width="76" height="24"
                      rx="6"
                      fill="rgba(28, 11, 59,0.85)"
                      stroke={n.id === 'app' ? 'rgba(0, 240, 255,0.6)' : 'rgba(123, 44, 191,0.35)'}
                      strokeWidth="1"
                      filter={n.id === 'app' ? 'url(#glow)' : undefined}
                    />
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill={n.id === 'app' ? '#00F0FF' : '#90b8d4'}
                      fontSize="11"
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight={n.id === 'app' ? '600' : '400'}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </>
        )}
      </div>

      {/* Filters placeholder */}
      <div className="dep-graph__filters">
        <span className="dep-graph__filter-label">Show:</span>
        {['All', 'Internal', 'External', 'Circular'].map((f) => (
          <button key={f} disabled={nodes.length === 0} className={`dep-graph__filter${f === 'All' ? ' dep-graph__filter--active' : ''}`}>
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
