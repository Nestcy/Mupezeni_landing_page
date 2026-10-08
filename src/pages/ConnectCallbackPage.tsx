import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  Share2, 
  MessageSquare, 
  Sparkles,
  Phone,
  Check
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { PageId } from '../types';

interface ConnectCallbackPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConnectCallbackPage: React.FC<ConnectCallbackPageProps> = ({ onNavigate }) => {
  const [provider, setProvider] = useState<'whatsapp' | 'facebook' | 'instagram'>('whatsapp');
  const [businessId, setBusinessId] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [state, setState] = useState<string>('');
  
  const [assets, setAssets] = useState<Array<{ id: string; name: string; phone_number?: string }>>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlProvider = (searchParams.get('provider') || 'whatsapp') as any;
      const urlBizId = searchParams.get('business_id') || localStorage.getItem('mupezeni_selected_business_id') || 'biz_ernest_sneakers';
      const urlCode = searchParams.get('code') || `auth_${urlProvider}_${Date.now()}`;
      const urlState = searchParams.get('state') || `st_${Date.now()}`;

      setProvider(urlProvider);
      setBusinessId(urlBizId);
      setCode(urlCode);
      setState(urlState);

      loadAssets(urlBizId, urlProvider, urlCode, urlState);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to parse authorization callback parameters.');
      setIsLoadingAssets(false);
    }
  }, []);

  const loadAssets = async (bizId: string, prov: any, c: string, s: string) => {
    setIsLoadingAssets(true);
    setErrorNotice(null);
    try {
      const data = await apiClient.getChannelAssets(bizId, prov, c, s);
      setAssets(data.assets || []);
      if (data.assets && data.assets.length > 0) {
        setSelectedAssetId(data.assets[0].id);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to load accounts/pages from Meta.');
    } finally {
      setIsLoadingAssets(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedAssetId || !businessId) return;
    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      await apiClient.completeChannelConnection(businessId, provider, {
        code,
        state,
        external_account_id: selectedAssetId
      });
      setIsSuccess(true);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to finalize connection with channel provider.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#050302]">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#130C08] border border-white/10 text-xs font-mono text-[#E58330]">
            <Share2 className="w-3.5 h-3.5" />
            <span className="capitalize">{provider} Channel Authorization</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
            {isSuccess ? 'Channel Connected!' : 'Select Account / Page to Connect'}
          </h1>

          <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
            {isSuccess 
              ? `Your ${provider} account has been verified. Your AI worker can now autonomously respond to shoppers.`
              : `Choose which ${provider} asset you want your autonomous retail AI worker to manage.`}
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
          {errorNotice && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-syne font-bold text-white text-base">
                  Ready to Take Inbound Shopper Messages
                </h3>
                <p className="text-xs font-dm text-[#F5EDE4]/70">
                  Asset ID: <span className="font-mono text-emerald-400">{selectedAssetId}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('onboarding')}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Return to Onboarding Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs cursor-pointer"
                >
                  <span>Go to Dashboard</span>
                </button>
              </div>
            </div>
          ) : isLoadingAssets ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#E58330] animate-spin mx-auto" />
              <p className="text-xs font-mono text-[#E58330]">
                READING CODE & STATE... LOADING ASSETS FROM META
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#F5EDE4]/70">
                  Select Phone Number / Facebook Page / Instagram Account
                </label>

                <div className="space-y-2">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedAssetId === asset.id
                          ? 'bg-[#1C120B] border-[#E58330] text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-syne font-bold text-xs text-white">
                          {asset.name}
                        </div>
                        {asset.phone_number && (
                          <div className="text-[11px] font-mono text-[#E58330]">
                            {asset.phone_number}
                          </div>
                        )}
                        <div className="text-[10px] font-mono text-[#F5EDE4]/40">
                          ID: {asset.id}
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selectedAssetId === asset.id ? 'bg-[#E58330] text-black' : 'border border-white/20'
                      }`}>
                        {selectedAssetId === asset.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting || !selectedAssetId}
                onClick={handleComplete}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#9B2208]/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Connecting Channel...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Complete Connection</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
