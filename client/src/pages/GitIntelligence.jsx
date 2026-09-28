import { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import './GitIntelligence.css';

export default function GitIntelligence() {
  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  const [branch, setBranch] = useState('');
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [showDiff, setShowDiff] = useState(false);

  return (
    <div className="git-intel">
      <div className="git-intel__header">
        <div>
          <h2 className="git-intel__title">Git Intelligence</h2>
          <p className="git-intel__subtitle">
            Explore commit history, branches, diffs and changes.
          </p>
        </div>

        {/* Branch selector */}
        <div className="git-intel__branch-selector">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="4" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="4" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="10" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4 4.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M4 4.5C4 4.5 4 3 5.5 3H8a2 2 0 012 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <label htmlFor="branch-select" className="sr-only">Select branch</label>
          <select
            id="branch-select"
            className="git-intel__branch-select"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            disabled={branches.length === 0}
          >
            {branches.length === 0 ? (
              <option>—</option>
            ) : (
              branches.map((b) => <option key={b} value={b}>{b}</option>)
            )}
          </select>
        </div>
      </div>

      <div className="git-intel__notice">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6.5 5.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6.5" cy="4" r="0.6" fill="currentColor"/>
        </svg>
        Real Git history will be loaded after Phase 1 repository ingestion.
      </div>

      <div className="git-intel__body">
        {commits.length === 0 ? (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="14" cy="34" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="34" cy="24" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 20v8M20 18l8 4M20 30l8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              }
              title="No Git History Available"
              description="Import a repository to view its branches, commits, and diffs."
            />
          </div>
        ) : (
          <>
            {/* Commit timeline */}
            <div className="git-intel__timeline">
              <h3 className="git-intel__section-title">Commit History</h3>
              <div className="git-intel__commits">
                {commits.map((commit, i) => (
                  <button
                    key={commit.hash}
                    className={`git-intel__commit${selectedCommit?.hash === commit.hash ? ' git-intel__commit--active' : ''}`}
                    onClick={() => { setSelectedCommit(commit); setShowDiff(false); }}
                    aria-current={selectedCommit?.hash === commit.hash ? 'true' : undefined}
                  >
                    <div className="git-intel__commit-timeline-line" aria-hidden="true">
                      <div className="git-intel__commit-dot" />
                      {i < commits.length - 1 && <div className="git-intel__commit-connector" />}
                    </div>
                    <div className="git-intel__commit-content">
                      <div className="git-intel__commit-top">
                        <code className="git-intel__commit-hash">{commit.hash}</code>
                        <div className="git-intel__commit-stats">
                          <span className="git-intel__add">+{commit.additions}</span>
                          <span className="git-intel__del">-{commit.deletions}</span>
                        </div>
                      </div>
                      <p className="git-intel__commit-msg">{commit.message}</p>
                      <div className="git-intel__commit-meta">
                        <span className="git-intel__author">{commit.author}</span>
                        <span>·</span>
                        <span>{commit.relativeDate}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Commit detail */}
            {selectedCommit && (
              <div className="git-intel__detail">
                <div className="git-intel__detail-header">
                  <h3 className="git-intel__section-title">Commit Detail</h3>
                  <button
                    className="git-intel__diff-btn"
                    onClick={() => setShowDiff((d) => !d)}
                  >
                    {showDiff ? 'Hide Diff' : 'View Diff'}
                  </button>
                </div>

                <Card padding="md" className="git-intel__detail-card" variant="navy">
                  <div className="git-intel__detail-meta">
                    <code className="git-intel__commit-hash">{selectedCommit.hash}</code>
                    <Badge variant="info">{selectedCommit.branch}</Badge>
                  </div>
                  <p className="git-intel__detail-msg">{selectedCommit.message}</p>
                  <div className="git-intel__detail-info">
                    <span><strong>Author:</strong> {selectedCommit.author}</span>
                    <span><strong>Date:</strong> {new Date(selectedCommit.date).toLocaleString()}</span>
                  </div>
                  <div className="git-intel__changed-files">
                    <p className="git-intel__changed-label">Changed files:</p>
                    {selectedCommit.changedFiles.map((f) => (
                      <div key={f} className="git-intel__changed-file text-mono">{f}</div>
                    ))}
                  </div>
                </Card>

                {showDiff && selectedCommit.diff && (
                  <Card padding="sm" className="git-intel__diff-card" variant="charcoal">
                    <pre className="git-intel__diff">
                      <code>
                        {selectedCommit.diff.split('\n').map((line, i) => (
                          <span
                            key={i}
                            className={
                              line.startsWith('+') && !line.startsWith('+++')
                                ? 'git-intel__diff-add'
                                : line.startsWith('-') && !line.startsWith('---')
                                ? 'git-intel__diff-del'
                                : line.startsWith('@@')
                                ? 'git-intel__diff-hunk'
                                : ''
                            }
                          >
                            {line}
                            {'\n'}
                          </span>
                        ))}
                      </code>
                    </pre>
                  </Card>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
