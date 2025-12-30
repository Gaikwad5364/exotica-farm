import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import styles from './PartnerSection.module.css';

const PartnerSection = () => {
    const categories = [
        {
            title: 'HORECA',
            description: 'Hotels, Restaurants, Catering Services',
            icon: '🏨'
        },
        {
            title: 'Cafés',
            description: 'Premium produce for specialty caf\u00e9s',
            icon: '☕'
        },
        {
            title: 'Bulk Buyers',
            description: 'Wholesale orders & supply contracts',
            icon: '📦'
        }
    ];

    const partnerMessage = encodeURIComponent("We want to partner with Exotica Farms.");

    return (
        <section className={styles.partnerSection}>
            <div className="container">
                <div className={styles.partnerContent}>
                    <div className={styles.partnerText}>
                        <ScrollReveal direction="left">
                            <h2>Become a Partner With Us</h2>
                            <p>
                                Supplying fresh, exotic produce to businesses that value quality,
                                consistency, and sustainability.
                            </p>
                        </ScrollReveal>

                        <div className={styles.partnerCategories}>
                            {categories.map((cat, idx) => (
                                <ScrollReveal key={cat.title} direction="left" delay={0.1 * (idx + 1)}>
                                    <div className={styles.categoryCard}>
                                        <div className={styles.categoryIcon}>{cat.icon}</div>
                                        <div className={styles.categoryInfo}>
                                            <h3>{cat.title}</h3>
                                            <p>{cat.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        <ScrollReveal direction="left" delay={0.4}>
                            <Link
                                href={`/contact?message=${partnerMessage}`}
                                className={styles.ctaButton}
                            >
                                Contact Us
                                <span className={styles.arrowIcon}>→</span>
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className={styles.partnerVisual}>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src="/images/become-partner-img.png"
                                    alt="Professional Farming Excellence"
                                    fill
                                    className={styles.partnerImg}
                                />
                                <div className={styles.floatingBadge}>
                                    <div className={styles.badgeIcon}>✓</div>
                                    <div className={styles.badgeText}>
                                        <span>B2B Priority</span>
                                        <strong>Quality Assured</strong>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
