import React from "react";

// --- 1. Ícone da Sacola (SVG Original do Lando Norris) ---
const LandoStoreIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 17 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-4 h-4 text-current"
  >
    <path 
      d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" 
      stroke="currentColor" 
      strokeWidth="1.949" 
      strokeMiterlimit="10"
    />
  </svg>
);

// --- 2. Componente de Botão Animado (Texto Deslizante) ---
interface LandoButtonProps {
  text: string;
  icon?: React.ComponentType;
  onClick?: () => void;
}

const LandoButton = ({ text, icon: Icon, onClick }: LandoButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-[#D4AF37] px-6 py-3 font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
    >
      {/* Ícone com leve rotação no hover */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        {Icon && <Icon />}
      </div>

      {/* Container de Texto Deslizante (Máscara) */}
      <div className="relative h-5 w-16 overflow-hidden">
        <div className="absolute top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
          {/* Texto Original */}
          <span className="flex h-5 items-center justify-start text-sm font-bold uppercase tracking-wider">
            {text}
          </span>
          {/* Texto Cópia (que sobe e substitui o original) */}
          <span className="flex h-5 items-center justify-start text-sm font-bold uppercase tracking-wider text-black">
            {text}
          </span>
        </div>
      </div>
    </button>
  );
};

// --- 3. Componente de Menu Hamburguer Animado ---
const LandoMenuButton = () => {
  return (
    <button className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#D4AF37]">
      <div className="flex flex-col gap-1.5 transition-all duration-300 group-hover:rotate-180">
        <span className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-4 group-hover:translate-x-1"></span>
        <span className="h-0.5 w-6 bg-white"></span>
        <span className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-4 group-hover:-translate-x-1"></span>
      </div>
    </button>
  );
};

// --- 4. Componente Principal do Header ---
const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 md:px-12 pointer-events-none">
      
      {/* Esquerda: Nome do Cristiano */}
      <div className="flex flex-col font-serif font-bold leading-tight tracking-tight pointer-events-auto">
        <span className="text-3xl md:text-5xl text-white">CRISTIANO</span>
        <span className="text-3xl md:text-5xl text-[#D4AF37]">RONALDO</span>
      </div>

      {/* Centro: Logo CR7 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 pointer-events-auto">
        <span className="font-sans text-2xl font-black italic tracking-tighter text-[#D4AF37]">
          CR7
        </span>
      </div>

      {/* Direita: Botões Animados */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <LandoButton 
          text="STORE" 
          icon={LandoStoreIcon} 
          onClick={() => console.log("Open Store")}
        />
        <LandoMenuButton />
      </div>

    </nav>
  );
};

export default Header;