import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import VolunteerForm from '@/components/VolunteerForm';
import { getSiteContent, getVolunteerContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `Volunteer | ${site.name}`,
    description: 'Sign up to serve in the pantry, Soup for the Spirit, or special events. No experience required.',
  };
}

function FAQ({ faqs = [] }) {
  if (!faqs.length) return null;
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded-2xl border border-ink/15 bg-muted/60 p-4">
          <summary className="cursor-pointer text-base font-semibold text-ink">{faq.question}</summary>
          <p className="mt-2 text-sm text-ink/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default async function VolunteerPage() {
  const [site, volunteer] = await Promise.all([getSiteContent(), getVolunteerContent()]);

  return (
    <>
      <PageHeader
        eyebrow="Volunteer"
        title="Share your time, share hope"
        intro="Whether you can serve weekly or once a month, we’ll match you with a meaningful role. Training is provided and schedules are flexible."
      />

      <Section
        eyebrow="Roles"
        title="High-impact volunteer opportunities"
        subtitle="Let us know what interests you. We’ll reach out to set up a tour and training."
      >
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteer.roles.map((role) => (
            <Card key={role.title} title={role.title} eyebrow={role.time}>
              <p className="text-sm text-ink/70">{role.desc}</p>
            </Card>
          ))}
        </Container>
      </Section>

      <Section
        eyebrow="Sign up"
        title="Tell us you’re interested"
        subtitle="We’ll send you a welcome packet, background check information if required, and upcoming training dates."
      >
        <Container className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <Suspense fallback={<p className="text-sm text-ink/60">Loading form…</p>}>
            <VolunteerForm email={volunteer.cta.email} subject={volunteer.cta.subject} />
          </Suspense>
          <Card title="Group volunteering">
            <p className="text-sm text-ink/70">
              Bring coworkers, classmates, or club members for a custom volunteer day. Tell us about your group size and preferred dates.
            </p>
            <Button
              href={`mailto:${volunteer.cta.email}?subject=${encodeURIComponent('Group Volunteering – NR Community Care')}`}
              variant="secondary"
              className="mt-4"
            >
              Email our team
            </Button>
          </Card>
        </Container>
      </Section>

      <Section eyebrow="FAQs" title="Frequently asked questions">
        <Container>
          <FAQ faqs={volunteer.faqs} />
        </Container>
      </Section>
    </>
  );
}
