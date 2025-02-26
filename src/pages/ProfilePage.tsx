import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock performance data
const mockPerformanceData = [
  { subject: 'Reading', score: 85, average: 72 },
  { subject: 'Writing', score: 92, average: 68 },
  { subject: 'Grammar', score: 78, average: 70 },
  { subject: 'Vocabulary', score: 88, average: 75 },
  { subject: 'Algebra', score: 65, average: 62 },
  { subject: 'Data Analysis', score: 70, average: 65 },
];

// Mock progress data
const mockProgressData = [
  { week: 'Week 1', score: 72 },
  { week: 'Week 2', score: 76 },
  { week: 'Week 3', score: 80 },
  { week: 'Week 4', score: 78 },
  { week: 'Week 5', score: 85 },
  { week: 'Week 6', score: 82 },
  { week: 'Week 7', score: 88 },
  { week: 'Week 8', score: 92 },
];

// Mock recent activities
const mockRecentActivities = [
  { id: 1, activity: 'Completed SAT Writing - Rhetorical Skills', date: '2 hours ago', score: '4/5' },
  { id: 2, activity: 'Completed SAT Reading - Comprehension', date: 'Yesterday', score: '7/10' },
  { id: 3, activity: 'Completed ACT Math - Algebra', date: '3 days ago', score: '8/10' },
  { id: 4, activity: 'Completed SAT Writing - Grammar', date: '1 week ago', score: '9/10' },
];

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'settings'>('overview');
  
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
    <div className="profile-page">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo header-logo rainbow-text" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>testbear</div>
            <nav className="main-nav">
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile" className="active">My Progress</Link></li>
                <li><Link to="/premium">Premium</Link></li>
              </ul>
            </nav>
            <div className="user-section">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-outlined logout-button">Log Out</button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="profile-main">
        <div className="container">
          <section className="profile-header-section">
            <h1>My Progress</h1>
            <div className="profile-tabs">
              <button 
                className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`profile-tab ${activeTab === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveTab('performance')}
              >
                Performance
              </button>
              <button 
                className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
          </section>
          
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <h3>Tests Taken</h3>
                  <div className="stat-value">12</div>
                  <div className="stat-trend positive">↑ 4 from last month</div>
                </div>
                
                <div className="profile-stat-card">
                  <h3>Average Score</h3>
                  <div className="stat-value">82%</div>
                  <div className="stat-trend positive">↑ 7% from last month</div>
                </div>
                
                <div className="profile-stat-card">
                  <h3>Time Spent</h3>
                  <div className="stat-value">18h</div>
                  <div className="stat-trend positive">↑ 5h from last month</div>
                </div>
                
                <div className="profile-stat-card">
                  <h3>Questions Answered</h3>
                  <div className="stat-value">245</div>
                  <div className="stat-trend positive">↑ 78 from last month</div>
                </div>
              </div>
              
              <div className="progress-chart-section">
                <h3>Progress Over Time</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={mockProgressData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#4a4fe0" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="recent-activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {mockRecentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-content">
                        <div className="activity-title">{activity.activity}</div>
                        <div className="activity-date">{activity.date}</div>
                      </div>
                      <div className="activity-score">{activity.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div className="profile-performance">
              <div className="performance-chart-section">
                <h3>Subject Performance</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={mockPerformanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#4a4fe0" name="Your Score" />
                      <Bar dataKey="average" fill="#8f8fb4" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="performance-details">
                <h3>Strengths</h3>
                <ul className="strengths-list">
                  <li>Writing (92%) - You excel in rhetorical skills and sentence structure.</li>
                  <li>Vocabulary (88%) - Your command of vocabulary in context is strong.</li>
                  <li>Reading (85%) - You demonstrate good comprehension abilities.</li>
                </ul>
                
                <h3>Areas for Improvement</h3>
                <ul className="improvement-list">
                  <li>Algebra (65%) - Consider focusing on quadratic equations and factoring.</li>
                  <li>Data Analysis (70%) - Practice interpreting graphs and statistical concepts.</li>
                  <li>Grammar (78%) - Review subject-verb agreement and punctuation rules.</li>
                </ul>
                
                <h3>Recommended Practice</h3>
                <div className="recommendation-buttons">
                  <Link to="/practice/sat/math/algebra" className="btn-outlined recommendation-button">Algebra Practice</Link>
                  <Link to="/practice/sat/math/data" className="btn-outlined recommendation-button">Data Analysis</Link>
                  <Link to="/practice/sat/writing/grammar" className="btn-outlined recommendation-button">Grammar Review</Link>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="profile-settings">
              <div className="settings-card">
                <h3>Account Information</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" disabled value={user.name} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" disabled value={user.email} />
                </div>
                <button className="btn-primary" disabled>Update Information</button>
                <p className="settings-note">Account information cannot be changed in the demo version.</p>
              </div>
              
              <div className="settings-card">
                <h3>Notification Preferences</h3>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" checked disabled />
                    Email notifications for new practice tests
                  </label>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" checked disabled />
                    Weekly progress report
                  </label>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" checked disabled />
                    Study reminders
                  </label>
                </div>
                <button className="btn-primary" disabled>Save Preferences</button>
                <p className="settings-note">Notification preferences cannot be changed in the demo version.</p>
              </div>
              
              <div className="settings-card danger-zone">
                <h3>Danger Zone</h3>
                <button className="btn-outlined danger-button" disabled>Delete Account</button>
                <p className="settings-note">Account deletion is not available in the demo version.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 