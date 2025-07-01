"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Download,
  Share2,
  Eye,
  Calendar,
  Film,
  ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const GSAPMediaSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const galleryRef = useRef(null);
  const backgroundRef = useRef(null);
  const lightboxRef = useRef(null);

  const [activeTab, setActiveTab] = useState("screenshots");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mediaContent = {
    screenshots: [
      {
        id: 1,
        src: "https://picsum.photos/1200/800?random=1",
        title: "Vice City Skyline",
        description: "The neon-lit streets of reimagined Vice City",
        category: "Environment",
        date: "2024-12-15",
      },
      {
        id: 2,
        src: "https://picsum.photos/1200/800?random=2",
        title: "Character Action",
        description: "Lucia in the heat of combat",
        category: "Characters",
        date: "2024-12-10",
      },
      {
        id: 3,
        src: "https://picsum.photos/1200/800?random=3",
        title: "Vehicle Chase",
        description: "High-speed pursuit through downtown",
        category: "Gameplay",
        date: "2024-12-08",
      },
      {
        id: 4,
        src: "https://picsum.photos/1200/800?random=4",
        title: "Nightclub Scene",
        description: "Underground criminal meeting",
        category: "Story",
        date: "2024-12-05",
      },
      {
        id: 5,
        src: "https://picsum.photos/1200/800?random=5",
        title: "Luxury Lifestyle",
        description: "The rewards of criminal success",
        category: "Lifestyle",
        date: "2024-12-01",
      },
      {
        id: 6,
        src: "https://picsum.photos/1200/800?random=6",
        title: "Beach Patrol",
        description: "Coastal operations and activities",
        category: "Environment",
        date: "2024-11-28",
      },
      {
        id: 7,
        src: "https://picsum.photos/1200/800?random=7",
        title: "Criminal Empire",
        description: "Building your business empire",
        category: "Gameplay",
        date: "2024-11-25",
      },
      {
        id: 8,
        src: "https://picsum.photos/1200/800?random=8",
        title: "Dual Protagonists",
        description: "Lucia and Jason team up",
        category: "Characters",
        date: "2024-11-20",
      },
    ],
    videos: [
      {
        id: 1,
        thumbnail: "https://picsum.photos/800/450?random=21",
        title: "Official Trailer #1",
        description: "First look at Grand Theft Auto VI",
        duration: "2:15",
        views: "50M",
        category: "Trailer",
        date: "2024-12-01",
      },
      {
        id: 2,
        thumbnail: "https://picsum.photos/800/450?random=22",
        title: "Gameplay Reveal",
        description: "Extended gameplay footage",
        duration: "5:42",
        views: "25M",
        category: "Gameplay",
        date: "2024-11-15",
      },
      {
        id: 3,
        thumbnail: "https://picsum.photos/800/450?random=23",
        title: "Character Stories",
        description: "Meet Lucia and Jason",
        duration: "3:28",
        views: "18M",
        category: "Characters",
        date: "2024-11-01",
      },
      {
        id: 4,
        thumbnail: "https://picsum.photos/800/450?random=24",
        title: "Vice City Tour",
        description: "Explore the reimagined city",
        duration: "4:33",
        views: "15M",
        category: "World",
        date: "2024-10-15",
      },
    ],
  };

  const categories = [
    "All",
    "Environment",
    "Characters",
    "Gameplay",
    "Story",
    "Lifestyle",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredScreenshots =
    selectedCategory === "All"
      ? mediaContent.screenshots
      : mediaContent.screenshots.filter(
          (item) => item.category === selectedCategory
        );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating background elements
      const createFloatingElements = () => {
        const container = backgroundRef.current;
        for (let i = 0; i < 20; i++) {
          const element = document.createElement("div");
          element.className = "media-particle";

          const size = Math.random() * 6 + 3;
          const hue = Math.random() * 360;

          element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.6 + 0.2};
          `;

          gsap.set(element, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          });

          container.appendChild(element);

          // Animate particle
          gsap.to(element, {
            y: `+=${Math.random() * 200 - 100}`,
            x: `+=${Math.random() * 150 - 75}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 15 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      };

      createFloatingElements();

      // Set initial states
      gsap.set([titleRef.current, tabsRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(galleryRef.current, {
        opacity: 0,
        y: 30,
      });

      // Main scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Tabs animation
      tl.to(
        tabsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Gallery animation
      tl.to(
        galleryRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Parallax background
      gsap.to(backgroundRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate gallery items when they appear
  useEffect(() => {
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item");

      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [activeTab, selectedCategory]);

  const openLightbox = (content, index = 0) => {
    setLightboxContent(content);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxContent(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (lightboxContent && Array.isArray(lightboxContent)) {
      setCurrentImageIndex((prev) => (prev + 1) % lightboxContent.length);
    }
  };

  const prevImage = () => {
    if (lightboxContent && Array.isArray(lightboxContent)) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + lightboxContent.length) % lightboxContent.length
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="media"
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(220,38,38,0.15),transparent_70%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_70%)] z-10" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <div ref={titleRef} className="opacity-0 text-center mb-12">
          <Badge
            variant="outline"
            className="border-red-500 text-red-500 mb-6 px-6 py-2 bg-red-500/10 backdrop-blur-sm
                       hover:bg-red-500/20 transition-all duration-300 group cursor-pointer"
          >
            <Film className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Media Gallery
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              VISUAL
            </span>
            <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              SHOWCASE
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore the stunning visuals and immersive world of Grand Theft Auto
            VI through our comprehensive media gallery featuring screenshots,
            trailers, and exclusive content.
          </p>
        </div>

        {/* Media Tabs */}
        <div ref={tabsRef} className="opacity-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto mb-12 grid-cols-2 bg-black/40 backdrop-blur-sm border border-gray-700/50">
              <TabsTrigger
                value="screenshots"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300
                          hover:bg-red-600/20 flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Screenshots
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300
                          hover:bg-red-600/20 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 font-medium ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105"
                        : "border-gray-600 text-gray-800 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 backdrop-blur-sm transform hover:scale-105"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Screenshots Grid */}
              <div ref={galleryRef} className="opacity-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredScreenshots.map((screenshot, index) => (
                    <div
                      key={`${screenshot.id}-${selectedCategory}`}
                      className="gallery-item opacity-0 group cursor-pointer"
                      onClick={() => openLightbox(filteredScreenshots, index)}
                    >
                      <div
                        className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800/50 
                                    group-hover:border-red-500/50 transition-all duration-300
                                    transform group-hover:scale-105 group-hover:-translate-y-2
                                    shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/20"
                      >
                        <Image
                          src={screenshot.src}
                          alt={screenshot.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-all duration-300"
                        />

                        {/* Info Overlay */}
                        <div
                          className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                                      group-hover:translate-y-0 transition-all duration-300"
                        >
                          <h3 className="font-bold text-white text-sm mb-1">
                            {screenshot.title}
                          </h3>
                          <p className="text-gray-300 text-xs mb-2">
                            {screenshot.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="border-red-500 text-red-400 text-xs"
                            >
                              {screenshot.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                              <Calendar className="w-3 h-3" />
                              {new Date(screenshot.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Zoom Icon */}
                        <div
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                                      transition-all duration-300 transform scale-0 group-hover:scale-100"
                        >
                          <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full">
                            <Maximize2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div ref={galleryRef} className="opacity-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {mediaContent.videos.map((video, index) => (
                    <div
                      key={video.id}
                      className="gallery-item opacity-0 group cursor-pointer"
                      onClick={() => openLightbox(video)}
                    >
                      <div
                        className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800/50 
                                    group-hover:border-red-500/50 transition-all duration-300
                                    transform group-hover:scale-105 group-hover:-translate-y-2
                                    shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/20"
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Video Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="bg-red-600/80 hover:bg-red-600 rounded-full p-4 
                                        transform group-hover:scale-110 transition-all duration-300
                                        shadow-2xl shadow-red-500/40"
                          >
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                          <h3 className="font-bold text-white text-lg mb-2">
                            {video.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-3">
                            {video.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-gray-400">
                              <div className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                {video.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {video.views} views
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="border-red-500 text-red-400"
                            >
                              {video.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-7xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full
                       h-12 w-12 shadow-lg hover:shadow-white/10 transition-all duration-300
                       hover:scale-110 backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              <X className="w-6 h-6 hover:rotate-90 transition-transform duration-300" />
            </Button>

            {/* Navigation Buttons for Screenshots */}
            {Array.isArray(lightboxContent) && lightboxContent.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full
                           h-12 w-12 shadow-lg hover:shadow-white/10 transition-all duration-300
                           hover:scale-110 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  <ChevronLeft className="w-6 h-6 hover:scale-110 transition-transform duration-300" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full
                           h-12 w-12 shadow-lg hover:shadow-white/10 transition-all duration-300
                           hover:scale-110 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  <ChevronRight className="w-6 h-6 hover:scale-110 transition-transform duration-300" />
                </Button>
              </>
            )}

            {/* Content */}
            {Array.isArray(lightboxContent) ? (
              // Screenshot Lightbox
              <div className="relative aspect-video w-full">
                <Image
                  src={lightboxContent[currentImageIndex].src}
                  alt={lightboxContent[currentImageIndex].title}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lightboxContent[currentImageIndex].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {lightboxContent[currentImageIndex].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-red-500 text-red-400"
                    >
                      {lightboxContent[currentImageIndex].category}
                    </Badge>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 
                                 hover:bg-red-500/10 backdrop-blur-sm transition-all duration-300
                                 transform hover:scale-105"
                      >
                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 
                                 hover:bg-red-500/10 backdrop-blur-sm transition-all duration-300
                                 transform hover:scale-105"
                      >
                        <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Video Lightbox
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold mb-2">
                      {lightboxContent?.title}
                    </h3>
                    <p className="text-gray-400">
                      Video player would be integrated here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GSAPMediaSection;
