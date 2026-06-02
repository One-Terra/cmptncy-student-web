import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../layout/Navbar";
import styles from './DiagnosticIntro.module.css';

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

const DiagnosticIntro = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const confirmStart = () => {
    navigate('/diagnostic');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className={styles.modalIconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h2 className={styles.modalTitle}>Test Guidelines & Integrity</h2>
              
              <div className={styles.modalBody}>
                <div className={styles.modalPoint}>
                  <div className={styles.mpNum}>1</div>
                  <div className={styles.mpText}><strong>Don't guess.</strong> If you don't know the answer, it's better to skip. Guessing correctly by chance gives us bad data and ruins your personalized plan.</div>
                </div>
                <div className={styles.modalPoint}>
                  <div className={styles.mpNum}>2</div>
                  <div className={styles.mpText}><strong>No outside help.</strong> Do not use Google, notes, or calculators. We need to measure <em>your</em> true baseline.</div>
                </div>
                <div className={styles.modalPoint}>
                  <div className={styles.mpNum}>3</div>
                  <div className={styles.mpText}><strong>Work it out.</strong> Have pen and paper ready for the sections that require working. You'll need it.</div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.modalSecondaryBtn} onClick={closeModal}>Go back</button>
                <button className={styles.modalPrimaryBtn} onClick={confirmStart}>I understand, begin</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navbar user={{ name: 'Akanksha', plan: 'Free' }} />

      <div className={styles.progressTrackWrapper}>
        <div className={styles.progressTrack}>
          <div className={styles.progStep}>
            <div className={`${styles.progDot} ${styles.done}`}></div>
            <span className={`${styles.progStepLabel} ${styles.done}`}>Register</span>
            <div className={`${styles.progLine} ${styles.done}`}></div>
          </div>
          <div className={styles.progStep}>
            <div className={`${styles.progDot} ${styles.active}`}>
              <motion.div 
                className={styles.pulse} 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} 
                transition={{ repeat: Infinity, duration: 2 }} 
              />
            </div>
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
            <Reveal className={styles.hero}>
              <div className={styles.eyebrow}>Step 2 of 3 · Your diagnostic</div>
              <h1 className={styles.headline}><span className={styles.acc}>Ready?</span><br />Let's find out!</h1>
              <p className={styles.sub}>Most students know more than they think. This shows you exactly what you've got — and builds the shortest path to board ready from there.</p>
            </Reveal>

            <Reveal delay={1} className={styles.expectStrip}>
              <div className={styles.statBox}>
                <div className={styles.statVal}>38<span className={styles.unit}>Questions</span></div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statVal}>~2.5<span className={styles.unit}>Hours</span></div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statVal}>80<span className={styles.unit}>Marks</span></div>
              </div>
            </Reveal>

            <Reveal delay={2} className={styles.breakdown}>
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
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className={styles.rightCol}>
            <Reveal delay={3} className={styles.topCtaWrap}>
              <div className={styles.topCtaText}>
                <div className={styles.topCtaEyebrow}>STEP 2 OF 3</div>
                <div>Ready to begin?</div>
              </div>
              <button className={styles.topCtaBtn} onClick={handleStartClick}>
                Start diagnostic
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </Reveal>

            <Reveal delay={4} className={styles.whatSection}>
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
            </Reveal>

            <Reveal delay={5} className={styles.honesty}>
              <div className={styles.honestyLabel}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 16v-6"></path><path d="M12 20h.01"></path></svg>
                One thing before you start
              </div>
              <div className={styles.honestyText}>Don't guess. If you're not sure, skip it. A wrong answer from guessing gives us bad data and builds a plan that doesn't actually match where you are.</div>
            </Reveal>

            <Reveal delay={6} className={styles.ctaWrap}>
              <button className={styles.startBtn} onClick={handleStartClick}>
                Start the diagnostic
                <span className={styles.btnShine}></span>
              </button>
              <div className={styles.ctaNote}>You can save and come back — progress is saved to your account.</div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticIntro;
