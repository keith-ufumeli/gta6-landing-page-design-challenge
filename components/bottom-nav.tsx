"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Play, Users, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Play, label: "Trailer", href: "#media" },
    { icon: Users, label: "Characters", href: "#characters" },
    { icon: ShoppingCart, label: "Pre-order", href: "#", primary: true },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300",
        "bg-black/90 backdrop-blur-xl border-t border-red-900/30",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around px-4 py-2 safe-area-pb">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "flex flex-col items-center justify-center h-16 w-16 rounded-xl transition-all duration-200",
                item.primary
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "hover:bg-red-950/20 text-gray-400 hover:text-red-400"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", item.primary && "h-6 w-6")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
