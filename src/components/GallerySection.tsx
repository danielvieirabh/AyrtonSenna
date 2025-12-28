import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import cr7Trophy from "@/assets/cr7-trophy.jpg";
import cr7Celebration from "@/assets/cr7-celebration.jpg";

const GallerySection = () => {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* First Row - Large image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-24 md:mb-32">
          <div
            ref={ref1}
            className={`relative overflow-hidden transition-all duration-1000 ${
              isVisible1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
            }`}
          >
            <img
              src={cr7Trophy}
              alt="Cristiano Ronaldo levantando troféu"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
          >
            <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              A mentalidade vencedora
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              "EU NÃO TENHO<br />
              <span className="text-primary">LIMITES.</span>"
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md">
              Cada troféu é uma prova de que a dedicação supera qualquer obstáculo. 
              Quando o talento encontra a disciplina absoluta, nascem lendas.
            </p>
          </div>
        </div>

        {/* Second Row - Text left, Large image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div
            ref={ref2}
            className={`order-2 lg:order-1 transition-all duration-1000 ${
              isVisible2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
            }`}
          >
            <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              O número 7
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              "SONHE GRANDE,<br />
              <span className="text-primary">TRABALHE MAIS.</span>"
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md">
              O número nas costas não define o jogador. A atitude, a paixão e a 
              recusa em aceitar a derrota - isso é o que faz a diferença.
            </p>
          </div>

          <div
            className={`order-1 lg:order-2 relative overflow-hidden transition-all duration-1000 delay-300 ${
              isVisible2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
          >
            <img
              src={cr7Celebration}
              alt="Cristiano Ronaldo celebração icônica"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
