"use client";
import AllCars from "@/components/cars/AllCars";
import CarsByInformation from "@/components/cars/CarsByInformation";
import { years } from "@/components/constants";
import { getAllBrands, getCars } from "@/redux/Slices/CarSlices";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cars = () => {
  const cars = useSelector((state: RootState) => state.cars);
  const [info, setInfo] = useState({
    brand: "",
    model: "",
    year: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  if (cars?.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-accent-2 pt-20 text-primary">
      <h2 className="text-5xl text-center font-bold">Our Cars</h2>
      <div className="container mx-auto px-8 pb-10">
        <form
          action=""
          className="text-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <select
              value={info.brand}
              onChange={(e) => setInfo({ ...info, brand: e.target.value })}
              className="p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Brand</option>
              {cars.brands.map((brand: string, index: number) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              className="p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              value={info.model}
              onChange={(e) => setInfo({ ...info, model: e.target.value })}
              disabled={!info.brand}
            >
              <option value="">Select Model</option>
              {cars.cars
                .filter((car: any) => car.brand === info.brand)
                .map((car: any, index: number) => (
                  <option key={index} value={car.model}>
                    {car.model ? car.model : car.name}
                  </option>
                ))}
            </select>
            <select
              className="p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={info.year}
              onChange={(e) => setInfo({ ...info, year: e.target.value })}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {info.brand || info.model || info.year ? (
        <CarsByInformation
          brand={info.brand}
          model={info.model}
          year={info.year}
        />
      ) : (
        <AllCars />
      )}
    </div>
  );
};

export default Cars;
