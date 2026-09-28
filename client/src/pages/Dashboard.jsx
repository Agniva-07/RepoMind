import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ImportRepositoryModal from '../components/repository/ImportRepositoryModal';
import './Dashboard.css';

const STATS = [
  { label: 'Repositories', value: '0', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 6h15" stroke="currentColor" strokeWidth="1.4"/></svg>
  )},
  { label: 'Files Analyzed', value: '0', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 2h7l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/><path d="M11 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
  )},
  { label: 'Symbols', value: '0', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5h8M5 9h6M5 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
  )},
  { label: 'Dependencies', value: '0', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="3.5" cy="14" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="14.5" cy="14" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5.5v4M9 9.5L3.5 12M9 9.5L14.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  )},
];

export default function Dashboard() {
  const [importOpen, setImportOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title">Project Brain</h2>
          <p className="dashboard__subtitle">Codebase Intelligence Platform</p>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard__stats">
        {STATS.map((stat) => (
          <Card key={stat.label} className="dashboard__stat-card" variant="navy">
            <div className="dashboard__stat-icon">{stat.icon}</div>
            <div>
              <div className="dashboard__stat-value">{stat.value}</div>
              <div className="dashboard__stat-label">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div className="dashboard__body">
        {/* Empty state */}
        <Card className="dashboard__empty-card" padding="lg" variant="cream">
          <EmptyState
            icon={
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <rect x="4" y="8" width="44" height="36" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 16h44" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="26" cy="32" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M26 29v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="No repository analyzed yet"
            description="Import a repository to explore its structure, relationships and history."
            action={
              <Button
                variant="primary"
                size="lg"
                onClick={() => setImportOpen(true)}
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1v8M7 1L4 4M7 1l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                }
              >
                Import Repository
              </Button>
            }
          />
        </Card>

        {/* Backend status */}
        <Card className="dashboard__status-card" padding="md" variant="navy">
          <h4 className="dashboard__status-title">Backend Status</h4>
          <div className="dashboard__status-row">
            <div className="dashboard__status-dot dashboard__status-dot--pending" aria-hidden="true" />
            <div>
              <div className="dashboard__status-label">Integration Pending</div>
              <div className="dashboard__status-desc">
                Backend will be connected during Phase 1 (repository ingestion).
              </div>
            </div>
          </div>
          <div className="dashboard__status-note">
            API endpoint: <code>http://localhost:9000</code> — not yet configured
          </div>
        </Card>
      </div>

      <ImportRepositoryModal isOpen={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
