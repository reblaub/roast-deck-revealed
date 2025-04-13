
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Share2, Download, ChartPie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { toPng } from 'html-to-image';

interface PieChartData {
  name: string;
  value: number;
  color: string;
  description: string;
}

const defaultData: PieChartData[] = [
  { 
    name: 'Unicorn Potential', 
    value: 35, 
    color: '#FF6B6B',
    description: 'Probability of becoming the next unicorn (or at least that\'s what your mom thinks).'
  },
  { 
    name: 'LinkedIn Fame vs Reality Gap', 
    value: 20, 
    color: '#4ECDC4',
    description: 'The difference between your LinkedIn presence and actual business results.'
  },
  { 
    name: 'Work-Life Balance Survival', 
    value: 15, 
    color: '#FFD166',
    description: 'Chance of maintaining any semblance of a personal life while chasing your startup dreams.'
  },
  { 
    name: 'Corporate Return Risk', 
    value: 20, 
    color: '#6A0572',
    description: 'Probability of ending up back in corporate life within 24 months.'
  },
  { 
    name: 'Investor FOMO Factor', 
    value: 10, 
    color: '#118AB2',
    description: 'How likely investors are to fund you based purely on fear of missing out.'
  }
];

const generateRandomData = (fileName: string): PieChartData[] => {
  // Generate somewhat random but weighted data based on the filename
  const fileNameSum = fileName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const seed = fileNameSum % 100;
  
  // Create variability but keep it within reasonable ranges
  return [
    { 
      name: 'Unicorn Potential', 
      value: Math.max(15, Math.min(55, 30 + (seed % 30))), 
      color: '#FF6B6B',
      description: 'Probability of becoming the next unicorn (or at least that\'s what your mom thinks).'
    },
    { 
      name: 'LinkedIn Fame vs Reality Gap', 
      value: Math.max(10, Math.min(35, 20 + (seed % 20))), 
      color: '#4ECDC4',
      description: 'The difference between your LinkedIn presence and actual business results.'
    },
    { 
      name: 'Work-Life Balance Survival', 
      value: Math.max(5, Math.min(25, 15 + (seed % 15))), 
      color: '#FFD166',
      description: 'Chance of maintaining any semblance of a personal life while chasing your startup dreams.'
    },
    { 
      name: 'Corporate Return Risk', 
      value: Math.max(10, Math.min(30, 20 + (seed % 20))), 
      color: '#6A0572',
      description: 'Probability of ending up back in corporate life within 24 months.'
    },
    { 
      name: 'Investor FOMO Factor', 
      value: Math.max(5, Math.min(25, 15 + (seed % 15))), 
      color: '#118AB2',
      description: 'How likely investors are to fund you based purely on fear of missing out.'
    }
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
        <p className="text-xs text-muted-foreground">{payload[0].payload.description}</p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
    // Create a container for the download image
    const downloadContainer = document.createElement('div');
    downloadContainer.style.width = '800px';
    downloadContainer.style.height = '1000px';
    downloadContainer.style.padding = '40px';
    downloadContainer.style.backgroundColor = '#1a1a1a';
    downloadContainer.style.color = 'white';
    downloadContainer.style.fontFamily = 'sans-serif';
    downloadContainer.style.position = 'absolute';
    downloadContainer.style.left = '-9999px';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'My Startup Reality Check';
    title.style.textAlign = 'center';
    title.style.margin = '10px 0 20px';
    title.style.fontSize = '24px';
    title.style.color = 'white';
    downloadContainer.appendChild(title);
    
    // Create a chart container with fixed dimensions
    const chartContainer = document.createElement('div');
    chartContainer.style.width = '100%';
    chartContainer.style.height = '500px';
    chartContainer.style.position = 'relative';
    
    // Append temporary container to the body
    document.body.appendChild(downloadContainer);
    downloadContainer.appendChild(chartContainer);
    
    // Create the actual chart element
    const chart = document.createElement('div');
    chart.style.width = '100%';
    chart.style.height = '100%';
    chartContainer.appendChild(chart);
    
    // Add legend separately
    const legend = document.createElement('div');
    legend.style.padding = '20px';
    legend.style.marginTop = '30px';
    legend.style.border = '1px solid rgba(255,255,255,0.1)';
    legend.style.borderRadius = '8px';
    
    // Add legend title
    const legendTitle = document.createElement('h3');
    legendTitle.textContent = 'Your Startup Reality Analysis';
    legendTitle.style.marginBottom = '15px';
    legendTitle.style.color = 'white';
    legend.appendChild(legendTitle);
    
    // Add each data point with description
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.marginBottom = '12px';
      itemDiv.style.display = 'flex';
      itemDiv.style.alignItems = 'flex-start';
      
      const colorBox = document.createElement('div');
      colorBox.style.width = '15px';
      colorBox.style.height = '15px';
      colorBox.style.backgroundColor = item.color;
      colorBox.style.marginRight = '10px';
      colorBox.style.marginTop = '3px';
      colorBox.style.flexShrink = '0';
      
      const textDiv = document.createElement('div');
      
      const itemTitle = document.createElement('div');
      itemTitle.textContent = `${item.name}: ${item.value}%`;
      itemTitle.style.fontWeight = 'bold';
      itemTitle.style.marginBottom = '4px';
      itemTitle.style.color = 'white';
      
      const itemDesc = document.createElement('div');
      itemDesc.textContent = item.description;
      itemDesc.style.fontSize = '14px';
      itemDesc.style.opacity = '0.8';
      itemDesc.style.color = 'rgba(255,255,255,0.8)';
      
      textDiv.appendChild(itemTitle);
      textDiv.appendChild(itemDesc);
      
      itemDiv.appendChild(colorBox);
      itemDiv.appendChild(textDiv);
      legend.appendChild(itemDiv);
    });
    
    downloadContainer.appendChild(legend);
    
    // Add footer
    const footer = document.createElement('div');
    footer.style.marginTop = '20px';
    footer.style.textAlign = 'center';
    footer.style.fontSize = '14px';
    footer.style.opacity = '0.7';
    footer.style.color = 'rgba(255,255,255,0.7)';
    footer.textContent = 'Generated by Roast • Share your startup reality check!';
    downloadContainer.appendChild(footer);
    
    // Use React to render the PieChart in the chart container
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(chart);
      
      // Create a component specifically for the download version
      const DownloadChart = () => (
        <PieChart width={700} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={180}
            innerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      );
      
      // Render the chart
      root.render(<DownloadChart />);
      
      // Allow a small delay for the chart to render before capturing
      setTimeout(() => {
        toPng(downloadContainer)
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'startup-reality-check.png';
            link.href = dataUrl;
            link.click();
            
            // Clean up
            document.body.removeChild(downloadContainer);
            
            toast({
              title: "Chart downloaded successfully!",
              description: "Share it on your social media to let investors know you're self-aware."
            });
          })
          .catch((error) => {
            console.error('Error downloading chart:', error);
            // Clean up
            document.body.removeChild(downloadContainer);
            toast({
              title: "Download failed",
              description: "Please try again later.",
              variant: "destructive",
            });
          });
      }, 1000); // Increased timeout to ensure rendering completes
    });
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
              labelLine={true}
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
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4 mb-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0 mt-1.5" 
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="font-medium text-white">{item.name}: {item.value}%</p>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
          </div>
        ))}
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
