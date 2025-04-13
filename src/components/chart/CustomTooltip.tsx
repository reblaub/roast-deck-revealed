
import React from 'react';

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

export default CustomTooltip;
