import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TrophiesSection from "@/components/TrophiesSection";
import GallerySection from "@/components/GallerySection";
import TimelineSection from "@/components/TimelineSection";
import VideoSection from "@/components/VideoSection";
import QuotesSection from "@/components/QuotesSection";
import CampaignsSection from "@/components/CampaignsSection";
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
        <TimelineSection />
        <TrophiesSection />
        <GallerySection />
        <QuotesSection />
        <CampaignsSection />
        <VideoSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
