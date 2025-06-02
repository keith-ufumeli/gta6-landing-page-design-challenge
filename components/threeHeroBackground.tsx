import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHeroBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 500;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles system
    const createParticles = () => {
      const particleCount = 1500;
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];
      const sizes = [];

      for (let i = 0; i < particleCount; i++) {
        // Position
        vertices.push(
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 1000
        );

        // Colors (Vice City neon theme)
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
          // Red tones
          colors.push(1, 0.2, 0.2);
        } else if (colorChoice < 0.7) {
          // Pink/Magenta tones
          colors.push(1, 0.3, 0.8);
        } else {
          // Blue/Cyan tones
          colors.push(0.2, 0.8, 1);
        }

        // Varying sizes
        sizes.push(Math.random() * 4 + 1);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      return new THREE.Points(geometry, material);
    };

    // Create geometric shapes for depth
    const createGeometry = () => {
      const group = new THREE.Group();

      // Create wireframe cubes
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(
          Math.random() * 100 + 50,
          Math.random() * 100 + 50,
          Math.random() * 100 + 50
        );
        
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(
            Math.random() * 0.1 + 0.95, // Red hues
            0.8,
            0.5
          ),
          wireframe: true,
          transparent: true,
          opacity: 0.2
        });

        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.set(
          (Math.random() - 0.5) * 1500,
          (Math.random() - 0.5) * 1500,
          (Math.random() - 0.5) * 800
        );
        
        cube.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        group.add(cube);
      }

      return group;
    };

    // Create city-like grid
    const createGrid = () => {
      const group = new THREE.Group();
      
      // Horizontal lines
      for (let i = -10; i <= 10; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-1000, i * 100, -200),
          new THREE.Vector3(1000, i * 100, -200)
        ]);
        
        const material = new THREE.LineBasicMaterial({
          color: 0xdc2626,
          transparent: true,
          opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        group.add(line);
      }

      // Vertical lines
      for (let i = -10; i <= 10; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 100, -1000, -200),
          new THREE.Vector3(i * 100, 1000, -200)
        ]);
        
        const material = new THREE.LineBasicMaterial({
          color: 0xdc2626,
          transparent: true,
          opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        group.add(line);
      }

      return group;
    };

    // Add all elements to scene
    const particles = createParticles();
    const geometryGroup = createGeometry();
    const grid = createGrid();
    
    scene.add(particles);
    scene.add(geometryGroup);
    scene.add(grid);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.1;
      
      // Animate geometric shapes
      geometryGroup.children.forEach((cube, index) => {
        cube.rotation.x += 0.01 + index * 0.001;
        cube.rotation.y += 0.015 + index * 0.001;
        cube.position.y += Math.sin(elapsedTime + index) * 0.2;
      });

      // Mouse parallax effect
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Grid breathing effect
      grid.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1;
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        overflow: 'hidden'
      }}
    />
  );
};

export default ThreeHeroBackground;
