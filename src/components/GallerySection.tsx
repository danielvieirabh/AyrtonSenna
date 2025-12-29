import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";

// --- CORREÇÃO DOS IMPORTS (Nomes de variáveis válidos) ---
import trophy1988 from "@/assets/carreirasenna/1988.png";
import trophy1990 from "@/assets/carreirasenna/1990.png";
import trophy1991 from "@/assets/carreirasenna/1991.png";

// Imagens dele SEGURANDO (Hover)
import ayrton1988 from "@/assets/carreirasenna/ayrton1988.jpg";
import ayrton1990 from "@/assets/carreirasenna/ayrton1990.webp";
import ayrton1991 from "@/assets/carreirasenna/ayrton-senna-en-1991.jpg";

interface HelmetCardProps {
  imageIso: string;  // Imagem Isolada (Padrão)
  imageHeld: string; // Imagem Segurando (Hover)
  title: string;
  year: string;
  subtitle: string;
}

const HelmetCard = ({ imageIso, imageHeld, title, year, subtitle }: HelmetCardProps) => {
  return (
    <div 
      className="group relative bg-[#131512] border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#ec3211]/50 rounded-[2rem] h-[500px] md:h-[600px]"
    >
        {/* --- CAMADA 1: FOTO DO AYRTON (HOVER) --- */}
        {/* Fica escondida (opacity-0) e aparece no hover cobrindo tudo */}
        <div className="absolute inset-0 z-0">
           <img 
             src={imageHeld} 
             alt={`${title} Celebration`}
             className="w-full h-full object-cover opacity-0 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
           />
           {/* Gradiente para garantir leitura do texto no hover */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* --- CAMADA 2: IMAGEM ISOLADA (DEFAULT) --- */}
        {/* Desaparece e diminui no hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
            <img 
               src={imageIso} 
               alt={title} 
               className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>

        {/* --- TEXTOS E DETALHES --- */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex justify-between items-end">
            
            {/* Esquerda: Subtítulo */}
            <div className="flex flex-col gap-1">
                 <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/80 transition-colors">
                    {subtitle}
                 </span>
                 <div className="h-[2px] w-0 bg-[#ec3211] group-hover:w-12 transition-all duration-500 delay-100" />
            </div>

            {/* Direita: Título e Ano */}
            <div className="text-right">
                <span className="block font-sans text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                    {title}
                </span>
                <span className="block font-display font-black text-4xl md:text-5xl text-[#ec3211] leading-none mt-1">
                    {year}
                </span>
            </div>
        </div>

        {/* Efeito de brilho estático suave no card padrão */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-10 pointer-events-none group-hover:opacity-0" />
    </div>
  );
};

const SennaTrophiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Apenas os 3 itens solicitados
  const items = [
    {
      id: 1,
      imageIso: trophy1988,
      imageHeld: ayrton1988,
      title: "First Title",
      year: "1988",
      subtitle: "McLaren MP4/4",
    },
    {
      id: 2,
      imageIso: trophy1990,
      imageHeld: ayrton1990,
      title: "Bi-Champion",
      year: "1990",
      subtitle: "McLaren MP4/5B",
    },
    {
      id: 3,
      imageIso: trophy1991,
      imageHeld: ayrton1991,
      title: "Tri-Champion",
      year: "1991",
      subtitle: "McLaren MP4/6",
    }
  ];

  return (
    <section className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Background Topográfico */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,600 Q 500,200 1200,900 T 2000,300" fill="none" stroke="#ec3211" strokeWidth="1" />
            <path d="M-100,300 Q 600,1000 1200,200 T 2000,1000" fill="none" stroke="#ec3211" strokeWidth="1" />
         </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div 
          ref={ref}
          className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${
             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
           <div>
              <h2 className="font-display font-black text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
                 World <br/> 
                 <span className="text-[#ec3211]">Titles.</span>
              </h2>
           </div>
           
           <div className="hidden md:block pb-2">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 border border-white/20 px-4 py-2 rounded-full">
                 Collection 1988 — 1991
              </span>
           </div>
        </div>

        {/* Grid de 3 Colunas */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ease-out delay-300 ${
             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
           {items.map((item) => (
              <HelmetCard 
                key={item.id}
                {...item}
              />
           ))}
        </div>

      </div>
    </section>
  );
};

export default SennaTrophiesSection;