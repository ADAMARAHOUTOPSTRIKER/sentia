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
    id: "delina", name: "Delina", house: "Parfums de Marly", type: "Eau de Parfum",
    price: 275, size: "75 ml", gender: "Pour Elle", featured: true, photo: null,
    accent: "#e9b7ad",
    svg: { shape: "marly", liquidTop: "#fbe3dd", liquidBottom: "#eeb4a8", capColor: "#cfd2d8", capDark: "#9a9da6", tassel: "#f0c9c0", label: "Delina" },
    tagline: "Une rose couture, éclatante et veloutée.",
    description: "Delina célèbre la féminité dans ce qu'elle a de plus lumineux : une rose de Turquie somptueuse, escortée de litchi et de rhubarbe, qui s'attarde sur un sillage de vanille et de muscs précieux.",
    notes: {
      tete: ["Rhubarbe", "Litchi", "Bergamote"],
      coeur: ["Rose de Turquie", "Pivoine", "Muguet"],
      fond: ["Vanille", "Muscs blancs", "Cachemire boisé"]
    }
  },
  {
    id: "imagination", name: "Imagination", house: "Louis Vuitton", type: "Eau de Parfum",
    price: 310, size: "100 ml", gender: "Pour Lui", featured: true, photo: null,
    accent: "#bfe0d8",
    svg: { shape: "column", liquidTop: "#eafaf4", liquidBottom: "#bfe0d8", capColor: "#2e2e33", capDark: "#151518", label: "Imagination" },
    tagline: "La liberté d'un agrume infini.",
    description: "Un départ d'agrumes étincelants — citron de Sicile, bergamote de Calabre — que le gingembre électrise, avant qu'un accord de thé noir fumé n'installe une élégance sans fin.",
    notes: {
      tete: ["Citron de Sicile", "Bergamote de Calabre", "Cédrat"],
      coeur: ["Gingembre de Nigérie", "Néroli de Tunisie"],
      fond: ["Thé noir", "Ambroxan"]
    }
  },
  {
    id: "naxos", name: "Naxos", house: "Xerjoff — XJ 1861", type: "Eau de Parfum",
    price: 255, size: "100 ml", gender: "Mixte", featured: true, photo: null,
    accent: "#dfc06a",
    svg: { shape: "amphora", liquidTop: "#f7ecc9", liquidBottom: "#dfc06a", capColor: "#caa64e", capDark: "#93752b", label: "Naxos" },
    tagline: "Miel, tabac et soleil de Sicile.",
    description: "Hommage à la Sicile, Naxos drape un tabac blond gorgé de miel dans la lavande et le jasmin sambac, sur un fond gourmand de fève tonka et de cacao. Un sillage inoubliable.",
    notes: {
      tete: ["Bergamote", "Citron", "Lavande"],
      coeur: ["Miel", "Cannelle", "Jasmin sambac"],
      fond: ["Tabac blond", "Vanille", "Fève tonka", "Cacao"]
    }
  },
  {
    id: "valaya", name: "Valaya", house: "Parfums de Marly", type: "Eau de Parfum",
    price: 275, size: "75 ml", gender: "Pour Elle", featured: true, photo: null,
    accent: "#e7e2d4",
    svg: { shape: "marly", liquidTop: "#fdfbf3", liquidBottom: "#e7e2d4", capColor: "#cfd2d8", capDark: "#9a9da6", tassel: "#efeadb", label: "Valaya" },
    tagline: "La lumière du musc blanc.",
    description: "Valaya est une aube en flacon : agrumes verts et fleur d'oranger caressés d'abricot, posés sur un voile de muscs blancs et de vanille éthérée. Pure, enveloppante, magnétique.",
    notes: {
      tete: ["Mandarine verte", "Bergamote"],
      coeur: ["Fleur d'oranger", "Abricot", "Freesia"],
      fond: ["Muscs blancs", "Vanille", "Ambrette"]
    }
  },
  {
    id: "pure-vision", name: "Pure Vision", house: "Câline Homme", type: "Eau de Parfum",
    price: 120, size: "100 ml", gender: "Pour Lui", featured: true, photo: null,
    accent: "#cfe8ef",
    svg: { shape: "column", liquidTop: "#eef9fc", liquidBottom: "#cfe8ef", capColor: "#232326", capDark: "#0f0f11", label: "Pure Vision" },
    tagline: "Une fraîcheur cristalline.",
    description: "Un souffle glacé de bergamote et de menthe givrée, un cœur marin salé de sauge claire, et la caresse finale d'un musc blanc boisé. La netteté faite parfum.",
    notes: {
      tete: ["Bergamote", "Menthe givrée"],
      coeur: ["Accord marin", "Sauge sclarée"],
      fond: ["Musc blanc", "Bois d'ambre"]
    }
  },
  {
    id: "orange-crush", name: "Orange Crush", house: "Parfums d'Elmar", type: "Extrait de Parfum",
    price: 190, size: "60 ml", gender: "Mixte", featured: true, photo: null,
    accent: "#e8863c",
    svg: { shape: "cube", liquidTop: "#f6b23f", liquidBottom: "#d43d1e", capColor: "#caa64e", capDark: "#93752b", label: "Orange Crush" },
    tagline: "Un coucher de soleil à même la peau.",
    description: "L'orange sanguine, juteuse et solaire, s'embrase de safran et de cannelle avant de fondre dans un ambre vanillé au santal crémeux. Addictif, littéralement.",
    notes: {
      tete: ["Orange sanguine", "Mandarine"],
      coeur: ["Safran", "Fleur d'oranger", "Cannelle"],
      fond: ["Ambre", "Vanille", "Bois de santal"]
    }
  },
  {
    id: "portrait-of-a-lady", name: "Portrait of a Lady", house: "Éditions de Parfums Frédéric Malle", type: "Eau de Parfum",
    price: 265, size: "50 ml", gender: "Pour Elle", featured: true, photo: null,
    accent: "#7b2f3a",
    svg: { shape: "column", liquidTop: "#d9c79e", liquidBottom: "#b39554", capColor: "#1c1b1e", capDark: "#0a0a0c", label: "Portrait of a Lady" },
    tagline: "La rose la plus sombre du monde.",
    description: "Chef-d'œuvre de Dominique Ropion : une rose turque opulente saturée de framboise et de cassis, enroulée de patchouli, d'encens et d'épices. Un portrait baroque, inimitable.",
    notes: {
      tete: ["Rose turque", "Framboise", "Cassis"],
      coeur: ["Patchouli", "Encens", "Cannelle", "Clou de girofle"],
      fond: ["Bois de santal", "Ambre", "Musc"]
    }
  },
  {
    id: "layton", name: "Layton", house: "Parfums de Marly", type: "Eau de Parfum",
    price: 250, size: "75 ml", gender: "Pour Lui", featured: true, photo: null,
    accent: "#2b3a5c",
    svg: { shape: "marly", liquidTop: "#3d4f78", liquidBottom: "#1d2843", capColor: "#cfd2d8", capDark: "#9a9da6", label: "Layton" },
    tagline: "Le magnétisme à l'état pur.",
    description: "Pomme croquante et lavande aristocratique ouvrent le bal ; la vanille, le café et le bois de gaïac signent l'un des sillages les plus complimentés de la parfumerie moderne.",
    notes: {
      tete: ["Pomme", "Bergamote", "Lavande"],
      coeur: ["Géranium", "Violette", "Jasmin"],
      fond: ["Vanille", "Café", "Bois de gaïac", "Ambre gris"]
    }
  },

  /* ---------- La Collection ---------- */
  {
    id: "vanille-jil-sander", name: "Vanille", house: "Jil Sander", type: "Eau de Parfum",
    price: 85, size: "50 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#efe6d8",
    svg: { shape: "flask", liquidTop: "#fdfaf2", liquidBottom: "#efe6d8", capColor: "#f2f0ea", capDark: "#c9c5ba", label: "Vanille" },
    tagline: "Le minimalisme d'une vanille pure.",
    description: "Une vanille bourbon nue, soulignée de fève tonka et de muscs doux. L'épure absolue, signée Jil Sander.",
    notes: { tete: ["Poire", "Bergamote"], coeur: ["Vanille bourbon", "Héliotrope"], fond: ["Fève tonka", "Muscs doux"] }
  },
  {
    id: "raphael", name: "Raphael", house: "Sentia Curation", type: "Extrait de Parfum",
    price: 160, size: "75 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#dcdcde",
    svg: { shape: "column", liquidTop: "#f4f4f5", liquidBottom: "#d5d5d8", capColor: "#eceae4", capDark: "#bdbab0", label: "Raphael" },
    tagline: "Un ange de marbre blanc.",
    description: "Iris poudré, encens froid et muscs minéraux : une sculpture olfactive d'une blancheur de marbre.",
    notes: { tete: ["Iris blanc", "Poivre blanc"], coeur: ["Encens froid", "Racine d'iris"], fond: ["Muscs minéraux", "Bois blancs"] }
  },
  {
    id: "colours-of-capri", name: "Colours of Capri", house: "Birkholz", type: "Eau de Parfum",
    price: 210, size: "100 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#a8c93c",
    svg: { shape: "cube", liquidTop: "#d3e86a", liquidBottom: "#8bb32a", capColor: "#caa64e", capDark: "#93752b", label: "Capri" },
    tagline: "L'île en éclats de vert.",
    description: "Citron vert pétillant, basilic froissé et figue lactée sur des bois flottés : Capri un matin de juin.",
    notes: { tete: ["Citron vert", "Basilic"], coeur: ["Figue", "Petit grain"], fond: ["Bois flotté", "Musc"] }
  },
  {
    id: "poetry-in-palermo", name: "Poetry in Palermo", house: "Birkholz", type: "Eau de Parfum",
    price: 210, size: "100 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#e04a33",
    svg: { shape: "cube", liquidTop: "#f2764f", liquidBottom: "#c92f1d", capColor: "#caa64e", capDark: "#93752b", label: "Palermo" },
    tagline: "Un sonnet sicilien incandescent.",
    description: "Orange sanguine et jasmin de nuit sous un ambre solaire : la poésie brûlante des ruelles de Palerme.",
    notes: { tete: ["Orange sanguine", "Poivre rose"], coeur: ["Jasmin", "Fleur d'oranger"], fond: ["Ambre solaire", "Vanille"] }
  },
  {
    id: "royal-nawaf", name: "Royal Nawaf", house: "Ormonde Jayne", type: "Eau de Parfum",
    price: 240, size: "88 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#4a4a55",
    svg: { shape: "column", liquidTop: "#6b6b78", liquidBottom: "#3a3a44", capColor: "#cfd2d8", capDark: "#9a9da6", label: "Royal Nawaf" },
    tagline: "L'oud dans sa robe d'apparat.",
    description: "Créé à Londres : rose de Taïf et safran couronnent un oud majestueux adouci d'ambre royal.",
    notes: { tete: ["Safran", "Baies roses"], coeur: ["Rose de Taïf", "Oud"], fond: ["Ambre royal", "Bois précieux"] }
  },
  {
    id: "kn8", name: "KN°8", house: "Korloff", type: "Eau de Parfum",
    price: 95, size: "88 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#7d96c9",
    svg: { shape: "flask", liquidTop: "#eef2fb", liquidBottom: "#7d96c9", capColor: "#e8e8ec", capDark: "#b5b5bd", label: "KN°8" },
    tagline: "Un saphir à porter.",
    description: "Violette givrée et bergamote sur des muscs bleutés, taillés comme un joyau Korloff.",
    notes: { tete: ["Bergamote", "Cassis"], coeur: ["Violette", "Iris"], fond: ["Muscs bleutés", "Cèdre"] }
  },
  {
    id: "kn18", name: "KN°18", house: "Korloff", type: "Eau de Parfum",
    price: 95, size: "88 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#c26a94",
    svg: { shape: "flask", liquidTop: "#fbeef5", liquidBottom: "#c26a94", capColor: "#e8e8ec", capDark: "#b5b5bd", label: "KN°18" },
    tagline: "Un rubis gourmand.",
    description: "Framboise veloutée, rose sucrée et patchouli doux : la facette la plus précieuse de la gourmandise.",
    notes: { tete: ["Framboise", "Litchi"], coeur: ["Rose", "Pivoine"], fond: ["Patchouli doux", "Vanille"] }
  },
  {
    id: "lussino-essence", name: "Lussino Essence", house: "The Merchant of Venice", type: "Eau de Parfum",
    price: 150, size: "100 ml", gender: "Pour Lui", featured: false, photo: null,
    accent: "#2f8f96",
    svg: { shape: "column", liquidTop: "#57b7bd", liquidBottom: "#1e6b71", capColor: "#cfd2d8", capDark: "#9a9da6", label: "Lussino" },
    tagline: "L'Adriatique en signature.",
    description: "Embruns salés, sauge et ambre gris : la lagune vénitienne au large de Lussino.",
    notes: { tete: ["Accord marin", "Citron"], coeur: ["Sauge", "Lavande de mer"], fond: ["Ambre gris", "Sel", "Bois clairs"] }
  },
  {
    id: "c01-sunkissed", name: "C01 L'Eau So Sunkissed", house: "Sentia Curation", type: "Eau de Toilette",
    price: 70, size: "100 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#ef9db5",
    svg: { shape: "flask", liquidTop: "#fde3ec", liquidBottom: "#ef9db5", capColor: "#e7b7c5", capDark: "#c9899d", label: "Sunkissed" },
    tagline: "La peau après la plage.",
    description: "Monoï, ylang-ylang et muscs solaires : le souvenir doré d'un après-midi d'été.",
    notes: { tete: ["Bergamote", "Noix de coco"], coeur: ["Monoï", "Ylang-ylang"], fond: ["Muscs solaires", "Vanille des îles"] }
  },
  {
    id: "true-me-woman", name: "True Me for Woman", house: "Police", type: "Eau de Parfum",
    price: 55, size: "75 ml", gender: "Pour Elle", featured: false, photo: null,
    accent: "#f3b8cf",
    svg: { shape: "flask", liquidTop: "#fce6f0", liquidBottom: "#f3b8cf", capColor: "#e3e3e8", capDark: "#b0b0b8", label: "True Me" },
    tagline: "L'audace en rose translucide.",
    description: "Litchi pétillant, rose lumineuse et vanille câline : une signature aussi franche qu'un regard.",
    notes: { tete: ["Litchi", "Mandarine"], coeur: ["Rose", "Jasmin"], fond: ["Vanille", "Musc"] }
  },
  {
    id: "true-me-man", name: "True Me for Man", house: "Police", type: "Eau de Parfum",
    price: 55, size: "75 ml", gender: "Pour Lui", featured: false, photo: null,
    accent: "#b9c4d6",
    svg: { shape: "flask", liquidTop: "#eef2f8", liquidBottom: "#b9c4d6", capColor: "#e3e3e8", capDark: "#b0b0b8", label: "True Me" },
    tagline: "Le caractère, sans détour.",
    description: "Cardamome électrique, lavande nette et vétiver franc : une allure qui ne s'excuse pas.",
    notes: { tete: ["Cardamome", "Bergamote"], coeur: ["Lavande", "Géranium"], fond: ["Vétiver", "Bois d'ambre"] }
  },
  {
    id: "aegean-blue", name: "Aegean Blue", house: "Korres — Édition 2026", type: "Eau de Toilette",
    price: 60, size: "50 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#2456a8",
    svg: { shape: "cube", liquidTop: "#3f79d4", liquidBottom: "#173b7a", capColor: "#f2f0ea", capDark: "#c9c5ba", label: "Aegean Blue" },
    tagline: "La mer Égée, distillée.",
    description: "Citron grec, absolu de lentisque et notes iodées sur un santal cachemire : plonger sans se mouiller.",
    notes: { tete: ["Citron", "Mandarine", "Cardamome"], coeur: ["Absolu de lentisque", "Notes iodées"], fond: ["Cachemire", "Bois de santal"] }
  },
  {
    id: "air-du-temps-orchid", name: "L'Air du Temps — White Orchid", house: "Nina Ricci", type: "Eau de Parfum",
    price: 90, size: "100 ml", gender: "Pour Elle", featured: false, photo: null,
    accent: "#efe9df",
    svg: { shape: "amphora", liquidTop: "#fdfaf3", liquidBottom: "#e9e2d3", capColor: "#d9c690", capDark: "#ac975", label: "White Orchid" },
    tagline: "La colombe et l'orchidée.",
    description: "Le mythe revisité : orchidée blanche, œillet signature et muscs ailés dans le flacon aux colombes.",
    notes: { tete: ["Bergamote", "Pêche blanche"], coeur: ["Orchidée blanche", "Œillet"], fond: ["Muscs", "Bois blond"] }
  },
  {
    id: "boujee-kitty", name: "Boujee Kitty — Caramel Milk | 22", house: "Kayali", type: "Eau de Parfum Intense",
    price: 130, size: "100 ml", gender: "Mixte", featured: false, photo: null,
    accent: "#e8c8d8",
    svg: { shape: "cube", liquidTop: "#fbe4ee", liquidBottom: "#cfe0f2", capColor: "#e8e8ec", capDark: "#b5b5bd", label: "Boujee Kitty" },
    tagline: "Une gourmandise couture.",
    description: "Caramel au lait, praline dorée et vanille crémeuse sur des muscs cajoleurs. Interdit d'y résister.",
    notes: { tete: ["Caramel au lait", "Bergamote"], coeur: ["Praline", "Fleur d'oranger"], fond: ["Vanille crémeuse", "Muscs"] }
  },
  {
    id: "orchid-man", name: "Orchid Man — The Last Fight", house: "Frapin", type: "Eau de Parfum",
    price: 175, size: "100 ml", gender: "Pour Lui", featured: false, photo: null,
    accent: "#c6bda4",
    svg: { shape: "flask", liquidTop: "#efe9d6", liquidBottom: "#cdc3a3", capColor: "#4a3527", capDark: "#2c1f16", label: "Orchid Man" },
    tagline: "Le dernier round d'un gentleman.",
    description: "Hommage aux légendes du ring : rhum ambré, orchidée virile, cuir souple et tabac de cave Frapin.",
    notes: { tete: ["Rhum", "Bergamote"], coeur: ["Orchidée", "Cuir souple"], fond: ["Tabac", "Fève tonka"] }
  }
];

function productArtwork(p, { large = false } = {}) {
  if (p.photo) {
    return `<img src="${p.photo}" alt="${p.name} — ${p.house}" loading="lazy" draggable="false">`;
  }
  return bottleSVG({ ...p.svg });
}
