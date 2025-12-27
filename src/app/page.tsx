import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import InstagramFeed from "@/components/InstagramFeed";
import Partners from "@/components/Partners";
import styles from "./Home.module.css";

export default function Home() {
  const products = [
    {
      id: '1',
      name: 'Button Mushrooms',
      description: 'Fresh, organic white button mushrooms grown in controlled environments.',
      image: '/images/mushroom.png',
      slug: 'mushroom'
    },
    {
      id: '2',
      name: 'Bell Peppers',
      description: 'Vibrant red and yellow capsicums rich in vitamins and flavor.',
      image: '/images/bell-pepper.png',
      slug: 'bell-pepper'
    },
    {
      id: '3',
      name: 'English Cucumber',
      description: 'Crunchy and hydrating cucumbers harvested daily.',
      image: '/images/cucumber.png',
      slug: 'cucumber'
    }
  ];

  return (
    <main>
      <Hero />

      {/* Our Story Section */}
      <section className={`${styles.aboutSection} section`}>
        <div className="container">
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2>Where Tradition Meets Technology</h2>
              <p>
                At Exotica Farm, we believe in the future of agriculture. By combining traditional
                farming wisdom with cutting-edge polyhouse technology, we create the perfect
                environment for crops to thrive.
              </p>
              <p>
                Our journey began with a simple mission: to provide the freshest, chemical-free
                produce while preserving our soil and water resources. Today, we are proud to
                be leaders in protected farming.
              </p>
              <Link href="/about" style={{ fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'underline' }}>
                Read Our Full Story
              </Link>
            </div>
            <div className={styles.imageGrid}>
              <div className={styles.gridImage}>
                <Image src="/images/cucumber.png" alt="Farm Greenery" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.gridImage}>
                <Image src="/images/bell-pepper.png" alt="Fresh Harvest" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Experience Farm Life</h2>
          <p>Want to see how your food is grown? Book a visit to our farm today.</p>
          <Link href="/farm-visit" className={styles.ctaButton}>
            Schedule a Visit
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className={styles.sectionTitle}>Fresh From Farm</h2>
          <p className={styles.sectionSubtitle}>
            Discover our premium range of vegetables and fungi, harvested at the peak of freshness.
          </p>
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Partners />

      {/* Infrastructure Highlights */}
      <section className={`${styles.infraSection} section`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Modern Infrastructure</h2>
          <p className={styles.sectionSubtitle}>
            Our farm utilizes advanced protective structures to ensure consistent quality year-round.
          </p>
          <div className={styles.grid}>
            <Link href="/infrastructure#polyhouses" className={styles.infraCard}>
              <span className={styles.infraIcon}>🛖</span>
              <h3>Polyhouses</h3>
              <p>Climate controlled cultivation for sensitive crops like Capsicum.</p>
            </Link>
            <Link href="/infrastructure#shadenets" className={styles.infraCard}>
              <span className={styles.infraIcon}>🕸️</span>
              <h3>Shade Nets</h3>
              <p>Optimum light regulation for leafy greens and vegetables.</p>
            </Link>
            <Link href="/infrastructure#drip-irrigation" className={styles.infraCard}>
              <span className={styles.infraIcon}>💧</span>
              <h3>Drip Irrigation</h3>
              <p>Water-efficient systems that deliver nutrients directly to roots.</p>
            </Link>
          </div>
        </div>
      </section>

      <InstagramFeed />
    </main>
  );
}
