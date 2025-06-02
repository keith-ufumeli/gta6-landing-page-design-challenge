"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Bell, 
  Star, 
  Gift, 
  Zap, 
  Users, 
  Calendar, 
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GSAPNewsletterSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const benefitsRef = useRef(null);
  const statsRef = useRef(null);
  const backgroundRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const newsletterBenefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Exclusive Updates',
      description: 'Be the first to know about new trailers, screenshots, and development updates',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Behind-the-Scenes',
      description: 'Access exclusive content including developer interviews and making-of features',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Early Access',
      description: 'Get early access to beta tests, demos, and special promotional opportunities',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Exclusive Rewards',
      description: 'Unlock special in-game items, wallpapers, and digital collectibles',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const communityStats = [
    { number: '2.5M+', label: 'Subscribers', icon: <Users className="w-5 h-5" /> },
    { number: '150+', label: 'Countries', icon: <Star className="w-5 h-5" /> },
    { number: '98%', label: 'Satisfaction', icon: <CheckCircle className="w-5 h-5" /> },
    { number: 'Weekly', label: 'Updates', icon: <Calendar className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 20; i++) {
          const element = document.createElement('div');
          element.className = 'newsletter-particle';
          
          const size = Math.random() * 6 + 3;
          const hue = Math.random() * 60 + 200; // Blue to cyan range
          
          element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.6 + 0.2};
          `;
          
          gsap.set(element, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.8 + 0.5
          });
          
          container.appendChild(element);
          
          // Animate particle
          gsap.to(element, {
            y: `+=${Math.random() * 100 - 50}`,
            x: `+=${Math.random() * 150 - 75}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 15 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      };

      createFloatingElements();

      // Set initial states
      gsap.set([titleRef.current, formRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(benefitsRef.current.children, {
        opacity: 0,
        x: -30,
        scale: 0.9
      });

      gsap.set(statsRef.current.children, {
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

      // Form animation
      tl.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Benefits stagger animation
      tl.to(benefitsRef.current.children, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Stats animation
      tl.to(statsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
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
        y: -60,
        ease: "none"
      });

      // Benefit card hover animations
      const benefitCards = benefitsRef.current.querySelectorAll('.benefit-card');
      benefitCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Success animation
      gsap.fromTo(formRef.current, 
        { scale: 1 },
        { 
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 bg-zinc-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-blue-950/30 to-zinc-900 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_70%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_70%)] z-10" />

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Header */}
        <div ref={titleRef} className="opacity-0 text-center mb-12">
          <Badge 
            variant="outline" 
            className="border-blue-500 text-blue-500 mb-6 px-6 py-2 bg-blue-500/10 backdrop-blur-sm
                       hover:bg-blue-500/20 transition-all duration-300 group cursor-pointer"
          >
            <Bell className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Stay Connected
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              STAY UPDATED
            </span>
            <span className="block bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
              GET EXCLUSIVE ACCESS
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive GTA 6 updates, behind-the-scenes content, 
            early access opportunities, and special rewards you can't get anywhere else.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Newsletter Form */}
          <div ref={formRef} className="opacity-0">
            {!isSubmitted ? (
              <div className="bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 
                            shadow-2xl shadow-blue-500/10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 
                                rounded-full mb-4">
                    <Mail className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Join 2.5M+ Subscribers</h3>
                  <p className="text-gray-400">Get exclusive updates delivered to your inbox</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 
                               rounded-xl text-lg px-6 focus:border-blue-500 focus:ring-blue-500/20
                               transition-all duration-300"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !email}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 
                             hover:from-blue-700 hover:via-blue-800 hover:to-purple-700
                             text-white font-bold rounded-xl shadow-lg shadow-blue-500/30
                             transform hover:scale-105 transition-all duration-300 text-lg
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Subscribe for Exclusive Access
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      <span>100% Secure</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>No Spam</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>Unsubscribe Anytime</span>
                  </div>
                </form>

                {/* Instant Benefit */}
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Gift className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 text-sm">Instant Reward</h4>
                      <p className="text-green-300 text-sm">Get exclusive wallpapers immediately after signing up!</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Success State
              <div className="bg-green-500/10 backdrop-blur-xl p-8 rounded-3xl border border-green-500/30 
                            shadow-2xl shadow-green-500/10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 
                              rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Welcome to the Community!</h3>
                <p className="text-green-300 text-lg mb-6">
                  Thank you for subscribing! Check your email for your exclusive wallpapers and 
                  get ready for amazing GTA 6 content.
                </p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/20"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                >
                  Subscribe Another Email
                </Button>
              </div>
            )}
          </div>

          {/* Benefits Grid */}
          <div>
            <div ref={benefitsRef} className="grid gap-6 mb-12">
              {newsletterBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card opacity-0 group p-6 bg-black/40 backdrop-blur-sm rounded-2xl 
                           border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${benefit.gradient} bg-opacity-20 
                                   group-hover:bg-opacity-30 transition-all duration-300`}>
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 
                                   transition-colors duration-300">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {communityStats.map((stat, index) => (
                <div
                  key={index}
                  className="opacity-0 bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 
                           text-center hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center mb-3 text-blue-500 
                                group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-black text-white mb-1 group-hover:text-blue-300 
                                transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
            ))}
          </div>
          <p className="text-gray-400">
            "The best source for GTA 6 news and updates. Never miss anything important!" 
            <span className="text-white font-semibold">- Gaming Community</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GSAPNewsletterSection;