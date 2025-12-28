import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "INITIALIZING LEGACY...",
  "LOADING ASSETS...",
  "CALIBRATING STATS...",
  "PREPARING ARENA...",
  "GOAT STATUS: CONFIRMED",
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 segundos de load
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Easing function (easeOutQuart) para o número desacelerar no final
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
      const rawProgress = Math.min(elapsed / duration, 1);
      const newProgress = easeOut(rawProgress) * 100;

      setProgress(newProgress);

      // Troca mensagens baseado no progresso
      const msgIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
      setMessageIndex(msgIndex);

      if (rawProgress >= 1) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(onComplete, 800); // Tempo da animação de saída
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-transparent pointer-events-none`}>
      
      {/* --- CORTINAS DO PRELOADER (Split Screen Reveal) --- */}
      {/* Parte Superior */}
      <div 
        className={`absolute top-0 left-0 w-full h-[50vh] bg-[#050505] transition-transform duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] z-0 ${
          isFading ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      {/* Parte Inferior */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] transition-transform duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] z-0 ${
          isFading ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* --- CONTEÚDO CENTRAL --- */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${isFading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        
        {/* TEXTO CR7 "LIQUID FILL" */}
        <div className="relative mb-12">
          {/* 1. Camada de Fundo (Outline/Stroke) */}
          <h1 
            className="font-display text-[15vw] md:text-[12rem] font-black leading-none text-transparent select-none"
            style={{ WebkitTextStroke: "1px #333" }}
          >
            CR7
          </h1>

          {/* 2. Camada de Preenchimento (Dourado) - Clipada pela altura */}
          <div 
            className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-75 ease-linear"
            style={{ height: `${progress}%` }}
          >
            <h1 className="font-display text-[15vw] md:text-[12rem] font-black leading-none text-[#D4AF37] select-none">
              CR7
            </h1>
          </div>
        </div>

        {/* INFO FOOTER */}
        <div className="flex flex-col items-center gap-4">
           {/* Contador com estilo Mono */}
           <div className="flex items-baseline gap-1">
              <span className="font-mono text-4xl md:text-6xl font-bold text-white tabular-nums">
                {Math.floor(progress).toString().padStart(2, '0')}
              </span>
              <span className="text-[#D4AF37] text-xl">%</span>
           </div>

           {/* Barra de Progresso Decorativa */}
           <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#D4AF37] animate-loading-bar" />
           </div>

           {/* Texto de Status que muda */}
           <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-500 animate-pulse">
             {loadingMessages[messageIndex]}
           </p>
        </div>

      </div>

      {/* ESTILOS EXTRAS */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Preloader;