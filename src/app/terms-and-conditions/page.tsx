"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../legal.module.css";

export default function TermsAndConditions() {
  return (
    <main className={styles.legalSection}>
      <div className={styles.legalContainer}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Terms & Conditions</h1>
          <p className={styles.pageSubtitle}>Last updated: March 10, 2026</p>
        </div>

        <div className={styles.contentBlock}>
          {/* Introduction */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Introduction</h2>
            <p className={styles.paragraph}>
              Welcome to our website. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>
            <p className={styles.paragraph}>
              If you disagree with any part of these terms, please do not use our website.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Acceptance of Terms</h2>
            <p className={styles.paragraph}>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
            </p>
          </div>

          {/* Use of the Website */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Use of the Website</h2>
            <p className={styles.paragraph}>
              You are specifically restricted from all of the following:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Publishing any website material in any other media without prior permission.</li>
              <li className={styles.listItem}>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
              <li className={styles.listItem}>Using this website in any way that is or may be damaging to this website.</li>
              <li className={styles.listItem}>Using this website in any way that impacts user access to this website.</li>
            </ul>
          </div>

          {/* User Responsibilities */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>User Responsibilities</h2>
            <p className={styles.paragraph}>
              As a user of this website, you agree to use our services responsibly and legally. You agree not to distribute malware, post illegal content, or attempt to disable or interfere with the proper working of the site.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Intellectual Property</h2>
            <p className={styles.paragraph}>
              Unless otherwise stated, we or our licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from the website for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
          </div>

          {/* Service Availability */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Service Availability</h2>
            <p className={styles.paragraph}>
              We do not guarantee that our site, or any content on it, will always be available or be uninterrupted. We may suspend, withdraw, or restrict the availability of all or any part of our site for business and operational reasons.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
            <p className={styles.paragraph}>
              In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. We shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Third-Party Links</h2>
            <p className={styles.paragraph}>
              Our website may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
            </p>
          </div>

          {/* Termination */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Termination</h2>
            <p className={styles.paragraph}>
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Changes to Terms</h2>
            <p className={styles.paragraph}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          {/* Governing Law */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Governing Law</h2>
            <p className={styles.paragraph}>
              These Terms shall be governed and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.
            </p>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <p className={styles.paragraph}>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className={styles.paragraph}>
              <strong>Email:</strong> legal@example.com<br />
              <strong>Address:</strong> 123 Digital Ave, Suite 400, Tech City.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
