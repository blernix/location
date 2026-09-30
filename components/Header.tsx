"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/site";
import { IconClose, IconMenu, IconPhone, IconWhatsApp } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-lagoon-900/10 bg-sand-50/90 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex min-h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — retour à l'accueil`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lagoon-700 text-lg font-semibold text-sand-100 shadow-soft transition group-hover:bg-lagoon-800">
            T
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold text-lagoon-950">
              {site.name}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-lagoon-900/55">
              Guadeloupe
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-lagoon-900/8 text-lagoon-950"
                  : "text-lagoon-900/70 hover:bg-lagoon-900/5 hover:text-lagoon-950"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="btn-ghost hidden shrink-0 whitespace-nowrap px-3.5 py-2.5 text-[13px] xl:inline-flex"
          >
            <IconPhone className="h-4 w-4" />
            {site.whatsapp.display}
          </a>
          <Link
            href="/contact"
            className="btn-primary shrink-0 whitespace-nowrap px-4 py-2.5 text-[13px]"
          >
            <IconWhatsApp className="h-4 w-4" />
            <span className="hidden xl:inline">Demander un devis</span>
            <span className="xl:hidden">Devis</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lagoon-900/15 bg-white/70 text-lagoon-950 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? (
            <IconClose className="h-5 w-5" />
          ) : (
            <IconMenu className="h-5 w-5" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-lagoon-900/10 bg-sand-50 md:hidden"
        >
          <nav className="container-x flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                  isActive(item.href)
                    ? "bg-lagoon-900/8 text-lagoon-950"
                    : "text-lagoon-900/75 hover:bg-lagoon-900/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn-outline w-full"
              >
                <IconPhone className="h-4 w-4" />
                Appeler {site.whatsapp.display}
              </a>
              <Link href="/contact" className="btn-primary w-full">
                Demander un devis
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
