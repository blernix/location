import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import IslandMap from "@/components/IslandMap";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import Testimonials from "@/components/Testimonials";
import { experiences, faq, values } from "@/data/content";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import {
  IconArrowRight,
  IconCheck,
  IconCompass,
  IconHeart,
  IconShield,
  IconStar,
  IconWhatsApp,
} from "@/components/Icons";

const marquee = [
  "Villas avec piscine",
  "Bungalows pieds dans l'eau",
  "Réservation directe",
  "Hôtes guadeloupéens",
  "Sans commission",
  "Vue sur le lagon",
  "Carbet & barbecue",
  "Conseils locaux",
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Héros                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative -mt-[72px] flex min-h-[100svh] items-end overflow-hidden pt-[72px]">
        <Image
          src="/images/hero-guadeloupe.svg"
          alt="Lagon et reliefs de la Guadeloupe au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lagoon-950/85 via-lagoon-950/35 to-lagoon-950/45" />

        <div className="container-x relative z-10 w-full pb-14 pt-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sand-100 backdrop-blur">
              <IconCompass className="h-4 w-4" />
              Guadeloupe · Basse-Terre &amp; Grande-Terre
            </p>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
              Votre kaz créole,
              <br />
              entre lagon et forêt tropicale
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand-100/85 sm:text-lg">
              Trois logements choisis à la main, des villas perchées de Deshaies
              aux bungalows posés sur le sable de Sainte-Anne. Réservation
              directe avec vos hôtes, sans plateforme ni commission.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/logements" className="btn-accent">
                Découvrir nos logements
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                <IconWhatsApp className="h-4 w-4" />
                Parler à {site.whatsapp.agent}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-sand-100/80">
              <span className="flex items-center gap-1.5">
                <span className="flex text-mango-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-3.5 w-3.5" />
                  ))}
                </span>
                <strong className="font-semibold text-white">4,92/5</strong>
              </span>
              <span className="h-4 w-px bg-white/25" />
              <span>414 séjours accueillis depuis 2017</span>
            </div>
          </div>

          <div
            className="mt-10 max-w-2xl animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Bandeau défilant                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="overflow-hidden border-y border-lagoon-900/10 bg-lagoon-900 py-4"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-3 text-sm font-medium text-sand-100/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mango-400" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Introduction                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Bienvenue chez Ti Kaz Kréyol</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-[2.75rem]">
              On ne loue pas des murs, on ouvre une maison
            </h2>
            <p className="mt-6 text-base leading-relaxed text-lagoon-900/75">
              Ti Kaz Kréyol est né d&apos;une conviction simple : un séjour en
              Guadeloupe se réussit avec de bonnes adresses et un hôte qui
              connaît son île. Nous n&apos;exploitons que trois logements, tous
              visités, testés et retenus à la main.
            </p>

            <div className="mt-9 space-y-6">
              {values.map((v, i) => (
                <div key={v.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lagoon-100 text-lagoon-800">
                    {i === 0 ? (
                      <IconHeart className="h-5 w-5" />
                    ) : i === 1 ? (
                      <IconShield className="h-5 w-5" />
                    ) : (
                      <IconCompass className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-lagoon-900/70">
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/a-propos"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-lagoon-800 link-underline"
            >
              Notre histoire et nos hôtes
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-soft">
              <Image
                src="/images/about-hote.svg"
                alt="Varangue créole ouverte sur le jardin tropical"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-3xl border border-lagoon-900/10 bg-white p-5 shadow-card sm:block">
              <p className="font-display text-3xl font-semibold text-lagoon-950">
                9 ans
              </p>
              <p className="mt-1 text-xs leading-relaxed text-lagoon-900/65">
                à accueillir des voyageurs entre Basse-Terre et Grande-Terre
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Logements                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">Nos trois logements</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Trois adresses, trois façons de vivre la Guadeloupe
              </h2>
            </div>
            <Link href="/logements" className="btn-outline">
              Voir le catalogue
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <Reveal key={property.slug} delay={i * 90}>
                <PropertyCard property={property} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Carte + chiffres                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <IslandMap />
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">L&apos;île papillon</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
              Une île, deux visages
            </h2>
            <p className="mt-6 text-base leading-relaxed text-lagoon-900/75">
              Basse-Terre, la volcanique : forêt tropicale, cascades, plongée à
              la Réserve Cousteau et la Soufrière qui domine tout. Grande-Terre,
              la calcaire : plages de sable blanc, lagon turquoise et villages de
              pêcheurs. Nos logements couvrent les deux ailes.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-6">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-lagoon-800">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-lagoon-900/60">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Expériences                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-lagoon-950 py-20 text-sand-100 sm:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-mango-300">Nos coups de cœur</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
              Ce que l&apos;on conseille à tous nos voyageurs
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-sand-100/70">
              Chaque hôte vous remet sa carte personnelle : les plages à
              l&apos;abri des alizés, les bokits à ne pas manquer et les heures
              où la Soufrière se dégage.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <Reveal key={exp.slug} delay={(i % 3) * 90}>
                <article className="group relative h-full overflow-hidden rounded-[26px] border border-sand-100/12 bg-sand-100/[0.04]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-lagoon-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sand-100 backdrop-blur">
                      {exp.duration}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-mango-300">
                      {exp.commune}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sand-100/70">
                      {exp.text}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-sand-100/20 px-2.5 py-1 text-[10px] font-medium text-sand-100/70"
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

          <Reveal className="mt-12">
            <Link href="/experiences" className="btn-accent">
              Toutes nos expériences
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Témoignages                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 sm:py-28">
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ aperçu                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance">
              Tout ce qu&apos;il faut savoir avant de réserver
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-lagoon-900/70">
              Une question qui n&apos;est pas dans la liste ? Écrivez-nous sur
              WhatsApp, on répond en général en moins de dix minutes.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <IconWhatsApp className="h-4 w-4" />
                Poser ma question
              </a>
            </div>
            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lagoon-800 link-underline"
            >
              Voir la FAQ complète
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <FaqAccordion items={faq.slice(0, 5)} showFilters={false} />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA final                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x pb-24">
        <Reveal className="relative overflow-hidden rounded-[36px] bg-lagoon-900 px-8 py-14 text-center text-sand-100 sm:px-16 sm:py-20">
          <div className="grain pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow justify-center text-mango-300">
              Prêts à partir ?
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
              Dites-nous vos dates, on s&apos;occupe du reste
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-sand-100/75">
              Devis personnalisé sous 2 heures ouvrées, conseils de plage,
              réservation de voiture et de plongée. Le tout sans commission.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-accent">
                Demander un devis gratuit
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn border border-sand-100/30 bg-transparent text-sand-100 hover:bg-sand-100/10"
              >
                {site.whatsapp.display}
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-sand-100/70">
              {[
                "Réponse sous 2 h",
                "Annulation gratuite 60 j",
                "Paiement sécurisé",
                "Assistance sur place",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <IconCheck className="h-4 w-4 text-mango-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
