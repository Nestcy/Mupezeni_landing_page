import React from 'react';
import { motion } from 'motion/react';
import { 
  Handshake, 
  TrendingUp, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { PageId } from '../types';

interface PricingSectionProps {
  onNavigate: (page: PageId) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  const teams = [
    {
      icon: Handshake,
      title: 'AI Customer Support Team',
      features: [
        'Answers customer messages 24/7',
        'Recommends products',
        'Follows up with leads'
      ]
    },
    {
      icon: TrendingUp,
      title: 'AI Marketing Team',
      features: [
        'Creates posts, captions, images and videos',
        'Plans campaigns',
        'Runs ads with your approval'
      ]
    },
    {
      icon: BarChart3,
      title: 'AI Business Management Team',
      features: [
        'Business reports',
        'Sales insights',
        'Growth recommendations'
      ]
    }
  ];

  const alsoIncluded = [
    'AI onboarding and setup',
    'Integration with your existing sales channels',
    'Ongoing optimisation',
    'Monthly business reviews'
  ];

  return (
    <section 
      id="pricing" 
      className="relative py-10 sm:py-16 bg-[#050302] overflow-hidden"
    >
      {/* Soft terracotta glow centered behind price */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[200px] sm:h-[350px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-style Reveal Header */}
        <div className="text-center space-y-2.5 sm:space-y-4 mb-6 sm:mb-8">
          
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#D95A1A] font-syne">
              Simple, transparent pricing
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
          >
            One AI Team. A fraction of the cost.
          </motion.h2>

          {/* Sub-line */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Hiring 3 human roles separately costs <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-2">K15,000–K30,000+/mo</span> in salaries alone — before NAPSA, training, or turnover.
          </motion.p>

          {/* Centerpiece price block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pt-2 sm:pt-3"
          >
            <div className="inline-flex items-baseline justify-center gap-1.5 sm:gap-2.5 tracking-tight">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-[#FAFAF9] tracking-tight drop-shadow-[0_10px_25px_rgba(217,90,26,0.2)]">
                K5,000
              </span>
              <span className="text-base sm:text-xl md:text-2xl text-[#FAFAF9]/50 font-syne font-medium">
                /month
              </span>
            </div>

            {/* Price block agents subline */}
            <p className="text-xs sm:text-sm font-bold font-syne text-[#F5EDE4] mt-1 sm:mt-1.5">
              Support Agent + Marketing Agent + Business Manager Agent — all included.
            </p>

            {/* Supporting line */}
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-medium max-w-lg mx-auto mt-0.5">
              Same coverage. Same output. No hiring, no onboarding, no turnover risk.
            </p>
          </motion.div>
        </div>

        {/* Visual Economic Comparison Table Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 sm:mb-8 max-w-2xl mx-auto"
        >
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#9B2208]/40 bg-[#0E0805] shadow-lg">
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#170B06] to-[#24110A] border-b border-white/10 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                Economic Reality Check
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-white/60">
                Monthly Zambian Retail Cost
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] sm:text-xs font-syne text-[#FAFAF9]/70">
                    <th className="py-2 px-3 sm:px-4 font-semibold">Department Role</th>
                    <th className="py-2 px-3 sm:px-4 font-semibold text-white/50">Hiring 3 Human Staff</th>
                    <th className="py-2 px-3 sm:px-4 font-bold text-[#D95A1A] bg-[#180D08]/60">Mupezeni AI Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[10px] sm:text-xs font-syne">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Customer Support</td>
                    <td className="py-1.5 px-3 sm:px-4 text-white/60">~K3,300–9,500/mo</td>
                    <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (24/7)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Marketing & Content</td>
                    <td className="py-1.5 px-3 sm:px-4 text-white/60">~K3,600–10,400/mo</td>
                    <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Daily)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Business Management</td>
                    <td className="py-1.5 px-3 sm:px-4 text-white/60">~K4,000–14,500/mo</td>
                    <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Live)</td>
                  </tr>
                  <tr className="bg-[#1C0E08]/70 border-t border-[#9B2208]/60">
                    <td className="py-2 px-3 sm:px-4 font-black text-white text-[11px] sm:text-xs">Total Monthly Investment</td>
                    <td className="py-2 px-3 sm:px-4 font-bold text-white/60 text-[11px] sm:text-xs line-through decoration-red-500/80">K11,000–34,000+/mo</td>
                    <td className="py-2 px-3 sm:px-4 font-black text-sm sm:text-base bg-[#25120A] text-[#D95A1A]">K5,000/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Elegant Horizontal Feature Rows (Compact) */}
        <div className="space-y-0 divide-y divide-white/10">
          {teams.map((team, idx) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 group"
              >
                {/* Team Label with Icon */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-[220px]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#170E09] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold font-syne text-white">
                    {team.title}
                  </h3>
                </div>

                {/* Features List */}
                <div className="flex flex-wrap sm:items-center sm:justify-end gap-1.5 sm:gap-4 text-[10px] sm:text-xs text-[#FAFAF9]/75 font-normal pl-9 sm:pl-0">
                  {team.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#D95A1A]/80 flex-shrink-0" />
                      <span className="text-[#FAFAF9]/85 font-syne">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-white/10 my-4 sm:my-6" />

        {/* Also Included Section */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2 sm:space-y-3"
        >
          <p className="text-center text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white/45 font-syne">
            Also Included
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {alsoIncluded.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0F0A07] border border-white/5"
              >
                <div className="w-4 h-4 rounded-full bg-[#1A0E08] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D95A1A]" />
                </div>
                <span className="text-[10px] sm:text-xs text-[#FAFAF9]/80 font-syne font-medium truncate">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Apple-style Reveal Call To Action */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mt-6 sm:mt-8 space-y-2.5"
        >
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
            <button
              id="pricing-btn-consultation"
              onClick={() => onNavigate('contact')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_30px_rgba(217,90,26,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl font-syne font-bold text-[11px] sm:text-xs text-white/90 hover:text-white bg-[#1A0E08] border border-white/10 hover:border-[#9B2208] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Pricing Details</span>
              <ArrowRight className="w-3 h-3 text-[#D95A1A]" />
            </button>
          </div>

          {/* Underneath smaller clarification note */}
          <p className="text-[10px] sm:text-xs text-[#FAFAF9]/50 max-w-md mx-auto leading-relaxed font-normal">
            Starting from K5,000/month. Final pricing depends on sales channels and requirements.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
