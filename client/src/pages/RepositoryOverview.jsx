import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import RepositoryTree from '../components/repository/RepositoryTree';
import CodeViewer from '../components/repository/CodeViewer';
import { mockRepositories, MOCK_FILE_TREE, MOCK_CODE } from '../data/mockRepositories';
import { mockCommits } from '../data/mockCommits';
import './RepositoryOverview.css';

const TABS = ['Overview', 'Files', 'Structure', 'Dependencies', 'Commits'];

const STATUS_VARIANT = {
  analyzed: 'success',
  pending: 'info',
  error: 'error',
  'not-analyzed': 'neutral',
};

export default function RepositoryOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedCode, setSelectedCode] = useState({ code: MOCK_CODE, filename: 'App.jsx' });

  const repo = mockRepositories.find((r) => r.id === id);

  if (!repo) {
    return (
      <div className="repo-overview__not-found">
        <p className="text-muted">Repository not found.</p>
        <Button variant="ghost" onClick={() => navigate('/repositories')}>
          ← Back to Repositories
        </Button>
      </div>
    );
  }

  return (
    <div className="repo-overview">
      {/* Breadcrumb */}
      <button className="repo-overview__back" onClick={() => navigate('/repositories')}>
        ← Repositories
      </button>

      {/* Header */}
      <div className="repo-overview__header">
        <div className="repo-overview__title-row">
          <h2 className="repo-overview__name">{repo.name}</h2>
          <Badge variant={STATUS_VARIANT[repo.status]}>
            {repo.status === 'analyzed' ? 'Analyzed' :
             repo.status === 'pending' ? 'Analyzing...' :
             repo.status === 'error' ? 'Error' : 'Not Analyzed'}
          </Badge>
        </div>
        <p className="repo-overview__path text-mono">{repo.path}</p>
      </div>

      {/* Tabs */}
      <div className="repo-overview__tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`repo-overview__tab${activeTab === tab ? ' repo-overview__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="repo-overview__content" role="tabpanel">
        {activeTab === 'Overview' && (
          <div className="repo-overview__stats">
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Language</div>
              <div className="repo-overview__stat-value">{repo.language}</div>
            </Card>
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Files</div>
              <div className="repo-overview__stat-value">{repo.fileCount.toLocaleString()}</div>
            </Card>
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Symbols</div>
              <div className="repo-overview__stat-value">{repo.symbolCount.toLocaleString()}</div>
            </Card>
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Dependencies</div>
              <div className="repo-overview__stat-value">{repo.dependencyCount}</div>
            </Card>
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Commits</div>
              <div className="repo-overview__stat-value">{repo.commitCount}</div>
            </Card>
            <Card className="repo-overview__stat-card">
              <div className="repo-overview__stat-label">Size</div>
              <div className="repo-overview__stat-value">{repo.size}</div>
            </Card>
          </div>
        )}

        {activeTab === 'Files' && (
          <div className="repo-overview__files">
            <div className="repo-overview__tree-panel">
              <RepositoryTree
                tree={MOCK_FILE_TREE}
                onSelectFile={(node) => setSelectedCode({ code: MOCK_CODE, filename: node.name })}
              />
            </div>
            <div className="repo-overview__code-panel">
              <CodeViewer
                code={selectedCode.code}
                filename={selectedCode.filename}
                language="jsx"
              />
            </div>
          </div>
        )}

        {activeTab === 'Structure' && (
          <Card padding="lg" className="repo-overview__placeholder">
            <div className="repo-overview__placeholder-inner">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="32" height="32" rx="4" stroke="var(--color-blue)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M14 20h12M20 14v12" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="repo-overview__placeholder-label">Code Structure</p>
              <p className="repo-overview__placeholder-desc">
                AST-based code structure will be displayed here in Phase 1.
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'Dependencies' && (
          <Card padding="lg" className="repo-overview__placeholder">
            <div className="repo-overview__placeholder-inner">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="10" r="5" stroke="var(--color-blue)" strokeWidth="1.5"/>
                <circle cx="10" cy="30" r="5" stroke="var(--color-blue)" strokeWidth="1.5"/>
                <circle cx="30" cy="30" r="5" stroke="var(--color-blue)" strokeWidth="1.5"/>
                <path d="M20 15v7M20 22L10 25M20 22L30 25" stroke="var(--color-cyan)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <p className="repo-overview__placeholder-label">Dependency Graph</p>
              <p className="repo-overview__placeholder-desc">
                Import/export dependencies will be mapped here in Phase 1.
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'Commits' && (
          <div className="repo-overview__commits">
            {mockCommits.map((commit) => (
              <Card key={commit.hash} className="repo-overview__commit-card" padding="md">
                <div className="repo-overview__commit-header">
                  <code className="repo-overview__commit-hash">{commit.hash}</code>
                  <div className="repo-overview__commit-stats">
                    <span className="repo-overview__commit-add">+{commit.additions}</span>
                    <span className="repo-overview__commit-del">-{commit.deletions}</span>
                  </div>
                </div>
                <p className="repo-overview__commit-message">{commit.message}</p>
                <div className="repo-overview__commit-meta">
                  <span>{commit.author}</span>
                  <span>·</span>
                  <span>{commit.relativeDate}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
