import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the Auth context shape
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true
});

// Hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for user on initial load
  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      try {
        setUser(JSON.parse(userFromCookie));
      } catch (error) {
        console.error('Failed to parse user from cookie', error);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Expire in 7 days
  };

  // Logout function
  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 