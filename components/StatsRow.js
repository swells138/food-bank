import Stat from './Stat';

export default function StatsRow({ stats = [] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
