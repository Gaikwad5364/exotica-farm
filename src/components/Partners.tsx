import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.css';
import ScrollReveal from './ScrollReveal';

interface TrustCardProps {
    name: string;
    imageSrc: string;
    // quadrant mapping for 2x2 sprite: [xPos, yPos] where 0 is first, 1 is second
    quadrant: [number, number];
    delay?: number;
}

const TrustCard: React.FC<TrustCardProps> = ({ name, imageSrc, quadrant, delay = 0 }) => {
    // We calculate the negative offset for the absolute positioned image
    // Assuming the viewport (wrapper) is 80px, the shift is -80px per quadrant
    const left = quadrant[0] === 0 ? '0px' : '-80px';
    const top = quadrant[1] === 0 ? '0px' : '-80px';

    return (
        <ScrollReveal direction="up" delay={delay}>
            <div className={styles.trustCard}>
                <div className={styles.logoWrapper}>
                    <div
                        className={styles.logoSpriteContainer}
                        style={{ left, top }}
                    >
                        <Image
                            src={imageSrc}
                            alt={name}
                            width={160} // 2x the wrapper width (80)
                            height={160} // 2x the wrapper height (80)
                            className={styles.logoImage}
                            priority
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
        { name: 'Green Mart', quad: [0, 0] as [number, number] },
        { name: 'Organic Baskets', quad: [1, 0] as [number, number] },
        { name: 'Fresh Choice', quad: [0, 1] as [number, number] },
        { name: 'Nature\'s Pantry', quad: [1, 1] as [number, number] }
    ];

    const ecosystemPartners = [
        { name: 'AgriLab Solutions', quad: [0, 0] as [number, number] },
        { name: 'BioSeed Tech', quad: [1, 0] as [number, number] },
        { name: 'TechGrow Systems', quad: [0, 1] as [number, number] },
        { name: 'FertiLink Agri', quad: [1, 1] as [number, number] }
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
                                    imageSrc="/images/client_logos.png"
                                    quadrant={client.quad}
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
                                    imageSrc="/images/partner_logos.png"
                                    quadrant={partner.quad}
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
