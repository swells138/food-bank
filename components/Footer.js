import Link from 'next/link';
import Container from './Container';

export default function Footer({ site }) {
  const { name, address, phone, email, hours, social } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-muted/60 py-12 text-sm">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-ink">{name}</p>
          <p className="text-ink/70">{address}</p>
          <p className="text-ink/70">
            <a href={`tel:${phone?.replace(/[^\d+]/g, '') ?? ''}`} className="hover:text-primary">
              {phone}
            </a>
          </p>
          <p className="text-ink/70">
            <a href={`mailto:${email}`} className="hover:text-primary">
              {email}
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-ink">Hours</h3>
          <ul className="mt-3 space-y-1 text-ink/70">
            {hours?.map((hour) => (
              <li key={hour.day} className="flex justify-between gap-4">
                <span>{hour.day}</span>
                <span>
                  {hour.open} – {hour.close}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold uppercase tracking-wide text-ink">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-ink/70">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/items-needed">Items Needed</Link>
            <Link href="/volunteer">Volunteer</Link>
            <Link href="/donate">Donate</Link>
          </nav>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold uppercase tracking-wide text-ink">Stay Connected</h3>
          <ul className="space-y-2 text-ink/70">
            {social?.facebook ? (
              <li>
                <Link href={social.facebook} target="_blank" rel="noreferrer" className="hover:text-primary">
                  Facebook
                </Link>
              </li>
            ) : null}
            {social?.instagram ? (
              <li>
                <Link href={social.instagram} target="_blank" rel="noreferrer" className="hover:text-primary">
                  Instagram
                </Link>
              </li>
            ) : null}
          </ul>
          <p className="text-xs text-ink/60">
            &copy; {year} {name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
