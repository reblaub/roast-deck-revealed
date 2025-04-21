
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import EgoDumpHeader from '@/components/EgoDumpHeader';
import EgoDumpStoryForm from '@/components/EgoDumpStoryForm';
import EgoDumpRejectionList from '@/components/EgoDumpRejectionList';
import EgoDumpQuote from '@/components/EgoDumpQuote';
import { useIsMobile } from '@/hooks/use-mobile';

const initialRejections = [
  {
    id: 1,
    author: "Anonymous Founder",
    story: "VC looked at our slide deck and said 'This is the startup equivalent of a participation trophy. Everyone has this idea, yours just happened to make it to a pitch.'",
    likes: 128,
    liked: false
  },
  {
    id: 2,
    author: "Tech Entrepreneur",
    story: "After a 20-minute pitch, the investor just said 'I didn't understand any of that, and I don't think you do either.' Got up and left the room.",
    likes: 203,
    liked: false
  },
  {
    id: 3,
    author: "Startup Veteran",
    story: "Investor checked his watch 5 times during my pitch, then said 'I would rather watch paint dry than invest in this.'",
    likes: 92,
    liked: false
  },
  {
    id: 4,
    author: "First-time Founder",
    story: "VC fell asleep during my pitch. When he woke up, he asked if I was finished yet. I had only done the intro slide.",
    likes: 156,
    liked: false
  },
  {
    id: 5,
    author: "Anonymous",
    story: "Investor said 'Your TAM is smaller than my lunch budget' and then ordered a $300 bottle of wine right in front of me.",
    likes: 87,
    liked: false
  },
  {
    id: 6,
    author: "SaaS Founder",
    story: "After our growth projections slide, the investor laughed so hard he spilled his coffee. Then said 'Sorry, I thought this was a comedy show.'",
    likes: 142,
    liked: false
  },
  {
    id: 7,
    author: "Anonymous",
    story: "The partner reviewing my deck said 'This reminds me of my 8-year-old's school project. Actually, her project had better market research.'",
    likes: 118,
    liked: false
  }
];

const EgoDump = () => {
  const [rejections, setRejections] = useState(initialRejections);
  const [newStory, setNewStory] = useState('');
  const [author, setAuthor] = useState('');
  const rejectionListRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.trim()) return;
    
    const newRejection = {
      id: Date.now(),
      author: author.trim() || 'Anonymous',
      story: newStory,
      likes: 0,
      liked: false
    };
    
    setRejections([newRejection, ...rejections]);
    setNewStory('');
    setAuthor('');
    toast("Thanks for sharing your story!");
  };

  const handleLike = (id: number) => {
    setRejections(rejections.map(rejection => 
      rejection.id === id 
        ? { 
            ...rejection, 
            likes: rejection.liked ? rejection.likes - 1 : rejection.likes + 1,
            liked: !rejection.liked 
          }
        : rejection
    ));
  };

  const handleShare = (story: string) => {
    navigator.clipboard.writeText(story)
      .then(() => toast("Copied to clipboard!"))
      .catch(() => toast("Failed to copy to clipboard"));
  };

  const scrollToRejections = () => {
    rejectionListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    if (scrollAreaRef.current) {
      const currentScroll = scrollAreaRef.current.scrollTop;
      const scrollHeight = scrollAreaRef.current.scrollHeight;
      const clientHeight = scrollAreaRef.current.clientHeight;
      const scrollAmount = Math.min(300, scrollHeight - clientHeight - currentScroll);

      if (scrollAmount > 0) {
        scrollAreaRef.current.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
      } else {
        scrollAreaRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        toast("Back to the top!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
      <div className="absolute w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-roast-orange/20 blur-3xl opacity-40 animate-pulse-slow" />
        <div className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-roast-blue/20 blur-3xl opacity-40 animate-pulse-slow delay-1000" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-roast-purple/20 blur-3xl opacity-50 animate-pulse-slow delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-roast-pink/20 blur-3xl opacity-40 animate-pulse-slow delay-3000" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        <EgoDumpHeader onScrollToRejections={scrollToRejections} />
        <EgoDumpStoryForm
          author={author}
          newStory={newStory}
          onAuthorChange={setAuthor}
          onStoryChange={setNewStory}
          onSubmit={handleSubmit}
        />
        <EgoDumpRejectionList 
          rejections={rejections}
          onLike={handleLike}
          onShare={handleShare}
          onScrollToNext={scrollToNext}
          rejectionListRef={rejectionListRef}
          scrollAreaRef={scrollAreaRef}
        />
        <EgoDumpQuote />
      </div>
      <footer className="py-6 sm:py-8 border-t border-white/20 mt-auto relative z-10 bg-black/50 backdrop-blur-sm">
        <div className="container text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Roast. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EgoDump;
