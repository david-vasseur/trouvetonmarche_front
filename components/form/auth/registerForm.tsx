"use client";

import { useForm } from "@tanstack/react-form";
import { register } from "@/actions/auth.action";
import { registerSchema, type RegisterFormValues } from "@/schema/auth";
import { toast } from "sonner";

type RegisterFormProps = {
  onRegistered: () => void;
};

const getErrorMessage = (errors: unknown[]) => {
  const firstError = errors[0];

  if (typeof firstError === "string") return firstError;
  if (firstError && typeof firstError === "object" && "message" in firstError) {
    const message = firstError.message;
    return typeof message === "string" ? message : "";
  }

  return "";
};

export default function RegisterForm({
  onRegistered,
}: RegisterFormProps) {
  const defaultValues: RegisterFormValues = {
    type: "exhibitor",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
  const formData = new FormData();

  formData.set("type", value.type);
  formData.set("firstName", value.firstName);
  formData.set("lastName", value.lastName);
  formData.set("email", value.email);
  formData.set("password", value.password);
  formData.set("passwordConfirm", value.passwordConfirm);

  try {
    await register(formData);

    toast.success("Compte créé avec succès !");

    onRegistered();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de l'inscription.";

    toast.error(message);
  }
},
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field
        name="type"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.type.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-type" className="text-sm font-medium text-slate-700">
                Vous êtes ?
              </label>
              <select
                id="register-type"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value as "exhibitor" | "organizer")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                <option value="exhibitor">Exposant</option>
                <option value="organizer">Organisateur</option>
              </select>
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <form.Field
        name="lastName"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.lastName.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-lastname" className="text-sm font-medium text-slate-700">
                Nom
              </label>
              <input
                id="register-lastname"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="text"
                autoComplete="family-name"
                placeholder="Dupont"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <form.Field
        name="firstName"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.firstName.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-firstname" className="text-sm font-medium text-slate-700">
                Prénom
              </label>
              <input
                id="register-firstname"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="text"
                autoComplete="given-name"
                placeholder="Jean"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.email.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-email" className="text-sm font-medium text-slate-700">
                Adresse e-mail
              </label>
              <input
                id="register-email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.fr"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.password.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <input
                id="register-password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <form.Field
        name="passwordConfirm"
        validators={{
          onChange: ({ value }) => {
            const result = registerSchema.shape.passwordConfirm.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="register-password-confirm" className="text-sm font-medium text-slate-700">
                Confirmer le mot de passe
              </label>
              <input
                id="register-password-confirm"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-2xl bg-[linear-gradient(135deg,#2a6f45_0%,#1e4d34_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(42,111,69,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(42,111,69,0.35)]"
      >
        Créer mon compte
      </button>
    </form>
  );
}
