import Image from 'next/image';
import Button from './Button';
import Container from './Container';

export default function Hero({ title, subtitle, ctaPrimary, ctaSecondary, imageSrc }) {
  return (
    <section className="bg-surface">
      <Container className="grid items-center gap-12 pb-16 pt-12 lg:grid-cols-2 lg:py-20">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Neighbors helping neighbors</p>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="text-lg text-ink/80">{subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {ctaPrimary ? (
              <Button href={ctaPrimary.href} variant="primary">
                {ctaPrimary.label}
              </Button>
            ) : null}
            {ctaSecondary ? (
              <Button href={ctaSecondary.href} variant="secondary">
                {ctaSecondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-xl shadow-primary/10">
          <Image
            src={imageSrc}
            alt="Volunteers serving neighbors at the food pantry"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
