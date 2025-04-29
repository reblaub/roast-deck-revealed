
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import EgoDumpHeader from '@/components/EgoDumpHeader';
import EgoDumpStoryForm from '@/components/EgoDumpStoryForm';
import EgoDumpRejectionList from '@/components/EgoDumpRejectionList';
import { useAuth } from '@/contexts/AuthContext';

const EgoDump = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const rejectionsRef = useRef<HTMLDivElement>(null);
  
  const handleNewSubmission = () => {
    toast({
      title: "Submission received!",
      description: "Your rejection story has been added to the dump.",
    });
    setFormVisible(false);
    // Optionally, you could add logic here to refresh the rejection stories
  };
  
  const scrollToRejections = () => {
    rejectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-16 pb-20 px-6 max-w-6xl mx-auto">
        <EgoDumpHeader onScrollToRejections={scrollToRejections} />
        
        {/* Story Form Section */}
        <div className="mt-16">
          {formVisible ? (
            <EgoDumpStoryForm 
              onSubmit={handleNewSubmission}
              onCancel={() => setFormVisible(false)}
            />
          ) : (
            <div className="text-center">
              <Button 
                onClick={() => setFormVisible(true)}
                className="bg-gradient-to-r from-roast-purple to-roast-blue hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl"
              >
                Share Your Rejection Story
              </Button>
            </div>
          )}
        </div>
        
        {/* Rejections List Section */}
        <div ref={rejectionsRef} className="mt-24">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            Rejection Wall of "Fame"
          </h2>
          <EgoDumpRejectionList />
        </div>
      </div>
    </div>
  );
};

export default EgoDump;
