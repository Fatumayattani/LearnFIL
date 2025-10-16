import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hashPassword, verifyPassword, generateId } from '../utils/auth';
import { getUsers, saveUser, getCurrentSession, saveSession, clearSession } from '../utils/localStorage';

export interface User {
  id: string;
  name?: string;
  email?: string;
  passwordHash?: string;
  walletAddress?: string;
  authType: 'email' | 'wallet';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  connectWallet: (walletAddress: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      const users = getUsers();
      const sessionUser = users.find(u => u.id === session.userId);
      if (sessionUser) {
        setUser(sessionUser);
      } else {
        clearSession();
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: generateId(),
      name,
      email,
      passwordHash,
      authType: 'email',
    };

    saveUser(newUser);
    saveSession(newUser.id);
    setUser(newUser);

    return { success: true };
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user || !user.passwordHash) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' };
    }

    saveSession(user.id);
    setUser(user);

    return { success: true };
  };

  const connectWallet = async (walletAddress: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    let user = users.find(u => u.walletAddress === walletAddress);

    if (user) {
      saveSession(user.id);
      setUser(user);
    } else {
      const newUser: User = {
        id: generateId(),
        walletAddress,
        authType: 'wallet',
      };
      saveUser(newUser);
      saveSession(newUser.id);
      setUser(newUser);
    }

    return { success: true };
  };

  const signOut = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, connectWallet, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
