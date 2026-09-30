"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { properties } from "@/data/properties";
import { IconCalendar, IconPin, IconUsers } from "./Icons";

export default function SearchBar() {
  const router = useRouter();
  const [guests, setGuests] = useState("2");
  const [zone, setZone] = useState("Toutes les zones");

  const zones = Array.from(
    new Set(properties.map((p) => `${p.island} — ${p.commune}`)),
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/logements");
      }}
      className="grid gap-1.5 rounded-[20px] border border-white/40 bg-white/85 p-1.5 shadow-soft backdrop-blur-xl sm:grid-cols-[1.1fr_1fr_0.8fr_auto] sm:rounded-full"
    >
      <div className="flex items-center gap-2.5 rounded-full px-3.5 py-2">
        <IconPin className="h-4 w-4 shrink-0 text-lagoon-700" />
        <label className="min-w-0 flex-1">
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-lagoon-900/50">
            Destination
          </span>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-lagoon-950 outline-none"
          >
            <option>Toutes les zones</option>
            {zones.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-2.5 rounded-full px-3.5 py-2 sm:border-l sm:border-lagoon-900/10">
        <IconCalendar className="h-4 w-4 shrink-0 text-lagoon-700" />
        <label className="min-w-0 flex-1">
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-lagoon-900/50">
            Arrivée
          </span>
          <input
            type="date"
            className="w-full bg-transparent text-xs font-medium text-lagoon-950 outline-none"
          />
        </label>
      </div>

      <div className="flex items-center gap-2.5 rounded-full px-3.5 py-2 sm:border-l sm:border-lagoon-900/10">
        <IconUsers className="h-4 w-4 shrink-0 text-lagoon-700" />
        <label className="min-w-0 flex-1">
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-lagoon-900/50">
            Voyageurs
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-lagoon-950 outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "personnes" : "personne"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-700 px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-lagoon-800 sm:w-auto"
      >
        Rechercher
      </button>
    </form>
  );
}
