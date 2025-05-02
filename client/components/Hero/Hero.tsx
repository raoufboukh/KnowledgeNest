"use client";
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
    </div>
  );
};

export default Hero;
