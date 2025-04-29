
import React, { useState, useRef } from 'react';
import EgoDumpHeader from '@/components/EgoDumpHeader';
import EgoDumpStoryForm from '@/components/EgoDumpStoryForm';
import EgoDumpRejectionList from '@/components/EgoDumpRejectionList';
import EgoDumpQuote from '@/components/EgoDumpQuote';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

type Rejection = {
  id: number;
  author: string;
  story: string;
  likes: number;
  liked: boolean;
};

const EgoDump = () => {
  const [showForm, setShowForm] = useState(false);
  const [rejections, setRejections] = useState<Rejection[]>([
    {
      id: 1,
      author: 'Anonymous Founder',
      story: 'They said my idea was "too early" in 2018. Now there are 5 unicorns in the space.',
      likes: 28,
      liked: false
    },
    {
      id: 2,
      author: 'Jane',
      story: 'The VC interrupted my pitch after 30 seconds to ask if I'd considered "just getting a real job instead."',
      likes: 42,
      liked: false
    },
    {
      id: 3,
      author: 'Frustrated in Fintech',
      story: 'Was told my finance app "wouldn't work because women don't understand money." I'm a female CFO with 15 years of experience.',
      likes: 56,
      liked: true
    }
  ]);
  
  const { toast } = useToast();
  const rejectionListRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleShareStory = () => {
    setShowForm(true);
  };

  const handleCancelStory = () => {
    setShowForm(false);
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit story would go here
    setShowForm(false);
    
    toast({
      title: "Story shared!",
      description: "Your rejection is now immortalized on the wall of shame.",
    });
  };

  const handleLike = (id: number) => {
    setRejections(prevRejections => 
      prevRejections.map(rejection => 
        rejection.id === id 
          ? { 
              ...rejection, 
              likes: rejection.liked ? rejection.likes - 1 : rejection.likes + 1,
              liked: !rejection.liked 
            } 
          : rejection
      )
    );
  };

  const handleShare = (story: string) => {
    navigator.clipboard.writeText(story);
    toast({
      title: "Copied to clipboard",
      description: "Story copied! Share the pain with others.",
    });
  };
  
  const handleScrollToNext = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop += 200; // Scroll down by 200px
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <EgoDumpHeader onShareStory={handleShareStory} />
        
        <div className="my-12 sm:my-16">
          <EgoDumpQuote />
        </div>
        
        {showForm && (
          <EgoDumpStoryForm 
            onSubmit={handleSubmitStory} 
            onCancel={handleCancelStory}
          />
        )}
        
        <EgoDumpRejectionList 
          rejections={rejections}
          onLike={handleLike}
          onShare={handleShare}
          onScrollToNext={handleScrollToNext}
          rejectionListRef={rejectionListRef}
          scrollAreaRef={scrollAreaRef}
        />
      </div>
    </div>
  );
};

export default EgoDump;
