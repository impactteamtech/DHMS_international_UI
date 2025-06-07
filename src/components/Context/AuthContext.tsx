import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { userLogin } from '../AuthFolder/AuthFiles';

const API_URL = import.meta.env.VITE_API_URL;

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  email: string;
  loading: boolean;
  logout: () => void;
  login: (formData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true by default until we verify
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    } else {
      setIsAuthenticated(false);
      setEmail('');
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
      localStorage.removeItem('email');
      setIsAuthenticated(false);
      setEmail('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const login = async (formData: any): Promise<boolean> => {
    try {
      const res = await userLogin(formData);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setEmail(formData.email);
        localStorage.setItem('email', formData.email);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        email,
        loading,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
