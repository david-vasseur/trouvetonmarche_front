type MarketTag = {
	id: number;
	name: string;
	slug: string;
};

type MarketTagsProps = {
	tags: MarketTag[];
	externalUrl?: string | null;
};

export default function MarketTags({ tags, externalUrl}: MarketTagsProps) {
  
	if (!tags.length && !externalUrl) return null;

	return (
		<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
				Univers
			</p>

			<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
				Ce que vous trouverez
			</h2>

			{tags.length > 0 && (
				<div className="mt-5 flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
					key={tag.id}
					className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600"
					>
					#{tag.name}
					</span>
				))}
				</div>
			)}

			{externalUrl && (
				<div className="mt-6 border-t border-slate-100 pt-5">
				<a
					href={externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
				>
					Plus d'informations
					<span aria-hidden="true">↗</span>
				</a>
				</div>
			)}
		</section>
	);
}