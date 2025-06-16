import { algerianCities } from "@/components/constants";
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Contact = ({ formData, setFormData }: any) => {
  const addPhoneField = () => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        phone: [...formData.contact.phone, ""],
      },
    });
  };

  const removePhoneField = (index: number) => {
    if (formData.contact.phone.length > 1) {
      const newPhone = formData.contact.phone.filter(
        (_: any, i: number) => i !== index
      );
      setFormData({
        ...formData,
        contact: { ...formData.contact, phone: newPhone },
      });
    }
  };

  const updatePhoneField = (index: number, value: string) => {
    const newPhone = [...formData.contact.phone];
    newPhone[index] = value;
    setFormData({
      ...formData,
      contact: { ...formData.contact, phone: newPhone },
    });
  };
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Informations de contact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            value={formData.contact.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, name: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Votre nom complet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.contact.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, email: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse *
          </label>
          <input
            type="text"
            value={formData.contact.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, address: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Votre adresse complète"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville *
          </label>
          <select
            value={formData.contact.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, city: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Sélectionner une ville</option>
            {algerianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pays *
          </label>
          <input
            type="text"
            value={formData.contact.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, country: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
            readOnly
          />
        </div>
      </div>

      {/* Numéros de téléphone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numéros de téléphone *
        </label>
        {formData.contact.phone.map((phone: any, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => updatePhoneField(index, e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={`0${index === 0 ? "555 123 456" : "777 987 654"}`}
              required={index === 0}
              maxLength={10}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removePhoneField(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <MdClose />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPhoneField}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <MdAdd /> Ajouter un numéro
        </button>
      </div>
    </div>
  );
};

export default Contact;
