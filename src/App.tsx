
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import InvestorCarousel from "@/components/InvestorCarousel";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import EgoDump from "./pages/EgoDump";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { createPitchdeckStorageBucket } from "./utils/createStorageBucket";

const queryClient = new QueryClient();

// Layout wrapper that includes the InvestorCarousel on all pages
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  useEffect(() => {
    // Create the storage bucket when the app initializes
    createPitchdeckStorageBucket();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      
      {/* Investor Carousel - Don't show on auth page */}
      {!isAuthPage && (
        <div className="w-full py-10 bg-black border-t border-white/10">
          <div className="container mx-auto text-center mb-6">
            <h2 className="text-2xl font-bold text-gradient mb-1">Upcoming Roasters</h2>
            <p className="text-white/60 text-sm">Be prepared to be roasted by...</p>
          </div>
          <InvestorCarousel />
        </div>
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AppLayout>
                <Index />
              </AppLayout>
            } />
            <Route path="/ego-dump" element={
              <AppLayout>
                <ProtectedRoute requireAuth={false}>
                  <EgoDump />
                </ProtectedRoute>
              </AppLayout>
            } />
            <Route path="/auth" element={
              <AppLayout>
                <Auth />
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
