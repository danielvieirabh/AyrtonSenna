import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, Twitter, Youtube, Facebook, ArrowUpRight } from "lucide-react";

// --- IMPORTS DAS IMAGENS ---
import airtoncapacete from "@/assets/airtoncomcapacete.png"; 
import pasta from "@/assets/pasta.svg"; 

const FooterSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Configuração de Cores (Texto apenas)
  const accentColor = "text-primary"; 

  return (
    // Fundo Transparente (Remove o Vermelho)
    <footer className="relative pt-10 px-2 md:px-4 pb-0 min-h-screen flex flex-col z-0 overflow-hidden bg-transparent">
      
      {/* --- Wrapper do Cartão para Animação --- */}
      <div 
        ref={ref}
        className={`flex-grow flex flex-col relative z-10 transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* Ponta da Pasta (Aba Superior) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1a1a1a] rotate-45 rounded-sm -z-10 shadow-2xl"></div>

        {/* --- CORPO PRINCIPAL COM IMAGEM DA PASTA (Remove o Preto) --- */}
        <div 
            className="relative rounded-t-3xl rounded-b-[3rem] md:rounded-b-[5rem] flex-grow flex flex-col items-center shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: `url(${pasta})`, 
                backgroundColor: 'transparent' // Garante que não tenha fundo preto
            }} 
        >
            
            {/* Textura de Fundo (Topografia) - Linhas Vermelhas */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none select-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    {/* Alterado stroke para vermelho */}
                    <path d="M-100,600 Q 500,200 1200,900 T 2000,300" fill="none" stroke="red" strokeWidth="1" />
                </svg>
            </div>

            {/* CONTEÚDO */}
            <div className="container mx-auto px-6 pt-16 md:pt-20 flex flex-col items-center w-full h-full relative z-20 flex-grow">

                {/* 1. TEXTO TOPO */}
                <div className="text-center mb-[-20px] md:mb-[-40px] relative z-20 mix-blend-screen">
                    <h2 className="font-display font-black text-5xl md:text-7xl lg:text-9xl text-white uppercase tracking-tighter leading-[0.9]">
                        DRIVEN TO
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <h2 className={`font-serif italic text-5xl md:text-7xl lg:text-9xl ${accentColor} leading-[0.9]`}>
                            PERFECTION.
                        </h2>
                        <span className={`hidden md:block font-handwriting text-4xl ${accentColor} opacity-50 absolute top-10 right-0 -rotate-12`}>
                            Senna S
                        </span>
                    </div>
                </div>

                {/* 2. GRID CENTRAL */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full mt-10 mb-20">
                    
                    {/* MENU ESQUERDA */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start gap-6 order-2 md:order-1">
                        <h3 className="font-sans text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Menu</h3>
                        <div className="flex flex-col gap-3 text-center md:text-left">
                            {['HOME', 'ON TRACK', 'OFF TRACK', 'CALENDAR', 'STORE'].map((item) => (
                            <a key={item} href="#" className={`font-display text-2xl md:text-3xl text-white hover:${accentColor} transition-colors uppercase leading-none`}>
                                {item}
                            </a>
                            ))}
                        </div>
                    </div>

                    {/* CAPACETE CENTRO */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center order-1 md:order-2">
                        <div className="relative w-[280px] md:w-[400px] lg:w-[500px] transition-transform duration-500 hover:scale-105 z-10">
                            <img src={airtoncapacete} alt="Senna Helmet" className="w-full h-auto drop-shadow-2xl" />
                        </div>
                        <div className="mt-6 md:-mt-8 relative z-20">
                            {/* Botão com fundo primary (vermelho/verde) mantido para destaque */}
                            <button className={`bg-primary text-white font-black uppercase py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 text-sm tracking-wide shadow-[0_10px_40px_-10px_rgba(200,0,0,0.4)]`}>
                                Business Enquiries <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* SOCIAL DIREITA */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-end gap-6 order-3">
                        <h3 className="font-sans text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Follow</h3>
                        <div className="flex flex-col gap-3 text-center md:text-right">
                            {[
                                { name: "INSTAGRAM", icon: Instagram },
                                { name: "YOUTUBE", icon: Youtube },
                                { name: "TWITTER", icon: Twitter },
                                { name: "FACEBOOK", icon: Facebook }
                            ].map((social) => (
                            <a key={social.name} href="#" className={`font-display text-2xl md:text-3xl text-white hover:${accentColor} transition-colors uppercase leading-none`}>
                                {social.name}
                            </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. PISTA DE KART ANIMADA */}
                <div className="mt-auto w-full relative h-32 overflow-hidden border-t border-white/5">
                    
                    {/* Zebras da Pista (Fundo) */}
                    <div className="absolute bottom-0 left-0 w-full h-4 flex opacity-30">
                        <div className="w-full h-full" style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, #333, #333 40px, #fff 40px, #fff 80px)'
                        }}></div>
                    </div>

                    {/* O Kart Animado */}
                    <div className="absolute bottom-2 left-[-150px] animate-race will-change-transform">
                        {/* Rastro */}
                        <div className="absolute top-1/2 right-0 w-40 h-[2px] bg-gradient-to-l from-transparent to-white/20 blur-sm translate-x-full"></div>
                        
                        {/* SVG do Kart */}
                        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            <path d="M10 25H110L105 15H30L20 25H10Z" fill="currentColor" />
                            <circle cx="25" cy="25" r="8" fill="#333" stroke="currentColor" strokeWidth="2" className="animate-spin-slow" />
                            <circle cx="95" cy="25" r="8" fill="#333" stroke="currentColor" strokeWidth="2" className="animate-spin-slow" />
                            <circle cx="60" cy="12" r="5" fill="#FEDD00" />
                            <path d="M5 10H20V25H5V10Z" fill="currentColor" />
                            <path d="M100 15H115V25H100V15Z" fill="currentColor" />
                        </svg>
                    </div>

                </div>

            </div>
        </div>
      </div>

      {/* --- RODAPÉ REAL --- */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 text-black font-bold text-[10px] md:text-xs uppercase tracking-widest gap-4 relative z-0">
          <span className="hover:text-primary transition-colors cursor-default">
             © 2025 Senna Brands. All rights reserved
          </span>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary transition-colors hover:underline">Privacy Policy</a>
             <a href="#" className="hover:text-primary transition-colors hover:underline">Terms of Use</a>
          </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes race {
          0% { transform: translateX(-20vw); }
          100% { transform: translateX(120vw); }
        }
        .animate-race {
          animation: race 6s linear infinite;
        }
        @keyframes spin-slow {
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            transform-origin: center;
            animation: spin-slow 0.5s linear infinite;
        }
      `}</style>

    </footer>
  );
};

export default FooterSection;