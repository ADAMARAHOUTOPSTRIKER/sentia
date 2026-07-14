# SENTIA — Haute Parfumerie

Site vitrine + panier pour la boutique Sentia. Ouvrir `index.html` via un petit serveur local
(`python3 -m http.server` dans ce dossier) — le canvas du héro charge 110 images, le protocole
`file://` peut les bloquer selon le navigateur.

## À personnaliser (2 minutes)

Dans `js/main.js`, tout en haut, le bloc `SENTIA_CONFIG` :

```js
whatsappNumber: "33600000000",   // votre numéro WhatsApp, format international sans "+"
storeAddress:  "12 Avenue des Champs-Élysées, 75008 Paris", // adresse réelle → pin Google Maps
```

L'adresse alimente automatiquement la carte Google Maps du bas de page et le bloc « La Boutique ».

## Remplacer les flacons dessinés par de vraies photos

Dans `js/products.js`, chaque produit possède un champ `photo: null`.
Déposez vos photos (fond transparent ou blanc, PNG conseillé) dans `assets/products/`
puis renseignez par exemple :

```js
photo: "assets/products/delina.png",
```

Le flacon SVG est alors remplacé partout (carrousel, grille, fiche, panier) sans rien changer d'autre.

## Structure

- `assets/frames/` — 110 images extraites de la vidéo Veo (défilement piloté au scroll, sans son)
- `js/products.js` — catalogue (23 parfums, pyramides olfactives réelles) + flacons SVG
- `js/main.js` — héro scroll-scrub, carrousel, fiches produit, panier localStorage, commande WhatsApp
- `js/vendor/` — GSAP, ScrollTrigger, Lenis (embarqués : aucun CDN requis)

## Commande

Le panier est conservé dans le navigateur (localStorage). « Finaliser la commande » ouvre
WhatsApp avec le récapitulatif complet (articles, total, coordonnées du client).
Aucun paiement en ligne pour l'instant — ajout possible plus tard (Stripe…).
