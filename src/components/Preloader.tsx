import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "INITIALIZING TELEMETRY...",
  "CHECKING TIRE PRESSURES...",
  "CALIBRATING V6 TURBO...",
  "WARMING UP TIRES...",
  "LIGHTS OUT AND AWAY WE GO!",
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 3000; // Aumentei levemente para dar tempo do carro cruzar a tela
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
      const rawProgress = Math.min(elapsed / duration, 1);
      const newProgress = easeOut(rawProgress) * 100;

      setProgress(newProgress);

      const msgIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
      setMessageIndex(msgIndex);

      if (rawProgress >= 1) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(onComplete, 800); 
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-transparent pointer-events-none`}>
      
      {/* --- CORTINAS (Split Screen Reveal) --- */}
      <div 
        className={`absolute top-0 left-0 w-full h-[50vh] bg-white transition-transform duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] z-0 ${
          isFading ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      <div 
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-white transition-transform duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] z-0 ${
          isFading ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* --- CONTEÚDO CENTRAL --- */}
      <div className={`relative z-10 flex flex-col items-center w-full max-w-3xl px-4 transition-all duration-500 ${isFading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        
        {/* TEXTO "SENNA" LIQUID FILL */}
        <div className="relative mb-2">
          <h1 
            className="font-display text-[15vw] md:text-[12rem] font-black italic leading-none text-transparent select-none tracking-tighter"
            style={{ WebkitTextStroke: "1px #e5e5e5" }}
          >
            SENNA
          </h1>
          <div 
            className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-75 ease-linear"
            style={{ height: `${progress}%` }}
          >
            <h1 className="font-display text-[15vw] md:text-[12rem] font-black italic leading-none text-primary select-none tracking-tighter">
              SENNA
            </h1>
          </div>
        </div>

        {/* --- ANIMAÇÃO DO KART/CARRO --- */}
        <div className="relative w-full max-w-md h-16 mt-4">
            
            {/* Linha da Pista */}
            <div className="absolute bottom-0 w-full h-[1px] bg-gray-300" />
            
            {/* O Carro que se move */}
            <div 
                className="absolute bottom-0 -ml-12 transition-all duration-75 ease-linear will-change-transform"
                style={{ left: `${progress}%` }}
            >
                {/* Container do Carro com Animação de Vibração (Motor) */}
                <div className="animate-rumble text-primary">
                    {/* SVG do Carro F1 Minimalista */}
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M58 12H52L48 4H42L40 12H15L12 8H4V12H2C0.9 12 0 12.9 0 14V18H4V20H12V18H46V20H54V18H58C59.1 18 60 17.1 60 16V14C60 12.9 59.1 12 58 12ZM12 16H4V14H12V16ZM54 16H46V14H54V16Z" />
                        {/* Rodas */}
                        <circle cx="8" cy="17" r="3" fill="black" />
                        <circle cx="50" cy="17" r="3" fill="black" />
                        {/* Capacete Amarelo (Detalhe Extra) */}
                        <circle cx="32" cy="10" r="2.5" fill="#FCD116" /> 
                    </svg>

                    {/* Fumaça/Vento estilizado atrás */}
                    <div className="absolute top-1/2 -left-4 w-8 h-0.5 bg-gray-200 opacity-0 animate-wind delay-100" />
                    <div className="absolute top-3/4 -left-6 w-6 h-0.5 bg-gray-200 opacity-0 animate-wind" />
                </div>
            </div>
        </div>

        {/* INFO FOOTER */}
        <div className="flex flex-col items-center gap-2 mt-8">
           <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-bold text-black tabular-nums">
                {Math.floor(progress).toString().padStart(2, '0')}
              </span>
              <span className="text-primary text-sm">%</span>
           </div>

           <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
             {loadingMessages[messageIndex]}
           </p>
        </div>

      </div>

      {/* ESTILOS EXTRAS (Keyframes) */}
      <style>{`
        /* Vibração do Motor */
        @keyframes rumble {
          0% { transform: translate(0, 0); }
          25% { transform: translate(0, -1px); }
          50% { transform: translate(0, 0); }
          75% { transform: translate(0, 1px); }
          100% { transform: translate(0, 0); }
        }
        .animate-rumble {
          animation: rumble 0.1s infinite linear;
        }

        /* Efeito de vento */
        @keyframes wind {
            0% { transform: translateX(0); opacity: 0.8; }
            100% { transform: translateX(-20px); opacity: 0; }
        }
        .animate-wind {
            animation: wind 0.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Preloader;