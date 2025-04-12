import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Share2, Download, ChartPie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { toPng } from 'html-to-image';

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

const defaultData: PieChartData[] = [
  { name: 'Unicorn Potential', value: 40, color: '#FF6B6B' },
  { name: 'LinkedIn Fame vs Reality Gap', value: 20, color: '#4ECDC4' },
  { name: 'Work-Life Balance Survival', value: 15, color: '#FFD166' },
  { name: 'Buzzword Density', value: 25, color: '#6A0572' },
];

const generateRandomData = (fileName: string): PieChartData[] => {
  // Generate somewhat random but weighted data based on the filename
  const fileNameSum = fileName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const seed = fileNameSum % 100;
  
  // Create variability but keep it within reasonable ranges
  return [
    { 
      name: 'Unicorn Potential', 
      value: Math.max(15, Math.min(60, 30 + (seed % 30))), 
      color: '#FF6B6B' 
    },
    { 
      name: 'LinkedIn Fame vs Reality Gap', 
      value: Math.max(10, Math.min(40, 20 + (seed % 20))), 
      color: '#4ECDC4' 
    },
    { 
      name: 'Work-Life Balance Survival', 
      value: Math.max(5, Math.min(30, 15 + (seed % 15))), 
      color: '#FFD166' 
    },
    { 
      name: 'Buzzword Density', 
      value: Math.max(15, Math.min(45, 25 + (seed % 20))), 
      color: '#6A0572' 
    },
  ];
};

// Ensure the data values sum to 100%
const normalizeData = (data: PieChartData[]): PieChartData[] => {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  return data.map(item => ({
    ...item,
    value: Math.round((item.value / sum) * 100)
  }));
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

interface AnalysisPieChartProps {
  fileName?: string;
  className?: string;
}

const AnalysisPieChart: React.FC<AnalysisPieChartProps> = ({ fileName, className }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const data = React.useMemo(() => {
    const rawData = fileName ? generateRandomData(fileName) : defaultData;
    return normalizeData(rawData);
  }, [fileName]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Pitch Deck Analysis',
          text: `Check out my startup's analysis:\n${data.map(item => `${item.name}: ${item.value}%`).join('\n')}`,
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
    const text = `Check out my startup's analysis:\n${data.map(item => `${item.name}: ${item.value}%`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Share your analysis with friends and colleagues.",
      });
    });
  };

  const downloadChart = () => {
    if (chartRef.current) {
      toPng(chartRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'startup-analysis.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading chart:', error);
          toast({
            title: "Download failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-roast-purple/20">
          <ChartPie className="w-6 h-6 text-roast-purple" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Startup Reality Check</h2>
      </div>
      
      {fileName && (
        <div className="mb-6 text-white/60 text-sm">
          File analyzed: <span className="text-white font-medium">{fileName}</span>
        </div>
      )}

      <div className="mb-6 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
        <p className="text-white italic">
          "Based on our AI analysis, here's your startup's reality check. Remember, even unicorns started as ponies with party hats!"
        </p>
      </div>

      <div ref={chartRef} className="w-full aspect-square max-w-md mx-auto mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              innerRadius="40%"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleShare} 
          className="bg-roast-blue hover:bg-roast-blue/80"
          variant="default"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Result
        </Button>
        <Button 
          onClick={downloadChart} 
          className="bg-roast-purple hover:bg-roast-purple/80"
          variant="default"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default AnalysisPieChart;
