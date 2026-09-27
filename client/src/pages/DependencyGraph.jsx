import './DependencyGraph.css';

/* Mock graph data: nodes and edges */
const NODES = [
  { id: 'app',        label: 'App',         x: 50,  y: 10 },
  { id: 'dashboard',  label: 'Dashboard',   x: 20,  y: 36 },
  { id: 'sidebar',    label: 'Sidebar',     x: 50,  y: 36 },
  { id: 'topbar',     label: 'Topbar',      x: 80,  y: 36 },
  { id: 'repo',       label: 'Repository',  x: 15,  y: 62 },
  { id: 'apiclient',  label: 'APIClient',   x: 42,  y: 62 },
  { id: 'auth',       label: 'AuthService', x: 70,  y: 62 },
];

const EDGES = [
  { from: 'app', to: 'dashboard' },
  { from: 'app', to: 'sidebar' },
  { from: 'app', to: 'topbar' },
  { from: 'dashboard', to: 'repo' },
  { from: 'dashboard', to: 'apiclient' },
  { from: 'topbar', to: 'auth' },
  { from: 'apiclient', to: 'auth' },
];

/* Convert percentage positions to SVG coords */
const W = 800, H = 320;
const nodeCoords = Object.fromEntries(
  NODES.map((n) => [n.id, { x: (n.x / 100) * W, y: (n.y / 100) * H + 20 }])
);

export default function DependencyGraph() {
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
          <button className="dep-graph__ctrl-btn" aria-label="Zoom in">+</button>
          <button className="dep-graph__ctrl-btn" aria-label="Zoom out">−</button>
          <button className="dep-graph__ctrl-btn dep-graph__ctrl-btn--text" aria-label="Fit view">Fit</button>
        </div>
      </div>

      <div className="dep-graph__notice">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6.5 5.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6.5" cy="4" r="0.6" fill="currentColor"/>
        </svg>
        Placeholder graph — real dependency engine will be connected in Phase 2.
      </div>

      {/* Graph canvas */}
      <div className="dep-graph__canvas">
        <div className="dep-graph__minimap" aria-hidden="true">
          <span className="dep-graph__minimap-label">Minimap</span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H + 40}`}
          className="dep-graph__svg"
          aria-label="Dependency graph visualization (placeholder)"
          role="img"
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L0 6 L8 3 z" fill="rgba(0,180,216,0.4)"/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map((e) => {
            const from = nodeCoords[e.from];
            const to   = nodeCoords[e.to];
            if (!from || !to) return null;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x} y1={from.y + 12}
                x2={to.x}   y2={to.y - 12}
                stroke="rgba(0,180,216,0.25)"
                strokeWidth="1.2"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const c = nodeCoords[n.id];
            return (
              <g key={n.id} className="dep-graph__node" transform={`translate(${c.x},${c.y})`}>
                <rect
                  x="-38" y="-12" width="76" height="24"
                  rx="6"
                  fill="rgba(6,18,60,0.85)"
                  stroke={n.id === 'app' ? 'rgba(0,180,216,0.6)' : 'rgba(0,119,182,0.35)'}
                  strokeWidth="1"
                  filter={n.id === 'app' ? 'url(#glow)' : undefined}
                />
                <text
                  textAnchor="middle"
                  dy="4"
                  fill={n.id === 'app' ? '#00B4D8' : '#90b8d4'}
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
      </div>

      {/* Filters placeholder */}
      <div className="dep-graph__filters">
        <span className="dep-graph__filter-label">Show:</span>
        {['All', 'Internal', 'External', 'Circular'].map((f) => (
          <button key={f} className={`dep-graph__filter${f === 'All' ? ' dep-graph__filter--active' : ''}`}>
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
