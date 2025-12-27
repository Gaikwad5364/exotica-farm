import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import styles from './ProductDetail.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className={styles.info}>
                    <h1>{product.name}</h1>
                    <p className={styles.description}>{product.longDescription}</p>
                </div>
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Plantation Time</span>
                    <span className={styles.value}>{product.details.plantationTime}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Growth Period</span>
                    <span className={styles.value}>{product.details.growthPeriod}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Harvesting Time</span>
                    <span className={styles.value}>{product.details.harvestingTime}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Farming Method</span>
                    <span className={styles.value}>{product.details.method}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Sustainability</span>
                    <span className={styles.value}>{product.details.practices}</span>
                </div>
            </div>
        </main>
    );
}
