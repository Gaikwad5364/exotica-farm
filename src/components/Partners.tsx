import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.css';
import ScrollReveal from './ScrollReveal';

interface TrustCardProps {
    name: string;
    imageSrc: string;
    delay?: number;
}

const TrustCard: React.FC<TrustCardProps> = ({ name, imageSrc, delay = 0 }) => {
    return (
        <ScrollReveal direction="up" delay={delay}>
            <div className={styles.trustCard}>
                <div className={styles.logoWrapper}>
                    <div className={styles.iconContainer}>
                        <Image
                            src={imageSrc}
                            alt={name}
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
                <p className={styles.cardName}>{name}</p>
            </div>
        </ScrollReveal>
    );
};

export default function Partners() {
    const clients = [
        { name: 'Reliance Retail', image: '/images/relianceretail_logo.png' },
        { name: 'Nourishing Farms', image: '/images/nourishingfarms_logo.jpg' },
        { name: 'Wingrow', image: '/images/wingrow_logo.jpg' },
        { name: 'Samartha', image: '/images/samrtha_logo-removebg-preview.png' }
    ];

    const ecosystemPartners = [
        { name: 'Rijk Zwaan', image: '/images/Rijkzwaan_logo.png' },
        { name: 'Govind Green', image: '/images/govindgreen_logo.jpeg' },
        { name: 'Vanita Agro', image: '/images/vanitaagro_logo.png' },
        { name: 'Yaara', image: '/images/yaara_logo.jpg' }
    ];

    return (
        <section className={styles.trustSection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <ScrollReveal direction="up">
                        <span className={styles.accentText}>Credibility & Growth</span>
                        <h2 className={styles.mainTitle}>Our Trusted Ecosystem</h2>
                        <div className={styles.titleUnderline}></div>
                    </ScrollReveal>
                </div>

                <div className={styles.subsectionsGrid}>
                    {/* Subsection: Our Clients */}
                    <div className={styles.subsection}>
                        <ScrollReveal direction="up" delay={0.1}>
                            <h3 className={styles.subsectionTitle}>Direct Clients</h3>
                        </ScrollReveal>
                        <div className={styles.cardsGrid}>
                            {clients.map((client, index) => (
                                <TrustCard
                                    key={client.name}
                                    name={client.name}
                                    imageSrc={client.image}
                                    delay={0.05 * index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Subsection: Our Partners */}
                    <div className={styles.subsection}>
                        <ScrollReveal direction="up" delay={0.15}>
                            <h3 className={styles.subsectionTitle}>Seed & Technical Partners</h3>
                        </ScrollReveal>
                        <div className={styles.cardsGrid}>
                            {ecosystemPartners.map((partner, index) => (
                                <TrustCard
                                    key={partner.name}
                                    name={partner.name}
                                    imageSrc={partner.image}
                                    delay={0.05 * index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
