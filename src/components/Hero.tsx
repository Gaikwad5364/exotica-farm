"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const SLIDES = [
    {
        type: 'video',
        src: '/images/Home%20Page%20Video.mp4',
        duration: 8000
    },
    {
        type: 'image',
        src: '/images/Shade-Net.png',
        duration: 5000
    },
    {
        type: 'image',
        src: '/images/hero-polyhouse.png',
        duration: 5000
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isManual, setIsManual] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const handleManualNext = () => {
        setIsManual(true);
        nextSlide();
    };

    const handleManualPrev = () => {
        setIsManual(true);
        prevSlide();
    };

    useEffect(() => {
        if (isManual) {
            const timer = setTimeout(() => setIsManual(false), 10000); // Resume auto after 10s
            return () => clearTimeout(timer);
        }

        const currentSlide = SLIDES[currentIndex];
        const timer = setTimeout(nextSlide, currentSlide.duration);
        return () => clearTimeout(timer);
    }, [currentIndex, isManual]);

    return (
        <section className={styles.hero}>
            <div className={styles.backgroundContainer}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className={styles.slide}
                    >
                        {SLIDES[currentIndex].type === 'video' ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onEnded={nextSlide}
                                className={styles.media}
                            >
                                <source src={SLIDES[currentIndex].src} type="video/mp4" />
                            </video>
                        ) : (
                            <Image
                                src={SLIDES[currentIndex].src}
                                alt="Exotica Farms"
                                fill
                                priority
                                className={styles.media}
                                sizes="100vw"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.overlay}></div>

            {/* Navigation Arrows */}
            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handleManualPrev}
                aria-label="Previous Slide"
            >
                <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleManualNext}
                aria-label="Next Slide"
            >
                <ChevronRight size={32} strokeWidth={1.5} />
            </button>

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className={styles.title}>
                        Future of Sustainable <br /> Controlled Environment
                    </h1>
                    <p className={styles.subtitle}>
                        Premium quality Mushrooms, Bell Peppers, and Cucumbers <br />
                        grown in state-of-the-art Polyhouses & Shadenets.
                    </p>
                    <Link href="/products" className={styles.ctaButton}>
                        Explore Our Produce
                    </Link>
                </motion.div>
            </div>

            {/* Down Arrow Indicator */}
            <AnimatePresence>
                {!showScrollTop && (
                    <motion.div
                        className={styles.scrollDownIndicator}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => scrollToSection('our-story')}
                        aria-label="Scroll Down"
                    >
                        <div className={styles.arrowIcon}>
                            <ChevronRight size={40} className={styles.rotatedArrow} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top Arrow */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        className={styles.scrollTopIndicator}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={() => scrollToSection('hero')}
                        aria-label="Back to Top"
                    >
                        <div className={styles.topArrowIcon}>
                            <ChevronRight size={24} className={styles.rotatedUpArrow} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
