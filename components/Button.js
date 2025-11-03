'use client';

import Link from 'next/link';
import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const variants = {
  primary:
    'bg-primary text-white shadow-lg shadow-primary/40 hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-surface',
  secondary:
    'bg-accent/10 text-accent hover:bg-accent/20 focus-visible:ring-accent focus-visible:ring-offset-surface',
  ghost:
    'bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary focus-visible:ring-offset-surface',
};

export default function Button({
  href,
  variant = 'primary',
  className,
  children,
  icon: Icon,
  iconPosition = 'trailing',
  ...props
}) {
  const styles = clsx(baseStyles, variants[variant], className);

  const content = (
    <span className="flex items-center gap-2">
      {Icon && iconPosition === 'leading' ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon && iconPosition === 'trailing' ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {content}
    </button>
  );
}
