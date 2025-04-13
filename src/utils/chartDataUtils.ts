
export interface PieChartData {
  name: string;
  value: number;
  color: string;
  description: string;
}

export const defaultData: PieChartData[] = [
  { 
    name: 'Unicorn Potential', 
    value: 35, 
    color: '#FF6B6B',
    description: "Probability of becoming the next unicorn (or at least that's what your mom thinks)."
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

export const generateRandomData = (fileName: string): PieChartData[] => {
  const fileNameSum = fileName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const seed = fileNameSum % 100;
  
  const data = [
    { 
      name: 'Unicorn Potential', 
      value: Math.max(15, Math.min(55, 30 + (seed % 30))), 
      color: '#FF6B6B',
      description: "Probability of becoming the next unicorn (or at least that's what your mom thinks)."
    },
    { 
      name: 'LinkedIn Fame vs Reality Gap', 
      value: Math.max(10, Math.min(35, 20 + ((seed * 7) % 20))), 
      color: '#4ECDC4',
      description: 'The difference between your LinkedIn presence and actual business results.'
    },
    { 
      name: 'Work-Life Balance Survival', 
      value: Math.max(5, Math.min(25, 15 + ((seed * 3) % 15))), 
      color: '#FFD166',
      description: 'Chance of maintaining any semblance of a personal life while chasing your startup dreams.'
    },
    { 
      name: 'Corporate Return Risk', 
      value: Math.max(10, Math.min(30, 20 + ((seed * 11) % 20))), 
      color: '#6A0572',
      description: 'Probability of ending up back in corporate life within 24 months.'
    },
    { 
      name: 'Investor FOMO Factor', 
      value: Math.max(5, Math.min(25, 15 + ((seed * 5) % 15))), 
      color: '#118AB2',
      description: 'How likely investors are to fund you based purely on fear of missing out.'
    }
  ];
  
  return data;
};

export const normalizeData = (data: PieChartData[]): PieChartData[] => {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  
  if (sum === 0) return defaultData;
  
  const normalizedData = data.map(item => ({
    ...item,
    value: Math.round((item.value / sum) * 100)
  }));
  
  const normalizedSum = normalizedData.reduce((acc, item) => acc + item.value, 0);
  
  if (normalizedSum !== 100) {
    const sortedIndices = [...normalizedData.keys()].sort(
      (a, b) => normalizedData[b].value - normalizedData[a].value
    );
    normalizedData[sortedIndices[0]].value += (100 - normalizedSum);
  }
  
  return normalizedData;
};
