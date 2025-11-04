import Link from 'next/link';
import Container from './Container';
import Badge from './Badge';

export default function AlertBanner({ urgentItem }) {
  if (!urgentItem) {
    return null;
  }

  return (
    <div
      id="alert-banner"
      className="border-b border-primary/20 bg-primary/5 py-3 text-sm text-primary"
    >
      <Container className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="accent">Urgent Need</Badge>
          <p>
            We are especially low on <span className="font-semibold">{urgentItem.name}</span>. Thank you for dropping off donations!
          </p>
        </div>
        <Link href="/items-needed" className="font-semibold underline underline-offset-4">
          View all needed items
        </Link>
      </Container>
    </div>
  );
}
