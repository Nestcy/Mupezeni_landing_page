import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Database, 
  Search, 
  Download, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ArrowLeft, 
  Building, 
  User, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  Settings
} from 'lucide-react';
import { PageId, ConsultationRecord, ConsultationStatus } from '../types';
import { 
  subscribeConsultations, 
  updateConsultation, 
  deleteConsultation,
  ADMIN_NOTIFICATION_EMAIL,
  FOUNDER_WHATSAPP_NUMBER 
} from '../services/consultationService';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

const DEFAULT_MASTER_PASSWORD = 'mupezeni2026';
const AUTH_SESSION_KEY = 'mupezeni_admin_auth_v1';
const CUSTOM_PASS_KEY = 'mupezeni_admin_custom_pass';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPassInput, setNewPassInput] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState<string | null>(null);

  // Leads Data & Filtering
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscribe to real-time Firestore updates once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    const unsubscribe = subscribeConsultations((data) => {
      setRecords(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const getEffectivePassword = () => {
    return localStorage.getItem(CUSTOM_PASS_KEY) || DEFAULT_MASTER_PASSWORD;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const effectivePass = getEffectivePassword();
    if (passwordInput.trim() === effectivePass) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAuthError('Incorrect founder password. Please verify and try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    onNavigate('home');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    localStorage.setItem(CUSTOM_PASS_KEY, newPassInput.trim());
    setIsChangingPass(false);
    setNewPassInput('');
    showToast('Admin password updated successfully');
  };

  const handleResetPassword = () => {
    if (window.confirm('Reset admin password to default (mupezeni2026)?')) {
      localStorage.removeItem(CUSTOM_PASS_KEY);
      showToast('Password reset to default: mupezeni2026');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStatusChange = async (id: string, newStatus: ConsultationStatus) => {
    try {
      await updateConsultation(id, { status: newStatus });
      showToast(`Status updated to ${newStatus}`);
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await updateConsultation(id, { adminNotes: notesDraft });
      setEditingNotesId(null);
      showToast('Founder notes saved to database');
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  };

  const handleDelete = async (id: string, storeName: string) => {
    if (window.confirm(`Permanently delete consultation lead for "${storeName}"?`)) {
      try {
        await deleteConsultation(id);
        showToast('Lead record deleted from Firestore');
      } catch (e) {
        console.error('Failed to delete', e);
      }
    }
  };

  const exportCsv = () => {
    if (records.length === 0) return;
    const headers = ['ID', 'Date', 'Status', 'Store Name', 'Contact Person', 'Email', 'Phone', 'City', 'Sector', 'Channels', 'Monthly Volume', 'Format', 'Bottleneck / Goal', 'Admin Notes'];
    const rows = records.map(r => [
      `"${r.id}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
      `"${r.status}"`,
      `"${(r.storeName || '').replace(/"/g, '""')}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.city}"`,
      `"${r.businessCategory}"`,
      `"${r.channels.join('; ')}"`,
      `"${r.monthlyOrders}"`,
      `"${r.preferredFormat}"`,
      `"${(r.primaryGoal || '').replace(/"/g, '""')}"`,
      `"${(r.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mupezeni-consultation-leads-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.phone.includes(searchQuery) ||
      rec.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.primaryGoal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = records.filter(r => r.status === 'pending').length;
  const contactedCount = records.filter(r => r.status === 'contacted').length;
  const scheduledCount = records.filter(r => r.status === 'scheduled').length;
  const completedCount = records.filter(r => r.status === 'completed').length;

  // ==========================================
  // VIEW 1: PASSWORD AUTHENTICATION SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070403] text-white flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#9B2208]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-md w-full mx-auto space-y-8 my-auto">
          {/* Top Logo / Lock Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#221008] to-[#0E0704] border border-[#9B2208] flex items-center justify-center text-[#D95A1A] mx-auto shadow-2xl shadow-[#9B2208]/30">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180C07] border border-[#9B2208]/30 text-[11px] font-mono text-[#D95A1A] uppercase tracking-wider mb-2">
                <Terminal className="w-3 h-3" />
                <span>Founder Terminal Access</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-syne text-white tracking-tight">
                Mupezeni Admin Portal
              </h1>
              <p className="text-xs text-white/60 mt-1">
                Restricted portal for founder Ernest Zimba. Enter your security passcode to decrypt and access live client leads.
              </p>
            </div>
          </div>

          {/* Password Entry Box */}
          <form
            onSubmit={handleLogin}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#140C07] to-[#0A0604] border border-[#9B2208]/50 shadow-2xl space-y-5"
          >
            {authError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 font-medium animate-shake">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white font-syne flex items-center justify-between">
                <span>Security Passcode</span>
                <span className="text-[10px] text-white/40 font-mono">Confidential</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#090503] border border-white/10 focus:border-[#D95A1A] text-sm text-white placeholder-white/30 focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-white/40 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-syne font-black text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/40 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Access Leads</span>
            </button>

            {/* Quick Helper for Founder */}
            <div className="pt-2 border-t border-white/5 flex flex-col items-center gap-1 text-[11px] text-white/50 text-center">
              <span>Default Founder Passcode: <strong className="text-white font-mono bg-[#1E100A] px-2 py-0.5 rounded border border-[#9B2208]/30 select-all">mupezeni2026</strong></span>
              <span className="text-[10px] text-white/40">(You can change this password anytime inside the portal)</span>
            </div>
          </form>

          {/* Return link */}
          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer font-syne"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070403] text-[#FAFAF9] pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-950 border border-emerald-500/60 text-emerald-200 text-xs font-bold font-syne shadow-2xl shadow-emerald-950 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#180E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#24130A] border border-[#9B2208] flex items-center justify-center text-[#D95A1A] shadow-lg">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black font-syne text-white">
                  Founder Leads & Consultation Terminal
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 font-mono">
                  ● Realtime Sync
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Connected to <span className="text-[#D95A1A] font-mono">{ADMIN_NOTIFICATION_EMAIL}</span> • WhatsApp: <span className="font-mono text-white/80">+{FOUNDER_WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={exportCsv}
              disabled={records.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D100A] border border-white/10 hover:border-white/20 text-xs font-bold text-white transition-all disabled:opacity-40 cursor-pointer font-syne"
              title="Download CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsChangingPass(!isChangingPass)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D100A] border border-white/10 hover:border-white/20 text-xs font-bold text-white transition-all cursor-pointer font-syne"
              title="Change admin passcode"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Passcode</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white/80 hover:text-white transition-all cursor-pointer font-syne"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-xs font-bold text-red-300 transition-all cursor-pointer font-syne"
              title="Lock admin terminal and sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Exit</span>
            </button>
          </div>
        </div>

        {/* Change Password Subpanel */}
        {isChangingPass && (
          <div className="p-5 rounded-2xl bg-[#140D08] border border-amber-500/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-syne flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                <span>Change Founder Access Passcode</span>
              </h3>
              <button
                onClick={() => setIsChangingPass(false)}
                className="text-xs text-white/50 hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter new master password (min 6 chars)..."
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#090503] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs font-syne cursor-pointer"
              >
                Save New Passcode
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="px-3 py-2 rounded-xl bg-white/5 text-white/60 hover:text-white text-xs cursor-pointer"
              >
                Reset to Default
              </button>
            </form>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#120B07] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-white/50 block">Total Requests</span>
              <span className="text-2xl font-black text-white font-mono">{records.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#20110A] flex items-center justify-center text-[#D95A1A]">
              <Database className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#120B07] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-400/80 block">Pending Review</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{pendingCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-950/40 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#120B07] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-cyan-400/80 block">Contacted</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">{contactedCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 flex items-center justify-center text-cyan-400">
              <Phone className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#120B07] border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400/80 block">Scheduled & Closed</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{scheduledCount + completedCount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="p-4 rounded-2xl bg-[#110A06] border border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search store, owner name, phone, city, or challenge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090503] border border-white/10 focus:border-[#D95A1A] text-xs text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {(['all', 'pending', 'contacted', 'scheduled', 'completed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap font-syne ${
                  statusFilter === st
                    ? 'bg-[#9B2208] text-white shadow-lg shadow-[#9B2208]/30'
                    : 'bg-[#180E09] text-white/60 hover:text-white border border-white/5'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Records Content List */}
        <div className="space-y-4">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-white/50 bg-[#100A06] rounded-3xl border border-white/5">
              <RefreshCw className="w-8 h-8 animate-spin text-[#D95A1A]" />
              <p className="text-xs">Loading live consultation leads from Firebase Firestore...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-center p-6 rounded-3xl bg-[#100A06] border border-white/5">
              <Database className="w-12 h-12 text-white/20" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-syne">No consultation leads found</h4>
                <p className="text-xs text-white/50 max-w-sm mx-auto">
                  {records.length === 0
                    ? 'Client bookings will appear here instantly when submitted on the website.'
                    : 'No leads match your current search filters.'}
                </p>
              </div>
            </div>
          ) : (
            filteredRecords.map((rec) => {
              const formattedDate = new Date(rec.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const cleanPhone = rec.phone.replace(/[^0-9]/g, '');
              const whatsappReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hi ${rec.fullName}, this is Ernest Zimba from Mupezeni AI following up on your consultation request for ${rec.storeName}. When is a good time for our strategy call?`
              )}`;

              const emailReplyUrl = `mailto:${rec.email}?subject=${encodeURIComponent(
                `Mupezeni AI Growth Consultation — ${rec.storeName}`
              )}&body=${encodeURIComponent(
                `Hi ${rec.fullName},\n\nThank you for booking an AI Growth Consultation for ${rec.storeName}. I have reviewed your store channels and inquiry volume and would love to connect for our strategy session.\n\nBest regards,\nErnest Zimba\nFounder, Mupezeni AI\nWhatsApp: +260 973 732 409`
              )}`;

              const isEditingNotes = editingNotesId === rec.id;

              return (
                <div
                  key={rec.id}
                  className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#160E09] via-[#120B07] to-[#0A0705] border border-white/10 hover:border-[#9B2208]/60 transition-all space-y-4 shadow-xl"
                >
                  {/* Card Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#22120A] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base sm:text-lg text-white font-syne">
                            {rec.storeName}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-[#25130A] border border-[#9B2208]/30 text-[10px] text-[#D95A1A] font-medium">
                            {rec.businessCategory}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/50 flex-wrap mt-0.5">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-white/40" />
                            <strong className="text-white/80">{rec.fullName}</strong>
                          </span>
                          <span>•</span>
                          <span>{rec.city}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[11px] font-mono">
                            <Clock className="w-3 h-3" />
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Dropdown & Delete */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <select
                        value={rec.status}
                        onChange={(e) => handleStatusChange(rec.id, e.target.value as ConsultationStatus)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer font-syne ${
                          rec.status === 'pending'
                            ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                            : rec.status === 'contacted'
                            ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                            : rec.status === 'scheduled'
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                            : rec.status === 'completed'
                            ? 'bg-purple-950/60 border-purple-500/50 text-purple-300'
                            : 'bg-zinc-900 border-white/20 text-white/60'
                        }`}
                      >
                        <option value="pending" className="bg-[#140D08] text-amber-300">⏳ Pending</option>
                        <option value="contacted" className="bg-[#140D08] text-cyan-300">📞 Contacted</option>
                        <option value="scheduled" className="bg-[#140D08] text-emerald-300">📅 Scheduled</option>
                        <option value="completed" className="bg-[#140D08] text-purple-300">✅ Completed</option>
                        <option value="cancelled" className="bg-[#140D08] text-zinc-400">❌ Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDelete(rec.id, rec.storeName)}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Contact Details */}
                    <div className="p-4 rounded-2xl bg-[#0F0A06] border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block font-syne">
                        Client Contact
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#D95A1A]" />
                          <span className="font-mono text-white select-all font-bold">{rec.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#D95A1A]" />
                          <span className="text-white/80 select-all truncate">{rec.email}</span>
                        </div>
                        <div className="pt-1 flex items-center justify-between text-white/60">
                          <span>Call Format:</span>
                          <span className="text-white font-bold">{rec.preferredFormat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Retail Scale */}
                    <div className="p-4 rounded-2xl bg-[#0F0A06] border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block font-syne">
                        Inquiries & Channels
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white/50">Volume:</span>
                          <span className="text-white font-bold">{rec.monthlyOrders} inquiries/mo</span>
                        </div>
                        <div>
                          <span className="text-white/50 block text-[11px] mb-1">Active Channels:</span>
                          <div className="flex flex-wrap gap-1">
                            {rec.channels.map((ch) => (
                              <span key={ch} className="px-2 py-0.5 rounded-md bg-[#20110A] text-[10px] text-white/90 border border-white/5">
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottleneck & Action Buttons */}
                    <div className="p-4 rounded-2xl bg-[#0F0A06] border border-white/5 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block font-syne">
                          Biggest Retail Headache
                        </span>
                        <p className="text-white/85 text-xs italic mt-1 line-clamp-3 leading-relaxed">
                          "{rec.primaryGoal}"
                        </p>
                      </div>

                      {/* Fast Action Buttons */}
                      <div className="pt-2 flex items-center gap-2 border-t border-white/5">
                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors font-syne"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={emailReplyUrl}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#25130A] hover:bg-[#341B0E] border border-[#9B2208]/50 text-[#F5EDE4] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors font-syne"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#D95A1A]" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Private Internal Notes */}
                  <div className="pt-1 border-t border-white/5">
                    {isEditingNotes ? (
                      <div className="space-y-2">
                        <textarea
                          value={notesDraft}
                          onChange={(e) => setNotesDraft(e.target.value)}
                          placeholder="Add private consultation notes, proposed package, or next call date..."
                          rows={2}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#0A0705] border border-white/20 focus:border-[#D95A1A] text-xs text-white focus:outline-none font-mono"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveNotes(rec.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#9B2208] text-white text-xs font-bold hover:bg-[#B83A0A] transition-colors cursor-pointer font-syne"
                          >
                            Save Note
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 text-white/60 text-xs hover:text-white transition-colors cursor-pointer font-syne"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-white/60 bg-[#0A0705] p-3 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Edit3 className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                          <span className="truncate">
                            <strong className="text-white/80">Strategist Notes:</strong>{' '}
                            {rec.adminNotes ? rec.adminNotes : 'No internal notes saved yet.'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setEditingNotesId(rec.id);
                            setNotesDraft(rec.adminNotes || '');
                          }}
                          className="text-xs text-[#D95A1A] hover:underline flex-shrink-0 font-bold ml-2 cursor-pointer font-syne"
                        >
                          {rec.adminNotes ? 'Edit Notes' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Security / Secret Command Reference Footer */}
        <div className="p-4 rounded-2xl bg-[#0F0A06] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#D95A1A]" />
            <span>Shortcut to open portal from anywhere: <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Ctrl + Shift + A</kbd> or <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">#admin</kbd></span>
          </div>
          <div>
            <span>Firestore DB: <strong className="text-white/70">ai-studio-mupezeniaiworkfo...</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
