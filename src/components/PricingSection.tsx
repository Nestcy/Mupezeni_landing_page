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
      className="relative py-24 sm:py-36 lg:py-44 bg-[#050302] overflow-hidden"
    >
      {/* Soft terracotta glow centered behind price */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] lg:w-[850px] h-[250px] sm:h-[450px] bg-gradient-to-b from-[#D95A1A]/20 via-[#9B2208]/15 to-transparent rounded-full blur-[140px] sm:blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-style Reveal Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D95A1A] font-syne">
              Simple, transparent pricing
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne text-white tracking-tight"
          >
            One AI Team. A fraction of the cost.
          </motion.h2>

          {/* Sub-line */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-[#FAFAF9]/80 font-normal max-w-3xl mx-auto leading-relaxed"
          >
            Hiring a customer support agent, a marketer, and a business manager separately can cost you <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-4">K15,000–K30,000+ a month</span> in salaries alone — before NAPSA, training, or turnover.
          </motion.p>

          {/* Huge centerpiece price block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="pt-4 sm:pt-6"
          >
            <div className="inline-flex items-baseline justify-center gap-2 sm:gap-4 tracking-tight">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-syne text-[#FAFAF9] tracking-tight drop-shadow-[0_15px_40px_rgba(217,90,26,0.2)]">
                K5,000
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FAFAF9]/50 font-syne font-medium">
                /month
              </span>
            </div>

            {/* Price block agents subline */}
            <p className="text-sm sm:text-base font-bold font-syne text-[#F5EDE4] mt-2 sm:mt-3">
              Customer Support Agent + Marketing Agent + Business Manager Agent — all included.
            </p>

            {/* Supporting line (small text under price) */}
            <p className="text-xs sm:text-sm text-[#FAFAF9]/60 font-medium max-w-xl mx-auto mt-2">
              Same coverage. Same output. No hiring, no onboarding, no turnover risk.
            </p>
          </motion.div>
        </div>

        {/* Visual Economic Comparison Table Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 sm:mb-20 max-w-3xl mx-auto"
        >
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#9B2208]/40 bg-[#0E0805] shadow-2xl">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#170B06] to-[#24110A] border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                Economic Reality Check
              </span>
              <span className="text-[11px] font-semibold text-white/60">
                Monthly Zambian Retail Cost
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs sm:text-sm font-syne text-[#FAFAF9]/70">
                    <th className="py-3.5 px-4 sm:px-6 font-semibold">Department Role</th>
                    <th className="py-3.5 px-4 sm:px-6 font-semibold text-white/50">Hiring 3 Human Staff</th>
                    <th className="py-3.5 px-4 sm:px-6 font-bold text-[#D95A1A] bg-[#180D08]/60">Mupezeni AI Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-syne">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Customer Support</td>
                    <td className="py-3.5 px-4 sm:px-6 text-white/60">~K3,300–9,500/mo</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (24/7)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Marketing & Content</td>
                    <td className="py-3.5 px-4 sm:px-6 text-white/60">~K3,600–10,400/mo</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Daily)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Business Management</td>
                    <td className="py-3.5 px-4 sm:px-6 text-white/60">~K4,000–14,500/mo</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Live)</td>
                  </tr>
                  <tr className="bg-[#1C0E08]/70 border-t-2 border-[#9B2208]/60">
                    <td className="py-4 px-4 sm:px-6 font-black text-white text-sm sm:text-base">Total Monthly Investment</td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-white/60 text-sm sm:text-base line-through decoration-red-500/80">K11,000–34,000+/mo</td>
                    <td className="py-4 px-4 sm:px-6 font-black text-[#FAFAF9] text-base sm:text-lg bg-[#25120A] text-[#D95A1A]">K5,000/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Elegant Horizontal Feature Rows (No Cards, Floating Whitespace) */}
        <div className="space-y-0 divide-y divide-white/10">
          {teams.map((team, idx) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group"
              >
                {/* Team Label with Icon */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-[280px]">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#170E09] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] group-hover:border-[#D95A1A]/60 group-hover:scale-105 transition-all duration-300 flex-shrink-0 shadow-sm shadow-[#9B2208]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-syne text-white group-hover:text-[#FAFAF9] transition-colors">
                    {team.title}
                  </h3>
                </div>

                {/* Features List */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap md:justify-end gap-2.5 sm:gap-6 text-xs sm:text-sm text-[#FAFAF9]/75 font-normal">
                  {team.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A]/80 flex-shrink-0" />
                      <span className="text-[#FAFAF9]/85 font-syne">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-white/10 my-12 sm:my-16" />

        {/* Also Included Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          <p className="text-center text-xs sm:text-sm uppercase tracking-widest font-bold text-white/45 font-syne">
            Also Included
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {alsoIncluded.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 text-left py-2"
              >
                <div className="w-5 h-5 rounded-full bg-[#1A0E08] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#D95A1A]" />
                </div>
                <span className="text-xs sm:text-sm text-[#FAFAF9]/80 font-syne font-medium leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Apple-style Reveal Call To Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 sm:mt-20 pt-4 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="pricing-btn-consultation"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_40px_rgba(217,90,26,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-syne font-bold text-xs sm:text-sm text-white/90 hover:text-white bg-[#1A0E08] border border-white/10 hover:border-[#9B2208] transition-all cursor-pointer"
            >
              <span>View Dedicated Pricing Page</span>
              <ArrowRight className="w-4 h-4 text-[#D95A1A]" />
            </button>
          </div>

          {/* Underneath smaller clarification note */}
          <p className="text-xs sm:text-sm text-[#FAFAF9]/50 max-w-xl mx-auto leading-relaxed font-normal">
            Starting from K5,000/month. Final pricing depends on your business size, sales channels and implementation requirements.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
