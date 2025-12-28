import HeroSection from "@/components/HeroSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CR7 | A Disciplina Vence o Talento</title>
        <meta 
          name="description" 
          content="A mentalidade que forjou o maior de todos os tempos. Descubra a jornada de Cristiano Ronaldo." 
        />
      </Helmet>
      <main className="bg-background">
        <HeroSection />
        
        {/* Placeholder section to demonstrate scroll */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              A JORNADA CONTINUA
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Mais conteúdo em breve...
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
