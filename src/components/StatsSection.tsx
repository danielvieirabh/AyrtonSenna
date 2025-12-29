import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

// Configuração dos dados Oficiais do Senna
const stats = [
  { 
    number: 3, 
    suffix: "x", 
    label: "World Champion", 
    subtext: "1988, 1990, 1991" 
  },
  { 
    number: 41, 
    suffix: "", 
    label: "Grand Prix Wins", 
    subtext: "Vitórias na Carreira" 
  },
  { 
    number: 65, 
    suffix: "", 
    label: "Pole Positions", 
    subtext: "O Rei da Classificação" 
  },
  { 
    number: 161, 
    suffix: "", 
    label: "Race Starts", 
    subtext: "Grandes Prêmios Disputados" 
  },
];

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  subtext: string;
  delay?: number;
}

const StatItem = ({ number, label, suffix = "", subtext, delay = 0 }: StatItemProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = number;
    // Animação mais rápida para parecer dados digitais
    const duration = 1500; 
    const step = end > 50 ? Math.ceil(end / 50) : 1; 

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div
      ref={ref}
      // Borda preta fina e fundo branco para visual "papel técnico"
      className={`group relative flex flex-col items-center justify-center py-16 md:py-28 transition-all duration-500 hover:bg-black/5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Detalhe Técnico (Canto Superior) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary w-4 h-4">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
         </svg>
      </div>

      {/* Número Principal */}
      <div className="relative z-10 flex items-baseline gap-1">
        <span className="font-display font-black text-7xl md:text-8xl lg:text-9xl text-black tracking-tighter tabular-nums group-hover:text-primary transition-colors duration-300 italic">
          {count}
        </span>
        <span className="font-display text-primary text-4xl md:text-5xl font-bold group-hover:text-black transition-colors italic">
            {suffix}
        </span>
      </div>

      {/* Label */}
      <div className="relative z-10 mt-2 flex flex-col items-center gap-2">
        <div className="h-[2px] w-12 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
        <span className="font-display text-2xl md:text-3xl text-black font-bold uppercase tracking-tight italic">
          {label}
        </span>
        <span className="font-sans text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">
          {subtext}
        </span>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-white text-black overflow-hidden border-t border-black/10">
      
      {/* 1. BACKGROUND TEXTURE (Grid Técnico) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
               <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5"/>
             </pattern>
             <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
               <rect width="100" height="100" fill="url(#smallGrid)"/>
               <path d="M 100 0 L 0 0 0 100" fill="none" stroke="black" strokeWidth="1"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 2. HEADER DA SEÇÃO */}
      <div 
        ref={ref}
        className={`pt-24 pb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-3 mb-4 border border-black/10 px-4 py-1 rounded-full bg-white">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
           <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">
             Career Telemetry
           </span>
        </div>
        
        <h2 className="font-display text-5xl md:text-7xl text-black uppercase italic tracking-tighter">
          THE <span className="text-primary">NUMBERS</span>
        </h2>
      </div>

      {/* 3. GRID DE ESTATÍSTICAS */}
      <div className="container mx-auto px-0 relative z-10 border-t border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 150}
            />
          ))}
        </div>
      </div>

      {/* 4. RODAPÉ DECORATIVO (Barra de Progresso Fake) */}
      <div className="w-full h-1 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary w-1/3 animate-[loading-bar_3s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;