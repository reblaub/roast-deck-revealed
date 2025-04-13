import React from 'react';
import { Flame, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmailCapture from './EmailCapture';
import AnalysisPieChart from './AnalysisPieChart';

interface RoastFeedbackProps {
  fileName?: string;
}

const RoastFeedback: React.FC<RoastFeedbackProps> = ({ fileName }) => {
  const roastFeedback = [
    {
      section: "Executive Summary",
      feedback: "Your executive summary shows promise but lacks the punch that makes investors sit up. It's like a movie trailer that forgot to show the explosions.",
      tip: "Lead with your most compelling value proposition and include a clear, concise statement of the problem you're solving."
    },
    {
      section: "Market Size",
      feedback: "Your market analysis is good, but your TAM calculation seems... optimistic. As in 'we'll capture 10% of China' optimistic.",
      tip: "Break down your market size into TAM, SAM, and SOM with credible sources and a bottom-up calculation approach."
    },
    {
      section: "Competitive Analysis",
      feedback: "Your competitive landscape slide is missing a few giants that investors will immediately think of. This makes them question what else you might be missing.",
      tip: "Create a comprehensive competitor matrix highlighting your unique advantages and be honest about where competitors are stronger."
    },
    {
      section: "Go-to-Market Strategy",
      feedback: "Your GTM strategy needs more specifics. Currently it's like saying 'Step 1: Build product, Step 2: ???, Step 3: Profit!'",
      tip: "Outline specific customer acquisition channels with costs, conversion metrics, and a timeline for scaling."
    },
    {
      section: "Financial Projections",
      feedback: "Your financial projections show a beautiful hockey stick, but the assumptions behind them aren't clear. VCs have seen this movie before.",
      tip: "Include unit economics and realistic revenue forecasts with transparent assumptions that tie directly to your GTM strategy."
    },
    {
      section: "Team",
      feedback: "Your team slide is solid, but doesn't fully explain why this specific team is uniquely positioned to win in this market.",
      tip: "Highlight relevant domain expertise and past successes that demonstrate your unfair advantage in this specific market."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-roast-orange/20">
          <Flame className="w-6 h-6 text-roast-orange" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Roast Results</h2>
      </div>
      
      {fileName && (
        <div className="mb-6 text-white/60 text-sm">
          File analyzed: <span className="text-white font-medium">{fileName}</span>
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
            <p className="text-white/70 text-sm"><span className="text-roast-purple font-medium">Pro tip:</span> {item.tip}</p>
          </div>
        ))}
      </div>

      <AnalysisPieChart fileName={fileName} className="mb-8" />

      <div className="p-4 border border-roast-purple/20 rounded-lg bg-roast-purple/5 backdrop-blur-sm mb-8">
        <p className="text-white text-center">
          For personalized feedback from top investors who've funded unicorns, drop your email below.
        </p>
        <p className="text-white/60 text-sm text-center mt-1">
          We'll contact you.
        </p>
      </div>

      <EmailCapture />
    </div>
  );
};

export default RoastFeedback;
