import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube video ID for a CR7 highlights video
  const videoId = "xHv8dUmD0qY";

  return (
    <section className="relative py-32 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
            Momentos que marcaram a história
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            A LENDA EM AÇÃO
          </h2>
        </div>

        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {!isPlaying ? (
            <div
              className="relative aspect-video bg-secondary cursor-pointer group overflow-hidden"
              onClick={() => setIsPlaying(true)}
            >
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="CR7 Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-foreground/50 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-foreground group-hover:text-primary transition-colors fill-current ml-1" />
                </div>
              </div>

              {/* Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-2xl md:text-3xl text-foreground">
                  ASSISTIR HIGHLIGHTS
                </p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Os melhores momentos da carreira
                </p>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Cristiano Ronaldo Highlights"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
