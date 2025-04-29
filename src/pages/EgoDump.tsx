
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import EgoDumpHeader from '@/components/EgoDumpHeader';
import EgoDumpStoryForm from '@/components/EgoDumpStoryForm';
import EgoDumpRejectionList from '@/components/EgoDumpRejectionList';
import { useAuth } from '@/contexts/AuthContext';

// Define a type for rejection stories
type Rejection = {
  id: number;
  author: string;
  story: string;
  likes: number;
  liked: boolean;
};

const EgoDump = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const rejectionsRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Sample rejection stories
  const [rejections, setRejections] = useState<Rejection[]>([
    {
      id: 1,
      author: "Anonymous Founder",
      story: "Got an email from an investor that said 'Your idea is interesting but we don't see a market for it.' Three months later they funded our competitor.",
      likes: 24,
      liked: false
    },
    {
      id: 2,
      author: "Tech Entrepreneur",
      story: "Pitch meeting was going great until the VC asked how old I was. When I said 42, he said 'We typically invest in founders under 30.' I'd already built and sold two companies!",
      likes: 56,
      liked: true
    },
    {
      id: 3,
      author: "SaaS Founder",
      story: "Investor told me my valuation was too high. When I asked what they thought was reasonable, they suggested a number 75% lower than market rate. I walked out.",
      likes: 18,
      liked: false
    }
  ]);
  
  const handleNewSubmission = () => {
    toast({
      title: "Submission received!",
      description: "Your rejection story has been added to the dump.",
    });
    setFormVisible(false);
    // Optionally, you could add logic here to refresh the rejection stories
  };
  
  const scrollToRejections = () => {
    rejectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLike = (id: number) => {
    setRejections(prevRejections => 
      prevRejections.map(rejection => 
        rejection.id === id ? 
          { ...rejection, likes: rejection.liked ? rejection.likes - 1 : rejection.likes + 1, liked: !rejection.liked } : 
          rejection
      )
    );
  };

  const handleShare = (story: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'EgoDump Rejection Story',
        text: story
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(story);
      toast({
        title: "Copied to clipboard",
        description: "Rejection story copied to clipboard."
      });
    }
  };

  const scrollToNext = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop += 200;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-16 pb-20 px-6 max-w-6xl mx-auto">
        <EgoDumpHeader onScrollToRejections={scrollToRejections} />
        
        {/* Story Form Section */}
        <div className="mt-16">
          {formVisible ? (
            <EgoDumpStoryForm 
              onSubmit={handleNewSubmission}
              onCancel={() => setFormVisible(false)}
            />
          ) : (
            <div className="text-center">
              <Button 
                onClick={() => setFormVisible(true)}
                className="bg-gradient-to-r from-roast-purple to-roast-blue hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl"
              >
                Share Your Rejection Story
              </Button>
            </div>
          )}
        </div>
        
        {/* Rejections List Section */}
        <div ref={rejectionsRef} className="mt-24">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            Rejection Wall of "Fame"
          </h2>
          <EgoDumpRejectionList 
            rejections={rejections}
            onLike={handleLike}
            onShare={handleShare}
            onScrollToNext={scrollToNext}
            rejectionListRef={rejectionsRef}
            scrollAreaRef={scrollAreaRef}
          />
        </div>
      </div>
    </div>
  );
};

export default EgoDump;
