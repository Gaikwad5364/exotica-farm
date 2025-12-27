"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Mail,
    Calendar,
    LogOut,
    ExternalLink,
    Leaf
} from "lucide-react";
import { logoutAction } from "./login/actions";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    const handleLogout = async () => {
        await logoutAction();
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Sidebar */}
            <aside style={{
                width: '240px',
                background: 'white',
                borderRight: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 'var(--nav-height)',
                height: 'calc(100vh - var(--nav-height))',
                zIndex: 100
            }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary-dark)' }}>
                        <Leaf size={22} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Exotica Admin</span>
                    </div>
                </div>

                <nav style={{ padding: '16px', flexGrow: 1 }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>
                            <Link
                                href="/admin/dashboard"
                                style={getNavItemStyle(pathname === '/admin/dashboard')}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/testimonials"
                                style={getNavItemStyle(pathname === '/admin/testimonials')}
                            >
                                <MessageSquare size={18} />
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/farm-visits"
                                style={getNavItemStyle(pathname?.startsWith('/admin/farm-visits'))}
                            >
                                <Calendar size={18} />
                                Farm Visits
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/enquiries"
                                style={getNavItemStyle(pathname?.startsWith('/admin/enquiries'))}
                            >
                                <Mail size={18} />
                                Enquiries
                            </Link>
                        </li>
                    </ul>

                    <div style={{ marginTop: '30px', padding: '0 8px' }}>
                        <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>Quick Links</h4>
                        <Link href="/" target="_blank" style={{ ...getNavItemStyle(false), color: 'var(--color-primary)' }}>
                            <ExternalLink size={16} />
                            View Website
                        </Link>
                    </div>
                </nav>

                <div style={{ padding: '16px', borderTop: '1px solid #f5f5f5' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                            borderRadius: '8px',
                            color: '#e53e3e',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            textAlign: 'left'
                        }}
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '240px',
                flexGrow: 1,
                padding: '30px 40px',
                minHeight: 'calc(100vh - var(--nav-height))',
                background: '#f8f9fa'
            }}>
                {children}
            </main>
        </div>
    );
}

const getNavItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: isActive ? 'var(--color-primary-dark)' : '#444',
    background: isActive ? '#f0fdf4' : 'transparent',
    borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: isActive ? 600 : 500,
    transition: 'all 0.2s',
});
