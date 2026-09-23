import React from 'react';
import { 
  Bot, 
  Sparkles, 
  MapPin, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Compass, 
  Target, 
  Globe2,
  Calendar,
  Users,
  TrendingUp,
  Scale
} from 'lucide-react';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { EconomicComparisonTable } from '../components/EconomicComparisonTable';
import { PHILOSOPHY_PRINCIPLES } from '../data/websiteData';
import { PageId } from '../types';
import ernestZimbaPortrait from '../assets/images/ernest_zimba_exact_founder_1788808890593.jpg';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [founderImg, setFounderImg] = React.useState<string>('/founder.png');

  const handleFounderImageError = () => {
    if (founderImg === '/founder.png') {
      setFounderImg('/founder.jpg');
    } else if (founderImg === '/founder.jpg') {
      setFounderImg('/IMG_20260814_210201.jpg');
    } else if (founderImg === '/IMG_20260814_210201.jpg') {
      setFounderImg(ernestZimbaPortrait);
    }
  };

  const getPrincipleIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#D95A1A]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#D95A1A]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#D95A1A]" />;
      case 'Users':
      default:
        return <Users className="w-5 h-5 text-[#D95A1A]" />;
    }
  };

  return (
    <div className="pt-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 bg-[#0A0705] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              About <span className="font-roboto font-bold">Mupezeni</span> · AI Business Growth Company
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight max-w-4xl mx-auto">
            Helping Retailers Scale with Dedicated{' '}
            <span className="text-gradient-fire">
              AI Teams.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            <span className="font-roboto font-semibold text-white">Mupezeni</span> is an AI Business Growth Company. We give retailers scalable AI Teams that manage digital interactions, marketing, and operations so owners can focus on finding great products from suppliers and delivering them to your customers.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION DUAL CARDS */}
      <section className="py-14 sm:py-20 bg-[#0D0805] border-t border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#180E08] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A]">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                  Our Mission
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-syne text-white leading-tight">
                To help every retailer grow without increasing their operating overhead.
              </h2>

              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                Retailers drive economic vibrancy. We provide digital AI Teams that take over the heavy digital burden—instant customer consultation, consistent marketing campaigns, and continuous store management—so owners can build highly profitable, sustainable enterprises.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#180E08] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                  Our Vision
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-syne text-white leading-tight">
                A world where any ambitious retailer wields global-scale digital leverage.
              </h2>

              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                We envision a future where independent shops, boutiques, and merchants compete effortlessly with corporate retail giants—equipped with 24/7 AI Teams that respond in seconds, market consistently, and streamline operations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE: CORE PHILOSOPHY */}
      <section className="py-20 sm:py-28 bg-[#0A0705] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Core Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne text-white tracking-tight">
              What We <span className="text-gradient-fire">Believe</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAFAF9]/80 leading-relaxed">
              Our guiding principles shape how we build AI Teams for retailers:
            </p>
          </div>

          {/* 4 Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PHILOSOPHY_PRINCIPLES.map((principle) => (
              <div 
                key={principle.id}
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#180E08] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-5 flex flex-col justify-between hover:border-[#D95A1A]/60 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#20110A] border border-[#9B2208]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getPrincipleIcon(principle.iconName)}
                    </div>
                    <span className="text-[11px] font-bold text-[#D95A1A] uppercase tracking-wider font-syne px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/30">
                      Principle
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
                      {principle.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold font-syne text-[#D95A1A] italic leading-snug">
                      "{principle.quote}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                    {principle.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy in Practice: Economic Reality Check */}
          <div className="mt-14 max-w-3xl mx-auto space-y-4">
            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                Philosophy in Practice
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
                The Economics of Scaling Without Bloat
              </h3>
              <p className="text-xs text-[#FAFAF9]/75 max-w-xl mx-auto">
                Comparing the overhead of 3 full-time human roles versus Mupezeni's coordinated AI workforce.
              </p>
            </div>
            <EconomicComparisonTable />
          </div>

        </div>
      </section>

      {/* 4. FOUNDER STORY: ERNEST ZIMBA */}
      <section className="py-20 sm:py-28 bg-[#0D0805] border-t border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
            
            {/* Left: Founder Card (Span 5) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-[#1A0E08] to-[#0A0705] border border-[#9B2208]/40 shadow-2xl space-y-6 text-center sm:text-left">
              
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] p-0.5 shadow-xl shadow-[#9B2208]/30 mx-auto sm:mx-0 overflow-hidden group flex-shrink-0 relative">
                <img 
                  src={founderImg} 
                  onError={handleFounderImageError}
                  alt="Ernest Zimba - Founder & AI Systems Architect" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[14px] scale-[1.28] -rotate-[7deg] translate-y-1 transition-transform duration-500 group-hover:scale-[1.34]"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black font-syne text-white">
                  Ernest Zimba
                </h3>
                <p className="text-xs font-bold text-[#D95A1A] uppercase tracking-widest font-syne">
                  Founder & AI Systems Architect
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#FAFAF9]/70 pt-1 justify-center sm:justify-start">
                  <MapPin className="w-3.5 h-3.5 text-[#D95A1A]" />
                  <span>Kamwala South, Lusaka, Zambia</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed pt-3 border-t border-white/10">
                "I founded Mupezeni after seeing ambitious shop owners struggle with the digital demands of modern retail. By giving them scalable AI Teams, they can grow their sales exponentially without burning out."
              </p>

              <div className="p-3.5 rounded-2xl bg-[#090604] border border-white/5 text-xs text-[#FAFAF9]/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                <span className="font-mono text-[11px] text-white">nestcy770@gmail.com</span>
              </div>

            </div>

            {/* Right: The Origin Story (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne block">
                The Origin Story
              </span>

              <h2 className="text-3xl sm:text-4xl font-black font-syne text-white leading-tight">
                Why <span className="font-roboto font-bold">Mupezeni</span> was created.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#FAFAF9]/80 leading-relaxed font-normal">
                <p>
                  Modern retail lives across fast-paced conversational channels: <strong>WhatsApp chats, Instagram direct messages, Facebook Marketplace</strong>, and physical shop counters.
                </p>
                <p>
                  However, as soon as a retailer begins to see success, an operational bottleneck occurs. The owner becomes chained to their phone—answering the same sizing questions, quoting prices, and arranging customer deliveries until late into the night.
                </p>
                <p>
                  <span className="font-roboto font-semibold text-white">Mupezeni</span> was built to solve this challenge. By equipping retail businesses with dedicated AI Teams, we manage the digital work around the clock while owners focus on finding great products from suppliers and delivering them to your customers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#140D08] border border-[#9B2208]/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D95A1A] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white font-medium font-syne">
                  Founder-Led Transformation: Every client works directly with Ernest on strategy and AI team setup.
                </span>
              </div>

              {/* The Mupezeni Emblem */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C0E07] via-[#120904] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-48 h-32 sm:w-60 sm:h-38 md:w-72 md:h-44 flex-shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#D95A1A]/25 blur-3xl rounded-full scale-115 pointer-events-none" />
                    <img src="/logo.png" alt="Mupezeni Soaring Swallow and Star Logo" referrerPolicy="no-referrer" className="relative w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(217,90,26,0.45)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95A1A] font-syne block">
                      The Brand Emblem
                    </span>
                    <h3 className="text-xl font-black font-syne text-white">
                      The Soaring Swallow & Star
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAFAF9]/70 mt-1 leading-relaxed">
                      Speed, precision, and retail empowerment. A symbol of effortless forward momentum while AI Teams handle the digital operations.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/10 text-xs text-[#FAFAF9]/80">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A] mt-1.5 flex-shrink-0"></span>
                    <span><strong>Aerodynamic Swallow:</strong> Relentless 24/7 speed, agility, and customer responsiveness.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A] mt-1.5 flex-shrink-0"></span>
                    <span><strong>4-Point Star:</strong> The guiding vision modernizing commerce through scalable AI Teams.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. THE ECONOMIC THESIS */}
      <section className="py-16 sm:py-24 bg-[#0A0705] border-b border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Economic Model</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-white tracking-tight">
              The Reality Behind Retail Scaling
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
              Instead of assembling separate people, software tools, and fragmented workflows for customer support and marketing... deploy one coordinated AI team for K2,000/month.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <EconomicComparisonTable showCta onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
        badgeText="Work Directly with Our Founder"
        headline="Ready to Scale Your Retail Business?"
        subheadline="Schedule a strategic consultation with Ernest Zimba to architect dedicated AI Teams for your store."
      />
    </div>
  );
};
