import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { faq } from "@/data/content";
import { site } from "@/data/site";
import {
  IconClock,
  IconCompass,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & devis",
  description:
    "Demandez un devis gratuit pour votre séjour en Guadeloupe. Réponse sous 2 heures ouvrées par WhatsApp, téléphone ou e-mail.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-lagoon-900/10 bg-white pb-14 pt-12">
        <div className="container-x">
          <nav className="text-xs text-lagoon-900/55" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-lagoon-950">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-lagoon-950">Contact</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Contact &amp; devis</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">
              Parlons de votre séjour en Guadeloupe
            </h1>
            <p className="mt-5 text-base leading-relaxed text-lagoon-900/75">
              Remplissez le formulaire ou écrivez-nous directement : nous
              répondons sous deux heures ouvrées, avec une proposition chiffrée
              et des conseils personnalisés. Aucune commission, aucun engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="space-y-6">
            {/* WhatsApp mis en avant */}
            <div className="card overflow-hidden">
              <div className="bg-[#075E54] px-6 py-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                  Le plus rapide
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  WhatsApp direct
                </h2>
                <p className="mt-2 text-sm text-white/75">
                  {site.whatsapp.agent}, {site.whatsapp.agentRole}
                </p>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-lagoon-900/70">
                  Idéal pour les questions rapides, les photos en direct et les
                  disponibilités de dernière minute.
                </p>
                <a
                  href={`https://wa.me/${site.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-5 w-full bg-[#25D366] text-white hover:brightness-95"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Ouvrir WhatsApp
                </a>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-lagoon-900/50">
                  <IconClock className="h-3.5 w-3.5" />
                  {site.whatsapp.hours}
                </p>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold">
                Nos coordonnées
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-4 text-lagoon-900/75 transition hover:text-lagoon-950"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lagoon-100 text-lagoon-800">
                      <IconPhone className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block font-medium text-lagoon-950">
                        Téléphone
                      </span>
                      {site.whatsapp.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-4 text-lagoon-900/75 transition hover:text-lagoon-950"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lagoon-100 text-lagoon-800">
                      <IconMail className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block font-medium text-lagoon-950">
                        E-mail
                      </span>
                      {site.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 text-lagoon-900/75">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lagoon-100 text-lagoon-800">
                    <IconPin className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-medium text-lagoon-950">
                      Adresse
                    </span>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.country}
                  </span>
                </li>
                <li className="flex items-start gap-4 text-lagoon-900/75">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lagoon-100 text-lagoon-800">
                    <IconCompass className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-medium text-lagoon-950">
                      Sur place
                    </span>
                    Basse-Terre &amp; Grande-Terre
                  </span>
                </li>
              </ul>
            </div>

            {/* Carte stylisée */}
            <div className="relative overflow-hidden rounded-3xl border border-lagoon-900/10 bg-lagoon-100">
              <svg
                viewBox="0 0 100 72"
                className="h-full w-full"
                role="img"
                aria-label="Emplacement du bureau à Pointe-à-Pitre"
              >
                <rect width="100" height="72" fill="#dff6f3" />
                <path
                  d="M22 8 C30 6.5 38 12 40 20 C43 29 41 39 35 47 C30 54 22 57 16 52 C9 46 6.5 34 8 24 C9.5 15 15 9.3 22 8 Z"
                  fill="#57b98c"
                />
                <path
                  d="M44 24 C48 17 57 12 68 12 C80 12 92 17 96 24 C99 30 96 37.5 88 41.5 C78 46.5 64 47.5 54 43.5 C47 40 42 32 44 24 Z"
                  fill="#57b98c"
                />
                <circle cx="42" cy="28" r="2.4" fill="#d6974c" />
                <circle
                  cx="42"
                  cy="28"
                  r="5"
                  fill="none"
                  stroke="#d6974c"
                  strokeWidth="0.8"
                />
              </svg>
              <div className="absolute bottom-3 left-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow-card">
                <p className="text-xs font-semibold text-lagoon-950">
                  Bureau d&apos;accueil
                </p>
                <p className="text-[11px] text-lagoon-900/60">
                  Pointe-à-Pitre, Guadeloupe
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="font-display text-2xl font-semibold">
            Questions les plus posées
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {faq.slice(0, 3).map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-lagoon-900/10 bg-sand-50 p-6"
              >
                <h3 className="font-medium text-lagoon-950">{item.question}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-lagoon-900/70">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-8 inline-flex text-sm font-semibold text-lagoon-800 link-underline"
          >
            Voir toute la FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
