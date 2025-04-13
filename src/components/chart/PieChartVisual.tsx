
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartData } from '@/utils/chartDataUtils';
import CustomTooltip from './CustomTooltip';

interface PieChartVisualProps {
  data: PieChartData[];
  chartRef: React.RefObject<HTMLDivElement>;
}

const PieChartVisual: React.FC<PieChartVisualProps> = ({ data, chartRef }) => {
  return (
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
  );
};

export default PieChartVisual;
