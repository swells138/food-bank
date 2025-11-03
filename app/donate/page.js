import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { getDonateContent, getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `Donate | ${site.name}`,
    description: 'Give online, become a monthly donor, or explore corporate giving opportunities.',
  };
}

export default async function DonatePage() {
  const [site, donate] = await Promise.all([getSiteContent(), getDonateContent()]);

  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Every dollar keeps the pantry open"
        intro="Community gifts provide fresh produce, shelf-stable staples, hygiene products, and direct support for families experiencing hardship."
      />

      <Section
        eyebrow="Give today"
        title="Choose the way you give"
        subtitle="Online gifts are the fastest way to help. Prefer to mail a check or give in person? Call us at the number below and we’ll assist."
      >
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {donate.portals.map((portal) => (
            <Card key={portal.label} title={portal.label}>
              <p className="text-sm text-ink/70">{donate.copy.why}</p>
              <Button
                href={portal.url}
                className="mt-4 w-full"
                target="_blank"
                rel="noreferrer"
              >
                Give now
              </Button>
            </Card>
          ))}
        </Container>
      </Section>

      <Section
        eyebrow="Impact"
        title="Your generosity in action"
        subtitle="We steward every donation carefully and keep administrative costs low."
      >
        <Container className="grid gap-6 md:grid-cols-2">
          <Card title="Where funds go">
            <ul className="space-y-2 text-sm text-ink/70">
              <li>Food purchases to supplement donated items</li>
              <li>Emergency financial assistance (utilities, prescriptions)</li>
              <li>Client-choice pantry operations and case management</li>
              <li>Seniors-at-home deliveries and Soup for the Spirit meals</li>
            </ul>
          </Card>
          <Card title="Multiply your impact">
            <p className="text-sm text-ink/70">{donate.copy.impact}</p>
            <p className="mt-3 text-sm text-ink/70">{donate.copy.matching}</p>
            <p className="mt-3 text-sm text-ink/70">{donate.copy.recurring}</p>
          </Card>
        </Container>
      </Section>

      <Section
        eyebrow="Corporate & group giving"
        title="Partner with us"
        subtitle="Local businesses, congregations, and civic groups amplify our mission year-round."
      >
        <Container className="space-y-4 text-sm text-ink/70">
          <p>{donate.copy.corporate}</p>
          <p>
            Request a pantry tour or giving toolkit by emailing{' '}
            <a href={`mailto:${site.email}`} className="font-semibold text-primary">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
