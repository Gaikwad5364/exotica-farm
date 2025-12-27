import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <span className={styles.link}>
                    View Details
                    <span className={styles.arrow}>→</span>
                </span>
            </div>
        </Link>
    );
}
