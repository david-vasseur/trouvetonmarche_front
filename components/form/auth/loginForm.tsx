"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { loginSchema, type LoginFormValues } from "@/schema/auth";
import { login } from "@/actions/auth.action";
import { toast } from "sonner";
import { getUser } from "@/actions/user.action";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onRetrieve: () => void;
}

const getErrorMessage = (errors: unknown[]) => {
  const firstError = errors[0];

  if (typeof firstError === "string") return firstError;
  if (firstError && typeof firstError === "object" && "message" in firstError) {
    const message = firstError.message;
    return typeof message === "string" ? message : "";
  }

  return "";
};

export default function LoginForm({ onRetrieve }: LoginFormProps) {
    const { setUser } = useUserStore();
    const router = useRouter();
    const defaultValues: LoginFormValues = {
        email: "",
        password: "",
        remember: false,
    };

    const form = useForm({
            defaultValues,
            validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData();
                formData.set("email", value.email);
                formData.set("password", value.password);

                const result = await login(formData);

                toast.success("Connexion réussie !");
                //const user = await getUser(result.user.id);
                //setUser(user);
                setTimeout(() => {
                    router.push("/profile")
                }, 50);
            } catch (error) {
                toast.error("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
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
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = loginSchema.shape.email.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-slate-700">
                Adresse e-mail
              </label>
              <input
                id="login-email"
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
            const result = loginSchema.shape.password.safeParse(value);
            if (!result.success) return result.error.issues[0]?.message;
            return undefined;
          },
        }}
        children={(field) => {
          const errorMessage = getErrorMessage(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <input
                id="login-password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
              {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
            </div>
          );
        }}
      />

      <div className="flex items-center justify-between gap-3 pt-1">
        <form.Field
          name="remember"
          children={(field) => (
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Se souvenir de moi
            </label>
          )}
        />

        <button
          className="rounded-lg px-2 py-1 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onRetrieve}
        >
          Mot de passe oublié ?
        </button>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-2xl bg-[linear-gradient(135deg,#2a6f45_0%,#1e4d34_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(42,111,69,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(42,111,69,0.35)]"
      >
        Se connecter
      </button>
    </form>
  );
}
