import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { Instagram, Twitter, Trophy, Star, Dribbble, Crown } from "lucide-react";

// Importe suas imagens do CR7 aqui
import cr7Img1 from "@/assets/imagescr7/mtu.jpg";
import cr7Img2 from "@/assets/imagescr7/semcamisa.png";
import cr7Img3 from "@/assets/imagescr7/lenda.jpg";
import cr7Img4 from "@/assets/imagescr7/lendarioreal.jpg";
import cr7Img5 from "@/assets/imagescr7/medalha.jpg";
import cr7Img6 from "@/assets/imagescr7/costas.jpg";
import cr7Img7 from "@/assets/imagescr7/factos.jpg";
import cr7Img8 from "@/assets/imagescr7/trofeu.jpg";

// --- NOVO COMPONENTE: ÍCONE ANIMADO QUE MUDA ---
const AnimatedSocialIcon = () => {
  const [index, setIndex] = useState(0);

  // Lista de ícones que vão ficar alternando
  const icons = [
    <Dribbble key="ball" size={50} strokeWidth={1.5} />, // Bola
    <Instagram key="insta" size={50} strokeWidth={1.5} />, // Instagram
    <Trophy key="trophy" size={50} strokeWidth={1.5} />, // Troféu
    <Twitter key="twitter" size={50} strokeWidth={1.5} />, // Twitter
    <Crown key="crown" size={50} strokeWidth={1.5} />, // Coroa (King)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 2500); // Muda a cada 2.5 segundos

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex justify-center items-center w-20 h-20">
      <div 
        key={index} // A chave muda para forçar a reinicialização da animação CSS
        className="text-[#D4AF37] animate-float-fade"
      >
        {icons[index]}
      </div>
      
      {/* Círculo decorativo sutil atrás */}
      <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-full animate-pulse-slow" />
    </div>
  );
};

// --- Configuração dos Cards ---
const cardsConfig = [
  {
    image: cr7Img7,
    transform: "translate(-32rem, 9rem) rotate(-24deg) scale(0.75)",
    zIndex: 1,
    caption: "Facts",
    date: "Statement",
  },
  {
    image: cr7Img6,
    transform: "translate(-24rem, 5rem) rotate(-16deg) scale(0.82)",
    zIndex: 2,
    caption: "Siuuu",
    date: "Signature Move",
  },
  {
    image: cr7Img4,
    transform: "translate(-12rem, 1.5rem) rotate(-8deg) scale(0.92)",
    zIndex: 3,
    caption: "Real Madrid",
    date: "Glory Days",
  },
  {
    image: cr7Img3,
    transform: "translate(0rem, 0rem) rotate(0deg) scale(1)",
    zIndex: 10,
    caption: "THE GOAT",
    date: "Legendary",
    isCenter: true,
  },
  {
    image: cr7Img5,
    transform: "translate(12rem, 1.5rem) rotate(8deg) scale(0.92)",
    zIndex: 3,
    caption: "Champion",
    date: "Winner Mentality",
  },
  {
    image: cr7Img8,
    transform: "translate(24rem, 5rem) rotate(16deg) scale(0.82)",
    zIndex: 2,
    caption: "Collector",
    date: "Another One",
  },
  {
    image: cr7Img2,
    transform: "translate(32rem, 9rem) rotate(24deg) scale(0.75)",
    zIndex: 1,
    caption: "Physique",
    date: "Hard Work",
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
        className={`relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl cursor-pointer ${isCenter ? 'shadow-[#D4AF37]/20' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        <div className="w-full h-full transition-transform duration-[750ms] ease-[cubic-bezier(0.65,0.05,0,1)] group-hover:scale-110">
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover grayscale opacity-60 transition-opacity duration-[750ms]"
            style={{ opacity: isHovered ? 0 : 0.6 }}
          />
        </div>

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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
           <div className={`transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="flex justify-center gap-2 mb-2 text-[#D4AF37]">
                 <Instagram size={16} />
                 <Twitter size={16} />
              </div>
              <h3 className="font-display text-2xl text-white uppercase">{caption}</h3>
              <p className="font-sans text-xs text-gray-400 tracking-widest uppercase mt-1">{date}</p>
           </div>
        </div>

        <div className={`absolute inset-0 border-2 border-[#D4AF37] rounded-2xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

const SocialsStackSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20 bg-background overflow-hidden min-h-[700px] flex items-start justify-center">
      {/* INJEÇÃO DE CSS para animação do ícone */}
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

      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="container mx-auto px-4 relative z-10 mt-16">
        
        {/* Header Modificado com Ícone Animado */}
        <div 
          ref={ref}
          className={`relative text-center mb-6 md:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* AQUI ESTÁ O ÍCONE ANIMADO EM CIMA DO TEXTO */}
          <AnimatedSocialIcon />

          <h2 className="font-serif text-5xl md:text-7xl text-foreground">
            WHAT'S UP<br />
            <span className="italic text-[#D4AF37]">ON SOCIALS</span>
          </h2>
        </div>

        {/* Container do Leque */}
        <div className="relative w-full h-[550px] flex justify-center items-start pt-12 scale-[0.45] md:scale-[0.65] lg:scale-[0.85] xl:scale-100 transition-transform duration-500 hover:scale-[0.48] md:hover:scale-[0.68] lg:hover:scale-[0.88] xl:hover:scale-105">
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