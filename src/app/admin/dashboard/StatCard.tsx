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
                whileHover={{ y: -3, boxShadow: '0 6px 16px rgba(0,0,0,0.04)' }}
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '100%'
                }}
            >
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {icon}
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#666', marginBottom: '2px', fontWeight: 500 }}>{title}</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{value}</p>
                </div>
            </motion.div>
        </Link>
    );
}
