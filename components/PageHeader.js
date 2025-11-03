import Container from './Container';
import Badge from './Badge';

export default function PageHeader({ title, eyebrow, intro }) {
  return (
    <header className="bg-muted/70 py-14">
      <Container className="space-y-4">
        {eyebrow ? <Badge variant="neutral">{eyebrow}</Badge> : null}
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro ? <p className="max-w-3xl text-lg text-ink/70">{intro}</p> : null}
      </Container>
    </header>
  );
}
