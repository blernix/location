import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import { aboutStats, values } from "@/data/content";
import { site } from "@/data/site";
import { IconArrowRight, IconCheck, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "Ti Kaz Kréyol, c'est une petite équipe guadeloupéenne qui gère trois logements de charme entre Basse-Terre et Grande-Terre. Notre histoire, nos hôtes, nos engagements.",
};

const timeline = [
  {
    year: "2017",
    title: "La première kaz",
    text: "Maëlys et Joël ouvrent la Villa Flamboyant à Deshaies, après deux ans de travaux dans une maison créole familiale.",
  },
  {
    year: "2019",
    title: "Les pieds dans l'eau",
    text: "Rudy nous rejoint avec son bungalow posé sur le sable de la Caravelle. Le bouche-à-oreille fait le reste.",
  },
  {
    year: "2021",
    title: "Cap sur la ville",
    text: "Sandrine rénove entièrement un appartement face à la marina du Gosier pour les séjours courts et urbains.",
  },
  {
    year: "2024",
    title: "La réservation directe",
    text: "Nous quittons les plateformes pour proposer nos logements en direct, sans commission, avec un vrai contact humain.",
  },
];

const commitments = [
  "Chaque logement est visité et validé par l'équipe",
  "Un hôte joignable sur place pendant tout votre séjour",
  "Des tarifs affichés en toute transparence, sans frais cachés",
  "Une préférence pour les producteurs, artisans et guides locaux",
];

export default function AProposPage() {
  return (
    <>
      <section className="container-x pb-16 pt-12 sm:pt-16">
        <nav className="text-xs text-lagoon-900/55" aria-label="Fil d'ariane">
          <Link href="/" className="transition hover:text-lagoon-950">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-lagoon-950">Qui sommes-nous</span>
        </nav>

        <div className="mt-8 grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Notre histoire</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">
              Une petite équipe, trois maisons, une seule île
            </h1>
            <p className="mt-6 text-base leading-relaxed text-lagoon-900/75">
              Nous ne sommes pas une agence. Nous sommes une famille
              guadeloupéenne qui a commencé par louer une maison, puis deux, puis
              trois — sans jamais vouloir grandir plus vite que notre capacité à
              bien recevoir.
            </p>
            <p className="mt-4 text-base leading-relaxed text-lagoon-900/75">
              Aujourd&apos;hui, Ti Kaz Kréyol c&apos;est {site.stats[0].value}{" "}
              logements, des centaines de séjours, et toujours la même
              promesse : vous accueillir comme on accueille des amis, avec les
              bonnes adresses en plus.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/logements" className="btn-primary">
                Voir nos logements
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <IconWhatsApp className="h-4 w-4" />
                Nous écrire
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[32px] shadow-soft">
              <Image
                src="/images/about-karukera.svg"
                alt="Maison créole dans un jardin tropical de Basse-Terre"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden w-52 rounded-3xl border border-lagoon-900/10 bg-white p-5 shadow-card sm:block">
              <p className="font-display text-2xl font-semibold">414</p>
              <p className="mt-1 text-xs leading-relaxed text-lagoon-900/65">
                séjours accueillis depuis 2017, sur trois logements
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engagements */}
      <section className="bg-white py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Nos engagements</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance">
              Ce qu&apos;on s&apos;interdit, et ce qu&apos;on garantit
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-lagoon-900/70">
              Trois logements, c&apos;est un choix : nous préférons bien faire
              ici plutôt que d&apos;ouvrir partout. Cela nous laisse le temps
              d&apos;être présents.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[...commitments, ...values.map((v) => v.title)].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-lagoon-900/10 bg-sand-50 px-5 py-4 text-sm text-lagoon-900/80"
                >
                  <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-palm-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Chronologie */}
      <section className="container-x py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Étapes</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">
            Comment on en est arrivés là
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((step, i) => (
            <Reveal key={step.year} delay={i * 90}>
              <li className="relative h-full rounded-3xl border border-lagoon-900/10 bg-white p-6">
                <span className="font-display text-3xl font-semibold text-mango-500">
                  {step.year}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-lagoon-900/70">
                  {step.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* La Guadeloupe en chiffres */}
      <section className="relative overflow-hidden py-20">
        <Image
          src="/images/about-terroir.svg"
          alt="Plantation et maison créole au coucher du soleil"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-lagoon-950/82" />
        <div className="container-x relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-mango-300">Notre île</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
              La Guadeloupe, archipel aux mille visages
            </h2>
          </Reveal>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-t border-sand-100/20 pt-5">
                  <dt className="font-display text-3xl font-semibold text-white">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-xs leading-relaxed text-sand-100/70">
                    {s.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Témoignages */}
      <section className="container-x py-20">
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal className="rounded-[32px] bg-lagoon-900 px-8 py-14 text-center text-sand-100 sm:px-16">
          <h2 className="font-display text-3xl font-semibold text-white">
            On se parle de votre séjour ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-sand-100/75">
            Que ce soit pour choisir entre les deux ailes de l&apos;île ou
            organiser un séjour en famille, nous adorons préparer les voyages.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-accent">
              Nous contacter
            </Link>
            <Link
              href="/faq"
              className="btn border border-sand-100/30 bg-transparent text-sand-100 hover:bg-sand-100/10"
            >
              Consulter la FAQ
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
