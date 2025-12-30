'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
        description: 'Started as a small experimental setup to test controlled environment farming. Focused on learning the fundamentals of hydroponics and protected cultivation.'
    },
    {
        id: 2,
        year: 'June 2022',
        size: '1,800 sq ft',
        achievement: 'Commercial Validation',
        description: 'Successfully expanded to a larger shade net area. Validated the commercial potential of premium bell peppers and established first local retail leads.'
    },
    {
        id: 3,
        year: 'May 2023',
        size: '8,000 sq ft',
        achievement: 'Infrastructure Scale',
        description: 'Transformed operations with multi-span polyhouses. Introduced European cucumbers and streamlined harvesting processes for higher consistency.'
    },
    {
        id: 4,
        year: 'April 2024',
        size: '15,000 sq ft',
        achievement: 'Operational Excellence',
        description: 'Reached a major milestone in production capacity. Implemented advanced climate control systems to ensure premium quality regardless of external weather.'
    },
    {
        id: 5,
        year: 'April 2025',
        size: '20,000 sq ft',
        achievement: 'Strategic Expansion',
        description: 'Currently scaling to dominate the regional exotic produce market. Focus on high-value crops with precision automation.'
    },
    {
        id: 6,
        year: 'Aug 2025',
        size: '40,000 sq ft',
        achievement: 'Market Leadership',
        description: 'Targeted capacity to become the primary supply partner for major HORECA businesses and premium export-quality produce.'
    }
];

const specialityCrops = [
    { name: 'Mushroom', icon: ChefHat },
    { name: 'Bell Pepper', icon: Leaf },
    { name: 'European Cucumber', icon: Sprout },
    { name: 'Broccoli', icon: TreeDeciduous },
    { name: 'Red Cabbage', icon: Circle },
    { name: 'Lettuce', icon: Wind }
];

export default function AboutPage() {
    const [activeMilestone, setActiveMilestone] = useState<any>(timelineData[0]);
    const activeIndex = activeMilestone ? timelineData.findIndex(m => m.id === activeMilestone.id) : -1;
    const progressPercentage = activeIndex >= 0 ? (activeIndex / (timelineData.length - 1)) * 100 : 0;

    return (
        <main className={styles.aboutContainer}>
            {/* Founder Section */}
            <section className={styles.founderSection}>
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
                                        Suraj Kulkarni completed his education in Pune and secured a stable government job.
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
                                        farming wisdom with cutting-edge polyhouse technology, we create the perfect
                                        environment for crops to thrive.
                                    </p>
                                    <p>
                                        Our journey began with a simple mission: to provide the freshest, chemical-free
                                        produce while preserving our soil and water resources. Today, we are proud to
                                        be leaders in protected farming.
                                    </p>
                                </div>
                                <div className={styles.storySeparator}></div>
                                <div className={styles.storyTextItem}>
                                    <h3 className={styles.storySubtitle}>Modern & Sustainable</h3>
                                    <p>
                                        Exotica Farms is a pioneer in modern and sustainable farming practices,
                                        specializing in the cultivation of premium exotic vegetables. By leveraging
                                        controlled cultivation techniques and state-of-the-art infrastructure,
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
            <section className={`${styles.section} ${styles.timelineSection}`}>
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
                                style={{ '--progress-percent': `${progressPercentage}%` } as any}
                            ></div>
                            {timelineData.map((milestone) => (
                                <div
                                    key={milestone.id}
                                    className={`${styles.timelinePoint} ${activeMilestone?.id === milestone.id ? styles.active : ''}`}
                                    onClick={() => setActiveMilestone(activeMilestone?.id === milestone.id ? null : milestone)}
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
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className={styles.milestoneDescription}
                                    style={{ '--active-point-pos': `${progressPercentage}%` } as any}
                                >
                                    <div>
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
