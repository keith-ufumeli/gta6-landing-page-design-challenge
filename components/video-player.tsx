import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  thumbnail: string
  title: string
}

export default function VideoPlayer({ thumbnail, title }: VideoPlayerProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
      <div className="aspect-video relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600/80 hover:bg-red-600 rounded-full h-16 w-16 group-hover:scale-110 transition-transform"
        >
          <Play className="h-8 w-8" />
        </Button>
      </div>
      <div className="p-3">
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  )
}
