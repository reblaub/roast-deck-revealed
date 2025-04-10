
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface Investor {
  name: string;
  image: string;
  initials: string;
  delay: number;
}

const investors: Investor[] = [
  {
    name: 'Roxane Varza',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    initials: 'RV',
    delay: 0,
  },
  {
    name: 'Jean de la Rochebrochard',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    initials: 'JR',
    delay: 1,
  },
  {
    name: 'Guillaume Moubeche',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    initials: 'GM',
    delay: 2,
  },
];

const InvestorProfiles = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-8 md:py-16 flex flex-col items-center px-4">
      <h2 className="text-xl md:text-3xl font-semibold mb-6 md:mb-8 text-gradient text-center">
        Be prepared to be roasted by the ones who know best, {!isMobile && <br />}
        <span className="italic">la crème de la crème</span>
      </h2>
      
      <div className="flex justify-center items-center flex-wrap gap-4 md:gap-10 mb-6 md:mb-8">
        {investors.map((investor) => (
          <div 
            key={investor.name} 
            className="flex flex-col items-center"
          >
            <div 
              className="relative" 
              style={{ animationDelay: `${investor.delay * 0.5}s` }}
            >
              <Avatar className="w-16 h-16 md:w-24 md:h-24 animate-float border-2 border-white/20">
                <AvatarImage src={investor.image} alt={investor.name} />
                <AvatarFallback className="bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange text-white text-sm md:text-base">
                  {investor.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
            </div>
            <p className="mt-2 md:mt-3 text-xs md:text-sm font-medium text-white/70">{investor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorProfiles;
