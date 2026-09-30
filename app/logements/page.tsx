import type { Metadata } from "next";
import Link from "next/link";
import IslandMap from "@/components/IslandMap";
import PropertyExplorer from "@/components/PropertyExplorer";
import Reveal from "@/components/Reveal";
import { IconArrowRight, IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Nos logements en Guadeloupe",
  description:
    "Villa avec piscine à Deshaies, bungalow les pieds dans l'eau à Sainte-Anne, appartement vue marina au Gosier. Découvrez nos trois locations de charme en Guadeloupe.",
};

const guarantees = [
  "Ménage final et linge fournis",
  "Réservation directe sans commission",
  "Hôtes joignables 7j/7",
  "Annulation gratuite jusqu'à 60 jours",
];

export default function LogementsPage() {
  return (
    <>
      <section className="relative -mt-[72px] bg-lagoon-900 pb-16 pt-[calc(72px+4rem)] text-sand-100">
        <div className="grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <nav className="text-xs text-sand-100/60" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-sand-100">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-sand-100">Nos logements</span>
          </nav>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold text-white text-balance sm:text-5xl">
            Trois logements sélectionnés à la main
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-sand-100/75 sm:text-base">
            De la villa perchée au bungalow posé sur le sable, chaque adresse a
            été choisie pour une raison précise. Filtrez selon votre île, votre
            budget et le nombre de voyageurs.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-sand-100/70">
            {guarantees.map((g) => (
              <li key={g} className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-mango-300" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        <PropertyExplorer />
      </section>

      <section className="bg-white py-20">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Où se situe chaque logement ?</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance">
              Deux ailes, deux ambiances
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-lagoon-900/70">
              La Villa Flamboyant et la Réserve Cousteau sont sur Basse-Terre,
              la plus sauvage. Le Bungalow Lagon et l&apos;Appartement Marina
              sont sur Grande-Terre, plus balnéaire et proche de
              Pointe-à-Pitre. Cliquez sur un repère pour découvrir le logement.
            </p>
            <Link href="/contact" className="btn-outline mt-8">
              Demander conseil sur la région
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <IslandMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}
