import { useRef, useEffect } from "react";
import * as THREE from "three";
import cr7Normal from "@/assets/cr7normal.webp";
import cr7Robo from "@/assets/cr7robo.png";

export const useThree = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuração da Cena Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Carregar Texturas
    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(cr7Normal);
    const texture2 = loader.load(cr7Robo);

    // Geometria do Plano
    const geometry = new THREE.PlaneGeometry(1, 1);

    // Shader Material para o efeito de revelação e mixagem
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime: { value: 0 }
      },
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
        uniform float uTime;
        varying vec2 vUv;

        // Função de ruído simples para a borda
        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          
          // Ajuste de aspecto para o círculo do mouse ficar redondo
          float aspect = uResolution.x / uResolution.y;
          vec2 mouseAspect = uMouse;
          mouseAspect.x *= aspect;
          vec2 uvAspect = uv;
          uvAspect.x *= aspect;

          float dist = distance(uvAspect, mouseAspect);
          
          // Raio e borda dinâmica
          float noise = rand(uv * 10.0 + uTime);
          float radius = 0.22;
          float edge = 0.05 + noise * 0.01; // Borda "elétrica" sutil
          
          // Máscara de revelação
          float mask = smoothstep(radius, radius - edge, dist);
          
          vec4 tex1 = texture2D(uTexture1, uv);
          vec4 tex2 = texture2D(uTexture2, uv);
          
          // Mistura as texturas baseada na máscara
          gl_FragColor = mix(tex1, tex2, mask);
        }
      `
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Função de redimensionamento para cobrir a tela (Cover)
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      material.uniforms.uResolution.value.set(width, height);

      // Calcula o tamanho visível do plano na profundidade z=0
      const dist = camera.position.z;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
      const visibleWidth = visibleHeight * camera.aspect;

      plane.scale.set(visibleWidth, visibleHeight, 1);
    };
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      // Atualiza posição do mouse para o shader (0 a 1)
      // Invertemos Y porque no WebGL Y cresce para cima
      material.uniforms.uMouse.value.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);

      // Efeito Tilt 3D Suave (Rotação do plano)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Normaliza de -1 a 1
      const mouseX = (e.clientX - centerX) / centerX;
      const mouseY = (e.clientY - centerY) / centerY;
      
      // Aplica rotação sutil
      plane.rotation.x = mouseY * 0.05; 
      plane.rotation.y = mouseX * 0.05;
    };

    // Loop de Animação
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.uTime.value += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const currentMount = mountRef.current;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeaddEventListener("resize", handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return mountRef;
};
