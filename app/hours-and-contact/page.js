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
    description: 'Find pantry hours, directions, and how to connect for assistance at North Ridgeville Community Care.',
  };
}

const steps = [
  'Call or email to confirm pantry hours and documentation requirements.',
  'Bring a photo ID and proof of address for each adult in the household. (TODO: verify requirements).',
  'On your first visit, meet with a volunteer to review eligibility and complete registration.',
  'Shop the market-style pantry with guidance from volunteers and staff.',
];

export default async function HoursAndContactPage() {
  const site = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Get Help"
        title="Visit, call, or email us"
        intro="We are ready to welcome you. Reach out if you have questions about eligibility, documentation, or how to donate."
      />

      <Section title="Hours and directions" subtitle="Visit us during open pantry hours or schedule an appointment for assistance.">
        <Container className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <Card title="Visit us" eyebrow="Location">
            <p className="text-sm text-ink/70">{site.address}</p>
            <p className="mt-2 text-sm text-ink/70">
              Phone:{' '}
              <a href={`tel:${site.phone?.replace(/[^\d+]/g, '') ?? ''}`} className="font-semibold text-primary">
                {site.phone}
              </a>
            </p>
            <p className="text-sm text-ink/70">
              Email:{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary">
                {site.email}
              </a>
            </p>
            <Button href="https://maps.google.com/?q=North+Ridgeville+Community+Care" variant="secondary" className="mt-4">
              Open Google Maps
            </Button>
          </Card>
          <Card title="Weekly hours" eyebrow="Pantry schedule">
            <table className="w-full text-left text-sm text-ink/70">
              <tbody>
                {site.hours.map((hour) => (
                  <tr key={hour.day} className="border-b border-ink/10 last:border-none">
                    <th className="py-2 pr-4 font-semibold text-ink">{hour.day}</th>
                    <td className="py-2">{hour.open} – {hour.close}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-ink/50">(TODO: add holiday closures and special distribution times.)</p>
          </Card>
        </Container>
      </Section>

      <Section eyebrow="Before you visit" title="How to get help">
        <Container className="grid gap-8 lg:grid-cols-2">
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
              Parking is available in the main lot behind the building. Follow signage for client entrance and donation drop-off. Volunteers can assist with unloading during open hours.
            </p>
            <p className="mt-3 text-sm text-ink/70">
              For after-hours donations, please call to schedule a time so we can ensure proper storage.
            </p>
          </Card>
        </Container>
      </Section>

      <Section eyebrow="Contact" title="Send us a message">
        <Container className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <ContactForm email={site.email} subject="Pantry Question" />
          <IconRow
            items={[
              {
                title: 'Volunteer questions',
                description: 'Email us about volunteer opportunities or call to talk through schedules.',
                href: '/volunteer',
                linkLabel: 'Volunteer info',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 2a10 10 0 0 0-7.07 17.07l-.84 3a1 1 0 0 0 1.23 1.23l3-.84A10 10 0 1 0 12 2Zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 7Zm2 9H10a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Z" />
                  </svg>
                ),
              },
              {
                title: 'Donate food or funds',
                description: 'See the latest wish list, schedule a drive, or make an online donation.',
                href: '/donate',
                linkLabel: 'Ways to give',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 3c-4.97 0-9 3.58-9 8s4.03 8 9 8 9-3.58 9-8-4.03-8-9-8Zm1 11.93V16a1 1 0 1 1-2 0v-1a1 1 0 1 1 2 0v.07c1.07-.2 2-.78 2-1.57 0-1.02-1.17-1.5-2.57-1.93C11.26 11.16 10 10.75 10 9.5c0-.92.74-1.67 1.79-1.91V7a1 1 0 1 1 2 0v.58c.86.2 1.54.73 1.83 1.42a1 1 0 0 1-1.83.81c-.14-.32-.58-.64-1.17-.64-.72 0-1.12.32-1.12.61 0 .37.94.67 1.69.88 1.64.46 3.31 1.03 3.31 2.63 0 1.22-1.07 2.2-2.5 2.52Z" />
                  </svg>
                ),
              },
              {
                title: 'Community referrals',
                description: 'Need housing, utility, or health resources? We’ll connect you to trusted partners.',
                href: '/programs',
                linkLabel: 'See programs',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 4a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm1 12.93V18a1 1 0 1 1-2 0v-1a1 1 0 1 1 2 0v.07A6 6 0 1 1 12 6a6 6 0 0 1 1 11.93ZM12 7a1 1 0 0 1 1 1v2.59l1.7 1.7a1 1 0 0 1-1.4 1.42l-2-2A1 1 0 0 1 11 11V8a1 1 0 0 1 1-1Z" />
                  </svg>
                ),
              },
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
