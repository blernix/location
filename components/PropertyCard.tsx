import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";
import { IconArrowRight, IconBed, IconPin, IconStar, IconUsers } from "./Icons";

const accentRing: Record<Property["accent"], string> = {
  lagoon: "bg-lagoon-700",
  palm: "bg-palm-600",
  mango: "bg-mango-500",
};

export default function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[28px] border border-lagoon-900/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        href={`/logements/${property.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`Découvrir ${property.name}`}
      >
        <Image
          src={property.gallery[0]}
          alt={`${property.name} — ${property.tagline}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lagoon-950/55 via-lagoon-950/5 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-lagoon-900 backdrop-blur">
            {property.type}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white ${accentRing[property.accent]}`}
          >
            {property.island}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="text-white">
            <p className="flex items-center gap-1.5 text-xs font-medium text-white/85">
              <IconPin className="h-3.5 w-3.5" />
              {property.commune}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white">
              {property.name}
            </h3>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-lagoon-900 backdrop-blur">
            <IconStar className="h-3.5 w-3.5 text-mango-500" />
            {property.rating.toLocaleString("fr-FR")}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-lagoon-900/70">
          {property.shortDescription}
        </p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-lagoon-900/65">
          <div className="flex items-center gap-1.5">
            <IconUsers className="h-4 w-4" />
            <dt className="sr-only">Capacité</dt>
            <dd>{property.guests} voyageurs</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <IconBed className="h-4 w-4" />
            <dt className="sr-only">Chambres</dt>
            <dd>
              {property.bedrooms} ch. · {property.beds} lits
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-lagoon-900/10 pt-5">
          <p className="text-sm text-lagoon-900/60">
            <span className="font-display text-xl font-semibold text-lagoon-950">
              {property.pricePerNight} €
            </span>
            <span className="ml-1 text-xs">/ nuit</span>
          </p>
          <Link
            href={`/logements/${property.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-lagoon-800 transition hover:gap-2.5"
          >
            Découvrir
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
