
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Check if email already exists
      const { data: existingEmails, error: queryError } = await supabase
        .from('signups')
        .select('email')
        .eq('email', email);

      if (queryError) {
        throw queryError;
      }

      if (existingEmails && existingEmails.length > 0) {
        setLoading(false);
        toast({
          title: "Already signed up!",
          description: "This email is already registered with us.",
        });
        return;
      }
      
      // Save email to Supabase
      const { error } = await supabase
        .from('signups')
        .insert([{ email }]);
      
      if (error) throw error;
      
      setLoading(false);
      setEmail('');
      toast({
        title: "Thank you for signing up!",
        description: "We'll send you feedback from top investors soon.",
      });
    } catch (error: any) {
      setLoading(false);
      console.error("Signup error:", error);
      
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black/40 border-white/20 h-12 text-white placeholder:text-white/40"
        />
      </div>
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-roast-orange to-roast-pink hover:opacity-90 text-white transition-all h-12 px-6"
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            Sign Up <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
