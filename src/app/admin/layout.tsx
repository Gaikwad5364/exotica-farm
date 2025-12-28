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
                >
                    <Menu size={24} />
                </button>
                <div style={{ marginLeft: '15px', fontWeight: 700, color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Leaf size={18} />
                    <span>Admin Panel</span>
                </div>
            </header>

            {/* Sidebar */}
            <AnimatePresence>
                {(isMounted && (window.innerWidth > 1024 || isSidebarOpen)) && (
                    <motion.aside
                        initial={window.innerWidth <= 1024 ? { x: '-100%' } : false}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
                    >
                        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary-dark)' }}>
                                <Leaf size={22} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Exotica Admin</span>
                            </div>
                            <button
                                className={styles.mobileCloseBtn}
                                onClick={() => setIsSidebarOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav style={{ padding: '16px', flexGrow: 1 }}>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <li>
                                    <Link
                                        href="/admin/dashboard"
                                        className={getNavClass(pathname === '/admin/dashboard')}
                                    >
                                        <LayoutDashboard size={18} /> Dashboard
                                        {pathname === '/admin/dashboard' && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/testimonials"
                                        className={getNavClass(pathname === '/admin/testimonials')}
                                    >
                                        <MessageSquare size={18} /> Testimonials
                                        {pathname === '/admin/testimonials' && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/farm-visits"
                                        className={getNavClass(pathname?.startsWith('/admin/farm-visits'))}
                                    >
                                        <Calendar size={18} /> Farm Visits
                                        {pathname?.startsWith('/admin/farm-visits') && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/enquiries"
                                        className={getNavClass(pathname?.startsWith('/admin/enquiries'))}
                                    >
                                        <Mail size={18} /> Enquiries
                                        {pathname?.startsWith('/admin/enquiries') && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                                    </Link>
                                </li>
                            </ul>

                            <div style={{ marginTop: '30px', padding: '0 8px' }}>
                                <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>Quick Links</h4>
                                <Link href="/" target="_blank" className={getNavClass(false)} style={{ color: 'var(--color-primary)' }}>
                                    <ExternalLink size={16} /> View Website
                                </Link>
                            </div>
                        </nav>

                        <div style={{ padding: '16px', borderTop: '1px solid #f5f5f5' }}>
                            <button
                                onClick={handleLogout}
                                className="signOutBtn"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && isMounted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdropVisible}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(3px)',
                            zIndex: 1090
                        }}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>

            <style jsx>{`
                .navItem {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    color: #444;
                    background: transparent;
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 2px;
                }
                .navItem:hover {
                    background: #f0fdf4;
                    color: var(--color-primary);
                }
                .navItemActive {
                    color: var(--color-primary-dark);
                    background: #f0fdf4;
                    font-weight: 600;
                    box-shadow: inset 4px 0 0 var(--color-primary);
                }
                :global(.signOutBtn) {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px;
                    border-radius: 10px;
                    color: #e53e3e;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                :global(.signOutBtn:hover) {
                    background: #fff5f5;
                }
                @media (max-width: 1024px) {
                    :global(.mobileCloseBtn) {
                        display: flex !important;
                    }
                }
            `}</style>
        </div>
    );
}

const getNavClass = (isActive: boolean) => `navItem ${isActive ? 'navItemActive' : ''}`;
