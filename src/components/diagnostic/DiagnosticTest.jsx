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
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('A');
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

  const currentQuestion = questions[activeQuestionIndex] || null;

  // Auto-sync activeSection tab when the active question index changes
  useEffect(() => {
    if (currentQuestion) {
      setActiveSection(currentQuestion.section);
    }
  }, [activeQuestionIndex, currentQuestion]);

  const handleNext = () => {
    if (currentQuestion && answers[currentQuestion.id]) {
      if (activeQuestionIndex + 1 < questions.length) {
        const nextQ = questions[activeQuestionIndex + 1];
        if (currentQuestion.section !== nextQ.section) {
          setNextSectionName(nextQ.section);
          setShowSectionModal(true);
        } else {
          setActiveQuestionIndex(activeQuestionIndex + 1);
        }
      } else {
        // Finished the test
        sessionStorage.removeItem('diagnostic_time_left');
        navigate('/diagnostic-results');
      }
    }
  };

  const handleBack = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    if (activeQuestionIndex + 1 < questions.length) {
      const nextQ = questions[activeQuestionIndex + 1];
      if (currentQuestion && currentQuestion.section !== nextQ.section) {
        setNextSectionName(nextQ.section);
        setShowSectionModal(true);
      } else {
        setActiveQuestionIndex(activeQuestionIndex + 1);
      }
    } else {
      sessionStorage.removeItem('diagnostic_time_left');
      navigate('/diagnostic-results');
    }
  };

  const startNextSection = () => {
    setShowSectionModal(false);
    setActiveQuestionIndex(activeQuestionIndex + 1);
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

  const selectedOption = currentQuestion ? answers[currentQuestion.id] || null : null;
  const sectionsList = ['A', 'B', 'C', 'D', 'E'];
  const sectionQuestions = questions.filter(q => q.section === activeSection);

  return (
    <>
      <div className={styles.stickyTop}>
        {/* GLOBAL FULL-WIDTH NAV */}
        <Navbar testMode onExit={handleExit} />

        {/* GLOBAL PROGRESS HEADER */}
        {currentQuestion && (
          <div className={styles.topHeaderCard}>
            <div className={styles.topHeaderContent}>
              <div className={styles.topHeaderLeft}>
                <span className={styles.testBadge}>Diagnostic Test</span>
                <span className={styles.progressText}>
                  {Object.keys(answers).length} of {questions.length} Completed
                </span>
              </div>
              
              <div className={styles.topHeaderRight}>
                <span className={styles.allSectionsLabel}>All Sections</span>
                <div className={`${styles.timerBadge} ${timeLeft < 300 ? styles.timerUrgent : ''}`}>
                  <svg className={styles.timerIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className={styles.timerVal}>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.topHeaderProgressBarBg}>
              <div 
                className={styles.topHeaderProgressBarFill} 
                style={{ width: `${Math.round((Object.keys(answers).length / questions.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.pageWrap}>
        <div className={styles.splitLayout}>
          
          {/* LEFT SIDE: SELECTED QUESTION & ACTIONS */}
          <div className={styles.leftPanel}>
            {currentQuestion ? (
              <div className={styles.screenContainer}>
                
                {/* SECTION BAR */}
                {currentQuestion.paperNeeded ? (
                  <>
                    <div className={`${styles.secBar} ${styles.secBarAmber}`}>
                      <div className={styles.secPillAmber}>Section {currentQuestion.section}</div>
                      <div className={styles.secDesc}>{currentQuestion.marks} marks &middot; {currentQuestion.type}</div>
                    </div>
                    <div className={styles.paperStrip}>
                      <div className={styles.paperDot}></div>
                      <div className={styles.paperText}>
                        <strong>{currentQuestion.paperText || "Work this out on paper first"}</strong>, then select your answer below.
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`${styles.secBar} ${styles.secBarBlue}`}>
                    <div className={styles.secPillBlue}>Section {currentQuestion.section}</div>
                    <div className={styles.secDesc}>{currentQuestion.marks} mark &middot; Select one answer &middot; No working required</div>
                  </div>
                )}

                {/* QUESTION AREA */}
                <div className={styles.qArea}>
                  <div className={styles.qHeader}>
                    <div className={styles.qLabel}>Question {currentQuestion.overallQ}</div>
                    {currentQuestion.boardTag && (
                      <div className={styles.boardTag}>
                        <div className={styles.bd}></div>
                        <div className={styles.bt}>{currentQuestion.boardTag}</div>
                      </div>
                    )}
                  </div>

                  {currentQuestion.caseStem && (
                    <div className={styles.caseStem}>{currentQuestion.caseStem}</div>
                  )}

                  <div className={styles.qStem}>{currentQuestion.stem}</div>

                  <div className={styles.optionsList}>
                    {currentQuestion.options.map(opt => (
                      <div
                        key={opt.id}
                        className={`${styles.opt} ${selectedOption === opt.id ? styles.selected : ''}`}
                        onClick={() => handleOptionSelect(currentQuestion.id, opt.id)}
                      >
                        <div className={styles.optMarker}>
                          <span className={styles.ol}>{opt.id}</span>
                        </div>
                        <div className={styles.ot}>{opt.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.qFooter}>
                    {/* Footers clean, saveNote and clear removed from here */}
                  </div>
                </div>

                {/* NAVIGATION ACTIONS FOR THE ACTIVE QUESTION */}
                <div className={styles.leftPanelActions}>
                  <button 
                    className={`${styles.btnClearSelectionCustom} ${!selectedOption ? styles.disabled : ''}`} 
                    onClick={() => selectedOption && handleClear(currentQuestion.id)}
                    disabled={!selectedOption}
                  >
                    Clear Selection
                  </button>

                  <div className={styles.rightNavGroup}>
                    {activeQuestionIndex > 0 && (
                      <button
                        className={styles.btnBackCustom}
                        onClick={handleBack}
                      >
                        &larr; Back
                      </button>
                    )}

                    <button 
                      className={styles.btnSkipCustom} 
                      onClick={handleSkip}
                    >
                      Skip
                    </button>

                    <button
                      className={`${styles.btnNextCustom} ${!selectedOption ? styles.off : ''}`}
                      onClick={handleNext}
                      disabled={!selectedOption}
                    >
                      {activeQuestionIndex + 1 >= questions.length ? 'Finish' : 'Next \u2192'}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ color: 'var(--t3)', fontFamily: 'var(--font-mono)' }}>No question selected.</div>
            )}
          </div>

          {/* RIGHT SIDE: SECTIONS & QUESTIONS GRID */}
          <div className={styles.rightPanel}>
            <div className={styles.rightPanelHeader}>
              <div className={styles.sectionHeaderLabel}>SECTIONS</div>
              <button className={styles.rightExitBtn} onClick={handleExit}>Exit</button>
            </div>
            
            {/* SECTION TABS */}
            <div className={styles.tabsContainer}>
              {sectionsList.map(sec => (
                <button
                  key={sec}
                  className={`${styles.tabBtn} ${activeSection === sec ? styles.activeTab : ''}`}
                  onClick={() => {
                    setActiveSection(sec);
                    // Proactively select the first question of that section
                    const firstQOfSec = questions.find(q => q.section === sec);
                    if (firstQOfSec) {
                      setActiveQuestionIndex(firstQOfSec.overallQ - 1);
                    }
                  }}
                >
                  Sec {sec}
                </button>
              ))}
            </div>

            {/* QUESTIONS LIST UNDER SELECTED SECTION */}
            <div className={styles.gridSectionHeader}>
              <span>Questions in Section {activeSection}</span>
              <span className={styles.gridSectionCount}>{sectionQuestions.length} Questions</span>
            </div>

            <div className={styles.questionsGrid}>
              {sectionQuestions.map(q => {
                const isQActive = activeQuestionIndex === q.overallQ - 1;
                const isQAnswered = !!answers[q.id];
                
                return (
                  <button
                    key={q.id}
                    className={`${styles.qGridItem} ${isQActive ? styles.qActive : ''} ${isQAnswered ? styles.qAnswered : ''}`}
                    onClick={() => setActiveQuestionIndex(q.overallQ - 1)}
                  >
                    <span className={styles.qGridNum}>{q.overallQ}</span>
                    {isQAnswered && (
                      <span className={styles.qCheckDot}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* LEGEND / PROGRESS INFO */}
            <div className={styles.legendContainer}>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendDotActive}`}></span>
                <span>Current</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendDotAnswered}`}></span>
                <span>Answered</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendDotUnanswered}`}></span>
                <span>Unanswered</span>
              </div>
            </div>

            {/* PROGRESS AUTO-SAVED STATUS */}
            <div className={styles.rightSaveIndicator}>
              <span className={styles.saveDot}></span>
              <span>Progress auto-saved</span>
            </div>

          </div>

        </div>
      </div>

      {/* INTERSTITIAL MODAL */}
      <AnimatePresence>
      {showSectionModal && (() => {
        const getSectionInfo = (secName) => {
          switch (secName) {
            case 'A':
              return { qCount: 20, range: 'Q1 - Q20', marks: '1 mark each', desc: 'Multiple choice questions. No working required.', totalMarks: 20 };
            case 'B':
              return { qCount: 5, range: 'Q21 - Q25', marks: '2 marks each', desc: 'Short working questions. Keep your paper ready.', totalMarks: 10 };
            case 'C':
              return { qCount: 6, range: 'Q26 - Q31', marks: '3 marks each', desc: 'Multi-step questions. Time to show your method.', totalMarks: 18 };
            case 'D':
              return { qCount: 4, range: 'Q32 - Q35', marks: '5 marks each', desc: 'Long answer questions. Detailed working required.', totalMarks: 20 };
            case 'E':
              return { qCount: 3, range: 'Q36 - Q38', marks: '4 marks each', desc: 'Case-based scenarios. Read the context carefully.', totalMarks: 12 };
            default:
              return null;
          }
        };

        const completedSec = currentQuestion ? currentQuestion.section : '';
        const completedInfo = getSectionInfo(completedSec);
        const nextInfo = getSectionInfo(nextSectionName);

        return (
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
              <div className={styles.modalEyebrow}>
                Section {completedSec} Complete {completedInfo && `· ${completedInfo.qCount} Questions`}
              </div>
              <h2 className={styles.modalTitle}>Great job!</h2>
              
              {nextInfo && (
                <div className={styles.modalNextSection}>
                  <div className={styles.modalNextLabel}>Up next</div>
                  <h3 className={styles.modalNextTitle}>Section {nextSectionName}</h3>
                  <p className={styles.modalDesc}>{nextInfo.desc}</p>
                  
                  <div className={styles.modalInfoGrid}>
                    <div className={styles.modalInfoItem}>
                      <span className={styles.modalInfoLabel}>Questions</span>
                      <span className={styles.modalInfoValue}>{nextInfo.qCount} ({nextInfo.range})</span>
                    </div>
                    <div className={styles.modalInfoItem}>
                      <span className={styles.modalInfoLabel}>Weight</span>
                      <span className={styles.modalInfoValue}>{nextInfo.marks}</span>
                    </div>
                    <div className={styles.modalInfoItem}>
                      <span className={styles.modalInfoLabel}>Section Marks</span>
                      <span className={styles.modalInfoValue}>{nextInfo.totalMarks} Marks</span>
                    </div>
                  </div>
                </div>
              )}

              <button className={styles.modalBtn} onClick={startNextSection}>
                Start Section {nextSectionName}
              </button>
            </motion.div>
          </div>
        );
      })()}
      </AnimatePresence>
    </>
  );
};

export default DiagnosticTest;
