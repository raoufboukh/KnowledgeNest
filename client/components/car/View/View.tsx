"use client";
import React from "react";
import Image from "next/image";
import {
  MdClose,
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdCalendarToday,
  MdSpeed,
  MdLocalGasStation,
  MdSettings,
  MdVerified,
  MdEdit,
  MdDelete,
  MdShare,
} from "react-icons/md";
import { PiEngine } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import Specification from "../Specifications/Specification";
import Option from "../Option/Option";

interface ViewProps {
  car: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (car: any) => void;
  onDelete?: (carId: string) => void;
}

const View: React.FC<ViewProps> = ({
  car,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!isOpen || !car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {car.brand} {car.model} {car.name}
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  car.status
                )}`}
              >
                {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit && onEdit(car)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Modifier"
              >
                <MdEdit className="text-xl" />
              </button>
              <button
                onClick={() => onDelete && onDelete(car._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <MdDelete className="text-xl" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <MdShare className="text-xl" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={car.images[currentImageIndex]}
                    alt={`${car.brand} ${car.model}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
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
                        width={120}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(car.price)}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <MdCalendarToday />
                      {car.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdSpeed />
                      {car.mileage}
                    </span>
                  </div>
                </div>
                <Specification car={car} />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations de contact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">
                          {car.contact.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {car.contact.name}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {car.contact.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MdLocationOn className="text-xl text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Adresse</div>
                        <div className="text-gray-600 text-sm">
                          {car.contact.address}
                          <br />
                          {car.contact.city}, {car.contact.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MdPhone className="text-xl text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Téléphone
                        </div>
                        <div className="text-gray-600 text-sm">
                          {car.contact.phone.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Option car={car} />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <strong>Créé le:</strong>{" "}
                  {new Date(car.createdAt).toLocaleString("fr-FR")}
                </div>
                <div>
                  <strong>Modifié le:</strong>{" "}
                  {new Date(car.updatedAt).toLocaleString("fr-FR")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
