
import React from 'react';
import { Flame, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmailCapture from './EmailCapture';

interface RoastFeedbackProps {
  fileName?: string;
}

const RoastFeedback: React.FC<RoastFeedbackProps> = ({ fileName }) => {
  // More balanced feedback with constructive criticism and humor
  const roastFeedback = [
    {
      section: "Executive Summary",
      feedback: "Your executive summary is like a first date that only talks about themselves. VCs need to know what's in it for them, not just how great you think you are.",
      tip: "Focus on the problem, solution, and market opportunity within the first 30 seconds."
    },
    {
      section: "Market Size",
      feedback: "Your TAM calculation is... ambitious. By 'ambitious' I mean 'completely detached from reality'.",
      tip: "Break down your market size into TAM, SAM, and SOM with credible sources backing your numbers."
    },
    {
      section: "Competitive Analysis",
      feedback: "Your competitive analysis conveniently omits every serious competitor in your space. VCs Google too, you know.",
      tip: "Include a comprehensive competitor matrix and highlight your unique advantages."
    },
    {
      section: "Go-to-Market Strategy",
      feedback: "Your go-to-market strategy seems to be 'if we build it, they will come'. Spoiler alert: they won't.",
      tip: "Outline specific customer acquisition channels, costs, and timelines."
    },
    {
      section: "Financial Projections",
      feedback: "Your hockey stick growth projections might impress the NHL, but VCs have seen this movie before.",
      tip: "Include unit economics, cash burn rate, and realistic revenue forecasts with clear assumptions."
    },
    {
      section: "Team",
      feedback: "Your team slide suggests your 'blockchain expert' took a Udemy course last week. VCs fund teams more than ideas.",
      tip: "Highlight relevant experience and why this specific team is uniquely positioned to win."
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

      <div className="mb-8 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
        <p className="text-white italic">
          "This deck has potential, but like most early pitches, it needs refinement in key areas that investors scrutinize. Here's our quick analysis:"
        </p>
      </div>
      
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

      <div className="p-4 border border-roast-purple/20 rounded-lg bg-roast-purple/5 backdrop-blur-sm mb-8">
        <p className="text-white text-center">
          Want a complete analysis with personalized feedback from top investors who've funded unicorns?
        </p>
      </div>

      {/* We're using the existing EmailCapture component here */}
      <EmailCapture />
    </div>
  );
};

export default RoastFeedback;
