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
import AudioPlayer from "@/components/AudioPlayer";


const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <style>{`
            /* Para navegadores Webkit (Chrome, Safari, Edge) */
            ::-webkit-scrollbar {
              width: 10px; /* Largura da barra */
            }

            ::-webkit-scrollbar-track {
              background: #2d2d2d; /* Fundo da trilha (cinza escuro, combina com o footer) */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #e41506; /* Cor primária vermelha (Senna/McLaren) */
              border-radius: 20px; /* Bordas bem arredondadas */
              border: 2px solid #2d2d2d; /* Borda da mesma cor do fundo para um efeito mais fino */
            }

            ::-webkit-scrollbar-thumb:hover {
              background-color: #ff3c2e; /* Vermelho um pouco mais claro para o hover */
            }

            /* Para Firefox */
            html {
              scrollbar-width: thin;
              scrollbar-color: #e41506 #2d2d2d; /* Cor do "polegar" e da trilha */
            }
          `}</style>

          {isLoading ? (
            <Preloader onComplete={handleLoadComplete} />
          ) : (
            <>
              <CustomCursor />
              <AudioPlayer />
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
