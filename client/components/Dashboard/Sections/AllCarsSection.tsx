"use client";
import Image from "next/image";
import React from "react";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdCheck,
  MdClose,
} from "react-icons/md";

const AllCarsSection = ({ user }: { user: any }) => {
  const [cars, setCars] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("all"); // all, pending, approved, rejected

  React.useEffect(() => {
    // Fetch cars based on user role
    fetchCars();
  }, [filter]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      // API call to fetch cars
      // if admin: fetch all cars, if user: fetch approved cars
      const endpoint =
        user.role === "admin" ? "/api/cars/all" : "/api/cars/approved";
      setCars([
        {
          _id: "1",
          name: "Toyota Corolla 2020",
          brand: "Toyota",
          model: "Corolla",
          year: 2020,
          price: "25000 DZ",
          status: "approved",
          image: "/assets/car1.jpg",
          submittedBy: { name: "John Doe" },
        },
        {
          _id: "2",
          name: "BMW X5 2021",
          brand: "BMW",
          model: "X5",
          year: 2021,
          price: "45000 DZ",
          status: "pending",
          image: "/assets/car2.jpg",
          submittedBy: { name: "Jane Smith" },
        },
      ]);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (carId: string) => {
    try {
      // API call to approve car
      console.log("Approving car:", carId);
      fetchCars(); // Refresh data
    } catch (error) {
      console.error("Error approving car:", error);
    }
  };

  const handleReject = async (carId: string) => {
    try {
      // API call to reject car
      console.log("Rejecting car:", carId);
      fetchCars(); // Refresh data
    } catch (error) {
      console.error("Error rejecting car:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filters for admin */}
      {user.role === "admin" && (
        <div className="mb-6 flex gap-2">
          {["all", "pending", "approved", "rejected"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === filterType
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      )}

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car: any) => (
          <div
            key={car._id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <Image
                src={car.image || "/assets/car-placeholder.jpg"}
                alt={car.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  car.status === "approved"
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

              {user.role === "admin" && (
                <p className="text-sm text-gray-500 mb-3">
                  Submitted by: {car.submittedBy?.name}
                </p>
              )}

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <MdVisibility />
                  View
                </button>

                {user.role === "admin" && car.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(car._id)}
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <MdCheck />
                    </button>
                    <button
                      onClick={() => handleReject(car._id)}
                      className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <MdClose />
                    </button>
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    <button className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors">
                      <MdEdit />
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors">
                      <MdDelete />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No cars found
          </h3>
          <p className="text-gray-500">
            {user.role === "admin"
              ? "No cars have been submitted yet."
              : "No approved cars available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllCarsSection;
