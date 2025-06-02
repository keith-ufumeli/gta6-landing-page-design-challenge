"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Play, 
  ShoppingCart, 
  Calendar, 
  MapPin, 
  Star,
  Users,
  Gamepad2,
  Film,
  Crown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GSAPNavbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: "#story", label: "Story", icon: "📖" },
    { href: "#gameplay", label: "Gameplay", icon: "🎮" },
    { href: "#characters", label: "Characters", icon: "👥" },
    { href: "#media", label: "Media", icon: "📸" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([logoRef.current, linksRef.current, ctaRef.current], {
        opacity: 0,
        y: -20
      });

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      .to(linksRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Scroll detection for navbar style changes
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        onUpdate: (self) => {
          setIsScrolled(self.progress > 0);
        }
      });

      // Logo hover animation
      const logoElement = logoRef.current;
      if (logoElement) {
        const onEnter = () => {
          gsap.to(logoElement, {
            scale: 1.05,
            rotation: 2,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(logoElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        logoElement.addEventListener('mouseenter', onEnter);
        logoElement.addEventListener('mouseleave', onLeave);
      }

      // Nav links hover animations
      const navLinks = linksRef.current?.querySelectorAll('a');
      navLinks?.forEach((link) => {
        const onEnter = () => {
          gsap.to(link, {
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        };
        
        const onLeave = () => {
          gsap.to(link, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        };
        
        link.addEventListener('mouseenter', onEnter);
        link.addEventListener('mouseleave', onLeave);
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, x: "100%" },
          { 
            opacity: 1, 
            x: "0%", 
            duration: 0.4, 
            ease: "power2.out" 
          }
        );
        
        // Animate menu items
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(menuItems,
          { opacity: 0, x: 30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.3, 
            stagger: 0.1, 
            delay: 0.2,
            ease: "power2.out" 
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          x: "100%",
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-red-900/30 shadow-lg' 
            : 'bg-black/80 backdrop-blur-md border-b border-red-900/20'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div ref={logoRef} className="opacity-0 flex items-center group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl 
                              flex items-center justify-center mr-3 shadow-lg shadow-red-500/20
                              group-hover:shadow-red-500/40 transition-all duration-300">
                  <span className="text-white font-black text-xl">VI</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full 
                              animate-pulse opacity-80" />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-black text-xl tracking-tight">GTA VI</div>
                <div className="text-red-400 text-xs font-semibold -mt-1">COMING SOON</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="opacity-0 text-sm font-medium text-gray-300 hover:text-red-400 
                         transition-colors duration-300 cursor-pointer relative group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 
                              group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div ref={ctaRef} className="hidden lg:flex items-center space-x-4 opacity-0">
            <Button
              variant="outline"
              size="sm"
              className="border-red-600/50 text-red-400 hover:bg-red-600/20 hover:border-red-500
                       transition-all duration-300 group"
              onClick={() => scrollToSection('#media')}
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Watch Trailer
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                       text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40
                       transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Pre-order
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-red-600/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Game Info Bar - Desktop Only */}
        <div className="hidden lg:block border-t border-red-900/20 bg-black/60">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-8 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-red-500" />
                <span>Release: Fall 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-red-500" />
                <span>Vice City</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-3 w-3 text-red-500" />
                <span>Rockstar Games</span>
              </div>
              <Badge variant="outline" className="border-red-500 text-red-400 text-xs">
                Pre-orders Available
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform 
                   bg-black/95 backdrop-blur-xl border-l border-red-900/30 lg:hidden
                   opacity-0 translate-x-full"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-900/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg 
                          flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VI</span>
            </div>
            <div>
              <div className="font-bold text-white">GTA VI</div>
              <div className="text-red-400 text-xs">Coming Fall 2025</div>
            </div>
          </div>
          <Badge variant="outline" className="border-red-500 text-red-500 text-xs">
            Pre-orders Live
          </Badge>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="mobile-nav-item opacity-0 flex items-center space-x-4 p-4 rounded-xl 
                       transition-all duration-300 hover:bg-red-950/20 hover:border-red-500/30 
                       border border-transparent group cursor-pointer"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-lg text-white group-hover:text-red-400 
                             transition-colors duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Game Info */}
        <div className="px-6 py-4 border-t border-red-900/30">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Calendar className="h-4 w-4 text-red-500" />
              <span>Release: Fall 2025</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Vice City</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Star className="h-4 w-4 text-red-500" />
              <span>Rockstar Games</span>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 border-t border-red-900/30 
                      bg-black/60 backdrop-blur-sm">
          <Button 
            variant="outline"
            className="w-full border-red-600 text-red-500 hover:bg-red-600 hover:text-white 
                     transition-all duration-300"
            onClick={() => {
              scrollToSection('#media');
              setIsOpen(false);
            }}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Trailer
          </Button>
          <Button 
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                     text-white shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Pre-order Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default GSAPNavbar;