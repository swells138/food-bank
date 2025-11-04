'use client';

import { useEffect, useRef, useState } from 'react';
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
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);

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

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    let observer;

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setHeaderHeight(entry.contentRect.height);
        }
      });

      observer.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    const bannerElement = () => document.getElementById('alert-banner');

    const updateBannerHeight = () => {
      const element = bannerElement();
      setBannerHeight(element ? element.offsetHeight : 0);
    };

    updateBannerHeight();

    let observer;
    const element = bannerElement();
    if (element && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateBannerHeight);
      observer.observe(element);
    }

    window.addEventListener('resize', updateBannerHeight);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', updateBannerHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        'sticky top-0 z-40 w-full border-b border-transparent bg-surface/95 backdrop-blur',
        scrolled ? 'border-ink/10 shadow-header' : '',
        'relative'
      )}
    >
      <Container className="flex flex-col gap-3 py-3 sm:gap-4 sm:py-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/images/logo.svg" alt="NR Community Care logo" width={48} height={48} />
            <div className="text-left">
              <p className="text-base font-semibold leading-tight text-ink sm:text-lg">{site.name}</p>
              <p className="hidden text-xs font-semibold uppercase tracking-wide text-primary sm:block">{site.tagline}</p>
            </div>
          </Link>
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
          <button
            type="button"
            className="rounded-full border border-ink/10 p-2 text-ink transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-6 w-6"
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
        </div>
        <div className="flex w-full gap-2 sm:hidden">
          <Button href="/donate" size="sm" className="flex-1">
            Donate
          </Button>
          <Button href="/hours-and-contact" variant="secondary" size="sm" className="flex-1">
            Get Help
          </Button>
        </div>
      </Container>
      <div
        id="mobile-menu"
        className={clsx(
          'lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className={clsx(
            'fixed inset-x-0 z-30 overflow-y-auto bg-surface px-4 pb-6 pt-2 text-base shadow-lg shadow-ink/10 transition-transform duration-200 ease-out',
            open ? 'translate-y-0' : '-translate-y-full'
          )}
          style={{
            top: headerHeight + bannerHeight,
            maxHeight: `calc(100vh - ${headerHeight + bannerHeight}px)`,
          }}
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
