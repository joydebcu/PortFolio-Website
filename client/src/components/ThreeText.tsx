import { useRef, useEffect } from 'react';
import * as THREE from 'three';
// Import TextGeometry and FontLoader with type declarations
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

interface ThreeTextProps {
  text: string;
  size?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ThreeText = ({ 
  text, 
  size = 3.2, 
  height = 0.4, 
  color = '#3a86ff',
  className = '' 
}: ThreeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const textMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);
    
    // Add default mesh until font loads
    const defaultGeometry = new THREE.PlaneGeometry(1, 1);
    const defaultMaterial = new THREE.MeshBasicMaterial({ 
      color: color,
      transparent: true,
      opacity: 0
    });
    const defaultMesh = new THREE.Mesh(defaultGeometry, defaultMaterial);
    scene.add(defaultMesh);
    textMeshRef.current = defaultMesh;
    
    // Load font and create text
    const loader = new FontLoader();
    
    // Load Helvetiker or another default font
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font: Font) => {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      // Center the text
      textGeometry.computeBoundingBox();
      if (textGeometry.boundingBox) {
        const centerOffset = -0.5 * (
          textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x
        );
        const textMaterial = new THREE.MeshStandardMaterial({ 
          color: color,
          metalness: 0.3,
          roughness: 0.4
        });
        
        // Remove default mesh
        scene.remove(defaultMesh);
        
        // Add text mesh
        const mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.x = centerOffset;
        scene.add(mesh);
        textMeshRef.current = mesh;
      }
    });
    
    // Handle mouse move for interactive effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!textMeshRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const containerRect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - containerRect.left) / width) * 2 - 1;
      const mouseY = -((event.clientY - containerRect.top) / height) * 2 + 1;
      
      // Apply subtle rotation based on mouse position
      textMeshRef.current.rotation.x = mouseY * 0.2;
      textMeshRef.current.rotation.y = mouseX * 0.4;
    };
    
    // Handle touch move for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (!textMeshRef.current || !event.touches[0]) return;
      
      // Calculate touch position in normalized device coordinates
      const containerRect = container.getBoundingClientRect();
      const touchX = ((event.touches[0].clientX - containerRect.left) / width) * 2 - 1;
      const touchY = -((event.touches[0].clientY - containerRect.top) / height) * 2 + 1;
      
      // Apply subtle rotation based on touch position
      textMeshRef.current.rotation.x = touchY * 0.3;
      textMeshRef.current.rotation.y = touchX * 0.5;
    };
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      
      // Add subtle animation when not interacting
      if (textMeshRef.current) {
        textMeshRef.current.rotation.y += 0.003;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    // Start animation
    animate();
    
    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      if (container && rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of resources
      if (textMeshRef.current) {
        if (textMeshRef.current.geometry) textMeshRef.current.geometry.dispose();
        if (textMeshRef.current.material) {
          if (Array.isArray(textMeshRef.current.material)) {
            textMeshRef.current.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            textMeshRef.current.material.dispose();
          }
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [text, size, height, color]);
  
  return (
    <div ref={containerRef} className={`w-full h-24 md:h-28 lg:h-36 ${className}`}></div>
  );
};

export default ThreeText;