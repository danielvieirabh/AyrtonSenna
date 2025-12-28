import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, Twitter, Youtube } from "lucide-react";

const FooterSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer className="relative py-20 md:py-32 bg-background border-t border-border/30">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          {/* Logo/Name */}
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            CR<span className="text-primary">7</span>
          </h2>

          <p className="font-body text-muted-foreground text-sm max-w-md mb-10">
            A disciplina vence o talento. Repudie a mediocridade.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mb-12">
            <a
              href="https://instagram.com/cristiano"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/cristiano"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/cristiano"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-muted-foreground/60 uppercase tracking-[0.2em]">
            © 2024 CR7 Brand. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
