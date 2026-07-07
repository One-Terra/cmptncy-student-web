import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Navbar from "../layout/Navbar";
import ChatWidget from '../layout/ChatWidget';


const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1, delay: delay * 0.15 }}
  >
    {children}
  </motion.div>
);

const LandingPage = () => {
  React.useEffect(() => {
    document.title = "CMPTNCY | CBSE Grade 10 Math Prep";
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <section className={styles.heroWrap}>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
        <div className={styles.container}>
          <div className={styles.hero}>
            <Reveal className={styles.heroLeft}>
              <div className={styles.eyebrow}>CBSE Grade 10 · Mathematics</div>
              <h1 className={styles.headline}>Know it.<br /><span className={styles.l2}>Prove it.</span></h1>
              <p className={styles.subhead}>Find every gap before the boards do. <strong>The only diagnostic that mirrors the real exam</strong> — concept by concept, marks by marks.</p>
              <div className={styles.heroActions}>
                <Link to="/diagnostic-intro" className={styles.heroBtn}>Ready? Let's find out for free.</Link>
              </div>
              <div className={styles.heroNote}>No login required · 20 questions · No credit card</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT CMPTNCY DOES */}
      <section id="how-it-works" className={styles.tilesSection}>
        <div className={styles.container}>
          <div className={styles.tilesWrap}>
            <Reveal className={styles.secLabel}>What CMPTNCY does</Reveal>
            <div className={styles.tilesGrid}>
              <Reveal className={styles.tile} delay={1}>
                <div className={styles.tileIcon}>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <circle cx="8" cy="8" r="5" stroke="#E8572A" strokeWidth="1.4" />
                    <path d="M12 12l3 3" stroke="#E8572A" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M6 8h4M8 6v4" stroke="#F4F7FB" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={styles.tileTitle}>Diagnoses your gaps</div>
                <div className={styles.tileDesc}>A full diagnostic that mirrors the board paper — every unit, every section, exact marks weighting. Finds what you don't know before the exam does.</div>
              </Reveal>

              <Reveal className={styles.tile} delay={2}>
                <div className={styles.tileIcon}>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="2" width="14" height="14" rx="1.5" stroke="#F4F7FB" strokeWidth="1.3" />
                    <path d="M5 11l3-3 2.5 2.5 3.5-4" stroke="#E8572A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.tileTitle}>Tracks mastery precisely</div>
                <div className={styles.tileDesc}>95 concepts tracked individually after every session. Not just a score — a live map of exactly what you know and how solidly you know it.</div>
              </Reveal>

              <Reveal className={styles.tile} delay={3}>
                <div className={styles.tileIcon}>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v3M9 12v3M3 9h3M12 9h3" stroke="#F4F7FB" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="9" cy="9" r="2.5" stroke="#E8572A" strokeWidth="1.3" />
                  </svg>
                </div>
                <div className={styles.tileTitle}>Closes gaps — fast</div>
                <div className={styles.tileDesc}>Adaptive retests go straight to your weak concepts. No time wasted on what you already know. Every session moves the needle.</div>
              </Reveal>

              <Reveal className={styles.tile} delay={4}>
                <div className={styles.tileIcon}>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3.5l1.8 4H15l-3.3 2.4 1.5 4.1L9 11.5l-4.2 2.5 1.5-4.1L3 7.5h4.2L9 3.5z" stroke="#F0A500" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.tileTitle}>Proves you're ready</div>
                <div className={styles.tileDesc}>Speed challenges verify you can recall under board pressure. Earn sparks ⚡ on mastered concepts. See a predicted board score out of 80.</div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TIER LADDER */}
      <section id="pricing" className={styles.tiersSection}>
        <div className={styles.container}>
          <div className={styles.tiersWrap}>
            <Reveal className={styles.secLabel}>How it grows with you</Reveal>
            <div className={styles.tiersGrid}>

              {/* FREE */}
              <Reveal className={styles.tier} delay={1}>
                <div className={styles.th}>
                  <div className={styles.thTop}>
                    <div className={styles.thName}>Free</div>
                    <div className={`${styles.thBadge} ${styles.bFree}`}>Register free</div>
                  </div>
                  <div className={styles.thSub}>Start here — no card, no commitment.</div>
                </div>
                <div className={styles.tf}>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>20Q board diagnostic</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Readiness band + 7 unit scores</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Topic retests — all chapters</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Streaks + chapter badges</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Predicted score <span className={styles.mu}>— as a range</span></div></div>
                  <div className={styles.fdiv}></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckN}`}><svg viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#9AA5B4" strokeWidth="1.5" strokeLinecap="round" /></svg></div><div className={`${styles.ft} ${styles.mu}`}>Concept heatmap — 95 concepts</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckN}`}><svg viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#9AA5B4" strokeWidth="1.5" strokeLinecap="round" /></svg></div><div className={`${styles.ft} ${styles.mu}`}>Gap list with marks at risk</div></div>
                </div>
                <div className={styles.tc}><Link to="/register" className={styles.tcOutline}>Get started free</Link></div>
              </Reveal>

              {/* MID */}
              <Reveal className={styles.tier} delay={2}>
                <div className={styles.th}>
                  <div className={styles.thTop}>
                    <div className={styles.thName}>Mid</div>
                    <div className={`${styles.thBadge} ${styles.bMid}`}>Paid</div>
                  </div>
                  <div className={styles.thSub}>See the full concept picture. Know exactly what to fix.</div>
                </div>
                <div className={styles.tf}>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Everything in Free + Full 38Q diagnostic</div></div>
                  <div className={styles.fdiv}></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckG}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#8A5E00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.go}>Concept heatmap</span> — all 95 concepts, colour coded</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckG}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#8A5E00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.go}>Gap list</span> — every weak concept ranked by marks at risk</div></div>
                  <div className={styles.fdiv}></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckN}`}><svg viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#9AA5B4" strokeWidth="1.5" strokeLinecap="round" /></svg></div><div className={`${styles.ft} ${styles.mu}`}>Error pattern analysis</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckN}`}><svg viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#9AA5B4" strokeWidth="1.5" strokeLinecap="round" /></svg></div><div className={`${styles.ft} ${styles.mu}`}>AI learning plan</div></div>
                </div>
                <div className={styles.tc}><Link to="/register" className={styles.tcOutline}>Upgrade to Mid</Link></div>
              </Reveal>

              {/* FULL PLAN */}
              <Reveal className={`${styles.tier} ${styles.hot}`} delay={3}>
                <div className={styles.th}>
                  <div className={styles.thTop}>
                    <div className={styles.thName}>Full Plan</div>
                    <div className={`${styles.thBadge} ${styles.bHot}`}>Most complete</div>
                  </div>
                  <div className={styles.thSub}>The complete picture. AI plan, error analysis, precise score.</div>
                </div>
                <div className={styles.tf}>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckB}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#2F5496" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}>Everything in Mid</div></div>
                  <div className={styles.fdiv}></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckO}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.hi}>Error pattern analysis</span> — exactly why you're getting it wrong</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckO}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.hi}>Overconfidence detection</span> — flags where you think you know it but don't</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckO}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.hi}>AI learning plan</span> — ordered by gap severity and marks weight</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckO}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.hi}>Precise predicted score</span> — not a range, a number out of 80</div></div>
                  <div className={styles.fr}><div className={`${styles.fck} ${styles.ckO}`}><svg viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className={styles.ft}><span className={styles.hi}>Parent dashboard</span> — full visibility for linked parents</div></div>
                </div>
                <div className={styles.tc}>
                  <Link to="/register" className={styles.tcPrimary}>Get Full Plan</Link>
                  <div className={styles.tcNote}>Pricing at beta launch</div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* PARENT HOOK */}
      <section id="for-parents" className={styles.parentSection}>
        <div className={styles.container}>
          <div className={styles.parentWrap}>
            <Reveal className={styles.parentLeft}>
              <div className={styles.parentEyebrow}>For parents</div>
              <h2 className={styles.parentHeadline}>Think your child is<br /><em>ready?</em></h2>
              <p className={styles.parentSub}>Find out together. <strong>Nominate them for a free readiness check</strong> — 20 minutes, no login needed. You'll both see exactly where they stand.</p>
              <Link to="/parent-nomination" className={styles.parentBtn}>Nominate your child — it's free</Link>
              <div className={styles.parentNote}>No account needed for your child to take the test</div>

              <div className={styles.nominationHorizontalWrap}>
                <div className={styles.nominationBox}>
                  <div className={styles.nominationNum}>01</div>
                  <div className={styles.nominationText}>
                    <strong>Enter details</strong>
                    <br />You enter child's name & email — 30s, no account needed
                  </div>
                </div>
                <div className={styles.nominationBox}>
                  <div className={styles.nominationNum}>02</div>
                  <div className={styles.nominationText}>
                    <strong>Get diagnostic</strong>
                    <br />They receive a link to the 20Q board diagnostic
                  </div>
                </div>
                <div className={styles.nominationBox}>
                  <div className={styles.nominationNum}>03</div>
                  <div className={styles.nominationText}>
                    <strong>See results</strong>
                    <br />You both see the scores, band & exact gaps
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.parentRight} delay={1}>
              <div className={styles.reportHeader}>
                <div>
                  <div className={styles.reportTitle}>Diagnostic Report Preview</div>
                  <div className={styles.reportStudent}>Arjun Sharma — Grade 10</div>
                </div>
                <div className={styles.reportBadge}>Mathematics</div>
              </div>

              <div className={styles.reportScoreSection}>
                <div className={styles.reportScoreCircle}>
                  <div className={styles.reportScoreVal}>74%</div>
                  <div className={styles.reportScoreLabel}>Score</div>
                </div>
                <div className={styles.reportScoreMeta}>
                  <div className={styles.reportScoreStatus}>Strong Readiness</div>
                  <div className={styles.reportScoreDesc}>On track for 70+ but has critical topic gaps that will cost marks on the boards.</div>
                </div>
              </div>

              <div className={styles.reportGrid}>
                <div className={styles.reportGridTitle}>Unit Scores</div>
                <div className={styles.reportRow}>
                  <div className={styles.reportRowLabel}>Algebra & Number Systems</div>
                  <div className={`${styles.reportRowVal} ${styles.valGood}`}>18/20</div>
                </div>
                <div className={styles.reportRow}>
                  <div className={styles.reportRowLabel}>Trigonometry</div>
                  <div className={`${styles.reportRowVal} ${styles.valMid}`}>8/12</div>
                </div>
                <div className={styles.reportRow}>
                  <div className={styles.reportRowLabel}>Geometry & Mensuration</div>
                  <div className={`${styles.reportRowVal} ${styles.valRisk}`}>9/15</div>
                </div>
              </div>

              <div className={styles.reportGaps}>
                <div className={styles.reportGapsTitle}>Top Marks-at-Risk Gaps</div>
                <div className={styles.reportGapItem}>
                  <div className={styles.reportGapName}>
                    <span className={styles.reportGapWarningIcon}>⚠️</span>
                    Quadratic Equations (Algebra)
                  </div>
                  <div className={styles.valRisk}><strong>-3 Marks</strong></div>
                </div>
                <div className={styles.reportGapItem}>
                  <div className={styles.reportGapName}>
                    <span className={styles.reportGapWarningIcon}>⚠️</span>
                    Similar Triangles (Geometry)
                  </div>
                  <div className={styles.valRisk}><strong>-4 Marks</strong></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footerSection}>
        <div className={styles.container}>
          <div className={styles.footerWrap}>
            <div className={styles.ftTag}>Know it · Prove it</div>
            <div className={styles.ftLinks}>
              <div className={styles.ftLink}>Privacy</div>
              <div className={styles.ftLink}>Terms</div>
              <Link to="/contact" className={styles.ftLink}>Contact</Link>
            </div>
            <div className={styles.ftSlash}>/</div>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
};

export default LandingPage;
