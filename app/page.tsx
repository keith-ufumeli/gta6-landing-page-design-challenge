import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import GameplaySection from "@/components/gameplay-section"
import CharacterCard from "@/components/character-card"
import VideoPlayer from "@/components/video-player"
import MobileNav from "@/components/mobile-nav"

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
            <Link href="#story" className="text-sm font-medium hover:text-red-500 transition-colors">
              Story
            </Link>
            <Link href="#gameplay" className="text-sm font-medium hover:text-red-500 transition-colors">
              Gameplay
            </Link>
            <Link href="#characters" className="text-sm font-medium hover:text-red-500 transition-colors">
              Characters
            </Link>
            <Link href="#media" className="text-sm font-medium hover:text-red-500 transition-colors">
              Media
            </Link>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Pre-order Now
            </Button>
          </div>

          <MobileNav />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="GTA 6 Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 mt-16">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-red-500 text-red-500 mb-4">
              Coming Soon
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
              <span className="text-red-600">GRAND THEFT AUTO VI</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl">
              Experience the next chapter in the groundbreaking Grand Theft Auto series. Welcome to Vice City, where
              power, crime, and opportunity collide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="destructive" className="bg-red-600 hover:bg-red-700">
                <ShoppingCart className="mr-2 h-5 w-5" /> Pre-order Now
              </Button>
              <Button size="lg" variant="outline" className="border-red-600 text-white hover:bg-red-900/20">
                <Play className="mr-2 h-5 w-5" /> Watch Trailer
              </Button>
            </div>

            <div className="flex items-center mt-12 space-x-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm">Release: Fall 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm">Vice City</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm">Rockstar Games</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <Link href="#story">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="h-6 w-6 rotate-90" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">A NEW CRIMINAL SAGA BEGINS</h2>
              <p className="text-lg mb-6 text-gray-300">
                Return to Vice City, a sprawling metropolis where crime, corruption, and opportunity intertwine. Follow
                the journey of Lucia and Jason, two characters whose destinies collide in a story of ambition, betrayal,
                and survival.
              </p>
              <p className="text-lg mb-8 text-gray-300">
                Set in the sun-soaked streets of a reimagined Vice City, GTA VI delivers the most immersive and
                expansive open world in the series' history. Navigate the treacherous criminal underworld as you rise
                from small-time hustler to kingpin of your own empire.
              </p>
              <Button variant="outline" className="border-red-600 text-white hover:bg-red-900/20">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=1200" alt="GTA 6 Story" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600/80 hover:bg-red-600 rounded-full h-16 w-16"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">GAMEPLAY FEATURES</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience the next generation of open-world gameplay with unprecedented freedom and immersion
          </p>

          <GameplaySection />
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-24 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">MEET THE CHARACTERS</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Discover the complex personalities that shape the criminal landscape of Vice City
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CharacterCard
              name="Lucia"
              role="The Mastermind"
              image="/placeholder.svg?height=500&width=400"
              description="A cunning and ambitious former cartel member with a talent for strategy and manipulation."
            />
            <CharacterCard
              name="Jason"
              role="The Enforcer"
              image="/placeholder.svg?height=500&width=400"
              description="An ex-military specialist with unmatched combat skills and a complicated moral code."
            />
            <CharacterCard
              name="Ricardo Diaz"
              role="The Kingpin"
              image="/placeholder.svg?height=500&width=400"
              description="Vice City's most powerful crime lord who controls the city's underworld with an iron fist."
            />
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">MEDIA GALLERY</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore the stunning visuals and immersive world of Grand Theft Auto VI
          </p>

          <Tabs defaultValue="screenshots" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="screenshots">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="aspect-video relative rounded-lg overflow-hidden group cursor-pointer">
                    <Image
                      src={`/placeholder.svg?height=270&width=480`}
                      alt={`GTA 6 Screenshot ${item}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 gap-6">
                <VideoPlayer thumbnail="/placeholder.svg?height=270&width=480" title="Official Trailer" />
                <VideoPlayer thumbnail="/placeholder.svg?height=270&width=480" title="Gameplay Reveal" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-24 bg-gradient-to-b from-black to-red-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="border-red-500 text-red-500 mb-4">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">PRE-ORDER NOW AND GET EXCLUSIVE CONTENT</h2>
            <p className="text-xl mb-8 text-gray-300">
              Be among the first to experience the next chapter in the Grand Theft Auto series and receive exclusive
              in-game content.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900/80 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold mb-2">Standard Edition</h3>
                <p className="text-gray-400 mb-4">Base game with pre-order bonuses</p>
                <p className="text-2xl font-bold text-red-500 mb-4">$69.99</p>
                <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                  Pre-order
                </Button>
              </div>
              <div className="bg-red-950/30 p-6 rounded-lg border border-red-500/50 transform scale-105 shadow-lg shadow-red-900/20">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-red-600 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Deluxe Edition</h3>
                <p className="text-gray-400 mb-4">Base game + season pass + exclusive items</p>
                <p className="text-2xl font-bold text-red-500 mb-4">$89.99</p>
                <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                  Pre-order
                </Button>
              </div>
              <div className="bg-zinc-900/80 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold mb-2">Collector's Edition</h3>
                <p className="text-gray-400 mb-4">Deluxe + physical collectibles</p>
                <p className="text-2xl font-bold text-red-500 mb-4">$149.99</p>
                <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                  Pre-order
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="PlayStation 5"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="Xbox Series X"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                alt="PC"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">STAY UPDATED</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for exclusive GTA 6 updates, behind-the-scenes content, and early access
              opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-red-900/30 bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

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
              <p className="text-sm text-gray-500 mb-4">Rockstar Games, Inc. © 2025. All rights reserved.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Games</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Grand Theft Auto VI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Grand Theft Auto V
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Red Dead Redemption 2
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    GTA Online
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    About Rockstar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Legal Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-6 text-center">
            <p className="text-xs text-gray-500">
              "Grand Theft Auto", "GTA", "Rockstar Games", and the Rockstar Games logo are trademarks and/or registered
              trademarks of Take-Two Interactive Software, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
