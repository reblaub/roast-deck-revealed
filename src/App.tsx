
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import InvestorCarousel from "@/components/InvestorCarousel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout wrapper that includes the InvestorCarousel on all pages
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      
      {/* Custom wrapper for the InvestorCarousel with updated title */}
      <div className="w-full py-10 bg-black border-t border-white/10">
        <div className="container mx-auto text-center mb-6">
          <h2 className="text-2xl font-bold text-gradient mb-1">Upcoming Roasters</h2>
          <p className="text-white/60 text-sm">Be prepared to be roasted by...</p>
        </div>
        <InvestorCarousel />
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Index />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <AppLayout>
              <NotFound />
            </AppLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
