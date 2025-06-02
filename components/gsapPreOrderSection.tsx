"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Star, 
  Check, 
  Gift, 
  Crown, 
  Zap, 
  Clock, 
  Trophy,
  Gamepad2,
  Download,
  Users,
  Shield
} from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GSAPPreOrderSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timerRef = useRef(null);
  const cardsRef = useRef(null);
  const platformsRef = useRef(null);
  const backgroundRef = useRef(null);
  const bonusesRef = useRef(null);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  const preOrderEditions = [
    {
      id: 'standard',
      name: 'Standard Edition',
      price: 69.99,
      originalPrice: null,
      badge: null,
      description: 'The complete GTA VI experience with pre-order bonuses',
      features: [
        'Full Game Access',
        'Pre-Order Bonus Pack',
        'Exclusive Wallpapers',
        'Digital Soundtrack'
      ],
      buttonText: 'Pre-Order Now',
      gradient: 'from-gray-600 to-gray-800',
      accentColor: 'gray',
      popular: false
    },
    {
      id: 'deluxe',
      name: 'Deluxe Edition',
      price: 89.99,
      originalPrice: 99.99,
      badge: 'Most Popular',
      description: 'Enhanced experience with exclusive content and season pass',
      features: [
        'Full Game Access',
        'Season Pass Included',
        'Exclusive Character Outfits',
        'Premium Vehicle Pack',
        'VIP Online Status',
        'Early Access (3 Days)',
        'Digital Art Book',
        'Behind-the-Scenes Content'
      ],
      buttonText: 'Get Deluxe',
      gradient: 'from-red-600 to-orange-600',
      accentColor: 'red',
      popular: true
    },
    {
      id: 'collector',
      name: 'Collector\'s Edition',
      price: 149.99,
      originalPrice: 179.99,
      badge: 'Limited',
      description: 'Ultimate package with physical collectibles and premium content',
      features: [
        'Everything in Deluxe',
        'Physical Collectibles Box',
        'Lucia & Jason Figurines',
        'Vice City Map Poster',
        'Steelbook Case',
        'Numbered Certificate',
        'Exclusive In-Game Currency',
        'Priority Customer Support'
      ],
      buttonText: 'Secure Limited Edition',
      gradient: 'from-purple-600 to-pink-600',
      accentColor: 'purple',
      popular: false
    }
  ];

  const platforms = [
    { name: 'PlayStation 5', logo: 'https://picsum.photos/120/60?random=ps5', available: true },
    { name: 'Xbox Series X|S', logo: 'https://picsum.photos/120/60?random=xbox', available: true },
    { name: 'PC (Epic/Steam)', logo: 'https://picsum.photos/120/60?random=pc', available: true },
    { name: 'PlayStation 4', logo: 'https://picsum.photos/120/60?random=ps4', available: false },
    { name: 'Xbox One', logo: 'https://picsum.photos/120/60?random=xone', available: false }
  ];

  const exclusiveBonuses = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'Vice City Starter Pack',
      description: '$500,000 in-game currency to kickstart your criminal empire',
      value: '$10 Value'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Exclusive Vehicles',
      description: 'Access to 5 unique vehicles not available elsewhere',
      value: '$15 Value'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Character Customization',
      description: 'Premium outfits and accessories for Lucia and Jason',
      value: '$8 Value'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safe House Pack',
      description: 'Exclusive properties with unique interiors and features',
      value: '$12 Value'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 15; i++) {
          const element = document.createElement('div');
          element.className = 'preorder-particle';
          
          const size = Math.random() * 8 + 4;
          const hue = Math.random() < 0.5 ? 0 : 45; // Red or gold
          
          element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 80%, 60%) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.7 + 0.3};
          `;
          
          gsap.set(element, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.8 + 0.5
          });
          
          container.appendChild(element);
          
          // Animate particle
          gsap.to(element, {
            y: `+=${Math.random() * 150 - 75}`,
            x: `+=${Math.random() * 100 - 50}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 12 + 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      };

      createFloatingElements();

      // Set initial states
      gsap.set([titleRef.current, timerRef.current], {
        opacity: 0,
        y: 60
      });

      gsap.set(cardsRef.current.children, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });

      gsap.set([platformsRef.current, bonusesRef.current], {
        opacity: 0,
        y: 40
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

      // Timer animation
      tl.to(timerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Cards stagger animation
      tl.to(cardsRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Platforms animation
      tl.to(platformsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");

      // Bonuses animation
      tl.to(bonusesRef.current, {
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
        y: -80,
        ease: "none"
      });

      // Card hover animations
      const cards = cardsRef.current.querySelectorAll('.edition-card');
      cards.forEach((card, index) => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        }
        
        const newDays = prev.days - 1;
        if (newDays >= 0) {
          return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 };
        }
        
        return prev; // Timer finished
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 bg-gradient-to-b from-black via-red-950/20 to-black overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.2),transparent_70%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,193,7,0.1),transparent_70%)] z-10" />

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Header */}
        <div ref={titleRef} className="opacity-0 text-center mb-12">
          <Badge 
            variant="outline" 
            className="border-red-500 text-red-500 mb-6 px-6 py-2 bg-red-500/10 backdrop-blur-sm
                       hover:bg-red-500/20 transition-all duration-300 group cursor-pointer"
          >
            <Gift className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              PRE-ORDER NOW
            </span>
            <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              GET EXCLUSIVE CONTENT
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience the next chapter in the Grand Theft Auto series. 
            Pre-order now and receive exclusive in-game content and early access benefits.
          </p>
        </div>

        {/* Countdown Timer */}
        <div ref={timerRef} className="opacity-0 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl 
                        border border-red-500/30 shadow-lg shadow-red-500/20">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-semibold mr-4">Early Bird Pricing Ends In:</span>
            <div className="flex items-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-red-600 text-white font-bold text-xl px-3 py-2 rounded-lg min-w-12">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-Order Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {preOrderEditions.map((edition, index) => (
            <Card
              key={edition.id}
              className={`edition-card opacity-0 relative overflow-hidden border-2 transition-all duration-300 ${
                edition.popular 
                  ? 'border-red-500/50 bg-gradient-to-b from-red-950/30 to-black/80 scale-105 shadow-xl shadow-red-500/20' 
                  : 'border-gray-700/50 bg-black/60 hover:border-gray-600/70'
              } backdrop-blur-sm`}
            >
              {/* Popular Badge */}
              {edition.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-red-600 text-white px-4 py-1 font-bold text-sm">
                    {edition.badge}
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{edition.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{edition.description}</p>
                  
                  {/* Pricing */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    {edition.originalPrice && (
                      <span className="text-gray-500 line-through text-lg">
                        ${edition.originalPrice}
                      </span>
                    )}
                    <span className={`text-3xl font-black ${
                      edition.popular ? 'text-red-400' : 'text-white'
                    }`}>
                      ${edition.price}
                    </span>
                    {edition.originalPrice && (
                      <Badge variant="destructive" className="text-xs">
                        SAVE ${(edition.originalPrice - edition.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {edition.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${
                        edition.popular ? 'bg-red-600' : 'bg-gray-600'
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                    edition.popular
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } transform hover:scale-105`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {edition.buttonText}
                </Button>

                {/* Value Badge */}
                {edition.popular && (
                  <div className="text-center mt-4">
                    <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                      <Trophy className="w-3 h-3 mr-1" />
                      Best Value
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exclusive Bonuses */}
        <div ref={bonusesRef} className="opacity-0 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Exclusive Pre-Order Bonuses</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get these exclusive items only available to pre-order customers. Total value over $45!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveBonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 
                         hover:border-red-500/50 transition-all duration-300 group text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 
                              rounded-full mb-4 group-hover:bg-red-600/30 transition-colors duration-300">
                  <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    {bonus.icon}
                  </div>
                </div>
                <h4 className="font-bold text-white mb-2">{bonus.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{bonus.description}</p>
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  {bonus.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Availability */}
        <div ref={platformsRef} className="opacity-0 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Available On</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  platform.available
                    ? 'border-gray-600/50 hover:border-red-500/50 hover:bg-red-500/10'
                    : 'border-gray-800/50 opacity-50'
                }`}
              >
                <div className="relative w-24 h-12 mb-2">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    fill
                    className={`object-contain ${!platform.available && 'grayscale'}`}
                  />
                </div>
                <span className={`text-sm font-medium ${
                  platform.available ? 'text-white' : 'text-gray-500'
                }`}>
                  {platform.name}
                </span>
                {!platform.available && (
                  <Badge variant="outline" className="border-gray-600 text-gray-500 text-xs mt-1">
                    Coming Later
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 
                       hover:from-red-700 hover:via-red-800 hover:to-orange-700
                       text-white font-bold py-4 px-12 rounded-2xl shadow-2xl shadow-red-500/40
                       transform hover:scale-105 transition-all duration-300 text-xl"
            >
              <Zap className="w-6 h-6 mr-3" />
              Secure Your Copy Now
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              30-day money-back guarantee • Secure payment • Instant confirmation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GSAPPreOrderSection;