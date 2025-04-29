
import React from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface EgoDumpHeaderProps {
  onShareStory: () => void;
}

const EgoDumpHeader: React.FC<EgoDumpHeaderProps> = ({ onShareStory }) => (
  <div className="relative overflow-hidden mb-12 sm:mb-20 bg-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-8">
    <div className="text-center relative z-10">
      <div className="mb-6">
        <Logo className="mx-auto scale-110 sm:scale-125" />
      </div>
      <div className="relative">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-roast-orange via-roast-purple to-roast-blue bg-clip-text text-transparent animate-gradient-x tracking-tighter">
          The Ego Dump
        </h1>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-roast-orange/30 blur-3xl opacity-50 animate-pulse-slow" />
      </div>
      <div className="max-w-2xl mx-auto relative">
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 font-light">
          Even the biggest success stories faced countless rejections.
        </p>
        <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
          Your pitch deck might be perfect, but rejection is part of the journey.
          Share your best "rejection excuse" from VCs or angel investors.
        </p>
        <div className="flex items-center justify-center my-6 sm:my-10">
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-roast-orange to-transparent" />
          <div className="mx-4 text-roast-orange text-xl sm:text-2xl">🔥</div>
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-roast-orange to-transparent" />
        </div>
      </div>
    </div>
    <div className="text-center mb-8 sm:mb-12">
      <Button 
        variant="ghost" 
        className="animate-float text-white/60 hover:text-white hover:bg-white/10 group"
        onClick={onShareStory}
      >
        <span className="mr-2">Read rejection stories</span>
        <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
      </Button>
    </div>
  </div>
);

export default EgoDumpHeader;
