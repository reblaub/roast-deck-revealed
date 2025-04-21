
import React from 'react';

const EgoDumpQuote = () => (
  <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-roast-purple/5 via-transparent to-roast-orange/5 rounded-xl pointer-events-none" />
    <div className="p-4 sm:p-8 border border-white/5 rounded-xl backdrop-blur-sm">
      <div className="text-4xl sm:text-5xl text-white/30 mb-3 sm:mb-4">"</div>
      <blockquote className="italic text-lg sm:text-xl text-white/80 mb-4 sm:mb-6">
        I've missed more than 9,000 shots in my career. I've lost almost 300 games. Twenty-six times I've been trusted to take the game-winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.
      </blockquote>
      <cite className="text-white/60 text-base sm:text-lg">— Michael Jordan</cite>
    </div>
  </div>
);

export default EgoDumpQuote;
