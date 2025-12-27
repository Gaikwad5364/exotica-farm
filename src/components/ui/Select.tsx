'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export default function Select({ options, value, onChange, placeholder = 'Select an option', label }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="custom-select-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-primary-dark)'
                }}>
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#fcfcfc',
                    border: isOpen ? '1.5px solid var(--color-primary)' : '1.5px solid #f0f0f0',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    color: selectedOption ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isOpen ? '0 0 0 4px rgba(46, 125, 50, 0.08)' : 'none',
                    transform: isOpen ? 'translateY(-1px)' : 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedOption?.icon}
                    <span>{selectedOption ? selectedOption.label : placeholder}</span>
                </div>
                <ChevronDown
                    size={18}
                    style={{
                        color: 'var(--color-primary)',
                        transition: 'transform 0.2s',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
                    }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #f0f0f0',
                            padding: '6px',
                            margin: 0,
                            listStyle: 'none',
                            zIndex: 100,
                            maxHeight: '260px',
                            overflowY: 'auto'
                        }}
                    >
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: value === option.value ? 'rgba(46, 125, 50, 0.06)' : 'transparent',
                                        color: value === option.value ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        fontSize: '0.92rem',
                                        textAlign: 'left',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (value !== option.value) {
                                            e.currentTarget.style.background = '#fafafa';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (value !== option.value) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {option.icon}
                                        <span style={{ fontWeight: value === option.value ? 600 : 400 }}>{option.label}</span>
                                    </div>
                                    {value === option.value && <Check size={16} color="var(--color-primary)" />}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
