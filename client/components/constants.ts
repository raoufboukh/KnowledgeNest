import {
  MdGroup,
  MdSecurity,
  MdSpeed,
  MdStar,
  MdSupport,
  MdTrendingUp,
  MdVerified,
} from "react-icons/md";

export const links = [
  {
    title: "Buy",
    link: "/cars",
  },
  {
    title: "Sell",
    link: "/sell-cars",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Sign",
    link: "/login",
  },
];

export const carBrands = [
  {
    name: "Toyota",
    logo: "/assets/toyota-svgrepo-com.svg",
  },
  {
    name: "Honda",
    logo: "/assets/honda-svgrepo-com.svg",
  },
  {
    name: "Ford",
    logo: "/assets/ford-svgrepo-com.svg",
  },
  {
    name: "Chevrolet",
    logo: "/assets/chevrolet-svgrepo-com.svg",
  },
  {
    name: "BMW",
    logo: "/assets/bmw-svgrepo-com.svg",
  },
  {
    name: "Mercedes-Benz",
    logo: "/assets/mercedes-benz-alt-svgrepo-com.svg",
  },
  {
    name: "Audi",
    logo: "/assets/audi-svgrepo-com.svg",
  },
  {
    name: "Volkswagen",
    logo: "/assets/volkswagen-svgrepo-com.svg",
  },
  {
    name: "Hyundai",
    logo: "/assets/hyundai-svgrepo-com.svg",
  },
  {
    name: "Kia",
    logo: "/assets/kia-svgrepo-com.svg",
  },
  {
    name: "Nissan",
    logo: "/assets/nissan-svgrepo-com.svg",
  },
  {
    name: "Peugeot",
    logo: "/assets/peugeot-svgrepo-com.svg",
  },
  {
    name: "Renault",
    logo: "/assets/renault-svgrepo-com.svg",
  },
  {
    name: "Fiat",
    logo: "/assets/fiat-svgrepo-com.svg",
  },
  {
    name: "Land Rover",
    logo: "/assets/landrover-svgrepo-com.svg",
  },
  {
    name: "Seat",
    logo: "/assets/seat-svgrepo-com.svg",
  },
  {
    name: "Suzuki",
    logo: "/assets/suzuki-svgrepo-com.svg",
  },
  {
    name: "Skoda",
    logo: "/assets/skoda-svgrepo-com.svg",
  },
  {
    name: "Citroen",
    logo: "/assets/citroen-svgrepo-com.svg",
  },
  {
    name: "Dacia",
    logo: "/assets/dacia-svgrepo-com.svg",
  },
];

export const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

export const footerLinks = [
  {
    title: "Buy Cars",
    link: "/cars",
  },
  {
    title: "Sell Cars",
    link: "/sell-cars",
  },
  {
    title: "Privacy Policy",
    link: "privacy",
  },
];

export const linksUser = [
  {
    title: "dashboard",
    link: "/dashboard",
  },
  {
    title: "Logout",
  },
];

export const dashboardLinks = [
  {
    title: "All Cars",
    role: ["admin"],
  },
  {
    title: "My Cars",
    role: ["user", "admin"],
  },
  {
    title: "Notifications",
    role: ["admin"],
  },
  {
    title: "Add Car",
    role: ["admin", "user"],
  },
  {
    title: "Profile",
    role: ["user", "admin"],
  },
];

export const colors = [
  "White",
  "Black",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Gold",
  "Beige",
  "Purple",
  "Pink",
];

export const fuelTypes = [
  { value: "petrol", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybride" },
  { value: "electric", label: "Électrique" },
  { value: "gpl", label: "GPL" },
];

export const gearBoxTypes = [
  { value: "manual", label: "Manuelle" },
  { value: "automatic", label: "Automatique" },
  { value: "semi-automatic", label: "Semi-automatique" },
];

export const documentTypes = [
  { value: "complete", label: "Complet" },
  { value: "incomplete", label: "Incomplet" },
  { value: "in-progress", label: "En cours" },
];

export const commonCarOptions = [
  "Climatisation",
  "Vitres électriques",
  "Verrouillage centralisé",
  "Direction assistée",
  "ABS",
  "Airbags",
  "GPS/Navigation",
  "Bluetooth",
  "Radio/CD",
  "USB/Aux",
  "Caméra de recul",
  "Capteurs de parking",
  "Toit ouvrant",
  "Sièges cuir",
  "Sièges électriques",
  "Régulateur de vitesse",
  "Jantes alliage",
  "Feux LED",
];

export const algerianCities = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "MSila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Menia",
];

export const stats = [
  { number: "10,000+", label: "Voitures vendues", icon: MdTrendingUp },
  { number: "5,000+", label: "Clients satisfaits", icon: MdGroup },
  { number: "50+", label: "Marques disponibles", icon: MdVerified },
  { number: "15+", label: "Années d'expérience", icon: MdStar },
];

export const features = [
  {
    icon: MdVerified,
    iconClass: "text-3xl text-primary",
    title: "Voitures Vérifiées",
    description:
      "Toutes nos voitures passent par un contrôle qualité rigoureux avant d'être mises en vente.",
  },
  {
    icon: MdSecurity,
    iconClass: "text-3xl text-primary",
    title: "Transactions Sécurisées",
    description:
      "Paiements sécurisés et documents légaux garantis pour votre tranquillité d'esprit.",
  },
  {
    icon: MdSupport,
    iconClass: "text-3xl text-primary",
    title: "Support 24/7",
    description:
      "Notre équipe d'experts est disponible pour vous accompagner à tout moment.",
  },
  {
    icon: MdSpeed,
    iconClass: "text-3xl text-primary",
    title: "Processus Rapide",
    description:
      "Achat et vente simplifiés avec des démarches administratives optimisées.",
  },
];

export const team = [
  {
    name: "Ahmed Belkacem",
    role: "Directeur Général",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "15 ans d'expérience dans l'automobile",
  },
  {
    name: "Fatima Mansouri",
    role: "Responsable Ventes",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Experte en négociation et relation client",
  },
  {
    name: "Karim Tizi",
    role: "Expert Technique",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Mécanicien certifié et diagnostiqueur",
  },
];
