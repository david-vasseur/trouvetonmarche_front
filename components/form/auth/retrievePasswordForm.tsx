"use client";

import { useForm } from "@tanstack/react-form";
import { loginSchema, RetrievePasswordFormValues, retrievePasswordSchema, type LoginFormValues } from "@/schema/auth";
import { toast } from "sonner";
import { retrievePassword } from "@/actions/auth.action";

type RetrievePasswordFormProps = {
    onBack: () => void;
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

export default function RetrievePasswordForm({ onBack }: RetrievePasswordFormProps) {
    const defaultValues: RetrievePasswordFormValues = {
        email: ""
    };

    const form = useForm({
            defaultValues,
            validators: {
            onSubmit: retrievePasswordSchema,
        },
        onSubmit: async ({ value }) => {

            const formData = new FormData();
            formData.set("email", value.email);

                const response = await retrievePassword(formData);

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
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

            <div className="flex items-center justify-between gap-3 pt-1">
                <span 
                    className="rounded-lg px-2 py-1 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                    onClick={onBack}
                >
                    Retour au formulaire de connection
                </span>
            </div>

            <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-[linear-gradient(135deg,#2a6f45_0%,#1e4d34_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(42,111,69,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(42,111,69,0.35)]"
            >
                envoyer
            </button>
        </form>
    );
}
