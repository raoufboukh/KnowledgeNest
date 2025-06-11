import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { LuFuel } from "react-icons/lu";
import { PiEngine } from "react-icons/pi";
import React from "react";
import Link from "next/link";
import { MdSpeed } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { BiPhone } from "react-icons/bi";

const Cars = () => {
  const cars = [
    {
      name: "306",
      image: "/assets/306.jpg",
      price: 150000,
      brand: "Peugeot",
      mileage: "400000",
      model: "306",
      color: "Red",
      fuel: "Petrol",
      engine: "1.4",
      gearBox: "Manual",
      document: "Available",
      year: 2000,
      contact: [
        {
          name: "Raouf Bouk",
          email: "zakib2316@gmail.com",
          phone: "+213 123 456 789",
          address: "123 Main St, Algiers",
          city: "Algiers",
          country: "Algeria",
        },
      ],
    },
    {
      name: "Ibiza",
      image: "/assets/ibiza.jpg",
      price: 400000,
      brand: "Seat",
      mileage: "200000",
      model: "Ibiza",
      color: "brown",
      fuel: "Petrol",
      engine: "1.4",
      gearBox: "Manual",
      document: "Available",
      year: 2016,
      contact: [
        {
          name: "Raouf Bouk",
          email: "zakib2316@gmail.com",
          phone: "+213 123 456 789",
          address: "123 Main St, Algiers",
          city: "Algiers",
          country: "Algeria",
        },
      ],
    },
    {
      name: "Polo",
      image: "/assets/polo.jpg",
      price: 400000,
      brand: "Volkswagen",
      mileage: "200000",
      model: "Polo",
      color: "gray",
      fuel: "Petrol",
      engine: "1.4",
      gearBox: "Manual",
      document: "Available",
      year: 2016,
      contact: [
        {
          name: "Raouf Bouk",
          email: "zakib2316@gmail.com",
          phone: "+213 123 456 789",
          address: "123 Main St, Algiers",
          city: "Algiers",
          country: "Algeria",
        },
      ],
    },
  ];
  return (
    <div className="text-black bg-accent py-8 lg:py-16 overflow-hidden">
      <h2 className="h2">Our Featured Cars</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 md:px-16 container mx-auto">
        {cars.map((car, index) => (
          <div
            key={index}
            className="bg-accent-2 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 shadow-secondary transition-all duration-300 overflow-hidden"
          >
            <div className="px-4 py-2">
              <h3 className="text-xl text-primary font-bold">
                {car.brand}, {car.name}
              </h3>
              <p className="text-lg font-bold">
                {car.year}-{car.engine}{" "}
                {car.model.length > 15 ? (
                  <span className="">{car.model.slice(0, 15)}...</span>
                ) : (
                  <span className="">{car.model}</span>
                )}
              </p>
            </div>
            <Image
              src={car.image}
              alt={car.name}
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="px-4 py-2">
              <p className="text-lg font-bold py-1">{car.price} dz</p>
              <div className="flex justify-between items-center border-y border-secondary py-2 gap-2">
                <div className="flex flex-col items-center">
                  <PiEngine className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">{car.engine}L</span>
                </div>
                <div className="flex flex-col items-center">
                  <MdSpeed className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">
                    {car.mileage.length > 3
                      ? car.mileage.substring(car.mileage.length - 3, 0)
                      : car.mileage}
                    K Km
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <LuFuel className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">{car.fuel}</span>
                </div>
                <div className="flex flex-col items-center">
                  <TbManualGearbox className="text-primary text-lg" />
                  <span className="text-xs text-gray-500">{car.gearBox}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 text-sm">
              <div className=" bg-accent rounded-md px-2 py-1 mb-2 flex flex-col gap-1">
                <p className="font-semibold">{car.contact[0].address}</p>
                <a
                  href={`tel:${car.contact[0].phone}`}
                  className="flex items-center gap-1"
                >
                  {" "}
                  <BiPhone /> {car.contact[0].phone}
                </a>
              </div>
            </div>
            <Link
              href={`/buy/${car.name}`}
              className="block bg-primary text-accent-2 text-center py-2 rounded-b-xl hover:bg-primary/80 transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <Link
        href={"/buy"}
        className="block mt-12 bg-accent-2 hover:bg-primary hover:text-accent-2 text-primary rounded-md border border-primary px-3 py-2 transition-all duration-300 w-fit mx-auto"
      >
        See More Cars
      </Link>
    </div>
  );
};

export default Cars;
