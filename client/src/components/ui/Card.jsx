import './Card.css';

/**
 * Card — premium surface container
 * @param {boolean} [hoverable] - adds hover elevation effect
 * @param {boolean} [glow] - adds subtle gold glow on hover
 * @param {string} [padding] - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} [variant] - 'cream' | 'navy' | 'emerald' | 'burgundy' | 'charcoal' (default: 'cream')
 */
export default function Card({
  children,
  hoverable = false,
  glow = false,
  padding = 'md',
  variant = 'cream',
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card--pad-${padding}`,
    `card--variant-${variant}`,
    hoverable && 'card--hoverable',
    glow && 'card--glow',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
