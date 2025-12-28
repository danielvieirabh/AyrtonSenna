import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ballonDor from "@/assets/ballon-dor.jpg";
import championsLeague from "@/assets/champions-league.jpg";
import euroTrophy from "@/assets/euro-trophy.jpg";

interface TrophyCardProps {
  image: string;
  title: string;
  count: string;
  years: string;
  delay?: number;
}

const TrophyCard = ({ image, title, count, years, delay = 0 }: TrophyCardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="font-display text-5xl md:text-6xl text-primary mb-2">
            {count}
          </div>
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
            {title}
          </h3>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {years}
          </p>
        </div>
      </div>
    </div>
  );
};

const TrophiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const trophies = [
    {
      image: ballonDor,
      title: "BALLON D'OR",
      count: "5x",
      years: "2008, 2013, 2014, 2016, 2017",
    },
    {
      image: championsLeague,
      title: "CHAMPIONS LEAGUE",
      count: "5x",
      years: "2008, 2014, 2016, 2017, 2018",
    },
    {
      image: euroTrophy,
      title: "EURO",
      count: "1x",
      years: "França 2016",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
            Conquistas que fizeram história
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            TROFÉUS ETERNOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trophies.map((trophy, index) => (
            <TrophyCard key={trophy.title} {...trophy} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrophiesSection;
