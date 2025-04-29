
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface InvestorProfile {
  name: string;
  image: string;
  initials: string;
  title?: string;
}

const investors: InvestorProfile[] = [
  {
    name: 'Jean de La Rochebrochard',
    image: '/lovable-uploads/c7ee545b-54a6-48b1-8e56-7b587f1c1c3b.png',
    initials: 'JR',
    title: 'Kima Ventures',
  },
  {
    name: 'Roxane Varza',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    initials: 'RV',
    title: 'Station F',
  },
  {
    name: 'Guillaume Moubeche',
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    initials: 'GM',
    title: 'lemlist',
  },
  {
    name: 'Mathilde Collin',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    initials: 'MC',
    title: 'Front',
  },
  {
    name: 'Sébastien Borget',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    initials: 'SB',
    title: 'The Sandbox',
  },
];

const InvestorCarousel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full px-6"
      >
        <CarouselContent>
          {investors.map((investor, index) => (
            <CarouselItem key={investor.name} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
              <div className="flex flex-col items-center p-4 h-full bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="relative mb-3">
                  <Avatar className="w-20 h-20 border-2 border-white/20">
                    <AvatarImage src={investor.image} alt={investor.name} />
                    <AvatarFallback className="bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange text-white">
                      {investor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
                </div>
                <h3 className="font-semibold mb-0.5 text-center">{investor.name}</h3>
                {investor.title && (
                  <p className="text-sm text-white/60 text-center">{investor.title}</p>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {!isMobile && (
          <>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default InvestorCarousel;
