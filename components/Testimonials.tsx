"use client";

import { useState } from "react";
import { testimonials } from "@/data/content";
import { IconArrowLeft, IconArrowRight, IconStar } from "./Icons";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="eyebrow">Ils sont partis avec nous</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
          Des souvenirs qui durent plus longtemps que le hâle
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-lagoon-900/70">
          Plus de 400 séjours accueillis depuis 2017. Ce que nos voyageurs
          retiennent le plus souvent : la vue, la tranquillité, et des hôtes qui
          connaissent vraiment leur île.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lagoon-900/20 text-lagoon-900 transition hover:bg-lagoon-900/5"
            aria-label="Témoignage précédent"
          >
            <IconArrowLeft className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lagoon-900/20 text-lagoon-900 transition hover:bg-lagoon-900/5"
            aria-label="Témoignage suivant"
          >
            <IconArrowRight className="h-4.5 w-4.5" />
          </button>
          <span className="ml-2 text-sm tabular-nums text-lagoon-900/50">
            {index + 1} / {total}
          </span>
        </div>
      </div>

      <figure className="card relative overflow-hidden p-8 sm:p-10">
        <span
          className="pointer-events-none absolute -right-4 -top-8 font-display text-[140px] leading-none text-lagoon-900/[0.06]"
          aria-hidden="true"
        >
          &rdquo;
        </span>

        <div className="flex gap-1 text-mango-500">
          {Array.from({ length: current.rating }).map((_, i) => (
            <IconStar key={i} className="h-4.5 w-4.5" />
          ))}
        </div>

        <blockquote className="mt-6 font-display text-xl leading-relaxed text-lagoon-950 sm:text-2xl">
          {current.text}
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-4 border-t border-lagoon-900/10 pt-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-800 font-display text-lg font-semibold text-sand-100">
            {current.name.charAt(0)}
          </span>
          <span className="text-sm">
            <span className="block font-semibold text-lagoon-950">
              {current.name}
            </span>
            <span className="block text-lagoon-900/60">
              {current.origin} · séjour au {current.stay}
            </span>
          </span>
        </figcaption>

        <div className="mt-8 flex gap-1.5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-lagoon-700" : "w-3 bg-lagoon-900/20"
              }`}
              aria-label={`Voir le témoignage ${i + 1}`}
            />
          ))}
        </div>
      </figure>
    </div>
  );
}
