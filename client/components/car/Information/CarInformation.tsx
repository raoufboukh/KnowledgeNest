import Image from "next/image";
import React from "react";
import {
  MdCalendarToday,
  MdLocationOn,
  MdSpeed,
  MdVerified,
} from "react-icons/md";
import Specification from "../Specifications/Specification";
import Option from "../Option/Option";

const CarInformation = ({ car, formatPrice }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {car.brand} {car.model} {car.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <MdCalendarToday />
                {car.year}
              </span>
              <span className="flex items-center gap-1">
                <MdSpeed />
                {car.mileage}Km
              </span>
              <span className="flex items-center gap-1">
                <MdLocationOn />
                {car.contact.city}, {car.contact.country}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-1">
              {formatPrice(car.price)}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <MdVerified className="inline mr-1" />
              Vérifié
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={car.images[currentImageIndex]}
              alt={`${car.brand} ${car.model}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {car.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${car.brand} ${car.model} - Image ${index + 1}`}
                  width={150}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Specification car={car} />

      <Option car={car} />
    </div>
  );
};

export default CarInformation;
