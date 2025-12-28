'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, Mail, Calendar, Trash2, MessageCircle, Send as SendIcon } from 'lucide-react';
import { approveEnquiry, rejectEnquiry, deleteEnquiry, replyEnquiryAction, markAsContacted } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmModal from '@/components/ConfirmModal';

export default function EnquiryRow({ enquiry }: { enquiry: any }) {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState(enquiry.status || 'pending');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [isContacted, setIsContacted] = useState(enquiry.isContacted || false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const metadata = enquiry.metadata ? JSON.parse(enquiry.metadata) : {};

    const handleApprove = async () => {
        setLoading(true);
        const result = await approveEnquiry(enquiry.id);
        if (result.success) {
            setStatus('approved');
            setShowApproveConfirm(false);
        }
        setLoading(false);
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return alert("Please provide a reason for rejection.");
        setLoading(true);
        const result = await rejectEnquiry(enquiry.id, rejectionReason);
        if (result.success) {
            setStatus('rejected');
            setShowRejectModal(false);
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const result = await deleteEnquiry(enquiry.id);
        if (result.success) {
            setStatus('deleted');
            setShowDeleteConfirm(false);
        }
        setLoading(false);
    };

    const handleWhatsApp = () => {
        if (!enquiry.phone) return alert("No phone number available.");
        const cleanPhone = enquiry.phone.replace(/\D/g, '');
        const message = `Hi ${enquiry.name}, this is regarding your enquiry at Exotica Farm...`;
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // Mark as contacted in the background
        markAsContacted(enquiry.id);
        setIsContacted(true);
    };

    const handleReply = async () => {
        if (!replyMessage.trim()) return alert("Please type a message.");
        setLoading(true);
        const result = await replyEnquiryAction(enquiry.id, replyMessage);
        if (result.success) {
            setIsContacted(true);
            setShowReplyModal(false);
            setReplyMessage('');
        } else {
            alert(result.error || "Failed to send email");
        }
        setLoading(false);
    };

    if (status === 'deleted') return null;

    return (
        <>
            <tr style={{
                borderBottom: '1px solid #f8f8f8',
                opacity: loading ? 0.5 : 1,
                transition: 'background 0.2s'
            }}>
                <td style={tdStyle} suppressHydrationWarning>
                    <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{new Date(enquiry.createdAt).toLocaleDateString()}</div>
                    <div style={{ fontSize: '0.75rem', color: '#999' }}>{new Date(enquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: enquiry.type === 'farm_visit' ? '#2563eb' : '#7c3aed'
                        }}>
                            <div style={{ background: enquiry.type === 'farm_visit' ? '#eff6ff' : '#f5f3ff', padding: '4px', borderRadius: '6px' }}>
                                {enquiry.type === 'farm_visit' ? <Calendar size={12} /> : <Mail size={12} />}
                            </div>
                            {enquiry.type.replace('_', ' ')}
                        </div>
                        {isContacted && status === 'pending' ? (
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '8px',
                                background: '#eef2ff',
                                color: '#4f46e5',
                                textTransform: 'uppercase',
                                border: '1px solid #e0e7ff',
                                width: 'fit-content'
                            }}>
                                Communicating
                            </span>
                        ) : (
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '8px',
                                width: 'fit-content',
                                background: status === 'approved' ? '#f0fdf4' : status === 'rejected' ? '#fef2f2' : '#fffbeb',
                                color: status === 'approved' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#d97706',
                                textTransform: 'uppercase',
                                border: `1px solid ${status === 'approved' ? '#dcfce7' : status === 'rejected' ? '#fee2e2' : '#fef3c7'}`
                            }}>
                                {status}
                            </span>
                        )}
                    </div>
                </td>
                <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.95rem' }}>{enquiry.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>{enquiry.email}</div>
                        {enquiry.phone && (
                            <div style={{
                                fontSize: '0.8rem',
                                color: '#444',
                                marginTop: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: '#f8fafc',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                width: 'fit-content'
                            }}>
                                <MessageCircle size={12} /> {enquiry.phone}
                            </div>
                        )}
                    </div>
                </td>
                <td style={{ ...tdStyle, maxWidth: '400px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', marginBottom: '12px' }}>
                        {enquiry.message}
                    </div>
                    {enquiry.type === 'farm_visit' && (
                        <div style={{
                            fontSize: '0.75rem',
                            background: '#ffffff',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                        }}>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>Requested Date</span>
                                <span style={{ fontWeight: 600 }}>{metadata.date}</span>
                            </div>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>Time Slot</span>
                                <span style={{ fontWeight: 600 }}>{metadata.time}</span>
                            </div>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>Visitors</span>
                                <span style={{ fontWeight: 600 }}>{metadata.visitors} people</span>
                            </div>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>Purpose</span>
                                <span style={{ fontWeight: 600 }}>{metadata.purpose}</span>
                            </div>
                            {status === 'rejected' && enquiry.rejectionReason && (
                                <div style={{
                                    gridColumn: '1 / -1',
                                    color: '#dc2626',
                                    borderTop: '1px solid #fee2e2',
                                    paddingTop: '8px',
                                    marginTop: '4px',
                                    fontSize: '0.8rem'
                                }}>
                                    <strong>Rejection Note:</strong> {enquiry.rejectionReason}
                                </div>
                            )}
                        </div>
                    )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                            onClick={() => setShowReplyModal(true)}
                            style={{ ...actionBtnStyle, background: '#f1f5f9', color: '#475569' }}
                            title="Reply via Email"
                        >
                            <Mail size={16} />
                        </button>

                        {enquiry.phone && (
                            <button
                                onClick={handleWhatsApp}
                                style={{ ...actionBtnStyle, background: '#dcfce7', color: '#16a34a' }}
                                title="Contact via WhatsApp"
                            >
                                <MessageCircle size={16} />
                            </button>
                        )}

                        {enquiry.type === 'farm_visit' && status === 'pending' && (
                            <>
                                <button
                                    onClick={() => setShowApproveConfirm(true)}
                                    disabled={loading}
                                    style={{ ...actionBtnStyle, background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' }}
                                    title="Approve Visit"
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    disabled={loading}
                                    style={{ ...actionBtnStyle, background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' }}
                                    title="Reject Visit"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            disabled={loading}
                            style={{ ...actionBtnStyle, background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3' }}
                            title="DELETE RECORD"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>

            <ConfirmModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                loading={loading}
                title="Confirm Deletion"
                message="This action will permanently delete this record. This cannot be undone."
                confirmLabel="Delete Forever"
            />

            <ConfirmModal
                isOpen={showApproveConfirm}
                onClose={() => setShowApproveConfirm(false)}
                onConfirm={handleApprove}
                loading={loading}
                title="Approve Visit Request"
                message={`Are you sure you want to approve the farm visit for ${enquiry.name}? An automatic confirmation email will be sent.`}
                confirmLabel="Approve"
                variant="info"
            />

            {(mounted && typeof document !== 'undefined') && createPortal(
                <AnimatePresence>
                    {showRejectModal && (
                        <div style={modalOverlayStyle}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={modalContentStyle}
                            >
                                <h3 style={{ marginBottom: '15px' }}>Reject Visit Request</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
                                    Please provide a reason for rejection. This will be sent as an email and WhatsApp message to the user.
                                </p>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g. We are fully booked for this date..."
                                    style={textareaStyle}
                                    rows={4}
                                />
                                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                    <button
                                        onClick={() => setShowRejectModal(false)}
                                        style={{ ...btnStyle, background: '#eee', color: '#666' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        disabled={loading}
                                        style={{ ...btnStyle, background: '#dc2626', color: 'white', flexGrow: 1 }}
                                    >
                                        {loading ? 'Sending...' : 'Confirm Rejection'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {showReplyModal && (
                        <div style={modalOverlayStyle}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={modalContentStyle}
                            >
                                <h3 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={24} style={{ color: '#4f46e5' }} />
                                    Reply to {enquiry.name}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
                                    Send a personalized email response to <strong>{enquiry.email}</strong>.
                                </p>
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your response here..."
                                    style={textareaStyle}
                                    rows={6}
                                />
                                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                    <button
                                        onClick={() => setShowReplyModal(false)}
                                        style={{ ...btnStyle, background: '#eee', color: '#666' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReply}
                                        disabled={loading}
                                        style={{ ...btnStyle, background: '#4f46e5', color: 'white', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        {loading ? 'Sending...' : (
                                            <>
                                                <SendIcon size={18} />
                                                Send Reply
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

const tdStyle = { padding: '14px 20px', verticalAlign: 'top', fontSize: '0.9rem' };
const actionBtnStyle = {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s'
};

const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};

const modalContentStyle: React.CSSProperties = {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '450px',
};

const textareaStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #f0f0f0',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'none' as any,
    background: '#fcfcfc',
    transition: 'all 0.2s'
};

const btnStyle = {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
};
