import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './ParentPage.module.css';
import Navbar from "../layout/Navbar";

const ParentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    childName: '',
    childContact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };



  return (
    <div className={styles.pageWrapper}>
      <Navbar className={styles.fixedNavbar} />

      <div className={styles.floatingShape1}></div>
      <div className={styles.floatingShape2}></div>

      <div className={styles.mainContent}>
        {/* Left Pane - Brand/Visuals */}
        <div className={styles.leftPane}>
          <div className={styles.leftContent}>
            <div className={styles.eyebrowLeft}>FOR PARENTS</div>
            <h1 className={styles.leftHeadline}>
              CONFIDENT YOUR<br />CHILD IS <span className={styles.textOrange}>BOARD<br />READY?</span>
            </h1>
            <p className={styles.leftSub}>
              Send them a free 20-minute readiness check. No login, no<br />pressure. <strong>You'll receive their results by email</strong> the moment<br />they're done.
            </p>

            <div className={styles.howItWorksWrap}>
              <div className={styles.hiwEyebrow}>HOW IT WORKS</div>
              <div className={styles.step}>
                <div className={styles.stepNum}>01</div>
                <div className={styles.stepText}><strong>Fill in your details and your child's</strong> — takes 30 seconds, no account needed</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>02</div>
                <div className={styles.stepText}><strong>We send them a link</strong> — 22 questions, mirrors the real board paper, ~20 minutes</div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>03</div>
                <div className={styles.stepText}><strong>You both get the results</strong> — readiness band, unit scores, exact gaps with marks at risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Form */}
        <div className={styles.rightPane}>
          <div className={styles.contentContainer}>
            <div className={styles.page}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>SEND THE READINESS CHECK</h2>
              </div>

              <div className={styles.formBody}>
                <form onSubmit={handleSubmit}>

                  {/* Your Details */}
                  <div className={styles.divider}>
                    <div className={styles.divLine}></div>
                    <div className={styles.divText}>YOUR DETAILS</div>
                    <div className={styles.divLine}></div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <div className={styles.fl}>YOUR NAME</div>
                      <input
                        className={styles.fi}
                        placeholder="e.g. Priya Sharma"
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <div className={styles.fl}>YOUR EMAIL</div>
                      <input
                        className={styles.fi}
                        placeholder="you@email.com"
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Child's Details */}
                  <div className={styles.divider} style={{ marginTop: '16px' }}>
                    <div className={styles.divLine}></div>
                    <div className={styles.divText}>YOUR CHILD'S DETAILS</div>
                    <div className={styles.divLine}></div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <div className={styles.fl}>CHILD'S NAME</div>
                      <input
                        className={styles.fi}
                        placeholder="e.g. Arjun Sharma"
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <div className={styles.fl}>WHERE SHOULD WE SEND THE LINK?</div>
                      <input
                        className={styles.fi}
                        placeholder="arjun@email.com"
                        type="text"
                        name="childContact"
                        value={formData.childContact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formSubmit}>
                    <button className={styles.submitBtn} type="submit" disabled={loading}>
                      {loading ? 'SENDING...' : 'SEND MY CHILD THE READINESS CHECK'}
                    </button>
                    <div className={styles.submitNote}>Free · No login needed for your child · You get results by email</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.modalOverlay} onClick={() => setSuccess(false)}>
          <div className={styles.successModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSuccess(false)} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.closeIcon}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Left Side: White */}
            <div className={styles.smLeft}>
              <div className={styles.smCheckWrap}>
                <svg viewBox="0 0 24 24" fill="none" className={styles.smCheck}>
                  <path d="M5 13l4 4L19 7" stroke="var(--or)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className={styles.smHeadline}>
                {formData.childName ? `${formData.childName.toUpperCase()}'S CHECK` : "CHILD'S CHECK"}<br />
                IS ON ITS WAY.
              </h1>
              <p className={styles.smSub}>
                We've sent {formData.childName || 'your child'} a link to take their free readiness check. <strong>You'll receive their results by email</strong> the moment they're done.
              </p>

              <div className={styles.smSummaryBox}>
                <div className={styles.smSumRow}>
                  <div className={styles.smSumLabel}>LINK SENT TO</div>
                  <div className={styles.smSumVal}>{formData.childContact || 'email'}</div>
                </div>
                <div className={styles.smSumRow}>
                  <div className={styles.smSumLabel}>RESULTS GO TO</div>
                  <div className={styles.smSumVal}>{formData.parentEmail || 'email'}</div>
                </div>
                <div className={styles.smSumRow}>
                  <div className={styles.smSumLabel}>LINK EXPIRES</div>
                  <div className={styles.smSumVal}>In 7 days</div>
                </div>
              </div>

              <Link to="/" className={styles.smBackBtn}>BACK TO HOME</Link>
            </div>

            {/* Right Side: Dark */}
            <div className={styles.smRight}>
              <div className={styles.smRightEyebrow}>WHAT HAPPENS NEXT</div>

              <div className={styles.smSteps}>
                <div className={styles.smStep}>
                  <div className={styles.smStepNum}>01</div>
                  <div className={styles.smStepText}>
                    <strong>{formData.childName || 'They'} clicks the link</strong> — 20 minutes, no login needed on their end
                  </div>
                </div>
                <div className={styles.smStep}>
                  <div className={styles.smStepNum}>02</div>
                  <div className={styles.smStepText}>
                    <strong>They see their results immediately</strong> — readiness band, unit scores, exact gaps
                  </div>
                </div>
                <div className={styles.smStep}>
                  <div className={styles.smStepNum}>03</div>
                  <div className={styles.smStepText}>
                    <strong>You receive a copy by email</strong> — same results, so you can review together
                  </div>
                </div>
                <div className={styles.smStep}>
                  <div className={styles.smStepNum}>04</div>
                  <div className={styles.smStepText}>
                    <strong>{formData.childName || 'They'} can register for free</strong> — take the full 38Q diagnostic and track all 95 concepts
                  </div>
                </div>
              </div>

              <div className={styles.smWarningBox}>
                <div className={styles.smWarnTitle}>LINK EXPIRES IN 7 DAYS</div>
                <div className={styles.smWarnDesc}>
                  If {formData.childName || 'they'} doesn't take the check in time, just come back and send a new link — it takes 30 seconds.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ParentPage;
