import Link from 'next/link';
import clsx from 'clsx';

export function IconCircle({ children }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      {children}
    </span>
  );
}

export default function IconRow({ items = [], className }) {
  return (
    <div className={clsx('grid gap-6 sm:grid-cols-2 md:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-muted/70 p-5">
          <IconCircle>{item.icon}</IconCircle>
          <div className="space-y-1">
            <p className="text-base font-semibold text-ink">{item.title}</p>
            <p className="text-sm text-ink/70">{item.description}</p>
            {item.href ? (
              <Link href={item.href} className="text-sm font-semibold text-primary">
                {item.linkLabel ?? 'Learn more'}
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
