import Image from "next/image";
import React from "react";
import {
  MdCalendarToday,
  MdLocationOn,
  MdSpeed,
  MdVerified,
} from "react-icons/md";
import Specification from "../Specifications/Specification";

const CarInformation = ({ car, formatPrice }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Car Title */}
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
                {car.mileage}
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

      {/* Image Gallery */}
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

          {/* Thumbnail Gallery */}
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

      {/* Car Specifications */}
      <Specification car={car} />

      {/* Car Options */}
      {car.carOption && car.carOption.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Options et équipements
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {car.carOption.map(
              (option: string, index: number) =>
                option !== "" && (
                  <div key={index} className="flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {car.description && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="text-gray-700 leading-relaxed">
            {showFullDescription ? (
              <p>{car.description}</p>
            ) : (
              <p>{car.description.slice(0, 300)}...</p>
            )}
            {car.description.length > 300 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary hover:underline mt-2"
              >
                {showFullDescription ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarInformation;
