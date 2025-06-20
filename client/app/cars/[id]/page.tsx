"use client";

import { getCarById } from "@/redux/Slices/CarSlices";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  MdArrowBack,
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdCalendarToday,
  MdSpeed,
  MdLocalGasStation,
  MdSettings,
  MdDescription,
  MdVerified,
  MdShare,
  MdFavorite,
  MdPrint,
} from "react-icons/md";
import { PiEngine } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

const CarById = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { car, loading, error } = useSelector((state: RootState) => state.cars);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

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

  const handleWhatsAppContact = (phone: string, carName: string) => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par votre ${carName}. Pouvez-vous me donner plus d'informations ?`
    );
    window.open(
      `https://wa.me/${phone.replace(/\s+/g, "")}?text=${message}`,
      "_blank"
    );
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
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <MdArrowBack className="text-xl" />
              <span>Retour</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MdShare className="text-xl text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MdFavorite className="text-xl text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MdPrint className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Caractéristiques
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiEngine className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Moteur</div>
                      <div className="text-gray-600">{car.engine}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdLocalGasStation className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Carburant</div>
                      <div className="text-gray-600">{car.fuel}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <TbManualGearbox className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Transmission
                      </div>
                      <div className="text-gray-600">{car.gearBox}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdSettings className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Couleur</div>
                      <div className="text-gray-600">{car.color}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdVerified className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Documents</div>
                      <div className="text-gray-600">{car.document}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdCalendarToday className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Année</div>
                      <div className="text-gray-600">{car.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2"
                        >
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {showFullDescription ? (
                    <p>{car.description}</p>
                  ) : (
                    <p>{car.description.slice(0, 300)}...</p>
                  )}
                  {car.description.length > 300 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-primary hover:underline mt-2"
                    >
                      {showFullDescription ? "Voir moins" : "Voir plus"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contacter le vendeur
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {car.contact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {car.contact.name}
                    </div>
                    <div className="text-sm text-gray-600">Particulier</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MdLocationOn className="text-primary mt-0.5" />
                  <div className="text-gray-600">
                    <div>{car.contact.address}</div>
                    <div>
                      {car.contact.city}, {car.contact.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {car.contact.phone.map((phone: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <a
                      href={`tel:${phone}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors"
                    >
                      <MdPhone />
                      Appeler
                    </a>
                    <button
                      onClick={() =>
                        handleWhatsAppContact(
                          phone,
                          `${car.brand} ${car.model}`
                        )
                      }
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                ))}

                <a
                  href={`mailto:${car.contact.email}?subject=Intérêt pour ${car.brand} ${car.model}&body=Bonjour, je suis intéressé par votre ${car.brand} ${car.model}.`}
                  className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <MdEmail />
                  Envoyer un email
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  Publié le{" "}
                  {new Date(car.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-amber-800 mb-3">
                💡 Conseils de sécurité
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Rencontrez le vendeur en personne</li>
                <li>• Inspectez le véhicule avant l'achat</li>
                <li>• Vérifiez tous les documents</li>
                <li>• Ne payez qu'après avoir vu la voiture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarById;
