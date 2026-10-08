import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, CheckCircle2, AlertCircle, Sparkles, KeyRound, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';

interface ResetPasswordPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const { confirmPasswordReset, requestPasswordReset } = useAuth();
  
  // Extract token from URL search params if present
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Request new link state
  const [showRequestNew, setShowRequestNew] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlToken = searchParams.get('token') || searchParams.get('access_token');
      if (urlToken) {
        setToken(urlToken);
      }
    } catch {}
  }, []);

  const handleSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError('Please provide a valid password reset token or link.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await confirmPasswordReset(token.trim(), newPassword);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setError(res.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestNewLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await requestPasswordReset(requestEmail.trim());
      if (res.success) {
        setRequestSent(true);
      } else {
        setError(res.error || 'Failed to send reset link.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#050302]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#9B2208]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#E58330]/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#130C08] border border-white/10 text-xs font-mono text-[#E58330]">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Account Security</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
            {isSuccess 
              ? 'Password Reset Complete' 
              : showRequestNew 
                ? 'Request Reset Link' 
                : 'Set New Password'}
          </h1>

          <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
            {isSuccess
              ? 'Your password has been securely updated. You can now log in.'
              : showRequestNew
                ? 'Enter your store account email to receive a password reset link.'
                : 'Enter your new password below to regain access to your store dashboard.'}
          </p>
        </div>

        {/* SUCCESS CARD */}
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-[#130C08] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-syne font-bold text-white">
                Password Successfully Updated
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EDE4]/70 font-dm">
                Your new password is now active. Please sign in with your updated credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('auth')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B2208]/30 cursor-pointer"
            >
              <span>Proceed to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : showRequestNew ? (
          /* REQUEST NEW LINK FORM */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#130C08] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {requestSent ? (
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-syne font-bold text-white text-base">Reset Link Sent</h4>
                  <p className="text-xs text-[#F5EDE4]/70 font-dm">
                    If an account exists for <strong className="text-white">{requestEmail}</strong>, instructions to reset your password have been dispatched.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRequestNew(false)}
                  className="text-xs font-mono text-[#E58330] hover:underline cursor-pointer"
                >
                  I have a reset code/token →
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestNewLink} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                    Account Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="retailer@yourbrand.com"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B2208]/30 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Instructions...' : 'Send Password Reset Email'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestNew(false)}
                    className="text-xs font-dm text-[#F5EDE4]/60 hover:text-white cursor-pointer"
                  >
                    Cancel and enter reset token instead
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        ) : (
          /* RESET PASSWORD FORM */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#130C08] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReset} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                    Reset Token / Code
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRequestNew(true);
                      setError(null);
                    }}
                    className="text-[11px] font-mono text-[#E58330] hover:underline cursor-pointer"
                  >
                    Need a reset link?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter token from email link"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#E58330] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                  />
                </div>
                <span className="text-[11px] font-dm text-[#F5EDE4]/50">
                  Minimum 6 characters.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-syne font-bold text-[#F5EDE4]/80">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070403] border border-white/10 text-white text-xs sm:text-sm font-dm focus:outline-none focus:border-[#E58330] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B2208]/30 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Resetting Password...' : 'Save New Password'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Back to Sign In */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => onNavigate('auth')}
            className="inline-flex items-center gap-1.5 text-xs font-dm text-[#F5EDE4]/60 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>
        </div>

      </div>
    </div>
  );
};
