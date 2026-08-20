"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";

import {
  marketDateSchema,
  type MarketDateValues,
} from "@/schema/market/market.schema";

type MarketDateFormProps = {
  onPrevious: () => void;
  onNext: (value: MarketDateValues) => void;
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

type OpeningHour = {
  date: string;
  openAt: string;
  closeAt: string;
};

/**
 * Retourne toutes les dates comprises entre deux dates incluses.
 *
 * Les dates restent volontairement au format YYYY-MM-DD
 * pour éviter les problèmes de timezone.
 */
function getDatesBetween(
  startAt: string,
  endAt: string
): string[] {
  if (!startAt || !endAt) {
    return [];
  }

  const start = new Date(`${startAt}T12:00:00`);
  const end = new Date(`${endAt}T12:00:00`);

  if (start > end) {
    return [];
  }

  const dates: string[] = [];
  const current = new Date(start);

  while (current <= end) {
    const year = current.getFullYear();
    const month = String(
      current.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      current.getDate()
    ).padStart(2, "0");

    dates.push(`${year}-${month}-${day}`);

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * Formatage français d'une date.
 */
function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

/**
 * Transforme :
 *
 * 2026-10-10 + 10:00
 *
 * en :
 *
 * 2026-10-10T10:00:00
 */
function combineDateAndTime(
  date: string,
  time: string
) {
  return `${date}T${time}:00`;
}

export default function MarketDateForm({
  onPrevious,
  onNext,
}: MarketDateFormProps) {
  /**
   * État purement UX.
   *
   * Il ne fait PAS partie de MarketDateValues.
   */
  const [singleDay, setSingleDay] = useState(false);

    const form = useForm({
        defaultValues: {
            startAt: "",
            endAt: "",
            openingHours: [],
            recurrence: "NONE",
            recurrenceEndAt: "",
        } as MarketDateValues,

        validators: {
            onChange: marketDateSchema,
        },

        onSubmit: async ({ value }) => {

            if (value.openingHours.length === 0) {
                console.error("Aucune journée horaire renseignée.");
                return;
            }

            const sortedOpeningHours = [...value.openingHours].sort((a, b) =>
                a.date.localeCompare(b.date)
            );

            const firstDay = sortedOpeningHours[0];
            const lastDay = sortedOpeningHours[sortedOpeningHours.length - 1];

            if (!firstDay || !lastDay) {
                return;
            }

            const startAt = combineDateAndTime(
                firstDay.date,
                firstDay.openAt
            );

            const endAt = combineDateAndTime(
                lastDay.date,
                lastDay.closeAt
            );

            const finalValue = {
                 ...value,
                startAt,
                endAt,
                openingHours: sortedOpeningHours,
            };


        onNext(finalValue);
        },
    });

  /*
   * ------------------------------------------------------------------
   * Dates sélectionnées
   * ------------------------------------------------------------------
   */

  const startAt = form.state.values.startAt;
  const endAt = form.state.values.endAt;

  /*
   * ------------------------------------------------------------------
   * Liste des journées
   * ------------------------------------------------------------------
   */

  useEffect(() => {
  const dates = getDatesBetween(startAt, endAt);

  const currentOpeningHours =
    form.state.values.openingHours;

  if (dates.length === 0) {
    if (currentOpeningHours.length > 0) {
      form.setFieldValue("openingHours", []);
    }

    return;
  }

  const nextOpeningHours: OpeningHour[] =
    dates.map((date) => {
      const existing = currentOpeningHours.find(
        (openingHour) =>
          openingHour.date === date
      );

      return (
        existing ?? {
          date,
          openAt: "10:00",
          closeAt: "18:00",
        }
      );
    });

  const hasChanged =
    currentOpeningHours.length !==
      nextOpeningHours.length ||
    currentOpeningHours.some(
      (openingHour, index) => {
        const next = nextOpeningHours[index];

        return (
          openingHour.date !== next?.date ||
          openingHour.openAt !== next?.openAt ||
          openingHour.closeAt !== next?.closeAt
        );
      }
    );

  if (hasChanged) {
    form.setFieldValue(
      "openingHours",
      nextOpeningHours
    );
  }
}, [startAt, endAt]);

  //const dates = useMemo(() => {
  //  if (!startAt || !endAt) {
  //    return [];
  //  }
//
  //  return getDatesBetween(
  //    startAt,
  //    endAt
  //  );
  //}, [startAt, endAt]);

  /*
   * ------------------------------------------------------------------
   * Synchronisation de openingHours avec les dates.
   *
   * Important :
   *
   * On ne reconstruit PAS les horaires existants.
   * Si l'utilisateur a déjà renseigné 10:00 → 18:00,
   * on conserve ces valeurs lorsque la période change.
   * ------------------------------------------------------------------
   */

  //useEffect(() => {
  //const currentOpeningHours =
  //  form.state.values.openingHours;
//
  //// Pas encore de période valide
  //if (dates.length === 0) {
  //  if (currentOpeningHours.length > 0) {
  //    form.setFieldValue("openingHours", []);
  //  }
//
  //  return;
  //}
//
  //const nextOpeningHours: OpeningHour[] =
  //  dates.map((date) => {
  //    const existing = currentOpeningHours.find(
  //      (openingHour) =>
  //        openingHour.date === date
  //    );
//
  //    return (
  //      existing ?? {
  //        date,
  //        openAt: "10:00",
  //        closeAt: "18:00",
  //      }
  //    );
  //  });
//
  //const hasChanged =
  //  currentOpeningHours.length !==
  //    nextOpeningHours.length ||
  //  currentOpeningHours.some(
  //    (openingHour, index) => {
  //      const next =
  //        nextOpeningHours[index];
//
  //      return (
  //        openingHour.date !== next?.date ||
  //        openingHour.openAt !== next?.openAt ||
  //        openingHour.closeAt !==
  //          next?.closeAt
  //      );
  //    }
  //  );
//
  //if (hasChanged) {
  //  form.setFieldValue(
  //    "openingHours",
  //    nextOpeningHours
  //  );
  //}
//}, [dates]);


  /*
   * ------------------------------------------------------------------
   * Checkbox "une seule journée"
   * ------------------------------------------------------------------
   */

  const handleSingleDayChange = (
    checked: boolean
  ) => {
    setSingleDay(checked);

    if (checked) {
      const startDate =
        form.getFieldValue("startAt");

      if (startDate) {
        form.setFieldValue(
          "endAt",
          startDate
        );
      }
    }
  };

    function syncOpeningHours(
        startAt: string,
        endAt: string
        ) {
        const dates = getDatesBetween(startAt, endAt);

        const currentOpeningHours =
            form.getFieldValue("openingHours");

        const nextOpeningHours: OpeningHour[] =
            dates.map((date) => {
            const existing = currentOpeningHours.find(
                (openingHour) =>
                openingHour.date === date
            );

            return (
                existing ?? {
                date,
                openAt: "10:00",
                closeAt: "18:00",
                }
            );
            });

        form.setFieldValue(
            "openingHours",
            nextOpeningHours
        );
    }

  /*
   * ------------------------------------------------------------------
   * Rendu
   * ------------------------------------------------------------------
   */

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("🟢 FORM SUBMIT");
        console.log("canSubmit :", form.state.canSubmit);
        console.log("errors :", form.state.errors);
        console.log("values :", form.state.values);
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      {/* ============================================================ */}
      {/* 1. UNE SEULE JOURNÉE                                         */}
      {/* ============================================================ */}

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300">
        <input
          type="checkbox"
          checked={singleDay}
          onChange={(event) =>
            handleSingleDayChange(
              event.target.checked
            )
          }
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Événement sur une seule journée
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Activez cette option si votre événement
            se déroule sur une seule journée.
          </p>
        </div>
      </label>

      {/* ============================================================ */}
      {/* 2. DATES                                                     */}
      {/* ============================================================ */}

      <div
        className={
          singleDay
            ? ""
            : "grid gap-6 sm:grid-cols-2"
        }
      >
        {/* DATE DE DÉBUT */}
        <form.Field name="startAt">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                {singleDay
                  ? "Date de l'événement"
                  : "Date de début"}
              </label>

              <input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                    const value = event.target.value;

                    field.handleChange(value);

                    if (singleDay) {
                        form.setFieldValue("endAt", value);

                        syncOpeningHours(value, value);
                        return;
                    }

                    const currentEndAt =
                        form.getFieldValue("endAt");

                    if (currentEndAt) {
                        syncOpeningHours(
                        value,
                        currentEndAt
                        );
                    }
                }}
                //onChange={(event) => {
                //  const value =
                //    event.target.value;
//
                //  field.handleChange(value);

                  /*
                   * En mode une journée,
                   * la date de fin suit automatiquement
                   * la date de début.
                   */
                //  if (singleDay) {
                //    form.setFieldValue(
                //      "endAt",
                //      value
                //    );
                //  }
                //}}
                className={inputClassName}
              />
            </div>
          )}
        </form.Field>

        {/* DATE DE FIN */}
        {!singleDay && (
          <form.Field name="endAt">
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-slate-700"
                >
                  Date de fin
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="date"
                  min={
                    startAt || undefined
                  }
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.handleChange(value);

                    const currentStartAt =
                        form.getFieldValue("startAt");

                    if (currentStartAt) {
                        syncOpeningHours(
                        currentStartAt,
                        value
                        );
                    }
                }}
                //  onChange={(event) =>
                //    field.handleChange(
                //      event.target.value
                //    )
                //  }
                  className={inputClassName}
                />
              </div>
            )}
          </form.Field>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. HORAIRES                                                  */}
      {/* ============================================================ */}

     <form.Subscribe
  selector={(state) => ({
    startAt: state.values.startAt,
    endAt: state.values.endAt,
  })}
>
  {({ startAt, endAt }) => {
    const dates = getDatesBetween(
      startAt,
      endAt
    );

    if (dates.length === 0) {
      return null;
    }

    return (
      <div>
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Horaires de l'événement
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Indiquez les horaires pour chaque journée.
          </p>
        </div>

        <div className="space-y-4">
          {dates.map((date, index) => (
            <div
              key={date}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="mb-4 text-sm font-semibold capitalize text-slate-900">
                {formatDateLabel(date)}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">

                <form.Field
                  name={`openingHours[${index}].openAt`}
                >
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                      >
                        Horaire de début
                      </label>

                      <input
                        id={field.name}
                        type="time"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value
                          )
                        }
                        className={inputClassName}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name={`openingHours[${index}].closeAt`}
                >
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="block text-xs font-medium text-slate-600"
                      >
                        Horaire de fin
                      </label>

                      <input
                        id={field.name}
                        type="time"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value
                          )
                        }
                        className={inputClassName}
                      />
                    </div>
                  )}
                </form.Field>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }}
</form.Subscribe>

      {/* ============================================================ */}
      {/* 4. RÉCURRENCE                                                */}
      {/* ============================================================ */}

      <form.Field name="recurrence">
        {(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-slate-700"
            >
              Récurrence
            </label>

            <select
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(
                  event.target.value as MarketDateValues["recurrence"]
                )
              }
              className={inputClassName}
            >
              <option value="NONE">
                Aucune
              </option>

              <option value="WEEKLY">
                Toutes les semaines
              </option>

              <option value="BIWEEKLY">
                Toutes les 2 semaines
              </option>

              <option value="MONTHLY">
                Tous les mois
              </option>

              <option value="YEARLY">
                Tous les ans
              </option>
            </select>
          </div>
        )}
      </form.Field>

      {/* FIN RÉCURRENCE */}
      {form.state.values.recurrence !== "NONE" && (
        <form.Field name="recurrenceEndAt">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                Jusqu'au
              </label>

              <input
                id={field.name}
                name={field.name}
                type="date"
                min={
                  startAt || undefined
                }
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value
                  )
                }
                className={inputClassName}
              />

              <p className="mt-2 text-xs text-slate-400">
                Date jusqu'à laquelle l'événement
                doit être répété.
              </p>
            </div>
          )}
        </form.Field>
      )}

      {/* ============================================================ */}
      {/* 5. ACTIONS                                                   */}
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
          onClick={() => (console.log("Bouton clické"))}
          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
