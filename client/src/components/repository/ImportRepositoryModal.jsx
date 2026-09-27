import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useToast } from '../../context/ToastContext';
import './ImportRepositoryModal.css';

/**
 * ImportRepositoryModal — UI shell for repository import.
 * Phase 1: wire the submit handlers to real ingestion logic.
 */
export default function ImportRepositoryModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('local');
  const [localPath, setLocalPath] = useState('');
  const [gitUrl, setGitUrl] = useState('');
  const toast = useToast();

  const handleImport = () => {
    toast({
      variant: 'info',
      message: 'Repository import will be available in Phase 1.',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Repository" size="md">
      {/* Tabs */}
      <div className="import-modal__tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'local'}
          className={`import-modal__tab${tab === 'local' ? ' import-modal__tab--active' : ''}`}
          onClick={() => setTab('local')}
          id="tab-local"
          aria-controls="panel-local"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4 6h6M4 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Local Path
        </button>
        <button
          role="tab"
          aria-selected={tab === 'git'}
          className={`import-modal__tab${tab === 'git' ? ' import-modal__tab--active' : ''}`}
          onClick={() => setTab('git')}
          id="tab-git"
          aria-controls="panel-git"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="4" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="4" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="10" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M4 5C4 5 4 3.5 5.5 3.5H8a2 2 0 012 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          Git URL
        </button>
      </div>

      {/* Local Path panel */}
      {tab === 'local' && (
        <div
          id="panel-local"
          role="tabpanel"
          aria-labelledby="tab-local"
          className="import-modal__panel"
        >
          <div className="import-modal__drop-zone" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="8" width="32" height="26" rx="3" stroke="var(--color-blue)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <path d="M20 26V16M20 16l-5 5M20 16l5 5" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Select a local repository folder</p>
          </div>

          <div className="import-modal__path-row">
            <Input
              label="Repository Path"
              id="local-path-input"
              placeholder="/home/user/projects/my-repo"
              value={localPath}
              onChange={(e) => setLocalPath(e.target.value)}
              hint="Enter the absolute path to your repository"
            />
            <Button
              variant="secondary"
              size="md"
              onClick={() => toast({ variant: 'info', message: 'Directory browser will be available in Phase 1.' })}
              aria-label="Browse for directory"
              style={{ marginTop: '22px', flexShrink: 0 }}
            >
              Browse
            </Button>
          </div>

          <div className="import-modal__note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 5.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="6" cy="4" r="0.6" fill="currentColor"/>
            </svg>
            Only local paths for now. GitHub import coming in Phase 1.
          </div>

          <div className="import-modal__footer">
            <Button variant="ghost" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleImport}>
              Import Repository
            </Button>
          </div>
        </div>
      )}

      {/* Git URL panel */}
      {tab === 'git' && (
        <div
          id="panel-git"
          role="tabpanel"
          aria-labelledby="tab-git"
          className="import-modal__panel"
        >
          <Input
            label="Repository URL"
            id="git-url-input"
            placeholder="https://github.com/user/repository.git"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
            hint="Supports GitHub, GitLab, and Bitbucket URLs"
          />

          <div className="import-modal__note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 5.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="6" cy="4" r="0.6" fill="currentColor"/>
            </svg>
            Remote repository cloning will be implemented in Phase 1.
          </div>

          <div className="import-modal__footer">
            <Button variant="ghost" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleImport}>
              Import Repository
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
