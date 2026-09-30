export type AmenityKey =
  | "wifi"
  | "pool"
  | "sea-view"
  | "beach"
  | "ac"
  | "kitchen"
  | "parking"
  | "terrace"
  | "bbq"
  | "washer"
  | "crib"
  | "pets"
  | "kayak"
  | "snorkeling"
  | "garden"
  | "tv";

export type Property = {
  slug: string;
  name: string;
  tagline: string;
  commune: string;
  island: "Basse-Terre" | "Grande-Terre";
  type: "Villa" | "Bungalow" | "Appartement";
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  surface: number;
  pricePerNight: number;
  cleaningFee: number;
  minNights: number;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string[];
  highlights: string[];
  amenities: AmenityKey[];
  gallery: string[];
  /** Coordonnées approximatives — utilisées pour placer le repère sur la carte stylisée */
  map: { x: number; y: number; label: string };
  /** Dates factices déjà réservées (utilisées par le calendrier de démonstration) */
  booked: string[];
  host: { name: string; since: number; note: string };
  accent: "lagoon" | "palm" | "mango";
};

export const properties: Property[] = [
  {
    slug: "villa-flamboyant",
    name: "Villa Flamboyant",
    tagline: "Villa créole avec piscine et vue sur les Îles",
    commune: "Deshaies",
    island: "Basse-Terre",
    type: "Villa",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    surface: 180,
    pricePerNight: 260,
    cleaningFee: 90,
    minNights: 5,
    rating: 4.94,
    reviews: 87,
    shortDescription:
      "Perchée au-dessus de la baie de Deshaies, une villa créole tout confort avec piscine à débordement et vue sur les îlets.",
    description: [
      "La Villa Flamboyant domine la baie de Deshaies, à cinq minutes du village et de ses restaurants de poisson. Les grandes varangues ouvertes laissent entrer les alizés du matin, et la piscine à débordement se fond littéralement dans la ligne d'horizon.",
      "Le séjour décloisonné ouvre sur une cuisine entièrement équipée, pensée pour cuisiner les produits du marché de Pointe-Noire. Quatre chambres climatisées, toutes tournées vers la mer, dont une suite parentale avec douche extérieure.",
      "Le jardin tropical de 1 200 m² abrite un carbet d'été, un barbecue et un hamac sous les manguiers. C'est le point de départ idéal pour explorer la Réserve Cousteau, la route de la Traversée et les plus belles plages de Basse-Terre.",
    ],
    highlights: [
      "Piscine à débordement chauffée par le soleil",
      "Vue panoramique sur la baie et les îlets Pigeon",
      "5 minutes à pied du village de Deshaies",
      "Jardin tropical de 1 200 m² avec carbet et barbecue",
    ],
    amenities: [
      "pool",
      "sea-view",
      "wifi",
      "ac",
      "kitchen",
      "parking",
      "terrace",
      "bbq",
      "garden",
      "washer",
      "crib",
      "tv",
    ],
    gallery: [
      "/images/villa-flamboyant-1.svg",
      "/images/villa-flamboyant-2.svg",
      "/images/villa-flamboyant-3.svg",
      "/images/villa-flamboyant-4.svg",
      "/images/villa-flamboyant-5.svg",
    ],
    map: { x: 26, y: 30, label: "Deshaies" },
    booked: [
      "2026-03-14",
      "2026-03-15",
      "2026-03-16",
      "2026-03-17",
      "2026-04-04",
      "2026-04-05",
      "2026-04-06",
      "2026-04-07",
      "2026-04-08",
    ],
    host: {
      name: "Maëlys & Joël",
      since: 2017,
      note: "Nous habitons à Deshaies et passons vous accueillir en personne au check-in.",
    },
    accent: "lagoon",
  },
  {
    slug: "bungalow-lagon",
    name: "Bungalow Lagon",
    tagline: "Les pieds dans l'eau sur la plage de Sainte-Anne",
    commune: "Sainte-Anne",
    island: "Grande-Terre",
    type: "Bungalow",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    surface: 75,
    pricePerNight: 165,
    cleaningFee: 60,
    minNights: 3,
    rating: 4.89,
    reviews: 124,
    shortDescription:
      "Un bungalow en bois posé à dix mètres du sable blanc de la plage de la Caravelle, lagon turquoise à perte de vue.",
    description: [
      "À dix mètres du sable, vous vous réveillez au son des vagues et prenez votre café face au lagon. Le Bungalow Lagon a été construit dans les règles de l'art créole : bois massif, toiture ventilée, ouverture traversante pour la brise.",
      "Deux chambres climatisées pouvant accueillir quatre personnes, une douche extérieure en pierre de pays, et une grande terrasse couverte avec hamac et table pour les repas face à la mer.",
      "La plage de la Caravelle s'étend juste devant vous : sable blanc, eau peu profonde protégée par la barrière de corail, idéale pour la baignade des enfants et le snorkeling. Saint-François et son marché sont à quinze minutes.",
    ],
    highlights: [
      "Accès direct à la plage de la Caravelle",
      "Douche extérieure en pierre de pays",
      "Terrasse couverte avec hamac face au lagon",
      "Lagon protégé par la barrière de corail",
    ],
    amenities: [
      "beach",
      "sea-view",
      "wifi",
      "ac",
      "kitchen",
      "terrace",
      "snorkeling",
      "garden",
      "bbq",
      "parking",
      "crib",
      "pets",
    ],
    gallery: [
      "/images/bungalow-lagon-1.svg",
      "/images/bungalow-lagon-2.svg",
      "/images/bungalow-lagon-3.svg",
      "/images/bungalow-lagon-4.svg",
      "/images/bungalow-lagon-5.svg",
    ],
    map: { x: 74, y: 62, label: "Sainte-Anne" },
    booked: [
      "2026-03-02",
      "2026-03-03",
      "2026-03-04",
      "2026-03-20",
      "2026-03-21",
      "2026-03-22",
      "2026-03-23",
    ],
    host: {
      name: "Rudy",
      since: 2019,
      note: "Pêcheur le matin, hôte l'après-midi : je vous indique les meilleurs spots de snorkeling.",
    },
    accent: "mango",
  },
  {
    slug: "appartement-marina",
    name: "Appartement Marina",
    tagline: "Vue marina au Gosier, à 8 minutes de la plage",
    commune: "Le Gosier",
    island: "Grande-Terre",
    type: "Appartement",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    surface: 62,
    pricePerNight: 118,
    cleaningFee: 45,
    minNights: 2,
    rating: 4.86,
    reviews: 203,
    shortDescription:
      "Au troisième étage d'une résidence calme, un appartement lumineux avec balcon sur la marina et piscine partagée.",
    description: [
      "Depuis le balcon du troisième étage, vous suivez les allées et venues des voiliers dans la marina du Gosier. L'appartement a été entièrement rénové en 2024 : béton ciré, bois clair et lin, dans un esprit balnéaire épuré.",
      "Deux chambres climatisées, un séjour ouvert sur la cuisine américaine, et une salle de bain avec grande douche à l'italienne. La résidence dispose d'une piscine commune et d'un parking privatif sécurisé.",
      "Vous êtes à huit minutes à pied de la plage du Gosier et de ses paillotes, à dix minutes de Pointe-à-Pitre par la route, et à cinq minutes de l'aéroport. Le point de chute parfait pour un séjour urbain et balnéaire.",
    ],
    highlights: [
      "Balcon plein sud avec vue sur la marina",
      "Piscine commune dans la résidence",
      "À 5 minutes de l'aéroport Pôle Caraïbes",
      "Rénové en 2024, ambiance balnéaire épurée",
    ],
    amenities: [
      "sea-view",
      "pool",
      "wifi",
      "ac",
      "kitchen",
      "tv",
      "parking",
      "terrace",
      "washer",
      "beach",
    ],
    gallery: [
      "/images/appart-marina-1.svg",
      "/images/appart-marina-2.svg",
      "/images/appart-marina-3.svg",
      "/images/appart-marina-4.svg",
      "/images/appart-marina-5.svg",
    ],
    map: { x: 62, y: 52, label: "Le Gosier" },
    booked: [
      "2026-03-08",
      "2026-03-09",
      "2026-03-10",
      "2026-03-28",
      "2026-03-29",
      "2026-03-30",
      "2026-03-31",
    ],
    host: {
      name: "Sandrine",
      since: 2021,
      note: "Je connais toutes les bonnes adresses de Pointe-à-Pitre, je vous laisse ma carte.",
    },
    accent: "palm",
  },
];

export const amenityLabels: Record<AmenityKey, string> = {
  wifi: "Wi-Fi fibre",
  pool: "Piscine",
  "sea-view": "Vue mer",
  beach: "Accès plage",
  ac: "Climatisation",
  kitchen: "Cuisine équipée",
  parking: "Parking privatif",
  terrace: "Terrasse / varangue",
  bbq: "Barbecue",
  washer: "Lave-linge",
  crib: "Lit bébé sur demande",
  pets: "Animaux acceptés",
  kayak: "Kayaks à disposition",
  snorkeling: "Matériel de snorkeling",
  garden: "Jardin tropical",
  tv: "Télévision",
};

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function otherProperties(slug: string): Property[] {
  return properties.filter((p) => p.slug !== slug);
}
