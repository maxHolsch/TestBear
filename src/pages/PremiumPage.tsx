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
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <section className="pricing-header-section" style={{ textAlign: 'center', margin: '60px 0 40px' }}>
            <h1><span className="rainbow-text">Pricing</span></h1>
            <p className="pricing-tagline" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '20px auto' }}>
              Unlock your full potential with our advanced features
            </p>
          </section>
          
          <section className="pricing-features" style={{ margin: '0 0 60px' }}>
            <div className="feature-grid" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              gap: '30px',
              flexWrap: 'wrap' 
            }}>
              <div className="feature-card" style={{ 
                flex: '1 1 300px', 
                padding: '30px 25px', 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                background: '#fff',
                textAlign: 'center'
              }}>
                <div className="feature-icon" style={{ fontSize: '40px', marginBottom: '15px' }}>🤖</div>
                <h3 style={{ margin: '0 0 15px', fontSize: '1.4rem' }}>AI-Powered Feedback</h3>
                <p style={{ lineHeight: '1.6', color: '#555' }}>Receive detailed, personalized feedback on your performance and where to improve.</p>
              </div>
              
              <div className="feature-card" style={{ 
                flex: '1 1 300px', 
                padding: '30px 25px', 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                background: '#fff',
                textAlign: 'center'
              }}>
                <div className="feature-icon" style={{ fontSize: '40px', marginBottom: '15px' }}>📊</div>
                <h3 style={{ margin: '0 0 15px', fontSize: '1.4rem' }}>Advanced Analytics</h3>
                <p style={{ lineHeight: '1.6', color: '#555' }}>Track your progress over time with detailed performance metrics and insights.</p>
              </div>
              
              <div className="feature-card" style={{ 
                flex: '1 1 300px', 
                padding: '30px 25px', 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                background: '#fff',
                textAlign: 'center'
              }}>
                <div className="feature-icon" style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
                <h3 style={{ margin: '0 0 15px', fontSize: '1.4rem' }}>Personalized Study Plans</h3>
                <p style={{ lineHeight: '1.6', color: '#555' }}>Get custom study plans tailored to your strengths, weaknesses, and goals.</p>
              </div>
            </div>
          </section>
          
          <section className="pricing-section" style={{ margin: '60px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Choose Your Plan</h2>
            <div className="pricing-grid" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '30px',
              flexWrap: 'wrap'
            }}>
              <div className="pricing-card" style={{ 
                flex: '1 1 300px',
                maxWidth: '350px',
                padding: '35px 25px',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                background: '#fff',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="pricing-header" style={{ marginBottom: '25px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Monthly</h3>
                  <div className="price" style={{ marginBottom: '10px' }}>
                    <span className="currency" style={{ fontSize: '1.2rem', verticalAlign: 'top' }}>$</span>
                    <span className="amount" style={{ fontSize: '3rem', fontWeight: 'bold' }}>5</span>
                    <span className="period" style={{ fontSize: '1rem', color: '#666' }}>/month</span>
                  </div>
                </div>
                <div className="pricing-features" style={{ marginBottom: '30px', flexGrow: 1 }}>
                  <ul style={{ 
                    listStyleType: 'none', 
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>All features</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>Cancel anytime</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>30-day money-back guarantee</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button" onClick={handleSubscribe} style={{
                  padding: '12px 0',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  Subscribe Monthly
                </button>
              </div>
              
              <div className="pricing-card popular" style={{ 
                flex: '1 1 300px',
                maxWidth: '350px',
                padding: '35px 25px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(107, 93, 227, 0.15)',
                background: '#fff',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transform: 'translateY(-10px)',
                zIndex: 2,
                border: '2px solid #6b5de3'
              }}>
                <div className="popular-badge" style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: '#6b5de3',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>Most Popular</div>
                <div className="pricing-header" style={{ marginBottom: '25px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Annual</h3>
                  <div className="price" style={{ marginBottom: '10px' }}>
                    <span className="currency" style={{ fontSize: '1.2rem', verticalAlign: 'top' }}>$</span>
                    <span className="amount" style={{ fontSize: '3rem', fontWeight: 'bold' }}>25</span>
                    <span className="period" style={{ fontSize: '1rem', color: '#666' }}>/year</span>
                  </div>
                  <div className="savings" style={{ 
                    color: '#6b5de3', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>Save $35 per year</div>
                </div>
                <div className="pricing-features" style={{ marginBottom: '30px', flexGrow: 1 }}>
                  <ul style={{ 
                    listStyleType: 'none', 
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>All features</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>Priority support</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>30-day money-back guarantee</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button" onClick={handleSubscribe} style={{
                  padding: '12px 0',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  Subscribe Annually
                </button>
              </div>
              
              <div className="pricing-card education" style={{ 
                flex: '1 1 300px',
                maxWidth: '350px',
                padding: '35px 25px',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                background: '#fff',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="education-badge" style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '20px',
                  background: '#3498db',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>For Education</div>
                <div className="pricing-header" style={{ marginBottom: '25px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>High School Plan</h3>
                  <div className="price education-price" style={{ marginBottom: '10px' }}>
                    <span className="custom-pricing" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Custom Pricing</span>
                  </div>
                  <div className="savings" style={{ fontSize: '0.9rem', color: '#666' }}>Volume discounts available</div>
                </div>
                <div className="pricing-features" style={{ marginBottom: '30px', flexGrow: 1 }}>
                  <ul style={{ 
                    listStyleType: 'none', 
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>School-wide access for all students</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>Teacher dashboards and analytics</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>Custom curriculum integration</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>SAT school success insights</li>
                    <li style={{ margin: '12px 0', paddingLeft: '24px', position: 'relative' }}>Professional development webinars</li>
                  </ul>
                </div>
                <button className="rainbow-button pricing-button contact-button" onClick={() => alert('Our education team will be in touch soon!')} style={{
                  padding: '12px 0',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  background: '#3498db',
                  color: 'white'
                }}>
                  Contact Our Education Team
                </button>
              </div>
            </div>
          </section>
          
          <section className="scholarship-section" style={{ 
            margin: '60px auto',
            maxWidth: '800px',
            padding: '30px 40px',
            background: '#f8f9fa',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div className="scholarship-container">
              <div className="scholarship-content">
                <p className="scholarship-text" style={{ fontSize: '1.1rem', margin: 0 }}>
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
          
          <section className="pricing-faq" style={{ margin: '60px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Frequently Asked Questions</h2>
            <div className="faq-grid" style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div className="faq-item" style={{ 
                padding: '25px 30px',
                borderRadius: '10px',
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>When will the 7-day trial be available?</h3>
                <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>TestBear is currently in development and will be launching soon. Join our waitlist to be the first to know!</p>
              </div>
              
              <div className="faq-item" style={{ 
                padding: '25px 30px',
                borderRadius: '10px',
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>Can I cancel my subscription?</h3>
                <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>Yes, you can cancel your subscription at any time from your account settings. Your features will remain active until the end of your billing period.</p>
              </div>
              
              <div className="faq-item" style={{ 
                padding: '25px 30px',
                borderRadius: '10px',
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>Do you offer discounts/scholarships?</h3>
                <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>Yes! We offer special discounts for students who have a demonstrated need for financial assistance. Contact our support team for more information.</p>
              </div>
            </div>
          </section>
          
          <section className="pricing-cta" style={{ 
            margin: '80px auto 60px',
            textAlign: 'center',
            maxWidth: '700px',
            padding: '50px 30px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)',
            borderRadius: '15px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
          }}>
            <div className="cta-content">
              <h2 style={{ fontSize: '2.2rem', marginTop: 0, marginBottom: '20px' }}>Coming Soon!</h2>
              <p style={{ fontSize: '1.1rem', color: '#555', margin: '10px 0' }}>TestBear is currently under development.</p>
              <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>Join our waitlist to be notified when we launch.</p>
              <div className="waitlist-form" style={{ 
                display: 'flex',
                maxWidth: '500px',
                margin: '0 auto',
                gap: '10px'
              }}>
                <input type="email" placeholder="Enter your email" style={{
                  flex: '1',
                  padding: '12px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }} />
                <button className="rainbow-button" style={{
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}>Join Waitlist</button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="pricing-footer" style={{ 
        padding: '30px 0',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        borderTop: '1px solid #eee',
        marginTop: '60px'
      }}>
        <div className="container">
          <p style={{ margin: 0, color: '#888' }}>&copy; 2023 TestBear.ai - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPage; 