import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const particlesMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  // Setup ThreeJS Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Create the particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Increased particle count
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Colors (primary color palette)
    const colors = [
      { r: 0.227, g: 0.525, b: 1 },    // #3a86ff (primary)
      { r: 0.514, g: 0.22, b: 0.925 }, // #8338ec (secondary)
      { r: 1, g: 0, b: 0.431 },        // #ff006e (accent)
      { r: 0.984, g: 0.337, b: 0.027 } // #fb5607 (accent2)
    ];
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Positions - random within a sphere
      const radius = 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Colors - random from our palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      transparent: true,
      opacity: theme === 'dark' ? 0.8 : 0.6, // Increased opacity for better visibility
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    particlesMaterialRef.current = particlesMaterial;
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;
    
    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x3a86ff, 0.2);
    scene.add(ambientLight);

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      mousePositionRef.current = {
        x: (event.clientX - windowHalfX),
        y: (event.clientY - windowHalfY)
      };
    };

    // Touch movement handler for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        mousePositionRef.current = {
          x: (event.touches[0].clientX - windowHalfX),
          y: (event.touches[0].clientY - windowHalfY)
        };
      }
    };

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      if (!particleSystemRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
        cancelAnimationFrame(animationId);
        return;
      }
      
      // Smooth follow
      targetPositionRef.current = {
        x: mousePositionRef.current.x * 0.001,
        y: mousePositionRef.current.y * 0.001
      };
      
      particleSystemRef.current.rotation.y += 0.002; // Constant rotation
      particleSystemRef.current.rotation.x += (targetPositionRef.current.y - particleSystemRef.current.rotation.x) * 0.02;
      particleSystemRef.current.rotation.y += (targetPositionRef.current.x - particleSystemRef.current.rotation.y) * 0.02;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      if (particlesGeometry) {
        particlesGeometry.dispose();
      }
      
      if (particlesMaterial) {
        particlesMaterial.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Only run once on mount

  // Update particles based on theme changes
  useEffect(() => {
    if (particlesMaterialRef.current) {
      // Adjust opacity based on theme
      particlesMaterialRef.current.opacity = theme === 'dark' ? 0.8 : 0.6;
      particlesMaterialRef.current.needsUpdate = true;
      
      // Color adjustments based on theme
      if (theme === 'light') {
        // Increase size and brightness for better visibility in light mode
        particlesMaterialRef.current.size = 0.2;
      } else {
        particlesMaterialRef.current.size = 0.15;
      }
    }
  }, [theme]);

  return <canvas id="bg-canvas" ref={canvasRef} />;
};

export default ParticleBackground;
