'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { motion } from 'framer-motion';
import { Leaf, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await loginAction(email, password);
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <main style={{
            minHeight: 'calc(100vh - var(--nav-height))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-earth-100)',
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'white',
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid #f0f0f0'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--color-primary)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 15px',
                        color: 'white'
                    }}>
                        <Leaf size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>Admin Login</h1>
                </div>

                {error && (
                    <div style={{
                        padding: '12px',
                        background: '#FFF5F5',
                        color: '#E53E3E',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: '1px solid #FED7D7'
                    }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@exoticafarm.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1.5px solid #eee',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1.5px solid #eee',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--color-primary-dark)',
                            color: 'white',
                            border: 'none',
                            padding: '14px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '10px',
                            transition: 'opacity 0.2s',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
