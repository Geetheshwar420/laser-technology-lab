import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface SimulationParams {
  power: number;
  speed: number;
  material: string;
  focalLength: number;
}

const ApplicationSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  const [params, setParams] = useState<SimulationParams>({
    power: 1000,
    speed: 10,
    material: 'steel',
    focalLength: 100
  });
  
  const [simulationType, setSimulationType] = useState<'cutting' | 'welding' | 'drilling'>('cutting');
  
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
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
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
    
    // Create workpiece
    const workpieceGeometry = new THREE.BoxGeometry(4, 0.5, 2);
    const workpieceMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const workpiece = new THREE.Mesh(workpieceGeometry, workpieceMaterial);
    scene.add(workpiece);
    
    // Create laser head
    const laserHeadGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.5, 32);
    const laserHeadMaterial = new THREE.MeshPhongMaterial({ color: 0x404040 });
    const laserHead = new THREE.Mesh(laserHeadGeometry, laserHeadMaterial);
    laserHead.position.set(0, 2, 0);
    scene.add(laserHead);
    
    // Create laser beam
    const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.7
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set(0, 1, 0);
    scene.add(beam);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Animate laser head movement
      if (simulationType === 'cutting') {
        laserHead.position.x = Math.sin(time) * 1.5;
        beam.position.x = laserHead.position.x;
      } else if (simulationType === 'welding') {
        laserHead.position.z = Math.sin(time) * 0.5;
        beam.position.z = laserHead.position.z;
      } else if (simulationType === 'drilling') {
        beam.scale.y = 1 + Math.sin(time * 2) * 0.1;
      }
      
      // Update beam opacity based on power
      beamMaterial.opacity = 0.3 + (params.power / 2000) * 0.7;
      
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
  }, [simulationType]);
  
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Industrial Laser Applications</h2>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Process Parameters</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Type
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={simulationType === 'cutting' ? 'primary' : 'outline'}
                    onClick={() => setSimulationType('cutting')}
                  >
                    Cutting
                  </Button>
                  <Button
                    variant={simulationType === 'welding' ? 'primary' : 'outline'}
                    onClick={() => setSimulationType('welding')}
                  >
                    Welding
                  </Button>
                  <Button
                    variant={simulationType === 'drilling' ? 'primary' : 'outline'}
                    onClick={() => setSimulationType('drilling')}
                  >
                    Drilling
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Laser Power (W): {params.power}
                </label>
                <input
                  type="range"
                  name="power"
                  min="100"
                  max="2000"
                  step="100"
                  value={params.power}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Process Speed (mm/s): {params.speed}
                </label>
                <input
                  type="range"
                  name="speed"
                  min="1"
                  max="50"
                  step="1"
                  value={params.speed}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Focal Length (mm): {params.focalLength}
                </label>
                <input
                  type="range"
                  name="focalLength"
                  min="50"
                  max="200"
                  step="10"
                  value={params.focalLength}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material Selection
                </h3>
                <select
                  name="material"
                  value={params.material}
                  onChange={(e) => setParams(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  
                  <option value="steel">Steel</option>
                  <option value="aluminum">Aluminum</option>
                  <option value="copper">Copper</option>
                  <option value="titanium">Titanium</option>
                </select>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Process Information</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Power density: {(params.power / (Math.PI * 0.05 * 0.05)).toFixed(0)} W/cm²</li>
                  <li>• Material thickness: 5 mm</li>
                  <li>• Assist gas: Nitrogen</li>
                  <li>• Nozzle diameter: 2 mm</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationSimulation;