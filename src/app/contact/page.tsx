'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';
import { submitContactAction } from '../actions';
import PhoneInput from '@/components/ui/PhoneInput';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactUsPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCustomChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await submitContactAction({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        });
        if (result.success) {
            setSubmitted(true);
        } else {
            alert("Something went wrong. Please try again later.");
        }
        setLoading(false);
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <section className={styles.introSection}>
                    <ScrollReveal direction="left">
                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            Get in Touch
                        </motion.h1>
                    </ScrollReveal>
                    <ScrollReveal direction="left" delay={0.1}>
                        <motion.p
                            className={styles.subtitle}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Have a quick question or need support? Drop us a message and our team will get back to you shortly.
                        </motion.p>
                    </ScrollReveal>

                    <div className={styles.contactInfo}>
                        <ScrollReveal direction="up" delay={0.2}>
                            <motion.div
                                className={styles.infoBlock}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3><Phone size={24} /> Call Us</h3>
                                <p>+91 77210 75329</p>
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.3}>
                            <motion.div
                                className={styles.infoBlock}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3><Mail size={24} /> Email Us</h3>
                                <p>hello@exoticafarm.com</p>
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.4}>
                            <motion.div
                                className={styles.infoBlock}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3><MapPin size={24} /> Visit Office</h3>
                                <a
                                    href="https://maps.app.goo.gl/YHm6X6iwEi5eMYPL8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-address-link"
                                >
                                    Exotica Farms, Kavathe Mala Road, Kondhapuri, Pune - 412209
                                </a>
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.5}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <a href="https://wa.me/917721075329" className={styles.whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle size={20} />
                                    Chat on WhatsApp
                                </a>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </section>

                <section className={styles.formContainer}>
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                className={styles.successMsg}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <CheckCircle size={80} className="text-primary" style={{ margin: '0 auto 20px', display: 'block' }} />
                                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Message Sent!</h2>
                                <p className="text-muted">Thanks for reaching out. We'll reply within 2-3 business hours.</p>
                                <button
                                    className={styles.submitBtn}
                                    style={{ marginTop: '30px', width: '100%' }}
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                className={styles.formCard}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <form className={styles.contactForm} onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Your Name"
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
                                            placeholder="email@example.com"
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
                                        <label>Your Message</label>
                                        <textarea
                                            name="message"
                                            rows={6}
                                            required
                                            placeholder="How can we help you?"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitBtn}>
                                        <Send size={18} style={{ marginRight: '10px' }} />
                                        Send Enquiry
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </main>
    );
}
