"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../legal.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.legalSection}>
      <div className={styles.legalContainer}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.pageSubtitle}>Last updated: March 10, 2026</p>
        </div>

        <div className={styles.contentBlock}>
          {/* Introduction */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Introduction</h2>
            <p className={styles.paragraph}>
              Welcome to our Privacy Policy. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className={styles.paragraph}>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </div>

          {/* Information We Collect */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Information We Collect</h2>
            <p className={styles.paragraph}>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information.</li>
              <li className={styles.listItem}><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            <p className={styles.paragraph}>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Create and manage your account.</li>
              <li className={styles.listItem}>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
              <li className={styles.listItem}>Email you regarding your account or order.</li>
              <li className={styles.listItem}>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            </ul>
          </div>

          {/* Cookies and Tracking Technologies */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookies and Tracking Technologies</h2>
            <p className={styles.paragraph}>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Third-Party Services</h2>
            <p className={styles.paragraph}>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
          </div>

          {/* Data Protection and Security */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Protection and Security</h2>
            <p className={styles.paragraph}>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </div>

          {/* How Long We Keep Your Data */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How Long We Keep Your Data</h2>
            <p className={styles.paragraph}>
              We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </div>

          {/* Your Privacy Rights */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Privacy Rights</h2>
            <p className={styles.paragraph}>
              If you are a resident of certain regions (such as the European Economic Area), you have certain rights regarding your personal information, including the right to request access, correction, erasure, or restriction of your personal data.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Children&apos;s Privacy</h2>
            <p className={styles.paragraph}>
              We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
            </p>
          </div>

          {/* Changes to This Privacy Policy */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
            <p className={styles.paragraph}>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the &quot;Last updated&quot; date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <p className={styles.paragraph}>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className={styles.paragraph}>
              <strong>Email:</strong> privacy@example.com<br />
              <strong>Address:</strong> 123 Digital Ave, Suite 400, Tech City.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
