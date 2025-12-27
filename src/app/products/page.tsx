import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
    return (
        <main className="section container">
            <h1 className="text-center" style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--color-primary-dark)' }}>Our Products</h1>
            <p className="text-center text-muted" style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                Freshly harvested from our protected farms. We ensure every produce meets global quality standards.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
