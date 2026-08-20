
type OpeningHour = {
    date: string | Date;
    openAt: string;
    closeAt: string;
};

type MarketOpeningHoursProps = {
    openingHours: OpeningHour[];
};

const formatDay = (date: string | Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
    }).format(new Date(date));
};

export default function MarketOpeningHours({ openingHours }: MarketOpeningHoursProps) {
  
  	if (!openingHours.length) return null;

	const sortedHours = [...openingHours].sort(
		(a, b) =>
		new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return (
		<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
				Horaires
			</p>

			<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
				Horaires d'ouverture
			</h2>

			<div className="mt-6 divide-y divide-slate-100">
				{sortedHours.map((hour) => (
				<div
					key={new Date(hour.date).toISOString()}
					className="flex items-center justify-between gap-4 py-3 text-sm"
				>
					<span className="font-medium capitalize text-slate-700">
					{formatDay(hour.date)}
					</span>

					<span className="whitespace-nowrap text-slate-500">
					{hour.openAt} — {hour.closeAt}
					</span>
				</div>
				))}
			</div>
		</section>
	);
}

