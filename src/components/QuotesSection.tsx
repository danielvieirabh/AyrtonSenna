import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Adicione uma imagem de fundo impactante (preto e branco ou escura)
// Exemplo: Foto dele concentrado antes de um jogo
const BACKGROUND_IMAGE = "https://wallpapers.com/images/hd/cristiano-ronaldo-black-and-white-portrait-r4v5s5z5x5w5y5z5.jpg"; 

const quotes = [
  {
    text: "Talento sem trabalho duro não é nada.",
    context: "DEDICAÇÃO",
  },
  {
    text: "Seu amor me faz forte. Seu ódio me faz imparável.",
    context: "MOTIVAÇÃO",
  },
  {
    text: "Eu não persigo recordes. Os recordes me perseguem.",
    context: "LEGADO",
  },
  {
    text: "Eu sou o melhor, não preciso provar nada a ninguém.",
    context: "CONFIANÇA",
  },
  {
    text: "A vida é dura quando você é o melhor do mundo.",
    context: "PRESSÃO",
  },
];

const QuotesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>();

  // Duração de cada slide em ms
  const DURATION = 6000; 

  // Lógica da Barra de Progresso
  useEffect(() => {
    if (!isVisible) return;

    // Reseta progresso ao mudar slide
    setProgress(0);

    const startTime = Date.now();
    
    // Intervalo rápido para animar a barra suavemente
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / DURATION) * 100, 100);
      
      setProgress(percentage);

      if (elapsed >= DURATION) {
        nextQuote();
      }
    }, 50); // Atualiza a cada 50ms

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [currentQuote, isVisible]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden text-white">
      
      {/* 1. IMAGEM DE FUNDO (Parallax/Fixed) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      
      {/* Gradiente para suavizar as bordas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0" />

      {/* 2. ELEMENTO DECORATIVO (Aspas Gigantes) */}
      <div className="absolute top-10 left-10 md:left-40 opacity-[0.05] pointer-events-none">
         <Quote size={300} fill="currentColor" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Contexto (Tag Dourada) */}
          <div className="mb-10 inline-block">
             <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                  {quotes[currentQuote].context}
                </span>
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
             </div>
          </div>

          {/* Citação Principal */}
          <div className="relative min-h-[250px] flex items-center justify-center">
            <h2
              key={currentQuote}
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white animate-fade-in-up drop-shadow-2xl"
            >
              "{quotes[currentQuote].text}"
            </h2>
          </div>

          {/* Controles e Progresso */}
          <div className="flex flex-col items-center gap-8 mt-16">
            
            {/* Barra de Progresso */}
            <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear shadow-[0_0_10px_#D4AF37]"
                 style={{ width: `${progress}%` }}
               />
            </div>

            {/* Botões de Navegação */}
            <div className="flex items-center gap-12">
              <button
                onClick={prevQuote}
                className="group p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black"
                aria-label="Citação anterior"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
              </button>

              <span className="font-sans text-xs tracking-[0.2em] text-gray-500">
                 {currentQuote + 1} <span className="text-[#D4AF37]">/</span> {quotes.length}
              </span>

              <button
                onClick={nextQuote}
                className="group p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black"
                aria-label="Próxima citação"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Assinatura */}
          <div className="mt-12 opacity-60">
             <p className="font-display text-lg tracking-wider text-white">Cristiano Ronaldo</p>
             <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mt-1">Mentalidade</p>
          </div>

        </div>
      </div>
      
      {/* Estilo para animação de entrada do texto */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default QuotesSection;