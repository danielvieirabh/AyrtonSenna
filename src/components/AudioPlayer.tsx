import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cria o elemento de áudio
    audioRef.current = new Audio("/siu.mp3"); // Certifique-se que o arquivo existe
    audioRef.current.loop = true; // Para música de fundo, o loop é ideal
    audioRef.current.volume = 0.0; // Começa mudo para fazer o fade-in

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Função para fazer Fade In/Out suave do volume
  const fadeAudio = (targetVolume: number, duration: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    
    const startVolume = audioRef.current.volume;
    const change = targetVolume - startVolume;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      if (!audioRef.current) return;
      
      const elapsed = currentTime - startTime;
      const amount = Math.min(elapsed / duration, 1); // 0 a 1
      
      audioRef.current.volume = startVolume + (change * amount);

      if (amount < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      setIsPlaying(false);
      // Fade out antes de pausar
      fadeAudio(0, 500, () => audioRef.current?.pause());
    } else {
      setIsPlaying(true);
      audioRef.current.play().catch((e) => console.error("Erro autoplay:", e));
      // Fade in ao iniciar
      fadeAudio(0.3, 500); // Volume final 0.3 (agradável para background)
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2">
      {/* Container Principal */}
      <button
        onClick={toggleAudio}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex h-12 items-center overflow-hidden rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-500 ease-out hover:border-[#D4AF37]/50 hover:bg-black/80 ${
          isHovered || isPlaying ? "w-40 px-4" : "w-12 justify-center"
        }`}
      >
        {/* Equalizador Animado (Visualizer) */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`w-1 rounded-full bg-[#D4AF37] transition-all duration-300 ${
                isPlaying ? "animate-music-bar" : "h-1 opacity-50"
              }`}
              style={{
                height: isPlaying ? "16px" : "4px",
                animationDelay: `${bar * 0.1}s`, // Desfasamento para parecer aleatório
              }}
            />
          ))}
        </div>

        {/* Texto e Ícone (Revelados na expansão) */}
        <div 
          className={`absolute left-14 flex items-center gap-2 whitespace-nowrap transition-all duration-500 ${
            isHovered || isPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white">
            {isPlaying ? "Sound On" : "Sound Off"}
          </span>
        </div>

        {/* Ícone Fallback se não estiver expandido (Opcional, mas bom para UX) */}
        <div className={`absolute right-3.5 transition-opacity duration-300 ${isHovered || isPlaying ? 'opacity-0' : 'opacity-100'}`}>
           {isPlaying ? <Volume2 size={16} className="text-[#D4AF37]" /> : <VolumeX size={16} className="text-gray-500" />}
        </div>
      </button>

      {/* Styles Injetados para a animação das barras */}
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 8px; opacity: 0.6; }
          50% { height: 20px; opacity: 1; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;