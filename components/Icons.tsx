import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconWifi(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 8.8a15 15 0 0 1 20 0" />
      <path d="M5.5 12.4a10 10 0 0 1 13 0" />
      <path d="M9 16a5 5 0 0 1 6 0" />
      <circle cx="12" cy="19.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPool(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 15.5c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4" />
      <path d="M3 19.6c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4" />
      <path d="M8 13V4.6a1.6 1.6 0 0 1 3.2 0V13M14.8 13V4.6a1.6 1.6 0 0 1 3.2 0V13" />
    </svg>
  );
}

export function IconSeaView(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M2 17.5c1.8 0 1.8 1.5 3.6 1.5s1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5" />
      <path d="M4.5 13.4l2.2-2.2M19.5 13.4l-2.2-2.2" />
    </svg>
  );
}

export function IconBeach(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21V11" />
      <path d="M12 11c-4.4 0-8-2.2-8-4.6C4 5.5 5 4.5 6.4 4.5c2.9 0 5.6 3 5.6 6.5Z" />
      <path d="M12 11c4.4 0 8-2.2 8-4.6 0-.9-1-1.9-2.4-1.9-2.9 0-5.6 3-5.6 6.5Z" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function IconAc(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v18M3.8 7.5l16.4 9M20.2 7.5l-16.4 9" />
      <path d="M12 3l-2 2M12 3l2 2M12 21l-2-2M12 21l2-2" />
    </svg>
  );
}

export function IconKitchen(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3v7a3 3 0 0 0 6 0V3M9 10v11" />
      <path d="M17 3c-1.4 1.2-2 2.6-2 4.4 0 1.5.7 2.6 2 3.1V21" />
    </svg>
  );
}

export function IconParking(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M9.5 16.5V7.5h3a2.6 2.6 0 0 1 0 5.2h-3" />
    </svg>
  );
}

export function IconTerrace(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10h18L12 3.5 3 10Z" />
      <path d="M5.5 10v10M18.5 10v10M5.5 15h13" />
    </svg>
  );
}

export function IconBbq(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 9h14l-2 5H7L5 9Z" />
      <path d="M8 14l-2 7M16 14l2 7M9 18h6" />
      <path d="M9 6c0-1.2 1-1.6 1-2.6M12 5.6c0-1.2 1-1.6 1-2.6M15 6c0-1.2 1-1.6 1-2.6" />
    </svg>
  );
}

export function IconWasher(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="3.5" />
      <circle cx="12" cy="14" r="4" />
      <path d="M8 6.5h.01M11 6.5h.01" />
    </svg>
  );
}

export function IconCrib(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 8h18v10H3z" />
      <path d="M7 8v10M12 8v10M17 8v10M3 13h18M5 5c1.5 0 1.5 1.2 3 1.2S9.5 5 11 5" />
    </svg>
  );
}

export function IconPets(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="7" cy="9" r="1.8" />
      <circle cx="11" cy="6.5" r="1.8" />
      <circle cx="15.5" cy="8" r="1.8" />
      <circle cx="18.5" cy="11.5" r="1.8" />
      <path d="M8.4 14.6c1.6-1.2 3.6-1.4 5.2-.6 1.4.7 2.1 2 2.6 3.2.5 1.2-.5 2.3-1.8 2.1-1.2-.2-1.9-.7-3-.7s-1.8.5-3 .7c-1.3.2-2.3-.9-1.8-2.1.4-1 .8-1.9 1.8-2.6Z" />
    </svg>
  );
}

export function IconKayak(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 8c4.5 0 13.5 0 18 0" />
      <path d="M6.5 8c2 0 3.5 1.4 5.5 1.4S15.5 8 17.5 8" />
      <path d="M7 14.5l10 3M17 14.5l-10 3" />
    </svg>
  );
}

export function IconSnorkel(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="10" cy="10" r="4" />
      <path d="M13.2 13.2 19 19M17 13c1.5 0 2.5 1 2.5 2.5S18.5 18 17 18" />
      <path d="M6 18c1.6 0 1.6 1.2 3.2 1.2S10.8 18 12.4 18" />
    </svg>
  );
}

export function IconGarden(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21V9" />
      <path d="M12 13c0-3.5 2.6-6 6-6 0 3.5-2.6 6-6 6Z" />
      <path d="M12 16c0-3.5-2.6-6-6-6 0 3.5 2.6 6 6 6Z" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function IconTv(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="12" rx="3" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function IconStar(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4 6.2 20.4l1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}

export function IconUsers(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3 3 0 0 1 0 5.8M18 14.4c2.3.7 4 2.8 4 5.6" />
    </svg>
  );
}

export function IconBed(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 18v-7h13a4 4 0 0 1 4 4v3" />
      <path d="M3 11V6M21 18v-3M3 18h18" />
      <circle cx="7.5" cy="8.5" r="1.6" />
    </svg>
  );
}

export function IconBath(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z" />
      <path d="M6 12V5.6A2.1 2.1 0 0 1 8.1 3.5c1 0 1.8.7 2 1.6" />
      <path d="M7 20.5l-1 1.5M17 20.5l1 1.5" />
    </svg>
  );
}

export function IconRuler(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="8" width="19" height="8" rx="2" transform="rotate(-12 12 12)" />
      <path d="M7 9.2v3M11 8.4v2M15 7.5v3M19 6.7v2" />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconCalendar(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="16" rx="3.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}

export function IconArrowLeft(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 12H4M10.5 5.5 4 12l6.5 6.5" />
    </svg>
  );
}

export function IconChevron(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 9.5 12 15.5 18 9.5" />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M15 3.5h-2.2A3.3 3.3 0 0 0 9.5 6.8V9.5H7v3h2.5V21h3.2v-8.5h2.4l.6-3h-3V7.2c0-.5.4-.9.9-.9H15V3.5Z" />
    </svg>
  );
}

export function IconWhatsApp(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.55 3.74 1.5 5.26L2 22l5.04-1.66a9.8 9.8 0 0 0 5 1.36h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.36 5.68c0 4.44-3.61 8.05-8.06 8.05a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.05 1 1.02-2.97-.19-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.44 3.61-8.05 8.05-8.05Zm-2.6 4.1c-.13 0-.33.05-.5.24-.18.19-.66.65-.66 1.58s.68 1.83.77 1.96c.1.12 1.32 2.02 3.2 2.83.45.2.8.31 1.07.4.45.14.86.12 1.18.07.36-.05 1.11-.45 1.27-.9.16-.44.16-.82.11-.9-.05-.08-.18-.13-.33-.2-.15-.08-1.11-.55-1.28-.61-.17-.06-.3-.09-.42.09-.13.19-.49.61-.6.74-.11.13-.22.15-.4.05-.19-.09-.79-.29-1.5-.93-.56-.5-.93-1.11-1.04-1.3-.11-.19-.01-.29.08-.38.08-.09.19-.22.28-.33.09-.11.12-.19.19-.31.06-.13.03-.24-.02-.33-.05-.1-.42-1.03-.58-1.4-.15-.35-.3-.36-.42-.37h-.37Z" />
    </svg>
  );
}

export function IconCompass(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 2.5v6c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5v-6L12 3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

export function IconClock(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function IconHeart(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.6 12 20 12 20Z" />
    </svg>
  );
}
