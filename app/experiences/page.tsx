import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/content";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import { IconArrowRight, IconCompass, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "La Guadeloupe — nos coups de cœur",
  description:
    "Plage de la Caravelle, cascade aux Écrevisses, Soufrière, Réserve Cousteau, route du rhum : nos adresses préférées en Guadeloupe, testées par nos hôtes.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative -mt-[72px] overflow-hidden pb-16 pt-[calc(72px+4rem)]">
        <Image
          src="/images/exp-soufriere.svg"
          alt="Reliefs de Basse-Terre dans la brume"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lagoon-950/90 via-lagoon-950/70 to-lagoon-950/40" />

        <div className="container-x relative text-sand-100">
          <nav className="text-xs text-sand-100/60" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-sand-100">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-sand-100">La Guadeloupe</span>
          </nav>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <IconCompass className="h-4 w-4" />
            Guide local
          </p>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold text-white text-balance sm:text-5xl lg:text-6xl">
            Nos coups de cœur en Guadeloupe
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-sand-100/80 sm:text-base">
            Ce n&apos;est pas un guide touristique : ce sont les endroits où
            nous emmenons nos amis. Chaque hôte vous remet sa carte annotée à
            l&apos;arrivée.
          </p>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, i) => (
            <Reveal key={exp.slug} delay={(i % 2) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-lagoon-900/10 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-lagoon-900 backdrop-blur">
                    {exp.commune}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-lagoon-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sand-100 backdrop-blur">
                    {exp.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl font-semibold">
                    {exp.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-lagoon-900/70">
                    {exp.text}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-lagoon-900/5 px-3 py-1 text-[11px] font-medium text-lagoon-900/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Combiner avec un logement */}
      <section className="bg-white py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Combinez avec un séjour</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance">
              Chaque logement a son terrain de jeu
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-lagoon-900/70">
              Le nord de Basse-Terre pour les randonnées et la plongée, le sud
              de Grande-Terre pour les plages et la voile. On vous oriente selon
              votre programme.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {properties.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  href={`/logements/${p.slug}`}
                  className="group block overflow-hidden rounded-[26px] border border-lagoon-900/10 bg-sand-50 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.gallery[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-mango-600">
                      {p.commune}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-lagoon-900/60">
                      À partir de {p.pricePerNight} € / nuit
                      <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-24 pt-20">
        <Reveal className="rounded-[32px] bg-lagoon-900 px-8 py-14 text-center text-sand-100 sm:px-16">
          <h2 className="font-display text-3xl font-semibold text-white text-balance">
            Envie d&apos;un programme sur mesure ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-sand-100/75">
            Dites-nous ce qui vous fait envie — plage, rando, plongée,
            gastronomie — et nous vous construisons un itinéraire jour par jour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-accent">
              Demander un itinéraire
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-sand-100/30 bg-transparent text-sand-100 hover:bg-sand-100/10"
            >
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
