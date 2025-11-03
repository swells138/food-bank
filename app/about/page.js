import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `About ${site.name}`,
    description: 'Learn how our pantry began, the neighbors we serve, and the partners who make this work possible.',
  };
}

const timeline = [
  {
    year: '1986',
    title: 'Doors open',
    description:
      'A small group of volunteers began distributing emergency food boxes from a church basement to care for laid-off workers.',
  },
  {
    year: '1998',
    title: 'Community partnership',
    description:
      'Local congregations, schools, and civic clubs joined forces to expand pantry hours and launch our first holiday basket drive.',
  },
  {
    year: '2012',
    title: 'Soup for the Spirit',
    description:
      'We launched a weekly sit-down meal where neighbors can share a warm dinner and meet with resource navigators.',
  },
  {
    year: '2020',
    title: 'Drive-thru support',
    description:
      'Volunteers reimagined distribution to keep families safe during the pandemic while maintaining client choice.',
  },
];

const serviceArea = [
  'North Ridgeville and surrounding Lorain County communities',
  'Families navigating financial hardship or food insecurity',
  'Older adults and caregivers needing supplemental groceries',
  'Neighbors experiencing job loss, medical crises, or unexpected expenses',
];

const partners = [
  'Greater Cleveland Food Bank',
  'Local farms and grocers (TODO: add names)',
  'Faith partners and service clubs (TODO: update list)',
  'City of North Ridgeville and civic leaders',
];

export default async function AboutPage() {
  const site = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`Caring for neighbors since 1986`}
        intro="North Ridgeville Community Care is a volunteer-powered food pantry and support center. We work alongside local partners to ensure every neighbor is nourished, respected, and connected to resources."
      />

      <Section
        eyebrow="Mission"
        title="Our mission"
        subtitle="We provide food, emergency assistance, and compassionate support to anyone in North Ridgeville facing hardship."
      >
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lg text-ink/75">
            <p>
              Guided by generous donors and more than 200 volunteers each year, we serve hundreds of families through weekly pantry distributions, Soup for the Spirit meals, and seasonal assistance programs.
            </p>
            <p>
              We believe hospitality and dignity are essential. Clients shop in a market-style environment, meet one-on-one with advocates, and are welcomed regardless of background or circumstance.
            </p>
            <Button href="/programs" variant="secondary">
              Explore our programs
            </Button>
          </div>
          <Card title="Who we serve" eyebrow="Service area">
            <ul className="space-y-3 text-sm text-ink/70">
              {serviceArea.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      <Section eyebrow="Timeline" title="A story of neighbors helping neighbors">
        <div className="grid gap-6 md:grid-cols-2">
          {timeline.map((milestone) => (
            <Card key={milestone.year} title={`${milestone.year} – ${milestone.title}`}>
              <p className="text-sm text-ink/70">{milestone.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Partners"
        title="Powered by our partners"
        subtitle="We are grateful for churches, businesses, schools, and civic leaders who keep shelves stocked and programs thriving."
      >
        <Container className="grid gap-6 md:grid-cols-2">
          <Card title="Community partners">
            <ul className="space-y-2 text-sm text-ink/70">
              {partners.map((partner) => (
                <li key={partner}>{partner}</li>
              ))}
            </ul>
          </Card>
          <Card title="Volunteer leadership">
            <p className="text-sm text-ink/70">
              A volunteer board of directors provides governance and vision. (TODO: List current board and staff leaders with contact information.)
            </p>
            <p className="mt-3 text-sm text-ink/70">
              Interested in serving on a committee or sharing your expertise? Email us at{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary">
                {site.email}
              </a>
              .
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
