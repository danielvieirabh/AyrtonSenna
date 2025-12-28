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
      </main>
    </>
  );
};

export default Index;
