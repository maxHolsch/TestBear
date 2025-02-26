import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/ReadingWriting.css';
import StudyHelper from '../components/StudyHelper';

const SatWritingRhetoricalPage: React.FC = () => {
    // We hard-code 5 rhetorical skills questions
    const rhetoricalQuestions = [
        {
            question: "<div class='sat-passage'><strong>Passage:</strong><br/>Despite concerns from some environmental groups, the city council ultimately <u>sanctioned</u> the construction of the new bridge, citing economic benefits that would outweigh potential ecological impacts.</div><div class='sat-question'><strong>Question:</strong><br/>As used in the passage, \"sanctioned\" most nearly means:</div>",
            options: [
                "punished",
                "approved",
                "encouraged",
                "investigated",
            ],
            correctAnswer: "B",
            explanation: [
                "<strong>Vocabulary in Context Strategy:</strong>",
                "<div class='strategy-step'><span class='step-number'>1</span> <span class='step-instruction'><strong>Identify the word in context:</strong> \"The city council ultimately <strong>sanctioned</strong> the construction of the new bridge.\"</span></div>",
                "<div class='strategy-step'><span class='step-number'>2</span> <span class='step-instruction'><strong>Replace with your own word:</strong> Replace \"sanctioned\" with a simpler word that fits the context.</span></div>",
                "<div class='strategy-step'><span class='step-number'>3</span> <span class='step-instruction'><strong>Test your replacement:</strong> \"The city council ultimately <strong>[allowed/okayed]</strong> the construction of the new bridge.\"</span></div>",
                "<div class='strategy-step'><span class='step-number'>4</span> <span class='step-instruction'><strong>Evaluate answer choices:</strong> Which answer choice is closest to your replacement?</span></div>",
                "<div class='strategy-step'><span class='step-number'>5</span> <span class='step-instruction'><strong>Confirm with context clues:</strong> The phrase \"citing economic benefits\" suggests the council made a positive decision about the bridge, supporting the meaning of \"approved.\"</span></div>",
                "<div class='answer-conclusion'><strong>Correct Answer:</strong> B) approved</div>"
            ]
        },
        {
            question: "<div class='sat-passage'><strong>Passage:</strong><br/>Alexander Fleming's discovery of penicillin in 1928 was largely accidental. After returning from vacation, he noticed that a mold had contaminated one of his petri dishes containing Staphylococcus bacteria. Fleming observed that the bacteria were not growing in the areas where the mold was present. Intrigued by this phenomenon, he isolated the mold and identified it as Penicillium notatum. Although Fleming published his findings, he struggled to isolate the active ingredient in sufficient quantities. It wasn't until a decade later that Howard Florey and Ernst Chain developed methods to purify penicillin for clinical use.</div><div class='sat-question'><strong>Question:</strong><br/>According to the passage, why wasn't penicillin used as a medical treatment immediately after Fleming's discovery?</div>",
            options: [
                "Fleming couldn't produce enough of the active compound",
                "The mold was too toxic for medical applications",
                "Fleming didn't recognize its potential medical benefits",
                "The scientific community rejected his research",
            ],
            correctAnswer: "A",
            explanation: [
                "<strong>Command of Evidence Strategy:</strong>",
                "<div class='strategy-step'><span class='step-number'>1</span> <span class='step-instruction'><strong>Identify the question type:</strong> This is a direct information retrieval question about why penicillin wasn't immediately used in medicine.</span></div>",
                "<div class='strategy-step'><span class='step-number'>2</span> <span class='step-instruction'><strong>Locate relevant information:</strong> The passage states \"<em>Although Fleming published his findings, he struggled to isolate the active ingredient in sufficient quantities.</em>\"</span></div>",
                "<div class='strategy-step'><span class='step-number'>3</span> <span class='step-instruction'><strong>Connect to answer choices:</strong> This directly supports option A - Fleming couldn't produce enough of the active compound.</span></div>",
                "<div class='strategy-step'><span class='step-number'>4</span> <span class='step-instruction'><strong>Verify with the passage:</strong> The passage continues \"<em>It wasn't until a decade later that Howard Florey and Ernst Chain developed methods to purify penicillin for clinical use.</em>\" This further confirms that the inability to produce sufficient quantities was the limiting factor.</span></div>",
                "<div class='strategy-step'><span class='step-number'>5</span> <span class='step-instruction'><strong>Eliminate other options:</strong> The passage doesn't mention toxicity issues (B), Fleming clearly recognized its potential (C), or rejection by the scientific community (D).</span></div>",
                "<div class='answer-conclusion'><strong>Correct Answer:</strong> A) Fleming couldn't produce enough of the active compound</div>"
            ]
        },
        {
            question: "<div class='sat-passage'><strong>Passage:</strong><br/>The transition to renewable energy has become increasingly urgent. As global temperatures continue to rise at unprecedented rates. Many countries have committed to aggressive emission reduction targets by 2030, these goals will require massive infrastructure investments and policy changes.</div><div class='sat-question'><strong>Question:</strong><br/>Which change should be made to correct a sentence boundary error in the passage?</div>",
            options: [
                "Insert a semicolon after \"urgent\"",
                "Change the period after \"rates\" to a comma",
                "Insert a period after \"2030\"",
                "Add a comma after \"countries\"",
            ],
            correctAnswer: "B",
            explanation: [
                "<strong>Sentence Boundaries Strategy:</strong>",
                "<div class='strategy-step'><span class='step-number'>1</span> <span class='step-instruction'><strong>Identify potential errors:</strong> Read each sentence and check if it's complete (has both subject and predicate) and properly punctuated.</span></div>",
                "<div class='strategy-step'><span class='step-number'>2</span> <span class='step-instruction'><strong>Analyze the second sentence:</strong> \"<em>As global temperatures continue to rise at unprecedented rates.</em>\" This is a dependent clause starting with \"As\" - it cannot stand alone as a complete sentence.</span></div>",
                "<div class='strategy-step'><span class='step-number'>3</span> <span class='step-instruction'><strong>Apply grammar rules:</strong> A dependent clause should be connected to an independent clause. The period after \"rates\" incorrectly separates this dependent clause.</span></div>",
                "<div class='strategy-step'><span class='step-number'>4</span> <span class='step-instruction'><strong>Consider the context:</strong> This dependent clause logically explains <em>why</em> the transition to renewable energy is urgent, so it should be connected to the first sentence.</span></div>",
                "<div class='strategy-step'><span class='step-number'>5</span> <span class='step-instruction'><strong>Check other options:</strong> The other proposed changes don't address the core issue of a dependent clause incorrectly punctuated as a complete sentence.</span></div>",
                "<div class='answer-conclusion'><strong>Correct Answer:</strong> B) Change the period after \"rates\" to a comma</div>"
            ]
        },
        {
            question: "<div class='sat-passage'><strong>Passage:</strong><br/>Digital literacy has become essential for success in today's workforce, with many employers requiring basic programming knowledge even for non-technical positions. ________, studies show that nearly 40% of adults lack the digital skills needed for modern employment opportunities.</div><div class='sat-question'><strong>Question:</strong><br/>Which transition word best fills the blank in the passage?</div>",
            options: [
                "Furthermore",
                "Therefore",
                "Nevertheless",
                "Similarly",
            ],
            correctAnswer: "C",
            explanation: [
                "<strong>Transitions Strategy:</strong>",
                "<div class='strategy-step'><span class='step-number'>1</span> <span class='step-instruction'><strong>Identify the relationship:</strong> Examine how the two sentences relate to each other logically.</span></div>",
                "<div class='strategy-step'><span class='step-number'>2</span> <span class='step-instruction'><strong>Analyze the first sentence:</strong> It establishes that digital literacy is essential and required by employers.</span></div>",
                "<div class='strategy-step'><span class='step-number'>3</span> <span class='step-instruction'><strong>Analyze the second sentence:</strong> It states that many adults lack these skills.</span></div>",
                "<div class='strategy-step'><span class='step-number'>4</span> <span class='step-instruction'><strong>Determine the logical connection:</strong> There's a contrast or unexpected result here - despite the importance of these skills, many adults don't have them.</span></div>",
                "<div class='strategy-step'><span class='step-number'>5</span> <span class='step-instruction'><strong>Match with transition types:</strong> This contrast relationship calls for a transition word that signals an unexpected or contrasting idea.</span></div>",
                "<div class='strategy-step'><span class='step-number'>6</span> <span class='step-instruction'><strong>Evaluate each option:</strong><br>- \"Furthermore\" adds related information<br>- \"Therefore\" indicates a conclusion<br>- \"Nevertheless\" signals contrast or unexpected result<br>- \"Similarly\" indicates comparison</span></div>",
                "<div class='answer-conclusion'><strong>Correct Answer:</strong> C) Nevertheless</div>"
            ]
        },
        {
            question: "<div class='sat-passage'><strong>Passage:</strong><br/>Urban community gardens provide more than just aesthetic value to city neighborhoods. These green spaces offer residents access to fresh produce in areas often designated as \"food deserts.\" Additionally, community gardens create social hubs where diverse residents connect across cultural and generational divides. Research also indicates that participation in community gardening correlates with reduced stress levels and improved mental health outcomes among regular participants.</div><div class='sat-question'><strong>Question:</strong><br/>What is the primary purpose of the author's discussion of multiple benefits of community gardens?</div>",
            options: [
                "To argue that city funding should prioritize gardens over other public spaces",
                "To demonstrate that community gardens address several interconnected urban challenges",
                "To convince readers to participate in local gardening initiatives",
                "To compare the relative importance of nutritional versus social benefits",
            ],
            correctAnswer: "B",
            explanation: [
                "<strong>Rhetorical Synthesis Strategy:</strong>",
                "<div class='strategy-step'><span class='step-number'>1</span> <span class='step-instruction'><strong>Identify the rhetorical question type:</strong> This question asks about the author's purpose in presenting multiple benefits - a rhetorical strategy question.</span></div>",
                "<div class='strategy-step'><span class='step-number'>2</span> <span class='step-instruction'><strong>Review the passage structure:</strong> The author presents multiple distinct benefits in sequence: food access in \"food deserts,\" social connections across diversity, and mental health benefits.</span></div>",
                "<div class='strategy-step'><span class='step-number'>3</span> <span class='step-instruction'><strong>Consider the tone and focus:</strong> The author presents factual information about different benefits without explicitly arguing for funding or calling for participation.</span></div>",
                "<div class='strategy-step'><span class='step-number'>4</span> <span class='step-instruction'><strong>Evaluate what connects these examples:</strong> All the benefits mentioned address different urban problems (food access, social isolation, mental health challenges).</span></div>",
                "<div class='strategy-step'><span class='step-number'>5</span> <span class='step-instruction'><strong>Match with answer choices:</strong> Option B best captures this pattern of showing how gardens solve multiple urban issues.</span></div>",
                "<div class='answer-conclusion'><strong>Correct Answer:</strong> B) To demonstrate that community gardens address several interconnected urban challenges</div>"
            ]
        }
    ];


    const navigate = useNavigate();
    // If you still want to check user presence:
    const userFromCookie = Cookies.get('user');
    const user = userFromCookie ? JSON.parse(userFromCookie) : null;

    // Page states
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showStrategyGuide, setShowStrategyGuide] = useState(false);

    const hasSetQuestions = useRef(false);

    // Add rhetorical skills strategies overview
    const rhetoricalSkillsStrategies = [
        {
            name: "Vocabulary in Context",
            description: "Words often have multiple meanings. Don't rely on the most common definition - instead, replace the word with each answer choice and see which one maintains the author's intended meaning.",
            steps: [
                "Identify the word in context",
                "Replace with your own simple word",
                "Test each answer choice in the sentence",
                "Eliminate choices that change the sentence's meaning"
            ],
            timesSaved: "1-2 minutes per question by avoiding dictionary-style memorization"
        },
        {
            name: "Sentence Boundaries",
            description: "The SAT consistently tests the same sentence structure rules. Learn to quickly identify fragments, run-ons, and comma splices without laborious grammar analysis.",
            steps: [
                "Check if each sentence has a subject and verb",
                "Watch for dependent clauses masquerading as complete sentences",
                "Identify coordinating conjunctions without commas (run-ons)",
                "Look for comma splices (two independent clauses joined only by a comma)"
            ],
            timesSaved: "30-45 seconds per question by recognizing patterns instead of analyzing each word"
        },
        {
            name: "Transitions",
            description: "Don't read the entire passage to determine relationships between ideas. Instead, focus only on the sentences immediately before and after the transition.",
            steps: [
                "Identify the relationship between adjacent sentences (contrast, cause/effect, example, etc.)",
                "Match this relationship to the transition word type",
                "Eliminate options that create logical inconsistencies"
            ],
            timesSaved: "1 minute per question by analyzing only what matters"
        },
        // Add more strategies as needed
    ];

    useEffect(() => {
        // If you want to restrict access if user not logged in:
        if (!user) {
            navigate('/');
            return;
        }

        // Simulate a small 'loading' effect (optional)
        if (!hasSetQuestions.current) {
            setTimeout(() => {
                setQuestions(rhetoricalQuestions);
                setLoading(false);
                hasSetQuestions.current = true;
            }, 800);
        }
    }, [navigate, user]);

    // Animation for strategy cards
    useEffect(() => {
        const animateCards = () => {
            const cards = document.querySelectorAll('.strategy-card');
            cards.forEach((card, index) => {
                // Animate cards with a staggered delay
                setTimeout(() => {
                    card.classList.add('animate');
                }, 100 * index);
            });
        };

        // Only run animation when strategy guide is shown
        if (showStrategyGuide) {
            setTimeout(animateCards, 100);
        }
    }, [showStrategyGuide]);

    // Add a scroll effect to the strategy steps on hover
    const handleStepHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const steps = e.currentTarget.querySelectorAll('li');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('highlight-step');
            }, 100 * index);
        });
    };

    // Reset the effect when mouse leaves
    const handleStepLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const steps = e.currentTarget.querySelectorAll('li');
        steps.forEach(step => step.classList.remove('highlight-step'));
    };

    // Handle user selection
    const handleChange = (questionIndex: number, letter: string) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionIndex]: letter,
        }));
    };

    // Handle submission
    const handleSubmit = () => {
        setSubmitted((prevSubmitted) => ({
            ...prevSubmitted,
            [currentQuestionIndex]: true,
        }));
    };

    // Navigate forward/back
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text rainbow">
                    Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                </div>
                <div className="slogans">
                    <p id="slogan">Generating your questions...</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(submitted).length;
    const progress = (answeredQuestions / totalQuestions) * 100;

    return (
        <div className="reading-writing-page">
            {showWelcomeMessage && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h3 className="welcome-title">Master SAT Writing with Strategic Shortcuts</h3>
                        <p>Elite SAT prep isn't about endless practice - it's about learning the <strong>right strategies</strong> that make questions predictable and easy to solve.</p>
                        <p>In this module, you'll learn powerful heuristics for rhetorical skills questions that will:</p>
                        <ul className="benefits-list">
                            <li><strong>Save time</strong> - Solve questions in half the time</li>
                            <li><strong>Increase accuracy</strong> - Know exactly what to look for</li>
                            <li><strong>Reduce stress</strong> - Recognize patterns instead of overthinking</li>
                        </ul>
                        <div className="button-group">
                            <button
                                className="strategy-button"
                                onClick={() => setShowStrategyGuide(true)}
                            >
                                VIEW STRATEGY GUIDE FIRST
                            </button>
                            <button
                                className="continue-button rainbow-button"
                                onClick={() => setShowWelcomeMessage(false)}
                            >
                                START PRACTICE
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {showStrategyGuide && (
                <div className="overlay">
                    <div className="overlay-content strategy-guide">
                        <h3 className="strategy-title">SAT Writing Rhetorical Skills - Strategy Guide</h3>
                        <p className="strategy-intro">Top SAT scorers don't just practice more - they use these time-saving shortcuts:</p>
                        
                        <div className="strategies-container">
                            {rhetoricalSkillsStrategies.map((strategy, index) => (
                                <div key={index} className="strategy-card">
                                    <h4 className="strategy-name">{strategy.name}</h4>
                                    <p className="strategy-description">{strategy.description}</p>
                                    <div className="strategy-steps">
                                        <h5>Quick Steps:</h5>
                                        <ol>
                                            {strategy.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>
                                    <div className="time-saved">
                                        <span className="time-icon">⏱️</span> 
                                        <span className="time-text">{strategy.timesSaved}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="strategy-footer">
                            <p className="strategy-tip">
                                <strong>Pro Tip:</strong> During the actual SAT, quickly identify the question type, then apply the matching strategy.
                            </p>
                            <button
                                className="continue-button rainbow-button"
                                onClick={() => {
                                    setShowStrategyGuide(false);
                                    setShowWelcomeMessage(false);
                                }}
                            >
                                START PRACTICING WITH THESE STRATEGIES
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header>
                <div className="logo header-logo rainbow-text">testbear</div>
                <h2>SAT Writing &mdash; Rhetorical Skills</h2>
                <button 
                    className="strategy-reference-button"
                    onClick={() => setShowStrategyGuide(true)}
                >
                    View Strategy Guide
                </button>
            </header>

            <div className="content">
                <div className="questions-section">
                    <h3 className="section-title rainbow">Questions:</h3>
                    <div className="progress-container">
                        <div className="progress-info">
                            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                            <span>{ ". " + Math.round(progress)}<span className="percentage-spacer">&nbsp;</span>% Complete</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    {/* Question block */}
                    <div
                        className={`question-block ${
                            submitted[currentQuestionIndex]
                                ? userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                                    ? 'correct'
                                    : 'incorrect'
                                : ''
                        }`}
                    >
                        <div 
                            className="question-text" 
                            dangerouslySetInnerHTML={{ __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}` }}
                        ></div>
                        <ul className="options-list">
                            {currentQuestion.options.map((option: string, i: number) => {
                                const letter = String.fromCharCode(65 + i);
                                const isCorrectChoice = (letter === currentQuestion.correctAnswer);
                                const userChoice = userAnswers[currentQuestionIndex];

                                return (
                                    <li
                                        key={i}
                                        className={`option-item ${
                                            submitted[currentQuestionIndex] && isCorrectChoice
                                                ? 'correct-option'
                                                : ''
                                        } ${
                                            submitted[currentQuestionIndex] &&
                                            userChoice === letter &&
                                            !isCorrectChoice
                                                ? 'incorrect-option'
                                                : ''
                                        }`}
                                    >
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionIndex}`}
                                                value={letter}
                                                checked={userChoice === letter}
                                                disabled={submitted[currentQuestionIndex]}
                                                onChange={() => handleChange(currentQuestionIndex, letter)}
                                            />
                                            <span className="option-letter">{letter}</span> {option}
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Explanation (shown if submitted) */}
                        {submitted[currentQuestionIndex] && (
                            <div className="answer-details">
                                <h4 className="explanation-title">
                                    <span className="strategy-icon">🔑</span> 
                                    Strategy Shortcut: {currentQuestion.explanation[0].replace("<strong>", "").replace("</strong>", "")}
                                </h4>
                                <div className="explanation-content">
                                    <div className="strategy-summary">
                                        <p>This question type appears frequently on the SAT. Master this pattern to save time!</p>
                                    </div>
                                    {currentQuestion.explanation.slice(1).map((line: string, index: number) => (
                                        <div 
                                            key={index} 
                                            dangerouslySetInnerHTML={{ __html: line }}
                                            className="explanation-line"
                                        ></div>
                                    ))}
                                    <div className="strategy-reminder">
                                        <p><strong>Remember:</strong> Don't solve each question from scratch. Recognize the pattern, apply the strategy, and move on!</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nav Buttons */}
                    <div className="navigation-buttons">
                        {currentQuestionIndex > 0 && (
                            <button
                                className="navigation-button previous-button"
                                onClick={handlePrevious}
                            >
                                <span className="button-icon">←</span> Previous
                            </button>
                        )}
                        {!submitted[currentQuestionIndex] && userAnswers[currentQuestionIndex] ? (
                            <button
                                className="navigation-button submit-button rainbow-button"
                                onClick={handleSubmit}
                            >
                                Submit Answer
                            </button>
                        ) : submitted[currentQuestionIndex] && currentQuestionIndex < questions.length - 1 && (
                            <button
                                className="navigation-button next-button rainbow-button"
                                onClick={handleNext}
                            >
                                Next Question <span className="button-icon">→</span>
                            </button>
                        )}

                        {/* If last question is submitted, show final options */}
                        {submitted[currentQuestionIndex] && currentQuestionIndex === questions.length - 1 && (
                            <div className="final-buttons">
                                <button className="rainbow-button dashboard-button" onClick={() => navigate('/dashboard')}>
                                    Return to Dashboard
                                </button>
                                <button className="rainbow-button retry-button" onClick={() => window.location.reload()}>
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <StudyHelper 
                currentQuestion={currentQuestion} 
                questionIndex={currentQuestionIndex} 
            />
        </div>
    );
};

export default SatWritingRhetoricalPage; 