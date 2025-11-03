import clsx from 'clsx';

const variants = {
  default: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  neutral: 'bg-muted text-ink/80',
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
