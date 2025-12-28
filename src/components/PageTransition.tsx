import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(true);
    const timer = setTimeout(() => setIsActive(false), 800); // Tempo da animação
    return () => clearTimeout(timer);
  }, [location]);

  if (!isActive) return null;

  return (
    <>
      <style>{`
        @keyframes wipeReveal {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
      `}</style>
      <div 
        className="fixed inset-0 z-[9999] bg-foreground pointer-events-none origin-top"
        style={{
          animation: "wipeReveal 0.8s cubic-bezier(0.65, 0.05, 0, 1) forwards"
        }}
      />
    </>
  );
};

export default PageTransition;