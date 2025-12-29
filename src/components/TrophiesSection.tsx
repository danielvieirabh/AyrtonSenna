import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { Instagram, Twitter, Trophy, Star, Flag, MonitorPlay, Crown } from "lucide-react";

// Imagens do Senna
import sennaCampeao from "@/assets/carreirasenna/campeao.jpg";
import sennaMclaren from "@/assets/carreirasenna/mclaren.jpg";
import sennaAmarelo from "@/assets/carreirasenna/sennaamerlo.jpg";
import sennaAzul from "@/assets/carreirasenna/sennaazul.jpg";
import sennaVitoria from "@/assets/carreirasenna/sennacampeao.jpg";
import sennaLotus from "@/assets/carreirasenna/sennacarropreto.jpg";
import sennaXuxa from "@/assets/carreirasenna/sennaexuxa.jpg";
import sennaGalisteu from "@/assets/carreirasenna/sennagalisteu.jpg";
import sennaPreto from "@/assets/carreirasenna/sennapreto.jpg";
import sennaFone from "@/assets/carreirasenna/sennaefone.jpg";

// --- ÍCONE ANIMADO QUE MUDA (Racing Theme) ---
const AnimatedSocialIcon = () => {
  const [index, setIndex] = useState(0);

  // Ícones de Corrida
  const icons = [
    <Flag key="flag" size={50} strokeWidth={1.5} />, // Bandeira Chegada
    <Trophy key="trophy" size={50} strokeWidth={1.5} />, // Troféu
    <Star key="star" size={50} strokeWidth={1.5} />, // Estrela
    <MonitorPlay key="tv" size={50} strokeWidth={1.5} />, // TV/Mídia
    <Crown key="crown" size={50} strokeWidth={1.5} />, // Rei de Mônaco
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex justify-center items-center w-20 h-20">
      <div 
        key={index} 
        // Cor primária (Vermelho McLaren)
        className="text-primary animate-float-fade"
      >
        {icons[index]}
      </div>
      
      {/* Círculo decorativo */}
      <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse-slow" />
    </div>
  );
};

// --- Configuração dos Cards (Senna Moments) ---
const cardsConfig = [
  {
    image: sennaLotus, // Carro Preto (Lotus)
    transform: "translate(-32rem, 9rem) rotate(-24deg) scale(0.75)",
    zIndex: 1,
    caption: "The Beginning",
    date: "Lotus Era",
  },
  {
    image: sennaMclaren, // McLaren
    transform: "translate(-24rem, 5rem) rotate(-16deg) scale(0.82)",
    zIndex: 2,
    caption: "Dominance",
    date: "MP4/4 Machine",
  },
  {
    image: sennaCampeao, // Segurando Troféu
    transform: "translate(-12rem, 1.5rem) rotate(-8deg) scale(0.92)",
    zIndex: 3,
    caption: "Champion",
    date: "World Title",
  },
  {
    image: sennaAmarelo, // Capacete Amarelo (Icônico)
    transform: "translate(0rem, 0rem) rotate(0deg) scale(1)",
    zIndex: 10,
    caption: "THE LEGEND",
    date: "Forever",
    isCenter: true,
  },
  {
    image: sennaVitoria, // Comemorando
    transform: "translate(12rem, 1.5rem) rotate(8deg) scale(0.92)",
    zIndex: 3,
    caption: "Victory",
    date: "Interlagos",
  },
  {
    image: sennaFone, // Focado
    transform: "translate(24rem, 5rem) rotate(16deg) scale(0.82)",
    zIndex: 2,
    caption: "Focus",
    date: "Mental Strength",
  },
  {
    image: sennaAzul, // Nacional
    transform: "translate(32rem, 9rem) rotate(24deg) scale(0.75)",
    zIndex: 1,
    caption: "National Hero",
    date: "Brasil",
  },
  {
    image: sennaPreto, 
    transform: "translate(12rem, 2.5rem) rotate(8deg) scale(0.88)",
    zIndex: 4,
    caption: "Intense",
    date: "The Look",
  },
   {
    image: sennaXuxa, 
    transform: "translate(-32rem, 10rem) rotate(-22deg) scale(0.75)",
    zIndex: 2,
    caption: "Icon Status",
    date: "Celebrity",
  },
  {
    image: sennaGalisteu, 
    transform: "translate(-12rem, 2.5rem) rotate(-8deg) scale(0.88)",
    zIndex: 4,
    caption: "Off Track",
    date: "Personal Life",
  },
];

interface SocialCardProps {
  image: string;
  transform: string;
  zIndex: number;
  caption: string;
  date: string;
  isCenter?: boolean;
}

const SocialCard = ({ image, transform, zIndex, caption, date, isCenter }: SocialCardProps) => {
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
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="absolute top-0 left-1/2 w-[300px] md:w-[340px] aspect-[3/5] origin-center transition-all duration-700 ease-out"
      style={{ 
        transform: transform, 
        zIndex: isHovered ? 50 : zIndex, 
        marginLeft: '-170px',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        // Bordas e sombras ajustadas para tema branco/vermelho
        className={`relative w-full h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl cursor-pointer ${isCenter ? 'shadow-primary/20 ring-1 ring-primary/20' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Imagem de Fundo (Blur/Grayscale) */}
        <div className="w-full h-full transition-transform duration-[750ms] ease-[cubic-bezier(0.65,0.05,0,1)] group-hover:scale-110">
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover grayscale opacity-90 transition-opacity duration-[750ms]"
            style={{ opacity: isHovered ? 0 : 0.9 }}
          />
        </div>

        {/* Imagem Colorida (Reveal no Hover) */}
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-[750ms] ease-[cubic-bezier(0.65,0.05,0,1)]"
          style={{
             clipPath: isHovered ? 'ellipse(100% 120% at 50% 0%)' : 'ellipse(60% 40% at 50% 120%)',
             transform: isHovered ? 'scale(1)' : 'scale(1.1)'
          }}
        >
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover"
          />
          {/* Gradiente escuro embaixo para texto aparecer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        </div>

        {/* Texto do Card */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
           <div className={`transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="flex justify-center gap-2 mb-2 text-primary">
                 <Instagram size={16} />
                 <Twitter size={16} />
              </div>
              <h3 className="font-display text-2xl text-white uppercase italic">{caption}</h3>
              <p className="font-sans text-xs text-gray-300 tracking-widest uppercase mt-1">{date}</p>
           </div>
        </div>

        {/* Borda Vermelha no Hover */}
        <div className={`absolute inset-0 border-2 border-primary rounded-2xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

const SocialsStackSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20 bg-background overflow-hidden min-h-[700px] flex items-start justify-center">
      {/* CSS para animação do ícone */}
      <style>{`
        @keyframes float-fade {
          0% { opacity: 0; transform: translateY(10px) scale(0.8); }
          20% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.8); }
        }
        .animate-float-fade {
          animation: float-fade 2.5s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Grid de Fundo Sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="container mx-auto px-4 relative z-10 mt-16">
        
        {/* Header da Seção */}
        <div 
          ref={ref}
          className={`relative text-center mb-6 md:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Ícone Animado */}
          <AnimatedSocialIcon />

          <h2 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tighter">
            RACING<br />
            <span className="italic text-primary">LEGACY</span>
          </h2>
        </div>

        {/* Leque de Cards */}
        <div className={`relative w-full h-[550px] flex justify-center items-start pt-12 scale-[0.45] md:scale-[0.65] lg:scale-[0.85] xl:scale-100 transition-all duration-1000 ease-out delay-300 hover:scale-[0.48] md:hover:scale-[0.68] lg:hover:scale-[0.88] xl:hover:scale-105 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}>
           <div className="relative w-full max-w-[100px]">
              {cardsConfig.map((card, index) => (
                <SocialCard 
                  key={index}
                  {...card}
                />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default SocialsStackSection;