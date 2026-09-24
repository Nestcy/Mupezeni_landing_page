import React, { useState, useEffect } from 'react';
import { PageId, ConsultationRecord } from '../types';
import { getConsultationsFromFirestore, updateConsultationStatusInFirestore } from '../services/consultationService';
import { ShieldCheck, MessageSquare, RefreshCw, CheckCircle2, Clock, XCircle, ArrowLeft } from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getConsultationsFromFirestore();
      setRecords(data);
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ConsultationRecord['status']) => {
    try {
      await updateConsultationStatusInFirestore(id, newStatus);
      setRecords(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (e) {
      console.error('Status update failed:', e);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#24130A] pb-6">
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E58330] hover:underline mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Merchant Admin Portal</h1>
            <p className="text-xs text-[#A8A099]">Manage retail onboarding requests and consultations</p>
          </div>

          <button
            onClick={fetchRecords}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-xs font-medium text-[#D4CDC5] hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Submissions</span>
          </button>
        </div>

        {/* Table / List */}
        <div className="rounded-2xl bg-[#090503] border border-[#26150C] overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#120B07] border-b border-[#24130A] flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#A8A099] font-semibold">
              Total Inquiries: {records.length}
            </span>
            <span className="text-xs font-mono text-[#E58330]">
              Filter: All Active
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-[#A8A099] font-mono">
              Loading merchant records...
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <p className="text-sm font-bold text-white">No consultation records yet.</p>
              <p className="text-xs text-[#A8A099]">
                Test the consultation form on the homepage or pricing page to see submissions appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#211208] text-[#8C8279] font-mono uppercase">
                    <th className="p-4">Store & Contact</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#180D07]">
                  {records.map(record => (
                    <tr key={record.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{record.storeName || 'N/A'}</div>
                        <div className="text-[#A8A099] text-[11px]">{record.fullName} • {record.email}</div>
                      </td>
                      <td className="p-4 font-mono text-[#E58330]">
                        {record.phone}
                      </td>
                      <td className="p-4 text-[#C4BCB3]">
                        {record.businessCategory}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase ${
                          record.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : record.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-[#1E110A] text-[#E58330] border border-[#3A1F10]'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[#8C8279] text-[11px]">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <select
                          value={record.status}
                          onChange={e => handleStatusChange(record.id, e.target.value as any)}
                          className="bg-[#140C07] border border-[#2D1B0F] text-white text-[11px] rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
