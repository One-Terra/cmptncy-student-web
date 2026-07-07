import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactPage.module.css';
import Navbar from '../layout/Navbar';

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1, delay: delay * 0.1 }}
  >
    {children}
  </motion.div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for contact form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar className={styles.fixedNavbar} />

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          {/* Left Side: Contact Information */}
          <div className={styles.leftContent}>
            <Reveal className={styles.eyebrow}>GET IN TOUCH</Reveal>
            <Reveal delay={1}>
              <h1 className={styles.headline}>
                WE'D LOVE TO<br />
                <span>HEAR FROM YOU.</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className={styles.subhead}>
                Have a question about the diagnostic test, pricing plans, or onboarding your school? Drop us a line. Our team is here to help and will get back to you within 24 hours.
              </p>
            </Reveal>

            {/* Email Support Card */}
            <Reveal delay={3} className={styles.emailCard} as={Link} to="mailto:support@cmptncy.com">
              <div className={styles.emailIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.emailMeta}>
                <span className={styles.emailLabel}>DIRECT SUPPORT</span>
                <span className={styles.emailAddress}>support@cmptncy.com</span>
              </div>
            </Reveal>

            {/* FAQ Callout */}
            <Reveal delay={4} className={styles.faqCallout}>
              <div className={styles.faqIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div>
                <strong>Looking for diagnostic results?</strong> If your child completed the readiness check, the detailed report has been sent directly to the parent email you entered.
              </div>
            </Reveal>
          </div>

          {/* Right Side: Contact Form Card */}
          <Reveal delay={2} className={styles.formCard}>
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>SEND A MESSAGE</h2>
                    <p className={styles.formSub}>Fill out the details below and we will reach out shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <div className={styles.row}>
                        <div className={styles.field}>
                          <label className={styles.fl}>Your Name</label>
                          <input
                            type="text"
                            name="name"
                            className={styles.fi}
                            placeholder="e.g. Priyan Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className={styles.field}>
                          <label className={styles.fl}>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className={styles.fi}
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fl}>Subject</label>
                        <select
                          name="subject"
                          className={styles.fs}
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="General Question">General Question</option>
                          <option value="Diagnostic Test Support">Diagnostic Issue / Support</option>
                          <option value="Billing & Pricing">Billing & Pricing Plan</option>
                          <option value="School Partnerships">School Partnerships</option>
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fl}>Message</label>
                        <textarea
                          name="message"
                          className={styles.ft}
                          placeholder="Tell us what you need help with..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'SENDING...' : 'SEND MESSAGE'}
                        {!loading && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  className={styles.successCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <div className={styles.successIconWrap}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 className={styles.successTitle}>MESSAGE SENT!</h2>
                  <p className={styles.successDesc}>
                    Thank you for reaching out. We have received your inquiry and our support team will get in touch with you shortly.
                  </p>
                  <Link to="/" className={styles.backBtn}>Back to Home</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
