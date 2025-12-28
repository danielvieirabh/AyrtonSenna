import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem = ({ number, label, suffix = "", delay = 0 }: StatItemProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, number, delay]);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-2">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { number: 900, suffix: "+", label: "Gols na Carreira" },
    { number: 5, suffix: "x", label: "Ballon d'Or" },
    { number: 5, suffix: "x", label: "Champions League" },
    { number: 35, suffix: "+", label: "Troféus" },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-background overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
            Números que definem uma lenda
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            O LEGADO EM NÚMEROS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
