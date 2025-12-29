import React from "react";

// --- 1. Ícone da Sacola ---
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

// --- 2. Ícone de Kart Animado (NOVO) ---
const KartIcon = () => (
  <div className="relative group cursor-pointer">
    <svg 
      width="60" 
      height="30" 
      viewBox="0 0 60 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      // CLASSE ATUALIZADA:
      // 1. animate-drive: Faz ele tremer (motor ligado)
      // 2. hover:animate-[spin_0.6s_linear_infinite]: Faz girar rápido no hover
      // 3. transition-colors: Suaviza a troca de cor
      className="text-black opacity-20 transition-all duration-300 
                 hover:opacity-100 hover:text-primary 
                 animate-drive hover:animate-[spin_0.6s_linear_infinite]"
    >
       <path d="M15 12H8V20H15V12Z" fill="currentColor"/>
       <path d="M52 12H45V20H52V12Z" fill="currentColor"/>
       <path d="M4 18H56" stroke="currentColor" strokeWidth="2"/>
       <path d="M20 18L24 8H36L40 18" stroke="currentColor" strokeWidth="2"/>
       {/* Capacete (Detalhe) */}
       <circle cx="30" cy="10" r="4" fill="currentColor" />
       {/* Chassi */}
       <rect x="2" y="22" width="56" height="2" fill="currentColor" />
    </svg>

    {/* Keyframes customizados injetados localmente */}
    <style>{`
      @keyframes drive {
        0% { transform: translate(0px, 0px); }
        25% { transform: translate(1px, -1px); }
        50% { transform: translate(-1px, 0px); }
        75% { transform: translate(0px, 1px); }
        100% { transform: translate(0px, 0px); }
      }
      .animate-drive {
        animation: drive 0.2s infinite linear;
      }
    `}</style>
  </div>
);

// --- 3. Componente de Botão Animado (Store) ---
interface LandoButtonProps {
  text: string;
  icon?: React.ComponentType;
  onClick?: () => void;
}

const LandoButton = ({ text, icon: Icon, onClick }: LandoButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(228,21,6,0.3)] hover:shadow-[0_10px_40px_rgba(228,21,6,0.5)]"
    >
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        {Icon && <div className="scale-125"><Icon /></div>}
      </div>
      <div className="relative h-6 w-20 overflow-hidden">
        <div className="absolute top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
          <span className="flex h-6 items-center justify-start text-base font-black uppercase tracking-widest">
            {text}
          </span>
          <span className="flex h-6 items-center justify-start text-base font-black uppercase tracking-widest text-[#FCD116]">
            {text}
          </span>
        </div>
      </div>
    </button>
  );
};

// --- 4. Componente de Menu Hamburguer Animado ---
const LandoMenuButton = () => {
  return (
    <button className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-black/5 bg-white/60 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:border-primary hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] hover:scale-105">
      <div className="flex flex-col gap-1.5 transition-all duration-300 group-hover:rotate-180">
        <span className="h-0.5 w-7 bg-black transition-all duration-300 group-hover:w-5 group-hover:translate-x-1 group-hover:bg-primary rounded-full"></span>
        <span className="h-0.5 w-7 bg-black group-hover:bg-primary transition-colors rounded-full"></span>
        <span className="h-0.5 w-7 bg-black transition-all duration-300 group-hover:w-5 group-hover:-translate-x-1 group-hover:bg-primary rounded-full"></span>
      </div>
    </button>
  );
};

// --- 5. Componente Principal do Header ---
const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 md:px-12 pointer-events-none">
      
      {/* Esquerda: Nome do Ayrton Senna */}
      <div className="flex flex-col font-display font-bold leading-[0.85] tracking-tighter pointer-events-auto select-none">
        <span className="text-3xl md:text-5xl text-black">AYRTON</span>
        <span className="text-3xl md:text-5xl text-primary italic pr-1">SENNA</span>
      </div>

      {/* Centro: Ícone de Kart Animado */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 pointer-events-auto">
         <KartIcon />
      </div>

      {/* Direita: Botões Animados */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <LandoButton 
          text="CART" 
          icon={LandoStoreIcon} 
          onClick={() => console.log("Open Cart")}
        />
        <LandoMenuButton />
      </div>

    </nav>
  );
};

export default Header;