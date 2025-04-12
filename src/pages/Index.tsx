
import React from 'react';
import Logo from '@/components/Logo';
import FileUploader from '@/components/FileUploader';
import TextBubble from '@/components/TextBubble';
import InvestorProfiles from '@/components/InvestorProfiles';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-16 gap-10">
          {/* Logo */}
          <div className="mb-4">
            <Logo className="text-center w-full" />
          </div>
          
          {/* Main Hero Text */}
          <div className="text-center max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              Let us roast your pitch deck
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Hear the hard truth before it's too late
            </p>
          </div>
          
          {/* File Upload Area */}
          <div className="w-full max-w-2xl mx-auto my-8">
            <FileUploader 
              onFileUpload={(file) => console.log("File uploaded:", file.name)} 
            />
          </div>
        </div>
        
        {/* Investor Profiles Section */}
        <InvestorProfiles />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 mt-auto">
        <div className="container text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Roast. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Text Bubbles - Repositioned around the drag and drop area */}
      <TextBubble message="I fell asleep at slide 2" position="left" className="top-[28%] left-[10%]" />
      <TextBubble message="After 6 slides I still don't know what the product is" position="right" className="top-[22%] right-[10%]" />
      <TextBubble message="This hurts my eyes" position="left" className="top-[40%] left-[15%]" />
      <TextBubble message="What's your TAM?" position="right" className="top-[38%] right-[15%]" />
      <TextBubble message="I don't see any GtM slides, why?" position="left" className="top-[52%] left-[12%]" />
      <TextBubble message="If the slide message isn't in the title, not gonna read it" position="right" className="top-[48%] right-[12%]" />
      <TextBubble message="Slide 8, my grandma could make a better design" position="left" className="top-[60%] left-[14%]" />
      
      {/* Gradient Orbs (Background Effects) */}
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full bg-roast-purple/10 blur-3xl opacity-20 animate-pulse-slow" />
      <div className="fixed bottom-20 right-20 w-96 h-96 rounded-full bg-roast-orange/10 blur-3xl opacity-20 animate-pulse-slow" />
    </div>
  );
};

export default Index;
