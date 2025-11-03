import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import IconRow from '@/components/IconRow';
import ContactForm from '@/components/ContactForm';
import Button from '@/components/Button';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `Hours & Contact | ${site.name}`,
    description:
      'Find pantry hours, directions, and how to connect for assistance at North Ridgeville Community Care.',
  };
}

const steps = [
  'Call or email to confirm pantry hours and documentation requirements.',
  'Bring a photo ID and proof of address for each adult in the household. (Verify requirements.)',
  'On your first visit, meet with a volunteer to review eligibility and complete registration.',
  'Shop the market-style pantry with guidance from volunteers and staff.',
];

export default async function HoursAndContactPage() {
  const site = await getSiteContent();
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address || 'North Ridgeville Community Care'
  )}`;
  const tel = (site.phone || '').replace(/[^\d+]/g, '');

  return (
    <>
      <PageHeader
        eyebrow="Get Help"
        title="Visit, call, or email us"
        intro="We are ready to welcome you. Reach out if you have questions about eligibility, documentation, or how to donate."
      />

      <Section
        title="Hours and directions"
        subtitle="Visit us during open pantry hours or schedule an appointment for assistance."
      >
        <Container className="grid gap-8 md:grid-cols-[2fr_3fr]">
          <Card title="Visit us" eyebrow="Location">
            <p className="text-sm text-ink/70">{site.address}</p>

            <p className="mt-2 text-sm text-ink/70">
              Phone:{' '}
              <a href={`tel:${tel}`} className="font-semibold text-primary">
                {site.phone}
              </a>
            </p>

            <p className="text-sm text-ink/70">
              Email:{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary">
                {site.email}
              </a>
            </p>

            <Button href={mapHref} variant="secondary" className="mt-4" aria-label="Open address in Google Maps">
              Open Google Maps
            </Button>
          </Card>

          <Card title={site.hoursLabel || 'Weekly hours'} eyebrow="Pantry schedule">
            <div className="overflow-hidden rounded-xl border border-ink/10">
              <table className="w-full text-left text-sm text-ink/70">
                <caption className="sr-only">Open hours by day</caption>
                <tbody>
                  {site.hours?.map((hour) => (
                    <tr key={hour.day} className="border-b border-ink/10 last:border-none">
                      <th scope="row" className="py-2 pr-4 font-semibold text-ink">
                        {hour.day}
                      </th>
                      <td className="py-2">
                        {hour.open} – {hour.close}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {site.hoursNote ? (
              <div
                className="mt-4 rounded-lg border border-ink/10 bg-muted/60 p-3 text-sm text-ink/80"
                role="note"
                aria-label="Closures and emergencies"
              >
                {site.hoursNote}
              </div>
            ) : null}
          </Card>
        </Container>
      </Section>

      <Section eyebrow="Before you visit" title="How to get help">
        <Container className="grid gap-8 md:grid-cols-2">
          <Card title="Steps for new clients">
            <ol className="space-y-3 text-sm text-ink/70">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Parking & drop-off">
            <p className="text-sm text-ink/70">
              Parking is available in the main lot behind the building. Follow signage for client entrance and
              donation drop-off. Volunteers can assist with unloading during open hours.
            </p>
            <p className="mt-3 text-sm text-ink/70">
              For after-hours donations, please call to schedule a time so we can ensure proper storage.
            </p>
          </Card>
        </Container>
      </Section>

      <Section eyebrow="Contact" title="Send us a message">
        <Container className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <ContactForm email={site.email} subject="Pantry Question" />

         
        </Container>
      </Section>
    </>
  );
}
