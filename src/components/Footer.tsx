import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3>Exotica Farms</h3>
                        <p>
                            Leading the way in protected farming with state-of-the-art polyhouses and
                            sustainable agricultural practices. delivering fresh produce directly from
                            our farm to your table.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>Quick Links</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/products">Our Products</Link></li>
                            <li><Link href="/infrastructure">Infrastructure</Link></li>
                            <li><Link href="/farm-visit">Farm Visit</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Contact Info</h3>
                        <ul className={styles.linkList}>
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/YHm6X6iwEi5eMYPL8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-address-link"
                                >
                                    📍 Exotica Farms, Kondhapuri, Pune
                                </a>
                            </li>
                            <li>📞 +91 77210 75329</li>
                            <li>✉️ hello@exoticafarm.com</li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Follow Us</h3>
                        <ul className={styles.linkList}>
                            <li>
                                <a
                                    href="https://www.instagram.com/exotica_farms_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-address-link"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/suraj-kulkarni-093747186?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-address-link"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>YouTube</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>© {new Date().getFullYear()} Exotica Farms. All rights reserved.</p>
                    <Link href="/admin/login" className={styles.adminLink}>Admin</Link>
                </div>
            </div>
        </footer>
    );
}
