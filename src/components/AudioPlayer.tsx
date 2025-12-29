import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio("/ayrton.mp3"); // Verifique o caminho
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Volume inicial

    // Eventos para atualizar a barra de progresso
    const setAudioData = () => {
      setDuration(audioRef.current?.duration || 0);
    };

    const setAudioTime = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };

    // Adiciona Listeners
    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadeddata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", setAudioTime);
        audioRef.current = null;
      }
    };
  }, []);

  // Formata segundos em MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Função de Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.error("Erro autoplay:", e));
      setIsPlaying(true);
    }
  };

  // Função para pular o tempo (Seek)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Função Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Player Container */}
      <div 
        className={`group relative flex items-center overflow-hidden rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl
          ${isHovered || isPlaying ? "w-[320px] h-16 p-4" : "w-12 h-12 justify-center cursor-pointer"}
        `}
        // Se estiver fechado e clicar, abre e dá play
        onClick={!isHovered && !isPlaying ? togglePlay : undefined}
      >
        
        {/* --- ESTADO FECHADO (Apenas Ícone) --- */}
        <div className={`absolute transition-opacity duration-300 ${isHovered || isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
           <Volume2 size={20} className="text-primary animate-pulse" />
        </div>

        {/* --- ESTADO ABERTO (Controles) --- */}
        <div className={`flex w-full items-center gap-4 transition-opacity duration-500 ${isHovered || isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
          {/* Botão Play/Pause */}
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>

          {/* Info e Barra de Progresso */}
          <div className="flex flex-col flex-grow gap-1 w-full overflow-hidden">
            
            {/* Título e Tempo */}
            <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-wider text-gray-400">
               <span className="text-white truncate max-w-[80px]">Senna Theme</span>
               <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            {/* Input Range (Barra de Progresso) */}
            <div className="relative h-1.5 w-full group/slider">
               {/* Background da barra */}
               <div className="absolute top-0 left-0 h-full w-full rounded-full bg-white/20"></div>
               
               {/* Barra de preenchimento (Visual) */}
               <div 
                 className="absolute top-0 left-0 h-full rounded-full bg-primary transition-all duration-100 ease-linear"
                 style={{ width: `${(currentTime / duration) * 100}%` }}
               ></div>

               {/* Input Range invisível por cima para interação */}
               <input
                 type="range"
                 min="0"
                 max={duration || 0}
                 step="0.1"
                 value={currentTime}
                 onChange={handleSeek}
                 className="absolute top-[-5px] left-0 h-4 w-full cursor-pointer opacity-0 z-10"
               />
            </div>
          </div>

          {/* Botão Mute */}
          <button 
             onClick={(e) => { e.stopPropagation(); toggleMute(); }}
             className="text-gray-400 hover:text-white transition-colors"
          >
             {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;