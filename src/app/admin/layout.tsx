"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Mail,
    Calendar,
    LogOut,
    ExternalLink,
    Leaf,
    Menu,
    X,
    ChevronRight
} from "lucide-react";
import { logoutAction } from "./login/actions";
import styles from "./AdminLayout.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = async () => {
        await logoutAction();
    };

    // Close sidebar on path change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className={styles.adminContainer}>
            {/* Mobile Top Bar */}
            <header className={styles.topBar}>
                <button
                    className={styles.sidebarToggle}
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Toggle Navigation"
                >
                    <Menu size={22} />
                </button>
                <div style={{ marginLeft: '12px', fontWeight: 700, color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'var(--color-primary)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                        <Leaf size={16} />
                    </div>
                    <span style={{ fontSize: '1rem', letterSpacing: '-0.02em', fontWeight: 700 }}>Admin Panel</span>
                </div>
            </header>

            {/* Backdrop only on mobile */}
            <AnimatePresence>
                {isSidebarOpen && isMounted && window.innerWidth <= 1024 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1090
                        }}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {(isMounted && (window.innerWidth > 1024 || isSidebarOpen)) && (
                    <motion.aside
                        initial={window.innerWidth <= 1024 ? { x: '-100%' } : false}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={styles.sidebar}
                    >
                        <div style={{ padding: '24px', borderBottom: '1px solid #f8f8f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary-dark)' }}>
                                <div style={{ background: 'var(--color-primary)', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                                    <Leaf size={20} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>Exotica</span>
                            </div>
                            <button
                                className={styles.mobileCloseBtn}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav style={{ padding: '20px 16px', flexGrow: 1, overflowY: 'auto' }}>
                            <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#bbb', letterSpacing: '0.15em', marginBottom: '16px', paddingLeft: '8px', fontWeight: 700 }}>Management</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <li>
                                    <Link href="/admin/dashboard" className={getNavClass(pathname === '/admin/dashboard')}>
                                        <LayoutDashboard size={18} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/testimonials" className={getNavClass(pathname === '/admin/testimonials')}>
                                        <MessageSquare size={18} /> Testimonials
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/farm-visits" className={getNavClass(pathname?.startsWith('/admin/farm-visits'))}>
                                        <Calendar size={18} /> Farm Visits
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/enquiries" className={getNavClass(pathname?.startsWith('/admin/enquiries'))}>
                                        <Mail size={18} /> Enquiries
                                    </Link>
                                </li>
                            </ul>

                            <div style={{ marginTop: '40px', padding: '0 8px' }}>
                                <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#bbb', letterSpacing: '0.15em', marginBottom: '16px', fontWeight: 700 }}>Site Support</h4>
                                <Link href="/" target="_blank" className="navItem" style={{ color: 'var(--color-primary)' }}>
                                    <ExternalLink size={16} /> View Production Site
                                </Link>
                            </div>
                        </nav>

                        <div style={{ padding: '20px', borderTop: '1px solid #f8f8f8' }}>
                            <button onClick={handleLogout} className="signOutBtn">
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>

            <style jsx>{`
                :global(.signOutBtn) {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    color: #dc2626;
                    background: #fef2f2;
                    border: 1px solid #fee2e2;
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                :global(.signOutBtn:hover) {
                    background: #fee2e2;
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
}

const getNavClass = (isActive: boolean) => `navItem ${isActive ? 'navItemActive' : ''}`;

