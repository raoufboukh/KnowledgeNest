"use client";
import { getCarById } from "@/redux/Slices/CarSlices";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactSingle from "@/components/car/Contact/ContactSingle";
import CarInformation from "@/components/car/Information/CarInformation";
import Header from "@/components/car/Header/Header";

const CarById = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { car, loading, error } = useSelector((state: RootState) => state.cars);

  React.useEffect(() => {
    if (id) {
      dispatch(getCarById(id as string));
    }
  }, [dispatch, id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = () => {
    if (!car) return;

    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model} - ${car.name}`,
        text: `Découvrez cette ${car.brand} ${car.model} à ${formatPrice(
          car.price
        )}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent-2">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            Chargement des détails de la voiture...
          </p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent-2">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Voiture introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            Désolé, nous n'avons pas pu trouver la voiture que vous recherchez.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent-2">
      {/* Header */}
      <Header handleShare={handleShare} router={router} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <CarInformation car={car} formatPrice={formatPrice} />

          {/* Right Column - Contact */}
          <ContactSingle car={car} />
        </div>
      </div>
    </div>
  );
};

export default CarById;
