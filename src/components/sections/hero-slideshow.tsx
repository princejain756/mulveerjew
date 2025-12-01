"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    desktopImage: "/mulverhero.webp",
    mobileImage: "/mulveerheromobile.webp",
    href: "/products",
    alt: "Mulveer Jewellers Hero Banner"
  },
  {
    desktopImage: "/heroimage2.webp",
    mobileImage: "/heroimage2.webp",
    href: "/products",
    alt: "Mulveer Jewellers alternative hero image"
  },
  {
    desktopImage: "/mulverhero.webp",
    mobileImage: "/mulveerheromobile.webp",
    href: "/products",
    alt: "Mulveer Jewellers Hero Banner"
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full md:h-screen h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href={slide.href} className="block w-full h-full relative">
            <Image
              src={slide.desktopImage}
              alt={slide.alt}
              fill
              className="hidden md:block object-cover"
              priority={index === 0}
            />
            <Image
              src={slide.mobileImage}
              alt={slide.alt}
              fill
              className="md:hidden object-cover"
              priority={index === 0}
            />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default HeroSlideshow;
