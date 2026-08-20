"use client";

import { useForm } from "@tanstack/react-form";
import type { JSONContent } from "@tiptap/core";

import {
  marketContentSchema,
  type MarketContentValues,
} from "@/schema/market/market.schema";
import TiptapEditor from "../TiptapEditor";
import { useState } from "react";
import { toast } from "sonner";
import { uploadImageAction } from "@/actions/market.action";

type MarketContentFormProps = {
  onPrevious: () => void;
  onNext: (value: MarketContentValues) => void;
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

export default function MarketContentForm({
  onPrevious,
  onNext,
}: MarketContentFormProps) {
  const form = useForm({
    defaultValues: {
      excerpt: "",
      description: {} as JSONContent,
      image: null,
      externalUrl: null,
    } as MarketContentValues,

    validators: {
      onChange: marketContentSchema,
    },

    onSubmit: async ({ value }) => {
      console.log("📝 Market content :", value);

      onNext(value);
    },
  });

  const [isUploading, setIsUploading] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        form.handleSubmit();
      }}
      className="space-y-8"
    >
      {/* ============================================================ */}
      {/* 1. PRÉSENTATION                                              */}
      {/* ============================================================ */}

      <div>
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Présentation
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Présentez votre événement aux visiteurs.
          </p>
        </div>

        {/* Extrait */}
        <form.Field name="excerpt">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                Résumé
              </label>

              <textarea
                id={field.name}
                name={field.name}
                rows={3}
                maxLength={250}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.value)
                }
                placeholder="Présentez votre événement en quelques mots..."
                className={`${inputClassName} resize-none`}
              />

              <div className="mt-1 flex justify-between">
                <p className="text-xs text-slate-400">
                  Ce texte apparaîtra dans les aperçus de votre événement.
                </p>

                <span className="text-xs text-slate-400">
                  {(field.state.value ?? "").length}/250
                </span>
              </div>

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
            </div>
          )}
        </form.Field>
      </div>

      {/* ============================================================ */}
      {/* 2. DESCRIPTION                                                */}
      {/* ============================================================ */}

      <div className="border-t border-slate-100 pt-8">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Description détaillée
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Décrivez votre événement, son ambiance, ses exposants ou toute
            information utile aux visiteurs.
          </p>
        </div>

        <form.Field name="description">
          {(field) => (
            <div>
                <TiptapEditor
                  value={field.state.value}
                  onChange={(content) =>
                    field.handleChange(content)
                  }
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
      </div>

  {/* ============================================================ */}
      {/* 3. IMAGE                                                      */}
      {/* ============================================================ */}

      <div className="border-t border-slate-100 pt-8">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Image
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ajoutez une image pour illustrer votre événement.
          </p>
        </div>

        <form.Field name="image">
          {(field) => {
            

            const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;

              setIsUploading(true);
              try {
                const formData = new FormData();
                formData.append("file", file);

                // Appel de ta Server Action Next.js
                const publicUrl = await uploadImageAction(formData);

                // On injecte l'URL finale dans le form (le type string est respecté !)
                field.handleChange(publicUrl);
              } catch (error) {
                console.error("Erreur lors de l'upload :", error);
                toast.error("Erreur lors de l'upload de l'image");
              } finally {
                setIsUploading(false);
              }
            };

            return (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Illustration
                </label>

                {field.state.value ? (
                  // Si on a déjà une image, on affiche un aperçu et un bouton pour changer
                  <div className="mt-2 space-y-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={field.state.value}
                        alt="Aperçu de l'événement"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                        {isUploading ? "Chargement..." : "Changer l'image"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => field.handleChange(null)}
                        className="text-xs font-semibold text-red-600 transition hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : (
                  // Sinon, on affiche une zone de drop / sélection classique
                  <label className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 transition hover:border-emerald-500 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-700">
                        {isUploading ? "Téléchargement en cours..." : "Cliquez pour sélectionner une image"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG, WEBP
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </label>
                )}

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
      </div>

      {/* ============================================================ */}
      {/* 4. LIEN EXTERNE                                               */}
      {/* ============================================================ */}

      <div className="border-t border-slate-100 pt-8">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Site internet
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Vous pouvez ajouter le site officiel ou une page permettant
            d'obtenir davantage d'informations.
          </p>
        </div>

        <form.Field name="externalUrl">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                Lien externe
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
                placeholder="https://www.exemple.fr"
                className={inputClassName}
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
      </div>

      {/* ============================================================ */}
      {/* ACTIONS                                                       */}
      {/* ============================================================ */}

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
          Terminer
        </button>
      </div>
    </form>
  );
}