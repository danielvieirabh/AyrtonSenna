import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { MapPin, Heart, Star, Trophy } from "lucide-react";

// Suas imagens importadas
import sennaFlag from "@/assets/sennabrasil.jpg"; 
import crowdTexture from "@/assets/interlagos.jpg"; // A imagem da torcida que você importou

const BrazilSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 bg-[#F0F0F0] overflow-hidden text-black">
      
      {/* 1. BACKGROUND TEXTURA (Torcida) */}
      {/* A imagem da torcida fica em escala de cinza, com baixa opacidade, criando uma "textura de história" */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none mix-blend-multiply opacity-[0.08]">
         <img 
            src={crowdTexture} 
            alt="Crowd Texture" 
            className="w-full h-full object-cover grayscale contrast-125"
         />
      </div>

      {/* 2. LUZES AMBIENTES (Cores do Brasil como Glow) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#009B3A] rounded-full blur-[150px] opacity-10 mix-blend-multiply translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FEDD00] rounded-full blur-[120px] opacity-15 mix-blend-multiply -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* 3. MARQUEE TIPOGRÁFICO (Movimento) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none z-0">
         <div className="whitespace-nowrap animate-marquee">
            <span className="font-display font-black text-[15vw] leading-none text-black">
               AYRTON SENNA DO BRASIL — ORGULHO NACIONAL — 
            </span>
            <span className="font-display font-black text-[15vw] leading-none text-black">
               AYRTON SENNA DO BRASIL — ORGULHO NACIONAL — 
            </span>
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div 
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          
          {/* --- COLUNA ESQUERDA: NARRATIVA --- */}
          <div className={`lg:col-span-5 flex flex-col items-start transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
             
             {/* Tag / Badge */}
             <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-black/20"></div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#009B3A]">
                   National Hero
                </span>
             </div>

             {/* Título Principal */}
             <h2 className="font-display font-black text-6xl md:text-8xl leading-[0.85] text-black mb-8 tracking-tighter">
                HERÓI DO <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009B3A] to-[#002776]">
                   BRASIL.
                </span>
             </h2>

             {/* Citação Destacada */}
             <div className="relative pl-6 border-l-4 border-[#FEDD00] mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-r-xl w-full">
                <p className="font-serif italic text-2xl md:text-3xl text-gray-900 leading-tight">
                   "Brasileiro, com muito orgulho, com muito amor."
                </p>
             </div>

             <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-md mb-10">
                Mais do que troféus, Ayrton carregava a esperança de uma nação inteira no cockpit. A cada vitória, as manhãs de domingo se tornavam feriados nacionais.
             </p>

             {/* Cards de Estatísticas */}
             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col items-start group hover:border-[#009B3A] transition-colors duration-300">
                   <Trophy className="text-gray-300 group-hover:text-[#009B3A] mb-3 transition-colors" size={24} />
                   <span className="font-display font-black text-4xl text-black leading-none">02</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Vitórias em Interlagos</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col items-start group hover:border-[#FEDD00] transition-colors duration-300">
                   <Heart className="text-gray-300 group-hover:text-[#FEDD00] mb-3 transition-colors" size={24} />
                   <span className="font-display font-black text-4xl text-black leading-none">∞</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Ídolo Eterno</span>
                </div>
             </div>
          </div>

          {/* --- COLUNA DIREITA: IMAGEM VISUAL --- */}
          <div className={`lg:col-span-7 relative h-[600px] md:h-[750px] transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
             
             {/* Ano Gigante (Outline) atrás da imagem */}
             <div className="absolute -top-16 -right-10 z-0 select-none hidden md:block">
                <span className="font-display font-black text-[12rem] text-transparent leading-none opacity-20" style={{ WebkitTextStroke: "3px #d1d5db" }}>
                   1991
                </span>
             </div>

             {/* Container da Imagem */}
             <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl group border-[6px] border-white">
                
                {/* Imagem Senna */}
                <img 
                   src={sennaFlag} 
                   alt="Senna holding Brazilian Flag" 
                   className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                
                {/* Gradiente Overlay (Verde/Amarelo sutil na base) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002776]/90 via-transparent to-transparent opacity-80" />

                {/* Informação sobre a imagem (Bottom Left) */}
                <div className="absolute bottom-10 left-10 text-white z-20">
                   <div className="flex items-center gap-2 mb-3">
                      <Star className="text-[#FEDD00] fill-[#FEDD00]" size={16} />
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                         GP do Brasil, 1991
                      </span>
                   </div>
                   <h3 className="font-display font-bold text-3xl md:text-5xl leading-[0.9] max-w-lg mb-4">
                      A VITÓRIA DA SUPERAÇÃO.
                   </h3>
                   <div className="h-1 w-12 bg-[#FEDD00] rounded-full"></div>
                </div>

             </div>

             {/* Sticker "100% Brasileiro" (Flutuante) */}
             <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-[#FEDD00] text-black p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transform -rotate-6 hover:rotate-0 transition-transform duration-300 cursor-default border-4 border-white z-30">
                <div className="flex flex-col items-center">
                    <span className="block font-display font-black text-3xl md:text-4xl leading-none">100%</span>
                    <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-widest mt-1">Brasileiro</span>
                </div>
             </div>

          </div>

        </div>
      </div>

      {/* Styles para Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrazilSection;