import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AmenityIcon from "@/components/AmenityIcon";
import BookingCard from "@/components/BookingCard";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import IslandMap from "@/components/IslandMap";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/content";
import {
  amenityLabels,
  getProperty,
  otherProperties,
  properties,
} from "@/data/properties";
import { site } from "@/data/site";
import {
  IconArrowRight,
  IconBath,
  IconBed,
  IconCalendar,
  IconCheck,
  IconPin,
  IconRuler,
  IconStar,
  IconUsers,
  IconWhatsApp,
} from "@/components/Icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Logement introuvable" };

  return {
    title: `${property.name} — ${property.commune}`,
    description: property.shortDescription,
    openGraph: {
      title: `${property.name} — ${property.commune}, Guadeloupe`,
      description: property.shortDescription,
      images: [{ url: property.gallery[0] }],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const others = otherProperties(property.slug);
  const nearby = experiences
    .filter((e) => e.commune !== property.commune)
    .slice(0, 3);

  const specs = [
    { icon: IconUsers, label: `${property.guests} voyageurs` },
    { icon: IconBed, label: `${property.bedrooms} chambres · ${property.beds} lits` },
    { icon: IconBath, label: `${property.bathrooms} salle${property.bathrooms > 1 ? "s" : ""} de bain` },
    { icon: IconRuler, label: `${property.surface} m²` },
  ];

  return (
    <>
      {/* ------------------------------- En-tête ------------------------------ */}
      <section className="border-b border-lagoon-900/10 bg-white pb-10 pt-8">
        <div className="container-x">
          <nav className="text-xs text-lagoon-900/55" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-lagoon-950">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/logements"
              className="transition hover:text-lagoon-950"
            >
              Nos logements
            </Link>
            <span className="mx-2">/</span>
            <span className="text-lagoon-950">{property.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-lagoon-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-lagoon-800">
                  {property.type}
                </span>
                <span className="rounded-full bg-sand-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sand-800">
                  {property.island}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-lagoon-900/65">
                  <IconPin className="h-3.5 w-3.5" />
                  {property.commune}, Guadeloupe
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-5xl">
                {property.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-lagoon-900/70">
                {property.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-lagoon-900/12 px-4 py-3">
              <IconStar className="h-5 w-5 text-mango-500" />
              <span className="font-display text-xl font-semibold">
                {property.rating.toLocaleString("fr-FR")}
              </span>
              <span className="text-xs text-lagoon-900/55">
                ({property.reviews} avis)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- Galerie ------------------------------ */}
      <section className="container-x py-8">
        <Gallery images={property.gallery} name={property.name} />
      </section>

      {/* ------------------------------- Contenu ------------------------------ */}
      <section className="container-x pb-20">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-lagoon-900/10 bg-white px-4 py-5 text-center"
                >
                  <s.icon className="mx-auto h-6 w-6 text-lagoon-700" />
                  <p className="mt-3 text-xs font-medium leading-snug text-lagoon-900/75">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                Le logement
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-lagoon-900/75">
                {property.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                Les points forts
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-2xl bg-lagoon-900/[0.04] px-4 py-3.5 text-sm text-lagoon-900/80"
                  >
                    <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-palm-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                Équipements
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 text-sm text-lagoon-900/75"
                  >
                    <AmenityIcon
                      name={a}
                      className="h-5 w-5 shrink-0 text-lagoon-700"
                    />
                    {amenityLabels[a]}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Hôte */}
            <Reveal className="mt-12">
              <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lagoon-800 font-display text-2xl font-semibold text-sand-100">
                  {property.host.name.charAt(0)}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-mango-600">
                    Votre hôte
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold">
                    {property.host.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-lagoon-900/70">
                    {property.host.note}
                  </p>
                  <p className="mt-3 text-xs text-lagoon-900/50">
                    Accueille des voyageurs depuis {property.host.since}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Disponibilités */}
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                Disponibilités
              </h2>
              <p className="mt-3 text-sm text-lagoon-900/65">
                Calendrier indicatif des prochaines semaines. Les cases grisées
                sont déjà réservées.
              </p>
              <AvailabilityCalendar booked={property.booked} />
            </Reveal>

            {/* Localisation */}
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                Où se situe {property.name} ?
              </h2>
              <p className="mt-3 text-sm text-lagoon-900/65">
                Repère approximatif sur la carte de l&apos;archipel.
              </p>
              <div className="mt-5">
                <IslandMap activeSlug={property.slug} interactive={false} />
              </div>
            </Reveal>

            {/* À proximité */}
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                À découvrir aux alentours
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {nearby.map((exp) => (
                  <article
                    key={exp.slug}
                    className="overflow-hidden rounded-3xl border border-lagoon-900/10 bg-white"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-mango-600">
                        {exp.duration}
                      </p>
                      <h3 className="mt-1.5 font-display text-base font-semibold">
                        {exp.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-lagoon-900/65">
                        {exp.commune}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <Link
                href="/experiences"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lagoon-800 link-underline"
              >
                Voir toutes les expériences
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* Colonne réservation */}
          <aside>
            <BookingCard property={property} />
          </aside>
        </div>
      </section>

      {/* ------------------------------- Contact ------------------------------ */}
      <section
        id="contact-logement"
        className="scroll-mt-24 border-t border-lagoon-900/10 bg-white py-20"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Demande de devis</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance">
              Une question sur {property.name} ?
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-lagoon-900/70">
              Préremplissez ce formulaire, nous vous répondons sous deux heures
              ouvrées avec une proposition détaillée : disponibilités, tarif
              total, options et conditions d&apos;annulation.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <IconWhatsApp className="h-4 w-4" />
                Écrire à {site.whatsapp.agent}
              </a>
              <p className="text-xs text-lagoon-900/50">
                {site.whatsapp.hours}
              </p>
            </div>
          </div>

          <ContactForm defaultProperty={property.name} />
        </div>
      </section>

      {/* ------------------------------- Autres ------------------------------ */}
      <section className="container-x py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold">
            Nos autres logements
          </h2>
          <Link
            href="/logements"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lagoon-800 link-underline"
          >
            Tout voir
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {others.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Calendrier factice                                                        */
/* ------------------------------------------------------------------------ */

function AvailabilityCalendar({ booked }: { booked: string[] }) {
  const today = new Date();
  const months = [0, 1].map((offset) => {
    const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return (
    <div className="mt-5 grid gap-6 sm:grid-cols-2">
      {months.map(({ year, month }) => {
        const first = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startOffset = (first.getDay() + 6) % 7;
        const label = first.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        });

        return (
          <div
            key={label}
            className="rounded-3xl border border-lagoon-900/10 bg-white p-5"
          >
            <p className="flex items-center gap-2 font-display text-base font-semibold capitalize">
              <IconCalendar className="h-4 w-4 text-lagoon-700" />
              {label}
            </p>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-lagoon-900/40">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: startOffset }).map((_, i) => (
                <span key={`pad-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                  day,
                ).padStart(2, "0")}`;
                const isBooked = booked.includes(iso);
                const isPast = new Date(year, month, day) < new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                );

                return (
                  <span
                    key={iso}
                    className={`flex h-8 items-center justify-center rounded-lg ${
                      isPast
                        ? "text-lagoon-900/20"
                        : isBooked
                          ? "bg-lagoon-900/85 text-white/70 line-through"
                          : "bg-palm-100 text-palm-800"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>

            <p className="mt-4 flex flex-wrap gap-3 text-[10px] text-lagoon-900/55">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-palm-100" />
                Libre
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-lagoon-900/85" />
                Réservé
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
