import { useState } from 'react';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import RepositoryCard from '../components/repository/RepositoryCard';
import ImportRepositoryModal from '../components/repository/ImportRepositoryModal';
import { mockRepositories } from '../data/mockRepositories';
import './Repositories.css';

export default function Repositories() {
  const [importOpen, setImportOpen] = useState(false);
  const repos = mockRepositories;

  return (
    <div className="repositories">
      <div className="repositories__header">
        <div>
          <h2 className="repositories__title">Repositories</h2>
          <p className="repositories__count">
            {repos.length} {repos.length === 1 ? 'repository' : 'repositories'}
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setImportOpen(true)}
          icon={
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1v7M6.5 1L4 3.5M6.5 1L9 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 10.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
        >
          Import Repository
        </Button>
      </div>

      {repos.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 16h40" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 26h8M14 30h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          title="No repositories yet"
          description="Import a local repository or clone from a Git URL to get started."
          action={
            <Button variant="primary" size="md" onClick={() => setImportOpen(true)}>
              Import Repository
            </Button>
          }
        />
      ) : (
        <div className="repositories__list">
          {repos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}

      <ImportRepositoryModal isOpen={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
