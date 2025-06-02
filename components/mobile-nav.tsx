"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            <Link
              href="#story"
              className="text-xl font-medium hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Story
            </Link>
            <Link
              href="#gameplay"
              className="text-xl font-medium hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Gameplay
            </Link>
            <Link
              href="#characters"
              className="text-xl font-medium hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Characters
            </Link>
            <Link
              href="#media"
              className="text-xl font-medium hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Media
            </Link>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 mt-4" onClick={() => setIsOpen(false)}>
              Pre-order Now
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}
