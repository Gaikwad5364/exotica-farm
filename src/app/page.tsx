import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import InstagramFeed from "@/components/InstagramFeed";
import Partners from "@/components/Partners";
import PartnerSection from "@/components/PartnerSection";
import ScrollReveal from "@/components/ScrollReveal";
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
              <ScrollReveal direction="left">
                <h2>Where Tradition Meets Technology</h2>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}>
                <p>
                  At Exotica Farm, we believe in the future of agriculture. By combining traditional
                  farming wisdom with cutting-edge polyhouse technology, we create the perfect
                  environment for crops to thrive.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <p>
                  Our journey began with a simple mission: to provide the freshest, chemical-free
                  produce while preserving our soil and water resources. Today, we are proud to
                  be leaders in protected farming.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.3}>
                <Link href="/about" style={{ fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'underline' }}>
                  Read Our Full Story
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right" delay={0.2}>
              <div className={styles.imageGrid}>
                <div className={styles.gridImage}>
                  <Image src="/images/cucumber.png" alt="Farm Greenery" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.gridImage}>
                  <Image src="/images/bell-pepper.png" alt="Fresh Harvest" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <ScrollReveal direction="left">
                <h2>Experience Farm Life Firsthand</h2>
                <p>
                  Discover the secrets of sustainable farming. Walk through our lush polyhouses,
                  learn about modern agriculture, and see how your food is grown with care.
                </p>
                <div className={styles.ctaActions}>
                  <Link href="/farm-visit" className={styles.ctaButton_premium}>
                    Schedule a Farm Visit
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className={styles.ctaImage}>
              <ScrollReveal direction="right">
                <div className={styles.ctaImageWrapper}>
                  <img
                    src="/images/farm-visit-experience.png"
                    alt="Visitors at Exotica Farm"
                    className={styles.ctaImg}
                  />
                  <div className={styles.ctaBadge}>
                    <span className={styles.badgeIcon}>📍</span>
                    <span>Guided Tours Available</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-light">
        <div className="container">
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>Fresh From Farm</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className={styles.sectionSubtitle}>
              Discover our premium range of vegetables and fungi, harvested at the peak of freshness.
            </p>
          </ScrollReveal>
          <div className={styles.grid}>
            {products.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={0.1 * (index + 2)}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials CTA Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsCTA}>
            <div className={styles.testimonialsImageContainer}>
              <div className={styles.imageWrapper_testimonial}>
                <img
                  src="/images/satisfied-customers.png"
                  alt="Our Happy Customers"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  className={styles.roundImage}
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.ratingBadge}>★★★★★</span>
                </div>
              </div>
            </div>
            <div className={styles.testimonialsTextContainer}>
              <ScrollReveal direction="right">
                <span className={styles.accentText}>Consumer Trust</span>
                <h2 className={styles.testimonialTitle}>See Why Our Customers Love Us</h2>
                <p className={styles.testimonialLead}>
                  "The quality of vegetables from Exotica Farm is unmatched.
                  Fresh, crunchy, and you can really taste the difference of protected farming."
                </p>
                <div className={styles.testimonialActions}>
                  <Link href="/testimonials" className={styles.testimonialButton_premium}>
                    Read All Testimonials
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal direction="up">
        <Partners />
      </ScrollReveal>

      <PartnerSection />

      {/* Infrastructure Highlights */}
      <section className={`${styles.infraSection} section`}>
        <div className="container">
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>Modern Infrastructure</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className={styles.sectionSubtitle}>
              Our farm utilizes advanced protective structures to ensure consistent quality year-round.
            </p>
          </ScrollReveal>
          <div className={styles.grid}>
            <ScrollReveal direction="up" delay={0.2}>
              <Link href="/infrastructure#polyhouses" className={styles.infraCard}>
                <span className={styles.infraIcon}>🛖</span>
                <h3>Polyhouses</h3>
                <p>Climate controlled cultivation for sensitive crops like Capsicum.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <Link href="/infrastructure#shadenets" className={styles.infraCard}>
                <span className={styles.infraIcon}>🕸️</span>
                <h3>Shade Nets</h3>
                <p>Optimum light regulation for leafy greens and vegetables.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <Link href="/infrastructure#drip-irrigation" className={styles.infraCard}>
                <span className={styles.infraIcon}>💧</span>
                <h3>Drip Irrigation</h3>
                <p>Water-efficient systems that deliver nutrients directly to roots.</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal direction="up">
        <InstagramFeed />
      </ScrollReveal>
    </main>
  );
}
