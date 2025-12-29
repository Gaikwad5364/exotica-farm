'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
    value: string; // YYYY-MM-DD
    onChange: (value: string) => void;
    minDate?: string;
    label?: string;
}

export default function DatePicker({ value, onChange, minDate, label }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    // Date Logic
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const monthYearStr = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minDateObj = minDate ? new Date(minDate) : null;
    if (minDateObj) minDateObj.setHours(0, 0, 0, 0);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMonthChange = (offset: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const d = new Date(value);
        return d.getDate() === day && d.getMonth() === viewDate.getMonth() && d.getFullYear() === viewDate.getFullYear();
    };

    const isDisabled = (day: number) => {
        const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        d.setHours(0, 0, 0, 0);
        if (minDateObj && d < minDateObj) return true;
        return false;
    };

    const formatDate = (day: number) => {
        const month = String(viewDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${viewDate.getFullYear()}-${month}-${dayStr}`;
    };

    const displayValue = value ? new Date(value).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }) : 'Select Date';

    return (
        <div className="custom-datepicker-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
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
                    color: value ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    transition: 'all 0.2s',
                    boxShadow: isOpen ? '0 0 0 4px rgba(46, 125, 50, 0.08)' : 'none'
                }}
            >
                <span>{displayValue}</span>
                <CalendarIcon size={18} style={{ color: 'var(--color-primary)' }} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 4 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                            border: '1px solid #f0f0f0',
                            padding: '16px',
                            zIndex: 100,
                            width: '280px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <button type="button" onClick={() => handleMonthChange(-1)} style={navBtnStyle}><ChevronLeft size={16} /></button>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>{monthYearStr}</span>
                            <button type="button" onClick={() => handleMonthChange(1)} style={navBtnStyle}><ChevronRight size={16} /></button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                <div key={d} style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', marginBottom: '4px' }}>{d}</div>
                            ))}
                            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const disabled = isDisabled(day);
                                const currentSelect = isSelected(day);
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => {
                                            onChange(formatDate(day));
                                            setIsOpen(false);
                                        }}
                                        style={{
                                            aspectRatio: '1',
                                            borderRadius: '50%',
                                            border: 'none',
                                            background: currentSelect ? 'var(--color-primary)' : 'transparent',
                                            color: currentSelect ? 'white' : disabled ? '#ccc' : 'var(--color-text-main)',
                                            fontSize: '0.85rem',
                                            cursor: disabled ? 'default' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s',
                                            fontWeight: currentSelect ? 700 : 400
                                        }}
                                        className={!disabled && !currentSelect ? 'hover-day' : ''}
                                        onMouseEnter={(e) => {
                                            if (!disabled && !currentSelect) e.currentTarget.style.background = '#f0fdf4';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!disabled && !currentSelect) e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const navBtnStyle = {
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #eee',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#666'
};
