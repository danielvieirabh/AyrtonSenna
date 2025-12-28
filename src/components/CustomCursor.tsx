import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Verifica se o elemento é interativo (link, botão ou tem cursor pointer)
      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      const isInteractive = target.classList.contains('cursor-pointer') || 
                           window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!(isLink || isButton || isInteractive));
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [isVisible]);

  // Não renderiza em dispositivos touch/móveis
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (hover: hover) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {/* Ponto central / Círculo expandido */}
        <div 
          className={`
            relative -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out
            ${isHovering ? 'w-12 h-12 bg-primary mix-blend-difference opacity-80' : 'w-3 h-3 bg-white'}
          `}
        />
        
        {/* Anel externo (desaparece no hover) */}
        <div 
           className={`
             absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-all duration-500 ease-out
             ${isHovering ? 'w-12 h-12 opacity-0 scale-50' : 'w-10 h-10 opacity-100 scale-100'}
           `}
        />
      </div>
    </>
  );
};

export default CustomCursor;