'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Target, MessageSquare, Send, CheckCircle, MapPin, ShieldCheck, Leaf, AlertCircle } from 'lucide-react';
import styles from './FarmVisit.module.css';
import { submitFarmVisitAction } from '../actions';

import Select from '@/components/ui/Select';
import DatePicker from '@/components/ui/DatePicker';
import PhoneInput from '@/components/ui/PhoneInput';
import ScrollReveal from '@/components/ScrollReveal';

export default function FarmVisitPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        visitDate: '',
        visitTime: '',
        visitorCount: '1',
        purpose: 'Educational',
        message: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleCustomChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation for custom selects
        if (!formData.visitDate) {
            setError("Please select a visit date");
            return;
        }
        if (!formData.visitTime) {
            setError("Please select a time slot");
            return;
        }

        // Phone validation (Exactly 10 digits for India)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (formData.phone.startsWith('+91') && phoneDigits.length !== 12) {
            setError("Please enter exactly 10 digits");
            return;
        }

        setLoading(true);

        const metadata = JSON.stringify({
            date: formData.visitDate,
            time: formData.visitTime,
            visitors: formData.visitorCount,
            purpose: formData.purpose
        });

        try {
            const result = await submitFarmVisitAction({
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                metadata
            });

            if (result.success) {
                setSubmitted(true);
            } else {
                setError(result.error || "Something went wrong. Please try again later.");
            }
        } catch (err) {
            setError("Failed to connect to the server. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    // Get tomorrow's date for min date validation
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <main className={styles.pageContainer}>
            <section className={styles.hero}>
                <ScrollReveal direction="up">
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Plan Your Visit
                    </motion.h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Step into the world of precision agriculture. We welcome students, professionals,
                        and families to witness our sustainable farming revolution first-hand.
                    </motion.p>
                </ScrollReveal>
            </section>

            <section className="container">
                <div className={styles.experienceGrid}>
                    {[
                        { icon: <Leaf />, title: "Precision Farming", desc: "Discover how we use technology to grow premium produce." },
                        { icon: <ShieldCheck />, title: "Guided Tours", desc: "Expert agronomists leading you through every stage of growth." },
                        { icon: <Target />, title: "Education Hub", desc: "Technical workshops for students and commercial growers." }
                    ].map((item, i) => (
                        <ScrollReveal key={i} direction="up" delay={0.1 * i}>
                            <motion.div
                                key={i}
                                className={styles.expCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className={styles.iconWrapper}>{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p className="text-muted">{item.desc}</p>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSidebar}>
                        <h2>Book a Session</h2>
                        <p className="text-muted">
                            Please fill out all details so we can prepare the best experience for your group.
                        </p>

                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}><MapPin size={20} /></div>
                                <div>
                                    <h4 style={{ color: 'var(--color-primary-dark)' }}>Location</h4>
                                    <a
                                        href="https://maps.app.goo.gl/YHm6X6iwEi5eMYPL8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="premium-address-link"
                                    >
                                        Exotica Farms, Kavathe Mala Road,<br />
                                        Nagar Highway, Kondhapuri, Pune 412209
                                    </a>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}><Clock size={20} /></div>
                                <div>
                                    <h4 style={{ color: 'var(--color-primary-dark)' }}>Visit Hours</h4>
                                    <p style={{ fontSize: '0.9rem' }}>Mon - Sat: 10:00 AM to 4:00 PM</p>
                                </div>
                            </div>

                            {/* Custom Farm Location Card */}
                            <motion.a
                                href="https://maps.app.goo.gl/YHm6X6iwEi5eMYPL8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mapCard}
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className={styles.mapEmbedContainer}>
                                    <img
                                        src="/images/Exotica Farms Location Image.png"
                                        alt="Exotica Farms Location Map"
                                        className={styles.mapStaticImg}
                                    />
                                    <div className={styles.mapOverlay}>
                                        <div className={styles.visitUsBadge}>
                                            <span>Visit Us →</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        </div>
                    </div>

                    <div className={styles.formWrapper}>
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    className={styles.successOverlay}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle size={80} className="text-primary" />
                                    <h3 style={{ marginTop: '20px', fontSize: '1.8rem' }}>Request Received</h3>
                                    <p className="text-muted">We will review your visit request and confirm via email/phone within 24 hours.</p>
                                    <button
                                        className={styles.submitBtn}
                                        style={{ marginTop: '30px' }}
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Back to Form
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    className={styles.visitForm}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={styles.errorMessage}
                                            >
                                                <AlertCircle size={18} />
                                                <span>{error}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className={styles.formGrid}>
                                        <div className={styles.inputGroup}>
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                placeholder="e.g. Advait Singh"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="advait@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <PhoneInput
                                                label="Phone Number"
                                                value={formData.phone}
                                                onChange={(val) => handleCustomChange('phone', val)}
                                                required
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Number of Visitors</label>
                                            <input
                                                type="number"
                                                name="visitorCount"
                                                min="1"
                                                max="50"
                                                required
                                                value={formData.visitorCount}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <DatePicker
                                                label="Preferred Date"
                                                value={formData.visitDate}
                                                onChange={(val) => handleCustomChange('visitDate', val)}
                                                minDate={minDate}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <Select
                                                label="Preferred Time"
                                                value={formData.visitTime}
                                                onChange={(val) => handleCustomChange('visitTime', val)}
                                                placeholder="Select a slot"
                                                options={[
                                                    { value: 'morning', label: 'Morning (10 AM - 12 PM)', icon: <Leaf size={14} color="#4caf50" /> },
                                                    { value: 'noon', label: 'Noon (12 PM - 2 PM)', icon: <Leaf size={14} color="#8bc34a" /> },
                                                    { value: 'afternoon', label: 'Afternoon (2 PM - 4 PM)', icon: <Leaf size={14} color="#f59e0b" /> },
                                                ]}
                                            />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                            <Select
                                                label="Purpose of Visit"
                                                value={formData.purpose}
                                                onChange={(val) => handleCustomChange('purpose', val)}
                                                options={[
                                                    { value: 'Educational', label: 'Educational / Student Trip' },
                                                    { value: 'Personal', label: 'Personal Interest / Home Gardening' },
                                                    { value: 'Business', label: 'Business / Commercial Inquiry' },
                                                    { value: 'Other', label: 'Other' },
                                                ]}
                                            />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                            <label>Additional Notes</label>
                                            <textarea
                                                name="message"
                                                rows={4}
                                                placeholder="Any specific area of interest or special requirements?"
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className={styles.submitBtn}>
                                        <Send size={18} />
                                        Request Visit Confirmation
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
}
