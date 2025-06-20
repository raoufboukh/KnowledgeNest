import { commonCarOptions } from "@/components/constants";
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Options = ({ formData, setFormData }: any) => {
  const addOptionField = () => {
    setFormData({
      ...formData,
      carOption: [...formData.carOption, ""],
    });
  };

  const removeOptionField = (index: number) => {
    if (formData.carOption.length > 1) {
      const newOptions = formData.carOption.filter(
        (_: any, i: number) => i !== index
      );
      setFormData({ ...formData, carOption: newOptions });
    }
  };

  const updateOptionField = (index: number, value: string) => {
    const newOptions = [...formData.carOption];
    newOptions[index] = value;
    setFormData({ ...formData, carOption: newOptions });
  };

  const toggleCommonOption = (option: string) => {
    const currentOptions = formData.carOption.filter((opt: any) => opt !== "");
    if (currentOptions.includes(option)) {
      const newOptions = currentOptions.filter((opt: any) => opt !== option);
      setFormData({ ...formData, carOption: [...newOptions, ""] });
    } else {
      const newOptions = [...currentOptions, option];
      setFormData({ ...formData, carOption: [...newOptions, ""] });
    }
  };
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Options et équipements
      </h3>

      {/* Options communes (boutons) */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Options courantes :
        </p>
        <div className="flex flex-wrap gap-2">
          {commonCarOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleCommonOption(option)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.carOption.includes(option)
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Options personnalisées */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Options personnalisées :
        </p>
        {formData.carOption.map((option: any, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={option}
              onChange={(e) => updateOptionField(index, e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={`Option ${index + 1}`}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeOptionField(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <MdClose />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOptionField}
          className="flex items-center gap-2 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors cursor-pointer duration-300"
        >
          <MdAdd /> Ajouter une option
        </button>
      </div>
    </div>
  );
};

export default Options;
