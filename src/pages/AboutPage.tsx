import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { WhatWeBelieveSection } from '../components/WhatWeBelieveSection';
import { 
  ArrowRight, 
  MessageSquare, 
  TrendingUp, 
  Megaphone, 
  Activity, 
  GitBranch, 
  BarChart3
} from 'lucide-react';
import founderErnestImg from '../assets/images/ernest_zimba_exact_founder_1788808890593.jpg';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const workforceAreas = [
    { title: 'Customer conversations', icon: MessageSquare, desc: 'Instant 24/7 product inquiries, stock verification, and support' },
    { title: 'Sales follow-ups', icon: TrendingUp, desc: 'Persistent pipeline cadence without dropped leads' },
    { title: 'Marketing execution', icon: Megaphone, desc: 'Continuous branded social posts and multi-channel distribution' },
    { title: 'Business activity', icon: Activity, desc: 'Incoming order tracking, receipts, and status coordination' },
    { title: 'Operational workflows', icon: GitBranch, desc: 'Structured background handoffs and escalation protocols' },
    { title: 'Business insights', icon: BarChart3, desc: 'Real-time visibility into customer demand and conversion metrics' },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0A0705] min-h-screen text-[#FAFAF9]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-24 sm:space-y-32">
        
        {/* ================= 1. OUR PURPOSE ================= */}
        <section className="relative pt-6 sm:pt-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                Our Purpose
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.08] text-balance">
              Built for Businesses That Refuse to Stop Growing
            </h1>

            <div className="space-y-4 text-base sm:text-lg font-dm text-[#F5EDE4]/85 leading-relaxed font-normal pt-2">
              <p>
                Growth creates opportunity. It also creates work.
              </p>
              <p className="text-[#F5EDE4]/70">
                More customers. More conversations. More follow-ups. More marketing. More orders. More operations. More decisions.
              </p>
              <p className="text-[#FAFAF9] font-medium">
                Eventually, the work required to operate the business can grow faster than the capacity available to handle it. That’s the problem Mupezeni exists to solve.
              </p>
              <p className="text-sm sm:text-base text-[#F5EDE4]/80">
                We build AI workers that take responsibility for recurring business work, giving growing companies more capacity to operate, serve customers, and keep moving forward.
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-2 rounded-xl bg-[#130C08] border border-white/[0.08] text-sm font-syne font-bold text-[#B83A0A]">
                  More business shouldn’t have to mean more burden.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. THE IDEA ================= */}
        <section className="relative rounded-3xl bg-[#130C08] border border-white/[0.08] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9B2208]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Idea
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-snug">
                Your Business Shouldn’t Need More of Your Time to Grow.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-base font-dm text-[#F5EDE4]/80 leading-relaxed">
              <p>
                A growing business eventually reaches a point where the founder or team becomes the bottleneck. Not because there isn't enough demand. Not because there isn't enough opportunity. But because there is simply too much work for the available human capacity.
              </p>
              <p>
                The answer isn't always another hire. And it shouldn't always be another piece of software that gives people another system to manage.
              </p>
              <div className="p-5 rounded-2xl bg-[#0A0705] border border-white/[0.06] space-y-2">
                <div className="text-lg font-syne font-bold text-[#FAFAF9]">
                  What if the business could simply have more capacity?
                </div>
                <div className="text-sm font-syne text-[#B83A0A] font-semibold">
                  That’s where Mupezeni comes in.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. THE MUPEZENI WORKFORCE ================= */}
        <section className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              The Mupezeni Workforce
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              AI Workers, Not Just Software
            </h2>
            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed">
              Most software waits for someone to use it. Mupezeni is built around a different idea: AI workers should handle work.
            </p>
          </div>

          {/* 6 Workforce Responsibility Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workforceAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl p-6 bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 transition-all duration-300 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-[#B83A0A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-syne text-[#FAFAF9]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-[#130C08] border border-white/[0.06] text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-dm text-[#F5EDE4]/85">
              Each worker has a defined responsibility. Each operates within the business's workflows. And together, they create an additional layer of capacity around the human team.
            </p>
            <div className="text-base font-syne font-bold text-[#FAFAF9]">
              The goal isn’t more software. The goal is more business getting done.
            </div>
          </div>
        </section>

        {/* ================= 4. WHAT WE BELIEVE SECTION ================= */}
        <WhatWeBelieveSection />

        {/* ================= 5. OUR APPROACH ================= */}
        <section className="rounded-3xl bg-gradient-to-r from-[#130C08] via-[#180E09] to-[#130C08] border border-white/[0.08] p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                Our Approach
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              Build Capacity. Don’t Add Complexity.
            </h2>

            <div className="space-y-4 text-base font-dm text-[#F5EDE4]/80 leading-relaxed text-left sm:text-center">
              <p>
                We don't want to build another complicated platform that requires an owner to become a full-time software operator.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1">
                  <div className="text-xs font-syne font-bold text-[#FAFAF9]">Works in the Background</div>
                  <p className="text-xs text-[#F5EDE4]/70">Connects seamlessly to the systems your business already uses.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1">
                  <div className="text-xs font-syne font-bold text-[#FAFAF9]">Handles Recurring Work</div>
                  <p className="text-xs text-[#F5EDE4]/70">Executes high-volume customer messages and campaigns autonomously.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1">
                  <div className="text-xs font-syne font-bold text-[#FAFAF9]">Surfaces What Matters</div>
                  <p className="text-xs text-[#F5EDE4]/70">Brings critical decisions and high-value opportunities to your attention.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1">
                  <div className="text-xs font-syne font-bold text-[#FAFAF9]">Keeps You in Control</div>
                  <p className="text-xs text-[#F5EDE4]/70">Your human team retains governance over strategy and final sign-offs.</p>
                </div>
              </div>
              <p className="pt-2 text-base font-syne font-semibold text-[#FAFAF9]">
                The technology should disappear into the workflow. The work should remain.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 6. MEET THE FOUNDER ================= */}
        <section className="rounded-3xl bg-[#130C08] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Visual Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0A0705] shadow-2xl">
                <img 
                  src={founderErnestImg} 
                  alt="Ernest Zimba - Founder & AI Systems Architect"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-transparent opacity-40" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-syne text-[#FAFAF9]">Ernest Zimba</h3>
                <div className="text-xs font-dm font-medium text-[#B83A0A]">
                  Founder & AI Systems Architect
                </div>
              </div>
            </div>

            {/* Founder Narrative */}
            <div className="lg:col-span-8 space-y-5 text-base font-dm text-[#F5EDE4]/80 leading-relaxed">
              <div className="space-y-2">
                <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                  Meet the Founder
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-syne text-[#FAFAF9]">
                  Engineering Capacity for Modern Businesses
                </h2>
              </div>

              <blockquote className="pl-4 border-l-2 border-[#B83A0A] text-lg font-syne font-semibold text-[#FAFAF9] italic">
                «Businesses should be able to grow without their workload growing at the same rate.»
              </blockquote>

              <p>
                Mupezeni was founded by Ernest Zimba with a simple conviction. His work focuses on building practical agentic AI systems that can move beyond generating responses and participate in real business workflows.
              </p>

              <p>
                The long-term vision is to build a workforce of AI employees capable of handling increasingly sophisticated business responsibilities.
              </p>

              <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] text-sm font-syne font-bold text-[#FAFAF9] flex items-center gap-2">
                <span className="text-[#B83A0A]">Not another chatbot. Not another dashboard.</span>
                <span>A new layer of capacity for modern businesses.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 7. WHERE WE'RE GOING ================= */}
        <section className="space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Where We're Going
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              The Future of Business Has More Capacity
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-5 text-base font-dm text-[#F5EDE4]/80 leading-relaxed">
            <p>
              The world's businesses are becoming increasingly digital. Customers expect faster responses. Channels multiply. Operations become more complex. The amount of work required to run a company continues to expand.
            </p>
            <p>
              Human attention, however, remains finite. That creates an enormous gap. Mupezeni is building into that gap.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#130C08] border border-white/[0.08] space-y-2">
                <div className="text-xs font-syne font-bold text-[#B83A0A] uppercase tracking-wider">
                  The Human Domain
                </div>
                <div className="text-sm font-syne font-bold text-[#FAFAF9]">
                  Judgment, Creativity & Direction
                </div>
                <p className="text-xs text-[#F5EDE4]/70">
                  Humans lead relationships, make nuanced leadership calls, and set strategic vision.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#130C08] border border-white/[0.08] space-y-2">
                <div className="text-xs font-syne font-bold text-[#B83A0A] uppercase tracking-wider">
                  The AI Domain
                </div>
                <div className="text-sm font-syne font-bold text-[#FAFAF9]">
                  Persistent Capacity & Scale
                </div>
                <p className="text-xs text-[#F5EDE4]/70">
                  AI workers handle 24/7 frontline execution, rapid replies, and recurring operational tasks.
                </p>
              </div>
            </div>

            <p className="pt-2 text-center text-[#FAFAF9] font-syne font-semibold text-lg">
              Together, they build businesses that operate beyond the limits of individual human hours.
            </p>
          </div>
        </section>

        {/* ================= 8. THE MUPEZENI BELIEF & FINAL CALL TO ACTION ================= */}
        <section className="rounded-3xl bg-gradient-to-r from-[#180C07] via-[#241109] to-[#180C07] border border-[#B83A0A]/40 p-8 sm:p-12 lg:p-16 shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Mupezeni Belief
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight">
                Growth Should Create Opportunity, Not More Work.
              </h2>
            </div>

            <div className="space-y-3 text-sm sm:text-base font-dm text-[#F5EDE4]/85 max-w-2xl mx-auto leading-relaxed">
              <p>Your business shouldn't stop when you do.</p>
              <p>It shouldn't depend on one person answering every message. It shouldn't require every follow-up to be remembered. It shouldn't require every marketing task to be manually executed. And it shouldn't require the human team to absorb every additional task that growth creates.</p>
              <p className="font-syne font-bold text-base sm:text-lg text-[#FAFAF9] pt-2">
                There should be more capacity available when the business needs it. That’s what we’re building.
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <div className="text-xl sm:text-2xl font-black font-syne tracking-wider text-[#FAFAF9]">
                MUPEZENI<span className="text-[#B83A0A]">.AI</span>
              </div>
              <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
                AI workers for businesses ready to grow beyond the limits of human capacity.
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-syne font-bold text-sm shadow-xl shadow-[#9B2208]/40 hover:scale-105 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Get Started with Your AI Workforce</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
