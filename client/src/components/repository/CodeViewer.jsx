import './CodeViewer.css';

/**
 * CodeViewer — read-only code display with line numbers.
 * Lightweight placeholder. No real syntax parsing.
 * Replace with Monaco Editor or similar during Phase 1.
 */
export default function CodeViewer({ code = '', filename = '', language = 'js' }) {
  if (!code) {
    return (
      <div className="code-viewer code-viewer--empty">
        <span className="text-muted text-sm">Select a file to view its contents</span>
      </div>
    );
  }

  const lines = code.split('\n');

  return (
    <div className="code-viewer">
      {filename && (
        <div className="code-viewer__header">
          <span className="code-viewer__filename">{filename}</span>
          <span className="code-viewer__lang">{language.toUpperCase()}</span>
        </div>
      )}
      <div className="code-viewer__body">
        <pre className="code-viewer__pre" aria-label={`Code content of ${filename}`}>
          <div className="code-viewer__line-nums" aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <code className="code-viewer__code">
            {lines.map((line, i) => (
              <span key={i} className="code-viewer__line">
                {line || ' '}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
