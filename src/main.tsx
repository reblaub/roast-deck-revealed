
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add carousel animation style
const style = document.createElement('style');
style.innerHTML = `
  @keyframes carousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .animate-carousel {
    animation: carousel 30s linear infinite;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
