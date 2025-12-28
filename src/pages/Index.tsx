import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TrophiesSection from "@/components/TrophiesSection";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import QuotesSection from "@/components/QuotesSection";
import FooterSection from "@/components/FooterSection";
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
        <StatsSection />
        <TrophiesSection />
        <GallerySection />
        <QuotesSection />
        <VideoSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
