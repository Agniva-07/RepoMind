import './Button.css';

/**
 * Button
 * @param {'primary'|'secondary'|'ghost'|'danger'} [variant='primary']
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 * @param {React.ReactNode} [icon] - optional left icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}${className ? ' ' + className : ''}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
