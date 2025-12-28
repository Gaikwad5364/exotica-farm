import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './products.module.css';

export default function ProductsPage() {
    return (
        <main className="section container">
            <ScrollReveal direction="up">
                <h1 className={styles.pageTitle}>Our Products</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
                <p className={styles.pageDescription}>
                    Freshly harvested from our protected farms. We ensure every produce meets global quality standards.
                </p>
            </ScrollReveal>

            <div className={styles.productsGrid}>
                {products.map((product, index) => (
                    <ScrollReveal key={product.id} direction="up" delay={0.1 * (index + 2)}>
                        <ProductCard product={product} />
                    </ScrollReveal>
                ))}
            </div>
        </main>
    );
}
