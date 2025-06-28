import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userLogin } from '../AuthFolder/AuthFiles';

const API_URL = import.meta.env.VITE_API_URL;
const navigate = useNavigate()
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  username: string;
  loading: boolean;
  logout: () => void;
  login: (formData: any) => Promise<boolean>;
  fetchSession: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   useEffect(()=>{
      fetchSession()
    }, [])
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true by default until we verify
  const [username, setUsername] = useState('');

  const fetchSession = async ()=>{
    try{
      const res = await axios.get(`${API_URL}/check-session`, {withCredentials:true})
      if (res.status === 200){
        //debugging purposes need to be deleted on deployment
        console.log('found session', res.data)
        setIsAuthenticated(true)
      }
      else{
        setIsAuthenticated(false)
        
      }

    }
    catch (error:any){
      if (error.response?.status === 401) {
    await logout();              // clears session
    navigate('/login');         // sends user back to login
  } else {
    console.error('Other error:', error);
  }
    }
  }

  useEffect(() => {
    fetchSession()
    const storedUsername = localStorage.getItem('username');

    
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    } else {
      setIsAuthenticated(false);
      setUsername('');
    }
    setLoading(false);
  }, []);

  const logout = async (): Promise<any>  => {
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      setUsername('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const login = async (formData: any): Promise<boolean> => {
    try {
      const res = await userLogin(formData);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setUsername(formData.username);
        localStorage.setItem('username', formData.username);
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
        username,
        loading,
        logout,
        login,
        fetchSession
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
