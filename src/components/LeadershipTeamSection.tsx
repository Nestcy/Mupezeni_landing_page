import React from 'react';
import { 
  Linkedin, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
  Workflow, 
  Award, 
  ExternalLink,
  Code2,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export const LeadershipTeamSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>Leadership & Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Meet the Team Behind Your AI Workforce
        </h2>
        <p className="text-sm sm:text-base text-[#A8A099]">
          Founded by certified AI & agentic engineers with a deep conviction: African retail deserves world-class autonomous systems at an accessible, transparent price.
        </p>
      </div>

      {/* Founder Profile Spotlight Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#110A06] via-[#0A0604] to-[#080503] border border-[#2B180D] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E58330]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Founder Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <div className="relative group">
              {/* Outer frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#E58330]/40 shadow-2xl shadow-[#9B2208]/30 group-hover:border-[#E58330] transition-all duration-300">
                <img
                  src="/founder.png"
                  alt="Ernest Zimba - Founder & Certified AI & Agentic Engineer"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#E58330]/60 text-[#E58330] text-[11px] font-mono shadow-lg whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Founder & Lead Architect</span>
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="pt-3 w-full flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <a
                href="https://www.linkedin.com/in/ernest-zimba-904661318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 text-[#58A6FF] hover:bg-[#0A66C2]/25 hover:text-white text-xs font-semibold transition-all group"
                title="View Ernest Zimba on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:text-white transition-colors" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="mailto:hello.mupezeni@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1F120A] border border-[#3D2012] text-[#D4CDC5] hover:text-[#E58330] hover:border-[#E58330]/40 text-xs font-mono transition-all"
                title="Send Email to Ernest Zimba"
              >
                <Mail className="w-4 h-4 text-[#E58330]" />
                <span>hello.mupezeni@gmail.com</span>
              </a>

              <a
                href="https://wa.me/260973732409"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#4ADE80] hover:bg-[#25D366]/20 text-xs font-medium transition-all"
                title="Chat with Ernest Zimba on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +260 973 732 409</span>
              </a>
            </div>
          </div>

          {/* Founder Bio & Credentials Column */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E58330]/15 border border-[#E58330]/30 text-[#E58330] text-xs font-mono font-semibold">
                  Founder
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Certified AI & Agentic Engineer
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ernest Zimba
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#E58330]">
                Founder & Chief AI Systems Architect • Lusaka, Zambia
              </p>
            </div>

            {/* Vision Quote */}
            <div className="p-4 rounded-xl bg-[#160D07] border-l-4 border-[#E58330] text-xs sm:text-sm text-[#F7F5F0]/90 italic leading-relaxed">
              "Retail business owners shouldn’t spend their late nights typing the same product details and delivery fees over and over again. We build intelligent, agentic systems that run continuously in the background — driving real sales while merchants sleep."
            </div>

            {/* Bio Text */}
            <div className="space-y-3 text-xs sm:text-sm text-[#A8A099] leading-relaxed">
              <p>
                Ernest Zimba is a <strong className="text-white">Certified AI & Agentic Engineer</strong> specializing in autonomous multi-agent architectures, conversational retail workflows, and localized fintech integration.
              </p>
              <p>
                Recognizing the unique operational bottlenecks faced by retailers in Lusaka and across Africa — high message volumes on WhatsApp/Instagram, inventory discrepancies, and manual mobile money verifications — Ernest founded <span className="font-brand text-white tracking-widest font-light">MUPEZENI</span> to deliver an accessible, enterprise-grade AI workforce for just <strong>$100/month</strong>.
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#0F0804] border border-[#24130A] flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Agentic AI Architecture</h5>
                  <p className="text-[11px] text-[#A8A099]">Multi-agent workflows, zero-hallucination product matching, context retention.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0F0804] border border-[#24130A] flex items-start gap-2.5">
                <Workflow className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">African Retail Integrations</h5>
                  <p className="text-[11px] text-[#A8A099]">Airtel Money, MTN MoMo, WhatsApp Cloud API, Instagram DMs, POS sync.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mupezeni Engineering & Operations Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Our Dedicated Engineering & Implementation Disciplines
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A099] mt-1">
            Every store deployment is backed by specialized engineering pillars ensuring 99.9% uptime and zero operational friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Autonomous Agent Engineering</h4>
            <p className="text-xs text-[#A8A099] leading-relaxed">
              Custom-tuned AI models configured specifically for retail conversational patterns, product specs, size recommendations, and upsells.
            </p>
            <div className="text-[11px] font-mono text-[#E58330] pt-1">
              • Strict guardrails & Zero hallucination
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">4–6 Week High-Touch Onboarding</h4>
            <p className="text-xs text-[#A8A099] leading-relaxed">
              We do not leave you with software to figure out alone. Our team handles catalog ingestion, staff alignment, testing, and continuous fine-tuning.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              • Low-risk implementation & 30-day guarantee
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Enterprise Privacy & Security</h4>
            <p className="text-xs text-[#A8A099] leading-relaxed">
              Isolated merchant databases, encrypted customer conversation logs, and strict compliance with financial security standards.
            </p>
            <div className="text-[11px] font-mono text-[#E58330] pt-1">
              • Isolated multi-tenant security architecture
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
