
import React from 'react';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Investor {
  name: string;
  title: string;
  company: string;
  imageUrl?: string;
}

const InvestorCarousel: React.FC = () => {
  // Sample investor data with profile images
  const investors: Investor[] = [
    { 
      name: "Marc Andreessen", 
      title: "Co-founder", 
      company: "Andreessen Horowitz",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Paul Graham", 
      title: "Co-founder", 
      company: "Y Combinator",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Alexis Ohanian", 
      title: "Co-founder", 
      company: "Reddit & Seven Seven Six",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Garry Tan", 
      title: "President & CEO", 
      company: "Y Combinator",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Sarah Tavel", 
      title: "General Partner", 
      company: "Benchmark",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Fred Wilson", 
      title: "Co-founder", 
      company: "Union Square Ventures",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Bill Gurley", 
      title: "General Partner", 
      company: "Benchmark",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Mary Meeker", 
      title: "Founder", 
      company: "Bond Capital",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Naval Ravikant", 
      title: "Co-founder", 
      company: "AngelList",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    { 
      name: "Chamath Palihapitiya", 
      title: "CEO", 
      company: "Social Capital",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-carousel gap-4 px-4">
        {/* First set of investors */}
        {investors.map((investor, index) => (
          <div 
            key={`investor-1-${index}`}
            className="flex-shrink-0 w-64 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="border border-white/10">
                <AvatarImage src={investor.imageUrl} alt={investor.name} />
                <AvatarFallback className="bg-roast-purple/20 text-roast-purple">
                  {investor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h3 className="font-semibold text-white">{investor.name}</h3>
                <p className="text-xs text-white/60">{investor.title}, {investor.company}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Duplicate set for infinite scroll effect */}
        {investors.map((investor, index) => (
          <div 
            key={`investor-2-${index}`}
            className="flex-shrink-0 w-64 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="border border-white/10">
                <AvatarImage src={investor.imageUrl} alt={investor.name} />
                <AvatarFallback className="bg-roast-purple/20 text-roast-purple">
                  {investor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h3 className="font-semibold text-white">{investor.name}</h3>
                <p className="text-xs text-white/60">{investor.title}, {investor.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorCarousel;
