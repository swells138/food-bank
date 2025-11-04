'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);
  const pathname = usePathname();

  // Close the sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll state for subtle shadow/border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open (iOS friendly)
  useEffect(() => {
    const { body } = document;
    if (!body) return;
    if (open) {
      const prev = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [open]);

  // Track header height via ResizeObserver
  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => setHeaderHeight(headerRef.current?.offsetHeight || 0);
    updateHeight();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateHeight());
      ro.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      ro?.disconnect();
    };
  }, []);

  // Optional alert banner support
  useEffect(() => {
    const el = () => document.getElementById('alert-banner');
    const update = () => setBannerHeight(el()?.offsetHeight || 0);
    update();

    const node = el();
    let ro;
    if (node && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(node);
    }

    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, []);

  const offset = headerHeight + bannerHeight;

  return (
    <header
      ref={headerRef}
      style={{ ['--offset'] : `${offset}px` }}
      className={clsx(
        'sticky top-0 z-40 w-full border-b border-transparent bg-surface/95 backdrop-blur',
        scrolled && 'border-ink/10 shadow-header',
        'relative'
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
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-6 text-sm font-medium text-ink/80">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Button href="/donate">Donate</Button>
              <Button href="/hours-and-contact" variant="secondary">
                Get Help
              </Button>
            </div>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="rounded-full border border-ink/10 p-2 text-ink transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
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

      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={clsx(
          'lg:hidden fixed inset-x-0 z-40 translate-y-0 transition-transform duration-200 ease-out',
          open ? 'translate-y-0' : '-translate-y-full'
        )}
        style={{ top: 'var(--offset)', height: 'calc(100dvh - var(--offset))' }}
      >
        <div className="h-full overflow-y-auto bg-surface px-4 pb-8 pt-3 text-base shadow-lg shadow-ink/10">
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
            <Button href="/hours-and-contact" variant="secondary" className="w-full" onClick={() => setOpen(false)}>
              Get Help
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
