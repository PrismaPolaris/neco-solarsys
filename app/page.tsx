'use client';

import { Navigation } from '@/components/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_SLIDES = [
  {
    title: 'Explore the Cosmos',
    subtitle: 'Discover the wonders of our solar system',
    //color: 'from-blue-600 to-blue-800',
    image:'/Earth.jpg',
  },
  {
    title: 'Mars Awaits',
    subtitle: 'The red planet holds countless mysteries',
    //color: 'from-red-600 to-red-800',
    image:'/Mars.jpg',
  },
  {
    title: 'Jupiter\'s Majesty',
    subtitle: 'The gas giant dominates our sky',
    //color: 'from-orange-600 to-orange-800',
    image:'/Jupiter.jpg',
  },
  {
    title: 'Saturn\'s Rings',
    subtitle: 'A celestial masterpiece in space',
    //color: 'from-yellow-600 to-yellow-800',
    image:'/Saturn.jpg',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Carousel */}
        <div className="relative h-screen overflow-hidden">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full flex items-center justify-center flex-col text-center px-4">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 text-balance">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 mb-8 text-balance">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <Link href="/explore">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Exploring
                    </Button>
                  </Link>
                  <Link href="/merchandise">
                    <Button size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white">
                      Shop Merchandise
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition text-white"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition text-white"
          >
            ❯
          </button>
        </div>

        {/* Featured Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-balance">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Mercury', emoji: '☀️', desc: 'Closest to the Sun' },
              { name: 'Venus', emoji: '💛', desc: 'The Morning Star' },
              { name: 'Earth', emoji: '🌍', desc: 'Our Home Planet' },
            ].map(item => (
              <Link key={item.name} href="/explore">
                <div className="bg-card border border-border rounded-lg p-8 hover:border-primary transition cursor-pointer h-full">
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Explore?</h2>
            <p className="text-xl text-foreground/80 mb-8 text-balance">
              Dive deep into our comprehensive database of celestial wonders, discover exclusive merchandise, and join our cosmic community.
            </p>
            <Link href="/explore">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
