import { formatDate, formatPrice } from "@/lib/utils";

type MarketPracticalInfoProps = {
  startAt: Date | string;
  endAt: Date | string;
  recurrence?: string;
  address?: string | null;
  zip?: string | null;
  city: string;
  price?: number | string | null;
};



const formatEventDate = (
    startAt: string | Date,
    endAt: string | Date,
    ) => {
    const start = new Date(startAt);
    const end = new Date(endAt);

    if (start.toDateString() === end.toDateString()) {
        return formatDate(start);
    }

    return (
<>
<span className="text-sm font-normal text-slate-400">
    Du
</span>
{"  "}
{formatDate(start)}
<br />
<span className="text-sm font-normal text-slate-400">
    au
</span>
{"  "}
{formatDate(end)}
</>
);
};

export default function MarketPracticalInfo({
  startAt,
  endAt,
  recurrence,
  address,
  zip,
  city,
  price
}: MarketPracticalInfoProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* TITLE */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Informations pratiques
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Préparez votre visite
                </h2>
            </div>
            
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* DATE EVENEMENT */}
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Date
                    </p>

                    <p className="mt-2 font-semibold capitalize text-slate-900">
                        {formatEventDate(startAt, endAt)}
                    </p>

                    {recurrence && recurrence !== "NONE" && (
                        <p className="mt-1 text-sm text-slate-500">
                        Événement récurrent
                        </p>
                    )}
                </div>
                {/* PRIX ENTREE */}
                <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Prix d'entrée
                    </p>

                    <p className="mt-2 text-lg font-semibold text-slate-900">
                    {formatPrice(price)}
                    </p>
                </div>
                {/* ADRESSE */}
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Adresse
                    </p>

                    <p className="mt-2 font-semibold text-slate-900">
                        {address || "Adresse non renseignée"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {zip ? `${zip} ` : ""}
                        {city}
                    </p>
                </div>

            </div>
        </section>
    );
}