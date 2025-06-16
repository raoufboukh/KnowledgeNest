"use client";
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import BaseInfo from "../Information/BaseInfo";
import CarTech from "../Information/CarTech";
import Options from "../Information/Options";
import Contact from "../Information/Contact";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { addCar } from "@/redux/Slices/CarSlices";

const AddCarSection = ({ user }: { user: any }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    fuel: "petrol",
    engine: "",
    document: "complete",
    gearBox: "manual",
    mileage: "",
    year: new Date().getFullYear(),
    price: "",
    images: [""],
    description: "",
    contact: {
      name: "",
      email: "",
      phone: [""],
      address: "",
      city: "",
      country: "Algeria",
    },
    carOption: [""],
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  const updateImageField = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newImages = [...formData.images];
      newImages[index] = base64String;
      setFormData({ ...formData, images: newImages });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(addCar(formData));

    try {
      const cleanData = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ""),
        contact: {
          ...formData.contact,
          phone: formData.contact.phone.filter((phone) => phone.trim() !== ""),
        },
        carOption: formData.carOption.filter((option) => option.trim() !== ""),
        price: parseFloat(formData.price),
      };

      setFormData({
        name: "",
        brand: "",
        model: "",
        color: "",
        fuel: "petrol",
        engine: "",
        document: "complete",
        gearBox: "manual",
        mileage: "",
        year: new Date().getFullYear(),
        price: "",
        images: [""],
        description: "",
        contact: {
          name: "",
          email: "",
          phone: [""],
          address: "",
          city: "",
          country: "Algeria",
        },
        carOption: [""],
      });

      alert("Voiture ajoutée avec succès!");
    } catch (error) {
      console.error("Error creating car:", error);
      alert("Erreur lors de l'ajout de la voiture");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 text-primary">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Ajouter une nouvelle voiture
        </h2>
        <p className="text-gray-600">
          Remplissez tous les détails de votre voiture pour{" "}
          {user.role === "admin"
            ? "publication directe"
            : "soumission à l'approbation"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <BaseInfo formData={formData} setFormData={setFormData} />

        {/* Caractéristiques techniques */}
        <CarTech formData={formData} setFormData={setFormData} />

        {/* Images */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Images de la voiture
          </h3>
          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="file"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  updateImageField(index, e.target.files[0])
                }
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required={index === 0}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <MdClose />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <MdAdd /> Ajouter une image
          </button>
        </div>

        {/* Description */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Description
          </h3>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            placeholder="Décrivez votre voiture en détail (état, historique, particularités...)"
            required
          />
        </div>

        {/* Options de la voiture */}
        <Options formData={formData} setFormData={setFormData} />

        {/* Informations de contact */}
        <Contact formData={formData} setFormData={setFormData} />

        {/* Boutons de soumission */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Soumission en cours...
              </>
            ) : (
              <>
                <MdAdd />
                {user.role === "admin"
                  ? "Publier la voiture"
                  : "Soumettre pour approbation"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarSection;
