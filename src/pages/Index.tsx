
import React from 'react';
import Logo from '@/components/Logo';
import FileUploader from '@/components/FileUploader';
import SignupForm from '@/components/SignupForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-16 gap-10">
          {/* Logo */}
          <div className="mb-4">
            <Logo className="text-center w-full" />
          </div>
          
          {/* Main Hero Text */}
          <div className="text-center max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              Let us roast your pitch deck
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Hear the hard truth now before it's too late
            </p>
          </div>
          
          {/* File Upload Area */}
          <div className="w-full max-w-2xl mx-auto my-8">
            <FileUploader 
              onFileUpload={(file) => console.log("File uploaded:", file.name)} 
            />
          </div>
        </div>
        
        {/* Signup Section */}
        <div className="py-16 flex flex-col items-center">
          <div className="text-center mb-8 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              If you'd like constructive feedback from top angel investors and VCs sign up here
            </h2>
            <p className="text-white/70">
              Get detailed insights from experienced investors who've seen thousands of pitch decks
            </p>
          </div>
          
          <SignupForm />
          
          <div className="mt-12 text-center text-sm text-white/40">
            <p>Your deck will remain confidential and only shared with our investor panel</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 mt-auto">
        <div className="container text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Roast. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Gradient Orbs (Background Effects) */}
      <div className="fixed top-20 left-20 w-96 h-96 rounded-full bg-roast-purple/10 blur-3xl opacity-20 animate-pulse-slow" />
      <div className="fixed bottom-20 right-20 w-96 h-96 rounded-full bg-roast-orange/10 blur-3xl opacity-20 animate-pulse-slow" />
    </div>
  );
};

export default Index;
