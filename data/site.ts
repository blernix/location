export const site = {
  name: "Ti Kaz Kréyol",
  baseline: "Gîtes & villas de charme en Guadeloupe",
  description:
    "Ti Kaz Kréyol sélectionne des locations de charme entre Basse-Terre et Grande-Terre : villas avec piscine, bungalows les pieds dans le lagon et appartements vue marina. Réservation directe, sans commission.",
  whatsapp: {
    /** Numéro au format international sans + ni espaces — À REMPLACER par le vrai numéro du client */
    number: "590690123456",
    display: "+590 690 12 34 56",
    agent: "Maëlys",
    agentRole: "Conseillère séjour",
    hours: "Tous les jours, 7h – 21h (heure Guadeloupe)",
  },
  phone: "+590 690 12 34 56",
  email: "bonjour@tikazkreyol.gp",
  address: {
    line1: "18 rue Frébault",
    line2: "97110 Pointe-à-Pitre",
    country: "Guadeloupe (FWI)",
  },
  social: {
    instagram: "@tikazkreyol",
    facebook: "Ti Kaz Kréyol",
  },
  stats: [
    { value: "3", label: "logements d'exception" },
    { value: "4,92/5", label: "note moyenne voyageurs" },
    { value: "9 ans", label: "à accueillir en Guadeloupe" },
    { value: "0 %", label: "de commission de plateforme" },
  ],
} as const;

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/logements", label: "Nos logements" },
  { href: "/experiences", label: "La Guadeloupe" },
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const whatsappScript = [
  {
    from: "them" as const,
    text: "Bonjour 👋 Ici Maëlys de Ti Kaz Kréyol. Une question sur un logement, une date ou un devis ?",
  },
  {
    from: "me" as const,
    text: "Bonjour ! Est-ce que la Villa Flamboyant est libre début mars ?",
  },
  {
    from: "them" as const,
    text: "Excellente nouvelle : la villa est libre du 2 au 12 mars 🌴 On est sur 260 €/nuit pour 8 personnes.",
  },
  {
    from: "them" as const,
    text: "Vous voulez que je vous envoie un devis pour ces dates ?",
  },
];

export const quickReplies = [
  "Voir les disponibilités",
  "Demander un devis",
  "Un logement pour 6 personnes",
  "Comment réserver ?",
];
