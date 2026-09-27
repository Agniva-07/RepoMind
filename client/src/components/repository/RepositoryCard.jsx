import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import './RepositoryCard.css';

const STATUS_MAP = {
  analyzed:     { label: 'Analyzed',     variant: 'success' },
  pending:      { label: 'Analyzing...',  variant: 'info' },
  error:        { label: 'Error',         variant: 'error' },
  'not-analyzed': { label: 'Not Analyzed', variant: 'neutral' },
};

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  'Node.js':  '#68a063',
  Python:     '#3572a5',
  TypeScript: '#3178c6',
  CSS:        '#563d7c',
  default:    '#90b8d4',
};

export default function RepositoryCard({ repo }) {
  const navigate = useNavigate();
  const { label, variant } = STATUS_MAP[repo.status] || STATUS_MAP['not-analyzed'];
  const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default;

  return (
    <article
      className="repo-card"
      onClick={() => navigate(`/repositories/${repo.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/repositories/${repo.id}`)}
      aria-label={`Open repository ${repo.name}`}
    >
      <div className="repo-card__header">
        <div className="repo-card__name-row">
          <span className="repo-card__lang-dot" style={{ background: langColor }} aria-hidden="true" />
          <h3 className="repo-card__name">{repo.name}</h3>
          <Badge variant={variant}>{label}</Badge>
        </div>
        <p className="repo-card__path text-mono">{repo.path}</p>
      </div>

      <div className="repo-card__meta">
        <div className="repo-card__stat">
          <span className="repo-card__stat-value">{repo.fileCount.toLocaleString()}</span>
          <span className="repo-card__stat-label">files</span>
        </div>
        <div className="repo-card__stat">
          <span className="repo-card__stat-value">{repo.language}</span>
          <span className="repo-card__stat-label">language</span>
        </div>
        <div className="repo-card__stat">
          <span className="repo-card__stat-value">
            {repo.lastAnalyzed
              ? new Date(repo.lastAnalyzed).toLocaleDateString()
              : '—'}
          </span>
          <span className="repo-card__stat-label">last analyzed</span>
        </div>
      </div>
    </article>
  );
}
