import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";


const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // Reproduz o som "Siuuu" ou Estádio
    // Certifique-se de adicionar o arquivo 'siuuu.mp3' na pasta 'public' do projeto
    const audio = new Audio("/siuuu.mp3");
    audio.volume = 0.4; // Volume sutil (0.0 a 1.0)
    audio.play().catch((e) => console.log("Áudio automático bloqueado pelo navegador:", e));
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {isLoading ? (
            <Preloader onComplete={handleLoadComplete} />
          ) : (
            <>
              <CustomCursor />
              <BrowserRouter>
                <Header />
                <PageTransition />
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
