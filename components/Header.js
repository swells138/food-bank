'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Button from './Button';
import Container from './Container';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/items-needed', label: 'Items Needed' },
  { href: '/hours-and-contact', label: 'Get Help' },
  { href: '/volunteer', label: 'Volunteer' },
];

export default function Header({ site }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full border-b border-transparent bg-surface/95 backdrop-blur',
        scrolled ? 'border-ink/10 shadow-header' : '',
        'relative'
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image src="/images/logo.svg" alt="NR Community Care logo" width={48} height={48} />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{site.tagline}</p>
            <p className="text-lg font-semibold text-ink">{site.name}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/donate">Donate</Button>
          <Button href="/hours-and-contact" variant="secondary">
            Get Help
          </Button>
        </div>
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-6 w-6 text-ink"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </Container>
      <div
        id="mobile-menu"
        className={clsx(
          'absolute inset-x-0 top-full lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={clsx(
            'max-h-[calc(100vh-5rem)] overflow-y-auto bg-surface px-4 pb-6 pt-2 text-base shadow-lg shadow-ink/10 transition-transform',
            open ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink/90 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/donate" className="w-full" onClick={() => setOpen(false)}>
              Donate
            </Button>
            <Button
              href="/hours-and-contact"
              variant="secondary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Get Help
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
