import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import * as THREE from "three";
import Header from "./Header"; 

// --- IMPORTS DAS IMAGENS ---
import airtoncapacete from "@/assets/airtoncomcapacete.png"; 
import airtonsemcapacete from "@/assets/airtonsemcapacete.png"; 
import airtondepth from "@/assets/DepthMapSenna.png"; 

const HeroSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRevealMode, setIsRevealMode] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  
  const revealValueRef = useRef(0); 
  const targetRevealRef = useRef(0);

  useEffect(() => {
    targetRevealRef.current = isRevealMode ? 1 : 0;
  }, [isRevealMode]);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuração Three.js ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    
    // CARREGAMENTO DAS TEXTURAS
    const texBase = loader.load(airtonsemcapacete);
    const texReveal = loader.load(airtoncapacete);
    const texDepth = loader.load(airtondepth);
    
    [texBase, texReveal, texDepth].forEach(tex => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
    });

    const geometry = new THREE.PlaneGeometry(2, 2); 

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTextureBase: { value: texBase },
        uTextureReveal: { value: texReveal },
        uTextureDepth: { value: texDepth },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uGlobalReveal: { value: 0.0 },
        uImageAspect: { value: 0.66 }, 
        uParallaxStrength: { value: 0.04 },
        
        // --- AJUSTE DE ESCALA ---
        // 1.15 era muito grande (cortava)
        // 0.85 ficou muito pequeno (sobrou espaço)
        // 1.05 é o equilíbrio ideal
        uPosterScale: { value: 1.05 }, 
        
        // Pequeno ajuste vertical para centralizar os olhos
        uImageOffset: { value: new THREE.Vector2(0.0, 0.02) } 
      },
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTextureBase;
        uniform sampler2D uTextureReveal;
        uniform sampler2D uTextureDepth;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform float uGlobalReveal;
        uniform float uImageAspect;
        uniform float uParallaxStrength;
        uniform float uPosterScale;
        uniform vec2 uImageOffset;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          float screenAspect = uResolution.x / uResolution.y;
          
          vec2 aspectUV = uv - 0.5;

          if (screenAspect > uImageAspect) {
             aspectUV.x *= screenAspect / uImageAspect;
          } else {
             aspectUV.y *= uImageAspect / screenAspect;
          }

          aspectUV /= uPosterScale;
          aspectUV += uImageOffset;
          aspectUV += 0.5;

          // Máscara suave nas bordas para não cortar seco
          float edgeSmoothness = 0.01;
          float maskX = smoothstep(0.0, edgeSmoothness, aspectUV.x) * smoothstep(1.0, 1.0 - edgeSmoothness, aspectUV.x);
          float maskY = smoothstep(0.0, edgeSmoothness, aspectUV.y) * smoothstep(1.0, 1.0 - edgeSmoothness, aspectUV.y);
          float borderMask = maskX * maskY;

          if (borderMask < 0.001) discard;
          
          vec4 depthTexel = texture2D(uTextureDepth, aspectUV);
          float depth = depthTexel.r; 
          
          vec2 parallaxOffset = (uMouse - 0.5) * depth * uParallaxStrength * borderMask;

          vec4 colorBase = texture2D(uTextureBase, aspectUV + parallaxOffset);
          vec4 colorReveal = texture2D(uTextureReveal, aspectUV + (parallaxOffset * 0.3)); 

          vec2 cursor = uMouse - 0.5;
          if (screenAspect > uImageAspect) { cursor.x *= screenAspect / uImageAspect; } 
          else { cursor.y *= uImageAspect / screenAspect; }
          cursor /= uPosterScale;
          cursor += uImageOffset;
          cursor += 0.5;

          float dist = distance(aspectUV, cursor); 
          float radius = 0.38; 
          float edge = 0.2;   
          
          float mouseMask = smoothstep(radius, radius - edge, dist);
          float finalMask = clamp(mouseMask + uGlobalReveal, 0.0, 1.0);
          
          vec4 finalColor = mix(colorBase, colorReveal, finalMask);
          finalColor.a *= borderMask;

          gl_FragColor = finalColor;
        }
      `
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
      renderer.render(scene, camera);
    };
    
    setTimeout(handleResize, 100);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      material.uniforms.uMouse.value.set(x, y);
      
      const mouseXPos = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseYPos = -(e.clientY / window.innerHeight) * 2 + 1;
      plane.rotation.y = mouseXPos * 0.02; 
      plane.rotation.x = mouseYPos * 0.02;
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      revealValueRef.current += (targetRevealRef.current - revealValueRef.current) * 0.06;
      material.uniforms.uGlobalReveal.value = revealValueRef.current;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texBase.dispose();
      texReveal.dispose();
      texDepth.dispose();
    };
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-white text-black">
      
      {/* BACKGROUND SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <path d="M-100,500 C 200,400 600,600 1200,300 S 2000,600 2400,200" fill="none" stroke="#E5E5E5" strokeWidth="1.5" />
           <path d="M-100,200 C 300,100 800,400 1400,100 S 2200,300 2500,100" fill="none" stroke="#E5E5E5" strokeWidth="1.5" />
           <path d="M-100,800 C 400,700 900,900 1600,600 S 2300,900 2600,500" fill="none" stroke="#E5E5E5" strokeWidth="1.5" />
        </svg>
      </div>

      <Header />

      {/* THREE.JS CANVAS */}
      <div ref={mountRef} className="absolute inset-0 z-10 pointer-events-none" style={{ mixBlendMode: 'multiply' }} />
      <div className="absolute inset-0 z-20 bg-transparent"></div>

      {/* --- BOTÃO DIREITA (TOGGLE MODE) --- */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 md:right-12 transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
        <button
          onClick={() => setIsRevealMode(!isRevealMode)}
          className={`group flex h-64 w-24 flex-col items-center justify-between rounded-2xl border transition-all duration-500 backdrop-blur-sm
            ${isRevealMode 
              ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,36,0,0.2)]' 
              : 'border-gray-300/50 bg-white/30 hover:border-primary/50 hover:bg-white/50' 
            }`}
        >
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className={`h-12 w-12 transition-colors duration-500 ${isRevealMode ? 'text-primary' : 'text-gray-600 group-hover:text-black'}`}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
                 <path d="M12 4C7 4 3 7 3 12v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5c0-5-4-8-9-8z" />
                 <path d="M3 12h18" />
                 <path d="M12 4v8" />
               </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Legend</span>
          </div>
          <div className="rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className={`transition-colors duration-500 ${isRevealMode ? 'text-primary' : 'text-black'}`}>
              {isRevealMode ? "RACER" : "HUMAN"}
            </span>
          </div>
          <div className="mb-4 flex flex-col items-center text-center">
              <div className={`mb-2 transition-transform duration-500 group-hover:scale-110 ${isRevealMode ? 'text-primary' : 'text-gray-800'}`}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2l-6 6-6-6h12z" /></svg>
              </div>
              <span className="text-[8px] font-bold leading-tight text-gray-600">F1 DEBUT<br/><span className="text-primary">1984</span></span>
          </div>
        </button>
      </div>

      {/* --- WIDGET ESQUERDO: NEXT RACE (MELBOURNE) --- */}
      <div className={`absolute bottom-64 left-6 z-30 md:left-12 transition-all duration-1000 delay-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        
        {/* Largura mantida em w-32 (equilíbrio) */}
        <div className="relative group w-32 h-52 flex flex-col justify-between">
            <div className="absolute -top-3 left-0 z-20">
                <span className="bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gray-500 border border-gray-300 rounded-sm">
                    Next Race
                </span>
            </div>

            <div className="h-full w-full rounded-lg border border-gray-300 bg-white/40 backdrop-blur-sm p-3 flex flex-col hover:border-primary/50 transition-colors">
                <div className="flex-1 flex items-center justify-center py-2">
                    <svg viewBox="0 0 200 150" className="w-full h-full stroke-gray-800 fill-none stroke-[2px] drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                        <path d="M 40,80 L 50,60 L 90,55 L 120,60 L 140,40 L 160,50 L 155,70 L 170,90 L 150,110 L 100,105 L 90,120 L 60,115 Z" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="mt-1 text-left">
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-sm leading-none tracking-tight text-black">
                            MELBOURNE
                        </span>
                        <span className="font-display font-bold text-sm leading-none tracking-tight text-black">
                            GP
                        </span>
                    </div>
                    <div className="h-1 w-0 bg-[#d2ff00] mt-1 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_#d2ff00]"></div>
                </div>
            </div>

             <div className="absolute -bottom-14 left-0 flex flex-col items-center w-full opacity-60">
                 <div className="h-6 w-6 mb-1 text-gray-800">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4 0-8 3-8 8 0 4 3 7 6 8v2h4v-2c3-1 6-4 6-8 0-5-4-8-8-8zm0 14c-2.5 0-5-1.5-6-4h12c-1 2.5-3.5 4-6 4z"/></svg>
                 </div>
                 <span className="text-[7px] font-bold uppercase text-gray-500 text-center leading-tight">
                    McLaren F1<br/>Since 2019
                 </span>
             </div>
        </div>
      </div>

      {/* WIDGET INFERIOR (RECORD) */}
      <div className={`absolute bottom-8 left-6 z-30 md:left-12 transition-all duration-1000 delay-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <div className="flex h-48 w-40 flex-col justify-between rounded-t-xl border border-gray-300/50 bg-white/30 p-4 backdrop-blur-sm shadow-xl hover:border-primary/30 transition-colors">
          <div><span className="text-[10px] font-bold uppercase tracking-widest text-primary">Record</span></div>
          <div className="flex flex-1 flex-col items-center justify-center py-2 opacity-90">
              <span className="font-display text-5xl text-black">65</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-600">Pole Positions</span>
          </div>
          <div className="border-t border-gray-200/50 pt-2">
            <div className="flex items-center justify-between text-black">
               <span className="text-xs font-bold">MCLAREN</span><span className="text-[10px] text-gray-600">MP4/4</span>
            </div>
            <p className="text-[10px] text-primary uppercase mt-1">Most Dominant Car</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;