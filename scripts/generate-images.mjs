/**
 * Generateur d'illustrations SVG pour la maquette Ti Kaz Kreyol.
 *
 * Toutes les scenes representent des paysages de Guadeloupe (lagon, Soufriere,
 * cascade aux Ecrevisses, marche creole, reserve Cousteau, distilleries...).
 * Ce sont des illustrations vectorielles originales, sans aucune photo tierce.
 *
 * Usage : npm run images
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

let seed = 1;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
const between = (a, b) => a + rnd() * (b - a);
const round = (n) => Math.round(n * 100) / 100;

function ridge(w, h, baseY, amp, points = 7, jag = 0.5) {
  let d = `M 0 ${round(h)} L 0 ${round(baseY)}`;
  const step = w / points;
  for (let i = 1; i <= points; i++) {
    const x = i * step;
    const peak = baseY - amp * between(0.45, 1);
    const cx = x - step / 2;
    const cy = baseY - amp * between(0.1, jag);
    d += ` Q ${round(cx)} ${round(cy)} ${round(x)} ${round(baseY - amp * between(0, 0.22))}`;
    if (i < points) d += ` Q ${round(cx + step)} ${round(peak + amp * 0.3)} ${round(x)} ${round(baseY - amp * between(0.15, 0.4))}`;
  }
  d += ` L ${round(w)} ${round(h)} Z`;
  return d;
}

function clouds(w, y, count, opacity) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = between(w * 0.05, w * 0.95);
    const s = between(0.6, 1.7);
    const o = opacity * between(0.5, 1);
    out += `<g opacity="${round(o)}" transform="translate(${round(x)} ${round(y + between(-40, 40))}) scale(${round(s)})">
      <ellipse cx="0" cy="0" rx="90" ry="26" fill="#ffffff"/>
      <ellipse cx="-55" cy="8" rx="60" ry="20" fill="#ffffff"/>
      <ellipse cx="58" cy="6" rx="66" ry="22" fill="#ffffff"/>
      <ellipse cx="10" cy="-16" rx="54" ry="24" fill="#ffffff"/>
    </g>`;
  }
  return out;
}

function frond(ox, oy, len, angle, droop, width) {
  const ax = Math.cos(angle);
  const ay = Math.sin(angle);
  const tx = ox + ax * len;
  const ty = oy + ay * len + droop;
  const cx = ox + ax * len * 0.5;
  const cy = oy + ay * len * 0.5 + droop * 0.25;
  const px = -ay;
  const py = ax;
  const cx2 = cx + px * width;
  const cy2 = cy + py * width;
  return `M ${round(ox)} ${round(oy)} Q ${round(cx)} ${round(cy)} ${round(tx)} ${round(ty)} Q ${round(cx2)} ${round(cy2)} ${round(ox)} ${round(oy)} Z`;
}

function palm(x, groundY, scale, lean, colors, coconuts = true) {
  const h = 300 * scale;
  const topX = x + lean * 90 * scale;
  const topY = groundY - h;
  const ctrlX = x + lean * 34 * scale;
  const ctrlY = groundY - h * 0.55;

  let out = `<g>
    <path d="M ${round(x - 8 * scale)} ${round(groundY)} Q ${round(ctrlX - 6 * scale)} ${round(ctrlY)} ${round(topX - 6 * scale)} ${round(topY)} L ${round(topX + 6 * scale)} ${round(topY)} Q ${round(ctrlX + 7 * scale)} ${round(ctrlY)} ${round(x + 9 * scale)} ${round(groundY)} Z" fill="${colors.trunk}"/>
    <path d="M ${round(x - 8 * scale)} ${round(groundY)} Q ${round(ctrlX - 6 * scale)} ${round(ctrlY)} ${round(topX - 6 * scale)} ${round(topY)}" stroke="${colors.trunkShade}" stroke-width="${round(2.4 * scale)}" fill="none" opacity="0.55"/>`;

  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (-Math.PI * 0.06) + (Math.PI * 1.12 * i) / (n - 1);
    const len = (150 + (i % 3) * 26) * scale;
    const ang = a + Math.PI;
    out += `<path d="${frond(topX, topY, len, ang, 34 * scale, 20 * scale)}" fill="${i % 2 ? colors.leaf : colors.leafDark}" opacity="0.96"/>`;
  }
  if (coconuts) {
    out += `<circle cx="${round(topX - 11 * scale)}" cy="${round(topY + 15 * scale)}" r="${round(8 * scale)}" fill="#7c4a24"/>
      <circle cx="${round(topX + 10 * scale)}" cy="${round(topY + 20 * scale)}" r="${round(7 * scale)}" fill="#8d5628"/>`;
  }
  out += "</g>";
  return out;
}

function waves(w, y0, y1, count, color, opacity) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const y = between(y0, y1);
    const x = between(0, w * 0.8);
    const len = between(40, 170);
    out += `<path d="M ${round(x)} ${round(y)} q ${round(len / 2)} ${round(-6 - rnd() * 8)} ${round(len)} 0" stroke="${color}" stroke-width="${round(1.5 + rnd() * 2)}" fill="none" stroke-linecap="round" opacity="${round(opacity * between(0.4, 1))}"/>`;
  }
  return out;
}

function glitter(w, y0, y1, color) {
  let out = "";
  for (let i = 0; i < 90; i++) {
    const y = between(y0, y1);
    const x = between(0, w);
    const r = between(0.8, 3.4) * ((y - y0) / Math.max(1, y1 - y0) + 0.4);
    out += `<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${color}" opacity="${round(between(0.15, 0.7))}"/>`;
  }
  return out;
}

function birds(w, y) {
  let out = "";
  for (let i = 0; i < 4; i++) {
    const x = between(w * 0.1, w * 0.9);
    const yy = y + between(-60, 60);
    const s = between(0.6, 1.3);
    out += `<path d="M ${round(x - 18 * s)} ${round(yy)} q ${round(9 * s)} ${round(-10 * s)} ${round(18 * s)} 0 q ${round(9 * s)} ${round(-10 * s)} ${round(18 * s)} 0" stroke="#33475a" stroke-width="${round(2.4 * s)}" fill="none" stroke-linecap="round" opacity="0.5"/>`;
  }
  return out;
}

function creoleHouse(x, y, scale, body, roof, accent) {
  const w = 260 * scale;
  const h = 150 * scale;
  const roofH = 90 * scale;
  return `<g transform="translate(${round(x)} ${round(y)})">
    <rect x="${round(-w / 2)}" y="${round(-h)}" width="${round(w)}" height="${round(h)}" rx="${round(8 * scale)}" fill="${body}"/>
    <path d="M ${round(-w / 2 - 24 * scale)} ${round(-h)} L 0 ${round(-h - roofH)} L ${round(w / 2 + 24 * scale)} ${round(-h)} Z" fill="${roof}"/>
    <rect x="${round(-26 * scale)}" y="${round(-92 * scale)}" width="${round(52 * scale)}" height="${round(92 * scale)}" rx="${round(4 * scale)}" fill="${accent}"/>
    <rect x="${round(-w / 2 + 22 * scale)}" y="${round(-h + 30 * scale)}" width="${round(48 * scale)}" height="${round(46 * scale)}" rx="${round(4 * scale)}" fill="#bfe9f5" opacity="0.9"/>
    <rect x="${round(w / 2 - 70 * scale)}" y="${round(-h + 30 * scale)}" width="${round(48 * scale)}" height="${round(46 * scale)}" rx="${round(4 * scale)}" fill="#bfe9f5" opacity="0.9"/>
    <rect x="${round(-w / 2 - 30 * scale)}" y="${round(-6 * scale)}" width="${round(w + 60 * scale)}" height="${round(10 * scale)}" rx="${round(4 * scale)}" fill="${roof}" opacity="0.85"/>
  </g>`;
}

function boat(x, y, scale, color, sail) {
  return `<g transform="translate(${round(x)} ${round(y)}) scale(${round(scale)})">
    <path d="M -46 0 Q 0 26 46 0 L 34 0 Z" fill="${color}"/>
    <rect x="-2" y="-96" width="4" height="96" fill="#5b4636"/>
    <path d="M 2 -92 L 62 -8 L 2 -8 Z" fill="${sail}"/>
    <path d="M -2 -70 L -44 -8 L -2 -8 Z" fill="#ffffff" opacity="0.92"/>
  </g>`;
}

function hammock(x, y, scale, color) {
  return `<g transform="translate(${round(x)} ${round(y)}) scale(${round(scale)})">
    <path d="M -70 -60 Q 0 10 70 -60" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M -66 -52 Q 0 12 66 -52" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7"/>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* Moteur de scene                                                     */
/* ------------------------------------------------------------------ */

const PALETTES = {
  day: {
    sky: ["#5fc8ee", "#a9e5f8", "#e6f8ff"],
    sun: "#fff8c9",
    sunGlow: "#ffe9a8",
    sea: ["#17b6c4", "#0a7d8c", "#04545f"],
    sand: ["#f6e6c4", "#e8cf9c"],
    hills: ["#2f7f6a", "#3f9d78", "#57b98c"],
    leaf: "#2f8f45",
    leafDark: "#1f6b32",
    trunk: "#8a6034",
    trunkShade: "#5e3f20",
    cloud: 0.7,
    glitter: "#ffffff",
    sunY: 0.34,
    sunX: 0.72,
  },
  sunset: {
    sky: ["#f79d5c", "#f76b52", "#fbbd7d"],
    sun: "#fff2b8",
    sunGlow: "#ffd27a",
    sea: ["#e2805f", "#a84a52", "#5d2b40"],
    sand: ["#e9c79a", "#d3a878"],
    hills: ["#5b3b62", "#6d4a6b", "#815a72"],
    leaf: "#2a5f4a",
    leafDark: "#1b4335",
    trunk: "#6d4a2c",
    trunkShade: "#4a3018",
    cloud: 0.5,
    glitter: "#ffe6b8",
    sunY: 0.42,
    sunX: 0.32,
  },
  morning: {
    sky: ["#9fd8f2", "#cfeefb", "#fdf6e8"],
    sun: "#fffbe0",
    sunGlow: "#ffeec2",
    sea: ["#35c3c9", "#128b96", "#0a5b66"],
    sand: ["#f8ecd2", "#ecd8ae"],
    hills: ["#3c8f74", "#4fa882", "#69c096"],
    leaf: "#37974c",
    leafDark: "#256e36",
    trunk: "#8f6538",
    trunkShade: "#634324",
    cloud: 0.85,
    glitter: "#ffffff",
    sunY: 0.2,
    sunX: 0.2,
  },
  dusk: {
    sky: ["#1d3b63", "#3a6485", "#e6a274"],
    sun: "#ffd9a0",
    sunGlow: "#f0a878",
    sea: ["#2c5b78", "#1e3f5c", "#12283d"],
    sand: ["#c9b18c", "#a68f6c"],
    hills: ["#20364f", "#2a4560", "#35526d"],
    leaf: "#1d4a3c",
    leafDark: "#123229",
    trunk: "#54391f",
    trunkShade: "#38240f",
    cloud: 0.35,
    glitter: "#ffe9c4",
    sunY: 0.5,
    sunX: 0.8,
  },
};

function scene({ w = 1600, h = 1100, theme = "day", opts = {} }) {
  seed = opts.seed ?? 7;
  const p = PALETTES[theme];
  const {
    mountains = 2,
    mountainAmp = 170,
    water = true,
    horizon = 0.56,
    sandBand = 0.86,
    palms = [{ x: 0.16, s: 1, lean: 0.5 }],
    house = false,
    boatAt = null,
    cloudsN = 3,
    birdsN = true,
    waterfall = false,
    deck = false,
    hammockAt = null,
    garden = false,
    poolAt = null,
    sunSize = 70,
  } = opts;

  const horizonY = h * horizon;
  const sandY = h * sandBand;
  let defs = "";
  let out = "";

  /* Ciel */
  defs += `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${p.sky[0]}"/>
    <stop offset="55%" stop-color="${p.sky[1]}"/>
    <stop offset="100%" stop-color="${p.sky[2]}"/>
  </linearGradient>`;
  defs += `<radialGradient id="sunGlow"><stop offset="0%" stop-color="${p.sunGlow}" stop-opacity="0.95"/><stop offset="100%" stop-color="${p.sunGlow}" stop-opacity="0"/></radialGradient>`;
  if (water) {
    defs += `<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.sea[0]}"/>
      <stop offset="45%" stop-color="${p.sea[1]}"/>
      <stop offset="100%" stop-color="${p.sea[2]}"/>
    </linearGradient>`;
  }
  defs += `<linearGradient id="sandg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${p.sand[0]}"/><stop offset="100%" stop-color="${p.sand[1]}"/>
  </linearGradient>`;
  if (garden) {
    defs += `<linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.hills[2]}"/><stop offset="100%" stop-color="${p.hills[0]}"/>
    </linearGradient>`;
  }
  if (poolAt) {
    defs += `<linearGradient id="pool" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7fe4ef"/><stop offset="100%" stop-color="#12a3b4"/>
    </linearGradient>`;
  }

  out += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  if (cloudsN) out += clouds(w, h * 0.16, cloudsN, p.cloud);

  /* Soleil */
  const sx = w * p.sunX;
  const sy = h * p.sunY;
  out += `<circle cx="${round(sx)}" cy="${round(sy)}" r="${round(sunSize * 3.6)}" fill="url(#sunGlow)"/>`;
  out += `<circle cx="${round(sx)}" cy="${round(sy)}" r="${sunSize}" fill="${p.sun}"/>`;

  if (birdsN) out += birds(w, h * 0.2);

  /* Reliefs */
  for (let i = 0; i < mountains; i++) {
    const y = horizonY + 14 - i * 30;
    const amp = (mountainAmp * (1 - i * 0.22)) * (i === 0 ? 0.7 : 1);
    out += `<path d="${ridge(w, h, y, amp, 6 + i, 0.8)}" fill="${p.hills[i % p.hills.length]}" opacity="${round(Math.min(1, 0.72 + i * 0.16))}"/>`;
  }

  /* Cascade */
  if (waterfall) {
    const wx = w * 0.66;
    out += `<path d="M ${round(wx - 90)} ${round(horizonY - 40)} Q ${round(wx - 130)} ${round(h * 0.72)} ${round(wx - 70)} ${round(sandY + 24)} L ${round(wx + 60)} ${round(sandY + 24)} Q ${round(wx + 96)} ${round(h * 0.68)} ${round(wx + 80)} ${round(horizonY - 40)} Z" fill="#cfeff7" opacity="0.92"/>`;
    out += `<path d="M ${round(wx - 60)} ${round(horizonY - 30)} Q ${round(wx - 84)} ${round(h * 0.7)} ${round(wx - 40)} ${round(sandY)} L ${round(wx + 34)} ${round(sandY)} Q ${round(wx + 58)} ${round(h * 0.66)} ${round(wx + 52)} ${round(horizonY - 30)} Z" fill="#ffffff" opacity="0.7"/>`;
    for (let i = 0; i < 26; i++) {
      out += `<circle cx="${round(between(wx - 70, wx + 70))}" cy="${round(between(sandY, sandY + 60))}" r="${round(between(2, 7))}" fill="#eaf9ff" opacity="${round(between(0.4, 0.9))}"/>`;
    }
  }

  /* Mer */
  if (water) {
    out += `<rect x="0" y="${round(horizonY)}" width="${w}" height="${round(sandY - horizonY)}" fill="url(#sea)"/>`;
    out += glitter(w, horizonY + 8, sandY, p.glitter);
    out += waves(w, horizonY + 20, sandY - 10, 26, "#ffffff", 0.5);
  }

  /* Sable */
  if (water) {
    out += `<path d="M 0 ${round(sandY)} Q ${round(w * 0.3)} ${round(sandY - 34)} ${round(w * 0.6)} ${round(sandY + 6)} Q ${round(w * 0.82)} ${round(sandY + 34)} ${w} ${round(sandY - 12)} L ${w} ${h} L 0 ${h} Z" fill="url(#sandg)"/>`;
  } else if (garden) {
    out += `<path d="M 0 ${round(sandY)} Q ${round(w * 0.35)} ${round(sandY - 40)} ${round(w * 0.7)} ${round(sandY + 10)} Q ${round(w * 0.86)} ${round(sandY + 30)} ${w} ${round(sandY - 6)} L ${w} ${h} L 0 ${h} Z" fill="url(#grass)"/>`;
  }

  /* Piscine */
  if (poolAt) {
    const pw = poolAt.w ?? 560;
    const ph = poolAt.h ?? 210;
    out += `<rect x="${round(poolAt.x)}" y="${round(poolAt.y)}" width="${pw}" height="${ph}" rx="${round(ph / 2)}" fill="#fff" opacity="0.5"/>`;
    out += `<rect x="${round(poolAt.x + 10)}" y="${round(poolAt.y + 10)}" width="${pw - 20}" height="${ph - 20}" rx="${round(ph / 2 - 8)}" fill="url(#pool)"/>`;
    for (let i = 0; i < 16; i++) {
      const y = poolAt.y + between(20, ph - 20);
      const x = poolAt.x + between(20, pw - 40);
      out += `<path d="M ${round(x)} ${round(y)} q ${round(between(14, 34))} ${round(-5 - rnd() * 5)} ${round(between(28, 68))} 0" stroke="#ffffff" stroke-width="${round(1.5 + rnd() * 2)}" fill="none" opacity="${round(between(0.25, 0.7))}" stroke-linecap="round"/>`;
    }
  }

  /* Terrasse bois */
  if (deck) {
    out += `<path d="M ${round(w * 0.04)} ${round(h * 0.86)} L ${round(w * 0.42)} ${round(h * 0.8)} L ${round(w * 0.46)} ${round(h)} L 0 ${h} L 0 ${round(h * 0.9)} Z" fill="#c58f52"/>`;
    for (let i = 0; i < 9; i++) {
      const t = i / 9;
      out += `<path d="M ${round(w * 0.04 + t * w * 0.38)} ${round(h * 0.86 - t * h * 0.06)} L ${round(w * 0.04 + t * w * 0.42)} ${round(h)}" stroke="#a8743d" stroke-width="3" opacity="0.6"/>`;
    }
  }

  /* Maison creole */
  if (house) {
    out += creoleHouse(w * (house.x ?? 0.74), h * (house.y ?? 0.83), house.s ?? 1, house.body ?? "#f4e2c6", house.roof ?? "#b5502f", house.accent ?? "#2f7f6a");
  }

  /* Bateau */
  if (boatAt) out += boat(w * boatAt.x, h * boatAt.y, boatAt.s ?? 1, "#e8533a", "#ffffff");

  /* Hamac */
  if (hammockAt) out += hammock(w * hammockAt.x, h * hammockAt.y, hammockAt.s ?? 1, "#f0d05a");

  /* Palmiers */
  const palmColors = { leaf: p.leaf, leafDark: p.leafDark, trunk: p.trunk, trunkShade: p.trunkShade };
  for (const pm of palms) {
    out += palm(w * pm.x, h * (pm.y ?? 0.995), pm.s ?? 1, pm.lean ?? 0.4, palmColors, pm.coconuts !== false);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>${defs}</defs>
  ${out}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Definitions des visuels                                             */
/* ------------------------------------------------------------------ */

const IMAGES = {
  /* --- Hero & partage --- */
  "hero-guadeloupe": () =>
    scene({
      w: 1920,
      h: 1080,
      theme: "sunset",
      opts: {
        seed: 21,
        mountains: 3,
        mountainAmp: 200,
        horizon: 0.52,
        sandBand: 0.9,
        sunSize: 88,
        sunX: 0.3,
        sunY: 0.4,
        cloudsN: 5,
        boatAt: { x: 0.66, y: 0.72, s: 1.3 },
        palms: [
          { x: 0.05, s: 1.55, lean: 0.42, y: 1.02 },
          { x: 0.13, s: 1.05, lean: -0.22, y: 1.0 },
          { x: 0.95, s: 1.7, lean: -0.5, y: 1.03 },
        ],
      },
    }),

  "og-image": () =>
    scene({
      w: 1200,
      h: 630,
      theme: "sunset",
      opts: {
        seed: 33,
        mountains: 2,
        horizon: 0.5,
        sandBand: 0.92,
        sunSize: 60,
        sunX: 0.24,
        cloudsN: 3,
        boatAt: { x: 0.7, y: 0.68, s: 1 },
        palms: [{ x: 0.9, s: 1.2, lean: -0.4, y: 1.02 }],
      },
    }),

  /* --- Villa Flamboyant (Deshaies, Basse-Terre) --- */
  "villa-flamboyant-1": () =>
    scene({
      theme: "morning",
      opts: {
        seed: 101,
        mountains: 3,
        mountainAmp: 210,
        horizon: 0.5,
        sandBand: 0.88,
        poolAt: { x: 200, y: 830, w: 720, h: 230 },
        house: { x: 0.76, y: 0.8, s: 1.15, body: "#f7e7cd", roof: "#b5502f", accent: "#2f7f6a" },
        palms: [
          { x: 0.07, s: 1.3, lean: 0.45 },
          { x: 0.31, s: 0.9, lean: -0.3 },
        ],
        cloudsN: 4,
      },
    }),
  "villa-flamboyant-2": () =>
    scene({
      theme: "day",
      opts: {
        seed: 102,
        mountains: 2,
        horizon: 0.54,
        sandBand: 0.9,
        deck: true,
        hammockAt: { x: 0.3, y: 0.72, s: 1.2 },
        palms: [{ x: 0.9, s: 1.35, lean: -0.45 }],
        cloudsN: 2,
      },
    }),
  "villa-flamboyant-3": () =>
    scene({
      theme: "day",
      opts: {
        seed: 103,
        mountains: 3,
        mountainAmp: 190,
        horizon: 0.5,
        sandBand: 0.86,
        garden: true,
        poolAt: { x: 780, y: 760, w: 620, h: 220 },
        house: { x: 0.2, y: 0.82, s: 1, body: "#fbf0da", roof: "#c2603a", accent: "#3f9d78" },
        palms: [
          { x: 0.62, s: 1.1, lean: 0.35 },
          { x: 0.86, s: 0.85, lean: -0.25 },
        ],
        cloudsN: 3,
      },
    }),
  "villa-flamboyant-4": () =>
    scene({
      theme: "sunset",
      opts: {
        seed: 104,
        mountains: 2,
        horizon: 0.55,
        sandBand: 0.92,
        sunSize: 80,
        sunX: 0.78,
        sunY: 0.42,
        boatAt: { x: 0.36, y: 0.74, s: 1 },
        palms: [{ x: 0.1, s: 1.25, lean: 0.4 }],
        cloudsN: 4,
      },
    }),
  "villa-flamboyant-5": () =>
    scene({
      theme: "morning",
      opts: {
        seed: 105,
        mountains: 3,
        mountainAmp: 230,
        horizon: 0.48,
        sandBand: 0.9,
        garden: true,
        deck: true,
        hammockAt: { x: 0.66, y: 0.74, s: 1.05 },
        palms: [
          { x: 0.2, s: 1.15, lean: 0.4 },
          { x: 0.44, s: 0.8, lean: -0.3 },
        ],
        cloudsN: 5,
      },
    }),

  /* --- Bungalow Lagon (Sainte-Anne, Grande-Terre) --- */
  "bungalow-lagon-1": () =>
    scene({
      theme: "day",
      opts: {
        seed: 201,
        mountains: 1,
        mountainAmp: 90,
        horizon: 0.5,
        sandBand: 0.82,
        house: { x: 0.7, y: 0.79, s: 0.85, body: "#fff4e2", roof: "#e0954a", accent: "#0bb0aa" },
        palms: [
          { x: 0.14, s: 1.35, lean: 0.5 },
          { x: 0.4, s: 0.85, lean: -0.25 },
        ],
        cloudsN: 3,
      },
    }),
  "bungalow-lagon-2": () =>
    scene({
      theme: "day",
      opts: {
        seed: 202,
        mountains: 1,
        mountainAmp: 60,
        horizon: 0.46,
        sandBand: 0.9,
        boatAt: { x: 0.62, y: 0.66, s: 0.9 },
        palms: [{ x: 0.86, s: 1.45, lean: -0.5 }],
        cloudsN: 2,
      },
    }),
  "bungalow-lagon-3": () =>
    scene({
      theme: "morning",
      opts: {
        seed: 203,
        mountains: 1,
        mountainAmp: 70,
        horizon: 0.48,
        sandBand: 0.86,
        deck: true,
        hammockAt: { x: 0.34, y: 0.7, s: 1.15 },
        palms: [
          { x: 0.12, s: 1.2, lean: 0.4 },
          { x: 0.94, s: 1.1, lean: -0.4 },
        ],
        cloudsN: 4,
      },
    }),
  "bungalow-lagon-4": () =>
    scene({
      theme: "day",
      opts: {
        seed: 204,
        mountains: 2,
        mountainAmp: 110,
        horizon: 0.52,
        sandBand: 0.88,
        poolAt: { x: 620, y: 800, w: 660, h: 210 },
        palms: [{ x: 0.06, s: 1.15, lean: 0.4 }],
        cloudsN: 3,
      },
    }),
  "bungalow-lagon-5": () =>
    scene({
      theme: "sunset",
      opts: {
        seed: 205,
        mountains: 1,
        mountainAmp: 80,
        horizon: 0.5,
        sandBand: 0.93,
        sunSize: 74,
        sunX: 0.44,
        sunY: 0.44,
        palms: [
          { x: 0.16, s: 1.3, lean: 0.45 },
          { x: 0.78, s: 0.95, lean: -0.3 },
        ],
        cloudsN: 5,
        boatAt: { x: 0.62, y: 0.7, s: 0.85 },
      },
    }),

  /* --- Appart Marina (Le Gosier) --- */
  "appart-marina-1": () =>
    scene({
      theme: "dusk",
      opts: {
        seed: 301,
        mountains: 2,
        mountainAmp: 120,
        horizon: 0.52,
        sandBand: 0.94,
        sunSize: 62,
        sunX: 0.82,
        sunY: 0.46,
        boatAt: { x: 0.3, y: 0.76, s: 1.15 },
        palms: [{ x: 0.09, s: 1.2, lean: 0.4 }],
        cloudsN: 3,
      },
    }),
  "appart-marina-2": () =>
    scene({
      theme: "dusk",
      opts: {
        seed: 302,
        mountains: 3,
        mountainAmp: 160,
        horizon: 0.5,
        sandBand: 0.9,
        boatAt: { x: 0.68, y: 0.74, s: 1.35 },
        palms: [{ x: 0.9, s: 1.1, lean: -0.45 }],
        cloudsN: 2,
      },
    }),
  "appart-marina-3": () =>
    scene({
      theme: "day",
      opts: {
        seed: 303,
        mountains: 2,
        mountainAmp: 140,
        horizon: 0.54,
        sandBand: 0.9,
        deck: true,
        poolAt: { x: 700, y: 790, w: 600, h: 200 },
        palms: [{ x: 0.14, s: 1.25, lean: 0.4 }],
        cloudsN: 3,
      },
    }),
  "appart-marina-4": () =>
    scene({
      theme: "morning",
      opts: {
        seed: 304,
        mountains: 2,
        mountainAmp: 150,
        horizon: 0.5,
        sandBand: 0.88,
        boatAt: { x: 0.5, y: 0.7, s: 1.05 },
        palms: [{ x: 0.8, s: 1.3, lean: -0.5 }],
        cloudsN: 4,
      },
    }),
  "appart-marina-5": () =>
    scene({
      theme: "sunset",
      opts: {
        seed: 305,
        mountains: 2,
        mountainAmp: 130,
        horizon: 0.54,
        sandBand: 0.92,
        sunSize: 78,
        sunX: 0.66,
        sunY: 0.4,
        boatAt: { x: 0.22, y: 0.74, s: 1 },
        palms: [
          { x: 0.11, s: 1.15, lean: 0.42 },
          { x: 0.93, s: 1.05, lean: -0.42 },
        ],
        cloudsN: 4,
      },
    }),

  /* --- Experiences Guadeloupe --- */
  "exp-plage": () =>
    scene({
      theme: "day",
      opts: {
        seed: 401,
        mountains: 1,
        mountainAmp: 70,
        horizon: 0.42,
        sandBand: 0.78,
        palms: [
          { x: 0.08, s: 1.5, lean: 0.5 },
          { x: 0.24, s: 1.05, lean: 0.2 },
        ],
        cloudsN: 3,
        boatAt: { x: 0.7, y: 0.6, s: 0.9 },
      },
    }),
  "exp-cascade": () =>
    scene({
      theme: "day",
      opts: {
        seed: 402,
        mountains: 3,
        mountainAmp: 250,
        horizon: 0.34,
        water: false,
        garden: true,
        sandBand: 0.72,
        waterfall: true,
        palms: [
          { x: 0.08, s: 1.3, lean: 0.4 },
          { x: 0.9, s: 1.4, lean: -0.45 },
        ],
        cloudsN: 2,
        birdsN: false,
      },
    }),
  "exp-soufriere": () =>
    scene({
      theme: "morning",
      opts: {
        seed: 403,
        mountains: 3,
        mountainAmp: 320,
        horizon: 0.42,
        water: false,
        garden: true,
        sandBand: 0.8,
        cloudsN: 6,
        palms: [{ x: 0.12, s: 1.15, lean: 0.4 }],
      },
    }),
  "exp-marche": () =>
    scene({
      theme: "day",
      opts: {
        seed: 404,
        mountains: 2,
        mountainAmp: 120,
        horizon: 0.5,
        sandBand: 0.9,
        garden: true,
        boatAt: { x: 0.5, y: 0.66, s: 0.9 },
        palms: [
          { x: 0.16, s: 1.2, lean: 0.4 },
          { x: 0.88, s: 1.05, lean: -0.4 },
        ],
        cloudsN: 3,
      },
    }),
  "exp-plongee": () =>
    scene({
      theme: "day",
      opts: {
        seed: 405,
        mountains: 1,
        mountainAmp: 55,
        horizon: 0.3,
        sandBand: 0.6,
        palms: [{ x: 0.88, s: 1.3, lean: -0.45 }],
        cloudsN: 2,
        boatAt: { x: 0.34, y: 0.5, s: 1.1 },
      },
    }),
  "exp-rhum": () =>
    scene({
      theme: "sunset",
      opts: {
        seed: 406,
        mountains: 3,
        mountainAmp: 170,
        horizon: 0.52,
        sandBand: 0.88,
        garden: true,
        house: { x: 0.32, y: 0.82, s: 1.05, body: "#f3e3c7", roof: "#8d4a2f", accent: "#c87e3b" },
        palms: [
          { x: 0.72, s: 1.25, lean: 0.4 },
          { x: 0.9, s: 0.9, lean: -0.3 },
        ],
        cloudsN: 4,
      },
    }),

  /* --- A propos --- */
  "about-karukera": () =>
    scene({
      w: 1600,
      h: 900,
      theme: "morning",
      opts: {
        seed: 501,
        mountains: 3,
        mountainAmp: 240,
        horizon: 0.5,
        sandBand: 0.86,
        garden: true,
        house: { x: 0.68, y: 0.8, s: 1.2, body: "#fdf3e0", roof: "#b5502f", accent: "#2f7f6a" },
        palms: [
          { x: 0.1, s: 1.3, lean: 0.45 },
          { x: 0.3, s: 0.95, lean: -0.3 },
          { x: 0.94, s: 1.15, lean: -0.45 },
        ],
        cloudsN: 4,
      },
    }),
  "about-hote": () =>
    scene({
      w: 1200,
      h: 1200,
      theme: "day",
      opts: {
        seed: 502,
        mountains: 2,
        mountainAmp: 130,
        horizon: 0.52,
        sandBand: 0.9,
        deck: true,
        hammockAt: { x: 0.34, y: 0.72, s: 1.3 },
        palms: [{ x: 0.86, s: 1.3, lean: -0.45 }],
        cloudsN: 3,
      },
    }),
  "about-terroir": () =>
    scene({
      w: 1200,
      h: 1200,
      theme: "sunset",
      opts: {
        seed: 503,
        mountains: 3,
        mountainAmp: 190,
        horizon: 0.54,
        sandBand: 0.9,
        garden: true,
        house: { x: 0.62, y: 0.84, s: 1, body: "#f7e7cd", roof: "#a66331", accent: "#c87e3b" },
        palms: [{ x: 0.16, s: 1.25, lean: 0.45 }],
        cloudsN: 4,
      },
    }),
};

/* ------------------------------------------------------------------ */
/* Ecriture                                                            */
/* ------------------------------------------------------------------ */

let count = 0;
for (const [name, build] of Object.entries(IMAGES)) {
  const svg = build();
  writeFileSync(resolve(OUT, `${name}.svg`), svg, "utf8");
  count++;
}
console.log(`${count} illustrations generees dans public/images/`);
