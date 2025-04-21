
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

interface EgoDumpStoryFormProps {
  author: string;
  newStory: string;
  onAuthorChange: (v: string) => void;
  onStoryChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EgoDumpStoryForm: React.FC<EgoDumpStoryFormProps> = ({
  author,
  newStory,
  onAuthorChange,
  onStoryChange,
  onSubmit,
}) => (
  <Card className="bg-gradient-to-br from-black via-black/95 to-black/80 border border-white/10 shadow-lg mb-10 sm:mb-16 max-w-2xl mx-auto overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-roast-purple/5 to-roast-orange/5 pointer-events-none" />
    <CardHeader className="pb-2 relative">
      <CardTitle className="text-gradient text-xl sm:text-2xl">Share Your Rejection</CardTitle>
      <CardDescription>No judgment. We're all in this together.</CardDescription>
    </CardHeader>
    <form onSubmit={onSubmit}>
      <CardContent className="space-y-4 relative">
        <Input
          placeholder="Your name (optional)"
          value={author}
          onChange={e => onAuthorChange(e.target.value)}
          className="bg-white/5 border-white/10 text-white focus:border-roast-purple/50"
        />
        <div className="relative">
          <textarea
            placeholder="What's the most ridiculous rejection you've received?"
            value={newStory}
            onChange={e => onStoryChange(e.target.value)}
            className="w-full p-4 h-28 sm:h-32 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-roast-purple/50 transition-all resize-none"
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
);

export default EgoDumpStoryForm;
