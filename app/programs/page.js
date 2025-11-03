import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { getPrograms, getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `Programs | ${site.name}`,
    description: 'Explore food pantry services, Soup for the Spirit community meals, and seasonal support programs.',
  };
}

export default async function ProgramsPage() {
  const [site, programs] = await Promise.all([getSiteContent(), getPrograms()]);

  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Nourishing support for every neighbor"
        intro="Each program is designed with client choice, hospitality, and dignity in mind. Click below for details, eligibility information, and how to get involved."
      />

      <Section
        eyebrow="How it works"
        title="What to expect"
        subtitle="Bring a photo ID and proof of address (TODO: confirm documentation requirements). Our team will guide you through registration and shopping."
      >
        <Container className="space-y-6">
          {programs.map((program) => (
            <details key={program.slug} id={program.slug} className="group rounded-2xl border border-ink/15 bg-surface p-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-ink">
                <span>{program.title}</span>
                <span className="text-sm font-medium uppercase tracking-wide text-primary/70 group-open:text-accent">
                  Learn more
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-sm text-ink/75">
                <p>{program.short}</p>
                <p className="text-ink/70">
                  <strong className="font-semibold text-ink">Details:</strong> {program.details}
                </p>
                <p className="text-ink/70">
                  <strong className="font-semibold text-ink">Eligibility:</strong> {program.eligibility}
                </p>
                <p className="text-ink/70">
                  <strong className="font-semibold text-ink">Schedule:</strong> {program.times}
                </p>
              </div>
            </details>
          ))}
        </Container>
      </Section>

      <Section
        eyebrow="Get involved"
        title="Support these programs"
        subtitle="Donate ingredients, sign up to serve Soup for the Spirit, or sponsor seasonal events."
        actions={<Button href="/volunteer">Volunteer opportunities</Button>}
      >
        <Container className="space-y-4 text-sm text-ink/70">
          <p>
            Interested in hosting a food drive or underwriting a meal? Email us at{' '}
            <a href={`mailto:${site.email}`} className="font-semibold text-primary">
              {site.email}
            </a>{' '}
            for the latest needs list and scheduling details.
          </p>
          <p>
            Want to help Soup for the Spirit? Gather a team to prepare and serve dinner, donate desserts, or provide entertainment. (TODO: Add sign-up calendar once confirmed.)
          </p>
        </Container>
      </Section>
    </>
  );
}
