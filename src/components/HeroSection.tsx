import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-stadium.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Desaturation & Darkening Overlay */}
        <div className="absolute inset-0 bg-background/40" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Grain Texture */}
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Main Headline */}
        <h1 className="animate-fade-up font-display text-4xl leading-none tracking-wide text-foreground text-shadow-hero sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          A DISCIPLINA VENCE O TALENTO.
          <br />
          <span className="text-primary">REPUDIE A MEDIOCRIDADE.</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up-delay-1 mt-6 max-w-xl font-body text-sm font-light tracking-widest text-muted-foreground sm:text-base md:mt-8 md:text-lg">
          A mentalidade que forjou o maior de todos os tempos.
        </p>

        {/* Buttons */}
        <div className="animate-fade-up-delay-2 mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6 md:mt-14">
          <Button variant="heroPrimary" size="xl">
            Descubra Mais
          </Button>
          <Button variant="hero" size="xl">
            A Jornada
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-up-delay-3 absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 animate-pulse-subtle text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
