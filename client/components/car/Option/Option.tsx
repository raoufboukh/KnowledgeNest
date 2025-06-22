import React from "react";

const Option = ({ car }: any) => {
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  return (
    <>
      {car.carOption && car.carOption.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Options et équipements
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {car.carOption.map(
              (option: string, index: number) =>
                option !== "" && (
                  <div key={index} className="flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {car.description && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="text-gray-700 leading-relaxed">
            {showFullDescription ? (
              <p>{car.description}</p>
            ) : (
              <p>
                {car.description.slice(0, 300)}
                {!showFullDescription && car.description.length > 300 && "..."}
              </p>
            )}
            {car.description.length > 300 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary hover:underline mt-2"
              >
                {showFullDescription ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Option;
