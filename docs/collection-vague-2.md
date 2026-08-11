# SENTIA — Collection, vague 2

> Dix fragrances à générer dès la recharge de crédits (coût : 10 × 2 cr en 2K).
> Méthode identique à la vague 1 : **nano banana pro · 3:4 · 2K**, avec le flacon
> témoin en référence (job `29767b97-5c19-47ee-afc0-944c3d19adb8`, dans la
> bibliothèque Higgsfield du 2026-08-11) pour garder le même flacon, la même
> lumière de fenêtre et le même plateau ivoire.
>
> Gabarit de prompt commun — remplacer LIQUIDE / BOUCHON / ÉTIQUETTE / ACCESSOIRE :
> « Same bottle design, same ivory studio backdrop, same soft window light as the
> reference image. Fragrance "NOM": LIQUIDE, BOUCHON, ivory label with thin serif
> wordmark "SENTIA" and beneath it in smaller spaced capitals "NOM". ACCESSOIRE
> lying beside the bottle base. Ultra sharp luxury packshot, vertical composition. »

| # | Nom | Genre · Type · Prix | Flacon (liquide / bouchon) | Accessoire posé |
|---|---|---|---|---|
| 1 | **Rose de Minuit** | Elle · EdP · 175 € | bordeaux profond / noir laqué | un bouton de rose rouge sombre |
| 2 | **Menthe Impériale** | Mixte · EdP · 155 € | vert émeraude clair / laiton | brin de menthe fraîche + verre à thé doré |
| 3 | **Safran Royal** | Mixte · Extrait · 230 € | rouge-or intense / or poli | pincée de filaments de safran |
| 4 | **Cédrat Vert** | Mixte · EdP · 150 € | jaune-vert pâle / argent brossé | demi-cédrat aux zestes vifs |
| 5 | **Cuir Sellier** | Lui · EdP · 195 € | cognac très foncé / cuivre | chute de cuir havane roulée |
| 6 | **Figuier Blanc** | Mixte · EdP · 165 € | ivoire laiteux / bois clair | figue fraîche ouverte + feuille |
| 7 | **Miel de Datte** | Mixte · EdP · 170 € | ambre miel / or mat | deux dattes Majhoul + filet de miel |
| 8 | **Iris de Marbre** | Elle · EdP · 185 € | gris perle bleuté / argent poli | rhizome d'iris poudré |
| 9 | **Vétiver d'Argent** | Lui · EdP · 160 € | vert-gris fumé / étain | racines de vétiver nouées |
| 10 | **Musc du Soir** | Mixte · EdP · 165 € | blanc opalin / nacre | galet de musc blanc poudré |

## Notes olfactives (pour products.js)

1. **Rose de Minuit** — tête : Poivre noir, Litchi · cœur : Rose de Damas, Pivoine sombre · fond : Patchouli, Muscs noirs. *« La rose, après le coucher du soleil. »*
2. **Menthe Impériale** — tête : Menthe verte, Thé vert · cœur : Absinthe douce, Géranium · fond : Bois de santal, Sucre d'orge. *« Le thé à la menthe, en habit du soir. »*
3. **Safran Royal** — tête : Safran de Taliouine, Baie rose · cœur : Rose turque, Cuir doux · fond : Ambre, Bois précieux. *« L'épice la plus chère du monde, portée à même la peau. »*
4. **Cédrat Vert** — tête : Cédrat, Verveine · cœur : Petit grain, Basilic · fond : Muscs blancs, Cèdre clair. *« Le matin qui pique les yeux. »*
5. **Cuir Sellier** — tête : Bergamote fumée · cœur : Cuir pleine fleur, Tabac blond · fond : Fève tonka, Vétiver. *« L'atelier du maître sellier. »*
6. **Figuier Blanc** — tête : Feuille de figuier, Coco vert · cœur : Lait de figue, Fleur d'amandier · fond : Santal, Muscs doux. *« La sieste sous le figuier. »*
7. **Miel de Datte** — tête : Datte Majhoul, Orange confite · cœur : Miel d'oranger, Cannelle douce · fond : Benjoin, Vanille. *« Le sucre des oasis. »*
8. **Iris de Marbre** — tête : Bergamote givrée · cœur : Iris pallida, Violette poudrée · fond : Muscs propres, Bois blancs. *« Froide dehors, tendre dedans. »*
9. **Vétiver d'Argent** — tête : Pamplemousse, Gingembre · cœur : Vétiver de Java, Sauge · fond : Ambre gris, Pierre humide. *« La fraîcheur qui a du fond. »*
10. **Musc du Soir** — tête : Aldéhydes doux, Poire blanche · cœur : Musc blanc, Héliotrope · fond : Cachemire, Vanille de Madagascar. *« La peau, en mieux. »*

## Intégration (le jour J)
1. Générer les 10 (référence commune, 2K, 3:4) — vérifier chaque étiquette (le nom
   doit être lisible et exact ; c'est l'erreur la plus fréquente de nano sur le texte).
2. `scale=1200` → `assets/products/*.jpg`, ajouter les 10 entrées à `PRODUCTS`
   (featured:false → elles remplissent le Cabinet des Merveilles ; garder les 3 icônes actuelles).
3. Vérifier la grille (12 mini-cards), commit, `npx vercel deploy --prod --yes`.
