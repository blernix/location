import Link from "next/link";
import { navigation, site } from "@/data/site";
import { properties } from "@/data/properties";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "./Icons";

export default function Footer() {
  return (
    <footer className="mt-16 bg-lagoon-950 text-sand-100">
      <div className="container-x py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-100 text-base font-semibold text-lagoon-900">
                T
              </span>
              <span className="font-display text-lg font-semibold">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-sand-100/65">
              {site.baseline}. Trois logements sélectionnés à la main, entre la
              côte sous-le-vent de Basse-Terre et les plages de Grande-Terre.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={`https://instagram.com/${site.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand-100/20 text-sand-100/80 transition hover:border-sand-100/50 hover:text-sand-100"
                aria-label="Instagram"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand-100/20 text-sand-100/80 transition hover:border-sand-100/50 hover:text-sand-100"
                aria-label="Facebook"
              >
                <IconFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/50">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sand-100/75 transition hover:text-sand-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/50">
              Nos logements
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {properties.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/logements/${p.slug}`}
                    className="text-sand-100/75 transition hover:text-sand-100"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/experiences"
                  className="text-sand-100/75 transition hover:text-sand-100"
                >
                  Nos coups de cœur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/50">
              Nous joindre
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sand-100/75 transition hover:text-sand-100"
                >
                  <IconWhatsApp className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#25D366]" />
                  <span>
                    WhatsApp
                    <span className="block text-sand-100/50">
                      {site.whatsapp.display}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-sand-100/75 transition hover:text-sand-100"
                >
                  <IconPhone className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                  <span>{site.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 text-sand-100/75 transition hover:text-sand-100"
                >
                  <IconMail className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sand-100/75">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-sand-100/12 pt-6 text-xs text-sand-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="transition hover:text-sand-100">
              Mentions légales
            </Link>
            <Link href="/faq" className="transition hover:text-sand-100">
              Conditions de réservation
            </Link>
            <span className="rounded-full bg-mango-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mango-200">
              Maquette de démonstration
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
