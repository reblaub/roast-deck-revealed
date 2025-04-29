
import React from 'react';
import { Flame, FileCheck } from 'lucide-react';
import AnalysisPieChart from './AnalysisPieChart';

interface RoastFeedbackProps {
  fileName?: string;
  roastData?: {
    summary?: string;
    fullRoast?: string;
    sections?: Array<{
      section: string;
      feedback: string;
      tip: string;
    }>;
  };
}

const RoastFeedback: React.FC<RoastFeedbackProps> = ({ fileName, roastData }) => {
  // Use AI-generated roast data if available, otherwise use default feedback
  const roastFeedback = roastData?.sections || [
    {
      section: "Executive Summary",
      feedback: "Your executive summary lacks clarity. I've seen thousands of pitch decks, and I still don't understand what you're actually building here. Cut the jargon.",
      tip: "State what you do in one clear sentence that my grandmother would understand."
    },
    {
      section: "Market Size",
      feedback: "Let me guess, you're targeting a €1B+ market? Your TAM calculation starts with the population of Earth and goes down from there. Completely unrealistic.",
      tip: "Start with your actual target users and build up with real data. No more '1% of China' nonsense."
    },
    {
      section: "Competitive Analysis",
      feedback: "Your competitive landscape mysteriously omits the three major players everyone knows about. This tells me either you don't know your market or you're hiding something.",
      tip: "Be honest about competitors. We know they exist, and we want to hear why you'll win anyway."
    },
    {
      section: "Go-to-Market Strategy",
      feedback: "Your GTM reads like: Step 1: Build product. Step 2: ??? Step 3: IPO. There's no actual plan for acquiring users beyond 'viral growth'.",
      tip: "Detail specific customer acquisition channels, costs, and timeline with realistic metrics."
    },
    {
      section: "Financial Projections",
      feedback: "Your financial projections show you reaching €100M ARR in year 3. I've seen unicorns that didn't grow this fast. Pure fantasy.",
      tip: "Model conservative, middle, and stretch scenarios with unit economics that make mathematical sense."
    },
    {
      section: "Team",
      feedback: "Your team slide says you're 'serial entrepreneurs', but I can't find any previous successful exits. Experience in the domain you're targeting is conspicuously absent.",
      tip: "Highlight relevant domain expertise and explain why this specific team has an unfair advantage in this market."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-roast-orange/20">
          <Flame className="w-6 h-6 text-roast-orange" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Roasted by Your Custom Assistant</h2>
      </div>
      
      {fileName && (
        <div className="mb-6 text-white/60 text-sm">
          File analyzed: <span className="text-white font-medium">{fileName}</span>
        </div>
      )}

      {roastData?.fullRoast && (
        <div className="mb-6 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <p className="text-white/90 italic">{roastData.fullRoast}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        {roastFeedback.map((item, index) => (
          <div 
            key={index} 
            className="p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-roast-blue" />
              <h3 className="font-semibold text-roast-blue">{item.section}</h3>
            </div>
            <p className="text-white mb-3">{item.feedback}</p>
            <p className="text-white/70 text-sm">
              <span className="text-roast-purple font-medium">Pro Tip:</span> {item.tip}
            </p>
          </div>
        ))}
      </div>

      <AnalysisPieChart fileName={fileName} className="mb-8" />
    </div>
  );
};

export default RoastFeedback;
