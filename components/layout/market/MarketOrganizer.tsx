"use client";

import { useUserStore } from "@/lib/store/userStore";

type MarketOrganizerProps = {
  name: string;
  avatarUrl?: string | null;
  shopName?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
};

export default function MarketOrganizer({
  name,
  avatarUrl,
  shopName,
  city,
  phone,
  email,
}: MarketOrganizerProps) {
  const { user } = useUserStore();

  const isProfessional =
    user?.roles?.includes("EXPOSANT") ||
    user?.roles?.includes("ORGANISATEUR");

  if (!isProfessional) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Organisateur
      </p>

      <div className="mt-5 flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-50 text-lg font-semibold text-emerald-700">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Identité */}
        <div>
          <h2 className="font-semibold text-slate-900">
            {shopName || name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {city || "Organisateur de marché"}
          </p>
        </div>
      </div>

      {/* Contact */}
      {(phone || email) && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:shadow-md"
            >
              <span aria-hidden="true">📞</span>
              Appeler l'organisateur
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <span aria-hidden="true">✉️</span>
              Envoyer un e-mail
            </a>
          )}
        </div>
      )}

      {!phone && !email && (
        <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
          Les coordonnées de contact de l'organisateur ne sont pas
          renseignées.
        </p>
      )}
    </section>
  );
}