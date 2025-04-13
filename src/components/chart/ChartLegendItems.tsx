
import React from 'react';
import { PieChartData } from '@/utils/chartDataUtils';

interface ChartLegendItemsProps {
  data: PieChartData[];
}

const ChartLegendItems: React.FC<ChartLegendItemsProps> = ({ data }) => {
  return (
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
  );
};

export default ChartLegendItems;
