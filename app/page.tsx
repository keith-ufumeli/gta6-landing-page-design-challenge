import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import BottomNav from "@/components/bottom-nav";
import GSAPHeroSectionPro from "@/components/gsapEnhancedHero";
import GSAPStorySection from "@/components/gsapStorySection";
import GSAPGameplaySection from "@/components/gsapGameplaySection";
import GSAPCharactersSection from "@/components/gsapCharactersSection";
import GSAPMediaSection from "@/components/gsapMediaSection";
import GSAPPreOrderSection from "@/components/gsapPreOrderSection";
import GSAPNewsletterSection from "@/components/gsapNewsletterSection";
import GSAPNavbar from "@/components/gsapNavbar";

export default function GTA6Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <GSAPNavbar />

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
