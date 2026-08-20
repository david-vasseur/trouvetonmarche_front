"use client";

import { useForm } from "@tanstack/react-form";
import { marketGeneralSchema, type MarketGeneralValues } from "@/schema/market/market.schema";
import { useState } from "react";

type MarketCategory = {
    id: number;
    name: string;
    slug: string;
};

type MarketGeneralFormProps = {
    categories: MarketCategory[];
    onNext: (value: MarketGeneralValues) => void;
};

export default function MarketGeneralForm({ categories, onNext }: MarketGeneralFormProps) {

    const [tagInput, setTagInput] = useState("");

    const form = useForm({
        defaultValues: {
            name: "",
            categoryId: 0,
            tags: []
        } as MarketGeneralValues,

        validators: {
            onChange: marketGeneralSchema,
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
            className="space-y-6"
        >
        {/* Nom */}
        <form.Field name="name">
            {(field) => (
            <div>
                <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
                >
                Nom de l'événement
                </label>

                <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                    field.handleChange(event.target.value)
                }
                placeholder="Ex. Marché gourmand de Montpellier"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]?.message}
                    </p>
                )}
            </div>
            )}
        </form.Field>

        {/* Catégorie */}
        <form.Field name="categoryId">
            {(field) => (
            <div>
                <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
                >
                Type d'événement
                </label>

                <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                <option value={0}>
                    Sélectionnez un type d'événement
                </option>

                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
                </select>

                {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]?.message}
                    </p>
                )}
            </div>
            )}
        </form.Field>

        {/* Tags */}
        
<form.Field name="tags">
  {(field) => {
    

    const addTag = () => {
      const tag = tagInput.trim();

      if (!tag) return;

      // Évite les doublons
      if (field.state.value.includes(tag)) {
        setTagInput("");
        return;
      }

      field.handleChange([
        ...field.state.value,
        tag,
      ]);

      setTagInput("");
    };

    const removeTag = (tagToRemove: string) => {
      field.handleChange(
        field.state.value.filter(
          (tag) => tag !== tagToRemove
        )
      );
    };

    return (
      <div>
        <label
          htmlFor={`${field.name}-input`}
          className="block text-sm font-medium text-slate-700"
        >
          Tags
        </label>

        {/* Saisie */}
        <div className="mt-2 flex gap-2">
          <input
            id={`${field.name}-input`}
            type="text"
            value={tagInput}
            onChange={(event) => {
              setTagInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTag();
              }
            }}
            placeholder="Ex. producteurs"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />

          <button
            type="button"
            onClick={addTag}
            className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Ajouter
          </button>
        </div>

        {/* Tags sélectionnés */}
        {field.state.value.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {field.state.value.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
              >
                {tag}

                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  aria-label={`Supprimer le tag ${tag}`}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-emerald-600 transition hover:bg-emerald-100 hover:text-emerald-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <p className="mt-2 text-xs text-slate-400">
          Ajoutez quelques mots-clés pour aider les visiteurs à trouver
          votre événement.
        </p>

        {/* Erreur */}
        {field.state.meta.isTouched &&
          field.state.meta.errors.length > 0 && (
            <p className="mt-1 text-sm text-red-600">
              {field.state.meta.errors[0]?.message}
            </p>
          )}
      </div>
    );
  }}
</form.Field>


        {/* Submit */}
        <div className="pt-2 flex justify-end">
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

