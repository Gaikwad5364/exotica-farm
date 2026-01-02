"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";

        // We'll simulate a loading time or wait for window.onload
        // For a premium feel, we want at least 3.5 seconds of animation for the slow flash
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Unlock scroll
            document.body.style.overflow = "unset";
        }, 3500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className={styles.loadingOverlay}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Ambient Circles */}
                    <div className={styles.ambient}>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={styles.circle}
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={{
                                    width: [400, 800, 1200][i],
                                    height: [400, 800, 1200][i],
                                    opacity: [0, 0.1, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "easeOut"
                                }}
                                style={{
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            />
                        ))}
                    </div>

                    <div className={styles.content}>
                        <div className={styles.logoWrapper}>
                            <motion.div
                                className={styles.glow}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="Exotica Farms Logo"
                                    width={250}
                                    height={250}
                                    className={styles.mainLogo}
                                    priority
                                />
                            </motion.div>
                        </div>

                        <div className={styles.textContainer}>
                            <motion.h1
                                className={styles.text}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            >
                                EXOTICA FARMS
                            </motion.h1>
                        </div>

                        <div className={styles.loaderLine}>
                            <motion.div
                                className={styles.loaderProgress}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
