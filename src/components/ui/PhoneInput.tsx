'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Country {
    name: string;
    code: string;
    dial: string;
}

const countries: Country[] = [
    { name: 'India', code: 'IN', dial: '+91' },
    { name: 'United States', code: 'US', dial: '+1' },
    { name: 'United Kingdom', code: 'GB', dial: '+44' },
    { name: 'Canada', code: 'CA', dial: '+1' },
    { name: 'Australia', code: 'AU', dial: '+61' },
    { name: 'United Arab Emirates', code: 'AE', dial: '+971' },
    { name: 'Singapore', code: 'SG', dial: '+65' },
    { name: 'Malaysia', code: 'MY', dial: '+60' },
    { name: 'Germany', code: 'DE', dial: '+49' },
    { name: 'France', code: 'FR', dial: '+33' },
    { name: 'Japan', code: 'JP', dial: '+81' },
    { name: 'China', code: 'CN', dial: '+86' },
    { name: 'South Korea', code: 'KR', dial: '+82' },
    { name: 'Brazil', code: 'BR', dial: '+55' },
    { name: 'South Africa', code: 'ZA', dial: '+27' },
    { name: 'New Zealand', code: 'NZ', dial: '+64' },
    { name: 'Mexico', code: 'MX', dial: '+52' },
    { name: 'Spain', code: 'ES', dial: '+34' },
    { name: 'Italy', code: 'IT', dial: '+39' },
    { name: 'Netherlands', code: 'NL', dial: '+31' },
];

interface PhoneInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export default function PhoneInput({ label, value, onChange, required = false }: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default India
    const [localNumber, setLocalNumber] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Parse existing phone value on mount
    useEffect(() => {
        if (value) {
            // Try to extract country code from value
            const country = countries.find(c => value.startsWith(c.dial));
            if (country) {
                setSelectedCountry(country);
                setLocalNumber(value.slice(country.dial.length).trim());
            } else {
                setLocalNumber(value);
            }
        }
    }, []); // Only on mount

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dial.includes(searchTerm)
    );

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchTerm('');
        // Update parent with new country code
        onChange(`${country.dial}${localNumber}`);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ''); // Only numbers
        if (selectedCountry.dial === '+91') {
            input = input.slice(0, 10);
        }
        setLocalNumber(input);
        onChange(`${selectedCountry.dial}${input}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>
                {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                {/* Country Code Selector */}
                <div ref={dropdownRef} style={{ position: 'relative', width: '90px' }}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#fcfcfc',
                            border: '1.5px solid #f0f0f0',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: '#333',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.background = 'white';
                        }}
                        onMouseLeave={(e) => {
                            if (!isOpen) {
                                e.currentTarget.style.borderColor = '#f0f0f0';
                                e.currentTarget.style.background = '#fcfcfc';
                            }
                        }}
                    >
                        <span>{selectedCountry.dial}</span>
                        <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '4px',
                            width: '280px',
                            maxHeight: '320px',
                            background: 'white',
                            border: '1px solid #eee',
                            borderRadius: '16px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            zIndex: 1000,
                            overflow: 'hidden',
                            animation: 'slideDown 0.2s ease-out'
                        }}>
                            {/* Search Input */}
                            <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input
                                        type="text"
                                        placeholder="Search country or code..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 8px 8px 36px',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            outline: 'none'
                                        }}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Country List */}
                            <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => handleCountrySelect(country)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                background: selectedCountry.code === country.code ? '#f0fdf4' : 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid #f5f5f5',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '0.9rem',
                                                color: '#333',
                                                transition: 'all 0.15s'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedCountry.code !== country.code) {
                                                    e.currentTarget.style.background = '#f8fdf9';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedCountry.code !== country.code) {
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            <span style={{ fontWeight: selectedCountry.code === country.code ? 600 : 400 }}>{country.name}</span>
                                            <span style={{ color: '#666', fontSize: '0.85rem', fontWeight: 500 }}>{country.dial}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>
                                        No countries found
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    required={required}
                    placeholder="Enter phone number"
                    maxLength={15}
                    value={localNumber}
                    onChange={handlePhoneChange}
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        background: '#fcfcfc',
                        border: '1.5px solid #f0f0f0',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(46, 125, 50, 0.08)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#f0f0f0';
                        e.currentTarget.style.background = '#fcfcfc';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
