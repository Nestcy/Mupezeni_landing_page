import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  MessageSquare, 
  Bot, 
  TrendingUp, 
  Clock, 
  ShoppingBag, 
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    { title: 'Customer Discovers Product', desc: 'Browses social feeds, catalog, or website', icon: Compass },
    { title: 'Customer Reaches Out', desc: 'Sends direct inquiry on WhatsApp or DMs', icon: MessageSquare },
    { title: 'AI Worker Responds', desc: 'Instant reply with availability & pricing', icon: Bot },
    { title: 'Buying Intent Identified', desc: 'Parses sizing, color & delivery needs', icon: TrendingUp },
    { title: 'Follow-Up Happens', desc: 'Re-engages if customer goes quiet', icon: Clock },
    { title: 'Purchase Completed', desc: 'Order formatted & payment details sent', icon: ShoppingBag },
    { title: 'Business Sees The Signal', desc: 'Real-time visibility in central intelligence', icon: BarChart3 },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              The Commercial Flow
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            From customer interest to action.
          </h2>

          <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed">
            A continuous operational loop that ensures no customer conversation or follow-up gets left behind.
          </p>
        </div>

        {/* Visual Workflow Steps (Horizontal on desktop, vertical on mobile) */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-2xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/50 p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-all duration-300 group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#0A0705] border border-white/[0.08] flex items-center justify-center text-[#B83A0A] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-[#F5EDE4]/40 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold font-syne text-[#FAFAF9] leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-[11px] font-dm text-[#F5EDE4]/65 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex justify-end pt-1 text-[#B83A0A]/40 group-hover:text-[#B83A0A] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing Note */}
        <div className="text-center pt-4">
          <div className="inline-block px-6 py-3 rounded-2xl bg-[#130C08] border border-white/[0.08] text-sm sm:text-base font-dm text-[#F5EDE4]/85 max-w-xl mx-auto shadow-xl">
            <span className="font-syne font-bold text-[#FAFAF9]">The goal isn't to automate everything.</span>{' '}
            <span className="font-editorial text-[#F5EDE4]/90">The goal is to make sure valuable work keeps moving.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
