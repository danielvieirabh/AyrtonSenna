import { useRef, useEffect, useState } from "react";
import { ArrowRight, Trophy } from "lucide-react"; // Certifique-se de ter lucide-react instalado ou use ícones similares
import cr7Normal from "@/assets/cr7normal.png"; // Exemplo, mantenha seus imports
import cr72002 from "@/assets/2002.jpg";
import cr72003 from "@/assets/2003.jpg";
import cr72008 from "@/assets/2008.jpg";
import cr72009 from "@/assets/2009.jpg";
import cr72016 from "@/assets/2016.jpg";
import cr72018 from "@/assets/2018.webp";
import cr72023 from "@/assets/2023.jpg";

const timelineData = [
  {
    year: "2002",
    title: "O Início",
    team: "Sporting CP",
    image: cr72002,
    stats: "31 Jogos | 5 Gols",
    desc: "A estreia profissional que apresentou um prodígio ao mundo.",
  },
  {
    year: "2003",
    title: "Teatro dos Sonhos",
    team: "Manchester United",
    image: cr72003,
    stats: "292 Jogos | 118 Gols",
    desc: "Herdando a lendária camisa 7 e conquistando a Inglaterra.",
  },
  {
    year: "2008",
    title: "No Topo do Mundo",
    team: "Manchester United",
    image: cr72008,
    stats: "Ballon d'Or Winner",
    desc: "A primeira Champions League e o primeiro prêmio de Melhor do Mundo.",
  },
  {
    year: "2009",
    title: "Galáctico",
    team: "Real Madrid",
    image: cr72009,
    stats: "438 Jogos | 450 Gols",
    desc: "Uma transferência recorde para reescrever a história do futebol.",
  },
  {
    year: "2016",
    title: "Glória Nacional",
    team: "Portugal",
    image: cr72016,
    stats: "Campeão da Euro",
    desc: "Liderando Portugal à conquista inédita da Eurocopa contra a França.",
  },
  {
    year: "2018",
    title: "Novo Desafio",
    team: "Juventus",
    image: cr72018,
    stats: "134 Jogos | 101 Gols",
    desc: "Dominando a Itália e continuando a quebrar recordes de artilharia.",
  },
  {
    year: "2023",
    title: "Revolução",
    team: "Al Nassr",
    image: cr72023,
    stats: "Líder da Liga Saudita",
    desc: "Pioneiro na transformação do futebol no Oriente Médio.",
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Controla a velocidade do scroll horizontal em relação ao vertical
      const scrollDistance = height - windowHeight;
      const scrolled = -top;
      
      let p = scrolled / scrollDistance;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[400vh] bg-black text-white" 
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* --- Background Elements (Linhas Técnicas) --- */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-20 left-0 w-full h-px bg-white/20"></div>
            <div className="absolute bottom-20 left-0 w-full h-px bg-white/20"></div>
            <div className="absolute left-10 top-0 h-full w-px bg-white/10 border-r border-dashed border-white/20"></div>
        </div>

        {/* --- Header Fixo --- */}
        <div className="absolute top-12 left-6 md:left-24 z-20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-1 bg-[#D4AF37]"></div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Legacy Timeline
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            A JORNADA
          </h2>
        </div>

        {/* --- Horizontal Track --- */}
        <div 
          ref={trackRef}
          className="flex gap-4 md:gap-12 px-6 md:px-24 w-max items-center will-change-transform"
          style={{ 
            // Movimento horizontal suave
            transform: `translateX(calc(10vw - ${progress * (timelineData.length * 70)}vh))` 
          }}
        >
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[45vh] lg:w-[50vh] flex-shrink-0 group cursor-pointer"
            >
              {/* Layout do Card */}
              <div className="relative flex flex-col gap-6">
                
                {/* 1. Imagem (Container Vertical 3:4 para não cortar rosto) */}
                <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-[#111]">
                   {/* Overlay de carregamento/fundo */}
                   <div className="absolute inset-0 z-0 bg-[#1a1a1a]" />
                   
                   {/* Imagem com efeito Zoom e Grayscale -> Color */}
                   <img
                     src={item.image}
                     alt={item.title}
                     className="absolute inset-0 z-10 h-full w-full object-cover object-top transition-all duration-700 ease-out filter grayscale hover:grayscale-0 hover:scale-110"
                   />
                   
                   {/* Data/Ano Gigante (Outline) sobrepondo a imagem */}
                   <div className="absolute -top-10 -left-2 z-20 pointer-events-none mix-blend-difference">
                      <span 
                        className="font-display text-[6rem] md:text-[8rem] font-black leading-none text-transparent"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
                      >
                        {item.year}
                      </span>
                   </div>

                   {/* Ícone de Troféu flutuante no hover */}
                   <div className="absolute top-4 right-4 z-20 translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-full bg-[#D4AF37] p-2 text-black">
                        <Trophy size={20} />
                      </div>
                   </div>
                </div>

                {/* 2. Informações */}
                <div className="flex flex-col border-l-2 border-[#D4AF37] pl-4 transition-all duration-300 group-hover:border-white">
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {item.team}
                  </span>
                  <h3 className="mb-2 font-serif text-2xl md:text-3xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                    {item.desc}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                    <span>{item.stats}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- Progress Bar Inferior --- */}
        <div className="absolute bottom-12 left-6 right-6 md:left-24 md:right-24">
           <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mb-2">
              <span>Start</span>
              <span>2002 — 2023</span>
              <span>Present</span>
           </div>
           <div className="h-[2px] w-full bg-white/10">
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear shadow-[0_0_10px_#D4AF37]"
                style={{ width: `${progress * 100}%` }}
              />
           </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;