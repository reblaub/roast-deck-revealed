
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn('relative', className)}>
      <div className="relative z-10 animate-float">
        <div className="text-4xl font-extrabold logo-gradient animate-gradient-x uppercase cursor-pointer">
          ROAST
        </div>
        <div className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-roast-purple via-roast-blue to-roast-orange rounded-full animate-pulse-slow" />
      </div>
    </Link>
  );
};

export default Logo;

