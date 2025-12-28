import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  // ID corrigido do vídeo (apenas o código, não a URL inteira)
  const videoId = "mmeLCAP74KA"; 

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      
      {/* 1. BACKGROUND ELEMENT (Tipografia Gigante Vazada) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <span 
          className="font-display text-[15vw] md:text-[20vw] font-black leading-none text-transparent opacity-[0.03]"
          style={{ WebkitTextStroke: "2px #D4AF37" }}
        >
          G.O.A.T.
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 2. HEADER HEADER (Estilo Lando) */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
             <div className="h-[1px] w-8 bg-[#D4AF37]" />
             <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
               Cinematic Highlights
             </span>
             <div className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            A LENDA EM AÇÃO
          </h2>
        </div>

        {/* 3. VIDEO PLAYER CONTAINER */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Moldura Decorativa Externa (efeito "Tech") */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-sm opacity-50 blur-sm" />
          
          <div className="relative aspect-video bg-[#111] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
            
            {!isPlaying ? (
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {/* Thumbnail com Zoom Lento */}
                <div className="absolute inset-0 overflow-hidden">
                   <img
                     src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                     alt="CR7 Video Thumbnail"
                     className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                   />
                   {/* Overlay Gradiente "Cinematográfico" */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Botão de Play Customizado (Estilo Vidro/Neon) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group/btn">
                     {/* Círculo Pulsante */}
                     <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-20 blur-md animate-pulse" />
                     
                     <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-[#D4AF37] group-hover/btn:border-[#D4AF37]">
                       <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 fill-current" />
                     </div>
                  </div>
                </div>

                {/* Texto Informativo no Rodapé do Vídeo */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
                  <div className="overflow-hidden">
                     <p className="font-display text-3xl md:text-4xl text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                       100 LEGENDARY GOALS
                     </p>
                  </div>
                  <div className="h-[2px] w-0 bg-[#D4AF37] mt-2 group-hover:w-24 transition-all duration-500 delay-100" />
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Watch Now • 23 Min
                  </p>
                </div>
              </div>
            ) : (
              // Player do YouTube quando ativo
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Cristiano Ronaldo Highlights"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            
            {/* Cantoneiras Decorativas (Detalhe Tech) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4AF37] pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;