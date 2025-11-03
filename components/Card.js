import clsx from 'clsx';

const variants = {
  default:
    'bg-surface shadow-sm shadow-ink/5 ring-1 ring-ink/5 hover:shadow-md hover:ring-primary/20 transition',
  highlight:
    'bg-primary text-white shadow-lg shadow-primary/40 ring-1 ring-primary/40',
};

export default function Card({
  as: Component = 'div',
  title,
  eyebrow,
  icon: Icon,
  variant = 'default',
  children,
  footer,
  className,
}) {
  return (
    <Component
      className={clsx(
        'flex h-full flex-col gap-4 rounded-2xl p-6',
        variants[variant],
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
        ) : null}
        <div className="space-y-1">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h3 className="text-lg font-semibold tracking-tight">
              {title}
            </h3>
          ) : null}
        </div>
      </div>
      <div className="flex-1 text-sm leading-relaxed text-ink/80 [&>*]:text-inherit">
        {children}
      </div>
      {footer ? <div className="pt-4 text-sm font-semibold">{footer}</div> : null}
    </Component>
  );
}
