import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    // Implement your login logic here
    // For example, call an API to authenticate the user
    // If successful, set isAuthenticated to true
    setIsAuthenticated(true); // Placeholder for successful login
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check if user is already authenticated (e.g., check local storage or a cookie)
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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