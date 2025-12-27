import Image from 'next/image';
import styles from './Infrastructure.module.css';

export default function InfrastructurePage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Our Infrastructure</h1>
                    <p className={styles.intro}>
                        State-of-the-art facilities designed to optimize growth and quality.
                    </p>
                </div>
            </section>

            {/* Polyhouse */}
            <section id="polyhouses" className={styles.section}>
                <div className="container">
                    <div className={styles.row}>
                        <div className={styles.content}>
                            <h2>Advanced Polyhouses</h2>
                            <p>
                                Our polyhouses are designed to provide total climate control. By regulating
                                temperature, humidity, and light intensity, we create an ideal microclimate
                                for sensitive crops.
                            </p>
                            <p>
                                This structure protects crops from pest attacks, unseasonal rains, and
                                extreme sunlight, ensuring continuous production throughout the year.
                            </p>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/hero-polyhouse.png"
                                alt="Polyhouse Structure"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Shednet */}
            <section id="shadenets" className={`${styles.section} ${styles.sectionAlternate}`}>
                <div className="container">
                    <div className={`${styles.row} ${styles.rowReverse}`}>
                        <div className={styles.content}>
                            <h2>Shednet Houses</h2>
                            <p>
                                Ideal for crops that require partial sunlight and ventilation. Our shednet
                                structures use high-quality shade nets to filter UV rays and reduce heat.
                            </p>
                            <p>
                                These structures allow for natural air circulation while preventing insect
                                entry, minimizing the need for chemical pesticides.
                            </p>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/bell-pepper.png"
                                alt="Shednet Farming"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Irrigation */}
            <section id="drip-irrigation" className={styles.section}>
                <div className="container">
                    <div className={styles.row}>
                        <div className={styles.content}>
                            <h2>Precision Drip Irrigation</h2>
                            <p>
                                Water is our most precious resource. We utilize automated drip irrigation
                                systems that deliver the exact amount of water and water-soluble fertilizers
                                directly to the root zone.
                            </p>
                            <p>
                                This maximizes efficiency, reduces wastage, and ensures every plant gets
                                uniform nutrition for healthy growth.
                            </p>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/cucumber.png"
                                alt="Drip Irrigation"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
