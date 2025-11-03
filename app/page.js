import Script from 'next/script';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ItemsGrid from '@/components/ItemsGrid';
import StatsRow from '@/components/StatsRow';
import Container from '@/components/Container';
import IconRow from '@/components/IconRow';
import { getDonateContent, getImpactStats, getPrograms, getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: site.name,
    description: site.tagline,
  };
}

export default async function Home() {
  const [site, programs, donateCopy, impact] = await Promise.all([
    getSiteContent(),
    getPrograms(),
    getDonateContent(),
    getImpactStats(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    description: site.tagline,
    url: 'https://www.nrcommcare.org/',
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'North Ridgeville',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    sameAs: Object.values(site.social ?? {}).filter(Boolean),
  };

  return (
    <>
      <Script type="application/ld+json" id="org-jsonld">
        {JSON.stringify(jsonLd)}
      </Script>
      <Hero
        title="Helping neighbors thrive with dignity"
        subtitle="We provide nutritious food, caring connections, and resources for families across North Ridgeville. Join us in meeting urgent needs."
        ctaPrimary={{ label: 'Donate', href: '/donate' }}
        ctaSecondary={{ label: 'Get Help', href: '/hours-and-contact' }}
        imageSrc="/images/hero-illustration.svg"
      />

      <Section
        eyebrow="Support the mission"
        title="How you can make an immediate difference"
        subtitle="Every gift of time, food, or funds keeps our shelves stocked and our doors open to neighbors who rely on us."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card
            title="Give today"
            eyebrow="Donate"
            footer={<Button href="/donate">Donate online</Button>}
          >
            <p>
              Your generosity sustains pantry programs, emergency assistance, and warm meals like Soup for the Spirit.
            </p>
          </Card>
          <Card
            title="Share your time"
            eyebrow="Volunteer"
            footer={<Button href="/volunteer">See volunteer roles</Button>}
          >
            <p>
              From sorting donations to greeting guests, every volunteer shifts the load and brightens someone’s day.
            </p>
          </Card>
         
        </div>
      </Section>

      <Section
        eyebrow="Top needs"
        title="Items we need most this week"
        subtitle="Thank you for choosing a few items from this list when you shop. Urgent needs rise to the top so we can restock quickly."
        actions={<Button href="/items-needed" variant="ghost">Full list</Button>}
      >
        <ItemsGrid limit={9} showCategoryLabels={false} />
      </Section>

      

      <Section
        eyebrow="Programs"
        title="Programs that nourish and connect"
        subtitle="Here’s a quick look at what we offer. Explore them all or share with a neighbor who could benefit."
        actions={<Button href="/programs">All programs</Button>}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.slug} title={program.title} eyebrow="Community support">
              <p className="text-sm text-ink/70">{program.short}</p>
              <Button href={`/programs#${program.slug}`} variant="ghost" className="mt-4 w-fit">
                Program details
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Visit"
        title="Stop by during open pantry hours"
        subtitle="We’re located in the heart of North Ridgeville with easy parking and a welcoming lobby."
        actions={<Button href="/hours-and-contact">Hours & directions</Button>}
      >
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-ink">{site.address}</h3>
            <p className="text-ink/70">
              Call us at{' '}
              <a href={`tel:${site.phone?.replace(/[^\d+]/g, '') ?? ''}`} className="font-semibold text-primary">
                {site.phone}
              </a>{' '}
              or email{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary">
                {site.email}
              </a>
              .
            </p>
            <Button href="https://maps.google.com/?q=North+Ridgeville+Community+Care" variant="secondary">
              Open in Google Maps
            </Button>
          </div>
          <IconRow
            items={[
              {
                title: 'Pantry hours',
                description: site.hours
                  .map((hour) => `${hour.day}: ${hour.open} – ${hour.close}`)
                  .join(' • '),
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M12 1.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 1.75Zm.75 9.94V6.5a.75.75 0 0 0-1.5 0V12a.75.75 0 0 0 .33.62l3.5 2.33a.75.75 0 1 0 .84-1.24Z" />
                  </svg>
                ),
              },
              {
                title: 'Curbside donations',
                description: 'Pull up to the main entrance. Volunteers can help unload weekdays before closing.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v7.5a2.75 2.75 0 0 1-2.75 2.75h-.5A2.75 2.75 0 0 1 15 19.75h-2a2.75 2.75 0 0 1-2.75-2.75h-.5A2.75 2.75 0 0 1 7 14.25H5.75A2.75 2.75 0 0 1 3 11.5Z" />
                  </svg>
                ),
              },
              {
                title: 'Questions?',
                description: donateCopy.copy?.impact ?? 'Call or email us to talk through how you can help.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 2a10 10 0 0 0-7.07 17.07l-.84 3a1 1 0 0 0 1.23 1.23l3-.84A10 10 0 1 0 12 2Zm-1 5a1 1 0 1 1 2 0v1.67a1 1 0 0 1-.3.71l-1.4 1.4a1 1 0 0 0-.3.71V12a1 1 0 1 1-2 0v-.8a2 2 0 0 1 .59-1.41L11 8.67Zm1 9.75a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 16.75Z" />
                  </svg>
                ),
              },
            ]}
            className="gap-5"
          />
        </Container>
      </Section>
    </>
  );
}
