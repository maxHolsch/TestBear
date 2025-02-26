import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo header-logo rainbow-text" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>testbear</div>
            <nav className="main-nav">
              <ul>
                <li><Link to="/dashboard" className="active">Dashboard</Link></li>
                <li><Link to="/profile">My Progress</Link></li>
                <li><Link to="/premium">Pricing</Link></li>
              </ul>
            </nav>
            <div className="user-section">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-outlined logout-button">Log Out</button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <div className="container">
          <section className="welcome-section">
            <h1>Welcome back, <span className="user-name-heading">{user.name}</span></h1>
            <p className="subtitle">Continue your test prep journey</p>
          </section>
          
          <section className="strategy-approach-section">
            <div className="strategy-banner">
              <div className="strategy-content">
                <h2 className="section-title">Study Smarter, Not Harder</h2>
                <p className="strategy-description">
                  Elite test prep isn't about endless practice. It's about learning the <strong>strategic shortcuts</strong> that make questions predictable and easy to solve.
                </p>
                <div className="strategy-features">
                  <div className="strategy-feature">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-text">Learn powerful heuristics used by top scorers</div>
                  </div>
                  <div className="strategy-feature">
                    <div className="feature-icon">🧠</div>
                    <div className="feature-text">Recognize patterns instead of solving from scratch</div>
                  </div>
                  <div className="strategy-feature">
                    <div className="feature-icon">🔍</div>
                    <div className="feature-text">Focus on strategy over memorization</div>
                  </div>
                </div>
              </div>
              <div className="strategy-action">
                <button 
                  className="rainbow-button strategy-cta-button"
                  onClick={() => alert("Strategy guides are under construction and coming soon! Check back later for our comprehensive approach to SAT heuristics.")}
                >
                  Explore Our Strategy Approach
                </button>
              </div>
            </div>
          </section>
          
          <section className="practice-section">
            <h2 className="section-title">Practice Exams</h2>
            <div className="exam-categories">
              <div className="category-card">
                <h3>SAT</h3>
                <div className="practice-modules">
                  <div className="practice-module-card">
                    <h4>Reading & Writing</h4>
                    <div className="module-sections">
                      <Link to="/practice/sat/writing/rhetorical" className="module-section">
                        <span className="section-name">Writing - Rhetorical Skills</span>
                        <span className="section-progress">5 Questions</span>
                      </Link>
                      <div className="module-section disabled">
                        <span className="section-name">Reading Comprehension</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                      <div className="module-section disabled">
                        <span className="section-name">Vocabulary in Context</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="practice-module-card">
                    <h4>Math</h4>
                    <div className="module-sections">
                      <div className="module-section disabled">
                        <span className="section-name">Algebra</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                      <div className="module-section disabled">
                        <span className="section-name">Problem Solving</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                      <div className="module-section disabled">
                        <span className="section-name">Data Analysis</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="practice-module-card upload-card">
                    <h4>Upload Your Questions</h4>
                    <div className="module-sections">
                      <div className="module-section disabled">
                        <div className="upload-section-content">
                          <div className="feature-icon camera-icon">📷</div>
                          <span className="section-name">Upload Test Questions</span>
                          <span className="section-progress">Coming Soon</span>
                        </div>
                        <p className="upload-description">Snap a photo of your test questions for instant practice and analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="category-card">
                <h3>ACT</h3>
                <div className="practice-modules">
                  <div className="practice-module-card">
                    <h4>English & Reading</h4>
                    <div className="module-sections">
                      <div className="module-section disabled">
                        <span className="section-name">Grammar & Usage</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                      <div className="module-section disabled">
                        <span className="section-name">Reading Comprehension</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="practice-module-card">
                    <h4>Science & Math</h4>
                    <div className="module-sections">
                      <div className="module-section disabled">
                        <span className="section-name">Data Interpretation</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                      <div className="module-section disabled">
                        <span className="section-name">Scientific Analysis</span>
                        <span className="section-progress">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="practice-module-card upload-card">
                    <h4>Upload Your Questions</h4>
                    <div className="module-sections">
                      <div className="module-section disabled">
                        <div className="upload-section-content">
                          <div className="feature-icon camera-icon">📷</div>
                          <span className="section-name">Upload Test Questions</span>
                          <span className="section-progress">Coming Soon</span>
                        </div>
                        <p className="upload-description">Snap a photo of your test questions for instant practice and analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="premium-cta-section">
            <div className="premium-cta-card">
              <div className="premium-cta-content">
                <h3>Unlock All Practice Tests</h3>
                <p>Get unlimited access to all practice tests and personalized AI feedback with TestBear. Try free for 7 days!</p>
                <Link to="/premium" className="rainbow-button premium-cta-button">View Pricing</Link>
              </div>
              <div className="premium-cta-image">
                {/* We'll add an image later */}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 