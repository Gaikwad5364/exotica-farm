import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './About.module.css';

export default function AboutPage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className="container">
                    <ScrollReveal direction="up">
                        <h1 className={styles.title}>Our Roots</h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.1}>
                        <p className={styles.intro}>
                            Cultivating a sustainable future through innovation and respect for nature.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.textBlock}>
                            <ScrollReveal direction="left">
                                <h2>The Exotica Farm Journey</h2>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.1}>
                                <p>
                                    Founded in 2020, Exotica Farm started as a small experimental Shade net
                                    farm producing quality bell peppers. Witnessing the transformative power
                                    of protected farming, we expanded our operations to include state-of-the-art
                                    polyhouses and diversified into button mushrooms and cucumbers.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.2}>
                                <p>
                                    Our mission is simple: to provide the community with fresh, residue-free
                                    vegetables while minimizing our environmental footprint. By controlling
                                    every aspect of the growing environment, we ensure consistent quality
                                    and taste, regardless of the season.
                                </p>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className={styles.imageBlock}>
                                <Image
                                    src="/images/hero-polyhouse.png"
                                    alt="Farm History"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className={`${styles.contentSection} ${styles.valuesSection} bg-light`} style={{ backgroundColor: 'var(--color-earth-100)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '50px' }}>
                        <ScrollReveal direction="up">
                            <h2>Our Core Values</h2>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.1}>
                            <p className="text-muted">The principles that guide every seed we sow.</p>
                        </ScrollReveal>
                    </div>

                    <div className={styles.valuesGrid}>
                        <ScrollReveal direction="up" delay={0.2}>
                            <div className={styles.valueCard}>
                                <h3>Sustainability</h3>
                                <p>Using drip irrigation and organic inputs to protect our soil and water.</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.3}>
                            <div className={styles.valueCard}>
                                <h3>Quality</h3>
                                <p>Rigorous quality checks from planting to harvesting ensure premium produce.</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.4}>
                            <div className={styles.valueCard}>
                                <h3>Innovation</h3>
                                <p>Adopting the latest in agricultural technology for efficiency and yield.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
