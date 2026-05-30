import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReviewAnswers.module.css';

const ReviewAnswers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.wm}>CMPTN<em>C</em>Y</div>
        <div className={styles.navBack} onClick={() => navigate('/diagnostic-results')}>
          &larr; Results
        </div>
      </nav>

      <div className={styles.main}>
        {/* LEFT SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.eyebrow}>Answer review</div>
          <h1 className={styles.headline}>38 questions.<br/><span className={styles.acc}>Every one counts.</span></h1>
          <p className={styles.heroSub}>Here's a full breakdown of your answers — use this to understand what to focus on, not what went wrong.</p>

          <div className={styles.summaryRow}>
            <div className={styles.sumBox}><div className={`${styles.sumVal} ${styles.valCorrect}`}>24</div><span className={styles.sumLabel}>Correct</span></div>
            <div className={styles.sumBox}><div className={`${styles.sumVal} ${styles.valWrong}`}>10</div><span className={styles.sumLabel}>Wrong</span></div>
            <div className={styles.sumBox}><div className={`${styles.sumVal} ${styles.valSkipped}`}>4</div><span className={styles.sumLabel}>Skipped</span></div>
            <div className={styles.sumBox}><div className={`${styles.sumVal} ${styles.valTotal}`}>38</div><span className={styles.sumLabel}>Total</span></div>
          </div>

          <div className={styles.marksSummary}>
            <div className={styles.msTitle}>Marks breakdown</div>
            <div className={styles.msBoxes}>
              <div className={`${styles.msBox} ${styles.scored}`}>
                <div className={`${styles.msVal} ${styles.green}`}>52<span className={styles.denom}>/80</span></div>
                <span className={`${styles.msLabel} ${styles.green}`}>Scored</span>
              </div>
              <div className={`${styles.msBox} ${styles.wrongBox}`}>
                <div className={`${styles.msVal} ${styles.orange}`}>−20</div>
                <span className={`${styles.msLabel} ${styles.orange}`}>Wrong answers</span>
              </div>
              <div className={`${styles.msBox} ${styles.skippedBox}`}>
                <div className={`${styles.msVal} ${styles.grey}`}>−8</div>
                <span className={`${styles.msLabel} ${styles.grey}`}>Skipped</span>
              </div>
              <div className={`${styles.msBox} ${styles.total}`}>
                <div className={`${styles.msVal} ${styles.dark}`}>80</div>
                <span className={`${styles.msLabel} ${styles.dark}`}>Available</span>
              </div>
            </div>
          </div>

          <div className={styles.secScores}>
            <div className={styles.filterLabel}>By section</div>
            <div className={styles.secScoreRow}><div className={styles.secScoreLabel}>Section A &middot; 1 mark</div><div className={styles.secScoreVal}><span className={styles.got}>16</span> / 20</div></div>
            <div className={styles.secScoreRow}><div className={styles.secScoreLabel}>Section B &middot; 2 marks</div><div className={styles.secScoreVal}><span className={styles.got}>6</span> / 10</div></div>
            <div className={styles.secScoreRow}><div className={styles.secScoreLabel}>Section C &middot; 3 marks</div><div className={styles.secScoreVal}><span className={styles.got}>9</span> / 18</div></div>
            <div className={styles.secScoreRow}><div className={styles.secScoreLabel}>Section D &middot; 5 marks</div><div className={styles.secScoreVal}><span className={styles.got}>10</span> / 20</div></div>
            <div className={styles.secScoreRow}><div className={styles.secScoreLabel}>Section E &middot; 4 marks</div><div className={styles.secScoreVal}><span className={styles.got}>8</span> / 12</div></div>
          </div>

          <div className={styles.filterTabs}>
            <div className={styles.filterLabel}>Filter</div>
            <div className={`${styles.tab} ${styles.active}`}>All questions</div>
            <div className={styles.tab}>Correct only</div>
            <div className={styles.tab}>Wrong only</div>
            <div className={styles.tab}>Skipped only</div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.content}>

          {/* SECTION A */}
          <div className={styles.secHeader}>
            <div className={styles.secHeaderTxt}>Section A &middot; 1 mark each</div>
            <div className={styles.secMarksTally}><span className={styles.got}>16</span> / 20 marks</div>
          </div>
          
          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q1</div>
                <div className={styles.aiTopic}>Real Numbers</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>1 / 1</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>Which of the following numbers is irrational?</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>C — √7 ✓</div>
              </div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.wrong}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q2</div>
                <div className={styles.aiTopic}>Real Numbers &middot; HCF & LCM</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbWrong}`}>0 / 1</div>
                <div className={`${styles.aiStatus} ${styles.statusWrong}`}>Wrong</div>
              </div>
            </div>
            <div className={styles.aiStem}>The HCF of two numbers is 9 and their LCM is 2016. If one number is 54, what is the other?</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.wrongAns}`}>B — 336</div>
              </div>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Correct</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>C — 324 ✓</div>
              </div>
            </div>
            <div className={styles.misconception}>
              <div className={styles.miscLabel}>Why students get this wrong</div>
              <div className={styles.miscText}>Most students apply HCF × LCM = product correctly but make an arithmetic slip. Always verify both conditions — the HCF of your answer and 54 must equal 9.</div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.skipped}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q3</div>
                <div className={styles.aiTopic}>Polynomials &middot; Zeroes</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbSkipped}`}>0 / 1</div>
                <div className={`${styles.aiStatus} ${styles.statusSkipped}`}>Skipped</div>
              </div>
            </div>
            <div className={styles.aiStem}>If the zeroes of x² + px + q are double those of 2x² − 5x − 3, find p and q.</div>
            <div className={styles.skippedNote}>You skipped this question — no answer recorded.</div>
          </div>

          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q4</div>
                <div className={styles.aiTopic}>Polynomials</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>1 / 1</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>A polynomial of degree 2 has zeroes 3 and −5. Which is the polynomial?</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>A — x² + 2x − 15 ✓</div>
              </div>
            </div>
          </div>

          {/* ACE NUDGE */}
          <div className={styles.aceNudge}>
            <div className={styles.aceTop}>
              <div className={styles.aceHeadline}>Want to <span className={styles.acc}>ace<br/>the boards?</span></div>
              <button className={styles.aceCta}>See how &rarr;</button>
            </div>
            <div className={styles.aceBottom}>
              <div className={styles.avatarStack}>
                <div className={styles.av}><div className={styles.avInner}></div></div>
                <div className={styles.av}><div className={styles.avInner}></div></div>
                <div className={styles.av}><div className={styles.avInner}></div></div>
                <div className={styles.av}><div className={styles.avInner}></div></div>
              </div>
              <div className={styles.aceSocial}>CMPTNCY has helped <strong>1,200+ students</strong> just like you reach their full potential.</div>
            </div>
          </div>

          {/* SECTION B */}
          <div className={styles.secHeader}>
            <div className={styles.secHeaderTxt}>Section B &middot; 2 marks each</div>
            <div className={styles.secMarksTally}><span className={styles.got}>6</span> / 10 marks</div>
          </div>
          
          <div className={`${styles.answerItem} ${styles.wrong}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q21</div>
                <div className={styles.aiTopic}>Quadratic Equations &middot; Discriminant</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbWrong}`}>0 / 2</div>
                <div className={`${styles.aiStatus} ${styles.statusWrong}`}>Wrong</div>
              </div>
            </div>
            <div className={styles.aiStem}>Find k for which (k−1)x² + 2(k−1)x + 1 = 0 has two equal real roots.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.wrongAns}`}>B — k = 2 only</div>
              </div>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Correct</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>C — k = 1 or k = 2 ✓</div>
              </div>
            </div>
            <div className={styles.misconception}>
              <div className={styles.miscLabel}>Why students get this wrong</div>
              <div className={styles.miscText}>Students find k = 2 using discriminant = 0 but miss k = 1. Both values must be checked — k = 1 satisfies the condition even though it makes the equation degenerate.</div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q22</div>
                <div className={styles.aiTopic}>Arithmetic Progressions &middot; Sum</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>2 / 2</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>Sum of first 20 terms is 400, first 40 is 1600. Find sum of first 60 terms.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>C — 3600 ✓</div>
              </div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.skipped}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q23</div>
                <div className={styles.aiTopic}>Triangles &middot; Similarity</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbSkipped}`}>0 / 2</div>
                <div className={`${styles.aiStatus} ${styles.statusSkipped}`}>Skipped</div>
              </div>
            </div>
            <div className={styles.aiStem}>In triangles ABC and PQR, if AB/PQ = BC/QR, which similarity criterion applies?</div>
            <div className={styles.skippedNote}>You skipped this question — no answer recorded.</div>
          </div>

          {/* SECTION C */}
          <div className={styles.secHeader}>
            <div className={styles.secHeaderTxt}>Section C &middot; 3 marks each</div>
            <div className={styles.secMarksTally}><span className={styles.got}>9</span> / 18 marks</div>
          </div>
          
          <div className={`${styles.answerItem} ${styles.wrong}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q26</div>
                <div className={styles.aiTopic}>Triangles & Circles</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbWrong}`}>0 / 3</div>
                <div className={`${styles.aiStatus} ${styles.statusWrong}`}>Wrong</div>
              </div>
            </div>
            <div className={styles.aiStem}>Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.wrongAns}`}>B — Incomplete proof</div>
              </div>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Correct</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>A — Full proof with contradiction ✓</div>
              </div>
            </div>
            <div className={styles.misconception}>
              <div className={styles.miscLabel}>Why students get this wrong</div>
              <div className={styles.miscText}>Students often state the result without using the proof by contradiction method CBSE requires. The key step is assuming the tangent is not perpendicular and showing this leads to a shorter distance than the radius — which is impossible.</div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q27</div>
                <div className={styles.aiTopic}>Statistics &middot; Mean</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>3 / 3</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>Find the mean of the following frequency distribution using the assumed mean method.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>D — 57.5 ✓</div>
              </div>
            </div>
          </div>

          {/* SECTION D */}
          <div className={styles.secHeader}>
            <div className={styles.secHeaderTxt}>Section D &middot; 5 marks each</div>
            <div className={styles.secMarksTally}><span className={styles.got}>10</span> / 20 marks</div>
          </div>
          
          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q32</div>
                <div className={styles.aiTopic}>Quadratic Equations &middot; Speed</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>5 / 5</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>A train travels 360 km at uniform speed. If speed had been 5 km/h more, it would have taken 1 hour less. Find the speed.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>B — 40 km/h ✓</div>
              </div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.wrong}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q33</div>
                <div className={styles.aiTopic}>Triangles &middot; Pythagoras</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbWrong}`}>0 / 5</div>
                <div className={`${styles.aiStatus} ${styles.statusWrong}`}>Wrong</div>
              </div>
            </div>
            <div className={styles.aiStem}>Prove that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.wrongAns}`}>C — Incomplete proof</div>
              </div>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Correct</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>A — Full proof with construction ✓</div>
              </div>
            </div>
            <div className={styles.misconception}>
              <div className={styles.miscLabel}>Why students get this wrong</div>
              <div className={styles.miscText}>The CBSE proof requires a specific construction — drawing a perpendicular from the right angle to the hypotenuse. Students who skip the construction step lose all method marks even if they state the result correctly.</div>
            </div>
          </div>

          {/* SECTION E */}
          <div className={styles.secHeader}>
            <div className={styles.secHeaderTxt}>Section E &middot; 4 marks each</div>
            <div className={styles.secMarksTally}><span className={styles.got}>8</span> / 12 marks</div>
          </div>
          
          <div className={`${styles.answerItem} ${styles.correct}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q36</div>
                <div className={styles.aiTopic}>Statistics &middot; Case-based</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbCorrect}`}>4 / 4</div>
                <div className={`${styles.aiStatus} ${styles.statusCorrect}`}>Correct</div>
              </div>
            </div>
            <div className={styles.aiStem}>Based on the case: A school awards prizes for three values. Prize amounts are consecutive multiples of ₹300, sum is ₹2700. What is the highest prize?</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>D — ₹1100 ✓</div>
              </div>
            </div>
          </div>

          <div className={`${styles.answerItem} ${styles.wrong}`}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderLeft}>
                <div className={styles.aiQnum}>Q37</div>
                <div className={styles.aiTopic}>Probability &middot; Case-based</div>
              </div>
              <div className={styles.aiHeaderRight}>
                <div className={`${styles.marksBadge} ${styles.mbWrong}`}>0 / 4</div>
                <div className={`${styles.aiStatus} ${styles.statusWrong}`}>Wrong</div>
              </div>
            </div>
            <div className={styles.aiStem}>A bag has 5 red, 3 blue, and 2 green balls. Two balls are drawn at random. What is the probability both are red?</div>
            <div className={styles.aiAnswers}>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Your answer</div>
                <div className={`${styles.aiAnsVal} ${styles.wrongAns}`}>B — 1/4</div>
              </div>
              <div className={styles.aiAnswerRow}>
                <div className={styles.aiAnsLabel}>Correct</div>
                <div className={`${styles.aiAnsVal} ${styles.correctAns}`}>A — 2/9 ✓</div>
              </div>
            </div>
            <div className={styles.misconception}>
              <div className={styles.miscLabel}>Why students get this wrong</div>
              <div className={styles.miscText}>Students use P(R) × P(R) = 5/10 × 5/10 treating draws as independent. For draws without replacement, the correct method is ⁵C₂/¹⁰C₂ = 10/45 = 2/9.</div>
            </div>
          </div>

          <div className={styles.bottomNav}>
            <button className={styles.btnSecondary} onClick={() => navigate('/diagnostic-results')}>
              &larr; Back to results
            </button>
            <button className={styles.btnPrimary} onClick={() => navigate('/dashboard')}>
              Go to my dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewAnswers;
