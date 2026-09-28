import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import './ImpactAnalysis.css';

export default function ImpactAnalysis() {
  const [impactResults, setImpactResults] = useState(null); // Real data will go here

  return (
    <div className="impact">
      <div className="impact__header">
        <div>
          <h2 className="impact__title">Change Impact Analysis</h2>
          <p className="impact__subtitle">
            Find which parts of the codebase may be affected by a change.
          </p>
        </div>
      </div>

      {/* Phase 1 notice */}
      <div className="impact__notice">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6.5 5.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6.5" cy="4" r="0.6" fill="currentColor"/>
        </svg>
        Impact analysis requires a fully indexed repository. Available after Phase 1 ingestion is complete.
      </div>

      <div className="impact__body">
        {/* Input panel */}
        <Card className="impact__input-card" padding="md" variant="navy">
          <h3 className="impact__section-title">Select Changed Entity</h3>

          <div className="impact__field">
            <label className="impact__label" htmlFor="impact-file">Changed File / Function</label>
            <select id="impact-file" className="impact__select" disabled>
              <option>— Import a repository first —</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="md"
            disabled
            className="impact__analyze-btn"
          >
            Analyze Impact
          </Button>

          <p className="impact__disabled-note">
            Import a repository to run an analysis.
          </p>
        </Card>

        {/* Results panel */}
        <div className="impact__results">
          <div className="impact__results-header">
            <h3 className="impact__section-title">Analysis Results</h3>
          </div>

          {!impactResults ? (
             <EmptyState
               icon={
                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                   <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
                   <path d="M24 16v8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                 </svg>
               }
               title="No Analysis Run"
               description="Select an entity and run an impact analysis to see results here."
             />
          ) : (
            <>
              <div className="impact__changed-file">
                <span className="impact__changed-label">Changed:</span>
                <code className="impact__changed-path">{impactResults.changed}</code>
              </div>

              <div className="impact__arrow-label">↓ Potential impact</div>

              <div className="impact__affected-list">
                {impactResults.affected.map((item, i) => (
                  <div key={item.name} className="impact__affected-item">
                    <div className="impact__affected-connector" aria-hidden="true">
                      <span>→</span>
                    </div>
                    <Card className="impact__affected-card" padding="sm" variant="emerald">
                      <div className="impact__affected-name">{item.name}</div>
                      <div className="impact__affected-path text-mono">{item.path}</div>
                      <div className="impact__affected-reason">{item.reason}</div>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
