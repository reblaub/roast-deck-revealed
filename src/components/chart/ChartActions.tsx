
import React from 'react';
import { Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { downloadChartAsImage } from '@/utils/imageUtils';
import { PieChartData } from '@/utils/chartDataUtils';

interface ChartActionsProps {
  data: PieChartData[];
  chartRef: React.RefObject<HTMLDivElement>;
}

const ChartActions: React.FC<ChartActionsProps> = ({ data, chartRef }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Startup Reality Check',
          text: `Check out my startup's reality check:\n${data.map(item => `${item.name}: ${item.value}%`).join('\n')}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `Check out my startup's reality check:\n${data.map(item => `${item.name}: ${item.value}%`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Share your analysis with friends and colleagues.",
      });
    });
  };

  const downloadChart = () => {
    // Add console logging for debugging
    console.log("Download chart clicked");
    console.log("Chart ref exists:", !!chartRef.current);
    
    if (!chartRef.current) {
      toast({
        title: "Error",
        description: "Chart reference not found",
        variant: "destructive"
      });
      return;
    }
    
    try {
      downloadChartAsImage(chartRef, data);
    } catch (error) {
      console.error("Error initiating chart download:", error);
      toast({
        title: "Download Error",
        description: "Failed to prepare chart for download.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
      <Button 
        onClick={handleShare} 
        className="bg-gradient-to-r from-roast-blue to-roast-blue/80 hover:opacity-90 border border-white/10"
        variant="default"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share Result
      </Button>
      <Button 
        onClick={downloadChart} 
        className="bg-gradient-to-r from-roast-purple to-roast-purple/80 hover:opacity-90 border border-white/10"
        variant="default"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Chart
      </Button>
    </div>
  );
};

export default ChartActions;
