import './Badge.css';

/**
 * Badge — small status indicator
 * @param {'success'|'warning'|'error'|'info'|'neutral'|'blue'} [variant='neutral']
 */
export default function Badge({ children, variant = 'neutral', className = '', ...props }) {
  return (
    <span className={`badge badge--${variant}${className ? ' ' + className : ''}`} {...props}>
      {children}
    </span>
  );
}
