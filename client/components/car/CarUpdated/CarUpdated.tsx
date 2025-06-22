"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MdClose,
  MdAdd,
  MdDelete,
  MdSave,
  MdCancel,
  MdCloudUpload,
  MdImage,
} from "react-icons/md";
import { colors, fuelTypes, gearBoxTypes } from "@/components/constants";

interface CarUpdatedProps {
  car: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCar: any) => void;
}

const CarUpdated: React.FC<CarUpdatedProps> = ({
  car,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    fuel: "",
    engine: "",
    document: "",
    gearBox: "",
    mileage: "",
    year: "",
    price: "",
    description: "",
    carOption: [] as string[],
    contact: {
      name: "",
      email: "",
      phone: [""],
      address: "",
      city: "",
      country: "",
    },
    images: [] as string[],
  });

  const [newOption, setNewOption] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (car && isOpen) {
      setFormData({
        name: car.name || "",
        brand: car.brand || "",
        model: car.model || "",
        color: car.color || "",
        fuel: car.fuel || "",
        engine: car.engine || "",
        document: car.document || "",
        gearBox: car.gearBox || "",
        mileage: car.mileage || "",
        year: car.year || "",
        price: car.price || "",
        description: car.description || "",
        carOption: car.carOption || [],
        contact: {
          name: car.contact?.name || "",
          email: car.contact?.email || "",
          phone: car.contact?.phone || [""],
          address: car.contact?.address || "",
          city: car.contact?.city || "",
          country: car.contact?.country || "",
        },
        images: car.images || [],
      });
    }
  }, [car, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phone: prev.contact.phone.map((phone, i) =>
          i === index ? value : phone
        ),
      },
    }));
  };

  const addPhone = () => {
    if (newPhone.trim()) {
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          phone: [...prev.contact.phone, newPhone.trim()],
        },
      }));
      setNewPhone("");
    }
  };

  const removePhone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phone: prev.contact.phone.filter((_, i) => i !== index),
      },
    }));
  };

  const addOption = () => {
    if (newOption.trim() && !formData.carOption.includes(newOption.trim())) {
      setFormData((prev) => ({
        ...prev,
        carOption: [...prev.carOption, newOption.trim()],
      }));
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      carOption: prev.carOption.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, event.target?.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedCar = {
        ...car,
        ...formData,
        price: parseFloat(formData.price),
        year: parseInt(formData.year),
        mileage: parseInt(formData.mileage),
      };

      await onSave(updatedCar);
      onClose();
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-primary">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Modifier la voiture
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations générales
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la voiture *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marque *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1990"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (DZD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kilométrage
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Spécifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Couleur
                  </label>
                  <select
                    value={formData.color}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    name="color"
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionner</option>
                    {colors.map((color: any) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carburant
                  </label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    {fuelTypes.map((fuel: any) => (
                      <option key={fuel.value} value={fuel.value}>
                        {fuel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moteur
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    placeholder="ex: 1.6L, V6, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boîte de vitesses
                  </label>
                  <select
                    name="gearBox"
                    value={formData.gearBox}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    {gearBoxTypes.map((gearBox: any) => (
                      <option key={gearBox.value} value={gearBox.value}>
                        {gearBox.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Documents
                  </label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    placeholder="ex: Carte grise, Contrôle technique"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Images
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`Car image ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <MdDelete className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <MdCloudUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Cliquez pour ajouter des images
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG (max 5MB)
                  </p>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Options et équipements
              </h3>

              <div className="grid md:grid-cols-2 gap-2 mb-4">
                {formData.carOption.map(
                  (option, index) =>
                    option !== "" && (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                      >
                        <span className="text-sm">{option}</span>
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Ajouter une option..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addOption())
                  }
                />
                <button
                  type="button"
                  onClick={addOption}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                >
                  <MdAdd />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations de contact
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.contact.name}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.contact.email}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.contact.city}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pays *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.contact.country}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.contact.address}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéros de téléphone *
                </label>
                <div className="space-y-2 mb-2">
                  {formData.contact.phone.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          handlePhoneChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="ex: +213 555 123 456"
                      />
                      {formData.contact.phone.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhone(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Ajouter un autre numéro..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addPhone())
                    }
                  />
                  <button
                    type="button"
                    onClick={addPhone}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Décrivez votre voiture..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <MdCancel />
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <MdSave />
                {loading ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarUpdated;
