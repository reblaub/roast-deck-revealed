
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import FileUploader from '@/components/FileUploader';
import TextBubble from '@/components/TextBubble';
import SignupForm from '@/components/SignupForm';
import { Button } from '@/components/ui/button';
import { MessageSquareHeart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import UserMenu from '@/components/UserMenu';

const Index = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const isMobile = useIsMobile();

  const handleAnalysisComplete = () => {
    setAnalysisComplete(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Header with navigation */}
        <div className="flex justify-between mb-4">
          <div></div> {/* Empty div for flex spacing */}
          <div className="flex items-center gap-2">
            <Link to="/ego-dump">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <MessageSquareHeart className="mr-2 h-5 w-5" />
                <span>The Ego Dump</span>
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
        
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
          
          {/* Primary CTA - File Upload Area */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white">Try our free instant roast</h3>
              <p className="text-white/70 mt-1">Upload your deck and get immediate feedback</p>
            </div>
            <FileUploader 
              onFileUpload={(file) => console.log("File uploaded:", file.name)}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </div>
          
          {/* Secondary CTA - Email Signup for premium feedback */}
          <div className="w-full max-w-xl mx-auto mt-8 mb-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gradient mb-4 text-center">
              Get expert feedback on your pitch deck
            </h2>
            <p className="text-white/70 mb-6 text-center">
              Sign up to receive personalized insights from top investors directly to your inbox
            </p>
            <SignupForm />
          </div>
          
          {/* Link to Ego Dump */}
          <div className="mt-6">
            <Link to="/ego-dump">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <MessageSquareHeart className="mr-2 h-5 w-5" />
                <span>Share your rejection stories</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Only show text bubbles on initial state, not after analysis */}
        {!analysisComplete && !isMobile && (
          <>
            <TextBubble message="I fell asleep at slide 2" position="left" className="top-[28%] left-[10%]" />
            <TextBubble message="After 6 slides I still don't know what the product is" position="right" className="top-[22%] right-[10%]" />
            <TextBubble message="This hurts my eyes" position="left" className="top-[40%] left-[15%]" />
            <TextBubble message="What's your TAM?" position="right" className="top-[38%] right-[15%]" />
            <TextBubble message="I don't see any GtM slides, why?" position="left" className="top-[52%] left-[12%]" />
            <TextBubble message="If the slide message isn't in the title, not gonna read it" position="right" className="top-[48%] right-[12%]" />
            <TextBubble message="Slide 8, my grandma could make a better design" position="left" className="top-[60%] left-[14%]" />
          </>
        )}
        
        {/* Show fewer, more spaced bubbles on mobile and reposition them to avoid overlapping with main content */}
        {!analysisComplete && isMobile && (
          <>
            <TextBubble message="I fell asleep at slide 2" position="left" className="top-[15%]" />
            <TextBubble message="This hurts my eyes" position="right" className="top-[30%]" />
            <TextBubble message="What's your TAM?" position="left" className="top-[70%]" />
            <TextBubble message="If the message isn't in the title, not reading it" position="right" className="top-[85%]" />
          </>
        )}
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 mt-auto">
        <div className="container text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Roast. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Gradient Orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full bg-roast-purple/10 blur-3xl opacity-20 animate-pulse-slow" />
      <div className="fixed bottom-20 right-20 w-96 h-96 rounded-full bg-roast-orange/10 blur-3xl opacity-20 animate-pulse-slow" />
    </div>
  );
};

export default Index;
