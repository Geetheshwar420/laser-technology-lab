import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { createNoise2D } from 'simplex-noise';

export class LaserSimulation {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private beam: THREE.Mesh;
  private cavity: THREE.Mesh;
  private mirrors: THREE.Mesh[];
  private noise2D: ReturnType<typeof createNoise2D>;
  private time: number = 0;

  constructor(container: HTMLElement) {
    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.noise2D = createNoise2D();

    // Setup renderer
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Setup camera
    this.camera.position.z = 5;

    // Create basic geometries
    this.cavity = this.createCavity();
    this.beam = this.createBeam();
    this.mirrors = this.createMirrors();

    // Add objects to scene
    this.scene.add(this.cavity);
    this.scene.add(this.beam);
    this.mirrors.forEach(mirror => this.scene.add(mirror));

    // Add lighting
    this.setupLighting();

    // Start animation loop
    this.animate();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(container));
  }

  private createCavity(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(4, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.8,
    });
    return new THREE.Mesh(geometry, material);
  }

  private createBeam(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 4, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.7,
    });
    const beam = new THREE.Mesh(geometry, material);
    beam.rotation.z = Math.PI / 2;
    return beam;
  }

  private createMirrors(): THREE.Mesh[] {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    
    const mirror1 = new THREE.Mesh(geometry, material);
    mirror1.rotation.x = Math.PI / 2;
    mirror1.position.x = -2;
    
    const mirror2 = new THREE.Mesh(geometry, material);
    mirror2.rotation.x = Math.PI / 2;
    mirror2.position.x = 2;
    
    return [mirror1, mirror2];
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    
    this.time += 0.01;
    
    // Update beam properties based on simulation parameters
    const beamMaterial = this.beam.material as THREE.MeshBasicMaterial;
    beamMaterial.opacity = 0.5 + Math.sin(this.time * 2) * 0.2;
    
    // Add some noise to the beam for realism
    const noise = this.noise2D(this.time, 0) * 0.02;
    this.beam.position.y = noise;
    
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize(container: HTMLElement): void {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  // Public methods for controlling the simulation
  public updateWavelength(wavelength: number): void {
    const color = this.wavelengthToColor(wavelength);
    (this.beam.material as THREE.MeshBasicMaterial).color.set(color);
  }

  public updatePumpPower(power: number): void {
    const intensity = Math.min(0.3 + (power / 50), 1);
    (this.beam.material as THREE.MeshBasicMaterial).opacity = intensity;
    
    // Animate beam intensity
    new TWEEN.Tween({ scale: this.beam.scale.y })
      .to({ scale: 1 + (power / 100) }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ scale }) => {
        this.beam.scale.y = scale;
      })
      .start();
  }

  public updateCavityLength(length: number): void {
    // Animate cavity and beam length
    new TWEEN.Tween({ scale: this.cavity.scale.x })
      .to({ scale: length / 30 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ scale }) => {
        this.cavity.scale.x = scale;
        this.beam.scale.x = scale;
        
        // Update mirror positions
        this.mirrors[0].position.x = -2 * scale;
        this.mirrors[1].position.x = 2 * scale;
      })
      .start();
  }

  private wavelengthToColor(wavelength: number): number {
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
  }

  public dispose(): void {
    // Clean up resources
    this.renderer.dispose();
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}

export class ModePatternSimulation {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private pattern: THREE.Mesh;
  private time: number = 0;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
    
    // Create pattern mesh
    const geometry = new THREE.PlaneGeometry(4, 4, 100, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    this.pattern = new THREE.Mesh(geometry, material);
    this.scene.add(this.pattern);

    this.setupLighting();
    this.animate();
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    
    this.time += 0.01;
    this.updatePattern();
    
    this.renderer.render(this.scene, this.camera);
  };

  private updatePattern(): void {
    const positions = this.pattern.geometry.attributes.position;
    const count = positions.count;
    
    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Calculate mode pattern
      const z = Math.cos(this.m * Math.PI * x / 2) * 
               Math.cos(this.n * Math.PI * y / 2) * 
               Math.cos(this.time);
      
      positions.setZ(i, z * 0.5);
    }
    
    positions.needsUpdate = true;
  }

  private m: number = 0;
  private n: number = 0;

  public updateMode(m: number, n: number): void {
    this.m = m;
    this.n = n;
  }

  public dispose(): void {
    this.renderer.dispose();
    this.pattern.geometry.dispose();
    (this.pattern.material as THREE.Material).dispose();
  }
}

export class ApplicationSimulation {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private laserHead: THREE.Mesh;
  private workpiece: THREE.Mesh;
  private beam: THREE.Mesh;
  private time: number = 0;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Create objects
    this.workpiece = this.createWorkpiece();
    this.laserHead = this.createLaserHead();
    this.beam = this.createBeam();

    this.scene.add(this.workpiece);
    this.scene.add(this.laserHead);
    this.scene.add(this.beam);

    this.setupLighting();
    this.animate();
  }

  private createWorkpiece(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(4, 0.5, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    return new THREE.Mesh(geometry, material);
  }

  private createLaserHead(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(0.2, 0.3, 0.5, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x404040 });
    const head = new THREE.Mesh(geometry, material);
    head.position.set(0, 2, 0);
    return head;
  }

  private createBeam(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.7,
    });
    const beam = new THREE.Mesh(geometry, material);
    beam.position.set(0, 1, 0);
    return beam;
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    
    this.time += 0.01;
    this.updateSimulation();
    
    this.renderer.render(this.scene, this.camera);
  };

  private simulationType: 'cutting' | 'welding' | 'drilling' = 'cutting';

  public setSimulationType(type: 'cutting' | 'welding' | 'drilling'): void {
    this.simulationType = type;
  }

  private updateSimulation(): void {
    switch (this.simulationType) {
      case 'cutting':
        this.laserHead.position.x = Math.sin(this.time) * 1.5;
        this.beam.position.x = this.laserHead.position.x;
        break;
      case 'welding':
        this.laserHead.position.z = Math.sin(this.time) * 0.5;
        this.beam.position.z = this.laserHead.position.z;
        break;
      case 'drilling':
        this.beam.scale.y = 1 + Math.sin(this.time * 2) * 0.1;
        break;
    }
  }

  public updatePower(power: number): void {
    (this.beam.material as THREE.MeshBasicMaterial).opacity = 
      0.3 + (power / 2000) * 0.7;
  }

  public dispose(): void {
    this.renderer.dispose();
    [this.workpiece, this.laserHead, this.beam].forEach(mesh => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
  }
}