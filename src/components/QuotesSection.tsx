import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  {
    text: "Talento sem trabalho duro não é nada.",
    context: "Sobre dedicação",
  },
  {
    text: "Seu amor me faz forte. Seu ódio me faz imparável.",
    context: "Sobre motivação",
  },
  {
    text: "Eu não persigo recordes. Os recordes me perseguem.",
    context: "Sobre legado",
  },
  {
    text: "Eu sou o melhor, não preciso provar nada a ninguém.",
    context: "Sobre confiança",
  },
  {
    text: "A vida é dura quando você é o melhor do mundo.",
    context: "Sobre pressão",
  },
];

const QuotesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section className="relative py-32 md:py-48 bg-secondary/20 overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-display text-[20rem] md:text-[30rem] text-foreground/[0.02] select-none">
          7
        </span>
      </div>

      <div
        ref={ref}
        className={`relative container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-8 block">
            {quotes[currentQuote].context}
          </span>

          <div className="relative min-h-[200px] flex items-center justify-center">
            <h2
              key={currentQuote}
              className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight animate-fade-in"
            >
              "{quotes[currentQuote].text}"
            </h2>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prevQuote}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Citação anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    index === currentQuote
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir para citação ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextQuote}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Próxima citação"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <p className="font-body text-sm text-muted-foreground mt-8">
            — Cristiano Ronaldo
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
