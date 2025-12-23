'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, isAuthenticated } = useAuthStore();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        // Note: useAuthStore persistence might take a moment to hydrate
        // But since it uses localStorage synchronously on mount (if configured right) or useEffect,
        // we can check existence of token.

        // Simple check: if no token in store, redirect.
        if (!isAuthenticated()) {
            router.push('/auth/login');
        } else {
            setAuthorized(true);
        }
    }, [token, isAuthenticated, router]);

    if (!authorized) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
