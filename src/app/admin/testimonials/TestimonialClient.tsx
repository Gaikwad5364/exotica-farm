'use client';

import { useState } from 'react';
import {
    Check,
    Trash2,
    Star,
    Plus,
    X,
    Ban,
    Image as ImageIcon
} from 'lucide-react';
import { approveTestimonial, deleteTestimonial, addAdminTestimonial, rejectTestimonial } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import Select from '@/components/ui/Select';
import ConfirmModal from '@/components/ConfirmModal';

export default function TestimonialClient({ initialData }: { initialData: any[] }) {
    const [testimonials, setTestimonials] = useState(initialData);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setLoading(id);
        const result = await approveTestimonial(id);
        if (result.success) {
            setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t));
        }
        setLoading(null);
    };

    const handleReject = async (id: string) => {
        setLoading(id);
        const result = await rejectTestimonial(id);
        if (result.success) {
            setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t));
        }
        setLoading(null);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setLoading(deleteId);
        const result = await deleteTestimonial(deleteId);
        if (result.success) {
            setTestimonials(prev => prev.filter(t => t.id !== deleteId));
            setDeleteId(null);
        }
        setLoading(null);
    };

    const filtered = activeFilter === 'all'
        ? testimonials
        : testimonials.filter(t => t.status === activeFilter);

    const getCount = (s: string) => testimonials.filter(t => t.status === s).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Tab label="All" active={activeFilter === 'all'} count={testimonials.length} onClick={() => setActiveFilter('all')} />
                    <Tab label="Pending" active={activeFilter === 'pending'} count={getCount('pending')} onClick={() => setActiveFilter('pending')} />
                    <Tab label="Approved" active={activeFilter === 'approved'} count={getCount('approved')} onClick={() => setActiveFilter('approved')} />
                    <Tab label="Rejected" active={activeFilter === 'rejected'} count={getCount('rejected')} onClick={() => setActiveFilter('rejected')} />
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--color-primary-dark)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    <Plus size={18} />
                    Add Official Review
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <AddTestimonialModal
                        onClose={() => setShowAddForm(false)}
                        onSuccess={(newT) => {
                            setTestimonials([newT, ...testimonials]);
                            setShowAddForm(false);
                            setActiveFilter('approved');
                        }}
                    />
                )}
            </AnimatePresence>

            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}>Review</th>
                            <th style={thStyle}>Rating</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((t) => (
                            <tr key={t.id} style={{ borderBottom: '1px solid #f5f5f5', opacity: loading === t.id ? 0.5 : 1 }}>
                                <td style={tdStyle} suppressHydrationWarning>{new Date(t.createdAt).toLocaleDateString()}</td>
                                <td style={tdStyle}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{t.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#999' }}>{t.role}</div>
                                    </div>
                                </td>
                                <td style={{ ...tdStyle, maxWidth: '300px' }}>
                                    <div style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#555' }}>
                                        {t.photo && <ImageIcon size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />}
                                        "{t.message}"
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: t.status === 'approved' ? '#ecfdf5' : t.status === 'rejected' ? '#fef2f2' : '#fffbeb',
                                        color: t.status === 'approved' ? '#059669' : t.status === 'rejected' ? '#dc2626' : '#d97706',
                                        textTransform: 'capitalize'
                                    }}>
                                        {t.status}
                                    </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        {t.status !== 'approved' && (
                                            <button
                                                onClick={() => handleApprove(t.id)}
                                                disabled={!!loading}
                                                style={{ ...iconBtnStyle, color: '#059669', background: '#ecfdf5' }}
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                        )}
                                        {t.status !== 'rejected' && (
                                            <button
                                                onClick={() => handleReject(t.id)}
                                                disabled={!!loading}
                                                style={{ ...iconBtnStyle, color: '#dc2626', background: '#fef2f2' }}
                                                title="Reject"
                                            >
                                                <Ban size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setDeleteId(t.id)}
                                            disabled={!!loading}
                                            style={{ ...iconBtnStyle, color: '#999', background: '#f5f5f5' }}
                                            title="Delete Permanently"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: '60px', textAlign: 'center', color: '#999' }}>
                                    No {activeFilter} testimonials found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                loading={!!loading && loading === deleteId}
                title="Delete Testimonial"
                message="This action will permanently delete this testimonial from the system. It will no longer be visible on the website."
                confirmLabel="Delete Review"
            />
        </div>
    );
}

function Tab({ label, active, count, onClick }: { label: string, active: boolean, count: number, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '8px 16px',
                borderRadius: '50px',
                background: active ? '#f0f0f0' : 'transparent',
                color: active ? '#1a1a1a' : '#666',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
            }}
        >
            {label}
            {count > 0 && (
                <span style={{
                    background: active ? 'white' : '#eee',
                    padding: '1px 7px',
                    borderRadius: '10px',
                    fontSize: '0.7rem'
                }}>{count}</span>
            )}
        </button>
    );
}

function AddTestimonialModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: (t: any) => void }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        rating: 5,
        message: '',
        photo: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const result = await addAdminTestimonial(formData);
        if (result.success) {
            onSuccess(result.data);
        }
        setSubmitting(false);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '480px',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>Add Official Review</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="inputGroup">
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div className="inputGroup">
                        <label style={labelStyle}>Role / Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Regular Customer"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div className="inputGroup">
                        <Select
                            label="Rating"
                            value={formData.rating.toString()}
                            onChange={val => setFormData({ ...formData, rating: parseInt(val) })}
                            options={[
                                { value: '5', label: '5 - Excellent', icon: <Star size={14} fill="#fbbf24" color="#fbbf24" /> },
                                { value: '4', label: '4 - Very Good', icon: <Star size={14} fill="#fbbf24" color="#fbbf24" /> },
                                { value: '3', label: '3 - Good', icon: <Star size={14} fill="#fbbf24" color="#fbbf24" /> },
                                { value: '2', label: '2 - Fair', icon: <Star size={14} fill="#fbbf24" color="#fbbf24" /> },
                                { value: '1', label: '1 - Poor', icon: <Star size={14} fill="#fbbf24" color="#fbbf24" /> },
                            ]}
                        />
                    </div>
                    <div className="inputGroup">
                        <label style={labelStyle}>Message</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Testimonial content..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            style={inputStyle}
                        ></textarea>
                    </div>
                    <div className="inputGroup">
                        <label style={labelStyle}>Photo URL (Optional)</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            value={formData.photo}
                            onChange={e => setFormData({ ...formData, photo: e.target.value })}
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            marginTop: '10px',
                            padding: '14px',
                            background: 'var(--color-primary-dark)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {submitting ? 'Saving...' : 'Publish Testimonial'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

const thStyle = { padding: '12px 20px', fontSize: '0.8rem', fontWeight: 600, color: '#666' };
const tdStyle = { padding: '14px 20px', verticalAlign: 'middle', fontSize: '0.9rem' };
const iconBtnStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.1s'
};
const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.8rem', fontWeight: 600, color: '#555' };
const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #f0f0f0',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    background: '#fcfcfc'
};
