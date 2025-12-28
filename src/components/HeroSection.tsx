import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import * as THREE from "three";

// Imagens
import cr7Normal from "@/assets/cr7normal.png"; 
import cr7Robo from "@/assets/cr7robo.png";     

const HeroSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRobotMode, setIsRobotMode] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  
  const revealValueRef = useRef(0); 
  const targetRevealRef = useRef(0);

  // Atualiza o alvo da animação (0 = Humano, 1 = Robô)
  useEffect(() => {
    targetRevealRef.current = isRobotMode ? 1 : 0;
  }, [isRobotMode]);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuração Three.js ---
    const scene = new THREE.Scene();
    scene.background = null; 
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(cr7Normal);
    const texture2 = loader.load(cr7Robo);
    
    texture1.minFilter = THREE.LinearFilter;
    texture2.minFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(1, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uGlobalReveal: { value: 0.0 },
      },
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform float uGlobalReveal;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          
          float aspect = uResolution.x / uResolution.y;
          vec2 mouseAspect = uMouse;
          mouseAspect.x *= aspect;
          vec2 uvAspect = uv;
          uvAspect.x *= aspect;

          float dist = distance(uvAspect, mouseAspect);
          
          float radius = 0.40; 
          float edge = 0.15;   
          
          float mouseMask = smoothstep(radius, radius - edge, dist);
          float finalMask = clamp(mouseMask + uGlobalReveal, 0.0, 1.0);
          
          vec4 tex1 = texture2D(uTexture1, uv);
          vec4 tex2 = texture2D(uTexture2, uv);
          
          vec4 finalColor = mix(tex1, tex2, finalMask);

          if (finalColor.a < 0.1) discard;

          gl_FragColor = finalColor;
        }
      `
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      material.uniforms.uResolution.value.set(width, height);

      const dist = camera.position.z;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
      const visibleWidth = visibleHeight * camera.aspect;

      // Ajuste de escala para o CR7 não ficar gigante demais
      const scale = Math.min(visibleWidth, visibleHeight) * 0.85; 
      plane.scale.set(scale, scale, 1);
    };
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      material.uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
      
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      plane.rotation.y = mouseX * 0.05;
      plane.rotation.x = mouseY * 0.05;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      // Interpolação suave para a transição do botão
      revealValueRef.current += (targetRevealRef.current - revealValueRef.current) * 0.05;
      material.uniforms.uGlobalReveal.value = revealValueRef.current;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* 1. BACKGROUND SVG (Linhas Douradas) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <path d="M-100,500 Q 500,100 1200,800 T 2000,200" fill="none" stroke="#D4AF37" strokeWidth="1" />
           <path d="M-100,200 Q 600,900 1200,100 T 2000,900" fill="none" stroke="#D4AF37" strokeWidth="1" />
           <path d="M-100,800 Q 400,400 900,900 T 2000,100" fill="none" stroke="#D4AF37" strokeWidth="1" />
           <circle cx="80%" cy="20%" r="300" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* 3. THREE.JS CANVAS (O CR7) */}
      <div ref={mountRef} className="absolute inset-0 z-10" />

      {/* 4. BOTÃO LATERAL (TOGGLE MODE) */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 z-50 md:right-12 transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
        <button
          onClick={() => setIsRobotMode(!isRobotMode)}
          className={`group flex h-64 w-24 flex-col items-center justify-between rounded-2xl border transition-all duration-500 backdrop-blur-sm
            ${isRobotMode 
              ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
              : 'border-white/20 bg-black/20 hover:border-[#D4AF37]/50 hover:bg-black/40'
            }`}
        >
          {/* Topo: Ícone Campo */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className={`h-12 w-12 transition-colors duration-500 ${isRobotMode ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-white'}`}>
               <svg viewBox="0 0 100 100" className="h-full w-full stroke-current stroke-[1.5] fill-none">
                 <rect x="20" y="10" width="60" height="80" rx="5" />
                 <line x1="20" y1="50" x2="80" y2="50" />
                 <circle cx="50" cy="50" r="10" />
                 <path d="M 40 10 v 10 h 20 v -10" />
                 <path d="M 40 90 v -10 h 20 v 10" />
               </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Legacy
            </span>
          </div>

          {/* Centro: Texto Vertical */}
          <div className="rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className={`transition-colors duration-500 ${isRobotMode ? 'text-[#D4AF37]' : 'text-white'}`}>
              {isRobotMode ? "CYBORG MODE" : "HUMAN MODE"}
            </span>
          </div>

          {/* Base: Since 2002 */}
          <div className="mb-4 flex flex-col items-center text-center">
             <div className={`mb-2 transition-transform duration-500 group-hover:scale-110 ${isRobotMode ? 'text-[#D4AF37]' : 'text-white'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2l-6 6-6-6h12z" />
                </svg>
             </div>
             <span className="text-[8px] font-bold leading-tight text-white">
               PRO SINCE<br/>
               <span className="text-[#D4AF37]">2002</span>
             </span>
          </div>
        </button>
      </div>

      {/* 5. WIDGET INFERIOR ESQUERDO (Next Match) */}
      <div className={`absolute bottom-8 left-6 z-20 md:left-12 transition-all duration-1000 delay-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <div className="flex h-48 w-40 flex-col justify-between rounded-t-xl border border-[#D4AF37]/30 bg-black/80 p-4 backdrop-blur-md shadow-2xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Next Match
            </span>
          </div>
          
          <div className="flex flex-1 items-center justify-center py-2 opacity-80">
             <svg viewBox="0 0 100 100" className="h-full w-full stroke-[#D4AF37] stroke-[1.5] fill-none">
                <rect x="10" y="20" width="80" height="60" rx="10" />
                <line x1="50" y1="20" x2="50" y2="80" />
                <circle cx="50" cy="50" r="10" />
             </svg>
          </div>

          <div className="border-t border-[#D4AF37]/30 pt-2">
            <div className="flex items-center justify-between text-white">
               <span className="text-xs font-bold">AL NASSR</span>
               <span className="text-[10px] text-gray-400">VS</span>
            </div>
            <p className="text-[10px] text-[#D4AF37] uppercase mt-1">
              Saudi Pro League
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;