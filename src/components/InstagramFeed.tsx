"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './InstagramFeed.module.css';

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/exotica_farms_?igsh=MXM4ZWwzYXN5bG94Yg==";

const instagramPosts = [
    {
        id: 1,
        image: '/images/hero-polyhouse.png',
        link: 'https://www.instagram.com/exotica_farms_/p/DSKNhwXk4800-tym9Cfv-_SemW_8EIJKmvqlU40/',
        caption: 'Our new polyhouse structure'
    },
    {
        id: 2,
        image: '/images/mushroom.png',
        link: 'https://www.instagram.com/exotica_farms_/p/DReFA4BjY5i-YmHm3epnrJNYbqsdG_Abz4BLf40/',
        caption: 'Fresh harvest of button mushrooms'
    },
    {
        id: 3,
        image: '/images/bell-pepper.png',
        link: 'https://www.instagram.com/exotica_farms_/p/DReD00hE-qi9E4u-UmNuKPuevjFDRmGe021kM00/',
        caption: 'Vibrant Capsicums'
    },
    {
        id: 4,
        image: '/images/cucumber.png',
        link: 'https://www.instagram.com/exotica_farms_/p/DP27qy3kx4KbWHNo97s-YUegiSYZXOLrWVh2OI0/',
        caption: 'Crispy Cucumbers'
    },
];

// Duplicate posts to ensure we can scroll continuously without empty spaces
// We create enough duplicates to fill even wide screens
const displayPosts = [...instagramPosts, ...instagramPosts, ...instagramPosts];

export default function InstagramFeed() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const requestRef = useRef<number>(0);

    // Auto-Scrolling Logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let speed = 0.5; // Pixels per frame - adjust for faster/slower scroll

        const animate = () => {
            if (!isPaused && scrollContainer) {
                // If we scrolled past the first set of items (the "original" set width),
                // we snap back to 0 to create the infinite loop illusion.
                // This is a simple estimation: total width / 3.
                const oneSetWidth = scrollContainer.scrollWidth / 3;

                if (scrollContainer.scrollLeft >= oneSetWidth) {
                    scrollContainer.scrollLeft = 0;
                    // If we use simple assignment, it might be jerky if exact pixel match failed, 
                    // but normally subtracting oneSetWidth is smoother:
                    // scrollContainer.scrollLeft -= oneSetWidth; 
                    // However, direct 0 reset is often simpler if duplicates are identical.
                    // Let's stick to simple increment for now.
                } else {
                    scrollContainer.scrollLeft += speed;
                }
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [isPaused]);

    // Manual Scroll Handlers
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Pause Handlers
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Follow Us
                </h2>

                <Link
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.instagramButton}
                >
                    @exotica_farms_
                </Link>
            </div>

            <div
                className={styles.carouselContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={scrollLeft} aria-label="Scroll Left">
                    ←
                </button>

                <div className={styles.track} ref={scrollRef}>
                    {displayPosts.map((post, index) => (
                        <Link
                            key={`${post.id}-${index}`}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.postItem}
                            aria-label={post.caption}
                        >
                            <Image
                                src={post.image}
                                alt={post.caption}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 200px, 250px"
                            />
                            <div className={styles.overlay}>
                                <span style={{ color: 'white', fontWeight: 'bold' }}>View</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={scrollRight} aria-label="Scroll Right">
                    →
                </button>
            </div>
        </section>
    );
}
