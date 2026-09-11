const fs = require('fs');

const newLogin = `
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Eye, EyeOff } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

export function Login() {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Phone auth states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier && authMethod === 'phone') {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      } catch (e) {
        console.error("Recaptcha error", e);
      }
    }
  }, [authMethod]);

  const saveUserToFirestore = async (uid: string, data: any) => {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        ...data,
        createdAt: new Date().toISOString()
      });
      return data.role;
    }
    return snap.data().role;
  };

  const triggerWelcomeEmail = async (userEmail: string, userName: string) => {
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Welcome to Brew Haven!',
          text: \`Hi \${userName},\\n\\nWelcome to Brew Haven! We're thrilled to have you. Enjoy exploring our carefully crafted menu and booking your perfect table.\\n\\nWarm regards,\\nThe Brew Haven Team\`
        })
      });
    } catch (e) {
      console.error("Failed to send welcome email", e);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod !== 'email') return;
    setLoading(true);
    setError('');
    
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Check if it's the admin
        const role = email.toLowerCase() === 'admin@brewhaven.example' ? 'admin' : 'customer';
        
        await saveUserToFirestore(userCredential.user.uid, {
          name,
          email,
          role,
          points: 0
        });
        
        await triggerWelcomeEmail(email, name);
        
        setUser({
          id: userCredential.user.uid,
          name,
          email,
          points: 0,
          role
        });
        navigate(role === 'admin' ? '/admin' : '/account');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        const userRef = doc(db, 'users', userCredential.user.uid);
        const snap = await getDoc(userRef);
        const role = snap.exists() ? snap.data().role : (email.toLowerCase() === 'admin@brewhaven.example' ? 'admin' : 'customer');
        
        setUser({
          id: userCredential.user.uid,
          name: userCredential.user.displayName || 'Customer',
          email: userCredential.user.email || email,
          points: snap.exists() ? snap.data().points || 0 : 0,
          role
        });
        navigate(role === 'admin' ? '/admin' : '/account');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError('');
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !confirmationResult) return;
    setLoading(true);
    setError('');
    try {
      const result = await confirmationResult.confirm(otp);
      
      const role = await saveUserToFirestore(result.user.uid, {
        name: result.user.displayName || 'Customer',
        phone: result.user.phoneNumber,
        role: 'customer',
        points: 0
      });

      setUser({
        id: result.user.uid,
        name: result.user.displayName || 'Customer',
        email: result.user.email || '',
        points: 0,
        role
      });
      navigate('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const email = result.user.email || '';
      const isNewAdmin = email.toLowerCase() === 'admin@brewhaven.example';
      
      const role = await saveUserToFirestore(result.user.uid, {
        name: result.user.displayName || 'Customer',
        email,
        role: isNewAdmin ? 'admin' : 'customer',
        points: 0
      });

      // Simple way to trigger welcome email if new, but difficult with popup to know if new.
      // We will skip google welcome email for simplicity or check creation time.

      setUser({
        id: result.user.uid,
        name: result.user.displayName || 'Customer',
        email,
        points: 0,
        role
      });
      navigate(role === 'admin' ? '/admin' : '/account');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 min-h-screen">
      <div className="flex-grow flex w-full max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#160B07] border border-white/10 shadow-2xl">
        
        {/* Left Side: Image */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2500&auto=format&fit=crop" 
            alt="Coffee"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160B07] via-[#160B07]/40 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="font-serif text-5xl text-[#F4E5CB] mb-2">Good Coffee<br/>Better Days</h2>
            <p className="text-white/60 font-light text-sm">Sign in to continue your journey.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
          <motion.div 
            key={isRegistering ? 'register' : 'login'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            <div className="mb-10">
              <h2 className="font-serif text-4xl text-[#F4E5CB] mb-2">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="text-white/50 text-sm">{isRegistering ? 'Join Brew Haven for exclusive perks.' : 'Sign in to your account.'}</p>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => { setAuthMethod('email'); setConfirmationResult(null); }}
                className={\`flex-1 py-2 text-sm font-medium border-b-2 transition-colors \${authMethod === 'email' ? 'border-[#D6A45D] text-[#D6A45D]' : 'border-transparent text-white/50 hover:text-white/80'}\`}
              >
                Email
              </button>
              <button 
                onClick={() => { setAuthMethod('phone'); setConfirmationResult(null); setIsRegistering(false); }}
                className={\`flex-1 py-2 text-sm font-medium border-b-2 transition-colors \${authMethod === 'phone' ? 'border-[#D6A45D] text-[#D6A45D]' : 'border-transparent text-white/50 hover:text-white/80'}\`}
              >
                Phone
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/50 text-red-200 text-sm border border-red-800">
                {error}
              </div>
            )}

            <div id="recaptcha-container"></div>

            {authMethod === 'email' ? (
              <form onSubmit={handleEmailAuth} className="space-y-5">
                {isRegistering && (
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" 
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Email address</label>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Password</label>
                  <div className="relative">
                    <input 
                      required 
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20 pr-12" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
                </button>
              </form>
            ) : (
              <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp} className="space-y-5">
                {!confirmationResult ? (
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Phone number</label>
                    <input 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 890"
                      className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" 
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Enter OTP</label>
                    <input 
                      required 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" 
                    />
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : confirmationResult ? 'Verify OTP' : 'Send OTP'}
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 py-6">
              <div className="flex-1 h-[1px] bg-white/10"></div>
              <span className="text-xs text-white/40">or</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 bg-transparent border border-white/20 text-white rounded-full text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {authMethod === 'email' && (
              <div className="mt-8 text-center">
                <span className="text-xs text-white/50">
                  {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
                </span>
                <button 
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)} 
                  className="text-xs text-white/80 hover:text-[#D6A45D] transition-colors border-b border-white/30 hover:border-[#D6A45D] pb-0.5"
                >
                  {isRegistering ? 'Sign In' : 'Register'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Login.tsx', newLogin);
