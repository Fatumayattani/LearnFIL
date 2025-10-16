import { useState } from 'react';
import { Mail, Wallet, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthPage({ onBack, onSuccess, initialMode = 'login' }: AuthPageProps) {
  const { signUp, signIn, connectWallet } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'wallet' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'signup') {
        result = await signUp(name, email, password);
      } else {
        result = await signIn(email, password);
      }

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletAuth = async (provider: 'metamask' | 'walletconnect' | 'core') => {
    setError('');
    setLoading(true);

    try {
      if (provider === 'metamask' && typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          const result = await connectWallet(accounts[0]);
          if (result.success) {
            onSuccess();
          } else {
            setError(result.error || 'Failed to connect wallet');
          }
        }
      } else if (provider === 'core' && typeof window.avalanche !== 'undefined') {
        const accounts = await window.avalanche.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          const result = await connectWallet(accounts[0]);
          if (result.success) {
            onSuccess();
          } else {
            setError(result.error || 'Failed to connect wallet');
          }
        }
      } else if (provider === 'walletconnect') {
        setError('WalletConnect integration coming soon');
      } else {
        setError(`${provider} wallet not detected. Please install the extension.`);
      }
    } catch (err: any) {
      if (err.code === 4001) {
        setError('Connection rejected by user');
      } else {
        setError('Failed to connect wallet');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authMethod) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-teal-300 rounded-full border-3 border-gray-900"></div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-sunshine-400 rounded-full border-3 border-gray-900"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {initialMode === 'signup' ? 'Get Started!' : 'Welcome Back!'}
              </h2>
              <p className="text-gray-700 font-semibold mb-8">
                {initialMode === 'signup' ? 'Choose how you\'d like to begin your journey' : 'Choose how you\'d like to continue'}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => setAuthMethod('email')}
                  className="w-full bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-2xl border-4 border-gray-900 p-6 transition-all hover:translate-y-[-2px] flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-3 border-gray-900 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-lg">Continue with Email</div>
                    <div className="text-sm opacity-80">Sign in using your email address</div>
                  </div>
                </button>

                <button
                  onClick={() => setAuthMethod('wallet')}
                  className="w-full bg-teal-300 hover:bg-teal-400 text-gray-900 font-bold rounded-2xl border-4 border-gray-900 p-6 transition-all hover:translate-y-[-2px] flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-3 border-gray-900 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-lg">Connect Wallet</div>
                    <div className="text-sm opacity-80">Use your Web3 wallet to sign in</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authMethod === 'wallet') {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => setAuthMethod(null)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Options
          </button>

          <div className="bg-white rounded-3xl p-8 border-4 border-gray-900">
            <div className="w-16 h-16 rounded-full bg-teal-300 border-3 border-gray-900 flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-gray-900" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Connect Your Wallet</h2>
            <p className="text-gray-700 font-semibold mb-8 text-center">Choose a wallet to connect</p>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border-3 border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handleWalletAuth('metamask')}
                disabled={loading}
                className="w-full bg-cream-100 hover:bg-cream-200 text-gray-900 font-bold rounded-xl border-3 border-gray-900 p-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'MetaMask'}
              </button>
              <button
                onClick={() => handleWalletAuth('walletconnect')}
                disabled={loading}
                className="w-full bg-cream-100 hover:bg-cream-200 text-gray-900 font-bold rounded-xl border-3 border-gray-900 p-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'WalletConnect'}
              </button>
              <button
                onClick={() => handleWalletAuth('core')}
                disabled={loading}
                className="w-full bg-cream-100 hover:bg-cream-200 text-gray-900 font-bold rounded-xl border-3 border-gray-900 p-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'Core'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => setAuthMethod(null)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Options
        </button>

        <div className="bg-white rounded-3xl p-8 border-4 border-gray-900">
          <div className="w-16 h-16 rounded-full bg-sunshine-400 border-3 border-gray-900 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-gray-900" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-700 font-semibold mb-8 text-center">
            {mode === 'login' ? 'Sign in to continue learning' : 'Start your learning journey'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border-3 border-red-500 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cream-50 border-3 border-gray-900 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-sunshine-400"
                  placeholder="Your Name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-cream-50 border-3 border-gray-900 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-sunshine-400"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-cream-50 border-3 border-gray-900 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-sunshine-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-full border-3 border-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-gray-700 hover:text-gray-900 font-semibold text-sm"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
