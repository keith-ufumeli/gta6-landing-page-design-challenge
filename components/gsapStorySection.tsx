"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, MapPin, Users, Zap, Target } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GSAPStorySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const backgroundRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const storyFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dual Protagonists",
      description: "Follow Lucia and Jason's intertwining destinies as they navigate the dangerous criminal underworld of Vice City.",
      image: "/images/character-lucia.jpg"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Vice City Reimagined",
      description: "Explore a sprawling metropolis that's larger and more detailed than ever before, with dynamic weather and day/night cycles.",
      image: "/images/vice-city-skyline.jpg"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Criminal Empire",
      description: "Build your empire from small-time hustler to kingpin through strategic choices, alliances, and ruthless ambition.",
      image: "/images/luxury-car.jpg"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Consequence System",
      description: "Every decision matters. Your choices shape the story, relationships, and the fate of Vice City itself.",
      image: "/images/city-night.jpg"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, contentRef.current], {
        opacity: 0,
        y: 60
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.2,
        rotationY: 15
      });

      gsap.set(featuresRef.current.children, {
        opacity: 0,
        x: -50
      });

      // Create floating particles for background
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'story-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: radial-gradient(circle, rgba(220, 38, 38, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
          `;
          
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.7 + 0.3
          });
          
          container.appendChild(particle);
          
          // Animate particle
          gsap.to(particle, {
            y: `+=${Math.random() * 200 - 100}`,
            x: `+=${Math.random() * 100 - 50}`,
            duration: Math.random() * 8 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      };

      createFloatingElements();

      // Main animation timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation with text reveal effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Content animation
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Image animation with 3D effect
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.6");

      // Features stagger animation
      tl.to(featuresRef.current.children, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Parallax effect for the section
      gsap.to(backgroundRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -100,
        ease: "none"
      });

      // Image hover effect
      const imageElement = imageRef.current;
      if (imageElement) {
        const onEnter = () => {
          gsap.to(imageElement, {
            scale: 1.05,
            rotationY: 5,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(imageElement, {
            scale: 1,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        imageElement.addEventListener('mouseenter', onEnter);
        imageElement.addEventListener('mouseleave', onLeave);
      }

      // Feature cards hover animations
      const featureCards = featuresRef.current.querySelectorAll('.feature-item');
      featureCards.forEach((card, index) => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
          setActiveFeature(index);
        };
        
        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="story" 
      className="relative py-32 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent_70%)] z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div className="space-y-8">
            {/* Title */}
            <div ref={titleRef} className="opacity-0">
              <Badge 
                variant="outline" 
                className="border-red-500 text-red-500 mb-6 px-4 py-2 bg-red-500/10 backdrop-blur-sm"
              >
                The Story Begins
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                  A NEW CRIMINAL
                </span>
                <span className="block bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  SAGA BEGINS
                </span>
              </h2>
            </div>

            {/* Main Content */}
            <div ref={contentRef} className="opacity-0 space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                Return to <span className="text-red-400 font-semibold">Vice City</span>, a sprawling metropolis where crime, 
                corruption, and opportunity intertwine in the most dangerous game of all. Follow the journey of 
                <span className="text-red-400 font-semibold"> Lucia and Jason</span>, two characters whose destinies 
                collide in a story of ambition, betrayal, and survival.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Set in the sun-soaked streets of a reimagined Vice City, GTA VI delivers the most immersive and 
                expansive open world in the series' history. Navigate the treacherous criminal underworld as you 
                rise from small-time hustler to kingpin of your own empire.
              </p>

              <Button
                variant="outline"
                size="lg"
                className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white 
                         border-2 rounded-xl transition-all duration-300 group mt-8
                         hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                Learn More 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Interactive Features */}
            <div ref={featuresRef} className="space-y-4 mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Key Story Elements</h3>
              {storyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-item opacity-0 p-4 rounded-xl border transition-all duration-300 cursor-pointer
                    ${activeFeature === index 
                      ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/20' 
                      : 'bg-black/20 border-gray-700/50 hover:border-red-500/30'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeFeature === index ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div ref={imageRef} className="opacity-0 relative group cursor-pointer">
              {/* Main Image Container */}
              <div className="relative h-[600px] rounded-2xl overflow-hidden border-2 border-gray-800/50 
                            shadow-2xl shadow-black/50 transform perspective-1000">
                <Image 
                  src={storyFeatures[activeFeature].image || "/images/vice-city-skyline.jpg"}
                  alt="GTA 6 Story" 
                  fill 
                  className="object-cover transition-all duration-700 ease-out" 
                />
                
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="lg"
                    className="bg-red-600/90 hover:bg-red-600 text-white rounded-full h-20 w-20 
                             shadow-2xl shadow-red-500/40 backdrop-blur-sm border-2 border-white/20
                             transform hover:scale-110 transition-all duration-300"
                  >
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </Button>
                </div>

                {/* Feature Indicator */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-red-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-500 rounded-lg text-white">
                        {storyFeatures[activeFeature].icon}
                      </div>
                      <h4 className="font-bold text-white">{storyFeatures[activeFeature].title}</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{storyFeatures[activeFeature].description}</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl animate-pulse" />
              
              {/* 3D Border Effect */}
              <div className="absolute inset-0 rounded-2xl border border-red-500/20 transform rotate-1 -z-10" />
              <div className="absolute inset-0 rounded-2xl border border-red-400/10 transform -rotate-1 -z-20" />
            </div>

            {/* Feature Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {storyFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
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

export default GSAPStorySection;
