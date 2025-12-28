import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, Twitter, Youtube, Facebook, Mail, ArrowUpRight } from "lucide-react";

// --- IMPORTS DAS IMAGENS ---
// (Certifique-se de que os caminhos estão corretos para o seu projeto)
import nike from "@/assets/nike.png";
import herbalife from "@/assets/herbalife.png";
import clear from "@/assets/clear.png";
import binance from "@/assets/binance.png";
import jacob from "@/assets/jacob.png";
import thera from "@/assets/thera.png";
import livescore from "@/assets/livescore.png";
import armani from "@/assets/armani.png";
import tagheuer from "@/assets/tag.png";

// Lista de marcas com as imagens importadas
const brands = [
  { name: "Nike", src: nike },
  { name: "Herbalife", src: herbalife },
  { name: "Clear", src: clear },
  { name: "Binance", src: binance },
  { name: "Jacob & Co", src: jacob },
  { name: "Therabody", src: thera },  
  { name: "LiveScore", src: livescore },
  { name: "Armani", src: armani },
  { name: "TAG Heuer", src: tagheuer },
];

const FooterSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer className="relative bg-black text-white border-t border-white/5 overflow-hidden pt-32 pb-0">
      
      {/* 1. BACKGROUND TEXTURE (Linhas Topográficas) */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <path d="M-100,600 Q 500,200 1200,900 T 2000,300" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
           <path d="M-100,300 Q 600,1000 1200,200 T 2000,1000" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
           <path d="M-100,900 Q 400,500 900,1000 T 2000,200" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>

      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 flex flex-col justify-between min-h-[80vh] transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* --- HEADER GIGANTE (CRISTIANO RONALDO) --- */}
        <div className="flex flex-col items-center justify-center mb-24 relative group cursor-default">
             <h1 className="font-display text-[12vw] md:text-[14vw] leading-[0.8] text-white text-center tracking-tighter uppercase transition-transform duration-700 group-hover:scale-105 group-hover:text-[#D4AF37]">
                CRISTIANO
             </h1>
             <h1 className="font-display text-[12vw] md:text-[14vw] leading-[0.8] text-white text-center tracking-tighter uppercase transition-transform duration-700 group-hover:scale-105 group-hover:text-[#D4AF37]">
                RONALDO
             </h1>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] mix-blend-difference pointer-events-none">
                <span className="font-cursive text-6xl md:text-9xl text-white opacity-90" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Ronaldo
                </span>
             </div>
        </div>

        {/* --- GRID DE CONTEÚDO --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-32 items-start">
          
          {/* COLUNA 1: LINKS ESQUERDA (PAGES) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">PAGES</h3>
            {['HOME', 'ON PITCH', 'OFF PITCH', 'CAREER STATS'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="group flex items-center gap-2 font-display text-3xl md:text-4xl text-white hover:text-[#D4AF37] transition-all duration-300 uppercase leading-none origin-left hover:scale-105"
              >
                {item}
                <ArrowUpRight className="w-0 h-0 opacity-0 group-hover:w-6 group-hover:h-6 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
            
            {/* BOTÃO STORE (Dourado Neon) */}
            <div className="mt-12">
                <button className="relative overflow-hidden bg-[#D4AF37] text-black font-black uppercase py-4 px-10 rounded-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] group">
                    <span className="relative z-10 flex items-center gap-2">
                      STORE <ArrowUpRight size={20} />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
            </div>
          </div>

          {/* COLUNA 2: PARCEIROS (IMAGENS BRANCAS) & BUSINESS (Centro) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center px-4">
             
             {/* --- LISTA DE PARCEIROS (IMAGENS) --- */}
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 w-full max-w-2xl">
                {brands.map((brand) => (
                  <div 
                    key={brand.name} 
                    className="group relative h-10 w-24 md:h-12 md:w-32 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  >
                    <img 
                      src={brand.src} 
                      alt={brand.name} 
                      // ALTERAÇÃO AQUI:
                      // brightness-0 invert: Força a imagem a ficar branca sólida.
                      // opacity-60: Deixa um pouco transparente por padrão.
                      // group-hover:opacity-100: Fica totalmente branco brilhante no hover.
                      className="max-h-full max-w-full object-contain brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100"
                    />
                  </div>
                ))}
             </div>

             {/* BOTÃO BUSINESS ENQUIRIES (Gigante Dourado) */}
             <button className="relative w-full max-w-md overflow-hidden bg-[#D4AF37] text-black font-black uppercase py-6 px-12 rounded-xl hover:scale-[1.02] transition-transform duration-300 text-xl tracking-wider shadow-[0_0_40px_rgba(212,175,55,0.25)] group">
                <span className="relative z-10">BUSINESS ENQUIRIES</span>
                <div className="absolute inset-0 translate-y-full bg-white group-hover:translate-y-0 transition-transform duration-300 mix-blend-overlay" />
             </button>
          </div>

          {/* COLUNA 3: SOCIALS (Direita) */}
          <div className="md:col-span-3 flex flex-col items-end text-right">
            <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">FOLLOW ON</h3>
            <div className="flex flex-col gap-3">
                {[
                    { name: "INSTAGRAM", url: "https://instagram.com/cristiano", icon: Instagram },
                    { name: "TWITTER", url: "https://twitter.com/cristiano", icon: Twitter },
                    { name: "YOUTUBE", url: "https://youtube.com/cristiano", icon: Youtube },
                    { name: "FACEBOOK", url: "https://facebook.com/cristiano", icon: Facebook }
                ].map((social) => (
                    <a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center justify-end gap-2 font-display text-2xl md:text-3xl text-white hover:text-[#D4AF37] transition-all duration-300 uppercase leading-none"
                    >
                        {social.name}
                        <social.icon className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4AF37]" />
                    </a>
                ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- BARRA INFERIOR DOURADA (Copyright) --- */}
      <div className="w-full bg-[#D4AF37] text-black py-6 mt-auto relative z-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center font-bold text-xs md:text-sm uppercase tracking-widest gap-4">
              <span className="hover:scale-105 transition-transform cursor-default">
                © 2025 CR7 Brand. All rights reserved
              </span>
              
              <div className="flex gap-8">
                  {['PRIVACY POLICY', 'TERMS', 'COOKIES'].map((link) => (
                    <a 
                      key={link} 
                      href="#" 
                      className="relative overflow-hidden group"
                    >
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link}</span>
                      <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">
                        {link}
                      </span>
                    </a>
                  ))}
              </div>
          </div>
      </div>

    </footer>
  );
};

export default FooterSection;