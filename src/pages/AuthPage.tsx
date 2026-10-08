import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User as UserIcon, 
  AlertCircle, 
  CheckCircle2, 
  Store, 
  MailCheck, 
  RefreshCw, 
  Send, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';

interface AuthPageProps {
  onNavigate: (page: PageId) => void;
  defaultMode?: 'login' | 'signup' | 'forgot-password';
}

export const AuthPage: React.FC<AuthPageProps> = ({ 
  onNavigate, 
  defaultMode = 'signup' 
}) => {
  const { 
    signUp, 
    login, 
    requestPasswordReset,
    user, 
    businesses, 
    isLoading,
    emailConfirmationRequired,
    confirmationEmail,
    clearEmailConfirmation
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>(defaultMode);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Feedback
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Local check email screen
  const [showCheckEmailScreen, setShowCheckEmailScreen] = useState(emailConfirmationRequired);
  const [checkEmailAddress, setCheckEmailAddress] = useState(confirmationEmail || '');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    if (emailConfirmationRequired && confirmationEmail) {
      setShowCheckEmailScreen(true);
      setCheckEmailAddress(confirmationEmail);
    }
  }, [emailConfirmationRequired, confirmationEmail]);

  // If already logged in, navigate based on business count
  useEffect(() => {
    if (!isLoading && user) {
      if (businesses.length === 0) {
        onNavigate('onboarding');
      } else if (businesses.length === 1) {
        onNavigate('dashboard');
      } else {
        onNavigate('business-picker');
      }
    }
  }, [user, businesses, isLoading, onNavigate]);

  const handleRouteAfterAuth = (businessCount: number) => {
    if (businessCount === 0) {
      onNavigate('onboarding');
    } else if (businessCount === 1) {
      onNavigate('dashboard');
    } else {
      onNavigate('business-picker');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!email.trim() || !password) {
          setError('Please provide both email and password.');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password should be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }

        const cleanEmail = email.trim();
        const res = await signUp(cleanEmail, password, fullName.trim());
        
        if (!res.success) {
          setError(res.error || 'Failed to create account.');
        } else if (res.emailConfirmationRequired) {
          setCheckEmailAddress(cleanEmail);
          setShowCheckEmailScreen(true);
        } else {
          handleRouteAfterAuth(res.businessCount || 0);
        }
      } else if (mode === 'login') {
        if (!email.trim() || !password) {
          setError('Invalid email or password');
          setIsSubmitting(false);
          return;
        }

        const res = await login(email.trim(), password);
        if (!res.success) {
          // Strict user requirement: Login errors must be shown as "Invalid email or password"
          setError('Invalid email or password');
        } else {
          handleRouteAfterAuth(res.businessCount);
        }
      } else if (mode === 'forgot-password') {
        if (!email.trim()) {
          setError('Please enter your account email address.');
          setIsSubmitting(false);
          return;
        }

        const res = await requestPasswordReset(email.trim());
        if (res.success) {
          setForgotEmail(email.trim());
          setForgotSent(true);
        } else {
          setError(res.error || 'Failed to send password reset email.');
        }
      }
    } catch (err: any) {
      if (mode === 'login') {
        setError('Invalid email or password');
      } else {
        setError(err?.message || 'Authentication error.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendStatus('sending');
    try {
      await requestPasswordReset(checkEmailAddress);
      setResendStatus('sent');
      setTimeout(() => setResendStatus('idle'), 4000);
    } catch {
      setResendStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#050302]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#B83A0A]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#130C08] border border-white/10 text-xs font-mono text-[#E58330]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Retail AI Workers Platform</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
            {showCheckEmailScreen 
              ? 'Check Your Email' 
              : mode === 'signup' 
                ? 'Create Your Business' 
                : mode === 'forgot-password'
                  ? 'Reset Your Password'
                  : 'Welcome Back'}
          </h1>

          <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
            {showCheckEmailScreen
              ? 'We sent an activation link to verify your store owner account.'
              : mode === 'signup' 
                ? 'Start getting autonomous AI workers that answer customers on WhatsApp & web.'
                : mode === 'forgot-password'
                  ? 'Enter your email and we will send you a password reset link.'
                  : 'Sign in to access your business inbox, catalog, and AI workers.'}
          </p>
        </div>

        {/* ================= 1. CHECK YOUR EMAIL SCREEN ================= */}
        {showCheckEmailScreen ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-[#130C08] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#9B2208]/20 to-[#E58330]/20 border border-[#E58330]/40 flex items-center justify-center mx-auto text-[#E58330] shadow-xl shadow-[#9B2208]/20">
              <MailCheck className="w-8 h-8 text-[#E58330]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-syne font-bold text-white">
                Verification Link Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EDE4]/70 font-dm">
                Please check your inbox at:
              </p>
              <div className="py-2.5 px-3.5 rounded-xl bg-[#090503] border border-white/10 font-mono text-xs sm:text-sm text-[#E58330] font-bold break-all">
                {checkEmailAddress}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1A100A] border border-[#E58330]/20 text-left space-y-2 text-xs font-dm text-[#F5EDE4]/80">
              <div className="font-syne font-bold text-white flex items-center gap-1.5 text-xs">
                <span>Next steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[#F5EDE4]/70 leading-relaxed">
                <li>Check your inbox and spam folder.</li>
                <li>Click the confirmation link inside the email.</li>
                <li>Sign in to launch your store AI team!</li>
              </ol>
            </div>

            {resendStatus === 'sent' && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verification email resent successfully!</span>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resendStatus === 'sending'}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#FAFAF9] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {resendStatus === 'sending' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E58330]" />
                    <span>Resending email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#E58330]" />
                    <span>Resend Verification Email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCheckEmailScreen(false);
                  clearEmailConfirmation();
                  setMode('login');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B2208]/30 cursor-pointer"
              >
                <span>Return to Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= 2. MAIN AUTH / LOGIN / FORGOT BOX ================= */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#130C08] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Mode Selector Tabs (Sign Up vs Log In) */}
            {mode !== 'forgot-password' && (
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#070403] border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  className={`py-2 text-xs font-syne font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-[#1C120B] text-[#E58330] shadow-md border border-[#E58330]/30'
                      : 'text-[#F5EDE4]/60 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className={`py-2 text-xs font-syne font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-[#1C120B] text-[#E58330] shadow-md border border-[#E58330]/30'
                      : 'text-[#F5EDE4]/60 hover:text-white'
                  }`}
                >
                  Log In
                </button>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* FORGOT PASSWORD FORM */}
            {mode === 'forgot-password' ? (
              <div className="space-y-4">
                {forgotSent ? (
                  <div className="p-5 rounded-2xl bg-[#0A0503] border border-white/10 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-syne font-bold text-white text-sm">Instructions Sent</h4>
                      <p className="text-xs text-[#F5EDE4]/70 font-dm">
                        If an account exists for <strong className="text-white">{forgotEmail}</strong>, password reset instructions have been sent.
                      </p>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="button"
                        onClick={() => onNavigate('reset-password')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#E58330]/20 hover:bg-[#E58330]/30 border border-[#E58330]/40 text-xs font-mono text-[#E58330] font-bold cursor-pointer transition-colors"
                      >
                        Enter Reset Token / Code →
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setForgotSent(false);
                        }}
                        className="text-xs font-dm text-[#F5EDE4]/60 hover:text-white cursor-pointer"
                      >
                        ← Back to Log In
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                        Account Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="retailer@yourbrand.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B2208]/30 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending Link...' : 'Send Password Reset Link'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setError(null);
                        }}
                        className="text-[#F5EDE4]/60 hover:text-white font-dm cursor-pointer"
                      >
                        ← Back to Log In
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('reset-password')}
                        className="text-[#E58330] hover:underline font-mono cursor-pointer"
                      >
                        Have a token?
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* SIGNUP / LOGIN FORM */
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                      Store Owner / Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Mwape Chanda"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="retailer@yourbrand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot-password');
                          setError(null);
                        }}
                        className="text-[11px] font-mono text-[#E58330] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                    />
                  </div>
                  {mode === 'signup' && (
                    <span className="text-[11px] font-dm text-[#F5EDE4]/50">
                      Must be at least 6 characters.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#9B2208]/30 active:scale-98 disabled:opacity-50"
                >
                  <span>
                    {isSubmitting 
                      ? 'Please wait...' 
                      : mode === 'signup' 
                        ? 'Create Business Account' 
                        : 'Sign In to Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* REST API & Token Security Notice */}
            <div className="pt-3 border-t border-white/[0.08] text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>REST API Authenticated (API_URL/api/v1)</span>
              </div>
              <p className="text-[10px] font-dm text-[#F5EDE4]/50">
                Tokens are stored in memory with secure refresh token rotation and bearer auth.
              </p>
            </div>

          </motion.div>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs font-dm text-[#F5EDE4]/60 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Mupezeni Home
          </button>
        </div>

      </div>
    </div>
  );
};
