import Image from 'next/image';
import styles from './Partners.module.css';

export default function Partners() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Our Trusted Partners</h2>
            <div className={styles.grid}>
                {/* Using a single sprite/image for demo or separate individual logos if we had them.
            Since I generated a single image with 4 logos, I will display it. 
            Ideally, we would crop them, but for now I will display the composite image 
            or if I can't resize properly, I might need to just show it as 'Our Partners' 
            block. Let's show the single image for now as a placeholder for the concept. 
         */}
                <div className={styles.partner}>
                    <Image
                        src="/images/partners.png"
                        alt="Our Partners"
                        width={600}
                        height={300}
                        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            </div>
        </section>
    );
}
