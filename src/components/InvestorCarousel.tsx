
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from '@/components/ui/carousel';

interface Investor {
  name: string;
  image: string;
  initials: string;
}

// Extended list of investors
const investors: Investor[] = [
  {
    name: 'Roxane Varza',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    initials: 'RV',
  },
  {
    name: 'Jean de la Rochebrochard',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    initials: 'JR',
  },
  {
    name: 'Guillaume Moubeche',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    initials: 'GM',
  },
  {
    name: 'Marc Andreessen',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
    initials: 'MA',
  },
  {
    name: 'Sarah Tavel',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    initials: 'ST',
  },
  {
    name: 'Paul Graham',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    initials: 'PG',
  },
  {
    name: 'Jessica Livingston',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    initials: 'JL',
  },
  {
    name: 'John Doerr',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    initials: 'JD',
  },
  {
    name: 'Mary Meeker',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    initials: 'MM',
  },
  {
    name: 'Chamath Palihapitiya',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
    initials: 'CP',
  },
];

const InvestorCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        
        // Reset scroll position when reaching the end
        const scrollWidth = carouselRef.current.scrollWidth;
        const viewportWidth = carouselRef.current.clientWidth;
        
        if (carouselRef.current.scrollLeft >= scrollWidth - viewportWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 md:py-12 w-full overflow-hidden border-t border-white/10">
      <div className="container px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gradient text-center">
          Upcoming roasters
        </h2>
        <p className="text-center text-white/70 mb-8">
          Be prepared to be roasted by the ones who know best
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex gap-6 px-8 pb-4 overflow-x-auto scrollbar-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {investors.map((investor, index) => (
            <div 
              key={investor.name} 
              className="flex flex-col items-center flex-none"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                <Avatar className="w-16 h-16 md:w-20 md:h-20 animate-float border-2 border-white/20">
                  <AvatarImage src={investor.image} alt={investor.name} />
                  <AvatarFallback className="bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange text-white">
                    {investor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
              </div>
              <p className="mt-2 text-xs md:text-sm font-medium text-white/70">{investor.name}</p>
            </div>
          ))}
          
          {/* Add duplicates for seamless looping */}
          {investors.slice(0, 4).map((investor, index) => (
            <div 
              key={`${investor.name}-dup`} 
              className="flex flex-col items-center flex-none"
              style={{ animationDelay: `${(investors.length + index) * 0.2}s` }}
            >
              <div className="relative">
                <Avatar className="w-16 h-16 md:w-20 md:h-20 animate-float border-2 border-white/20">
                  <AvatarImage src={investor.image} alt={investor.name} />
                  <AvatarFallback className="bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange text-white">
                    {investor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
              </div>
              <p className="mt-2 text-xs md:text-sm font-medium text-white/70">{investor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorCarousel;
