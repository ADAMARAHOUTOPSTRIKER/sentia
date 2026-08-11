/* ============================================================
   SENTIA — Catalogue
   Chaque produit : notes olfactives réelles, prix, et un
   flacon dessiné en SVG (remplaçable par une photo : il suffit
   de renseigner `photo: "assets/products/xxx.png"`).
   ============================================================ */

const SVG_NS = "http://www.w3.org/2000/svg";
let __gradSeq = 0;

/**
 * Fabrique un flacon SVG stylisé.
 * shape: 'marly' | 'column' | 'amphora' | 'cube' | 'flask'
 */
function bottleSVG(cfg) {
  const id = ++__gradSeq;
  const {
    shape = "flask",
    liquidTop = "#f6e7c8",
    liquidBottom = "#caa64e",
    capColor = "#b98a2f",
    capDark = "#8a6420",
    glass = "rgba(255,255,255,.55)",
    label = "",
    tassel = null
  } = cfg;

  const defs = `
    <defs>
      <linearGradient id="liq${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${liquidTop}"/>
        <stop offset="1" stop-color="${liquidBottom}"/>
      </linearGradient>
      <linearGradient id="cap${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${capDark}"/>
        <stop offset=".45" stop-color="${capColor}"/>
        <stop offset=".55" stop-color="#f7e6b8"/>
        <stop offset="1" stop-color="${capDark}"/>
      </linearGradient>
      <linearGradient id="shine${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(255,255,255,.85)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
      <radialGradient id="floor${id}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="rgba(20,19,17,.18)"/>
        <stop offset="1" stop-color="rgba(20,19,17,0)"/>
      </radialGradient>
    </defs>`;

  let body = "";
  const labelText = label
    ? `<text x="110" y="208" text-anchor="middle" font-family="Jost, sans-serif" font-size="10.5" letter-spacing="3.2" fill="#3c3527" opacity=".78">${label.toUpperCase()}</text>`
    : "";

  if (shape === "marly") {
    body = `
      <ellipse cx="110" cy="284" rx="62" ry="10" fill="url(#floor${id})"/>
      <path d="M74 120 C58 138 52 160 52 190 C52 248 74 272 110 272 C146 272 168 248 168 190 C168 160 162 138 146 120 Z"
            fill="url(#liq${id})" stroke="rgba(120,95,40,.28)" stroke-width="1.4"/>
      <path d="M80 128 C68 144 63 162 63 188 C63 214 68 234 78 248 C71 226 69 200 74 172 C77 154 80 140 86 128 Z" fill="url(#shine${id})" opacity=".7"/>
      <rect x="96" y="96" width="28" height="26" rx="4" fill="url(#cap${id})"/>
      <circle cx="110" cy="72" r="26" fill="url(#cap${id})"/>
      <circle cx="101" cy="63" r="8" fill="rgba(255,255,255,.5)"/>
      ${tassel ? `<path d="M132 84 C150 96 152 120 146 142" stroke="${tassel}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M143 138 l10 26 c1 4 -12 4 -11 0 Z" fill="${tassel}"/>` : ""}
      ${labelText}`;
  } else if (shape === "column") {
    body = `
      <ellipse cx="110" cy="286" rx="56" ry="9" fill="url(#floor${id})"/>
      <rect x="62" y="108" width="96" height="170" rx="10" fill="url(#liq${id})" stroke="rgba(60,50,30,.25)" stroke-width="1.4"/>
      <rect x="70" y="116" width="18" height="152" rx="8" fill="url(#shine${id})" opacity=".65"/>
      <rect x="92" y="88" width="36" height="22" rx="3" fill="rgba(200,200,205,.9)"/>
      <rect x="86" y="44" width="48" height="48" rx="6" fill="url(#cap${id})"/>
      ${labelText}`;
  } else if (shape === "amphora") {
    body = `
      <ellipse cx="110" cy="286" rx="58" ry="9" fill="url(#floor${id})"/>
      <path d="M110 96 C64 118 48 160 48 200 C48 252 76 276 110 276 C144 276 172 252 172 200 C172 160 156 118 110 96 Z"
            fill="url(#liq${id})" stroke="rgba(120,95,40,.3)" stroke-width="1.4"/>
      <path d="M92 112 C68 134 58 166 58 198 C58 226 66 248 80 260 C70 238 66 208 72 178 C77 152 84 130 92 112 Z" fill="url(#shine${id})" opacity=".7"/>
      <path d="M110 34 L128 66 L110 82 L92 66 Z" fill="url(#cap${id})"/>
      <rect x="98" y="80" width="24" height="18" rx="3" fill="url(#cap${id})"/>
      ${labelText}`;
  } else if (shape === "cube") {
    body = `
      <ellipse cx="110" cy="284" rx="60" ry="9" fill="url(#floor${id})"/>
      <rect x="52" y="120" width="116" height="156" rx="14" fill="url(#liq${id})" stroke="rgba(60,50,30,.25)" stroke-width="1.4"/>
      <rect x="62" y="130" width="20" height="136" rx="9" fill="url(#shine${id})" opacity=".6"/>
      <rect x="94" y="100" width="32" height="22" rx="3" fill="rgba(220,220,224,.9)"/>
      <path d="M86 100 C86 74 96 60 110 60 C124 60 134 74 134 100 Z" fill="url(#cap${id})"/>
      <circle cx="110" cy="66" r="7" fill="#f7e6b8"/>
      ${labelText}`;
  } else {
    body = `
      <ellipse cx="110" cy="284" rx="58" ry="9" fill="url(#floor${id})"/>
      <path d="M68 132 C60 148 56 168 56 196 C56 250 78 274 110 274 C142 274 164 250 164 196 C164 168 160 148 152 132 C144 120 132 114 110 114 C88 114 76 120 68 132 Z"
            fill="url(#liq${id})" stroke="rgba(90,75,40,.25)" stroke-width="1.4"/>
      <path d="M74 138 C66 154 63 174 63 196 C63 224 69 246 81 258 C72 236 69 208 73 182 C76 164 78 150 84 138 Z" fill="url(#shine${id})" opacity=".65"/>
      <rect x="96" y="92" width="28" height="24" rx="4" fill="rgba(215,215,220,.92)"/>
      <rect x="90" y="52" width="40" height="42" rx="8" fill="url(#cap${id})"/>
      ${labelText}`;
  }

  return `<svg xmlns="${SVG_NS}" viewBox="0 0 220 300" role="img" aria-label="${label}">
    ${defs}
    <g filter="none">${body}</g>
    <rect x="0" y="0" width="220" height="300" fill="none"/>
  </svg>`;
}

/* ------------------------------------------------------------
   Catalogue — notes olfactives des fragrances réelles.
   featured: true → carrousel "Les Icônes"
------------------------------------------------------------ */
const PRODUCTS = [
  {
    id: "soleil-dor", name: "Soleil d'Or", house: "SENTIA", type: "Eau de Parfum",
    price: 185, size: "100 ml", gender: "Mixte", featured: true,
    photo: "assets/products/soleil-dor.jpg",
    accent: "#e2b25a",
    svg: { shape: "flask", liquidTop: "#f6e7c8", liquidBottom: "#caa64e", capColor: "#b98a2f", capDark: "#8a6420", label: "Soleil d'Or" },
    tagline: "Le premier rayon, embouteillé.",
    description: "L'ananas confit rencontre la vanille bourbon dans une lumière de fin d'été. Le parfum du film SENTIA — celui par lequel la maison est née.",
    notes: { tete: ["Ananas confit", "Bergamote de Calabre"], coeur: ["Vanille bourbon", "Frangipanier"], fond: ["Bois blond", "Muscs solaires"] }
  },
  {
    id: "ambre-noir", name: "Ambre Noir", house: "SENTIA", type: "Extrait de Parfum",
    price: 210, size: "75 ml", gender: "Mixte", featured: true,
    photo: "assets/products/ambre-noir.jpg",
    accent: "#3a2c1d",
    svg: { shape: "cube", liquidTop: "#5a4630", liquidBottom: "#241a10", capColor: "#1c1b1e", capDark: "#0a0a0c", label: "Ambre Noir" },
    tagline: "La nuit garde ses secrets.",
    description: "Un extrait sombre et enveloppant : l'encens s'ouvre sur une rose noire, l'ambre fume doucement jusqu'au oud. Le soir en verre fumé.",
    notes: { tete: ["Encens", "Safran"], coeur: ["Ambre", "Rose noire"], fond: ["Oud", "Patchouli", "Vanille fumée"] }
  },
  {
    id: "fleur-doranger", name: "Fleur d'Oranger", house: "SENTIA", type: "Eau de Parfum",
    price: 165, size: "100 ml", gender: "Pour Elle", featured: true,
    photo: "assets/products/fleur-doranger.jpg",
    accent: "#f0cfa8",
    svg: { shape: "amphora", liquidTop: "#fbe9d4", liquidBottom: "#eec9a2", capColor: "#caa64e", capDark: "#93752b", label: "Fleur d'Oranger" },
    tagline: "Un matin dans l'orangeraie.",
    description: "Le néroli cueilli à l'aube, la fleur d'oranger du Maroc en absolu, un fond de miel blanc : la tendresse à l'état pur.",
    notes: { tete: ["Néroli", "Petit grain"], coeur: ["Fleur d'oranger du Maroc", "Jasmin"], fond: ["Miel blanc", "Muscs propres"] }
  },
  {
    id: "bois-de-cedre", name: "Bois de Cèdre", house: "SENTIA", type: "Eau de Parfum",
    price: 175, size: "100 ml", gender: "Pour Lui", featured: false,
    photo: "assets/products/bois-de-cedre.jpg",
    accent: "#7a4f2e",
    svg: { shape: "column", liquidTop: "#8a5a33", liquidBottom: "#4a2c15", capColor: "#4a3527", capDark: "#2c1f16", label: "Bois de Cèdre" },
    tagline: "La forêt de l'Atlas, au poignet.",
    description: "Le cèdre de l'Atlas taillé net, réchauffé de cardamome et posé sur un cuir souple. Une signature droite, sans détour.",
    notes: { tete: ["Poivre rose", "Cardamome"], coeur: ["Cèdre de l'Atlas", "Vétiver"], fond: ["Cuir", "Ambre gris"] }
  },
  {
    id: "jardin-de-brume", name: "Jardin de Brume", house: "SENTIA", type: "Eau de Parfum",
    price: 165, size: "100 ml", gender: "Mixte", featured: false,
    photo: "assets/products/jardin-de-brume.jpg",
    accent: "#b8ccb4",
    svg: { shape: "flask", liquidTop: "#e7f0e3", liquidBottom: "#b8ccb4", capColor: "#c9cdd2", capDark: "#9a9da6", label: "Jardin de Brume" },
    tagline: "Le sous-bois après la pluie.",
    description: "La feuille de figuier froissée, la fougère humide, la mousse de chêne : la forêt du film SENTIA, distillée au petit matin.",
    notes: { tete: ["Feuille de figuier", "Rosée verte"], coeur: ["Fougère", "Sauge sclarée"], fond: ["Mousse de chêne", "Bois humides"] }
  }
];

function productArtwork(p, { large = false } = {}) {
  if (p.photo) {
    return `<img src="${p.photo}" alt="${p.name} — ${p.house}" loading="lazy" draggable="false">`;
  }
  return bottleSVG({ ...p.svg });
}
