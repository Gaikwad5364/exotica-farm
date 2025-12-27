'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    variant = 'danger',
    loading = false
}: ConfirmModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    const colors = {
        danger: {
            bg: '#fff1f2',
            text: '#e11d48',
            border: '#fecdd3',
            button: '#e11d48',
            hover: '#be123c'
        },
        warning: {
            bg: '#fffbeb',
            text: '#d97706',
            border: '#fef3c7',
            button: '#d97706',
            hover: '#b45309'
        },
        info: {
            bg: '#eff6ff',
            text: '#3b82f6',
            border: '#dbeafe',
            button: '#3b82f6',
            hover: '#2563eb'
        }
    };

    const activeColor = colors[variant];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div style={overlayStyle}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={modalStyle}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={headerStyle}>
                            <div style={{
                                ...iconWrapperStyle,
                                background: activeColor.bg,
                                color: activeColor.text
                            }}>
                                <AlertCircle size={24} />
                            </div>
                            <button onClick={onClose} style={closeBtnStyle}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={contentStyle}>
                            <h3 style={titleStyle}>{title}</h3>
                            <p style={messageStyle}>{message}</p>
                        </div>

                        <div style={footerStyle}>
                            <button
                                onClick={onClose}
                                disabled={loading}
                                style={cancelBtnStyle}
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                style={{
                                    ...confirmBtnStyle,
                                    background: activeColor.button
                                }}
                            >
                                {loading ? 'Processing...' : confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px'
};

const modalStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
    position: 'relative'
};

const headerStyle: React.CSSProperties = {
    padding: '24px 24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
};

const iconWrapperStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const contentStyle: React.CSSProperties = {
    padding: '16px 24px 24px',
};

const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '8px'
};

const messageStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: 1.5
};

const footerStyle: React.CSSProperties = {
    padding: '16px 24px 24px',
    display: 'flex',
    gap: '12px',
    background: '#fafafa'
};

const cancelBtnStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #eee',
    background: 'white',
    color: '#666',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s'
};

const confirmBtnStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s'
};
