import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Mock login for demo purposes
      // In a real app, this would call an API
      setTimeout(() => {
        login({
          id: '1',
          name: 'Demo User',
          email
        });
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="logo-container">
          <h1 className="logo rainbow-text">testbear</h1>
          <p className="tagline">Your AI-powered study companion</p>
        </div>
        
        <div className="auth-card">
          <h2>Log in to TestBear</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="rainbow-button login-button" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
        
        {/* Demo credentials for easy login */}
        <div className="demo-credentials">
          <p>
            <strong>Demo Credentials:</strong> Use any email and password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 