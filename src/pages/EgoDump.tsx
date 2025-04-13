
import React, { useState } from 'react';
import { Share2, Heart, Send, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

// Sample rejection stories to pre-populate the page
const initialRejections = [
  {
    id: 1,
    author: "Airbnb Founder",
    story: "We got rejected by 7 prominent investors during our seed round. One told us 'people will never rent out space in their homes to strangers.'",
    likes: 128,
    liked: false
  },
  {
    id: 2,
    author: "Anonymous",
    story: "The VC listened for 5 minutes, then said 'This idea has been tried before and failed for good reason.' That same idea is now valued at $50M.",
    likes: 74,
    liked: false
  },
  {
    id: 3,
    author: "Startup Veteran",
    story: "After our pitch, the investor just said 'I don't get it' and walked out of the room. We raised $2M from their competitor two weeks later.",
    likes: 92,
    liked: false
  }
];

const EgoDump = () => {
  const [rejections, setRejections] = useState(initialRejections);
  const [newStory, setNewStory] = useState('');
  const [author, setAuthor] = useState('');

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Logo className="mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">The Ego Dump</h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70 mb-4">
            Even the biggest success stories faced countless rejections. Your pitch deck might be perfect, but rejection is part of the journey.
          </p>
          <p className="max-w-2xl mx-auto text-white/60">
            Share your best "rejection excuse" from VCs or angel investors. Let's make this process human again.
          </p>
        </div>

        {/* Story Submission Form */}
        <Card className="bg-black border border-white/10 shadow-lg mb-12 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-gradient">Share Your Rejection</CardTitle>
            <CardDescription>No judgment. We're all in this together.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Input
                placeholder="Your name (optional)"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <div className="relative">
                <textarea
                  placeholder="What's the most ridiculous rejection you've received?"
                  value={newStory}
                  onChange={e => setNewStory(e.target.value)}
                  className="w-full p-3 h-32 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Share Your Story
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Rejections List */}
        <div className="max-w-2xl mx-auto space-y-6 mb-20">
          <h2 className="text-2xl font-bold text-gradient mb-6">Rejection Wall of Fame</h2>
          
          {rejections.map(rejection => (
            <Card key={rejection.id} className="bg-black border border-white/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-white/90 text-lg">{rejection.author}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{rejection.story}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-white/60">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(rejection.id)}
                  className={rejection.liked ? "text-roast-orange" : ""}
                >
                  <Heart className="mr-1 h-4 w-4" fill={rejection.liked ? "currentColor" : "none"} />
                  {rejection.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(rejection.story)}
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Inspirational Quote */}
        <div className="max-w-2xl mx-auto text-center border-t border-white/10 pt-12 mb-20">
          <blockquote className="italic text-xl text-white/80 mb-4">
            "I've missed more than 9,000 shots in my career. I've lost almost 300 games. Twenty-six times I've been trusted to take the game-winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."
          </blockquote>
          <cite className="text-white/60">— Michael Jordan</cite>
        </div>
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

export default EgoDump;
