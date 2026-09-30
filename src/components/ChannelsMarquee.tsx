import React from 'react';
import { 
  Store, 
  MessageSquare, 
  ShoppingBag, 
  Globe, 
  Layers, 
  Smartphone,
  Share2,
  Box,
  Truck,
  Building2,
  Sparkles
} from 'lucide-react';

interface ChannelItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const RETAIL_CHANNELS: ChannelItem[] = [
  { name: 'Shopify', category: 'eCommerce Storefront', icon: ShoppingBag },
  { name: 'Online Stores', category: 'Direct Web Commerce', icon: Globe },
  { name: 'Physical Stores', category: 'In-Store & Counter', icon: Store },
  { name: 'WhatsApp', category: 'Conversational Sales', icon: MessageSquare },
  { name: 'Instagram', category: 'DMs & Social Stories', icon: Share2 },
  { name: 'Facebook', category: 'Pages & Messenger', icon: Layers },
  { name: 'TikTok', category: 'Short-form & Social', icon: Smartphone },
  { name: 'WooCommerce', category: 'WordPress Stores', icon: Box },
  { name: 'Social Commerce', category: 'Live & Creator Commerce', icon: Sparkles },
  { name: 'Websites', category: 'Custom Web Apps', icon: Globe },
  { name: 'Marketplaces', category: 'Multi-vendor Platforms', icon: Building2 },
  { name: 'Direct-to-Customer', category: 'Direct Sales Cadence', icon: Truck }
];

export const ChannelsMarquee: React.FC = () => {
  // Duplicate array for seamless infinite loop (translateX: 0 -> -50%)
  const marqueeItems = [...RETAIL_CHANNELS, ...RETAIL_CHANNELS];

  return (
    <section 
      aria-label="Supported Retail Channels"
      className="py-4 relative bg-[#070403] overflow-hidden border-t border-b border-white/[0.06]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
          
          {/* Section Heading */}
          <div className="flex-shrink-0 text-left">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-[#B83A0A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B83A0A] animate-pulse shrink-0" />
              <span>BUILT FOR RETAILERS WHO SELL THROUGH</span>
            </span>
          </div>

          {/* Marquee Track: Smooth scroll moving Right -> Left */}
          <div className="flex-1 min-w-0 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max items-center gap-3 animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused] py-1 cursor-default">
              {marqueeItems.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={`${channel.name}-${index}`}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/50 hover:bg-[#1A0F0A] transition-all duration-200 group/item shrink-0 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#0A0705] border border-white/[0.06] flex items-center justify-center text-[#B83A0A] group-hover/item:text-white transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex items-center gap-1.5 text-left">
                      <span className="text-xs font-bold font-syne text-[#FAFAF9] tracking-tight whitespace-nowrap">
                        {channel.name}
                      </span>
                      <span className="text-[10px] font-dm text-[#F5EDE4]/40 whitespace-nowrap">
                        · {channel.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
