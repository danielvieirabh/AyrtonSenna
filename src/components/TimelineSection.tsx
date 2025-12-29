import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Trophy, Flag, Timer } from "lucide-react";

import senna1984 from "@/assets/senna1984.jpg"; 
import senna1985 from "@/assets/ayrtonsennaimola1985.jpg"; 
import senna1988 from "@/assets/f1-japanese-gp-1988-podium-win.jpg";
import senna1990 from "@/assets/canada90-1.jpg";
import senna1991 from "@/assets/1991camp.jpeg";
import senna1993 from "@/assets/Senna-Prost-F1.webp";
import senna1994 from "@/assets/morte.avif";

// --- DADOS DA CARREIRA DE SENNA ---
const timelineData = [
  {
    year: "1984",
    title: "O Prodígio na Chuva",
    team: "Toleman-Hart",
    image: senna1984, // Substitua por foto da Toleman/Monaco 84
    stats: "GP de Mônaco (2º Lugar)",
    desc: "Sua estreia na F1 e a lendária performance sob chuva em Mônaco que chocou o mundo.",
    icon: <Flag size={18} />
  },
  {
    year: "1985",
    title: "Primeira Vitória",
    team: "Lotus-Renault",
    image: senna1985, // Substitua por foto da Lotus JPS (Estoril)
    stats: "GP de Portugal (Estoril)",
    desc: "Debaixo de um dilúvio, Ayrton conquista sua primeira vitória com uma volta de vantagem sobre o terceiro.",
    icon: <Trophy size={18} />
  },
  {
    year: "1988",
    title: "O Primeiro Mundial",
    team: "McLaren-Honda",
    image: senna1988, // Substitua por foto da MP4/4
    stats: "8 Vitórias | 13 Poles",
    desc: "A bordo do imbatível MP4/4, Senna derrota Prost no Japão e conquista seu primeiro título.",
    icon: <Trophy size={18} className="text-yellow-500" />
  },
  {
    year: "1990",
    title: "Bicampeão",
    team: "McLaren-Honda",
    image: senna1990, // Substitua por foto da Batida com Prost
    stats: "6 Vitórias | 10 Poles",
    desc: "Uma revanche histórica contra Prost em Suzuka garante o segundo campeonato mundial.",
    icon: <Trophy size={18} className="text-yellow-500" />
  },
  {
    year: "1991",
    title: "O Tri em Interlagos",
    team: "McLaren-Honda",
    image: senna1991 , // Substitua por foto da Vitória no Brasil
    stats: "Vitória Épica no Brasil",
    desc: "Com apenas a sexta marcha nas voltas finais, Senna vence em casa e sela o tricampeonato no fim do ano.",
    icon: <Trophy size={18} className="text-yellow-500" />
  },
  {
    year: "1993",
    title: "Volta dos Deuses",
    team: "McLaren-Ford",
    image: senna1993, // Substitua por foto de Donington
    stats: "GP da Europa (Donington)",
    desc: "A melhor primeira volta da história da F1, ultrapassando 4 carros na chuva para liderar.",
    icon: <Timer size={18} />
  },
  {
    year: "1994",
    title: "O Legado Eterno",
    team: "Williams-Renault",
    image: senna1994, // Substitua por foto do Capacete
    stats: "65 Poles Totais",
    desc: "Sua busca pela perfeição e velocidade pura continua inspirando gerações até hoje.",
    icon: <Flag size={18} />
  },
];

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // Cor principal do tema (ex: Amarelo Senna ou Verde Nacional)
  const accentColor = "text-[#FEDD00]"; 
  const accentBg = "bg-[#FEDD00]";
  const accentBorder = "border-[#FEDD00]";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollDistance = height - windowHeight;
      const scrolled = -top;
      
      let p = scrolled / scrollDistance;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[400vh] bg-white text-black font-sans" 
    >
      <div 
        ref={animRef}
        className={`sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        
        {/* --- Background Elements (Pista / Curvas) --- */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,500 Q 400,100 800,500 T 1600,500" fill="none" stroke="black" strokeWidth="2" />
           </svg>
           <div className="absolute top-0 right-20 h-full w-px bg-black/10"></div>
        </div>

        {/* --- Header Fixo --- */}
        <div className="absolute top-8 left-6 md:left-24 z-20">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-[2px] ${accentBg}`}></div>
            <span className={`font-sans text-xs font-bold uppercase tracking-[0.3em] ${accentColor}`}>
              Career Timeline
            </span>
          </div>
          <h2 className="font-serif italic text-5xl md:text-7xl text-black leading-none">
            A BUSCA PELA <br/> PERFEIÇÃO
          </h2>
        </div>

        {/* --- Horizontal Track --- */}
        <div 
          ref={trackRef}
          className="flex gap-8 md:gap-24 px-6 md:px-24 w-max items-center will-change-transform mt-20"
          style={{ 
            transform: `translateX(calc(10vw - ${progress * (timelineData.length * 75)}vh))` 
          }}
        >
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[50vh] flex-shrink-0 group cursor-pointer"
            >
              <div className="relative flex flex-col gap-6">
                
                {/* 1. Imagem (Cartão Vertical) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                   {/* Overlay Amarelo no Hover */}
                   <div className={`absolute inset-0 z-10 ${accentBg} mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                   
                   <img
                     src={item.image}
                     alt={item.title}
                     className="absolute inset-0 z-0 h-full w-full object-cover filter grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                   />
                   
                   {/* Ano Vazado (Estilo Racing Number) */}
                   <div className="absolute -top-12 -left-4 z-20 pointer-events-none mix-blend-difference">
                      <span 
                        className="font-display text-[7rem] md:text-[9rem] font-black leading-none text-white opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ WebkitTextStroke: "0px" }}
                      >
                        {item.year}
                      </span>
                   </div>

                   {/* Ícone no Canto */}
                   <div className={`absolute bottom-0 right-0 p-4 bg-white z-20 ${accentColor}`}>
                      {item.icon}
                   </div>
                </div>

                {/* 2. Informações */}
                <div className={`flex flex-col border-l-4 ${accentBorder} pl-6 transition-all duration-300 group-hover:pl-8`}>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1">
                       {item.team}
                     </span>
                  </div>
                  
                  <h3 className="mb-3 font-display font-bold text-3xl md:text-4xl text-black leading-[0.9] uppercase">
                    {item.title}
                  </h3>
                  
                  <p className="font-serif italic text-gray-600 text-lg leading-relaxed max-w-sm mb-4">
                    "{item.desc}"
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="flex items-center gap-2 text-xs font-bold text-black border-t border-gray-200 pt-3 mt-auto">
                    <Trophy size={14} className={accentColor} />
                    <span>{item.stats}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- Progress Bar Inferior --- */}
        <div className="absolute bottom-12 left-6 right-6 md:left-24 md:right-24 z-20">
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
             <span>Start: 1984</span>
             <span>Legacy Forever</span>
           </div>
           <div className="h-[4px] w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${accentBg}`}
                style={{ width: `${progress * 100}%` }}
              />
           </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;