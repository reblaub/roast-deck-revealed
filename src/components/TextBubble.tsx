
import React from 'react';
import { cn } from '@/lib/utils';

interface TextBubbleProps {
  message: string;
  position: 'left' | 'right';
  className?: string;
}

const TextBubble: React.FC<TextBubbleProps> = ({ message, position, className }) => {
  return (
    <div 
      className={cn(
        'absolute max-w-[180px] rounded-2xl p-3 text-sm font-medium shadow-md animate-float opacity-80 backdrop-blur-sm',
        position === 'left' 
          ? 'left-4 md:left-8 bg-white text-black' 
          : 'right-4 md:right-8 bg-roast-blue text-white',
        className
      )}
    >
      <em>{message}</em>
    </div>
  );
};

export default TextBubble;
