import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './Infrastructure.module.css';

export default function InfrastructurePage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className="container">
                    <ScrollReveal direction="up">
                        <h1 className={styles.title}>Our Infrastructure</h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.1}>
                        <p className={styles.intro}>
                            State-of-the-art facilities designed to optimize growth and quality.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Polyhouse */}
            <section id="polyhouses" className={styles.section}>
                <div className="container">
                    <div className={styles.row}>
                        <div className={styles.content}>
                            <ScrollReveal direction="left">
                                <h2>Advanced Polyhouses</h2>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.1}>
                                <p>
                                    Our polyhouses are designed to provide total climate control. By regulating
                                    temperature, humidity, and light intensity, we create an ideal microclimate
                                    for sensitive crops.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.2}>
                                <p>
                                    This structure protects crops from pest attacks, unseasonal rains, and
                                    extreme sunlight, ensuring continuous production throughout the year.
                                </p>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/hero-polyhouse.png"
                                    alt="Polyhouse Structure"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Shednet */}
            <section id="shadenets" className={`${styles.section} ${styles.sectionAlternate}`}>
                <div className="container">
                    <div className={`${styles.row} ${styles.rowReverse}`}>
                        <div className={styles.content}>
                            <ScrollReveal direction="right">
                                <h2>Shade Net Houses</h2>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={0.1}>
                                <p>
                                    Ideal for crops that require partial sunlight and ventilation. Our shade net
                                    structures use high-quality shade nets to filter UV rays and reduce heat.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={0.2}>
                                <p>
                                    These structures allow for natural air circulation while preventing insect
                                    entry, minimizing the need for chemical pesticides.
                                </p>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal direction="left" delay={0.2}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/bell-pepper.png"
                                    alt="Shednet Farming"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Irrigation */}
            <section id="drip-irrigation" className={styles.section}>
                <div className="container">
                    <div className={styles.row}>
                        <div className={styles.content}>
                            <ScrollReveal direction="left">
                                <h2>Precision Drip Irrigation</h2>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.1}>
                                <p>
                                    Water is our most precious resource. We utilize automated drip irrigation
                                    systems that deliver the exact amount of water and water-soluble fertilizers
                                    directly to the root zone.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.2}>
                                <p>
                                    This maximizes efficiency, reduces wastage, and ensures every plant gets
                                    uniform nutrition for healthy growth.
                                </p>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/cucumber.png"
                                    alt="Drip Irrigation"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
