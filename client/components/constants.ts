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
