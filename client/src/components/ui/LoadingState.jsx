import './LoadingState.css';

const ANALYSIS_STAGES = [
  'Scanning files and directories',
  'Extracting file metadata',
  'Parsing code structure',
  'Building dependency relationships',
  'Indexing search tokens',
  'Analyzing Git history',
];

/**
 * LoadingState — "Analyzing Repository" multi-stage UI
 * @param {string[]} [stages] - stage label array
 * @param {number} [currentStage] - index of current active stage (0-based)
 * @param {number} [progress] - 0–100 percentage
 * @param {string} [message]
 */
export default function LoadingState({
  stages = ANALYSIS_STAGES,
  currentStage = 2,
  progress = 42,
  message = 'This may take a few moments...',
}) {
  return (
    <div className="loading-state">
      <div className="loading-state__spinner" aria-hidden="true">
        <div className="loading-state__ring" />
      </div>
      <h3 className="loading-state__title">Analyzing Repository</h3>
      <p className="loading-state__message">{message}</p>

      <div className="loading-state__progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="loading-state__progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="loading-state__percent">{progress}%</span>

      <ul className="loading-state__stages" aria-label="Analysis stages">
        {stages.map((stage, i) => {
          const done = i < currentStage;
          const active = i === currentStage;
          return (
            <li
              key={stage}
              className={`loading-state__stage${done ? ' loading-state__stage--done' : ''}${active ? ' loading-state__stage--active' : ''}`}
            >
              <span className="loading-state__stage-dot" aria-hidden="true" />
              <span>{stage}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
