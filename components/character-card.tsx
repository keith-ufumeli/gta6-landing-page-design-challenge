import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface CharacterCardProps {
  name: string
  role: string
  image: string
  description: string
}

export default function CharacterCard({ name, role, image, description }: CharacterCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-all duration-300">
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-red-500 text-sm mb-2">{role}</p>
        <p className="text-gray-400 text-sm">{description}</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 text-xs text-red-500 hover:text-red-400 hover:bg-red-950/20 transition-all duration-300"
        >
          <Info className="h-3 w-3 mr-1" /> Character Profile
        </Button>
      </div>
    </div>
  )
}
