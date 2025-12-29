import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

// Imagens
import airtoncom from "@/assets/sennacapacetelado.png"; 
import airtonsem from "@/assets/sennasemcapacetelado.png"; 

const TrackSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const transitionSettings = "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]";

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F7F5] py-24 md:py-40">
      
      {/* BACKGROUND SVG (Linhas) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <svg width="100%" height="100%" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M-100,200 Q 400,600 900,100 T 1800,500" fill="none" stroke="#D1D1D1" strokeWidth="1" />
            <path d="M-100,500 Q 500,100 1100,700 T 2000,300" fill="none" stroke="#D1D1D1" strokeWidth="1" />
            <path d="M 200,800 Q 600,400 1200,900" fill="none" stroke="#D1D1D1" strokeWidth="1" />
            <path d="M 1200,100 Q 900,500 1400,800" fill="none" stroke="#D1D1D1" strokeWidth="1" />
         </svg>
      </div>

      <div 
        ref={ref}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[500px]">
          
          {/* --- COLUNA ESQUERDA: NA PISTA --- */}
          <div className="relative flex flex-col md:items-end text-center md:text-right">
             
             {/* Imagem Capacete */}
             <div className={`hidden md:block absolute right-[100%] top-1/2 -translate-y-1/2 w-[300px] lg:w-[480px] pointer-events-none z-0 ${transitionSettings} delay-300
                ${isVisible ? "opacity-100 translate-x-20 lg:translate-x-10" : "opacity-0 translate-x-[120%] scale-90"}`}
             >
                <img src={airtoncom} alt="Capacete Senna" className="w-full h-auto object-contain drop-shadow-2xl"/>
             </div>

             {/* Versão Mobile */}
             <div className={`md:hidden w-64 mx-auto mb-8 ${transitionSettings} ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <img src={airtoncom} alt="Capacete Senna" className="w-full h-auto" />
             </div>

             {/* Texto */}
             <div className={`relative z-10 md:pr-8 lg:pr-16 ${transitionSettings} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
                <div className="relative inline-block">
                    {/* Rabisco Neon */}
                    <div className={`absolute top-0 left-0 w-full h-full z-0 scale-125 -rotate-2 ${transitionSettings} delay-700 ${isVisible ? "opacity-90" : "opacity-0 scale-90"}`}>
                        <svg viewBox="0 0 100 50" className="w-full h-full text-[#e60505]" fill="currentColor">
                           <path d="M5,35 Q 25,10 50,25 T 95,30 L 90,45 Q 60,30 30,45 T 0,35 Z" />
                        </svg>
                    </div>
                    <h2 className="relative z-10 font-serif italic text-4xl md:text-5xl lg:text-6xl text-black leading-none mb-[-5px]">NA</h2>
                </div>
                {/* Fonte Impactante para 'PISTA' */}
                <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-black tracking-tighter leading-[0.85] uppercase">
                   PISTA
                </h2>
                <p className="font-sans font-medium text-gray-500 mt-6 max-w-[280px] mx-auto md:ml-auto md:mr-0 text-sm md:text-base leading-relaxed">
                   Resultados recentes, estatísticas de carreira e fotos exclusivas do circuito.
                </p>
                {/* Botão */}
                <div className="mt-8 flex justify-center md:justify-end">
                   <button className="group bg-[#08b4e9] hover:bg-[#e41506] text-black w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                   </button>
                </div>
             </div>
          </div>


          {/* --- COLUNA DIREITA: FORA DA PISTA --- */}
          <div className="relative mt-16 md:mt-0 flex flex-col md:items-start text-center md:text-left">
             
             {/* Imagem Rosto */}
             <div className={`hidden md:block absolute left-[100%] top-1/2 -translate-y-1/2 w-[300px] lg:w-[480px] pointer-events-none z-0 ${transitionSettings} delay-300
                ${isVisible ? "opacity-100 -translate-x-20 lg:-translate-x-10" : "opacity-0 -translate-x-[120%] scale-90"}`}
             >
                <img src={airtonsem} alt="Ayrton Senna" className="w-full h-auto object-contain drop-shadow-2xl"/>
             </div>

              {/* Versão Mobile */}
              <div className={`md:hidden w-64 mx-auto mb-8 order-first ${transitionSettings} delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <img src={airtonsem} alt="Ayrton Senna" className="w-full h-auto" />
             </div>

             {/* Texto */}
             <div className={`relative z-10 md:pl-8 lg:pl-16 ${transitionSettings} delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
                <div className="relative inline-block">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-black leading-none mb-[-5px]">FORA</h2>
                </div>
                <div className="relative inline-block">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-black leading-none mb-[-5px]">DA</h2>
                </div>
                {/* Fonte Impactante para 'PISTA' */}
                <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-black tracking-tighter leading-[0.85] uppercase">
                   PISTA
                </h2>
                <p className="font-sans font-medium text-gray-500 mt-6 max-w-[280px] mx-auto md:mr-auto md:ml-0 text-sm md:text-base leading-relaxed">
                   Campanhas, bastidores e materiais promocionais exclusivos para fãs.
                </p>
                {/* Botão */}
                <div className="mt-8 flex justify-center md:justify-start">
                   <button className="group bg-[#e41506] hover:bg-[#08b4e9] text-black w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrackSection;