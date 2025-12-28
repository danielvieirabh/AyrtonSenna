import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";

// Você pode usar uma imagem do CR7 meio confuso ou pedindo calma
// Se não tiver, o layout funciona bem só com tipografia
import cr7Confused from "@/assets/cr7normal.png"; 

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black overflow-hidden text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. BACKGROUND TEXTURE (Igual ao Hero/Footer para consistência) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <path d="M-100,600 Q 500,200 1200,900 T 2000,300" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
           <path d="M-100,300 Q 600,1000 1200,200 T 2000,1000" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>

      {/* 2. NUMERAÇÃO GIGANTE DE FUNDO (404 VAZADO) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <span 
          className="font-display text-[30vw] font-black leading-none text-transparent opacity-20 blur-sm"
          style={{ WebkitTextStroke: "2px #333" }}
        >
          404
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Ícone de Alerta Dourado */}
        <div className="flex justify-center mb-6">
           <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 animate-pulse">
              <AlertCircle size={32} className="text-[#D4AF37]" />
           </div>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
          OFFSIDE! <span className="text-[#D4AF37]">IMPEDIMENTO</span>
        </h1>

        {/* Texto Descritivo */}
        <p className="font-sans text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
          Parece que você tentou um passe longo demais. 
          A página <span className="text-white font-mono bg-white/10 px-2 py-1 rounded mx-1">{location.pathname}</span> não existe no nosso campo de jogo.
        </p>

        {/* Botão de Voltar (Estilo Lando/CR7) */}
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-[#D4AF37] px-8 py-4 font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <ArrowLeft className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1" size={20} />
            
            {/* Texto com efeito de máscara (Slide Up) */}
            <div className="relative h-5 w-32 overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
                <span className="flex h-5 items-center justify-center text-sm font-black uppercase tracking-wider">
                  VOLTAR AO JOGO
                </span>
                <span className="flex h-5 items-center justify-center text-sm font-black uppercase tracking-wider text-white">
                  VOLTAR AO JOGO
                </span>
              </div>
            </div>
          </Link>
        </div>

      </div>

      {/* Rodapé Decorativo Fixo */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
         <p className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-[0.5em] opacity-60">
           System Error • Legacy Protocol
         </p>
      </div>

    </div>
  );
};

export default NotFound;