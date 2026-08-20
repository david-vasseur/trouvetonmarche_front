"use client";

import { useForm } from "@tanstack/react-form";

import {
  profileSchema,
  type ProfileFormValues,
} from "@/schema/profile/profile.schema";

import type { UserProfile } from "@/types/user";
import { toast } from "sonner";
import { updateUser } from "@/actions/user.action";
import CitySearchInput from "@/components/ui/CitySearchInput";

type Props = {
  user: UserProfile;
};

const inputClassName ="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";

const defaultCoverImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80";

export default function ProfileForm({ user }: Props) {
    const isExposant = user.roles.includes("EXPOSANT");

    const form = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone ?? undefined,
            avatarUrl: user.avatarUrl ?? undefined,

            shopName: user.profile?.shopName ?? undefined,
            description: user.profile?.description ?? undefined,
            logoUrl: user.profile?.logoUrl ?? undefined,
            coverImageUrl: user.profile?.coverImageUrl ?? undefined,

            companyName: user.profile?.companyName ?? undefined,
            siret: user.profile?.siret ?? undefined,

            website: user.profile?.website ?? undefined,
            instagram: user.profile?.instagram ?? undefined,
            facebook: user.profile?.facebook ?? undefined,
            tiktok: user.profile?.tiktok ?? undefined,
            youtube: user.profile?.youtube ?? undefined,

            address: user.profile?.address ?? undefined,
            zip: user.profile?.zip ?? undefined,
            city: user.profile?.city ?? undefined,

            cityCode: user.profile?.cityCode ?? undefined,
            departmentCode: user.profile?.departmentCode ?? undefined,
            regionCode: user.profile?.regionCode ?? undefined,
            latitude: user.profile?.latitude ?? undefined,
            longitude: user.profile?.longitude ?? undefined,
        } as ProfileFormValues,

        validators: {
            onChange: profileSchema,
        },

        onSubmit: async ({ value }) => {
            console.log(value);
            
            const result = await updateUser(value);
            if (result.success) {
                toast.success("Profil mis à jour avec succès !");
            } else {
                toast.error("Une erreur est survenue lors de la mise à jour du profil.");
            }
        },
        onSubmitInvalid: ({ value, formApi }) => {
            toast.error("Veuillez corriger les erreurs dans le formulaire avant de soumettre.");
        },
    });

  /*
   * Prévenir l'utilisateur s'il quitte la page
   * avec des modifications non sauvegardées.
   */
  {/*  useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (!form.state.isDirty) return;

        event.preventDefault();
        event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [form.state.isDirty]);

  const isDirty = form.state.isDirty;*/}

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]"
        >
        {/* ========================================================= */}
        {/* COLONNE PRINCIPALE                                       */}
        {/* ========================================================= */}

        <div className="space-y-8">
            {/* ======================================================= */}
            {/* IDENTITÉ                                               */}
            {/* ======================================================= */}

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
                            Identité
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                            Informations personnelles
                        </h2>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <form.Field name="firstName">
                    {(field) => (
                        <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                            Prénom
                        </span>

                        <input
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(event.target.value)
                            }
                            className={inputClassName}
                            placeholder="Votre prénom"
                        />
                        </label>
                    )}
                    </form.Field>

                    <form.Field name="lastName">
                    {(field) => (
                        <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                            Nom
                        </span>

                        <input
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(event.target.value)
                            }
                            className={inputClassName}
                            placeholder="Votre nom"
                        />
                        </label>
                    )}
                    </form.Field>

                    <form.Field name="email">
                    {(field) => (
                        <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                            Email
                        </span>

                        <input
                            type="email"
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(event.target.value)
                            }
                            className={inputClassName}
                        />
                        </label>
                    )}
                    </form.Field>

                    <form.Field name="phone">
                    {(field) => (
                        <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                            Téléphone
                        </span>

                        <input
                            type="tel"
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(event.target.value)
                            }
                            className={inputClassName}
                            placeholder="Numéro de téléphone"
                        />
                        </label>
                    )}
                    </form.Field>

                    <form.Field name="avatarUrl">
                    {(field) => (
                        <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                            URL avatar
                        </span>

                        <input
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                            field.handleChange(event.target.value)
                            }
                            className={inputClassName}
                            placeholder="https://..."
                        />
                        </label>
                    )}
                    </form.Field>
                </div>
            </section>

            {/* ======================================================= */}
            {/* EXPOSANT / ORGANISATEUR                                */}
            {/* ======================================================= */}

            {isExposant ? (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Boutique / entreprise
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                    Profil exposant
                </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                <form.Field name="shopName">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Nom de la boutique
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Nom de votre boutique"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="companyName">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Entreprise
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Nom de votre société"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="siret">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        SIRET
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="123 456 789 00012"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="website">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Site web
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="https://"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="description">
                    {(field) => (
                    <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                        Description
                        </span>

                        <textarea
                        rows={5}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={`${inputClassName} resize-none`}
                        placeholder="Décrivez votre activité, vos produits ou votre univers..."
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="address">
                    {(field) => (
                    <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                        Adresse
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Adresse professionnelle"
                        />
                    </label>
                    )}
                </form.Field>

                {/*<form.Field name="zip">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Code postal
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="75001"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="city">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Ville
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Paris"
                        />
                    </label>
                    )}
                </form.Field>*/}
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
                    <form.Field name="city">
                        {(field) => (
                            <label className="block">
                            <span className="text-sm font-medium text-slate-700">
                                Ville
                            </span>

                            <CitySearchInput
                                value={field.state.value ?? ""}
                                onSelect={(city) => {
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
                                }}
                            />
                            </label>
                        )}
                        </form.Field>
                </div>
            </section>
            ) : (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700">
                    Organisation
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                    Profil organisateur
                </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                <form.Field name="companyName">
                    {(field) => (
                    <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                        Nom de l’organisation
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Nom de votre structure"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="address">
                    {(field) => (
                    <label className="block md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                        Adresse
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Adresse de votre bureau"
                        />
                    </label>
                    )}
                </form.Field>

{  /*              <form.Field name="zip">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Code postal
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="75001"
                        />
                    </label>
                    )}
                </form.Field>

                <form.Field name="city">
                    {(field) => (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">
                        Ville
                        </span>

                        <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                            field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Paris"
                        />
                    </label>
                    )}
                </form.Field>*/}
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
                    <form.Field name="city">
                        {(field) => (
                            <label className="block">
                            <span className="text-sm font-medium text-slate-700">
                                Ville
                            </span>

                            <CitySearchInput
                                value={field.state.value ?? ""}
                                onSelect={(city) => {
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
                                }}
                            />
                            </label>
                        )}
                        </form.Field>
                </div>
            </section>
            )}
        </div>

        {/* ========================================================= */}
        {/* SIDEBAR                                                  */}
        {/* ========================================================= */}

        <aside className="space-y-8">
            {/* ======================================================= */}
            {/* MEDIA                                                   */}
            {/* ======================================================= */}

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    Média
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Photos de profil
                </h3>
                </div>
            </div>

            <div className="space-y-4">
                <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100">
                <form.Field name="coverImageUrl">
                    {(field) => (
                    <img
                        src={field.state.value || defaultCoverImage}
                        alt="Couverture"
                        className="h-44 w-full object-cover"
                    />
                    )}
                </form.Field>
                </div>

                <form.Field name="logoUrl">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Logo / image
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="https://..."
                    />
                    </label>
                )}
                </form.Field>

                <form.Field name="coverImageUrl">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Bannière
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="https://..."
                    />
                    </label>
                )}
                </form.Field>
            </div>
            </section>

            {/* ======================================================= */}
            {/* SOCIAL                                                  */}
            {/* ======================================================= */}

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Réseaux
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Social media
                </h3>
            </div>

            <div className="space-y-4">
                <form.Field name="instagram">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Instagram
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="@moncompte"
                    />
                    </label>
                )}
                </form.Field>

                <form.Field name="facebook">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        Facebook
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Nom de page"
                    />
                    </label>
                )}
                </form.Field>

                <form.Field name="tiktok">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        TikTok
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="@moncompte"
                    />
                    </label>
                )}
                </form.Field>

                <form.Field name="youtube">
                {(field) => (
                    <label className="block">
                    <span className="text-sm font-medium text-slate-700">
                        YouTube
                    </span>

                    <input
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                        field.handleChange(event.target.value)
                        }
                        className={inputClassName}
                        placeholder="Chaîne YouTube"
                    />
                    </label>
                    )}
                </form.Field>
            </div>
            </section>

            {/* ======================================================= */}
            {/* COMPTE                                                  */}
            {/* ======================================================= */}

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                            Compte
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-slate-900">
                            Actions
                        </h3>
                    </div>
                </div>
                {/* SUBMIT */}
                <div className="mt-5 space-y-3">
                    <form.Subscribe
                        selector={(state) => ({
                            isDirty: state.isDirty,
                            isSubmitting: state.isSubmitting,
                            canSubmit: state.canSubmit,
                        })}
                        >
                        {({ isDirty, isSubmitting, canSubmit }) => (
                            <button
                            type="submit"
                            disabled={!isDirty || isSubmitting}
                            className="w-full bg-[#7A9B8E] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                            {isSubmitting
                                ? "Traitement en cours..."
                                : "Enregistrer les modifications"}
                            </button>
                        )}
                    </form.Subscribe>
                    <button
                        type="button"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Voir mon profil public
                    </button> 
                </div>
            </section>
        </aside>

        {/* ========================================================= */}
        {/* MODIFICATIONS NON SAUVEGARDÉES                           */}
        {/* ========================================================= */}

        {/*{isDirty && (
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-6 py-4 shadow-lg backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                Vous avez des modifications non enregistrées.
                </p>

                <button
                type="button"
                onClick={() => form.reset()}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                Annuler
                </button>
            </div>
            </div>
        )}*/}
        </form>
    );
}