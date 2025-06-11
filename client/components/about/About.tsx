import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="lg:py-16 py-8 bg-accent-2">
      <h2 className="h2">About Us</h2>
      <div className="container mx-auto sm:px-16 px-8 grid md:grid-cols-2 gap-8">
        <Image
          src={"/assets/about.png"}
          alt="About Us"
          width={500}
          height={300}
          className="rounded-lg"
        />
        <div>
          <p className="text-lg text-secondary mb-4">
            Welcome to Cars, your premier destination for all things automotive.
            We are dedicated to providing you with the best selection of
            vehicles, exceptional customer service, and a seamless car-buying
            experience.
          </p>
          <p className="text-lg text-secondary mb-4">
            Our team of experts is passionate about cars and is here to help you
            find the perfect vehicle that suits your needs and budget. Whether
            you're looking for a new or used car, we have a wide range of
            options to choose from.
          </p>
          <p className="text-lg text-secondary">
            At Cars, we believe in transparency and integrity. We strive to make
            your car-buying journey as smooth as possible, ensuring that you
            leave our dealership with a smile on your face.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
