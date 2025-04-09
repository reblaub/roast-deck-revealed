
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload?: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleFile = (uploadedFile: File) => {
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
    if (onFileUpload) {
      onFileUpload(uploadedFile);
    }
    
    toast({
      title: "File uploaded successfully",
      description: `${uploadedFile.name} is ready for roasting`,
    });
  };

  const removeFile = () => {
    setFile(null);
  };

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
        </div>
      )}
    </div>
  );
};

export default FileUploader;
