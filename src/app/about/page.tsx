import Image from 'next/image';
import styles from './About.module.css';

export default function AboutPage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Our Roots</h1>
                    <p className={styles.intro}>
                        Cultivating a sustainable future through innovation and respect for nature.
                    </p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.textBlock}>
                            <h2>The Exotica Farm Journey</h2>
                            <p>
                                Founded in 2020, Exotica Farm started as a small experimental shednet
                                farm producing quality bell peppers. Witnessing the transformative power
                                of protected farming, we expanded our operations to include state-of-the-art
                                polyhouses and diversified into button mushrooms and cucumbers.
                            </p>
                            <p>
                                Our mission is simple: to provide the community with fresh, residue-free
                                vegetables while minimizing our environmental footprint. By controlling
                                every aspect of the growing environment, we ensure consistent quality
                                and taste, regardless of the season.
                            </p>
                        </div>
                        <div className={styles.imageBlock}>
                            <Image
                                src="/images/hero-polyhouse.png"
                                alt="Farm History"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.contentSection} ${styles.valuesSection} bg-light`} style={{ backgroundColor: 'var(--color-earth-100)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '50px' }}>
                        <h2>Our Core Values</h2>
                        <p className="text-muted">The principles that guide every seed we sow.</p>
                    </div>

                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <h3>Sustainability</h3>
                            <p>Using drip irrigation and organic inputs to protect our soil and water.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Quality</h3>
                            <p>Rigorous quality checks from planting to harvesting ensure premium produce.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Innovation</h3>
                            <p>Adopting the latest in agricultural technology for efficiency and yield.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
