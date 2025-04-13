
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn('relative group', className)}>
      <div className="relative z-10 animate-float">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-roast-orange animate-pulse-slow" />
          <div className="text-4xl font-extrabold bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange bg-clip-text text-transparent animate-gradient-x uppercase cursor-pointer tracking-tight">
            ROAST
          </div>
        </div>
        <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-roast-orange via-roast-purple to-roast-blue rounded-full animate-pulse-slow" />
      </div>
    </Link>
  );
};

export default Logo;
