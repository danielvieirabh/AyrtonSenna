import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

// Imagens (Reutilizando as que você já tem ou placeholders conceituais)
// Se tiver imagens específicas de "Chuva", "Brasil" ou "Carro", substitua aqui.
import sennaFocus from "@/assets/airtoncomcapacete.png"; // Exemplo: Foco
import sennaPassion from "@/assets/airtonsemcapacete.png"; // Exemplo: Paixão

const PhilosophySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCard, setActiveCard] = useState(1); // O card do meio começa aberto

  const cards = [
    {
      id: 0,
      title: "FOCUS",
      subtitle: "The Mental Game",
      desc: "I am not designed to come second or third. I am designed to win.",
      color: "bg-gray-900", // Tema Escuro
      accent: "text-[#FEDD00]", // Amarelo
      image: sennaFocus, // Imagem do Capacete
      position: "object-center"
    },
    {
      id: 1,
      title: "PASSION",
      subtitle: "Brazilian Soul",
      desc: "Brasileiro, com muito orgulho, com muito amor.",
      color: "bg-[#009B3A]", // Verde Brasil
      accent: "text-white",
      image: null, // Sem imagem, usa apenas cor/gradiente
      position: "object-center"
    },
    {
      id: 2,
      title: "COURAGE",
      subtitle: "No Compromise",
      desc: "If you no longer go for a gap that exists, you are no longer a racing driver.",
      color: "bg-blue-900", // Azul Nacional
      accent: "text-[#FEDD00]",
      image: sennaPassion, // Imagem do Rosto
      position: "object-top"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* HEADER */}
      <div 
        ref={ref}
        className={`container mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div>
           <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
             The Philosophy
           </span>
           <h2 className="font-serif italic text-5xl md:text-6xl mt-2">
             MINDSET OF <br/> A LEGEND
           </h2>
        </div>
        <div className="hidden md:block pb-2">
           <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Select to Expand
           </span>
        </div>
      </div>

      {/* CARDS INTERATIVOS (EXPANDABLE) */}
      <div className={`w-full h-[600px] flex flex-col md:flex-row bg-black transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}>
        {cards.map((card, index) => {
          const isActive = activeCard === index;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setActiveCard(index)}
              className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group
                ${isActive ? "flex-[3] opacity-100" : "flex-1 opacity-60 hover:opacity-80"}
                ${card.color}
              `}
            >
               {/* IMAGEM DE FUNDO (Se existir) */}
               {card.image && (
                  <div className="absolute inset-0 opacity-40 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000">
                     <img 
                       src={card.image} 
                       alt={card.title} 
                       className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110 ${card.position}`} 
                     />
                  </div>
               )}
               
               {/* TEXTURA DE FUNDO (Se não tiver imagem) */}
               {!card.image && (
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
               )}

               {/* GRADIENTE OVERLAY */}
               <div className={`absolute inset-0 bg-gradient-to-t from-green-900/90 via-yellow-900/20 to-transparent ${isActive ? 'opacity-80' : 'opacity-60'}`} />

               {/* CONTEÚDO */}
               <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  
                  {/* Título (Gira quando inativo no desktop) */}
                  <div className={`transition-all duration-500 origin-bottom-left
                      ${isActive 
                        ? "translate-y-0 rotate-0 mb-4" 
                        : "md:-rotate-90 md:translate-x-8 md:-translate-y-8 mb-0"
                      }`}
                  >
                     <div className="flex items-center gap-4">
                        <span className={`font-sans text-xs font-bold uppercase tracking-widest border border-white/30 px-2 py-1 rounded-sm text-white/70 ${!isActive && "hidden md:block"}`}>
                           0{index + 1}
                        </span>
                        {isActive && <div className={`h-[1px] w-12 ${card.title === 'PASSION' ? 'bg-white' : 'bg-[#FEDD00]'}`} />}
                     </div>

                     <h3 className={`font-display font-black text-5xl md:text-7xl uppercase mt-2 leading-none text-white
                        ${!isActive && "md:whitespace-nowrap"}
                     `}>
                        {card.title}
                     </h3>
                  </div>

                  {/* Texto de Descrição (Só aparece quando ativo) */}
                  <div className={`overflow-hidden transition-all duration-700 ease-out max-w-lg
                     ${isActive ? "max-h-60 opacity-100 delay-100" : "max-h-0 opacity-0"}
                  `}>
                     <h4 className={`font-serif italic text-2xl mb-4 ${card.accent}`}>
                        {card.subtitle}
                     </h4>
                     <p className="font-sans text-gray-300 text-sm md:text-lg leading-relaxed border-l-2 border-white/20 pl-4">
                        "{card.desc}"
                     </p>
                     
                     <button className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#FEDD00] transition-colors">
                        Read Story <ArrowUpRight size={16} />
                     </button>
                  </div>
               </div>

               {/* Ícone Decorativo (Canto Superior Direito) */}
               <div className={`absolute top-8 right-8 transition-all duration-500 ${isActive ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"}`}>
                  <ArrowUpRight className="text-white w-8 h-8 md:w-12 md:h-12 opacity-50" />
               </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default PhilosophySection;