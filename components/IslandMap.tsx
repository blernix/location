import Link from "next/link";
import { properties } from "@/data/properties";
import { IconPin } from "./Icons";

const accent: Record<string, string> = {
  lagoon: "bg-lagoon-700",
  palm: "bg-palm-600",
  mango: "bg-mango-500",
};

export default function IslandMap({
  activeSlug,
  interactive = true,
}: {
  activeSlug?: string;
  interactive?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-lagoon-900/10 bg-gradient-to-b from-lagoon-50 via-sand-50 to-lagoon-100 p-6">
      <div className="relative aspect-[4/3] w-full">
        <svg
          viewBox="0 0 100 72"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Carte stylisée de la Guadeloupe"
        >
          <defs>
            <linearGradient id="islandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#57b98c" />
              <stop offset="100%" stopColor="#2f7f6a" />
            </linearGradient>
          </defs>

          {/* Côte sous-le-vent — Basse-Terre */}
          <path
            d="M22 8 C30 6.5 38 12 40 20 C43 29 41 39 35 47 C30 54 22 57 16 52 C9 46 6.5 34 8 24 C9.5 15 15 9.3 22 8 Z"
            fill="url(#islandGrad)"
          />
          {/* Grande-Terre */}
          <path
            d="M44 24 C48 17 57 12 68 12 C80 12 92 17 96 24 C99 30 96 37.5 88 41.5 C78 46.5 64 47.5 54 43.5 C47 40 42 32 44 24 Z"
            fill="url(#islandGrad)"
          />
          {/* Marie-Galante & Les Saintes */}
          <circle cx="52" cy="60" r="3.4" fill="#57b98c" />
          <circle cx="35" cy="63" r="1.7" fill="#57b98c" />
          <circle cx="39" cy="58" r="1.2" fill="#57b98c" />

          {/* Relief de la Soufrière */}
          <circle cx="21" cy="26" r="1.6" fill="#0d4a4b" opacity="0.5" />

          {/* Isthme / Pointe-à-Pitre */}
          <circle cx="42" cy="28" r="1.4" fill="#d6974c" />

          {/* Trait de côte */}
          <path
            d="M22 8 C30 6.5 38 12 40 20 M16 52 C9 46 6.5 34 8 24"
            fill="none"
            stroke="#0d4a4b"
            strokeOpacity="0.15"
            strokeWidth="0.6"
          />
        </svg>

        {/* Repères */}
        <span className="absolute left-[13%] top-[16%] -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-lagoon-900/45">
          Basse-Terre
        </span>
        <span className="absolute left-[72%] top-[16%] -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-lagoon-900/45">
          Grande-Terre
        </span>

        {properties.map((p) => {
          const isActive = activeSlug === p.slug;
          const Pin = (
            <>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white transition ${
                  accent[p.accent]
                } ${isActive ? "scale-110" : ""}`}
              >
                <IconPin className="h-4 w-4" />
              </span>
              <span
                className={`mt-1.5 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-lagoon-950 shadow-md transition ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {p.name}
              </span>
            </>
          );

          const style = { left: `${p.map.x}%`, top: `${p.map.y}%` };

          return interactive ? (
            <Link
              key={p.slug}
              href={`/logements/${p.slug}`}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline-none"
              style={style}
              aria-label={`${p.name} à ${p.commune}`}
            >
              {Pin}
            </Link>
          ) : (
            <span
              key={p.slug}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={style}
            >
              {Pin}
            </span>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-lagoon-900/10 pt-4 text-xs text-lagoon-900/60">
        {properties.map((p) => (
          <span key={p.slug} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${accent[p.accent]}`} />
            {p.name} · {p.commune}
          </span>
        ))}
      </div>
    </div>
  );
}
