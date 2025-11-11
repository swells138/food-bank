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
        title="Thank you for supporting Community Care and your North Ridgeville neighbors!
"
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <Container className="grid gap-10 md:grid-cols-2">
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
          <div className="grid sm:grid-cols-2 gap-6 justify-items-stretch w-full">
  {/* Card 1 */}
  <div className="flex flex-col items-start justify-start rounded-2xl bg-muted/30 p-5 shadow-sm w-full h-full">
    <div className="mb-3 text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 1.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 1.75Zm.75 9.94V6.5a.75.75 0 0 0-1.5 0V12a.75.75 0 0 0 .33.62l3.5 2.33a.75.75 0 1 0 .84-1.24Z" />
      </svg>
    </div>
    <h4 className="text-lg font-semibold text-ink mb-1">Pantry hours</h4>
    <p className="text-ink/70 text-sm leading-relaxed">
      {site.hours.map((hour) => `${hour.day}: ${hour.open} – ${hour.close}`).join(' • ')}
    </p>
  </div>

  {/* Card 2 */}
  <div className="flex flex-col items-start justify-start rounded-2xl bg-muted/30 p-5 shadow-sm w-full h-full">
    <div className="mb-3 text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v7.5a2.75 2.75 0 0 1-2.75 2.75h-.5A2.75 2.75 0 0 1 15 19.75h-2a2.75 2.75 0 0 1-2.75-2.75h-.5A2.75 2.75 0 0 1 7 14.25H5.75A2.75 2.75 0 0 1 3 11.5Z" />
      </svg>
    </div>
    <h4 className="text-lg font-semibold text-ink mb-1">Curbside donations</h4>
    <p className="text-ink/70 text-sm leading-relaxed">
      Pull up to the side entrance. Volunteers can help unload on days the pantry is open.
    </p>
  </div>
</div>

        </Container>
      </Section>
    </>
  );
}
