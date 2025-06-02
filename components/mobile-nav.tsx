"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ShoppingCart, Calendar, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const navItems = [
    { href: "#story", label: "Story", icon: "📖" },
    { href: "#gameplay", label: "Gameplay", icon: "🎮" },
    { href: "#characters", label: "Characters", icon: "👥" },
    { href: "#media", label: "Media", icon: "📸" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="md:hidden">
        {/* Animated Hamburger Button */}
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative z-50 h-10 w-10">
          <div className="flex flex-col items-center justify-center w-6 h-6">
            <span
              className={cn(
                "block h-0.5 w-6 bg-white transition-all duration-300 ease-out",
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-white transition-all duration-300 ease-out",
                isOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-white transition-all duration-300 ease-out",
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1",
              )}
            />
          </div>
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Side Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-out md:hidden",
          "bg-black/95 backdrop-blur-xl border-l border-red-900/30",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-900/30">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VI</span>
            </div>
            <span className="font-bold text-lg">GTA 6</span>
          </div>
          <Badge variant="outline" className="border-red-500 text-red-500 text-xs">
            Coming Soon
          </Badge>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center space-x-4 p-4 rounded-lg transition-all duration-200",
                "hover:bg-red-950/20 hover:border-red-500/30 border border-transparent",
                "group",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-lg group-hover:text-red-400 transition-colors">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Game Info */}
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

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 border-t border-red-900/30 bg-black/50">
          <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 h-12" onClick={handleLinkClick}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Pre-order Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-600 text-red-500 hover:bg-red-600 hover:text-white h-12"
            onClick={handleLinkClick}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Trailer
          </Button>
        </div>
      </div>
    </>
  )
}
