import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import EgoDumpHeader from '@/components/EgoDumpHeader';
import EgoDumpQuote from '@/components/EgoDumpQuote';
import EgoDumpStoryForm from '@/components/EgoDumpStoryForm';
import EgoDumpRejectionList from '@/components/EgoDumpRejectionList';
import UserMenu from '@/components/UserMenu';

type Rejection = {
  id: number;
  author: string;
  story: string;
  likes: number;
  liked: boolean;
};

const mockRejections: Rejection[] = [
  {
    id: 1,
    author: "Jack",
    story: "Investor fell asleep during my pitch. When they woke up, they said 'The nap was the best part of this meeting.'",
    likes: 42,
    liked: false,
  },
  {
    id: 2,
    author: "Jill",
    story: "Got told my idea was 'too innovative' and they prefer sticking to the status quo.",
    likes: 28,
    liked: false,
  },
  {
    id: 3,
    author: "Anonymous",
    story: "An investor said my pitch was good, but they just invested in a competitor. Thanks for wasting my time!",
    likes: 15,
    liked: false,
  },
  {
    id: 4,
    author: "Sarah",
    story: "Was told my market was too small, despite showing clear data of a multi-billion dollar opportunity.",
    likes: 35,
    liked: false,
  },
  {
    id: 5,
    author: "Tom",
    story: "Got a rejection because 'we don't invest in solo founders'.",
    likes: 50,
    liked: false,
  },
  {
    id: 6,
    author: "Maria",
    story: "Investor said my product was 'too niche' and wouldn't appeal to a broad audience.",
    likes: 22,
    liked: false,
  },
  {
    id: 7,
    author: "David",
    story: "Was told my pitch was 'too polished' and they prefer founders who are 'rough around the edges'.",
    likes: 18,
    liked: false,
  },
  {
    id: 8,
    author: "Emily",
    story: "Got rejected because 'we don't understand your technology'.",
    likes: 47,
    liked: false,
  },
  {
    id: 9,
    author: "Chris",
    story: "An investor said my idea was 'too ambitious' and I should 'start with something smaller'.",
    likes: 31,
    liked: false,
  },
  {
    id: 10,
    author: "Laura",
    story: "Was told my team was 'too diverse' and they prefer teams with 'more synergy'.",
    likes: 25,
    liked: false,
  },
];

const EgoDump = () => {
  const [rejections, setRejections] = useState<Rejection[]>(mockRejections);
  const [author, setAuthor] = useState('');
  const [newStory, setNewStory] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const rejectionListRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleLikeRejection = (id: number) => {
    setRejections(rejections.map(rejection =>
      rejection.id === id ? { ...rejection, likes: rejection.likes + (rejection.liked ? -1 : 1), liked: !rejection.liked } : rejection
    ));
  };
  
  const handleShareRejection = (story: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this rejection story!',
        text: story,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(story);
      toast({
        title: "Copied to clipboard!",
        description: "Share it wherever you want!",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.trim()) {
      toast({
        title: "Please enter a story",
        description: "Share your rejection story with the world!",
        variant: "destructive"
      });
      return;
    }

    const newRejection = {
      id: Date.now(),
      author: author || "Anonymous",
      story: newStory,
      likes: 0,
      liked: false,
    };

    setRejections([newRejection, ...rejections]);
    setNewStory('');
    setAuthor('');

    // Scroll to top after submitting
    if (rejectionListRef.current) {
      rejectionListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleScrollToNext = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollHeight = scrollAreaRef.current.scrollHeight;
      const clientHeight = scrollAreaRef.current.clientHeight;
      const scrollTop = scrollAreaRef.current.scrollTop;
      const scrollableHeight = scrollHeight - clientHeight;

      if (scrollableHeight > 0) {
        const nextScrollTop = Math.min(scrollTop + clientHeight, scrollableHeight);
        scrollAreaRef.current.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between py-6">
          <Link to="/">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-5 w-5" /> 
              Back to home
            </Button>
          </Link>
          <UserMenu />
        </div>
        
        <div className="mb-16">
          <EgoDumpHeader />
        </div>
        
        {/* Quote section */}
        <EgoDumpQuote />
        
        {/* Form section */}
        <EgoDumpStoryForm
          author={author}
          newStory={newStory}
          onAuthorChange={setAuthor}
          onStoryChange={setNewStory}
          onSubmit={handleSubmit}
        />
        
        {/* Rejections list */}
        <EgoDumpRejectionList
          rejections={rejections}
          onLike={handleLikeRejection}
          onShare={handleShareRejection}
          onScrollToNext={handleScrollToNext}
          rejectionListRef={rejectionListRef}
          scrollAreaRef={scrollAreaRef}
        />
      </div>
      
      {/* Gradient background elements */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-black to-[#0c0c15] -z-10" />
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full bg-roast-purple/5 blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-20 right-20 w-96 h-96 rounded-full bg-roast-orange/5 blur-3xl opacity-20 -z-10" />
    </div>
  );
};

export default EgoDump;
