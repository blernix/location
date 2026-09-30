import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { faq } from "@/data/content";
import { site } from "@/data/site";
import { IconArrowRight, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Réservation, paiement, ménage, linge, animaux, arrivée, meilleure saison, annulation : toutes les réponses pour préparer votre séjour en Guadeloupe.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-lagoon-900/10 bg-white pb-14 pt-12">
        <div className="container-x">
          <nav className="text-xs text-lagoon-900/55" aria-label="Fil d'ariane">
            <Link href="/" className="transition hover:text-lagoon-950">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-lagoon-950">FAQ</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Questions fréquentes</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">
              Tout ce qu&apos;il faut savoir avant de réserver
            </h1>
            <p className="mt-5 text-base leading-relaxed text-lagoon-900/75">
              Réservation, paiement, ménage, arrivée, meilleure période,
              annulation : on a essayé de tout couvrir. Si une question reste
              sans réponse, {site.whatsapp.agent} vous répond en direct.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        <Reveal>
          <FaqAccordion items={faq} />
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-8 rounded-[32px] bg-lagoon-900 p-8 text-sand-100 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                Une question qui n&apos;est pas dans la liste ?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sand-100/75">
                Écrivez-nous sur WhatsApp : en général, la réponse arrive en
                moins de dix minutes entre 7h et 21h, heure de Guadeloupe.
              </p>
              <p className="mt-4 text-xs text-sand-100/55">
                {site.whatsapp.hours}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent w-full"
              >
                <IconWhatsApp className="h-4 w-4" />
                Poser ma question
              </a>
              <Link
                href="/contact"
                className="btn w-full border border-sand-100/30 bg-transparent text-sand-100 hover:bg-sand-100/10"
              >
                Formulaire de contact
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
