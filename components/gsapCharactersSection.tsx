"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Users, Star, Target, Shield, Zap, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GSAPCharactersSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const charactersGridRef = useRef(null);
  const activeCharacterRef = useRef(null);
  const backgroundRef = useRef(null);
  const statsRef = useRef(null);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const characters = [
    {
      id: 'lucia',
      name: 'Lucia',
      role: 'The Mastermind',
      subtitle: 'Strategic Criminal Genius',
      description: 'A cunning and ambitious former cartel member with a talent for strategy and manipulation. Lucia\'s intelligence and ruthless determination make her a formidable force in Vice City\'s criminal underworld.',
      fullBio: 'Born into poverty but gifted with exceptional intelligence, Lucia clawed her way up through the ranks of various criminal organizations. Her strategic mind and ability to manipulate situations to her advantage have earned her respect and fear in equal measure.',
      image: 'https://picsum.photos/800/1000?random=1',
      portrait: 'https://picsum.photos/400/600?random=11',
      stats: {
        Intelligence: 95,
        Combat: 75,
        Driving: 80,
        Charisma: 90
      },
      specialSkills: ['Strategic Planning', 'Negotiation', 'Technology', 'Leadership'],
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accentColor: 'from-purple-500 to-pink-500',
      quote: "In this game, you either play smart or you don\'t play at all."
    },
    {
      id: 'jason',
      name: 'Jason',
      role: 'The Enforcer',
      subtitle: 'Ex-Military Specialist',
      description: 'An ex-military specialist with unmatched combat skills and a complicated moral code. Jason brings tactical expertise and raw firepower to any operation, but struggles with the ethics of criminal life.',
      fullBio: 'A decorated military veteran who found himself on the wrong side of a cover-up. Discharged and disillusioned, Jason turned to mercenary work to survive, eventually finding his way into Vice City\'s criminal ecosystem.',
      image: 'https://picsum.photos/800/1000?random=2',
      portrait: 'https://picsum.photos/400/600?random=12',
      stats: {
        Intelligence: 80,
        Combat: 98,
        Driving: 85,
        Charisma: 70
      },
      specialSkills: ['Combat Tactics', 'Weapons Expert', 'Driving', 'Security Systems'],
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accentColor: 'from-red-500 to-orange-500',
      quote: "Sometimes you have to break a few rules to do what\'s right."
    },
    {
      id: 'ricardo',
      name: 'Ricardo Diaz',
      role: 'The Kingpin',
      subtitle: 'Vice City Crime Lord',
      description: 'Vice City\'s most powerful crime lord who controls the city\'s underworld with an iron fist. Ricardo is a dangerous adversary with connections throughout the city\'s power structure.',
      fullBio: 'A third-generation crime boss who inherited his empire and expanded it through ruthless efficiency and strategic alliances. Ricardo sees Vice City as his personal kingdom and tolerates no challenges to his authority.',
      image: 'https://picsum.photos/800/1000?random=3',
      portrait: 'https://picsum.photos/400/600?random=13',
      stats: {
        Intelligence: 88,
        Combat: 85,
        Driving: 70,
        Charisma: 95
      },
      specialSkills: ['Business Management', 'Intimidation', 'Networking', 'Resource Control'],
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      accentColor: 'from-yellow-500 to-red-500',
      quote: "In Vice City, I don\'t just make the rules - I am the rules."
    }
  ];

  const activeCharacter = characters[activeCharacterIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 25; i++) {
          const element = document.createElement('div');
          element.className = 'character-particle';
          
          const size = Math.random() * 6 + 3;
          const hue = activeCharacterIndex * 120; // Different color per character
          
          element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue + Math.random() * 60}, 70%, 60%), transparent);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.2};
          `;
          
          gsap.set(element, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360
          });
          
          container.appendChild(element);
          
          // Animate particle
          gsap.to(element, {
            y: `+=${Math.random() * 200 - 100}`,
            x: `+=${Math.random() * 150 - 75}`,
            rotation: `+=${Math.random() * 720 - 360}`,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      };

      createFloatingElements();

      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 60
      });

      gsap.set(charactersGridRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.9
      });

      gsap.set(activeCharacterRef.current, {
        opacity: 0,
        x: 100
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

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Character cards stagger
      tl.to(charactersGridRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Active character panel
      tl.to(activeCharacterRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4");

      // Stats animation
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

      // Parallax background
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

      // Character card hover animations
      const characterCards = charactersGridRef.current.querySelectorAll('.character-card');
      characterCards.forEach((card, index) => {
        const onEnter = () => {
          if (index !== activeCharacterIndex && !isTransitioning) {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        };
        
        const onLeave = () => {
          if (index !== activeCharacterIndex) {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        };
        
        const onClick = () => {
          if (index !== activeCharacterIndex && !isTransitioning) {
            changeCharacter(index);
          }
        };
        
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('click', onClick);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeCharacterIndex, isTransitioning]);

  const changeCharacter = (newIndex: number) => {
    if (isTransitioning || newIndex === activeCharacterIndex) return;
    
    setIsTransitioning(true);
    
    // Animate out current character
    gsap.to(activeCharacterRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveCharacterIndex(newIndex);
        
        // Animate in new character
        gsap.fromTo(activeCharacterRef.current, 
          { opacity: 0, x: 50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: "power2.out",
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });

    // Update background particles color
    const particles = backgroundRef.current.querySelectorAll('.character-particle');
    particles.forEach((particle, index) => {
      const hue = newIndex * 120;
      gsap.to(particle, {
        background: `radial-gradient(circle, hsl(${hue + Math.random() * 60}, 70%, 60%), transparent)`,
        duration: 1,
        delay: Math.random() * 0.5
      });
    });
  };

  const nextCharacter = () => {
    const nextIndex = (activeCharacterIndex + 1) % characters.length;
    changeCharacter(nextIndex);
  };

  const prevCharacter = () => {
    const nextIndex = (activeCharacterIndex - 1 + characters.length) % characters.length;
    changeCharacter(nextIndex);
  };

  return (
    <section 
      ref={sectionRef} 
      id="characters" 
      className="relative py-32 bg-gradient-to-b from-zinc-900 via-black to-zinc-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,69,19,0.15),transparent_70%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(75,0,130,0.1),transparent_70%)] z-10" />

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Header */}
        <div ref={titleRef} className="opacity-0 text-center mb-16">
          <Badge 
            variant="outline" 
            className="border-red-500 text-red-500 mb-6 px-6 py-2 bg-red-500/10 backdrop-blur-sm
                       hover:bg-red-500/20 transition-all duration-300 group cursor-pointer"
          >
            <Users className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Character Profiles
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              MEET THE
            </span>
            <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              CHARACTERS
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the complex personalities that shape the criminal landscape of Vice City. 
            Each character brings their own skills, motivations, and deadly secrets.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Character Selection Grid */}
          <div ref={charactersGridRef} className="lg:col-span-1 space-y-6">
            {characters.map((character, index) => (
              <div
                key={character.id}
                className={`character-card opacity-0 cursor-pointer rounded-2xl border-2 
                  overflow-hidden transition-all duration-500 ${
                  activeCharacterIndex === index 
                    ? `bg-gradient-to-r ${character.accentColor} bg-opacity-20 border-white/40 shadow-xl scale-105` 
                    : 'bg-black/40 border-gray-700/50 hover:border-gray-600/70 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center p-6">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={character.portrait}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${character.accentColor} opacity-20`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-xl transition-colors duration-300 ${
                        activeCharacterIndex === index ? 'text-white' : 'text-gray-300'
                      }`}>
                        {character.name}
                      </h3>
                      {activeCharacterIndex === index && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <p className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                      activeCharacterIndex === index ? 'text-red-300' : 'text-red-500'
                    }`}>
                      {character.role}
                    </p>
                    
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      activeCharacterIndex === index ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {character.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Active indicator */}
                {activeCharacterIndex === index && (
                  <div className={`h-1 bg-gradient-to-r ${character.accentColor}`} />
                )}
              </div>
            ))}

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevCharacter}
                disabled={isTransitioning}
                className="rounded-full border-gray-600 hover:border-red-500 hover:bg-red-500/20 
                         text-gray-400 hover:text-red-400 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         h-12 w-12 shadow-lg hover:shadow-red-500/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextCharacter}
                disabled={isTransitioning}
                className="rounded-full border-gray-600 hover:border-red-500 hover:bg-red-500/20 
                         text-gray-400 hover:text-red-400 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         h-12 w-12 shadow-lg hover:shadow-red-500/20"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Active Character Display */}
          <div ref={activeCharacterRef} className="lg:col-span-2 opacity-0">
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden">
              
              {/* Character Image Header */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={activeCharacter.image}
                  alt={activeCharacter.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeCharacter.accentColor} opacity-30`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 group">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full h-16 w-16 
                             shadow-2xl backdrop-blur-md border-2 border-white/30
                             transform group-hover:scale-110 transition-all duration-300
                             hover:bg-white/40 hover:border-white/50 hover:shadow-white/20"
                  >
                    <Play className="h-6 w-6 fill-current ml-1 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Character info overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2">{activeCharacter.name}</h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${activeCharacter.accentColor} 
                                   bg-clip-text text-transparent`}>
                        {activeCharacter.role}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm
                               hover:border-white/50 hover:text-white transition-all duration-300
                               bg-black/20 hover:bg-black/40 shadow-lg hover:shadow-white/10"
                    >
                      <Info className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Profile
                    </Button>
                  </div>
                </div>
              </div>

              {/* Character Details */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Bio Section */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Background</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {activeCharacter.description}
                    </p>
                    
                    <div className="bg-black/40 p-4 rounded-xl border border-gray-700/50 mb-6">
                      <p className="text-gray-400 italic text-sm mb-2">Signature Quote:</p>
                      <p className="text-white font-medium">"{activeCharacter.quote}"</p>
                    </div>

                    {/* Special Skills */}
                    <div>
                      <h5 className="text-lg font-bold text-white mb-3">Special Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {activeCharacter.specialSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:${activeCharacter.accentColor} 
                                      hover:text-white hover:border-transparent transition-all duration-300`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div ref={statsRef} className="opacity-0">
                    <h4 className="text-xl font-bold text-white mb-6">Abilities</h4>
                    <div className="space-y-4">
                      {Object.entries(activeCharacter.stats).map(([stat, value]) => (
                        <div key={stat}>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300 font-medium">{stat}</span>
                            <span className="text-white font-bold">{value}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${activeCharacter.accentColor} transition-all duration-1000 ease-out`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Character Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                      {characters.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeCharacter(index)}
                          disabled={isTransitioning}
                          className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     hover:scale-125 active:scale-95 ${
                            activeCharacterIndex === index 
                              ? `bg-gradient-to-r ${characters[index].accentColor} scale-125 shadow-lg shadow-red-500/30` 
                              : 'bg-gray-600 hover:bg-gray-500 hover:shadow-md hover:shadow-gray-400/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSAPCharactersSection;
