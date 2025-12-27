"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Infrastructure', path: '/infrastructure' },
        { name: 'Products', path: '/products' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Farm Visit', path: '/farm-visit' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image src="/images/logo.png" alt="Exotica Farm Logo" width={110} height={110} style={{ objectFit: 'contain' }} />
                    Exotica Farm
                </Link>

                {/* Desktop Links */}
                <div className={styles.navLinks}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`${styles.link} ${isActive ? styles.active : ''}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: 0,
                        width: '100%',
                        background: 'white',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        zIndex: 1001,
                        borderTop: '1px solid #f0f0f0'
                    }}>
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <Link
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-main)',
                                        display: 'block',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
