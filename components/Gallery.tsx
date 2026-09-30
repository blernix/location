"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconClose } from "./Icons";

export default function Gallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setOpenIndex(0);
          }}
          className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-auto"
          aria-label={`Agrandir la photo 1 de ${name}`}
        >
          <Image
            src={images[0]}
            alt={`${name} — vue principale`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-lagoon-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Voir les {images.length} photos
          </span>
        </button>

        {images.slice(1, 5).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setActive(i + 1);
              setOpenIndex(i + 1);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
            aria-label={`Agrandir la photo ${i + 2} de ${name}`}
          >
            <Image
              src={src}
              alt={`${name} — photo ${i + 2}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-lagoon-950/0 transition group-hover:bg-lagoon-950/15" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-lagoon-950/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie photos — ${name}`}
        >
          <div className="flex items-center justify-between px-5 py-4 text-sand-100">
            <p className="text-sm font-medium">
              {name}
              <span className="ml-3 text-sand-100/60">
                {openIndex + 1} / {images.length}
              </span>
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-100/25 transition hover:bg-sand-100/10"
              aria-label="Fermer la galerie"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand-100/10 text-sand-100 transition hover:bg-sand-100/20 sm:left-6"
              aria-label="Photo précédente"
            >
              <IconArrowLeft className="h-5 w-5" />
            </button>

            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={images[openIndex]}
                alt={`${name} — photo ${openIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand-100/10 text-sand-100 transition hover:bg-sand-100/20 sm:right-6"
              aria-label="Photo suivante"
            >
              <IconArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-6">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  i === openIndex
                    ? "border-sand-100"
                    : "border-transparent opacity-55 hover:opacity-100"
                }`}
                aria-label={`Afficher la photo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
