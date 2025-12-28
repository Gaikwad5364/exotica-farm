'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function MainContentWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <main className={`main-content ${isAdmin ? 'admin-content' : ''}`}>
            {children}
        </main>
    );
}
