import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const ContactSingle = ({ car }: any) => {
  const handleWhatsAppContact = (phone: string, carName: string) => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par votre ${carName}. Pouvez-vous me donner plus d'informations ?`
    );
    window.open(
      `https://wa.me/${phone.replace(/\s+/g, "")}?text=${message}`,
      "_blank"
    );
  };
  return (
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
                  handleWhatsAppContact(phone, `${car.brand} ${car.model}`)
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
            Publié le {new Date(car.createdAt).toLocaleDateString("fr-FR")}
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
  );
};

export default ContactSingle;
