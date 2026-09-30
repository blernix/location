"use client";

import { useState } from "react";
import { IconChevron } from "./Icons";

export type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({
  items,
  showFilters = true,
}: {
  items: FaqItem[];
  showFilters?: boolean;
}) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [filter, setFilter] = useState<string>("Tout");
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);

  const visible =
    filter === "Tout" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {["Tout", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === c
                  ? "bg-lagoon-800 text-white"
                  : "border border-lagoon-900/15 bg-white text-lagoon-900/70 hover:border-lagoon-700 hover:text-lagoon-950"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-lagoon-900/10 overflow-hidden rounded-3xl border border-lagoon-900/10 bg-white">
        {visible.map((item) => {
          const isOpen = open === item.question;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.question)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-lagoon-900/[0.03]"
                aria-expanded={isOpen}
              >
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-mango-600">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-medium text-lagoon-950">
                    {item.question}
                  </span>
                </span>
                <IconChevron
                  className={`h-5 w-5 shrink-0 text-lagoon-800 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-lagoon-900/70">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
