import React, { useState, useRef } from 'react';
import { Share2, Heart, ChevronDown, Send, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
      <div className="absolute w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-roast-orange/20 blur-3xl opacity-40 animate-pulse-slow" />
        <div className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-roast-blue/20 blur-3xl opacity-40 animate-pulse-slow delay-1000" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-roast-purple/20 blur-3xl opacity-50 animate-pulse-slow delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-roast-pink/20 blur-3xl opacity-40 animate-pulse-slow delay-3000" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="relative overflow-hidden mb-20 bg-black/70 backdrop-blur-sm rounded-xl p-8">
          <div className="text-center relative z-10">
            <div className="mb-6">
              <Logo className="mx-auto scale-125" />
            </div>
            
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-roast-orange via-roast-purple to-roast-blue bg-clip-text text-transparent animate-gradient-x tracking-tighter">
                The Ego Dump
              </h1>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-roast-orange/30 blur-3xl opacity-50 animate-pulse-slow" />
            </div>
            
            <div className="max-w-2xl mx-auto relative">
              <p className="text-xl md:text-2xl text-white mb-4 font-light">
                Even the biggest success stories faced countless rejections.
              </p>
              <p className="text-lg text-white/80 mb-6">
                Your pitch deck might be perfect, but rejection is part of the journey.
                Share your best "rejection excuse" from VCs or angel investors.
              </p>
              
              <div className="flex items-center justify-center my-10">
                <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-roast-orange to-transparent" />
                <div className="mx-4 text-roast-orange text-2xl">🔥</div>
                <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-roast-orange to-transparent" />
              </div>
            </div>
          </div>
        </div>
          
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            className="animate-float text-white/60 hover:text-white hover:bg-white/10 group"
            onClick={scrollToRejections}
          >
            <span className="mr-2">Read rejection stories</span>
            <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-black via-black/95 to-black/80 border border-white/10 shadow-lg mb-16 max-w-2xl mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-roast-purple/5 to-roast-orange/5 pointer-events-none" />
          
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-gradient text-2xl">Share Your Rejection</CardTitle>
            <CardDescription>No judgment. We're all in this together.</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 relative">
              <Input
                placeholder="Your name (optional)"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-roast-purple/50"
              />
              <div className="relative">
                <textarea
                  placeholder="What's the most ridiculous rejection you've received?"
                  value={newStory}
                  onChange={e => setNewStory(e.target.value)}
                  className="w-full p-4 h-32 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-roast-purple/50 transition-all resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-roast-purple to-roast-orange hover:opacity-90 transition-opacity">
                <Send className="mr-2 h-4 w-4" /> Share Your Story
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div ref={rejectionListRef} className="max-w-2xl mx-auto space-y-6 mb-24">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-8 flex items-center">
            <span className="text-roast-orange mr-2">🔥</span> 
            Rejection Wall of Fame
          </h2>
          
          <ScrollArea className="max-h-[600px] pr-4">
            <div className="space-y-6">
              {rejections.map((rejection, index) => (
                <Card 
                  key={rejection.id} 
                  className={`bg-gradient-to-br from-black/90 to-black/70 border border-white/10 shadow-lg overflow-hidden backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white/90 text-lg flex items-center">
                      <span className="bg-gradient-to-br from-roast-purple/20 to-roast-blue/20 text-white h-8 w-8 rounded-full flex items-center justify-center mr-3 text-sm">
                        {rejection.author.charAt(0).toUpperCase()}
                      </span>
                      {rejection.author}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 italic">{rejection.story}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-white/60 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(rejection.id)}
                      className={`transition-colors ${rejection.liked ? "text-roast-pink" : "text-white/60 hover:text-roast-pink/70"}`}
                    >
                      <Heart className="mr-1 h-4 w-4" fill={rejection.liked ? "currentColor" : "none"} />
                      {rejection.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleShare(rejection.story)}
                      className="text-white/60 hover:text-roast-blue/70 transition-colors"
                    >
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-roast-purple/5 via-transparent to-roast-orange/5 rounded-xl pointer-events-none" />
          
          <div className="p-8 border border-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-5xl text-white/30 mb-4">"</div>
            <blockquote className="italic text-xl text-white/80 mb-6">
              I've missed more than 9,000 shots in my career. I've lost almost 300 games. Twenty-six times I've been trusted to take the game-winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.
            </blockquote>
            <cite className="text-white/60 text-lg">— Michael Jordan</cite>
          </div>
        </div>
      </div>
      
      <footer className="py-8 border-t border-white/20 mt-auto relative z-10 bg-black/50 backdrop-blur-sm">
        <div className="container text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Roast. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EgoDump;
