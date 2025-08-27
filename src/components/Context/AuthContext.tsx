import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const API_URL = import.meta.env.VITE_API_URL as string;

/** Always use one axios instance with credentials for auth flows */
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export type SessionUser = {
  id?: string;
  username?: string;
  role?: 'admin' | 'user' | string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAuth: boolean) => void;
  username: string;
  loading: boolean;
  logout: () => Promise<void>;
  /** Returns the server user or undefined if not logged in */
  fetchSession: () => Promise<SessionUser | undefined>;
  /** Returns true if login request succeeded (cookie set on server) */
  login: (formData: { username: string; password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { clearCart } = useCart();

  const fetchSession = useCallback(async (): Promise<SessionUser | undefined> => {
    try {
      setLoading(true);
      const res = await api.get('/me');
      const user: SessionUser | undefined = res.data?.user;

      if (res.status === 200 && user) {
        setIsAuthenticated(true);
        setUsername(user.username ?? '');
        setIsAdmin((user.role ?? '') === 'admin'); 
        if (user.username) localStorage.setItem('username', user.username);
        return user;
      }

      setIsAuthenticated(false);
      setUsername('');
      setIsAdmin(false);
      localStorage.removeItem('username');
      return undefined;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setIsAuthenticated(false);
        setUsername('');
        setIsAdmin(false);
        localStorage.removeItem('username');
        await clearCart();
        return undefined;
      }
      console.error('fetchSession error:', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [clearCart]);

  const login = async (formData: { username: string; password: string }): Promise<boolean> => {
    try {

      const res = await api.post('/login', {
        username: formData.username,
        password: formData.password,
      },);
      return res.status === 200;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.get('/logout');
    } catch (error) {
      console.error('Logout failed (proceeding to clear state):', error);
    } finally {
      setIsAuthenticated(false);
      setUsername('');
      setIsAdmin(false);
      localStorage.removeItem('username');
      await clearCart();
    }
  };

  useEffect(() => {
    void fetchSession();
  }, [fetchSession]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        username,
        isAdmin,
        setIsAdmin,
        loading,
        logout,
        fetchSession,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
