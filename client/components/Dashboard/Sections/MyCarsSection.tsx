"use client";
import { checkAuth } from "@/redux/Slices/AuthSlice";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image";
import React from "react";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { useDispatch } from "react-redux";

const MyCarsSection = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 3000);

    const handleFocus = () => {
      dispatch(checkAuth());
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [dispatch]);
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Cars</h2>
          <p className="text-gray-600">Manage your submitted cars</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
          Add New Car
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.cars.map((car: any) => (
          <div
            key={car._id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <Image
                src={car.images[0]}
                alt={car.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  car.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : car.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {car.status}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-2">
                {car.brand} {car.model} • {car.year}
              </p>
              <p className="text-primary font-bold text-xl mb-2">{car.price}</p>
              <p className="text-sm text-gray-500 mb-3">
                Added: {new Date(car.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <MdVisibility />
                  View
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <MdEdit />
                </button>
                <button className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user.cars.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No cars yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't submitted any cars yet.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors">
            Add Your First Car
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCarsSection;
