"use client";


import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GSAPHeroBackgroundPro = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const gridLinesRef = useRef([]);
  const shapesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container
    container.innerHTML = '';
    particlesRef.current = [];
    gridLinesRef.current = [];
    shapesRef.current = [];

    // Create particles
    const createParticles = () => {
      const particleCount = 200;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const hue = Math.random() < 0.6 ? 0 : 320; // Red or Pink
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, hsl(${hue}, 100%, 60%) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        `;
        
        // Random position
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5
        });
        
        container.appendChild(particle);
        particlesRef.current.push(particle);
        
        // Animate particle
        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          ease: "power2.inOut"
        });
        
        // Floating animation
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 100 - 50}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 8 + 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    // Create animated grid
    const createGrid = () => {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid-container';
      gridContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        pointer-events: none;
      `;

      // Horizontal lines
      for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
          position: absolute;
          top: ${(i / 15) * 100}%;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          transform: scaleX(0);
          transform-origin: center;
        `;
        
        gridContainer.appendChild(line);
        gridLinesRef.current.push(line);
        
        // Animate line appearance
        gsap.to(line, {
          scaleX: 1,
          duration: 2,
          delay: Math.random() * 3,
          ease: "power2.out"
        });
        
        // Pulsing animation
        gsap.to(line, {
          opacity: 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Vertical lines
      for (let i = 0; i < 12; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
          position: absolute;
          left: ${(i / 12) * 100}%;
          top: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent, #dc2626, transparent);
          transform: scaleY(0);
          transform-origin: center;
        `;
        
        gridContainer.appendChild(line);
        gridLinesRef.current.push(line);
        
        // Animate line appearance
        gsap.to(line, {
          scaleY: 1,
          duration: 2,
          delay: Math.random() * 3,
          ease: "power2.out"
        });
        
        // Pulsing animation
        gsap.to(line, {
          opacity: 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      container.appendChild(gridContainer);
    };

    // Create geometric shapes
    const createShapes = () => {
      for (let i = 0; i < 12; i++) {
        const shape = document.createElement('div');
        const size = 40 + Math.random() * 80;
        const isCircle = Math.random() > 0.5;
        
        shape.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border: 2px solid rgba(220, 38, 38, 0.3);
          border-radius: ${isCircle ? '50%' : '8px'};
          pointer-events: none;
          opacity: 0;
        `;
        
        // Random position
        gsap.set(shape, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360
        });
        
        container.appendChild(shape);
        shapesRef.current.push(shape);
        
        // Entrance animation
        gsap.to(shape, {
          opacity: Math.random() * 0.6 + 0.2,
          duration: 1,
          delay: Math.random() * 4,
          ease: "back.out(1.7)"
        });
        
        // Floating and rotating animation
        gsap.to(shape, {
          y: `+=${Math.random() * 200 - 100}`,
          x: `+=${Math.random() * 200 - 100}`,
          rotation: `+=${Math.random() * 720 - 360}`,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        // Scale breathing effect
        gsap.to(shape, {
          scale: Math.random() * 0.5 + 0.8,
          duration: Math.random() * 4 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    // Initialize animations
    createParticles();
    createGrid();
    createShapes();

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;
      
      // Parallax for particles
      gsap.to(particlesRef.current, {
        x: `+=${deltaX * 20}`,
        y: `+=${deltaY * 20}`,
        duration: 1,
        ease: "power2.out"
      });
      
      // Parallax for shapes (opposite direction)
      gsap.to(shapesRef.current, {
        x: `+=${deltaX * -10}`,
        y: `+=${deltaY * -10}`,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    // Scroll parallax effect
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      
      gsap.to(container, {
        y: scrollY * 0.3,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      // Kill all GSAP animations
      gsap.killTweensOf(particlesRef.current);
      gsap.killTweensOf(gridLinesRef.current);
      gsap.killTweensOf(shapesRef.current);
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
          linear-gradient(135deg, #000000 0%, #0f0f0f 25%, #1a1a1a 50%, #0f0f0f 75%, #000000 100%)
        `,
        overflow: 'hidden'
      }}
    />
  );
};

export default GSAPHeroBackgroundPro;