import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Container from '@/components/Container';
import ItemsGrid from '@/components/ItemsGrid';
import Button from '@/components/Button';
import { getItemsNeeded, getSiteContent } from '@/lib/content';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: `Items Needed | ${site.name}`,
    description: 'See our current food pantry wish list including urgent needs in food, personal care, and household supplies.',
  };
}

export default async function ItemsNeededPage() {
  const items = await getItemsNeeded();

  const urgentCount = Object.values(items)
    .flat()
    .filter((item) => item.urgent).length;

  return (
    <>
      <PageHeader
        eyebrow="Items Needed"
        title="Help stock the pantry"
        intro="Each donation makes an immediate difference for families visiting the pantry. Thank you for choosing a few items from this list during your next shopping trip."
      />

      <Section
        eyebrow="How to donate"
        title="Drop-off information"
        subtitle="Bring donations during open hours or call ahead for large deliveries."
        actions={
          <Button
            href="https://www.nrcommcare.org/items-needed.pdf"
            variant="secondary"
            className="no-print"
            target="_blank"
            rel="noreferrer"
          >
            Download printable list (PDF coming soon)
          </Button>
        }
      >
        <Container className="space-y-4 text-sm text-ink/70">
          <p>
            Please ensure items are in-date and unopened. We cannot accept homemade food or opened personal care products. For questions, email us or call the office during business hours.
          </p>
          <p>
            Urgent needs are marked and prioritized on this list. Right now we have <strong className="text-primary">{urgentCount}</strong> urgent items.
          </p>
        </Container>
      </Section>

      <Section eyebrow="Wish list" title="Current items needed">
        <Container className="items-print-grid">
          <ItemsGrid />
        </Container>
      </Section>
    </>
  );
}
