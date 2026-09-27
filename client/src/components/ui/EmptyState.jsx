import './EmptyState.css';

/**
 * EmptyState — consistent placeholder for empty views
 * @param {React.ReactNode} icon
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} [action]
 */
export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state" role="status">
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
