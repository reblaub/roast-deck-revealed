
import React from 'react';
import { ChartPie } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateRandomData, normalizeData } from '@/utils/chartDataUtils';
import PieChartVisual from '@/components/chart/PieChartVisual';
import ChartLegendItems from '@/components/chart/ChartLegendItems';
import ChartActions from '@/components/chart/ChartActions';

interface AnalysisPieChartProps {
  fileName?: string;
  className?: string;
}

const AnalysisPieChart: React.FC<AnalysisPieChartProps> = ({ fileName, className }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const data = React.useMemo(() => {
    const rawData = fileName ? generateRandomData(fileName) : generateRandomData("Default_Startup_Pitch_Deck");
    return normalizeData(rawData);
  }, [fileName]);

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

      <PieChartVisual data={data} chartRef={chartRef} />
      
      <ChartLegendItems data={data} />

      <ChartActions data={data} chartRef={chartRef} />
    </div>
  );
};

export default AnalysisPieChart;
