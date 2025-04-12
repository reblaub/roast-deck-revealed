import React from 'react';
import { Users } from 'lucide-react';

interface Investor {
  name: string;
  title: string;
  company: string;
}

const InvestorCarousel: React.FC = () => {
  // Sample investor data
  const investors: Investor[] = [
    { name: "Marc Andreessen", title: "Co-founder", company: "Andreessen Horowitz" },
    { name: "Paul Graham", title: "Co-founder", company: "Y Combinator" },
    { name: "Alexis Ohanian", title: "Co-founder", company: "Reddit & Seven Seven Six" },
    { name: "Garry Tan", title: "President & CEO", company: "Y Combinator" },
    { name: "Sarah Tavel", title: "General Partner", company: "Benchmark" },
    { name: "Fred Wilson", title: "Co-founder", company: "Union Square Ventures" },
    { name: "Bill Gurley", title: "General Partner", company: "Benchmark" },
    { name: "Mary Meeker", title: "Founder", company: "Bond Capital" },
    { name: "Naval Ravikant", title: "Co-founder", company: "AngelList" },
    { name: "Chamath Palihapitiya", title: "CEO", company: "Social Capital" },
  ];

  return (
    <div className="w-full py-10 bg-black border-t border-white/10">
      <div className="container mx-auto text-center mb-6">
        <h2 className="text-2xl font-bold text-gradient mb-1">Upcoming Roasters</h2>
        <p className="text-white/60 text-sm">Be prepared to be roasted by...</p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="flex animate-carousel gap-4 px-4">
          {/* First set of investors */}
          {investors.map((investor, index) => (
            <div 
              key={`investor-1-${index}`}
              className="flex-shrink-0 w-64 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-roast-purple/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-roast-purple" />
                </div>
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
                <div className="w-10 h-10 rounded-full bg-roast-purple/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-roast-purple" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">{investor.name}</h3>
                  <p className="text-xs text-white/60">{investor.title}, {investor.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorCarousel;
