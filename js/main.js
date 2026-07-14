/* ============================================================
   SENTIA — Expérience
   GSAP + ScrollTrigger + Lenis
   ============================================================ */

/* ------------------ CONFIGURATION BOUTIQUE ------------------
   ⚠️ À personnaliser : numéro WhatsApp (format international,
   sans "+" ni espaces) et adresse pour Google Maps.           */
const SENTIA_CONFIG = {
  whatsappNumber: "33600000000",            // ex: "33612345678"
  storeName: "SENTIA — Haute Parfumerie",
  storeAddress: "12 Avenue des Champs-Élysées, 75008 Paris", // remplacez par votre adresse
  currency: "€"
};
/* ------------------------------------------------------------ */

gsap.registerPlugin(ScrollTrigger);

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmt = n => n.toLocaleString("fr-FR") + " " + SENTIA_CONFIG.currency;

/* ---------- Lenis (défilement soyeux) ---------- */
const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ---------- Loader ---------- */
function runLoader() {
  const letters = $$(".loader-word span");
  const tl = gsap.timeline();
  tl.to(letters, { opacity: 1, y: 0, duration: .9, stagger: .07, ease: "power3.out" })
    .to(".loader-line", { width: 220, duration: .8, ease: "power2.inOut" }, "-=.4")
    .to(".loader-sub", { opacity: 1, duration: .6 }, "-=.5")
    .to("#loader", {
      opacity: 0, duration: .8, delay: .45, ease: "power2.inOut",
      onComplete: () => $("#loader").classList.add("done")
    });
}

/* ---------- Curseur ---------- */
(function cursor() {
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (!dot || matchMedia("(hover: none)").matches) return;
  let rx = innerWidth / 2, ry = innerHeight / 2;
  addEventListener("mousemove", e => {
    document.body.classList.add("has-mouse");
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    rx = e.clientX; ry = e.clientY;
  });
  gsap.ticker.add(() => {
    const x = gsap.getProperty(ring, "x"), y = gsap.getProperty(ring, "y");
    gsap.set(ring, { x: x + (rx - x) * .14, y: y + (ry - y) * .14 });
  });
  const hoverables = "a, button, .perfume-card, .mini-card, iframe";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(hoverables)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(hoverables)) ring.classList.remove("is-active");
  });
})();

/* ---------- Héro : lecture au défilement ---------- */
(function heroScrub() {
  const canvas = $("#hero-canvas");
  const ctx = canvas.getContext("2d");
  const FRAME_COUNT = 110;
  const framePath = i => `assets/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;
  const images = new Array(FRAME_COUNT);
  const state = { frame: 0 };

  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  }
  sizeCanvas();
  addEventListener("resize", () => { sizeCanvas(); render(); });

  function render() {
    const img = images[Math.round(state.frame)] || images.find(Boolean);
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  // Première image tout de suite, le reste en tâche de fond
  const first = new Image();
  first.src = framePath(0);
  first.onload = () => { images[0] = first; render(); };
  let loaded = 0;
  for (let i = 1; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.src = framePath(i);
    img.onload = () => { images[i] = img; if (++loaded === FRAME_COUNT - 1) render(); };
  }

  gsap.to(state, {
    frame: FRAME_COUNT - 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: .6
    },
    onUpdate: render
  });

  // Titres : présents à l'arrivée, s'effacent en défilant
  gsap.to(".hero-titles", {
    opacity: 0, letterSpacing: "+=0.08em", y: -60, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "28% bottom", scrub: true }
  });
  gsap.to(".hero-scroll-cue", {
    opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=500", scrub: true }
  });

  // Fusion vers le blanc + phrase de révélation en fin de séquence
  gsap.to(".hero-white", {
    opacity: 1, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "78% bottom", end: "bottom bottom", scrub: true }
  });
  gsap.fromTo(".hero-reveal",
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "84% bottom", end: "97% bottom", scrub: true }
    });

  // Entrée du héro
  gsap.from(".hero-kicker, .hero-name, .hero-tag", {
    opacity: 0, y: 34, duration: 1.4, stagger: .16, delay: 1.9, ease: "power3.out"
  });
})();

/* ---------- Navigation ---------- */
ScrollTrigger.create({
  start: "top -80",
  onUpdate: self => $(".nav").classList.toggle("is-solid", self.scroll() > innerHeight * .8)
});
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const target = $(a.getAttribute("href"));
  if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -60 }); }
}));

/* ---------- Bandeau ---------- */
(function marquee() {
  const track = $(".marquee-track");
  if (!track) return;
  track.innerHTML += track.innerHTML;
  gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
})();

/* ---------- Rendu catalogue ---------- */
const featured = PRODUCTS.filter(p => p.featured);
const others = PRODUCTS.filter(p => !p.featured);

$("#carousel-track").innerHTML = featured.map(p => `
  <article class="perfume-card" data-id="${p.id}">
    <div class="card-art">${productArtwork(p)}</div>
    <p class="card-house">${p.house}</p>
    <h3 class="card-name">${p.name}</h3>
    <p class="card-tagline">${p.tagline}</p>
    <p class="card-price">${fmt(p.price)}</p>
    <span class="card-cta">Découvrir</span>
  </article>`).join("");

$("#collection-grid").innerHTML = others.map(p => `
  <article class="mini-card reveal" data-id="${p.id}">
    <div class="mini-art">${productArtwork(p)}</div>
    <p class="mini-house">${p.house}</p>
    <h3 class="mini-name">${p.name}</h3>
    <p class="mini-price">${fmt(p.price)}</p>
  </article>`).join("");

/* ---------- Carrousel glissable ---------- */
(function carousel() {
  const track = $("#carousel-track");
  let offset = 0, startX = 0, startOffset = 0, dragging = false, moved = 0;

  const maxOffset = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
  const setX = (v, anim = true) => {
    offset = Math.max(Math.min(v, 0), -maxOffset());
    gsap.to(track, { x: offset, duration: anim ? .7 : .05, ease: "power3.out" });
  };

  const step = () => {
    const card = track.querySelector(".perfume-card");
    return card ? card.offsetWidth + parseFloat(getComputedStyle(track).gap) : 340;
  };

  $("#car-prev").addEventListener("click", () => setX(offset + step() * 1.5));
  $("#car-next").addEventListener("click", () => setX(offset - step() * 1.5));

  track.addEventListener("pointerdown", e => {
    dragging = true; moved = 0;
    startX = e.clientX; startOffset = offset;
    track.classList.add("dragging");
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    setX(startOffset + dx, false);
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("dragging");
    setX(Math.round(offset / step()) * step());
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);

  // Clic carte → fiche (ignoré si l'utilisateur vient de glisser)
  track.addEventListener("click", e => {
    if (moved > 8) return;
    const card = e.target.closest(".perfume-card");
    if (card) openProduct(card.dataset.id);
  });
  addEventListener("resize", () => setX(offset));
})();

$("#collection-grid").addEventListener("click", e => {
  const card = e.target.closest(".mini-card");
  if (card) openProduct(card.dataset.id);
});

/* ---------- Fiche produit ---------- */
const overlay = $("#product-overlay");
let currentProduct = null;

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  $("#ovl-art").innerHTML = `<div class="halo"></div>` + productArtwork(p, { large: true });
  $("#ovl-house").textContent = p.house;
  $("#ovl-name").textContent = p.name;
  $("#ovl-type").textContent = `${p.type} · ${p.size} · ${p.gender}`;
  $("#ovl-desc").textContent = p.description;
  $("#ovl-notes").innerHTML = `
    <h4>Pyramide olfactive</h4>
    ${[["Tête", p.notes.tete], ["Cœur", p.notes.coeur], ["Fond", p.notes.fond]].map(([tier, notes]) => `
      <div class="note-tier">
        <span class="tier">${tier}</span>
        <span class="chips">${notes.map(n => `<span class="chip">${n}</span>`).join("")}</span>
      </div>`).join("")}`;
  $("#ovl-price").textContent = fmt(p.price);
  $("#ovl-size").textContent = p.size;
  overlay.classList.add("open");
  lenis.stop();
  gsap.fromTo("#ovl-art svg, #ovl-art img", { y: 44, opacity: 0, rotate: -2 }, { y: 0, opacity: 1, rotate: 0, duration: 1, ease: "power3.out", delay: .18 });
  gsap.fromTo(".ovl-house, .ovl-name, .ovl-type, .ovl-desc, .pyramide, .ovl-buy",
    { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .07, ease: "power3.out", delay: .22 });
  gsap.fromTo("#ovl-notes .chip", { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, stagger: .03, ease: "back.out(2)", delay: .55 });
}
function closeProduct() {
  overlay.classList.remove("open");
  lenis.start();
}
$(".overlay-close").addEventListener("click", closeProduct);
$(".overlay-backdrop").addEventListener("click", closeProduct);
addEventListener("keydown", e => { if (e.key === "Escape") { closeProduct(); closeCart(); } });

$("#ovl-add").addEventListener("click", () => {
  if (currentProduct) { addToCart(currentProduct.id); closeProduct(); openCart(); }
});
$("#ovl-wa").addEventListener("click", () => {
  if (!currentProduct) return;
  const msg = `Bonjour SENTIA ✨\nJe souhaite commander : ${currentProduct.name} — ${currentProduct.house} (${currentProduct.size}) — ${fmt(currentProduct.price)}.`;
  open(`https://wa.me/${SENTIA_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ---------- Panier ---------- */
let cart = JSON.parse(localStorage.getItem("sentia-cart") || "[]");
const drawer = $("#cart-drawer");
const backdrop = $("#cart-backdrop");

function saveCart() { localStorage.setItem("sentia-cart", JSON.stringify(cart)); }
function cartTotal() { return cart.reduce((s, l) => s + l.qty * (PRODUCTS.find(p => p.id === l.id)?.price || 0), 0); }

function addToCart(id) {
  const line = cart.find(l => l.id === id);
  line ? line.qty++ : cart.push({ id, qty: 1 });
  saveCart(); renderCart();
  toast("Ajouté à votre sélection");
}

function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const badge = $(".cart-count");
  badge.textContent = count;
  badge.classList.toggle("show", count > 0);

  const box = $("#cart-items");
  if (!cart.length) {
    box.innerHTML = `<p class="cart-empty">Votre sélection est vide.<br>Laissez-vous tenter…</p>`;
  } else {
    box.innerHTML = cart.map(l => {
      const p = PRODUCTS.find(x => x.id === l.id);
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="thumb">${productArtwork(p)}</div>
        <div>
          <p class="ci-name">${p.name}</p>
          <p class="ci-house">${p.house}</p>
          <span class="ci-qty">
            <button data-act="minus" aria-label="Réduire">−</button>
            <span>${l.qty}</span>
            <button data-act="plus" aria-label="Augmenter">+</button>
          </span>
          <br><button class="ci-remove" data-act="remove">Retirer</button>
        </div>
        <p class="ci-price">${fmt(p.price * l.qty)}</p>
      </div>`;
    }).join("");
  }
  $("#cart-total").textContent = fmt(cartTotal());
}

$("#cart-items").addEventListener("click", e => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = btn.closest(".cart-item").dataset.id;
  const line = cart.find(l => l.id === id);
  if (btn.dataset.act === "plus") line.qty++;
  if (btn.dataset.act === "minus") { line.qty--; if (line.qty <= 0) cart = cart.filter(l => l.id !== id); }
  if (btn.dataset.act === "remove") cart = cart.filter(l => l.id !== id);
  saveCart(); renderCart();
});

function openCart() {
  drawer.classList.add("open"); backdrop.classList.add("show");
  showCartView(); lenis.stop();
}
function closeCart() {
  drawer.classList.remove("open"); backdrop.classList.remove("show");
  lenis.start();
}
$(".cart-btn").addEventListener("click", openCart);
$(".cart-close").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

/* ---------- Commande ---------- */
function showCartView() {
  $("#cart-view").style.display = "flex";
  $("#checkout-view").style.display = "none";
}
$("#go-checkout").addEventListener("click", () => {
  if (!cart.length) { toast("Votre sélection est vide"); return; }
  $("#cart-view").style.display = "none";
  $("#checkout-view").style.display = "block";
});
$(".checkout-back").addEventListener("click", showCartView);

function orderMessage(form) {
  const lines = cart.map(l => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `• ${p.name} — ${p.house} (${p.size}) × ${l.qty} = ${fmt(p.price * l.qty)}`;
  });
  return [
    `Bonjour SENTIA ✨ Nouvelle commande :`,
    ``, ...lines, ``,
    `Total : ${fmt(cartTotal())}`,
    ``, `Nom : ${form.nom}`, `Téléphone : ${form.tel}`,
    form.adresse ? `Livraison : ${form.adresse}` : `Retrait en boutique`,
    form.note ? `Note : ${form.note}` : ""
  ].filter(Boolean).join("\n");
}

$("#checkout-form").addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const msg = orderMessage(f);
  open(`https://wa.me/${SENTIA_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  toast("Commande transmise via WhatsApp");
  cart = []; saveCart(); renderCart();
  closeCart(); e.target.reset();
});

$("#wa-direct").addEventListener("click", () => {
  if (!cart.length) { toast("Votre sélection est vide"); return; }
  const msg = orderMessage({ nom: "—", tel: "—", adresse: "", note: "Commande express via le site" });
  open(`https://wa.me/${SENTIA_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(txt) {
  const t = $("#toast");
  $("#toast-text").textContent = txt;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- Révélations au défilement ---------- */
$$(".reveal").forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" }
  });
});
gsap.utils.toArray(".perfume-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0, y: 60, duration: 1, delay: (i % 4) * .08, ease: "power3.out",
    scrollTrigger: { trigger: ".icones", start: "top 70%" }
  });
});

/* ---------- Boutons magnétiques ---------- */
$$(".btn-gold, .btn-ghost, .carousel-arrow").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .18, duration: .4 });
  });
  btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: .5, ease: "elastic.out(1, .5)" }));
});

/* ---------- Init ---------- */
$("#map-iframe").src = `https://www.google.com/maps?q=${encodeURIComponent(SENTIA_CONFIG.storeAddress)}&output=embed`;
$("#boutique-adresse").textContent = SENTIA_CONFIG.storeAddress;
$("#footer-year").textContent = new Date().getFullYear();
renderCart();
runLoader();
