import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../layout/Navbar";
import styles from './DiagnosticTest.module.css';

const DiagnosticTest = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = sessionStorage.getItem('diagnostic_time_left');
    return saved !== null ? parseInt(saved, 10) : 7200;
  });

  const [questions, setQuestions] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [nextSectionName, setNextSectionName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(timer);
          sessionStorage.setItem('diagnostic_time_left', '0');
          return 0;
        }
        sessionStorage.setItem('diagnostic_time_left', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions?page=0&size=38&sortBy=chapter&direction=asc');
        const data = await response.json();

        const contentArray = data.content || (Array.isArray(data) ? data : []);

        const totalQuestions = 38;
        const mappedQuestions = Array.from({ length: totalQuestions }).map((_, index) => {
          const q = contentArray[index % (contentArray.length || 1)] || {};

          let parsedOptions = [];
          try {
            parsedOptions = JSON.parse(q.options || '[]');
          } catch (e) {
            console.error('Error parsing options:', e);
          }

          let section = 'A';
          let marks = 1;
          let paperNeeded = false;
          let type = 'Select one answer';
          let caseStem = null;

          const qNum = index + 1;
          if (qNum <= 20) {
            section = 'A'; marks = 1; paperNeeded = false;
          } else if (qNum <= 25) {
            section = 'B'; marks = 2; paperNeeded = true;
          } else if (qNum <= 31) {
            section = 'C'; marks = 3; paperNeeded = true;
          } else if (qNum <= 35) {
            section = 'D'; marks = 5; paperNeeded = true;
          } else {
            section = 'E'; marks = 4; paperNeeded = true; type = 'Case-based · Select one answer';
            caseStem = "Read the following scenario and answer the question below. An airplane is approaching the runway...";
          }

          return {
            id: `mock_${index}_${q.questionId || index}`,
            section: section,
            qNum: index + 1,
            totalSectionQ: totalQuestions,
            overallQ: index + 1,
            totalOverallQ: totalQuestions,
            marks: marks,
            type: type,
            paperNeeded: paperNeeded,
            boardTag: q.lastBoardAppearance || 'CBSE 2023',
            stem: q.stem || 'Sample question text...',
            options: parsedOptions.length ? parsedOptions : [
              { id: 'A', text: 'Option A' },
              { id: 'B', text: 'Option B' },
              { id: 'C', text: 'Option C' },
              { id: 'D', text: 'Option D' }
            ],
            caseStem: caseStem,
            eyebrow: index === 0 ? "You've got this. Let's see what you know." :
              index === 19 ? "Halfway through. You're building something real." : null
          };
        });

        // Compute pages so sections don't mix
        const newPages = [];
        let currentPage = [];
        let currentSection = mappedQuestions.length > 0 ? mappedQuestions[0].section : 'A';

        mappedQuestions.forEach(q => {
          if (q.section !== currentSection || currentPage.length === 3) {
            if (currentPage.length > 0) newPages.push(currentPage);
            currentPage = [q];
            currentSection = q.section;
          } else {
            currentPage.push(q);
          }
        });
        if (currentPage.length > 0) newPages.push(currentPage);

        setPages(newPages);
        setQuestions(mappedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleExit = () => {
    navigate('/diagnostic-intro');
  };

  const handleOptionSelect = (qId, optId) => {
    setAnswers({ ...answers, [qId]: optId });
  };

  const handleClear = (qId) => {
    const newAnswers = { ...answers };
    delete newAnswers[qId];
    setAnswers(newAnswers);
  };

  const visibleQuestions = pages[currentPageIndex] || [];
  const allVisibleAnswered = visibleQuestions.every(q => answers[q.id]);

  const handleNext = () => {
    if (allVisibleAnswered) {
      if (currentPageIndex + 1 < pages.length) {
        const currentSection = pages[currentPageIndex][0].section;
        const nextSection = pages[currentPageIndex + 1][0].section;

        if (currentSection !== nextSection) {
          setNextSectionName(nextSection);
          setShowSectionModal(true);
        } else {
          setCurrentPageIndex(currentPageIndex + 1);
        }
      } else {
        // Finished the test
        sessionStorage.removeItem('diagnostic_time_left');
        navigate('/diagnostic-results');
      }
    }
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentPageIndex + 1 < pages.length) {
      const currentSection = pages[currentPageIndex][0].section;
      const nextSection = pages[currentPageIndex + 1][0].section;

      if (currentSection !== nextSection) {
        setNextSectionName(nextSection);
        setShowSectionModal(true);
      } else {
        setCurrentPageIndex(currentPageIndex + 1);
      }
    } else {
      sessionStorage.removeItem('diagnostic_time_left');
      navigate('/diagnostic-results');
    }
  };

  const startNextSection = () => {
    setShowSectionModal(false);
    setCurrentPageIndex(currentPageIndex + 1);
  };

  if (loading) {
    return (
      <div className={styles.pageWrap}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>Loading your diagnostic...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.pageWrap}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>No questions found.</div>
      </div>
    );
  }

  const firstQ = questions[0];
  const overallProgress = Math.round((1 / questions.length) * 100);

  return (
    <>
      <div className={styles.stickyTop}>
        {/* GLOBAL FULL-WIDTH NAV */}
        <Navbar testMode onExit={handleExit} />

        {/* GLOBAL PROGRESS HEADER */}
        {firstQ && (
          <div style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--ink)', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
            {firstQ.eyebrow && (
              <div className={styles.eyebrowWrap} style={{ paddingTop: 20 }}>
                <div className={styles.eyDim}>
                  Section {firstQ.section} &middot; Q{firstQ.overallQ} of {firstQ.totalOverallQ}
                </div>
                <div className={styles.eyOr}>{firstQ.eyebrow}</div>
              </div>
            )}
            <div className={styles.progressWrap}>
              <div className={styles.progMeta}>
                <div className={styles.progSection}>
                  Diagnostic Preview &middot; {questions.length} Questions
                </div>
                <div className={styles.progCount} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span>All Sections</span>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: 'rgba(255,255,255,0.1)', 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: timeLeft < 300 ? '#ef4444' : '#F4F7FB' // Turns red if < 5 mins
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              <div className={styles.progBar}>
                <div className={styles.progFill} style={{ width: `100%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.pageWrap}>

        <div className={styles.grid}>
          {visibleQuestions.map((questionData, index) => {
            const selectedOption = answers[questionData.id] || null;

            let label = `API Q${questionData.overallQ} · Sec ${questionData.section}`;

            return (
              <div key={questionData.id} className={styles.stateCol}>
                <div className={styles.cardTopNav}>
                  <div className={styles.leftNav}>
                    {index === 0 && (
                      <button
                        className={styles.cardTopBtn}
                        onClick={handleBack}
                        style={{ opacity: currentPageIndex === 0 ? 0.3 : 1, pointerEvents: currentPageIndex === 0 ? 'none' : 'auto' }}
                      >
                        &larr; Back
                      </button>
                    )}
                  </div>
                  <div className={styles.btnGroup}>
                    {index === visibleQuestions.length - 1 && (
                      <>
                        <button className={styles.cardTopSkip} onClick={handleSkip}>Skip</button>
                        <button
                          className={`${styles.cardTopBtn} ${styles.cardTopNext} ${!allVisibleAnswered ? styles.off : ''}`}
                          onClick={handleNext}
                        >
                          {currentPageIndex + 1 >= pages.length ? 'Finish' : 'Next \u2192'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.lbl}>{label}</div>
                <div className={styles.screenContainer}>

                  {/* SECTION BAR */}
                  {questionData.paperNeeded ? (
                    <>
                      <div className={`${styles.secBar} ${styles.secBarAmber}`}>
                        <div className={styles.secPillAmber}>Section {questionData.section}</div>
                        <div className={styles.secDesc}>{questionData.marks} marks &middot; {questionData.type}</div>
                      </div>
                      <div className={styles.paperStrip}>
                        <div className={styles.paperDot}></div>
                        <div className={styles.paperText}>
                          <strong>{questionData.paperText || "Work this out on paper first"}</strong>, then select your answer below.
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`${styles.secBar} ${styles.secBarBlue}`}>
                      <div className={styles.secPillBlue}>Section {questionData.section}</div>
                      <div className={styles.secDesc}>{questionData.marks} mark &middot; Select one answer &middot; No working required</div>
                    </div>
                  )}

                  {/* QUESTION AREA */}
                  <div className={styles.qArea}>
                    <div className={styles.qHeader}>
                      <div className={styles.qLabel}>Question {questionData.overallQ}</div>
                      {questionData.boardTag && (
                        <div className={styles.boardTag}>
                          <div className={styles.bd}></div>
                          <div className={styles.bt}>{questionData.boardTag}</div>
                        </div>
                      )}
                    </div>

                    {questionData.caseStem && (
                      <div className={styles.caseStem}>{questionData.caseStem}</div>
                    )}

                    <div className={styles.qStem}>{questionData.stem}</div>

                    <div className={styles.optionsList}>
                      {questionData.options.map(opt => (
                        <div
                          key={opt.id}
                          className={`${styles.opt} ${selectedOption === opt.id ? styles.selected : ''}`}
                          onClick={() => handleOptionSelect(questionData.id, opt.id)}
                        >
                          <div className={styles.optMarker}>
                            <span className={styles.ol}>{opt.id}</span>
                          </div>
                          <div className={styles.ot}>{opt.text}</div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.qFooter}>
                      {selectedOption && (
                        <button
                          className={styles.btnClearCard}
                          onClick={() => handleClear(questionData.id)}
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={styles.saveNote}>
                    Progress auto-saved &middot; Resume any time
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        {/* GLOBAL BOTTOM NAV */}
        <div className={styles.bottomNavGrid}>
          <div className={styles.leftNav}>
            <button
              className={styles.cardTopBtn}
              onClick={handleBack}
              style={{ opacity: currentPageIndex === 0 ? 0.3 : 1, pointerEvents: currentPageIndex === 0 ? 'none' : 'auto' }}
            >
              &larr; Back
            </button>
          </div>
          <div></div>
          <div className={styles.btnGroup} style={{ justifyContent: 'flex-end' }}>
            <button className={styles.cardTopSkip} onClick={handleSkip}>Skip</button>
            <button
              className={`${styles.cardTopBtn} ${styles.cardTopNext} ${!allVisibleAnswered ? styles.off : ''}`}
              onClick={handleNext}
            >
              {currentPageIndex + 1 >= pages.length ? 'Finish' : 'Next \u2192'}
            </button>
          </div>
        </div>

      </div>

      {/* INTERSTITIAL MODAL */}
      <AnimatePresence>
      {showSectionModal && (
        <div className={styles.modalOverlay}>
          <motion.div 
            className={styles.modalBox}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.modalCheckIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div className={styles.modalEyebrow}>Section {pages[currentPageIndex][0].section} Complete</div>
            <h2 className={styles.modalTitle}>Great job!</h2>
            
            <div className={styles.modalNextSection}>
              <div className={styles.modalNextLabel}>Up next</div>
              <h3 className={styles.modalNextTitle}>Section {nextSectionName}</h3>
              <p className={styles.modalDesc}>
                {nextSectionName === 'B' && "Short working questions ahead. Keep your paper ready."}
                {nextSectionName === 'C' && "Multi-step questions ahead. Time to show your method."}
                {nextSectionName === 'D' && "Long answer questions ahead. Detailed working required."}
                {nextSectionName === 'E' && "Case-based scenarios ahead. Read the context carefully."}
              </p>
            </div>

            <button className={styles.modalBtn} onClick={startNextSection}>
              Start Section {nextSectionName}
            </button>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </>
  );
};

export default DiagnosticTest;
