import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, conditions de réservation et politique de confidentialité de Ti Kaz Kréyol.",
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "Éditeur du site",
    body: [
      `${site.name} — location de meublés de tourisme.`,
      `Siège : ${site.address.line1}, ${site.address.line2}, ${site.address.country}.`,
      `Contact : ${site.email} — ${site.whatsapp.display}.`,
      "Numéro d'identification : à compléter par l'exploitant.",
      "Responsable de la publication : Maëlys Céleste.",
    ],
  },
  {
    title: "Hébergement",
    body: [
      "Ce site de démonstration est hébergé en statique. Aucune donnée personnelle n'y est stockée ni transmise.",
      "En production, l'hébergeur retenu sera indiqué ici avec ses coordonnées complètes.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "L'ensemble des textes, illustrations, mises en page et éléments graphiques présents sur ce site sont protégés et ne peuvent être reproduits sans autorisation écrite.",
      "Les illustrations de ce site sont des créations vectorielles originales représentant des paysages de Guadeloupe. Elles ne constituent pas des photographies des logements et sont utilisées à titre de démonstration.",
    ],
  },
  {
    title: "Conditions de réservation",
    body: [
      "La réservation est confirmée par le versement d'un acompte de 30 % du montant total du séjour. Le solde est exigible 30 jours avant la date d'arrivée.",
      "Annulation jusqu'à 60 jours avant l'arrivée : remboursement intégral de l'acompte. Entre 60 et 30 jours : avoir valable 18 mois. Moins de 30 jours : séjour non remboursable, sauf assurance annulation souscrite.",
      "Une caution peut être demandée à l'arrivée selon le logement. Elle est restituée après l'état des lieux de départ.",
      "Les tarifs affichés s'entendent par nuit, pour le nombre de voyageurs indiqué, ménage final et linge de maison inclus.",
    ],
  },
  {
    title: "Données personnelles",
    body: [
      "Les informations transmises via le formulaire de contact ou WhatsApp sont utilisées uniquement pour traiter votre demande de réservation. Elles ne sont ni cédées ni revendues à des tiers.",
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, écrivez à " +
        site.email +
        ".",
      "Sur ce site de démonstration, aucun formulaire n'enregistre réellement de données : les envois sont simulés côté navigateur.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Ce site n'utilise aucun cookie publicitaire ni traceur tiers. Seuls des éléments techniques strictement nécessaires au fonctionnement de la page peuvent être employés.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="border-b border-lagoon-900/10 bg-white pb-12 pt-12">
        <div className="container-x">
          <nav className="text-xs text-lagoon-900/55" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-lagoon-950">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-lagoon-950">Mentions légales</span>
          </nav>

          <h1 className="mt-8 font-display text-4xl font-semibold text-balance sm:text-5xl">
            Mentions légales
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-lagoon-900/70">
            Informations légales, conditions de réservation et traitement des
            données pour {site.name}. Contenu rédigé pour la maquette et à
            compléter par l&apos;exploitant avant mise en ligne.
          </p>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl font-semibold">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-lagoon-900/75">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-mango-200 bg-mango-50 p-6 text-sm leading-relaxed text-mango-900">
            <strong className="block font-semibold">
              Ceci est une maquette de démonstration.
            </strong>
            <p className="mt-2">
              Les informations juridiques ci-dessus sont génériques et doivent
              être validées et complétées avant toute exploitation commerciale
              du site.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
