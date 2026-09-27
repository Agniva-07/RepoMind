import './Input.css';

/**
 * Input — styled text input with optional label and icon
 */
export default function Input({
  label,
  id,
  icon,
  error,
  hint,
  className = '',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className={`input-group${className ? ' ' + className : ''}`}>
      {label && (
        <label className="input-group__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={`input-group__wrapper${error ? ' input-group__wrapper--error' : ''}`}>
        {icon && (
          <span className="input-group__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className="input-group__input"
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="input-group__hint">
          {hint}
        </p>
      )}
    </div>
  );
}
