import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  ChevronRight,
  Calendar,
  MapPin,
  Star,
  ShoppingCart,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";
import GameplaySection from "@/components/gameplay-section";
import CharacterCard from "@/components/character-card";
import VideoPlayer from "@/components/video-player";
import MobileNav from "@/components/mobile-nav";
import BottomNav from "@/components/bottom-nav";
import GSAPHeroSectionPro from "@/components/gsapEnhancedHero";
import GSAPStorySection from "@/components/gsapStorySection";
import GSAPGameplaySection from "@/components/gsapGameplaySection";
import GSAPCharactersSection from "@/components/gsapCharactersSection";
import GSAPMediaSection from "@/components/gsapMediaSection";
import GSAPPreOrderSection from "@/components/gsapPreOrderSection";
import GSAPNewsletterSection from "@/components/gsapNewsletterSection";

export default function GTA6Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="GTA 6 Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#story"
              className="text-sm font-medium hover:text-red-500 transition-colors"
            >
              Story
            </Link>
            <Link
              href="#gameplay"
              className="text-sm font-medium hover:text-red-500 transition-colors"
            >
              Gameplay
            </Link>
            <Link
              href="#characters"
              className="text-sm font-medium hover:text-red-500 transition-colors"
            >
              Characters
            </Link>
            <Link
              href="#media"
              className="text-sm font-medium hover:text-red-500 transition-colors"
            >
              Media
            </Link>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Pre-order Now
            </Button>
          </div>

          <MobileNav />
        </div>
      </header>

      {/* Hero Section */}
      <GSAPHeroSectionPro />

      {/* Story Section */}
      <GSAPStorySection />


      {/* Gameplay Section */}
     <GSAPGameplaySection />

      {/* Characters Section */}
      <GSAPCharactersSection />

      {/* Media Section */}
      <GSAPMediaSection />
      {/* Pre-order Section */}
     <GSAPPreOrderSection />

      {/* Newsletter Section */}
      <GSAPNewsletterSection />
      {/* Footer */}
      <footer className="bg-black border-t border-red-900/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/placeholder.svg?height=60&width=150"
                alt="Rockstar Games"
                width={150}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-gray-500 mb-4">
                Rockstar Games, Inc. © 2025. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Games</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Grand Theft Auto VI
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Grand Theft Auto V
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Red Dead Redemption 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    GTA Online
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    About Rockstar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Legal Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-6 text-center">
            <p className="text-xs text-gray-500">
              "Grand Theft Auto", "GTA", "Rockstar Games", and the Rockstar
              Games logo are trademarks and/or registered trademarks of Take-Two
              Interactive Software, Inc.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
}
