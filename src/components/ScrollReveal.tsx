'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    duration?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
