"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/data/properties";
import { site } from "@/data/site";
import { IconCalendar, IconCheck, IconStar, IconWhatsApp } from "./Icons";

function toDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function eachDay(start: string, end: string) {
  const days: string[] = [];
  if (!start || !end) return days;
  const s = toDate(start);
  const e = toDate(end);
  if (e <= s) return days;
  const cursor = new Date(s);
  while (cursor < e) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function formatEUR(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingCard({ property }: { property: Property }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(Math.min(2, property.guests));

  const { nights, unavailable, total, discount } = useMemo(() => {
    const days = eachDay(arrival, departure);
    const n = days.length;
    const conflict = days.some((d) => property.booked.includes(d));
    const gross = n * property.pricePerNight;
    const disc = n >= 7 ? Math.round(gross * 0.1) : 0;
    const clean = n > 0 ? property.cleaningFee : 0;
    return {
      nights: n,
      unavailable: conflict,
      discount: disc,
      total: gross - disc + clean,
    };
  }, [arrival, departure, property]);

  const tooShort = nights > 0 && nights < property.minNights;
  const valid = nights > 0 && !unavailable && !tooShort;

  const waText = encodeURIComponent(
    `Bonjour ${site.name} ! Je souhaite des informations sur ${property.name}${
      arrival && departure
        ? ` du ${arrival.split("-").reverse().join("/")} au ${departure
            .split("-")
            .reverse()
            .join("/")}`
        : ""
    } (${guests} voyageur${guests > 1 ? "s" : ""}).`,
  );

  return (
    <div className="card sticky top-24 p-6">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="font-display text-3xl font-semibold">
            {property.pricePerNight} €
          </span>
          <span className="ml-1 text-sm text-lagoon-900/60">/ nuit</span>
        </p>
        <span className="flex items-center gap-1 text-sm font-semibold text-lagoon-900">
          <IconStar className="h-4 w-4 text-mango-500" />
          {property.rating.toLocaleString("fr-FR")}
          <span className="font-normal text-lagoon-900/50">
            ({property.reviews})
          </span>
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="bk-arrival">
            Arrivée
          </label>
          <input
            id="bk-arrival"
            type="date"
            className="field px-3 py-2.5 text-xs"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="bk-departure">
            Départ
          </label>
          <input
            id="bk-departure"
            type="date"
            className="field px-3 py-2.5 text-xs"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="label" htmlFor="bk-guests">
            Voyageurs
          </label>
          <select
            id="bk-guests"
            className="field px-3 py-2.5 text-xs"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "voyageurs" : "voyageur"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-5 space-y-2.5 rounded-2xl bg-lagoon-900/5 p-4 text-sm">
          <div className="flex justify-between text-lagoon-900/75">
            <span>
              {formatEUR(property.pricePerNight)} × {nights} nuit
              {nights > 1 ? "s" : ""}
            </span>
            <span>{formatEUR(property.pricePerNight * nights)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between font-medium text-palm-700">
              <span>Remise long séjour (−10 %)</span>
              <span>−{formatEUR(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-lagoon-900/75">
            <span>Frais de ménage</span>
            <span>{formatEUR(property.cleaningFee)}</span>
          </div>
          <div className="flex justify-between border-t border-lagoon-900/10 pt-2.5 font-display text-lg font-semibold">
            <span>Total</span>
            <span>{formatEUR(total)}</span>
          </div>
        </div>
      )}

      {nights > 0 && (
        <p
          className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-xs font-medium ${
            valid
              ? "bg-palm-100 text-palm-800"
              : "bg-mango-100 text-mango-800"
          }`}
        >
          {valid ? (
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <IconCalendar className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>
            {unavailable
              ? "Ces dates chevauchent une réservation existante. Essayez une autre période."
              : tooShort
                ? `Séjour minimum de ${property.minNights} nuits pour ce logement.`
                : "Ces dates sont libres — réservez maintenant, sans commission."}
          </span>
        </p>
      )}

      <div className="mt-5 grid gap-2.5">
        <a
          href={`https://wa.me/${site.whatsapp.number}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full"
        >
          <IconWhatsApp className="h-4 w-4" />
          Réserver via WhatsApp
        </a>
        <a href="#contact-logement" className="btn-outline w-full">
          Demander un devis écrit
        </a>
      </div>

      <ul className="mt-5 space-y-2 text-xs text-lagoon-900/60">
        <li>Ménage final et linge de maison inclus</li>
        <li>Arrivée autonome possible à partir de 16h</li>
        <li>Annulation gratuite jusqu&apos;à 60 jours avant</li>
      </ul>

      <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-lagoon-900/35">
        Tarifs de démonstration · maquette
      </p>
    </div>
  );
}
