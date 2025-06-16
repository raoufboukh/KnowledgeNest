"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute">
        {isMounted && <video src="/assets/landing.mp4" muted autoPlay loop />}
      </div>
      <div className="absolute text-accent-2">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold mb-4">Welcome to Cars</h1>
          <p className="text-lg mb-8">
            Discover the best cars and find your dream ride.
          </p>
          <Link
            href={"/cars"}
            className="bg-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/80 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
