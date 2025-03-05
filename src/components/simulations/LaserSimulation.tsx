import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const LaserSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { simulationParams, updateSimulationParams } = useStore();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const laserBeamRef = useRef<THREE.Mesh | null>(null);
  
  // Initialize Three.js scene
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
    
    // Create laser cavity
    const cavityGeometry = new THREE.BoxGeometry(4, 0.5, 0.5);
    const cavityMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      transparent: true,
      opacity: 0.8
    });
    const cavity = new THREE.Mesh(cavityGeometry, cavityMaterial);
    scene.add(cavity);
    
    // Create mirrors
    const mirrorGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const mirrorMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    
    const mirror1 = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
    mirror1.rotation.x = Math.PI / 2;
    mirror1.position.x = -2;
    scene.add(mirror1);
    
    const mirror2 = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
    mirror2.rotation.x = Math.PI / 2;
    mirror2.position.x = 2;
    scene.add(mirror2);
    
    // Create laser beam
    const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 4, 32);
    const beamMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff0000,
      transparent: true,
      opacity: 0.7
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.z = Math.PI / 2;
    scene.add(beam);
    laserBeamRef.current = beam;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Add some subtle animation
      if (beam) {
        beam.material.opacity = 0.5 + Math.sin(Date.now() * 0.005) * 0.2;
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
  
  // Update simulation based on parameters
  useEffect(() => {
    if (!laserBeamRef.current) return;
    
    // Update laser color based on wavelength
    const wavelengthToColor = (wavelength: number): number => {
      // Simple conversion from wavelength to RGB color
      if (wavelength >= 380 && wavelength < 450) {
        return 0x9370DB; // Violet
      } else if (wavelength >= 450 && wavelength < 495) {
        return 0x0000FF; // Blue
      } else if (wavelength >= 495 && wavelength < 570) {
        return 0x00FF00; // Green
      } else if (wavelength >= 570 && wavelength < 590) {
        return 0xFFFF00; // Yellow
      } else if (wavelength >= 590 && wavelength < 620) {
        return 0xFFA500; // Orange
      } else if (wavelength >= 620 && wavelength <= 750) {
        return 0xFF0000; // Red
      } else {
        return 0xFFFFFF; // White (outside visible spectrum)
      }
    };
    
    const color = wavelengthToColor(simulationParams.wavelength);
    (laserBeamRef.current.material as THREE.MeshBasicMaterial).color.set(color);
    
    // Update beam intensity based on pump power
    const intensity = Math.min(0.3 + (simulationParams.pumpPower / 50), 1);
    (laserBeamRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    
  }, [simulationParams]);
  
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSimulationParams({ [name]: parseFloat(value) });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Laser Cavity Simulation</h2>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Simulation Parameters</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Wavelength (nm): {simulationParams.wavelength}
                </label>
                <input
                  type="range"
                  name="wavelength"
                  min="380"
                  max="750"
                  step="1"
                  value={simulationParams.wavelength}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>380 nm</span>
                  <span>750 nm</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pump Power (W): {simulationParams.pumpPower}
                </label>
                <input
                  type="range"
                  name="pumpPower"
                  min="0"
                  max="50"
                  step="1"
                  value={simulationParams.pumpPower}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0 W</span>
                  <span>50 W</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cavity Length (cm): {simulationParams.cavityLength}
                </label>
                <input
                  type="range"
                  name="cavityLength"
                  min="10"
                  max="100"
                  step="1"
                  value={simulationParams.cavityLength}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>10 cm</span>
                  <span>100 cm</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mirror Reflectivity: {simulationParams.reflectivity.toFixed(2)}
                </label>
                <input
                  type="range"
                  name="reflectivity"
                  min="0.5"
                  max="0.999"
                  step="0.001"
                  value={simulationParams.reflectivity}
                  onChange={handleParamChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>50%</span>
                  <span>99.9%</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="primary" className="w-full">
                  Run Experiment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaserSimulation;