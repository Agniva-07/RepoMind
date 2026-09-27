import './Card.css';

/**
 * Card — glass surface container
 * @param {boolean} [hoverable] - adds hover elevation effect
 * @param {boolean} [glow] - adds subtle cyan glow on hover
 * @param {string} [padding] - 'sm' | 'md' | 'lg' (default: 'md')
 */
export default function Card({
  children,
  hoverable = false,
  glow = false,
  padding = 'md',
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card--pad-${padding}`,
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
