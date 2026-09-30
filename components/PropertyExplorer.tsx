"use client";

import { useMemo, useState } from "react";
import { properties, type Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { IconClose } from "./Icons";

type SortKey = "recommande" | "prix-asc" | "prix-desc" | "capacite";

const sorts: { key: SortKey; label: string }[] = [
  { key: "recommande", label: "Recommandés" },
  { key: "prix-asc", label: "Prix croissant" },
  { key: "prix-desc", label: "Prix décroissant" },
  { key: "capacite", label: "Capacité" },
];

const filterDefs: {
  key: keyof Filters;
  label: string;
  test: (p: Property, value: string) => boolean;
}[] = [
  {
    key: "island",
    label: "Île",
    test: (p, v) => p.island === v,
  },
  {
    key: "type",
    label: "Type",
    test: (p, v) => p.type === v,
  },
  {
    key: "guests",
    label: "Capacité minimale",
    test: (p, v) => p.guests >= Number(v),
  },
];

type Filters = {
  island: string;
  type: string;
  guests: string;
};

export default function PropertyExplorer() {
  const [filters, setFilters] = useState<Filters>({
    island: "",
    type: "",
    guests: "",
  });
  const [sort, setSort] = useState<SortKey>("recommande");

  const islands = Array.from(new Set(properties.map((p) => p.island)));
  const types = Array.from(new Set(properties.map((p) => p.type)));

  const activeCount = Object.values(filters).filter(Boolean).length;

  const results = useMemo(() => {
    const list = properties.filter((p) =>
      filterDefs.every((f) => {
        const value = filters[f.key];
        return !value || f.test(p, value);
      }),
    );

    switch (sort) {
      case "prix-asc":
        return [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
      case "prix-desc":
        return [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
      case "capacite":
        return [...list].sort((a, b) => b.guests - a.guests);
      default:
        return list;
    }
  }, [filters, sort]);

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? "" : value }));

  return (
    <div>
      {/* Filtres */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <FilterGroup label="Île">
              {islands.map((island) => (
                <Chip
                  key={island}
                  active={filters.island === island}
                  onClick={() => toggle("island", island)}
                >
                  {island}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Type">
              {types.map((type) => (
                <Chip
                  key={type}
                  active={filters.type === type}
                  onClick={() => toggle("type", type)}
                >
                  {type}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Capacité">
              {["2", "4", "6", "8"].map((n) => (
                <Chip
                  key={n}
                  active={filters.guests === n}
                  onClick={() => toggle("guests", n)}
                >
                  {n}+ pers.
                </Chip>
              ))}
            </FilterGroup>
          </div>

          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() =>
                  setFilters({ island: "", type: "", guests: "" })
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-lagoon-800 hover:text-lagoon-950"
              >
                <IconClose className="h-3.5 w-3.5" />
                Réinitialiser
              </button>
            )}
            <label className="flex items-center gap-2 text-xs text-lagoon-900/60">
              Trier par
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-lagoon-900/15 bg-white px-3 py-2 text-xs font-medium text-lagoon-950 outline-none focus:border-lagoon-600"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-lagoon-900/60">
        <strong className="font-semibold text-lagoon-950">
          {results.length}
        </strong>{" "}
        logement{results.length > 1 ? "s" : ""} correspondant à votre recherche
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property, i) => (
            <PropertyCard
              key={property.slug}
              property={property}
              priority={i === 0}
            />
          ))}
        </div>
      ) : (
        <div className="card mt-6 px-8 py-16 text-center">
          <p className="font-display text-xl font-semibold">
            Aucun logement ne correspond
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-lagoon-900/65">
            Essayez d&apos;élargir vos critères ou écrivez-nous : nous avons
            parfois des disponibilités non publiées.
          </p>
          <button
            type="button"
            onClick={() => setFilters({ island: "", type: "", guests: "" })}
            className="btn-primary mt-6"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-lagoon-900/45">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-lagoon-800 text-white"
          : "border border-lagoon-900/15 bg-white text-lagoon-900/70 hover:border-lagoon-700 hover:text-lagoon-950"
      }`}
    >
      {children}
    </button>
  );
}
