'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
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

function MobileMenuPortal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted || !open) return null;

  const overlay = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[2147483647] md:hidden"
    >
      {/* Opaque background that blocks everything */}
      <div className="absolute inset-0 bg-surface" aria-hidden="true" />

      {/* Close button — fixed position, large tap area */}
      <button
        className="fixed right-3 top-3 z-[2147483647] h-12 w-12 rounded-full border border-ink/10 bg-surface/90 text-ink shadow-sm backdrop-blur
                   hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface
                   touch-manipulation"
        onClick={onClose}
        aria-label="Close menu"
        style={{
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)', // prevents weird tap offset on iOS
        }}
      >
        <svg
          className="mx-auto h-6 w-6 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Menu content */}
      <div className="relative z-[2147483647] mx-auto flex h-full w-full max-w-7xl flex-col px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/90 hover:text-primary"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/donate" className="mt-4 w-full" onClick={onClose}>
            Donate
          </Button>
          <Button href="/hours-and-contact" variant="secondary" className="w-full" onClick={onClose}>
            Get Help
          </Button>
        </nav>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}


export default function Header({ site }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]); // close when route changes

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full border-b border-transparent bg-surface/95 backdrop-blur',
        scrolled && 'border-ink/10 shadow-header'
      )}
    >
      <Container className="flex flex-col gap-3 py-3 sm:gap-4 sm:py-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site?.name ?? 'Site'} home`}>
            <Image src="/images/logo.svg" alt="NR Community Care logo" width={48} height={48} />
            <div className="text-left">
              <p className="text-base font-semibold leading-tight text-ink sm:text-lg">{site?.name}</p>
              <p className="hidden text-xs font-semibold uppercase tracking-wide text-primary sm:block">{site?.tagline}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="!hidden items-center gap-6 md:!flex">
            <nav className="flex items-center gap-6 text-sm font-medium text-ink/80">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Button href="/donate">Donate</Button>
              <Button href="/hours-and-contact" variant="secondary">Get Help</Button>
            </div>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="md:hidden rounded-full border border-ink/10 p-2 text-ink transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface z-50"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Quick actions on mobile */}
        <div className="flex w-full gap-2 sm:hidden">
          <Button href="/donate" size="sm" className="flex-1">Donate</Button>
          <Button href="/hours-and-contact" variant="secondary" size="sm" className="flex-1">Get Help</Button>
        </div>
      </Container>

      {/* Render the overlay OUTSIDE the header via portal */}
      <MobileMenuPortal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
