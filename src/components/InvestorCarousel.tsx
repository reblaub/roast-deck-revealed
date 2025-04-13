
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
  // Sample investor data with actual profile images
  const investors: Investor[] = [
    { 
      name: "Marc Andreessen", 
      title: "Co-founder", 
      company: "Andreessen Horowitz",
      imageUrl: "https://pbs.twimg.com/profile_images/1622307688302632962/n4p8g4zF_400x400.jpg"
    },
    { 
      name: "Paul Graham", 
      title: "Co-founder", 
      company: "Y Combinator",
      imageUrl: "https://pbs.twimg.com/profile_images/1824002576/pg-railsconf_400x400.jpg"
    },
    { 
      name: "Alexis Ohanian", 
      title: "Co-founder", 
      company: "Reddit & Seven Seven Six",
      imageUrl: "https://pbs.twimg.com/profile_images/1754864807753474048/7QQvGnGU_400x400.jpg"
    },
    { 
      name: "Garry Tan", 
      title: "President & CEO", 
      company: "Y Combinator",
      imageUrl: "https://pbs.twimg.com/profile_images/1710301089875816448/WJZrrY-e_400x400.jpg"
    },
    { 
      name: "Sarah Tavel", 
      title: "General Partner", 
      company: "Benchmark",
      imageUrl: "https://pbs.twimg.com/profile_images/1485630043748503560/p40k5Gmi_400x400.jpg"
    },
    { 
      name: "Fred Wilson", 
      title: "Co-founder", 
      company: "Union Square Ventures",
      imageUrl: "https://pbs.twimg.com/profile_images/1129000778137300992/Zkek0UD7_400x400.png"
    },
    { 
      name: "Bill Gurley", 
      title: "General Partner", 
      company: "Benchmark",
      imageUrl: "https://pbs.twimg.com/profile_images/1756071581577302016/U2GvIuIl_400x400.jpg"
    },
    { 
      name: "Mary Meeker", 
      title: "Founder", 
      company: "Bond Capital",
      imageUrl: "https://bond.tech/wp-content/uploads/2022/04/Mary_Meeker-4.jpg"
    },
    { 
      name: "Naval Ravikant", 
      title: "Co-founder", 
      company: "AngelList",
      imageUrl: "https://pbs.twimg.com/profile_images/1720821605398499328/TzK9tXpE_400x400.jpg"
    },
    { 
      name: "Chamath Palihapitiya", 
      title: "CEO", 
      company: "Social Capital",
      imageUrl: "https://pbs.twimg.com/profile_images/1455606877418692611/FXzZ9ytv_400x400.jpg"
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
