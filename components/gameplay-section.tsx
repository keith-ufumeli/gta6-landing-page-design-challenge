"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Map, Car, Users, Smartphone, Crosshair, Briefcase } from "lucide-react"

const features = [
  {
    id: "world",
    icon: <Map className="h-6 w-6" />,
    title: "Expansive Open World",
    description:
      "Explore the largest and most detailed Vice City ever created, with diverse neighborhoods, hidden locations, and dynamic environments that evolve over time.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "vehicles",
    icon: <Car className="h-6 w-6" />,
    title: "Advanced Vehicle Mechanics",
    description:
      "Experience next-gen driving physics with hundreds of customizable vehicles, from sports cars and motorcycles to boats and aircraft.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "characters",
    icon: <Users className="h-6 w-6" />,
    title: "Dual Protagonist System",
    description:
      "Switch between Lucia and Jason, each with unique abilities, storylines, and gameplay styles that intertwine throughout the narrative.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "technology",
    icon: <Smartphone className="h-6 w-6" />,
    title: "Immersive Technology",
    description:
      "Utilize cutting-edge in-game technology, from smartphones with apps that affect gameplay to advanced hacking systems and social media integration.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "combat",
    icon: <Crosshair className="h-6 w-6" />,
    title: "Enhanced Combat System",
    description:
      "Master refined shooting mechanics, stealth options, and hand-to-hand combat with a responsive and fluid control system.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "economy",
    icon: <Briefcase className="h-6 w-6" />,
    title: "Dynamic Economy",
    description:
      "Build your criminal empire through property acquisition, business management, and strategic investments in Vice City's evolving economy.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function GameplaySection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  const currentFeature = features.find((feature) => feature.id === activeFeature)

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={currentFeature?.image || "/placeholder.svg?height=600&width=800"}
          alt={currentFeature?.title || "Gameplay feature"}
          fill
          className="object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold mb-2">{currentFeature?.title}</h3>
          <p className="text-gray-300 max-w-md">{currentFeature?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <Button
            key={feature.id}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-32 p-4 text-center rounded-lg border border-zinc-800 hover:border-red-500/50 hover:bg-red-950/10 transition-all",
              activeFeature === feature.id && "border-red-500 bg-red-950/20",
            )}
            onClick={() => setActiveFeature(feature.id)}
          >
            <div className={cn("p-2 rounded-full mb-2", activeFeature === feature.id ? "bg-red-600" : "bg-zinc-800")}>
              {feature.icon}
            </div>
            <span className="font-medium">{feature.title}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
