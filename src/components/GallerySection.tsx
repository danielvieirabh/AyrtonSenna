import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState } from "react";
import { Trophy, Star } from "lucide-react"; // Certifique-se de ter lucide-react ou remova os ícones

// Importe as imagens dos troféus isolados
import ballonDorIso from "@/assets/ballon.png"; // Exemplo: Imagem só do troféu
import championsIso from "@/assets/champions.png";
import euroIso from "@/assets/trofeu_da_eurocopa_2020.png";

// Importe as imagens dele SEGURANDO os troféus (para o hover)
import ballonDorHeld from "@/assets/baloncr7.jpg";
import championsHeld from "@/assets/cr7champions.avif";
import euroHeld from "@/assets/cr7euro.webp";

interface TrophyCardProps {
  imageIso: string;    // Imagem do Troféu Sozinho
  imageHeld: string;   // Imagem do CR7 segurando
  title: string;
  count: string;
  years: string;
  delay?: number;
}

const TrophyCard = ({ imageIso, imageHeld, title, count, years, delay = 0 }: TrophyCardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  // Lógica de Tilt 3D
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Suavizei a rotação para parecer mais com o site do Lando (menos extremo)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`relative h-full transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative h-[500px] w-full cursor-pointer rounded-2xl bg-[#111] overflow-hidden border border-white/5 transition-colors hover:border-[#D4AF37]/50"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
        }}
      >
        {/* --- CAMADA 1: FUNDO E IMAGEM ISOLADA (Troféu) --- */}
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-b from-[#1a1a1a] to-black">
           {/* Imagem do Troféu (Visível por padrão, some no hover) */}
           <img 
             src={imageIso} 
             alt={title}
             className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out group-hover:scale-50 group-hover:opacity-0 group-hover:blur-sm"
             style={{ transform: 'translateZ(20px)' }}
           />
        </div>

        {/* --- CAMADA 2: IMAGEM DE REVELAÇÃO (CR7 Segurando) --- */}
        {/* Esta imagem fica invisível e aparece (zoom out) no hover */}
        <div className="absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
           <img 
             src={imageHeld}
             alt={`${title} Celebration`}
             className="h-full w-full object-cover scale-110 transition-transform duration-700 ease-out group-hover:scale-100"
           />
           {/* Gradiente para o texto ficar legível */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>

        {/* --- CAMADA 3: UI & TEXTOS (Estilo Lando) --- */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none" style={{ transform: 'translateZ(40px)' }}>
          
          {/* Topo: Badges */}
          <div className="flex justify-between items-start">
             {/* Tag de Ano (Estilo Etiqueta Neon/Dourada) */}
             <div className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-sm transform -skew-x-12">
                Legacy {years.split(',')[0]}
             </div>
             
             {/* Ícone decorativo */}
             <Trophy className="text-white/20 group-hover:text-[#D4AF37] transition-colors" size={24} />
          </div>

          {/* Base: Informações */}
          <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
             {/* Contador Gigante */}
             <div className="flex items-baseline gap-2">
                <span className="font-display text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-[#D4AF37] group-hover:to-yellow-600 transition-all duration-500">
                  {count}
                </span>
                <div className="flex gap-1 text-[#D4AF37]">
                   <Star size={12} fill="currentColor" />
                   <Star size={12} fill="currentColor" />
                   <Star size={12} fill="currentColor" />
                </div>
             </div>

             {/* Título e Detalhes */}
             <h3 className="font-serif text-2xl text-white mb-2 group-hover:tracking-wider transition-all duration-300">
               {title}
             </h3>
             
             {/* Linha decorativa que cresce no hover */}
             <div className="h-[1px] w-12 bg-[#D4AF37] mb-2 transition-all duration-500 group-hover:w-full" />
             
             <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
               {years}
             </p>
          </div>
        </div>

        {/* Efeito de brilho nas bordas (Glow) */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_40px_rgba(212,175,55,0.1)]" />
      </div>
    </div>
  );
};

const TrophiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  // ATENÇÃO: Você precisa mapear duas imagens para cada item agora
  const trophies = [
    {
      imageIso: ballonDorIso,   // Foto da Bola de Ouro PNG fundo transparente
      imageHeld: ballonDorHeld, // Foto do CR7 beijando/segurando a bola de ouro
      title: "BALLON D'OR",
      count: "5",
      years: "2008, 2013, 2014, 2016, 2017",
    },
    {
      imageIso: championsIso,   // Foto da Taça Champions PNG
      imageHeld: championsHeld, // Foto do CR7 levantando a taça
      title: "CHAMPIONS LEAGUE",
      count: "5",
      years: "2008, 2014, 2016, 2017, 2018",
    },
    {
      imageIso: euroIso,        // Foto da Taça Euro PNG
      imageHeld: euroHeld,      // Foto do CR7 com a taça de Portugal
      title: "UEFA EURO",
      count: "1",
      years: "França 2016",
    },
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Grid Sutil (Estilo Lando) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`flex flex-col md:flex-row justify-between items-end mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              Hall of Fame
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-none">
              TROFÉUS<br/>ETERNOS
            </h2>
          </div>
          
          <div className="hidden md:block">
             <div className="text-right text-white/50 text-sm">
                Total Major Trophies<br/>
                <span className="text-3xl text-white font-display">30+</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trophies.map((trophy, index) => (
            <TrophyCard key={trophy.title} {...trophy} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrophiesSection;