import React from "react";
import { carBrands } from "../constants";
import Image from "next/image";

const Brands = () => {
  return (
    <div className="text-black bg-accent-2 p-8 lg:p-16 overflow-hidden">
      <h2 className="h2">Our Cars Brands</h2>
      <div className="relative">
        <div className="flex gap-14 w-1000 animate-move">
          {carBrands.map((brand, i) => (
            <div key={i} className="flex flex-shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={100}
                className="size-22 object-cover mb-2 drop-shadow-lg"
              />
            </div>
          ))}
          {carBrands.map((brand, i) => (
            <div key={`duplicate-${i}`} className="flex flex-shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={100}
                className="size-22 object-cover mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
