"use client";

import { useState } from "react";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import { IconCheck, IconWhatsApp } from "./Icons";

type Status = "idle" | "sending" | "sent";

const budgets = [
  "< 100 € / nuit",
  "100 – 180 € / nuit",
  "180 – 280 € / nuit",
  "> 280 € / nuit",
];

export default function ContactForm({
  defaultProperty,
  compact = false,
}: {
  defaultProperty?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    property: defaultProperty ?? "",
    arrival: "",
    departure: "",
    guests: "2",
    budget: budgets[1],
    message: "",
    consent: false,
  });

  const set = (key: keyof typeof values, value: string | boolean) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Adresse e-mail invalide.";
    if (!values.message.trim() || values.message.trim().length < 10)
      next.message = "Dites-nous en un peu plus (10 caractères minimum).";
    if (!values.consent)
      next.consent = "Merci d'accepter que nous vous recontactions.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    /* Maquette : aucun envoi réel. Simulation de latence réseau. */
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-center px-8 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-palm-100 text-palm-700">
          <IconCheck className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold">
          Demande envoyée, merci {values.name.split(" ")[0]} !
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-lagoon-900/70">
          Nous vous répondons sous 2 heures ouvrées avec une proposition
          détaillée pour vos dates. En attendant, n&apos;hésitez pas à nous
          écrire directement sur WhatsApp.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${site.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <IconWhatsApp className="h-4 w-4" />
            Discuter sur WhatsApp
          </a>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setStatus("idle");
              setValues((v) => ({ ...v, message: "", consent: false }));
            }}
          >
            Envoyer une autre demande
          </button>
        </div>
        <p className="mt-6 text-xs text-lagoon-900/45">
          Démonstration : aucune donnée n&apos;a réellement été transmise.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cf-name">
            Nom et prénom *
          </label>
          <input
            id="cf-name"
            className="field"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-mango-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="cf-email">
            E-mail *
          </label>
          <input
            id="cf-email"
            type="email"
            className="field"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-mango-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="cf-phone">
            Téléphone / WhatsApp
          </label>
          <input
            id="cf-phone"
            type="tel"
            className="field"
            placeholder="+33 6 12 34 56 78"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="label" htmlFor="cf-property">
            Logement souhaité
          </label>
          <select
            id="cf-property"
            className="field"
            value={values.property}
            onChange={(e) => set("property", e.target.value)}
          >
            <option value="">Je ne sais pas encore</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} — {p.commune}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label className="label" htmlFor="cf-arrival">
                  Arrivée
                </label>
                <input
                  id="cf-arrival"
                  type="date"
                  className="field"
                  value={values.arrival}
                  onChange={(e) => set("arrival", e.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="cf-departure">
                  Départ
                </label>
                <input
                  id="cf-departure"
                  type="date"
                  className="field"
                  value={values.departure}
                  onChange={(e) => set("departure", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="cf-guests">
                Voyageurs
              </label>
              <select
                id="cf-guests"
                className="field"
                value={values.guests}
                onChange={(e) => set("guests", e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n > 1 ? "personnes" : "personne"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="cf-budget">
                Budget par nuit
              </label>
              <select
                id="cf-budget"
                className="field"
                value={values.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className="label" htmlFor="cf-message">
            Votre projet *
          </label>
          <textarea
            id="cf-message"
            rows={compact ? 3 : 5}
            className="field resize-none"
            placeholder="Parlez-nous de votre séjour : dates, occasions, envies, questions…"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-medium text-mango-700">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-lagoon-900/70">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-lagoon-900/30 text-lagoon-700 focus:ring-lagoon-500"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          J&apos;accepte que {site.name} me recontacte au sujet de ma demande.
          Aucune donnée n&apos;est cédée à des tiers.
        </span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-xs font-medium text-mango-700">
          {errors.consent}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
        <p className="text-xs text-lagoon-900/50">
          Réponse sous 2 h ouvrées · sans engagement
        </p>
      </div>
    </form>
  );
}
