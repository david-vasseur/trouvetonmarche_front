'use client';

import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/schema/auth';
import { resetPasswordAction } from '@/actions/auth.action';
import { toast } from 'sonner';


interface ResetPasswordFormProps {
    token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const router = useRouter();

    const defaultValues: ResetPasswordFormValues = {
        password: '',
        passwordConfirm: '',
    } 

    const form = useForm({
            defaultValues,
            validators: {
                onChange: resetPasswordSchema,
            },
            onSubmit: async ({ value }) => {
                const result = await resetPasswordAction(token, value.password);

                if (!result.success) {
                    toast.error(result.message);
                    return;
                }

                toast.success(result.message);
                
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            },
    });

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Nouveau mot de passe</h1>
            <p className="text-sm text-gray-600 mb-6">Choisis un nouveau mot de passe sécurisé pour ton compte.</p>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
                }}
                className="space-y-4"
            >
                {/* Champ Nouveau mot de passe */}
                <form.Field
                name="password"
                children={(field) => (
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                    />
                    {field.state.meta.errors.length > 0 ? (
                        <p className="text-red-600 text-xs mt-1">
                            {field.state.meta.errors.map((error: any) => error?.message || error).join(', ')}
                        </p>
                    ) : null}
                    </div>
                )}
                />

                {/* Champ Confirmation */}
                <form.Field
                name="passwordConfirm"
                children={(field) => (
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                    />
                   {field.state.meta.errors.length > 0 ? (
                        <p className="text-red-600 text-xs mt-1">
                            {field.state.meta.errors.map((error: any) => error?.message || error).join(', ')}
                        </p>
                    ) : null}
                    </div>
                )}
                />

                {/* Bouton de soumission lié à l'état du formulaire */}
                <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                    {isSubmitting ? 'Modification en cours...' : 'Réinitialiser le mot de passe'}
                    </button>
                )}
                />
            </form>
        </div>
    );
}