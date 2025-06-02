"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, Car, Users, Smartphone, Crosshair, Briefcase, Play, ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GSAPGameplaySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresGridRef = useRef(null);
  const mainImageRef = useRef(null);
  const statsRef = useRef(null);
  const backgroundRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const gameplayFeatures = [
    {
      id: "world",
      icon: <Map className="h-8 w-8" />,
      title: "Expansive Open World",
      subtitle: "Living & Breathing City",
      description: "Explore the largest and most detailed Vice City ever created, with diverse neighborhoods, hidden locations, and dynamic environments that evolve over time.",
      image: "/images/gameplay-world.jpg",
      stats: { size: "2x Larger", npcs: "10,000+", locations: "500+" },
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "vehicles",
      icon: <Car className="h-8 w-8" />,
      title: "Advanced Vehicle Mechanics",
      subtitle: "Next-Gen Driving",
      description: "Experience revolutionary driving physics with hundreds of customizable vehicles, from sports cars and motorcycles to boats and aircraft.",
      image: "/images/gameplay-vehicles.jpg",
      stats: { vehicles: "400+", physics: "Real-Time", customization: "Unlimited" },
      color: "from-red-500 to-orange-500"
    },
    {
      id: "characters",
      icon: <Users className="h-8 w-8" />,
      title: "Dual Protagonist System",
      subtitle: "Two Perspectives",
      description: "Switch between Lucia and Jason, each with unique abilities, storylines, and gameplay styles that intertwine throughout the narrative.",
      image: "/images/character-lucia.jpg",
      stats: { characters: "2 Main", abilities: "Unique", stories: "Intertwined" },
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "technology",
      icon: <Smartphone className="h-8 w-8" />,
      title: "Immersive Technology",
      subtitle: "Connected World",
      description: "Utilize cutting-edge in-game technology, from smartphones with apps that affect gameplay to advanced hacking systems and social media integration.",
      image: "/images/city-night.jpg",
      stats: { apps: "50+", systems: "Advanced", integration: "Full" },
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "combat",
      icon: <Crosshair className="h-8 w-8" />,
      title: "Enhanced Combat System",
      subtitle: "Tactical Warfare",
      description: "Master refined shooting mechanics, stealth options, and hand-to-hand combat with a responsive and fluid control system.",
      image: "/images/screenshot-2.jpg",
      stats: { weapons: "100+", mechanics: "Refined", modes: "Multiple" },
      color: "from-yellow-500 to-red-500"
    },
    {
      id: "economy",
      icon: <Briefcase className="h-8 w-8" />,
      title: "Dynamic Economy",
      subtitle: "Build Your Empire",
      description: "Build your criminal empire through property acquisition, business management, and strategic investments in Vice City's evolving economy.",
      image: "/images/luxury-car.jpg",
      stats: { properties: "200+", businesses: "50+", investments: "Unlimited" },
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const currentFeature = gameplayFeatures[activeFeature];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 30; i++) {
          const element = document.createElement('div');
          element.className = 'gameplay-particle';
          
          const size = Math.random() * 8 + 4;
          const hue = Math.random() * 60; // Various colors
          
          element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, hsl(${hue}, 70%, 60%), hsl(${hue + 30}, 70%, 60%));
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.7 + 0.3};
          `;
          
          gsap.set(element, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360
          });
          
          container.appendChild(element);
          
          // Animate particle
          gsap.to(element, {
            y: `+=${Math.random() * 300 - 150}`,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: `+=${Math.random() * 720 - 360}`,
            duration: Math.random() * 12 + 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      };

      createFloatingElements();

      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 60
      });

      gsap.set(featuresGridRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.9
      });

      gsap.set(mainImageRef.current, {
        opacity: 0,
        scale: 1.1,
        rotationY: 20
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 30
      });

      // Main scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animations
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Features grid stagger
      tl.to(featuresGridRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Main image animation
      tl.to(mainImageRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8");

      // Stats animation
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      // Parallax background
      gsap.to(backgroundRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -150,
        ease: "none"
      });

      // Feature card hover animations
      const featureCards = featuresGridRef.current.querySelectorAll('.feature-card');
      featureCards.forEach((card, index) => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.4,
            ease: "power2.out"
          });
          setHoveredFeature(index);
          
          // Animate icon
          const icon = card.querySelector('.feature-icon');
          gsap.to(icon, {
            rotation: 360,
            scale: 1.1,
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        };
        
        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          setHoveredFeature(null);
          
          // Reset icon
          const icon = card.querySelector('.feature-icon');
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        const onClick = () => {
          setActiveFeature(index);
          
          // Pulse effect on click
          gsap.to(card, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        };
        
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('click', onClick);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate feature change
  useEffect(() => {
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        scale: 1.1,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(mainImageRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  }, [activeFeature]);

  return (
    <section 
      ref={sectionRef} 
      id="gameplay" 
      className="relative py-32 bg-zinc-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.15),transparent_70%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_70%)] z-10" />

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="opacity-0">
            <Badge 
              variant="outline" 
              className="border-red-500 text-red-500 mb-6 px-6 py-2 bg-red-500/10 backdrop-blur-sm
                         hover:bg-red-500/20 transition-all duration-300 group cursor-pointer"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Next-Gen Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                GAMEPLAY
              </span>
              <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                REVOLUTION
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef} className="opacity-0">
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of open-world gameplay with unprecedented freedom, 
              immersion, and cutting-edge technology that redefines what's possible.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Features Grid */}
          <div ref={featuresGridRef} className="lg:col-span-1 space-y-4">
            {gameplayFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card opacity-0 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${activeFeature === index 
                    ? `bg-gradient-to-r ${feature.color} bg-opacity-20 border-white/30 shadow-xl shadow-white/10` 
                    : 'bg-black/40 border-gray-700/50 hover:border-gray-600/70 backdrop-blur-sm'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`feature-icon p-3 rounded-xl transition-all duration-300
                    ${activeFeature === index 
                      ? 'bg-white text-black' 
                      : 'bg-gray-800 text-gray-300 group-hover:bg-gray-700'
                    }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold text-lg transition-colors duration-300
                        ${activeFeature === index ? 'text-white' : 'text-gray-300'}`}>
                        {feature.title}
                      </h3>
                      {activeFeature === index && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className={`text-sm mb-3 transition-colors duration-300
                      ${activeFeature === index ? 'text-gray-200' : 'text-gray-500'}`}>
                      {feature.subtitle}
                    </p>
                    <p className={`text-sm leading-relaxed transition-colors duration-300
                      ${activeFeature === index ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                    
                    {/* Feature Stats */}
                    {activeFeature === index && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {Object.entries(feature.stats).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                            <div className="text-sm font-bold text-white">{value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Display Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Image */}
            <div ref={mainImageRef} className="opacity-0 relative group">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-gray-800/50 
                            shadow-2xl shadow-black/50">
                <Image
                  src={currentFeature.image || "/images/gameplay-world.jpg"}
                  alt={currentFeature.title}
                  fill
                  className="object-cover transition-all duration-700"
                />
                
                {/* Dynamic Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${currentFeature.color} opacity-20 transition-all duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full h-20 w-20 
                             shadow-2xl backdrop-blur-md border-2 border-white/30
                             transform hover:scale-110 transition-all duration-300"
                  >
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </Button>
                </div>

                {/* Feature Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-xl p-6 rounded-xl border border-white/20">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${currentFeature.color} text-white`}>
                        {currentFeature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-xl">{currentFeature.title}</h3>
                        <p className="text-gray-300 text-sm">{currentFeature.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{currentFeature.description}</p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${currentFeature.color} 
                              rounded-full blur-xl opacity-60 animate-pulse`} />
              </div>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="opacity-0 grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(currentFeature.stats).map(([key, value], index) => (
                <div key={key} className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 
                                       hover:border-gray-600/70 transition-all duration-300 group">
                  <div className={`w-3 h-3 bg-gradient-to-r ${currentFeature.color} rounded-full mb-3 
                                group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3">
              {gameplayFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeFeature === index 
                      ? `bg-gradient-to-r ${gameplayFeatures[index].color} scale-125 shadow-lg` 
                      : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSAPGameplaySection;
