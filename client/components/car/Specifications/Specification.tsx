import React from "react";
import {
  MdCalendarToday,
  MdLocalGasStation,
  MdSettings,
  MdVerified,
} from "react-icons/md";
import { PiEngine } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";

const Specification = ({ car }: any) => {
  return (
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
              <div className="font-medium text-gray-900">Transmission</div>
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
  );
};

export default Specification;
