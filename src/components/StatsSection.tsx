import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef } from "react";

// Configuração dos dados
const stats = [
  { 
    number: 900, 
    suffix: "+", 
    label: "Gols Oficiais", 
    subtext: "Maior artilheiro da história" 
  },
  { 
    number: 5, 
    suffix: "", 
    label: "Ballon d'Or", 
    subtext: "Melhor do Mundo" 
  },
  { 
    number: 5, 
    suffix: "", 
    label: "Champions League", 
    subtext: "Mr. Champions" 
  },
  { 
    number: 36, 
    suffix: "+", 
    label: "Títulos", 
    subtext: "Coletivos e Seleção" 
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
    const duration = 2000; // 2 segundos
    const incrementTime = (duration / end) * 1.5; // Ajuste de velocidade

    // Para números pequenos, vai mais devagar. Para grandes, mais rápido.
    const step = end > 100 ? Math.ceil(end / 100) : 1; 

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, end > 100 ? 20 : 100);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col items-center justify-center py-12 md:py-24 transition-all duration-700 hover:bg-[#111] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Effect no Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Número Principal */}
      <div className="relative z-10 font-display font-black text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter tabular-nums group-hover:text-[#D4AF37] transition-colors duration-300">
        {count}
        <span className="text-[#D4AF37] text-4xl md:text-6xl align-top ml-1 group-hover:text-white transition-colors">{suffix}</span>
      </div>

      {/* Label */}
      <div className="relative z-10 mt-4 flex flex-col items-center gap-1">
        <span className="font-serif text-lg md:text-xl text-white font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className="font-sans text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors">
          {subtext}
        </span>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-black text-white overflow-hidden border-t border-white/10">
      
      {/* 1. BACKGROUND TEXTURE (Linhas Técnicas) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
           </pattern>
           <rect width="100%" height="100%" fill="url(#grid)" />
           {/* Linhas Curvas */}
           <path d="M-100,200 Q 600,800 1200,100 T 2000,500" fill="none" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>

      {/* 2. HEADER DA SEÇÃO */}
      <div 
        ref={ref}
        className={`pt-24 pb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-4 mb-4">
           <div className="h-[1px] w-12 bg-[#D4AF37]" />
           <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
             The Numbers
           </span>
           <div className="h-[1px] w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-white uppercase">
          Estatísticas <span className="italic text-gray-600">Lendárias</span>
        </h2>
      </div>

      {/* 3. GRID DE ESTATÍSTICAS */}
      <div className="container mx-auto px-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 150}
            />
          ))}
        </div>
      </div>

      {/* 4. RODAPÉ DECORATIVO DA SEÇÃO */}
      <div className="w-full h-2 bg-gradient-to-r from-black via-[#D4AF37] to-black opacity-50" />
    </section>
  );
};

export default StatsSection;