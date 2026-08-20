'use client';

import { useUserStore } from '@/lib/store/userStore';
import { useEffect } from 'react';

export function AuthProvider({ 
    initialUser, 
    children 
}: { 
    initialUser: any; 
    children: React.ReactNode 
}) {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser, setUser]);

    children;
    return <>{children}</>;
}