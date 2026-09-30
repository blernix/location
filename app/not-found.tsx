import Link from "next/link";
import { properties } from "@/data/properties";
import { IconArrowRight, IconCompass } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lagoon-100 text-lagoon-800">
        <IconCompass className="h-7 w-7" />
      </span>
      <p className="eyebrow mt-6">Erreur 404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">
        Cette page a pris le large
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-lagoon-900/70">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenez
        au catalogue, il y a de quoi faire.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/logements" className="btn-outline">
          Voir les logements
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {properties.map((p) => (
          <Link
            key={p.slug}
            href={`/logements/${p.slug}`}
            className="rounded-2xl border border-lagoon-900/10 bg-white px-4 py-3 text-sm font-medium text-lagoon-900/80 transition hover:border-lagoon-700 hover:text-lagoon-950"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
