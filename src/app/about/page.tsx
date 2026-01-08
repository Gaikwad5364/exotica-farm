'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    Users,
    TrendingUp,
    Leaf,
    Sprout,
    Target,
    Linkedin,
    ChefHat,
    ShoppingBag,
    Calendar,
    ArrowRight,
    TreeDeciduous,
    Circle,
    Wind
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './About.module.css';

const timelineData = [
    {
        id: 1,
        year: 'Jan 2022',
        size: '100 sq ft',
        achievement: 'The Beginning',
        description: 'We started with a small experimental setup focused on mushroom cultivation. This phase was dedicated to understanding the fundamentals, techniques, and practical challenges of controlled farming.'
    },
    {
        id: 2,
        year: 'June 2022',
        size: '1,800 sq ft',
        achievement: 'Commercial Launch',
        description: 'After successful trials, we moved into commercial mushroom production. This marked our first step from experimentation to a market-ready agricultural operation.'
    },
    {
        id: 3,
        year: 'May 2023',
        size: '8,000 sq ft',
        achievement: 'Scaling & Market Expansion',
        description: 'Mushroom cultivation was expanded to a larger area. During this phase, we established strong market connections and streamlined distribution channels.'
    },
    {
        id: 4,
        year: 'April 2024',
        size: '15,000 sq ft',
        achievement: 'Product Diversification',
        description: 'We expanded beyond mushrooms by introducing English cucumbers. This milestone marked our entry into diversified, high-quality vegetable production.'
    },
    {
        id: 5,
        year: 'April 2025',
        size: '20,000 sq ft',
        achievement: 'Portfolio Expansion',
        description: 'Bell peppers were added to our product range, strengthening our presence in premium vegetable cultivation. This step reflected our focus on variety, quality, and controlled farming practices.'
    },
    {
        id: 6,
        year: 'Aug 2025',
        size: '40,000 sq ft',
        achievement: 'Large-Scale Production',
        description: 'Production of both English cucumbers and bell peppers was scaled up significantly. This phase represents our transition into large-scale, efficient, and sustainable farming operations.'
    }
];

const specialityCrops = [
    { name: 'Mushroom', icon: ChefHat },
    { name: 'Bell Pepper', icon: Leaf },
    { name: 'English Cucumber', icon: Sprout },
    { name: 'Broccoli', icon: TreeDeciduous },
    { name: 'Red Cabbage', icon: Circle },
    { name: 'Lettuce', icon: Wind }
];

export default function AboutPage() {
    const [activeMilestone, setActiveMilestone] = useState<any>(timelineData[0]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [smoothProgress, setSmoothProgress] = useState(0);

    const timelineSectionRef = useRef(null);
    const isTimelineInView = useInView(timelineSectionRef, { amount: 0.3, once: true });
    const activeIndex = activeMilestone ? timelineData.findIndex(m => m.id === activeMilestone.id) : -1;

    useEffect(() => {
        // Handle hash navigation on page load
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, []);

    // Optimized auto-play with requestAnimationFrame and Visibility API
    useEffect(() => {
        if (!isAutoPlaying) return;

        let animationFrameId: number;
        let startTime: number;
        const duration = 5000;

        const currentIndex = timelineData.findIndex(m => m.id === activeMilestone.id);
        const nextIndex = (currentIndex + 1) % timelineData.length;

        const startProgress = (currentIndex / (timelineData.length - 1)) * 100;
        const endProgress = (nextIndex / (timelineData.length - 1)) * 100;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Linear movement for perfectly consistent speed across all intervals
            const currentProgress = startProgress + (endProgress - startProgress) * progress;
            setSmoothProgress(currentProgress);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Precise sync point: update content the moment line arrives
                setActiveMilestone(timelineData[nextIndex]);
                setSmoothProgress(endProgress);
            }
        };

        // Pause animation when tab is not visible to prevent drift
        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                startTime = 0; // Reset start time to resume smoothly
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [activeMilestone, isAutoPlaying]);

    // Start autoplay only when section is in view
    useEffect(() => {
        if (isTimelineInView) {
            setIsAutoPlaying(true);
        }
    }, [isTimelineInView]);

    // Simple interaction resume logic (touchstart only for mobile feel)
    useEffect(() => {
        const handleInteraction = () => {
            if (!isAutoPlaying && isTimelineInView) setIsAutoPlaying(true);
        };

        window.addEventListener('touchstart', handleInteraction, { passive: true });
        return () => {
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isAutoPlaying, isTimelineInView]);

    const handleMilestoneClick = (milestone: any) => {
        const clickedIndex = timelineData.findIndex(m => m.id === milestone.id);
        setActiveMilestone(milestone);
        setSmoothProgress((clickedIndex / (timelineData.length - 1)) * 100);
        setIsAutoPlaying(false);
    };

    const handleScreenClick = () => {
        if (!isAutoPlaying) setIsAutoPlaying(true);
    };


    return (
        <main className={styles.aboutContainer}>
            {/* Founder Section */}
            <section id="founder" className={styles.founderSection}>
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h2 className={styles.sectionTitle}>Founder</h2>
                    </ScrollReveal>
                    <div className={styles.founderGrid}>
                        <ScrollReveal direction="left">
                            <a
                                href="https://www.linkedin.com/in/suraj-kulkarni-093747186?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.founderImageWrapper}
                            >
                                <Image
                                    src="/images/Founder-Suraj.png"
                                    alt="Suraj Kulkarni"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className={styles.founderPhoto}
                                />
                                <div className={styles.linkedinOverlay}>
                                    <Linkedin size={32} />
                                </div>
                            </a>
                        </ScrollReveal>
                        <div className={styles.founderContent}>
                            <ScrollReveal direction="right">
                                <h3>Suraj Kulkarni</h3>
                                <div className={styles.founderStory}>
                                    <p>
                                        Hailing from a middle-class family with a rural village background,
                                        Suraj Kulkarni completed his education in BA Economics Honor from Pune and secured a government job in Department of Post.
                                    </p>
                                    <p>
                                        Driven by a deep-seated interest in farming, he chose to leave his government
                                        position to pursue the long-term potential of modern, quality-focused agriculture.
                                        His vision and dedication led to the foundation of Exotica Farms, where he bridges
                                        traditional agricultural wisdom with modern technological innovation.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section - Standout Design */}
            <section className={styles.storySection}>
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Our Story</h2>
                    </ScrollReveal>
                    <div className={styles.storyContent}>
                        <ScrollReveal direction="up" delay={0.1}>
                            <div className={styles.storyGrid}>
                                <div className={styles.storyTextItem}>
                                    <h3 className={styles.storySubtitle}>Where Tradition Meets Technology</h3>
                                    <p>
                                        At Exotica Farms, we believe in the future of agriculture. By combining traditional
                                        farming wisdom with cutting-edge greenhouse technology, we create the perfect
                                        environment for crops to thrive.
                                    </p>
                                    <p>
                                        Our journey began with a simple mission: to provide the freshest, residue-free &
                                        export quality produce while preserving our soil and water resources. Today, we are proud to
                                        be leaders in protected farming.
                                    </p>
                                </div>
                                <div className={styles.storySeparator}></div>
                                <div className={styles.storyTextItem}>
                                    <h3 className={styles.storySubtitle}>Modern & Sustainable</h3>
                                    <p>
                                        Exotica Farms is a pioneer in modern and sustainable farming practices,
                                        specializing in the cultivation of premium exotic vegetables. By leveraging
                                        controlled cultivation techniques and global agriculture practice,
                                        we ensure unparalleled quality, consistency, and nutritional value.
                                    </p>
                                    <span className={styles.storyHighlight}>
                                        Premium Produce, Sustainable Future.
                                    </span>
                                    <p style={{ marginTop: '20px', opacity: 0.8 }}>
                                        Our mission is to supply fresh, residue-free produce to businesses and
                                        partners who value excellence in every harvest.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Growth Journey Section */}
            <section
                ref={timelineSectionRef}
                className={`${styles.section} ${styles.timelineSection}`}
                onClick={handleScreenClick}
            >
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h2 className={styles.sectionTitle}>Our Growth Journey</h2>
                        <p className="text-muted text-center" style={{ maxWidth: '800px', margin: '0 auto 20px', fontSize: '1rem', lineHeight: '1.6' }}>
                            Precision-engineered for maximum yield, every square foot of controlled farming
                            delivers significantly higher quality and volume than traditional open fields.
                        </p>
                    </ScrollReveal>

                    <div className={styles.timelineWrapper}>
                        <div className={styles.timeline}>
                            <div className={styles.timelineLine}></div>
                            <div
                                className={styles.timelineProgress}
                                style={{ '--progress-value': smoothProgress, transition: 'none' } as any}
                            ></div>
                            {timelineData.map((milestone) => (
                                <div
                                    key={milestone.id}
                                    className={`${styles.timelinePoint} ${activeMilestone?.id === milestone.id ? styles.active : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMilestoneClick(milestone);
                                    }}
                                >
                                    <div className={styles.pointCircle}></div>
                                    <div className={styles.pointText}>
                                        <span className={styles.pointYear}>{milestone.year}</span>
                                        <span className={styles.pointSize}>{milestone.size}</span>
                                        <AnimatePresence>
                                            {activeMilestone?.id === milestone.id && (
                                                <motion.div
                                                    className={styles.mobileDescription}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <h4>{milestone.achievement}</h4>
                                                    <p>{milestone.description}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeMilestone && (
                                <motion.div
                                    key={activeMilestone.id}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1] // Quintic ease-out for a smooth, premium feel
                                    }}
                                    className={styles.milestoneDescription}
                                    style={{ '--progress-value': (activeIndex / (timelineData.length - 1)) * 100, position: 'relative' } as any}
                                >
                                    <div style={{ width: '100%' }}>
                                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '12px', fontSize: '1.55rem' }}>
                                            {activeMilestone.achievement}
                                        </h4>
                                        <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>{activeMilestone.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Projected Expansion Section */}
            <section className={`${styles.section}`} style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white' }}>
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Looking Ahead</h2>
                    </ScrollReveal>
                    <div className={styles.expansionGrid}>
                        <ScrollReveal direction="left" delay={0.1}>
                            <div className={styles.expansionCard}>
                                <span className={styles.expansionValue}>80,000+</span>
                                <span className={styles.expansionLabel}>Sq Ft Controlled Farming</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.1}>
                            <div className={styles.expansionCard} style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <span className={styles.expansionValue} style={{ color: 'white' }}>40,000</span>
                                <span className={styles.expansionLabel} style={{ color: 'rgba(255,255,255,0.7)' }}>Sq Ft Open Farming</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Our Speciality Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h2 className={styles.sectionTitle}>Specialised In</h2>
                    </ScrollReveal>
                    <p className={styles.specialitySubheading}>Exotic Produce</p>

                    <div className={styles.cropsGrid}>
                        {specialityCrops.map((crop, index) => (
                            <ScrollReveal key={crop.name} direction="up" delay={index * 0.1}>
                                <div className={styles.cropCard}>
                                    <crop.icon className={styles.cropIcon} color="var(--color-primary)" />
                                    <span className={styles.cropName}>{crop.name}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
