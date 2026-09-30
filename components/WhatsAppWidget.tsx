"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { quickReplies, site } from "@/data/site";
import { IconClose, IconWhatsApp } from "./Icons";

type ChatMessage = {
  id: number;
  from: "them" | "me";
  text: string;
  time: string;
};

const now = () =>
  new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const openingScript: Omit<ChatMessage, "id" | "time">[] = [
  {
    from: "them",
    text: `Bonjour 👋 Ici ${site.whatsapp.agent} de ${site.name}. Une question sur un logement, une date ou un devis ?`,
  },
  {
    from: "them",
    text: "Dites-moi ce que vous cherchez : nombre de personnes, dates et région souhaitée 🌴",
  },
];

const answers: Record<string, string> = {
  "Voir les disponibilités":
    "Voici nos disponibilités à jour : Villa Flamboyant libre du 2 au 12 mars, Bungalow Lagon libre à partir du 6 mars, et Appartement Marina quasiment tout le mois 🌴 Je vous ouvre un calendrier ?",
  "Demander un devis":
    "Avec plaisir ! Indiquez-moi vos dates et le nombre de personnes, je vous prépare un devis détaillé sous 2 h (sans commission, prix direct).",
  "Un logement pour 6 personnes":
    "Pour 6 personnes, je recommande la Villa Flamboyant à Deshaies : 4 chambres, piscine et vue sur les îlets. 260 €/nuit. Vous voulez que je vérifie vos dates ?",
  "Comment réserver ?":
    "C'est simple : 30 % d'acompte valide la réservation, le solde 30 jours avant l'arrivée. Contrat et paiement sécurisé, tout est envoyé par e-mail 📩",
  default:
    "Merci ! Je transmets à l'équipe, on vous répond avec une proposition détaillée sous 2 h 🌺",
};

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);

  /* Apparition différée du bouton flottant */
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  const push = useCallback(
    (from: ChatMessage["from"], text: string) => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, from, text, time: now() },
      ]);
    },
    [],
  );

  /* Déroulé du message d'accueil à la première ouverture */
  useEffect(() => {
    if (!open || started) return;
    setStarted(true);

    let cancelled = false;
    const timers: number[] = [];

    const run = async () => {
      await wait(650);
      if (cancelled) return;
      setTyping(true);
      await wait(900);
      if (cancelled) return;
      setTyping(false);
      push(openingScript[0].from, openingScript[0].text);
      await wait(700);
      if (cancelled) return;
      setTyping(true);
      await wait(1100);
      if (cancelled) return;
      setTyping(false);
      push(openingScript[1].from, openingScript[1].text);
    };

    void run();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [open, started, push]);

  /* Autoscroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleQuickReply = useCallback(
    (label: string) => {
      push("me", label);
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        push("them", answers[label] ?? answers.default);
      }, 1300);
    },
    [push],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const value = draft.trim();
      if (!value) return;
      push("me", value);
      setDraft("");
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        push(
          "them",
          "Bien reçu ✅ Je regarde ça tout de suite et je reviens vers vous avec une proposition détaillée.",
        );
      }, 1400);
    },
    [draft, push],
  );

  const waLink = useMemo(() => {
    const text = encodeURIComponent(
      `Bonjour ${site.name} ! Je vous contacte depuis votre site à propos d'une location en Guadeloupe.`,
    );
    return `https://wa.me/${site.whatsapp.number}?text=${text}`;
  }, []);

  return (
    <>
      {/* Panneau de discussion */}
      <div
        className={`fixed bottom-24 right-4 z-[60] w-[min(92vw,380px)] origin-bottom-right transition-all duration-300 sm:right-6 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="Discussion WhatsApp"
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-[26px] border border-lagoon-900/10 bg-white shadow-[0_30px_80px_-20px_rgba(0,43,45,0.45)]">
          {/* En-tête */}
          <div className="relative bg-[#075E54] px-4 pb-4 pt-4 text-white">
            <div className="flex items-center gap-3">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-lg font-semibold">
                {site.whatsapp.agent.charAt(0)}
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold leading-tight">
                  {site.name}
                </p>
                <p className="truncate text-xs text-white/75">
                  {typing ? "en train d'écrire…" : "En ligne"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                aria-label="Fermer la discussion"
              >
                <IconClose className="h-4.5 w-4.5" />
              </button>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/70">
              {site.whatsapp.agent} · {site.whatsapp.agentRole} —{" "}
              {site.whatsapp.hours}
            </p>
          </div>

          {/* Fil de discussion */}
          <div
            ref={scrollRef}
            className="grain h-[320px] space-y-2.5 overflow-y-auto bg-[#ECE5DD] px-3.5 py-4"
          >
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}

            {typing && (
              <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-lagoon-900/40"
                    style={{ animationDelay: `${i * 140}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Réponses rapides */}
          <div className="flex flex-wrap gap-1.5 border-t border-black/5 bg-white px-3 pt-3">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => handleQuickReply(reply)}
                className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-[11px] font-semibold text-[#075E54] transition hover:bg-[#25D366]/20"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Saisie */}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-white px-3 py-3"
          >
            <label className="sr-only" htmlFor="wa-input">
              Votre message
            </label>
            <textarea
              id="wa-input"
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Écrivez votre message…"
              className="max-h-24 min-h-[44px] w-full resize-none rounded-2xl bg-lagoon-900/5 px-4 py-3 text-sm outline-none placeholder:text-lagoon-900/40 focus:bg-lagoon-900/8"
            />
            <button
              type="submit"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-95 disabled:opacity-50"
              disabled={!draft.trim()}
              aria-label="Envoyer"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M3.4 20.6 21 12 3.4 3.4l3 8.1 9.1.5-9.1.5-3 8.1Z" />
              </svg>
            </button>
          </form>

          <div className="border-t border-black/5 bg-white px-3 py-2.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/12 px-4 py-2.5 text-xs font-semibold text-[#075E54] transition hover:bg-[#25D366]/20"
            >
              <IconWhatsApp className="h-4 w-4 text-[#25D366]" />
              Continuer la discussion sur WhatsApp
            </a>
            <p className="mt-1.5 text-center text-[10px] text-lagoon-900/45">
              Maquette de démonstration — conversation simulée
            </p>
          </div>
        </div>
      </div>

      {/* Bouton flottant */}
      <div
        className={`fixed bottom-5 right-4 z-[60] transition-all duration-500 sm:right-6 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group relative inline-flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-5 text-sm font-semibold text-white shadow-[0_18px_45px_-12px_rgba(37,211,102,0.9)] transition hover:brightness-95"
          aria-label={
            open ? "Fermer la discussion WhatsApp" : "Ouvrir la discussion WhatsApp"
          }
        >
          {!open && (
            <span
              className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/60"
              aria-hidden="true"
            />
          )}
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconWhatsApp className="h-5.5 w-5.5" />
            )}
          </span>
          <span className="relative hidden sm:block">
            {open ? "Fermer" : "Discuter avec nous"}
          </span>
          {!open && !started && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mango-500 text-[10px] font-bold text-white ring-2 ring-sand-50">
              1
            </span>
          )}
        </button>
      </div>
    </>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isMe = message.from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
          isMe
            ? "rounded-br-sm bg-[#DCF8C6] text-lagoon-950"
            : "rounded-bl-sm bg-white text-lagoon-950"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className="mt-1 block text-right text-[10px] text-lagoon-900/45">
          {message.time}
          {isMe && (
            <span className="ml-1 text-[#34B7F1]" aria-label="envoyé">
              ✓✓
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
