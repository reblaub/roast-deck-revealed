
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserIcon, LogIn, LogOut, User } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };
  
  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
          <LogIn className="mr-2 h-5 w-5" />
          <span>Sign In</span>
        </Button>
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 gap-2">
          <div className="bg-gradient-to-br from-roast-purple/60 to-roast-blue/60 text-white h-7 w-7 rounded-full flex items-center justify-center">
            <UserIcon className="h-4 w-4" />
          </div>
          <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/90 border border-white/10 text-white">
        <DropdownMenuLabel className="text-white/70">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleSignOut} className="text-white hover:bg-white/10 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
