"use client";

import { useForm } from "@tanstack/react-form";

import {
  marketExhibitorSchema,
  type MarketExhibitorValues,
} from "@/schema/market/market.schema";

type Props = {
  onPrevious: () => void;
  onNext: (value: MarketExhibitorValues) => void;
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

const selectClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function MarketExhibitorForm({
  onPrevious,
  onNext,
}: Props) {
  const form = useForm({
    defaultValues: {
      exhibitors: null,
      registrationsOpen: true,
      standSizes: [],
      electricity: "NONE",
      barnum: "OPTIONAL",
      parkingAvailability: "NONE",
      parkingFree: false,
      price: null,
      standPrice: null,
      history: 0,
      visitors: null,
      marketType: "EXTERIOR"
    } as MarketExhibitorValues,

    validators: {
      onChange: marketExhibitorSchema,
    },

    onSubmit: async ({ value }) => {
      onNext(value);
    },
  });

    return (
        <form
        onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
        }}
        className="space-y-8"
        >
            {/* Exposants & visiteurs */}
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Nombre d'exposants */}
                <form.Field name="exhibitors">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-slate-700"
                        >
                        Nombre d'exposants
                        </label>

                        <input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                            const value = event.target.value;

                            field.handleChange(
                            value === "" ? null : Number(value)
                            );
                        }}
                        placeholder="Ex. 50"
                        className={`${inputClassName} mt-2`}
                        />
                    </div>
                    )}
                </form.Field>
                {/* Nombre de visiteurs attendu */}
                <form.Field name="visitors">
                    {(field) => (
                        <div>
                        <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-slate-700"
                        >
                            Nombre de visiteurs
                        </label>

                        <input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min="0"
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(
                                event.target.value === ""
                                ? null
                                : Number(event.target.value)
                            )
                            }
                            className={inputClassName}
                            placeholder="Ex. 500"
                        />

                        <p className="mt-1 text-xs text-slate-400">
                            Une estimation suffit.
                        </p>
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Inscriptions */}
            <form.Field name="registrationsOpen">
                {(field) => (
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(event) =>
                        field.handleChange(event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />

                    <span>
                    <span className="block text-sm font-medium text-slate-800">
                        Inscriptions ouvertes
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                        Les exposants peuvent actuellement demander une place.
                    </span>
                    </span>
                </label>
                )}
            </form.Field>

            {/* Tarifs */}
            <div>
                <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                    Tarifs
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    Indiquez les tarifs appliqués à votre événement.
                </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                {/* Prix entrée */}
                <form.Field name="price">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                        >
                        Prix d'entrée
                        </label>

                        <div className="relative mt-2">
                        <input
                            id={field.name}
                            type="number"
                            min={0}
                            step="0.01"
                            value={field.state.value ?? ""}
                            onChange={(event) => {
                            const value = event.target.value;

                            field.handleChange(
                                value === "" ? null : Number(value)
                            );
                            }}
                            placeholder="Ex. 5"
                            className={`${inputClassName} pr-12`}
                        />

                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">
                            €
                        </span>
                        </div>
                    </div>
                    )}
                </form.Field>

                {/* Prix stand */}
                <form.Field name="standPrice">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                        >
                        Prix du stand
                        </label>

                        <div className="relative mt-2">
                        <input
                            id={field.name}
                            type="number"
                            min={0}
                            step="0.01"
                            value={field.state.value ?? ""}
                            onChange={(event) => {
                            const value = event.target.value;

                            field.handleChange(
                                value === "" ? null : Number(value)
                            );
                            }}
                            placeholder="Ex. 30"
                            className={`${inputClassName} pr-12`}
                        />

                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">
                            €
                        </span>
                        </div>
                    </div>
                    )}
                </form.Field>
                </div>
            </div>

            {/* Taille des stands */}
            <form.Field name="standSizes">
                {(field) => (
                <div>
                    <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                    >
                    Tailles de stands disponibles
                    </label>

                    <input
                    id={field.name}
                    type="text"
                    value={field.state.value.join(", ")}
                    onChange={(event) => {
                        const values = event.target.value
                        .split(",")
                        .map((value) => value.trim())
                        .filter(Boolean);

                        field.handleChange(values);
                    }}
                    placeholder="Ex. 2x2m, 3x3m, 4x4m"
                    className={`${inputClassName} mt-2`}
                    />

                    <p className="mt-1 text-xs text-slate-400">
                    Séparez les différentes tailles par des virgules.
                    </p>
                </div>
                )}
            </form.Field>

            {/* Type de marché */}
            <form.Field name="marketType">
                {(field) => (
                    <div>
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-slate-700"
                    >
                        Type de marché
                    </label>

                    <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(
                            event.target.value as MarketExhibitorValues["marketType"]
                        )
                        }
                        className={inputClassName}
                    >
                        <option value="EXTERIOR">Extérieur</option>
                        <option value="COVERED">Couvert</option>
                        <option value="BOTH">Extérieur et couvert</option>
                    </select>
                    </div>
                )}
            </form.Field>

            {/* Électricité / Barnum */}
            <div>
                <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                    Équipement des stands
                </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                {/* Électricité */}
                <form.Field name="electricity">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                        >
                        Électricité
                        </label>

                        <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                            field.handleChange(
                            event.target.value as MarketExhibitorValues["electricity"]
                            )
                        }
                        className={`${selectClassName} mt-2`}
                        >
                        <option value="NONE">Non disponible</option>
                        <option value="INCLUDED">
                            Incluse
                        </option>
                        <option value="PAID">
                            Disponible avec supplément
                        </option>
                        </select>
                    </div>
                    )}
                </form.Field>

                {/* Barnum */}
                <form.Field name="barnum">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                        >
                        Barnum
                        </label>

                        <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                            field.handleChange(
                            event.target.value as MarketExhibitorValues["barnum"]
                            )
                        }
                        className={`${selectClassName} mt-2`}
                        >
                        <option value="OPTIONAL">
                            Facultatif
                        </option>
                        <option value="REQUIRED">
                            Obligatoire
                        </option>
                        <option value="FORBIDDEN">
                            Interdit
                        </option>
                        </select>
                    </div>
                    )}
                </form.Field>
                </div>
            </div>

            {/* Parking */}
            <div>
                <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                    Parking
                </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                {/* Disponibilité */}
                <form.Field name="parkingAvailability">
                    {(field) => (
                    <div>
                        <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                        >
                        Disponibilité
                        </label>

                        <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                            field.handleChange(
                            event.target.value as MarketExhibitorValues["parkingAvailability"]
                            )
                        }
                        className={`${selectClassName} mt-2`}
                        >
                        <option value="NONE">
                            Aucun parking indiqué
                        </option>
                        <option value="NEARBY">
                            À proximité
                        </option>
                        <option value="FAR">
                            Éloigné
                        </option>
                        </select>
                    </div>
                    )}
                </form.Field>

                {/* Gratuit */}
                <form.Field name="parkingFree">
                    {(field) => (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                        <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(event) =>
                            field.handleChange(event.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />

                        <span className="text-sm font-medium text-slate-700">
                        Parking gratuit
                        </span>
                    </label>
                    )}
                </form.Field>
                </div>
            </div>

            <form.Field name="history">
                {(field) => (
                    <div>
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-slate-700"
                    >
                        Historique de l'evenement
                    </label>

                    <input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min="0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(
                            event.target.value === ""
                            ? Number("0")
                            : Number(event.target.value)
                        )
                        }
                        className={inputClassName}
                        placeholder="Ex. 3"
                    />
                    </div>
                )}
            </form.Field>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                type="button"
                onClick={onPrevious}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                Précédent
                </button>

                <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                Continuer
                </button>
            </div>
        </form>
    );
}