import Container from './Container';

export default function Section({
  title,
  subtitle,
  eyebrow,
  children,
  className = '',
  actions,
}) {
  return (
    <section className={`py-14 sm:py-20 ${className}`}>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
            ) : null}
            {subtitle ? <p className="text-lg text-ink/70">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-4">{actions}</div> : null}
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
