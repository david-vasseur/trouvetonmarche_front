"use client";

import { useForm } from "@tanstack/react-form";

import {
  marketLocationSchema,
  type MarketLocationValues,
} from "@/schema/market/market.schema";
import CitySearchInput from "@/components/ui/CitySearchInput";
import { getDepartmentByCode, getRegionByCode } from "@/lib/geo";

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";

  type MarketLocationFormProps = {
    onNext: (value: MarketLocationValues) => void;
    onPrevious: () => void;
};

export default function MarketLocationForm({ onPrevious, onNext}: MarketLocationFormProps) {
    const form = useForm({
        defaultValues: {
        address: "",
        zip: "",
        city: "",
        cityCode: "",
        department: "",
        departmentCode: "",
        region: "",
        regionCode: "",
        latitude: null,
        longitude: null,
        } as MarketLocationValues,

        validators: {
        onChange: marketLocationSchema,
        },

        onSubmit: async ({ value }) => {
        onNext(value)
        },
    });

    return (
        <form
        onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
        }}
        className="space-y-6"
        >
            {/* Adresse */}
            <form.Field name="address">
                {(field) => (
                <div>
                    <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                    >
                    Adresse
                    </label>

                    <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                        field.handleChange(event.target.value)
                    }
                    placeholder="Ex. 12 avenue Jean Jaurès"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                )}
            </form.Field>
            <form.Field name="city">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Ville
                    </span>

                    <CitySearchInput
                        value={field.state.value ?? ""}
                        onSelect={async (city) => {
  field.handleChange(city.nom);

  form.setFieldValue(
    "zip",
    city.codesPostaux?.[0] ?? ""
  );

  form.setFieldValue("cityCode", city.code);
  form.setFieldValue("departmentCode", city.codeDepartement);
  form.setFieldValue("regionCode", city.codeRegion);

  form.setFieldValue("latitude", city.latitude);
  form.setFieldValue("longitude", city.longitude);

  const [department, region] = await Promise.all([
    getDepartmentByCode(city.codeDepartement),
    getRegionByCode(city.codeRegion),
  ]);

  form.setFieldValue(
    "department",
    department?.nom ?? ""
  );

  form.setFieldValue(
    "region",
    region?.nom ?? ""
  );
}}
                    />
                    </label>
                )}
            </form.Field>
            <form.Field name="zip">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Code postal
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        readOnly
                        className={`${inputClassName} cursor-not-allowed bg-slate-100`}
                        placeholder="Sélectionnez une ville"
                    />
                    </label>
                )}
            </form.Field>

            {/* Actions */}
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

