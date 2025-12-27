import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProductsPage() {
    return (
        <main className="section container">
            <ScrollReveal direction="up">
                <h1 className="text-center" style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--color-primary-dark)' }}>Our Products</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
                <p className="text-center text-muted" style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Freshly harvested from our protected farms. We ensure every produce meets global quality standards.
                </p>
            </ScrollReveal>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {products.map((product, index) => (
                    <ScrollReveal key={product.id} direction="up" delay={0.1 * (index + 2)}>
                        <ProductCard product={product} />
                    </ScrollReveal>
                ))}
            </div>
        </main>
    );
}
