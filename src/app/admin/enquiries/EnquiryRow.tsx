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
            <tr style={{ borderBottom: '1px solid #f5f5f5', opacity: loading ? 0.5 : 1 }}>
                <td style={tdStyle} suppressHydrationWarning>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: enquiry.type === 'farm_visit' ? '#3b82f6' : '#8b5cf6'
                        }}>
                            {enquiry.type === 'farm_visit' ? <Calendar size={14} /> : <Mail size={14} />}
                            {enquiry.type.replace('_', ' ')}
                        </div>
                        {isContacted && status === 'pending' ? (
                            <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '10px',
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
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: '10px',
                                width: 'fit-content',
                                background: status === 'approved' ? '#f0fdf4' : status === 'rejected' ? '#fef2f2' : '#fffbeb',
                                color: status === 'approved' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#d97706',
                                textTransform: 'capitalize'
                            }}>
                                {status}
                            </span>
                        )}
                    </div>
                </td>
                <td style={tdStyle}>
                    <div>
                        <div style={{ fontWeight: 600 }}>{enquiry.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{enquiry.email}</div>
                        {enquiry.phone && <div style={{ fontSize: '0.8rem', color: '#999' }}>{enquiry.phone}</div>}
                    </div>
                </td>
                <td style={{ ...tdStyle, maxWidth: '400px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>
                        {enquiry.message}
                    </div>
                    {enquiry.type === 'farm_visit' && (
                        <div style={{
                            fontSize: '0.75rem',
                            background: '#f8fafc',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '8px'
                        }}>
                            <div><strong>Date:</strong> {metadata.date}</div>
                            <div><strong>Time:</strong> {metadata.time}</div>
                            <div><strong>Visitors:</strong> {metadata.visitors}</div>
                            <div><strong>Purpose:</strong> {metadata.purpose}</div>
                            {status === 'rejected' && enquiry.rejectionReason && (
                                <div style={{ gridColumn: '1 / -1', color: '#dc2626', borderTop: '1px solid #fee2e2', paddingTop: '4px', marginTop: '4px' }}>
                                    <strong>Rejection Note:</strong> {enquiry.rejectionReason}
                                </div>
                            )}
                        </div>
                    )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {/* Actions remain ALWAYS visible now */}
                        <button
                            onClick={() => setShowReplyModal(true)}
                            style={{ ...actionBtnStyle, background: '#eef2ff', color: '#4f46e5' }}
                            title="Reply via Email"
                        >
                            <Mail size={16} />
                        </button>

                        {enquiry.phone && (
                            <button
                                onClick={handleWhatsApp}
                                style={{ ...actionBtnStyle, background: '#f0fdf4', color: '#16a34a' }}
                                title="Contact via WhatsApp"
                            >
                                <MessageCircle size={16} />
                            </button>
                        )}

                        {/* Approve/Reject logic: ONLY for pending Farm Visits */}
                        {enquiry.type === 'farm_visit' && status === 'pending' && (
                            <>
                                <button
                                    onClick={() => setShowApproveConfirm(true)}
                                    disabled={loading}
                                    style={{ ...actionBtnStyle, background: '#f0fdf4', color: '#16a34a' }}
                                    title="Approve Visit"
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    disabled={loading}
                                    style={{ ...actionBtnStyle, background: '#fef2f2', color: '#dc2626' }}
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
                            title="PERMANENT DELETE"
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
