import { documentTypes, fuelTypes, gearBoxTypes } from "@/components/constants";

const CarTech = ({ formData, setFormData }: any) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Caractéristiques techniques
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carburant *
          </label>
          <select
            value={formData.fuel}
            onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            {fuelTypes.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Moteur *
          </label>
          <input
            type="text"
            value={formData.engine}
            onChange={(e) =>
              setFormData({ ...formData, engine: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ex: 1.8L, 2.0L, V6"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Boîte de vitesses *
          </label>
          <select
            value={formData.gearBox}
            onChange={(e) =>
              setFormData({ ...formData, gearBox: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            {gearBoxTypes.map((gear) => (
              <option key={gear.value} value={gear.value}>
                {gear.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kilométrage *(km)
          </label>
          <input
            type="text"
            value={formData.mileage}
            onChange={(e) =>
              setFormData({ ...formData, mileage: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ex: 25000 km"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Documents *
          </label>
          <select
            value={formData.document}
            onChange={(e) =>
              setFormData({ ...formData, document: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            {documentTypes.map((doc) => (
              <option key={doc.value} value={doc.value}>
                {doc.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarTech;
