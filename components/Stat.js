const formatter = new Intl.NumberFormat('en-US');

export default function Stat({ value, label, suffix = '' }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-surface px-6 py-8 text-center shadow-sm shadow-ink/5">
      <p className="text-4xl font-bold text-primary">
        {formatter.format(value)}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-ink/60">{label}</p>
    </div>
  );
}
