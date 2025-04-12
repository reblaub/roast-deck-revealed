
import React from 'react';
import { Flame } from 'lucide-react';

interface RoastFeedbackProps {
  fileName?: string;
}

const RoastFeedback: React.FC<RoastFeedbackProps> = ({ fileName }) => {
  // Predefined roast feedback comments
  const roastComments = [
    "Your deck has so many slides, even the VCs have started using it as a sleep aid.",
    "I've seen more compelling storylines in fortune cookies than in your executive summary.",
    "Your TAM calculation is ambitious. By 'ambitious' I mean 'completely detached from reality'.",
    "Your go-to-market strategy is basically 'if we build it, they will come'. Spoiler alert: they won't.",
    "You mentioned 'AI-driven' 17 times but didn't explain a single actual AI feature.",
    "Your financial projections appear to be based on unicorn tears and fairy dust.",
    "The competitive analysis conveniently omits every serious competitor in your space.",
    "Your team slide suggests your 'blockchain expert' took a Udemy course last week.",
    "Congratulations on creating the world's first pitch deck with absolutely zero white space.",
    "I see you've mastered the art of using industry buzzwords without saying anything meaningful."
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-12">
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
      
      <div className="space-y-4">
        {roastComments.map((comment, index) => (
          <div 
            key={index} 
            className="p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
          >
            <p className="text-white">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoastFeedback;
