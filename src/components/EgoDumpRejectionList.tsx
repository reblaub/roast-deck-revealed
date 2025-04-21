
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Share2, Scroll } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type Rejection = {
  id: number;
  author: string;
  story: string;
  likes: number;
  liked: boolean;
};

interface EgoDumpRejectionListProps {
  rejections: Rejection[];
  onLike: (id: number) => void;
  onShare: (story: string) => void;
  onScrollToNext: () => void;
  rejectionListRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

const EgoDumpRejectionList: React.FC<EgoDumpRejectionListProps> = ({
  rejections,
  onLike,
  onShare,
  onScrollToNext,
  rejectionListRef,
  scrollAreaRef,
}) => (
  <div ref={rejectionListRef} className="max-w-2xl mx-auto space-y-6 mb-16 sm:mb-24 relative">
    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-6 sm:mb-8 flex items-center">
      <span className="text-roast-orange mr-2">🔥</span> 
      Rejection Wall of Fame
    </h2>
    <div className="relative">
      <ScrollArea 
        className="max-h-[500px] sm:max-h-[600px] pr-4"
        ref={scrollAreaRef as React.RefObject<HTMLDivElement>}
      >
        <div className="space-y-4 sm:space-y-6">
          {rejections.map((rejection) => (
            <Card 
              key={rejection.id} 
              className="bg-gradient-to-br from-black/90 to-black/70 border border-white/10 shadow-lg overflow-hidden backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-white/90 text-base sm:text-lg flex items-center">
                  <span className="bg-gradient-to-br from-roast-purple/20 to-roast-blue/20 text-white h-7 sm:h-8 w-7 sm:w-8 rounded-full flex items-center justify-center mr-3 text-sm">
                    {rejection.author.charAt(0).toUpperCase()}
                  </span>
                  {rejection.author}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 italic text-sm sm:text-base">{rejection.story}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-white/60 pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onLike(rejection.id)}
                  className={`transition-colors ${rejection.liked ? "text-roast-pink" : "text-white/60 hover:text-roast-pink/70"}`}
                >
                  <Heart className="mr-1 h-4 w-4" fill={rejection.liked ? "currentColor" : "none"} />
                  {rejection.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onShare(rejection.story)}
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
      {/* Scroll Button */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onScrollToNext}
          className="border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all group"
        >
          <Scroll className="h-4 w-4 mr-2 group-hover:animate-pulse" />
          <span>Scroll more stories</span>
        </Button>
      </div>
    </div>
  </div>
);

export default EgoDumpRejectionList;
