import Badge from './Badge';
import { getItemsNeeded } from '@/lib/content';

function sortItems(items = []) {
  return [...items].sort((a, b) => Number(b.urgent) - Number(a.urgent) || a.name.localeCompare(b.name));
}

export default async function ItemsGrid({ limit, showCategoryLabels = true }) {
  const items = await getItemsNeeded();
  const categories = Object.entries(items).map(([key, value]) => [key, sortItems(value)]);

  const flattened = categories.flatMap(([category, values]) =>
    values.map((item) => ({ ...item, category }))
  );

  const displayItems = typeof limit === 'number' ? flattened.slice(0, limit) : flattened;

  if (typeof limit === 'number') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayItems.map((item) => (
          <div
            key={`${item.category}-${item.name}`}
            className="rounded-2xl border border-ink/10 bg-muted/60 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-semibold text-ink">{item.name}</p>
              {item.urgent ? <Badge variant="accent">Urgent</Badge> : null}
            </div>
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {item.category.replace(/([A-Z])/g, ' $1').trim()}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map(([category, values]) => (
        <section key={category}>
          {showCategoryLabels ? (
            <h3 className="text-xl font-semibold text-ink">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
          ) : null}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm shadow-ink/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{item.name}</p>
                  {item.urgent ? <Badge variant="accent">Urgent</Badge> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
