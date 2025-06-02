"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ShoppingCart, ChevronRight, Calendar, MapPin, Star } from 'lucide-react';
import GSAPHeroBackgroundPro from './gsapHeroBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const GSAPHeroSectionPro = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const infoCardsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({ delay: 0.5 });
      timelineRef.current = tl;

      // Set initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, buttonsRef.current, infoCardsRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 50
      });

      // Badge entrance with bounce
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      // Title typewriter effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

      // Animate title text content
      tl.to(titleRef.current.querySelector('.title-main'), {
        text: "GRAND THEFT AUTO",
        duration: 1.5,
        ease: "none"
      }, "-=0.2");

      tl.to(titleRef.current.querySelector('.title-number'), {
        text: "VI",
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // Add shimmer effect after text is complete
          gsap.to(titleRef.current.querySelectorAll('.title-main, .title-number'), {
            backgroundPosition: "200% center",
            duration: 2,
            repeat: -1,
            ease: "none"
          });
        }
      });

      // Subtitle with stagger
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");

      // Buttons with stagger and bounce
      tl.to(buttonsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.4)"
      }, "-=0.3");

      // Info cards with stagger
      tl.to(infoCardsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

      // Scroll indicator
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Badge pulse animation
      gsap.to(badgeRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3
      });

      // Button hover animations
      const buttons = buttonsRef.current.querySelectorAll('button');
      buttons.forEach(button => {
        const onEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        button.addEventListener('mouseenter', onEnter);
        button.addEventListener('mouseleave', onLeave);
      });

      // Info cards hover animations
      const infoCards = infoCardsRef.current.querySelectorAll('.info-card');
      infoCards.forEach(card => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

      // Parallax scroll effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          gsap.to(heroRef.current, {
            y: progress * 200,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Title scale on scroll
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            scale: 1 - progress * 0.2,
            opacity: 1 - progress * 0.5,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, heroRef);

    return () => {
      ctx.revert(); // Clean up all animations and event listeners
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <GSAPHeroBackgroundPro />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 z-20 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div ref={badgeRef} className="opacity-0">
            <Badge 
              variant="outline" 
              className="border-red-500 text-red-500 mb-8 px-8 py-4 text-lg font-bold
                         bg-red-500/10 backdrop-blur-xl border-2 rounded-full 
                         shadow-lg shadow-red-500/20 relative overflow-hidden group
                         hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Coming Fall 2025
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-1000"></div>
            </Badge>
          </div>

          {/* Title */}
          <div ref={titleRef} className="opacity-0 mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              <div className="title-main block bg-gradient-to-r from-white via-red-400 to-white 
                               bg-clip-text text-transparent bg-[length:200%_100%]
                               drop-shadow-2xl mb-2">
              </div>
              <div className="title-number block bg-gradient-to-r from-red-600 via-red-300 to-red-600 
                               bg-clip-text text-transparent bg-[length:200%_100%]
                               drop-shadow-2xl filter drop-shadow-lg">
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="opacity-0 mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed
                          font-light drop-shadow-lg">
              Experience the next evolution of the most iconic open-world crime saga. 
              Welcome to a reimagined <span className="text-red-400 font-semibold">Vice City</span>, 
              where every choice shapes your criminal empire in the most immersive world ever created.
            </p>
          </div>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="opacity-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 
                         hover:from-red-700 hover:via-red-800 hover:to-red-900
                         text-white font-bold py-6 px-12 rounded-2xl shadow-2xl shadow-red-500/40
                         border-0 relative overflow-hidden group text-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -skew-x-12 transform -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-700"></div>
              <ShoppingCart className="mr-3 h-7 w-7 relative z-10" /> 
              <span className="relative z-10">Pre-order Now</span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="opacity-0 border-2 border-red-600/60 text-white hover:bg-red-600/20 
                         hover:border-red-500 font-bold py-6 px-12 rounded-2xl backdrop-blur-xl 
                         bg-white/5 text-xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent 
                            -skew-x-12 transform -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-700"></div>
              <Play className="mr-3 h-7 w-7 fill-current relative z-10 group-hover:scale-110 transition-transform duration-300" /> 
              <span className="relative z-10">Watch Trailer</span>
            </Button>
          </div>

          {/* Game Info Cards */}
          <div ref={infoCardsRef} className="flex flex-wrap items-center justify-center gap-8">
            <div className="info-card opacity-0 flex items-center gap-3 bg-black/50 backdrop-blur-xl 
                          px-6 py-4 rounded-2xl border border-gray-600/50 hover:border-red-500/50 
                          transition-all duration-300 hover:bg-black/70 group cursor-pointer">
              <Calendar className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-300 text-lg">Release: Fall 2025</span>
            </div>
            
            <div className="info-card opacity-0 flex items-center gap-3 bg-black/50 backdrop-blur-xl 
                          px-6 py-4 rounded-2xl border border-gray-600/50 hover:border-red-500/50 
                          transition-all duration-300 hover:bg-black/70 group cursor-pointer">
              <MapPin className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-300 text-lg">Vice City</span>
            </div>
            
            <div className="info-card opacity-0 flex items-center gap-3 bg-black/50 backdrop-blur-xl 
                          px-6 py-4 rounded-2xl border border-gray-600/50 hover:border-red-500/50 
                          transition-all duration-300 hover:bg-black/70 group cursor-pointer">
              <Star className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-300 text-lg">Rockstar Games</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="opacity-0 absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-red-600/20 backdrop-blur-xl border-2 border-red-500/50 
                          flex items-center justify-center group-hover:bg-red-600/40 
                          group-hover:border-red-400 transition-all duration-300
                          group-hover:scale-110 shadow-lg shadow-red-500/20">
            <ChevronRight className="h-7 w-7 rotate-90 text-red-400 group-hover:text-red-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSAPHeroSectionPro;