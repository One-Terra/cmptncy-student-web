import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DiagnosticResults.module.css';

const DiagnosticResults = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations after a short delay
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div className={styles.pageWrap}>
      <nav className={styles.nav}>
        <div className={styles.wm} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>CMPTN<em>C</em>Y</div>
        <div className={styles.navRight}>Akanksha &middot; Free</div>
      </nav>

      <div className={styles.onboardComplete}>
        <div className={`${styles.ocDot} ${styles.active}`}></div>
        <div className={styles.ocLine}></div>
        <div className={`${styles.ocDot} ${styles.active}`}></div>
        <div className={styles.ocLine}></div>
        <div className={`${styles.ocDot} ${styles.active}`}></div>
        <div className={styles.ocLabel}>&check; Diagnostic complete</div>
      </div>

      <div className={styles.main}>
        {/* LEFT COL */}
        <div className={styles.leftCol}>
          <div className={styles.heroScoreBox}>
            <div className={styles.hero}>
              <div className={styles.eyebrow}>Your diagnostic results</div>
              <h1 className={styles.headline}>Here's where<br />you <span className={styles.acc}>actually stand.</span></h1>
              <p className={styles.sub}>Based on 38 questions across all 7 units. This is your starting point — not your ceiling.</p>
            </div>

            <div className={styles.scoreStrip}>
              <div className={styles.scoreRow}>
                <div className={styles.scoreBox}>
                  <div className={styles.scoreVal}><span className={styles.acc}>62</span><span className={styles.fade}>/80</span></div>
                  <span className={styles.scoreUnit}>Predicted score</span>
                </div>
                <div className={styles.scoreBox}>
                  <div className={styles.scoreVal}>67<span className={styles.fade}>%</span></div>
                  <span className={styles.scoreUnit}>Mastery</span>
                </div>
                <div className={styles.scoreBoxBand}>
                  <div className={styles.bandVal}>Almost<br />Ready</div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(240,165,0,0.5)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px', fontWeight: 600 }}>Readiness</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.unitSection}>
            <div className={styles.secLabel}>Unit by unit</div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Real Numbers</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barStrong}`} style={{ width: mounted ? '88%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>88%</div>
              <div className={`${styles.unitPill} ${styles.pillStrong}`}>Strong</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Polynomials</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barGood}`} style={{ width: mounted ? '74%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>74%</div>
              <div className={`${styles.unitPill} ${styles.pillGood}`}>Good</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Linear Equations</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barGood}`} style={{ width: mounted ? '70%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>70%</div>
              <div className={`${styles.unitPill} ${styles.pillGood}`}>Good</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Quadratic Equations</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barDeveloping}`} style={{ width: mounted ? '54%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>54%</div>
              <div className={`${styles.unitPill} ${styles.pillDeveloping}`}>Developing</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Arithmetic Progressions</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barDeveloping}`} style={{ width: mounted ? '48%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>48%</div>
              <div className={`${styles.unitPill} ${styles.pillDeveloping}`}>Developing</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Triangles & Circles</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barWorkOn}`} style={{ width: mounted ? '32%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>32%</div>
              <div className={`${styles.unitPill} ${styles.pillWorkOn}`}>Work on</div>
            </div>
            
            <div className={styles.unitRow}>
              <div className={styles.unitName}>Statistics & Probability</div>
              <div className={styles.unitBarWrap}>
                <div className={`${styles.unitBar} ${styles.barWorkOn}`} style={{ width: mounted ? '28%' : '0%' }}></div>
              </div>
              <div className={styles.unitPct}>28%</div>
              <div className={`${styles.unitPill} ${styles.pillWorkOn}`}>Work on</div>
            </div>
          </div>

          <div className={styles.bottomActions}>
            <button className={styles.btnPrimary} onClick={() => navigate('/review-answers')}>Review my answers &rarr;</button>
            <button className={styles.btnSecondary} onClick={() => navigate('/dashboard')}>Go to my dashboard</button>
          </div>

          <div className={styles.plans}>
            <div className={styles.plansLabel}>Choose how far you want to go</div>
            <div className={styles.planCards}>
              
              <div className={styles.planCard}>
                <div className={`${styles.planHeader} ${styles.mid}`}>
                  <div className={`${styles.planTag} ${styles.tagMid}`}>Mid plan</div>
                  <div className={styles.planName}>Know every gap</div>
                  <div className={styles.planPrice}><strong>₹XXX</strong> / month</div>
                </div>
                <div className={styles.planBody}>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickMid}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>All 95 concept gaps</strong> ordered by marks at risk</div>
                  </div>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickMid}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>Speed & confidence</strong> analysis under board conditions</div>
                  </div>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickMid}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>Track progress</strong> as you retest each concept</div>
                  </div>
                  <button className={styles.planCtaMid}>Unlock Mid &rarr;</button>
                </div>
              </div>
              
              <div className={`${styles.planCard} ${styles.recommended}`}>
                <div className={`${styles.planHeader} ${styles.full}`}>
                  <div className={styles.recBadge}>Recommended</div>
                  <div className={`${styles.planTag} ${styles.tagFull}`}>Full plan</div>
                  <div className={styles.planName}>Get board ready</div>
                  <div className={styles.planPrice}><strong>₹XXX</strong> / month</div>
                </div>
                <div className={styles.planBody}>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickFull}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>Everything in Mid</strong> plus a system-built plan</div>
                  </div>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickFull}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>Daily study plan</strong> adapts after every session</div>
                  </div>
                  <div className={styles.planFeature}>
                    <div className={`${styles.featTick} ${styles.tickFull}`}><svg width="10" height="10" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#E8572A" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></div>
                    <div className={styles.featText}><strong>Board score updated</strong> live as mastery grows</div>
                  </div>
                  <button className={styles.planCtaFull}>Get board ready &rarr;</button>
                </div>
              </div>
              
            </div>
          </div>

          <div className={styles.freeContinue}>
            <div className={styles.fcText}>Not now — <span className={styles.fcLink}>continue on free plan</span></div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className={styles.rightCol}>
          <div className={styles.conceptSection}>
            <div className={styles.secLabel}>Your concept gaps</div>
            
            <div className={styles.conceptRow}>
              <div>
                <div className={styles.conceptName}>Discriminant & nature of roots</div>
                <span className={styles.conceptUnitTag}>Unit 4 &middot; Quadratic Equations</span>
              </div>
              <div className={`${styles.conceptStatus} ${styles.csWorkon}`}>Work on</div>
              <div className={styles.conceptMarks}>&minus;6 marks</div>
            </div>
            
            <div className={styles.conceptRow}>
              <div>
                <div className={styles.conceptName}>Sum of AP terms — formula application</div>
                <span className={styles.conceptUnitTag}>Unit 5 &middot; Arithmetic Progressions</span>
              </div>
              <div className={`${styles.conceptStatus} ${styles.csDeveloping}`}>Developing</div>
              <div className={styles.conceptMarks}>&minus;4 marks</div>
            </div>
            
            <div className={styles.blurredRows}>
              <div className={styles.conceptRow}>
                <div>
                  <div className={styles.conceptName}>Similarity criteria — AA, SAS, SSS</div>
                  <span className={styles.conceptUnitTag}>Unit 6 &middot; Triangles</span>
                </div>
                <div className={`${styles.conceptStatus} ${styles.csWorkon}`}>Work on</div>
                <div className={styles.conceptMarks}>&minus;5 marks</div>
              </div>
              <div className={styles.conceptRow}>
                <div>
                  <div className={styles.conceptName}>Tangent properties of circles</div>
                  <span className={styles.conceptUnitTag}>Unit 6 &middot; Circles</span>
                </div>
                <div className={`${styles.conceptStatus} ${styles.csWorkon}`}>Work on</div>
                <div className={styles.conceptMarks}>&minus;4 marks</div>
              </div>
              <div className={styles.conceptRow}>
                <div>
                  <div className={styles.conceptName}>Mean, median, mode — grouped data</div>
                  <span className={styles.conceptUnitTag}>Unit 7 &middot; Statistics</span>
                </div>
                <div className={`${styles.conceptStatus} ${styles.csDeveloping}`}>Developing</div>
                <div className={styles.conceptMarks}>&minus;3 marks</div>
              </div>
            </div>
            
            <div className={styles.conceptUnlock}>
              <div className={styles.cuTitle}>93 more concepts mapped</div>
              <div className={styles.cuText}>Upgrade to see every concept gap, the marks at risk, and the exact order to fix them.</div>
              <div className={styles.cuBtn}>See all concept gaps</div>
            </div>
          </div>

          <div className={styles.hook}>
            <div className={styles.hookEyebrow}>You're closer than you think</div>
            <h2 className={styles.hookHeadline}><span className={styles.go}>18 marks</span> stand between<br />you and a <span className={styles.acc}>distinction.</span></h2>
            <p className={styles.hookSub}>You've mapped where you are. Now CMPTNCY can build the exact path to get you there — concept by concept, in the right order.</p>
            <div className={styles.missing}>
              <div className={styles.missingRow}><div className={styles.missingDot}></div><div className={styles.missingText}><strong>93 concept gaps</strong> identified — you can see 2 right now</div></div>
              <div className={styles.missingRow}><div className={styles.missingDot}></div><div className={styles.missingText}><strong>Triangles & Circles</strong> alone could cost you 12 marks</div></div>
              <div className={styles.missingRow}><div className={styles.missingDot}></div><div className={styles.missingText}><strong>Speed & confidence data</strong> shows where board pressure will hit hardest</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResults;
