
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import RoastFeedback from './RoastFeedback';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface FileUploaderProps {
  onFileUpload?: (file: File) => void;
  onAnalysisComplete?: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [roastData, setRoastData] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // These are the specific messages requested by the user
  const requestedMessages = [
    "Improving your pitch to get you ghosted faster...",
    "Compressing your ego... please wait",
    "Unicorn detected... just kidding.",
    "Asking Sequoia if they've heard of you, please wait."
  ];
  
  // Additional messages to increase variety
  const additionalMessages = [
    "Calculating your burn rate... ouch.",
    "Measuring founder-market fit... not looking good.",
    "Comparing you to ChatGPT's growth... yikes.",
    "Counting buzzwords in your deck... too many.",
    "Scanning for actual revenue... still searching."
  ];
  
  const allLoadingMessages = [...requestedMessages, ...additionalMessages];
  
  // Selected messages for current upload
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (isLoading) {
      // Ensure at least 3 of the requested messages are included
      let selected: string[] = [];
      
      // Ensure we have the user's requested messages (shuffle them to randomize order)
      const shuffledRequested = shuffleArray(requestedMessages);
      
      // Take 3 messages from the requested ones (or all if less than 3)
      const requestedToUse = shuffledRequested.slice(0, 3);
      selected = [...requestedToUse];
      
      // If we need more messages to reach 3 total, add from additional messages
      if (selected.length < 3) {
        const shuffledAdditional = shuffleArray(additionalMessages);
        selected = [...selected, ...shuffledAdditional.slice(0, 3 - selected.length)];
      }
      
      // Set the selected messages for this upload
      setSelectedMessages(selected);
      setLoadingMessage(selected[0]);

      // Start the progress animation
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        setProgress(Math.min(currentProgress, 100));
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, 200);

      // Display the sequential messages
      let messageIndex = 0;
      
      const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % selected.length;
        setLoadingMessage(selected[messageIndex]);
        
        if (currentProgress >= 100) {
          clearInterval(messageInterval);
        }
      }, 4000); // Message changes every 4 seconds

      return () => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      };
    }
  }, [isLoading]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      handleFile(uploadedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      handleFile(uploadedFile);
    }
  };

  const callAIRoast = async (pitchdeckId: string) => {
    try {
      const response = await fetch('https://rezxqmrmoauenjzfqmmw.supabase.co/functions/v1/roast-pitchdeck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify({ pitchdeckId }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling AI roast:', error);
      throw error;
    }
  };

  const handleFile = async (uploadedFile: File) => {
    if (uploadedFile.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive"
      });
      return;
    }
    
    setFile(uploadedFile);
    setIsLoading(true);
    setProgress(0);
    
    if (onFileUpload) {
      onFileUpload(uploadedFile);
    }

    try {
      const fileId = uuidv4();
      const uniqueFileName = `${fileId}-${uploadedFile.name}`;
      
      // Anonymous uploads are allowed - store user email if authenticated, otherwise store as anonymous
      const userEmail = user?.email || 'anonymous';
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('pitchdecks')
        .upload(uniqueFileName, uploadedFile);
        
      if (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Save record in the database
      const { data: dbData, error: dbError } = await supabase
        .from('uploaded_pitchdecks')
        .insert({
          id: fileId,
          user_email: userEmail,
          file_path: uniqueFileName
        })
        .select();
        
      if (dbError) {
        console.error('Error saving to database:', dbError);
        setIsLoading(false);
        return;
      }

      // Now trigger the AI roast
      try {
        const roastResult = await callAIRoast(fileId);
        setRoastData(roastResult.roast);
        
        // Complete the progress simulation
        setTimeout(() => {
          setIsLoading(false);
          setIsAnalysisComplete(true);
          if (onAnalysisComplete) {
            onAnalysisComplete();
          }
          toast({
            title: "Analysis complete",
            description: "Your pitch deck has been thoroughly roasted.",
          });
        }, 1000);
        
      } catch (roastError) {
        console.error('Error generating AI roast:', roastError);
        // Still complete the progress but show an error
        setTimeout(() => {
          setIsLoading(false);
          setIsAnalysisComplete(true);
          if (onAnalysisComplete) {
            onAnalysisComplete();
          }
          toast({
            title: "Roast partially complete",
            description: "We had some issues with the AI roast, but we've analyzed what we could.",
            variant: "destructive"
          });
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error processing file:', err);
      setIsLoading(false);
      toast({
        title: "Processing failed",
        description: "There was an error processing your file.",
        variant: "destructive"
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setIsLoading(false);
    setIsAnalysisComplete(false);
    setProgress(0);
    setLoadingMessage('');
    setRoastData(null);
  };

  const resetAnalysis = () => {
    setFile(null);
    setIsLoading(false);
    setIsAnalysisComplete(false);
    setProgress(0);
    setLoadingMessage('');
    setRoastData(null);
  };

  if (isAnalysisComplete && file) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <RoastFeedback fileName={file.name} roastData={roastData} />
        <div className="text-center mt-6">
          <button
            onClick={resetAnalysis}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Upload Another Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-roast-blue bg-roast-blue/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleChange}
            accept=".pdf"
          />
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-white">Drop your pitch deck</p>
              <p className="text-sm text-white/60">or click to upload (PDF only, max 10MB)</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="border-2 border-roast-purple/30 bg-roast-purple/5 rounded-xl p-6 text-white relative">
          {!isLoading ? (
            <>
              <button 
                className="absolute top-3 right-3 p-1 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
                onClick={removeFile}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-roast-purple/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-roast-purple" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <p className="text-sm text-white/60">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2 text-gradient">Analyzing your pitch deck</h3>
                <p className="text-white/70 text-md h-8">{loadingMessage}</p>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-3 bg-white/10" />
                <p className="text-right text-xs text-white/40">{progress}%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
