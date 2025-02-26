import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PremiumPage: React.FC = () => {
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
  
  // Handle pricing subscription (mock for this demo)
  const handleSubscribe = () => {
    alert('This is a demo version. Subscription is coming soon!');
  };
  
  return (
    <div className="pricing-page">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo header-logo rainbow-text" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>testbear</div>
            <nav className="main-nav">
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">My Progress</Link></li>
                <li><Link to="/premium" className="active">Pricing</Link></li>
              </ul>
            </nav>
            <div className="user-section">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-outlined logout-button">Log Out</button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="pricing-main">
        <div className="container">
          <section className="pricing-header-section">
            <h1><span className="rainbow-text">Pricing</span></h1>
            <p className="pricing-tagline">Unlock your full potential with our advanced features</p>
          </section>
          
          <section className="pricing-features">
            <div className="feature-grid" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>AI-Powered Feedback</h3>
                <p>Receive detailed, personalized feedback on your performance and where to improve.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Advanced Analytics</h3>
                <p>Track your progress over time with detailed performance metrics and insights.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Personalized Study Plans</h3>
                <p>Get custom study plans tailored to your strengths, weaknesses, and goals.</p>
              </div>
            </div>
          </section>
          
          <section className="pricing-section">
            <h2>Choose Your Plan</h2>
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>Monthly</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">5</span>
                    <span className="period">/month</span>
                  </div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>All features</li>
                    <li>Cancel anytime</li>
                    <li>30-day money-back guarantee</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button" onClick={handleSubscribe}>
                  Subscribe Monthly
                </button>
              </div>
              
              <div className="pricing-card popular">
                <div className="popular-badge">Most Popular</div>
                <div className="pricing-header">
                  <h3>Annual</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">25</span>
                    <span className="period">/year</span>
                  </div>
                  <div className="savings">Save $35 per year</div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>All features</li>
                    <li>Priority support</li>
                    <li>30-day money-back guarantee</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button" onClick={handleSubscribe}>
                  Subscribe Annually
                </button>
              </div>
              
              <div className="pricing-card education">
                <div className="education-badge">For Education</div>
                <div className="pricing-header">
                  <h3>High School Plan</h3>
                  <div className="price education-price">
                    <span className="custom-pricing">Custom Pricing</span>
                  </div>
                  <div className="savings">Volume discounts available</div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>School-wide access for all students</li>
                    <li>Teacher dashboards and analytics</li>
                    <li>Custom curriculum integration</li>
                    <li>Dedicated school success manager</li>
                    <li>Professional development for staff</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button contact-button" onClick={() => alert('Our education team will be in touch soon!')}>
                  Contact Our Education Team
                </button>
              </div>
            </div>
          </section>
          
          <section className="scholarship-section">
            <div className="scholarship-container">
              <div className="scholarship-content">
                <p className="scholarship-text">
                  We stand behind our commitment to making SAT tutoring available to all. 
                  <span 
                    className="scholarship-link"
                    onClick={() => alert('Scholarship program under development')}
                    style={{ 
                      cursor: 'pointer', 
                      color: '#6b5de3', 
                      textDecoration: 'underline',
                      marginLeft: '5px',
                      fontWeight: 'bold'
                    }}
                  >
                    Please click here to explore our scholarship options
                  </span>
                </p>
              </div>
            </div>
          </section>
          
          <section className="pricing-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>When will the 7-day trial be available?</h3>
                <p>TestBear is currently in development and will be launching soon. Join our waitlist to be the first to know!</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I cancel my subscription?</h3>
                <p>Yes, you can cancel your subscription at any time from your account settings. Your features will remain active until the end of your billing period.</p>
              </div>
              
              <div className="faq-item">
                <h3>Do you offer discounts for students?</h3>
                <p>Yes! We offer special discounts for students with a valid .edu email address. Contact our support team for more information.</p>
              </div>
            </div>
          </section>
          
          <section className="pricing-cta">
            <div className="cta-content">
              <h2>Coming Soon!</h2>
              <p>TestBear is currently under development.</p>
              <p>Join our waitlist to be notified when we launch.</p>
              <div className="waitlist-form">
                <input type="email" placeholder="Enter your email" />
                <button className="rainbow-button">Join Waitlist</button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="pricing-footer">
        <div className="container">
          <p>&copy; 2023 TestBear.ai - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPage; 