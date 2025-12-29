'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Camera, Video, Play, Send, CheckCircle } from 'lucide-react';
import styles from './Testimonials.module.css';
import { submitTestimonialAction } from '../actions';

interface Testimonial {
    id: string | number;
    name: string;
    role: string;
    message: string;
    rating: number;
    photo?: string | null;
}

interface VideoReview {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
}

const VIDEO_REVIEWS: VideoReview[] = [
    {
        id: 1,
        title: "Farm to Table Experience",
        description: "Chef Marco visits Exotica Farms to see how his favorite mushrooms are grown.",
        thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800",
        videoUrl: "#"
    },
    {
        id: 2,
        title: "Sustainability at Scale",
        description: "An in-depth look at our vertical farming technology and water conservation.",
        thumbnail: "https://images.unsplash.com/photo-1592533011397-bb7189d9e68e?auto=format&fit=crop&q=80&w=800",
        videoUrl: "#"
    }
];

export default function TestimonialsContent({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await submitTestimonialAction({
            name,
            role,
            rating,
            text,
            image: image || undefined
        });

        if (result.success) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setName('');
                setRole('');
                setText('');
                setImage(null);
                setRating(5);
            }, 3000);
        }
        setIsSubmitting(false);
    };

    return (
        <main className={styles.pageContainer}>
            <section className={styles.hero}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Voices of Trust
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    From home kitchens to Michelin-star restaurants, discover why people choose Exotica Farms.
                </motion.p>
            </section>

            {/* Video Testimonials Section */}
            <section className="container" style={{ marginBottom: '100px' }}>
                <h2 className={styles.sectionTitle}>
                    <Video size={32} className="text-primary" />
                    Video Stories
                </h2>
                <div className={styles.videoGrid}>
                    {VIDEO_REVIEWS.map((video, idx) => (
                        <motion.div
                            key={video.id}
                            className={styles.videoCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >

                            <div className={styles.videoThumbnail}>
                                <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className={styles.playButton}>
                                    <Play fill="currentColor" size={24} />
                                </div>
                            </div>
                            <div className={styles.videoInfo}>
                                <h4>{video.title}</h4>
                                <p>{video.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Wall */}
            <section className="container" style={{ marginBottom: '100px' }}>
                <h2 className={styles.sectionTitle}>
                    <Quote size={32} className="text-primary" />
                    Review Wall
                </h2>
                <div className={styles.reviewsGrid}>
                    {initialTestimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            className={styles.reviewCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: (idx % 3) * 0.1,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            whileHover={{ y: -10 }}
                        >
                            {t.photo && (
                                <img src={t.photo} alt={t.name} className={styles.reviewImage} loading="lazy" />
                            )}
                            <div className={styles.reviewContent}>
                                <Quote className={styles.quoteIcon} size={40} />
                                <div className={styles.rating}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} color="#FFD700" />
                                    ))}
                                </div>
                                <p className={styles.reviewText}>"{t.message}"</p>
                                <div className={styles.reviewer}>
                                    <div className={styles.reviewerInfo}>
                                        <h4>{t.name}</h4>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <motion.section
                className="container"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className={styles.formSection}>

                    <div className={styles.formInfo}>
                        <h2>Share Your Experience</h2>
                        <p className="text-muted" style={{ marginBottom: '30px' }}>
                            Your feedback helps us grow. Share your story with our community and let others know about your journey with Exotica Farms.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ padding: '10px', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}>
                                    <Camera size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--color-primary-dark)' }}>Photo Upload</h4>
                                    <p style={{ fontSize: '0.85rem' }}>Show off your recipes or farm visits.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ padding: '10px', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}>
                                    <Star size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--color-primary-dark)' }}>Verified Reviews</h4>
                                    <p style={{ fontSize: '0.85rem' }}>Authentic feedback from our ecosystem.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formWrapper}>
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    className={styles.successMessage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    style={{ textAlign: 'center', padding: '40px' }}
                                >
                                    <CheckCircle size={80} className="text-primary" style={{ marginBottom: '20px', margin: '0 auto' }} />
                                    <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Thank You!</h3>
                                    <p>Your review has been added and is pending approval.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    className={styles.testimonialForm}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Rahul Sharma"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Who are you?</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Home Chef, Enthusiast, Restrateur"
                                            required
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Rating</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    size={24}
                                                    fill={s <= rating ? "#FFD700" : "none"}
                                                    color={s <= rating ? "#FFD700" : "#ddd"}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setRating(s)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Your Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="How was your experience with our products?"
                                            required
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Upload Photo</label>
                                        <div
                                            className={styles.photoUpload}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {image ? (
                                                <img src={image} alt="Preview" className={styles.photoPreview} />
                                            ) : (
                                                <>
                                                    <Camera size={32} color="#999" />
                                                    <span style={{ fontSize: '0.9rem', color: '#999' }}>Click to upload (JPG, PNG)</span>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                        <Send size={18} style={{ marginRight: '10px' }} />
                                        {isSubmitting ? 'Posting...' : 'Post Review'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}

