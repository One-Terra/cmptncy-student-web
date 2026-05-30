import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './DiagnosticIntro.module.css';

const DiagnosticIntro = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the actual diagnostic test page when it's built
    navigate('/diagnostic');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar user={{ name: 'Akanksha', plan: 'Free' }} />

      <div className={styles.progressTrackWrapper}>
        <div className={styles.progressTrack}>
        <div className={styles.progStep}>
          <div className={`${styles.progDot} ${styles.done}`}></div>
          <span className={`${styles.progStepLabel} ${styles.done}`}>Register</span>
          <div className={`${styles.progLine} ${styles.done}`}></div>
        </div>
        <div className={styles.progStep}>
          <div className={`${styles.progDot} ${styles.active}`}></div>
          <span className={`${styles.progStepLabel} ${styles.active}`}>Diagnostic</span>
          <div className={styles.progLine}></div>
        </div>
        <div className={styles.progStep}>
          <div className={styles.progDot}></div>
          <span className={`${styles.progStepLabel} ${styles.pending}`}>Your plan</span>
        </div>
      </div>

      </div>

      <div className={styles.mainContainer}>
        <div className={styles.main}>
          {/* LEFT */}
          <div className={styles.leftCol}>
          <div className={styles.hero}>
            <div className={styles.eyebrow}>Step 2 of 3 · Your diagnostic</div>
            <h1 className={styles.headline}><span className={styles.acc}>Ready?</span><br />Let's find out!</h1>
            <p className={styles.sub}>Most students know more than they think. This shows you exactly what you've got — and builds the shortest path to board ready from there.</p>
          </div>

          <div className={styles.expectStrip}>
            <div className={styles.statBox}><div className={styles.statVal}>38<span className={styles.unit}>Questions</span></div></div>
            <div className={styles.statBox}><div className={styles.statVal}>~2.5<span className={styles.unit}>Hours</span></div></div>
            <div className={styles.statBox}><div className={styles.statVal}>80<span className={styles.unit}>Marks</span></div></div>
          </div>

          <div className={styles.breakdown}>
            <div className={styles.bdLabel}>How it's structured</div>
            <div className={styles.bdRow}>
              <div className={styles.bdSec}>A</div>
              <div className={styles.bdMeta}><div className={styles.bdDesc}>20 questions · 1 mark each</div><div className={styles.bdDetail}>Direct MCQ — no working required</div></div>
              <div className={styles.bdRight}><div className={styles.bdTime}>~30 min</div></div>
            </div>
            <div className={styles.bdRow}>
              <div className={styles.bdSec}>B</div>
              <div className={styles.bdMeta}><div className={styles.bdDesc}>5 questions · 2 marks each</div><div className={styles.bdDetail}>Short working — 2 to 3 steps</div></div>
              <div className={styles.bdRight}><div className={styles.bdTime}>~20 min</div><div className={styles.bdWorking}>paper needed</div></div>
            </div>
            <div className={styles.bdRow}>
              <div className={styles.bdSec}>C</div>
              <div className={styles.bdMeta}><div className={styles.bdDesc}>6 questions · 3 marks each</div><div className={styles.bdDetail}>Multi-step working — method selection</div></div>
              <div className={styles.bdRight}><div className={styles.bdTime}>~33 min</div><div className={styles.bdWorking}>paper needed</div></div>
            </div>
            <div className={styles.bdRow}>
              <div className={styles.bdSec}>D</div>
              <div className={styles.bdMeta}><div className={styles.bdDesc}>4 questions · 5 marks each</div><div className={styles.bdDetail}>Long answer — proof or derivation</div></div>
              <div className={styles.bdRight}><div className={styles.bdTime}>~40 min</div><div className={styles.bdWorking}>paper needed</div></div>
            </div>
            <div className={styles.bdRow}>
              <div className={styles.bdSec}>E</div>
              <div className={styles.bdMeta}><div className={styles.bdDesc}>3 questions · 4 marks each</div><div className={styles.bdDetail}>Case-based — served as a group</div></div>
              <div className={styles.bdRight}><div className={styles.bdTime}>~24 min</div><div className={styles.bdWorking}>paper needed</div></div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.rightCol}>
          <div className={styles.topCtaWrap}>
            <div className={styles.topCtaText}>
              <div className={styles.topCtaEyebrow}>STEP 2 OF 3</div>
              <div>Ready to begin?</div>
            </div>
            <button className={styles.topCtaBtn} onClick={handleStart}>
              Start the diagnostic
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <div className={styles.whatSection}>
            <div className={styles.sectionLabel}>What happens</div>
            <div className={styles.step}>
              <div className={styles.stepNum}><span className={styles.stepNumTxt}>01</span></div>
              <div><div className={styles.stepTitle}>You answer 38 questions across 5 sections</div><div className={styles.stepDesc}>Sections B–E require working on paper before selecting your answer — have a pen and paper ready.</div></div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}><span className={styles.stepNumTxt}>02</span></div>
              <div><div className={styles.stepTitle}>We show you exactly where you stand</div><div className={styles.stepDesc}>Your strengths are mapped first. Then the areas with the most room to grow — concept by concept across all 95.</div></div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}><span className={styles.stepNumTxt}>03</span></div>
              <div><div className={styles.stepTitle}>You get a personal plan built around you</div><div className={styles.stepDesc}>Ordered by impact — the concepts that will build your score fastest come first.</div></div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}><span className={styles.stepNumTxt}>04</span></div>
              <div><div className={styles.stepTitle}>Your plan grows as you do</div><div className={styles.stepDesc}>Every retest updates your picture and keeps your plan pointed at what matters most.</div></div>
            </div>
          </div>

          <div className={styles.honesty}>
            <div className={styles.honestyLabel}>One thing before you start</div>
            <div className={styles.honestyText}>Don't guess. If you're not sure, skip it. A wrong answer from guessing gives us bad data and builds a plan that doesn't actually match where you are.</div>
          </div>

          <div className={styles.ctaWrap}>
            <button className={styles.startBtn} onClick={handleStart}>Start the diagnostic</button>
            <div className={styles.ctaNote}>You can save and come back — progress is saved to your account.</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DiagnosticIntro;
