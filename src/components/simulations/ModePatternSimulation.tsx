import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const ModePatternSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const patternRef = useRef<THREE.Mesh | null>(null);
  
  const [mode, setMode] = React.useState({ m: 0, n: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x121212);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create pattern plane
    const geometry = new THREE.PlaneGeometry(4, 4, 100, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const pattern = new THREE.Mesh(geometry, material);
    scene.add(pattern);
    patternRef.current = pattern;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (pattern) {
        const positions = pattern.geometry.attributes.position;
        const count = positions.count;
        
        for (let i = 0; i < count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const time = Date.now() * 0.001;
          
          // Calculate Hermite-Gaussian mode pattern
          const z = Math.cos(mode.m * Math.PI * x / 2) * 
                   Math.cos(mode.n * Math.PI * y / 2) * 
                   Math.cos(time);
          
          positions.setZ(i, z * 0.5);
        }
        
        positions.needsUpdate = true;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  // Update mode pattern when mode changes
  useEffect(() => {
    if (!patternRef.current) return;
    
    const positions = patternRef.current.geometry.attributes.position;
    positions.needsUpdate = true;
  }, [mode]);
  
  const handleModeChange = (m: number, n: number) => {
    setMode({ m, n });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transverse Mode Patterns</h2>
          </CardHeader>
          <CardContent>
            <div 
              ref={containerRef} 
              className="w-full h-[400px] rounded-lg overflow-hidden"
            ></div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mode Selection</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hermite-Gaussian Modes
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { m: 0, n: 0, label: 'TEM₀₀' },
                    { m: 0, n: 1, label: 'TEM₀₁' },
                    { m: 1, n: 0, label: 'TEM₁₀' },
                    { m: 1, n: 1, label: 'TEM₁₁' },
                    { m: 2, n: 0, label: 'TEM₂₀' },
                    { m: 0, n: 2, label: 'TEM₀₂' }
                  ].map((modeOption) => (
                    <Button
                      key={`${modeOption.m}${modeOption.n}`}
                      variant={mode.m === modeOption.m && mode.n === modeOption.n ? 'primary' : 'outline'}
                      onClick={() => handleModeChange(modeOption.m, modeOption.n)}
                      className="w-full"
                    >
                      {modeOption.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Mode Properties</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Higher order modes have more complex patterns</li>
                  <li>• TEM₀₀ is the fundamental Gaussian mode</li>
                  <li>• Mode indices determine number of nodes</li>
                  <li>• Higher modes experience greater losses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModePatternSimulation;