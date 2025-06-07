import { createContext, useContext, useEffect, useState } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem('email', email);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('email');
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
