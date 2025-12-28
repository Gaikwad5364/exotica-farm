'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    bgColor: string;
    href: string;
}

export default function StatCard({ title, value, icon, bgColor, href }: StatCardProps) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%'
                }}
            >
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 8px 20px ${bgColor}40`
                }}>
                    {icon}
                </div>
                <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{title}</h4>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', margin: 0, letterSpacing: '-0.02em' }}>{value}</p>
                </div>
            </motion.div>
        </Link>
    );
}
