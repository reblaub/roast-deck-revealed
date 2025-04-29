
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thanks for signing up!",
        description: "We'll be in touch soon with personalized feedback.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center py-12">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
        <Input
          type="email"
          placeholder="youremail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/5 border-white/10 text-white"
          required
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-roast-purple to-roast-blue hover:opacity-90 text-white"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default EmailCapture;
