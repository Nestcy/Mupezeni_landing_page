import React from 'react';
import { 
  Store, 
  MessageSquare, 
  Share2, 
  ShoppingBag, 
  Globe, 
  Video,
  Box,
  Layers,
  ArrowDown, 
  Sparkles, 
  Bot,
  CheckCircle2
} from 'lucide-react';

interface ChannelItem {
  name: string;
  category: string;
  iconNode: React.ReactNode;
}

const CHANNELS: ChannelItem[] = [
  {
    name: 'Physical Shop',
    category: 'Counter & In-Store Hub',
    iconNode: <Store className="w-5 h-5 text-[#D95A1A]" />
  },
  {
    name: 'WhatsApp',
    category: 'Conversational Commerce',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.05 7.42C8.86 7.42 8.56 7.49 8.3 7.78C8.04 8.06 7.31 8.75 7.31 10.15C7.31 11.55 8.33 12.9 8.47 13.09C8.62 13.29 10.43 16.19 13.26 17.31C15.22 18.09 15.93 17.88 16.63 17.75C17.43 17.6 18.42 16.94 18.68 16.21C18.94 15.48 18.94 14.86 18.86 14.73C18.79 14.6 18.59 14.52 18.3 14.37C18 14.22 16.55 13.51 16.28 13.41C16.01 13.31 15.82 13.26 15.62 13.55C15.43 13.84 14.88 14.52 14.71 14.71C14.54 14.91 14.38 14.93 14.08 14.78C13.79 14.63 12.84 14.32 11.72 13.32C10.84 12.54 10.25 11.57 10.08 11.28C9.91 10.98 10.06 10.83 10.21 10.68C10.34 10.55 10.5 10.34 10.65 10.17C10.8 10 10.85 9.88 10.95 9.68C11.05 9.48 11 9.31 10.93 9.17C10.85 9.02 10.27 7.58 10.03 7C9.79 6.44 9.55 6.52 9.37 6.51C9.2 6.5 9 6.5 8.81 6.5L9.05 7.42Z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    category: 'Pages & Messenger',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V14.8H7.5V12H10V9.8C10 7.33 11.47 6 13.72 6C14.8 6 15.93 6.2 15.93 6.2V8.63H14.68C13.46 8.63 13.08 9.39 13.08 10.17V12H15.82L15.38 14.8H13.08V21.8C17.64 20.87 22 16.84 22 12Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    category: 'DMs & Stories',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Shopify',
    category: 'eCommerce Storefront',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M19.92 6.35C19.86 6.18 19.68 6.07 19.49 6.08C19.34 6.09 17.5 6.22 17.5 6.22C17.5 6.22 16.03 4.79 15.86 4.62C15.69 4.45 15.34 4.54 15.22 4.63C15.19 4.66 14.47 5.25 13.56 5.99C13.23 4.72 12.39 3.5 10.97 3.5C10.74 3.5 10.5 3.54 10.27 3.63C9.56 3.03 8.65 2.75 7.82 2.92C6.46 3.19 5.86 4.35 5.76 5.23C5.1 5.72 4.48 6.18 4.45 6.2C4.24 6.36 4.2 6.64 4.29 6.84L7.54 20.24C7.63 20.61 7.96 20.87 8.34 20.87H15.75C16.12 20.87 16.45 20.61 16.54 20.24L19.92 6.35ZM11.19 5.09C11.75 5.09 12.18 5.74 12.33 6.99L8.71 9.94C8.91 7.54 9.98 5.09 11.19 5.09ZM7.56 4.49C7.79 4.44 8.24 4.5 8.74 4.9C8.38 6.05 8.16 7.49 8.13 8.91L5.99 10.65C6.18 9.07 6.78 4.65 7.56 4.49ZM13.88 15.75C13.28 15.75 12.87 15.36 12.56 14.92L12.44 14.75L11.76 17.06C11.45 18.11 10.67 18.15 10.37 18.15C10.15 18.15 9.96 18.06 9.87 17.9C9.76 17.72 9.77 17.47 9.89 17.06L11.08 13.06C10.87 12.63 10.74 12.11 10.74 11.53C10.74 9.77 11.83 8.44 13.43 8.44C14.49 8.44 15.17 9.17 15.17 10.22C15.17 11.86 13.62 12.42 12.83 12.42C12.82 12.55 12.82 12.67 12.84 12.8C12.98 13.47 13.48 13.79 14.07 13.79C14.61 13.79 15.01 13.56 15.34 13.31L15.65 14.62C15.18 15.28 14.48 15.75 13.88 15.75ZM13.35 10.17C13.04 10.17 12.78 10.48 12.78 11.02C12.78 11.19 12.81 11.36 12.86 11.51C13.42 11.44 14.03 11.08 14.03 10.51C14.03 10.28 13.76 10.17 13.35 10.17Z" />
      </svg>
    ),
  },
  {
    name: 'WooCommerce',
    category: 'WordPress Store',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M2.2 4.5C1 4.5 0 5.5 0 6.7v9.4c0 1.2 1 2.2 2.2 2.2h12.5l4.5 3.7c.3.2.7.3 1 .1.3-.1.5-.4.5-.8v-3h1.1c1.2 0 2.2-1 2.2-2.2V6.7c0-1.2-1-2.2-2.2-2.2H2.2zm3.1 3.4c.7 0 1.2.3 1.5.8l1.4 3.9 1.4-3.9c.3-.5.8-.8 1.5-.8s1.2.3 1.5.8l1.4 3.9 1.4-3.9c.3-.5.8-.8 1.5-.8.9 0 1.6.7 1.6 1.6 0 .3-.1.6-.2.8l-2.4 6.2c-.3.7-.9 1.1-1.6 1.1-.7 0-1.3-.4-1.6-1.1L12 10.8l-1.5 3.8c-.3.7-.9 1.1-1.6 1.1-.7 0-1.3-.4-1.6-1.1L4.9 8.4C4.8 8.2 4.7 7.9 4.7 7.6c0-.9.7-1.6 1.6-1.6z" />
      </svg>
    ),
  },
  {
    name: 'TikTok Shop',
    category: 'Social Commerce',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.44-.03 2.74-.97 3.19-2.32.22-.58.29-1.21.28-1.83V.02h-.01z" />
      </svg>
    ),
  },
  {
    name: 'Amazon',
    category: 'Marketplace',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M13.73 13.92C13.56 13.99 13.3 14.04 12.98 14.04C11.51 14.04 10.74 13.16 10.74 11.57C10.74 9.94 11.66 8.94 13.14 8.94C13.48 8.94 13.73 8.99 13.88 9.07V13.92M15.8 17.5V16.33C15.17 17.27 14.15 17.73 12.75 17.73C10.23 17.73 8.65 15.93 8.65 13.06C8.65 10.3 10.33 8.35 12.92 8.35C14.08 8.35 14.99 8.75 15.65 9.53V6.2H17.8V17.5H15.8M1.8 17.75C6.44 21.03 12.77 22.14 18.42 20.35C18.66 20.27 18.89 20.08 18.86 19.82C18.82 19.56 18.57 19.46 18.33 19.53C13.04 21.14 7.15 20.07 2.83 17.03C2.47 16.78 2.05 17.22 2.37 17.51L1.8 17.75M21.94 19.33C21.46 18.73 19.06 18.55 17.96 18.69C17.62 18.73 17.65 19.05 17.96 19.26C19.98 20.59 21.6 20.73 21.9 20.35C22.19 19.96 22.09 19.53 21.94 19.33Z" />
      </svg>
    ),
  },
  {
    name: 'eBay',
    category: 'Marketplace',
    iconNode: (
      <svg className="w-5 h-5 fill-current text-[#D95A1A]" viewBox="0 0 24 24">
        <path d="M5.54 11.23c-.76 0-1.39.54-1.5 1.25H9.6c-.16-.76-.78-1.25-1.56-1.25-.79 0-1.74.01-2.5.01zm-3.35.34c.16-2.07 1.83-3.69 3.93-3.69 2.15 0 3.86 1.64 3.98 3.75h-7.91zm14.36-3.8c-.89 0-1.64.44-2.11 1.11V4.28h-2.1v10.45h2.03v-.99c.47.66 1.23 1.09 2.14 1.09 1.77 0 3.25-1.47 3.25-3.52 0-2.06-1.47-3.54-3.21-3.54zm-.43 5.4c-.9 0-1.63-.73-1.63-1.85 0-1.12.73-1.85 1.63-1.85.89 0 1.63.73 1.63 1.85 0 1.12-.74 1.85-1.63 1.85zm6.54-5.3h-2.16l-2.08 6.55-1.92-6.55h-2.22l3.05 8.78-1.39 3.99h2.17l4.55-12.77z" />
      </svg>
    ),
  },
];

export const ChannelsMarquee: React.FC = () => {
  const marqueeItems = [...CHANNELS, ...CHANNELS, ...CHANNELS];

  return (
    <section 
      aria-label="Supported Sales Channels"
      className="py-6 sm:py-16 relative bg-[#0A0705] overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3.5 sm:mb-6 text-center">
        <h3 className="text-xs sm:text-base font-bold tracking-wider text-[#FAFAF9]/80 uppercase font-syne mb-1 sm:mb-2">
          Built for retailers selling everywhere.
        </h3>
        <p className="text-[11px] sm:text-xs text-[#FAFAF9]/50 max-w-xl mx-auto">
          Seamlessly compatible with the channels and sales platforms you already use to serve customers every day.
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-2.5 sm:gap-4 animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused] py-1.5 sm:py-2 cursor-default">
          {marqueeItems.map((channel, index) => (
            <div
              key={`${channel.name}-${index}`}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-[#130C08]/90 border border-white/5 hover:border-[#9B2208]/40 hover:bg-[#1A0E08] transition-all duration-300 group/item flex-shrink-0 shadow-sm shadow-black/40"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#20110A] border border-[#9B2208]/30 flex items-center justify-center text-[#FAFAF9]/70 group-hover/item:text-[#D95A1A] group-hover/item:border-[#D95A1A]/50 transition-colors flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                {channel.iconNode}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-sm font-bold font-syne text-[#FAFAF9]/90 group-hover/item:text-white transition-colors tracking-tight">
                  {channel.name}
                </span>
                <span className="text-[9px] sm:text-[11px] font-medium text-[#FAFAF9]/60 font-body">
                  {channel.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
