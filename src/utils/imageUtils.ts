
import { toPng } from 'html-to-image';
import { toast } from '@/components/ui/use-toast';
import { PieChartData } from './chartDataUtils';

export const downloadChartAsImage = (chartRef: React.RefObject<HTMLDivElement>, data: PieChartData[]) => {
  if (!chartRef.current) {
    toast({
      title: "Error",
      description: "Could not find chart to download",
      variant: "destructive"
    });
    return;
  }

  console.log("Chart found, preparing download...");

  // Create a complete replica of the chart view
  const downloadContainer = document.createElement('div');
  downloadContainer.style.width = '800px';
  downloadContainer.style.height = '600px';
  downloadContainer.style.padding = '20px';
  downloadContainer.style.backgroundColor = '#1a1a1a';
  downloadContainer.style.color = 'white';
  downloadContainer.style.fontFamily = 'sans-serif';
  
  // Add title
  const title = document.createElement('h2');
  title.textContent = 'My Startup Reality Check';
  title.style.textAlign = 'center';
  title.style.margin = '10px 0 20px';
  title.style.fontSize = '24px';
  title.style.color = 'white';
  downloadContainer.appendChild(title);
  
  // Instead of trying to clone the chart, we'll render our own simplified version
  // which is more reliable for image generation
  const chartDiv = document.createElement('div');
  chartDiv.style.width = '100%';
  chartDiv.style.height = '300px';
  chartDiv.style.display = 'flex';
  chartDiv.style.justifyContent = 'center';
  chartDiv.style.position = 'relative';
  
  // Create a simple pie chart representation
  const pieContainer = document.createElement('div');
  pieContainer.style.width = '300px';
  pieContainer.style.height = '300px';
  pieContainer.style.position = 'relative';
  pieContainer.style.borderRadius = '50%';
  
  // Calculate the total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Track the current angle for drawing pie slices
  let currentAngle = 0;
  
  // Draw pie slices
  data.forEach(item => {
    const slice = document.createElement('div');
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    
    slice.style.position = 'absolute';
    slice.style.width = '100%';
    slice.style.height = '100%';
    slice.style.borderRadius = '50%';
    slice.style.clip = 'rect(0, 150px, 300px, 0)';
    
    // Create the actual colored part
    const coloredPart = document.createElement('div');
    coloredPart.style.position = 'absolute';
    coloredPart.style.width = '100%';
    coloredPart.style.height = '100%';
    coloredPart.style.borderRadius = '50%';
    coloredPart.style.clip = 'rect(0, 150px, 300px, 0)';
    coloredPart.style.transform = `rotate(${currentAngle}deg)`;
    coloredPart.style.backgroundColor = item.color;
    
    slice.appendChild(coloredPart);
    pieContainer.appendChild(slice);
    
    currentAngle += angle;
  });
  
  // Add inner circle for donut effect
  const innerCircle = document.createElement('div');
  innerCircle.style.position = 'absolute';
  innerCircle.style.width = '150px';
  innerCircle.style.height = '150px';
  innerCircle.style.borderRadius = '50%';
  innerCircle.style.backgroundColor = '#1a1a1a';
  innerCircle.style.top = '75px';
  innerCircle.style.left = '75px';
  pieContainer.appendChild(innerCircle);
  
  chartDiv.appendChild(pieContainer);
  downloadContainer.appendChild(chartDiv);
  
  // Create legend
  const legend = document.createElement('div');
  legend.style.padding = '20px';
  legend.style.marginTop = '20px';
  legend.style.border = '1px solid rgba(255,255,255,0.1)';
  legend.style.borderRadius = '8px';
  
  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.style.marginBottom = '10px';
    itemDiv.style.display = 'flex';
    itemDiv.style.alignItems = 'flex-start';
    
    const colorBox = document.createElement('div');
    colorBox.style.width = '15px';
    colorBox.style.height = '15px';
    colorBox.style.backgroundColor = item.color;
    colorBox.style.marginRight = '10px';
    colorBox.style.marginTop = '3px';
    
    const textDiv = document.createElement('div');
    
    const itemTitle = document.createElement('div');
    itemTitle.textContent = `${item.name}: ${item.value}%`;
    itemTitle.style.fontWeight = 'bold';
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
  
  // Add container to document temporarily to render it
  document.body.appendChild(downloadContainer);
  downloadContainer.style.position = 'absolute';
  downloadContainer.style.left = '-9999px';
  
  console.log("Container prepared and added to DOM");
  
  // Delay the capture slightly to ensure all styles are applied
  setTimeout(() => {
    // Convert to image and download
    toPng(downloadContainer)
      .then((dataUrl) => {
        console.log("Image generated successfully");
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
        // Clean up even on error
        if (document.body.contains(downloadContainer)) {
          document.body.removeChild(downloadContainer);
        }
        toast({
          title: "Download failed",
          description: "Please try again later: " + error.message,
          variant: "destructive",
        });
      });
  }, 100); // Short delay to ensure rendering
};
