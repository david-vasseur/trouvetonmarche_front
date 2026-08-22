'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/form/auth/resetPasswordForm';

function ResetPasswordWrapper() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    if (!token) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-md max-w-md w-full text-center">
                <p className="font-semibold">Lien invalide</p>
                <p className="text-sm">Le token de réinitialisation est manquant.</p>
            </div>
        );
    }

    return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Suspense fallback={<div className="text-gray-500">Chargement...</div>}>
                <ResetPasswordWrapper />
            </Suspense>
        </div>
    );
}