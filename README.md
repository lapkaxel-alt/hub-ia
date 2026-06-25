# IA Hub — PWA

> Application web progressive (PWA) pour accéder rapidement aux meilleures intelligences artificielles.

![License](https://img.shields.io/badge/license-MIT-green)
![PWA](https://img.shields.io/badge/PWA-ready-blueviolet)

---

## Fonctionnalités

- **Accueil** — Boutons d'accès rapide vers ChatGPT, Claude, Copilot et Gemini + IA du jour
- **Catalogue** — Plus de 270 IA classées en 9 catégories avec recherche et filtres
- **Favoris** — Sauvegarde tes IA préférées (persistance via localStorage)
- **Comparateur** — Compare deux IA côte à côte
- **Mode hors-ligne** — Fonctionne sans connexion grâce au Service Worker
- **Installable** — S'installe sur le bureau comme une vraie application

---

## Structure du projet

```
ia-hub-pwa/
├── index.html        # Application principale
├── styles.css        # Feuille de styles
├── script.js         # Logique d'origine
├── manifest.json     # Configuration PWA
├── sw.js             # Service Worker (cache offline)
├── icons/
│   ├── icon-192.png  # Icône PWA petite
│   └── icon-512.png  # Icône PWA grande
├── .gitignore
├── LICENSE
└── README.md
```

---

## Déploiement

La PWA nécessite un hébergement **HTTPS** pour que le Service Worker s'active.

### GitHub Pages

```bash
# 1. Crée un dépôt GitHub et pousse les fichiers
git init
git add .
git commit -m "init: IA Hub PWA"
git remote add origin https://github.com/TON_NOM/ia-hub.git
git push -u origin main

# 2. Active GitHub Pages dans Settings → Pages → Source: main
```

Ton app sera disponible sur `https://TON_NOM.github.io/ia-hub`

### Netlify

Glisse-dépose le dossier sur [netlify.com/drop](https://app.netlify.com/drop) — déployé instantanément.

---

## Installation comme application de bureau

1. Ouvre l'URL de ton déploiement dans **Chrome** ou **Edge**
2. Clique sur l'icône **Installer** dans la barre d'adresse (⊕)
3. L'app s'installe sur le bureau et dans le menu Démarrer

---

## Développement local

```bash
# Avec Python (recommandé)
python -m http.server 8000
# Puis ouvre http://localhost:8000

# Avec Node.js
npx serve .
```

> Le Service Worker ne s'active pas avec `file://` — utilise toujours un serveur local.

---

## Licence

MIT © 2026 — IA Hub
