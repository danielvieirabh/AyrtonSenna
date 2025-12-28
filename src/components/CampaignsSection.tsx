import React from 'react';
import nike from "@/assets/nike.png";
import herbalife from "@/assets/herbalife.png";
import clear from "@/assets/clear.png";
import binance from "@/assets/binance.png";
import jacob from "@/assets/jacob.png";
import thera from "@/assets/thera.png";
import livescore from "@/assets/livescore.png";
import armani from "@/assets/armani.png";
import tagheuer from "@/assets/tag.png";

// Lista de marcas (Adicionei algumas para o loop ficar fluido)
// Certifique-se de que os logos sejam PNGs transparentes e preferencialmente brancos ou monocromáticos para o fundo preto
const brands = [
  { name: "Nike", src: nike },
  { name: "Herbalife", src: herbalife },
  { name: "Clear", src: clear },
  { name: "Binance", src: binance },
  { name: "Jacob & Co", src: jacob }, // Marca de relógios atual dele
  { name: "Therabody", src: thera },  
  { name: "LiveScore", src: livescore },
  { name: "Armani", src: armani },
  { name: "TAG Heuer", src: tagheuer },
  

];

const CampaignsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      
      {/* 1. BACKGROUND TEXTURE (Sutil) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 2. HEADER COM TIPOGRAFIA "LANDO STYLE" */}
        <div className="relative mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="relative">
            {/* Texto de Fundo (Manuscrito Dourado Gigante) */}
            <span className="absolute -top-16 -left-10 -z-10 select-none font-cursive text-[8rem] md:text-[12rem] leading-none text-[#D4AF37] opacity-20 rotate-[-5deg] mix-blend-screen whitespace-nowrap">
              Empire
            </span>

            <h2 className="font-serif text-5xl md:text-7xl text-white uppercase leading-none">
              Global<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Partners
              </span>
            </h2>
          </div>

          <div className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-[#D4AF37] pl-6">
            <p>
              Cristiano Ronaldo se orgulha de colaborar com marcas líderes mundiais 
              que compartilham sua paixão implacável por performance, excelência e inovação.
            </p>
          </div>
        </div>

        {/* 3. INFINITE MARQUEE (Carrossel Infinito) */}
        <div className="relative w-full overflow-hidden mask-linear-fade">
          {/* O container interno precisa ser largo o suficiente */}
          <div className="flex w-max animate-infinite-scroll hover:pause-animation">
            
            {/* Renderiza a lista duas vezes para criar o loop perfeito */}
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`} 
                className="group relative mx-8 md:mx-16 flex h-32 w-48 flex-col items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                {/* Logo Container */}
                <div className="relative h-20 w-full transition-transform duration-300 group-hover:scale-110">
                   {/* Se não tiver a imagem, mostra texto como fallback */}
                   <img 
                     src={brand.src} 
                     alt={brand.name} 
                     className="h-full w-full object-contain opacity-70 group-hover:opacity-100 brightness-0 invert group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                     onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       e.currentTarget.parentElement!.querySelector('span')!.style.display = 'block';
                     }}
                   />
                   <span className="hidden text-xl font-bold text-gray-500 group-hover:text-[#D4AF37] text-center w-full">
                     {brand.name}
                   </span>
                </div>
                
                {/* Dot decorativo */}
                <div className="mt-4 h-1 w-1 rounded-full bg-[#D4AF37] opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Gradientes laterais para suavizar a entrada/saída (Fade) */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-20" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-20" />
        </div>

      </div>

      {/* ESTILOS CSS INJETADOS (Para animação e fontes) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }

        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CampaignsSection;