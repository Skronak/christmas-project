# Déploiement sur Cloudflare Pages

## 1) Créer le dépôt Git

- `git init` / `git add .` / `git commit -m "initial"` / push sur GitHub

## 2) Créer une D1 Database dans Cloudflare

1. Dans le dashboard Cloudflare → **D1** → Create database.
2. Donne-lui un nom (ex: `todo_db`).
3. Exécute le script `migrations/init.sql` pour créer les tables et insérer les users. Tu peux le faire via l'interface D1 ou `wrangler d1` si tu veux.

> Si tu utilises l'UI D1 : ouvre la DB → SQL editor → colle `migrations/init.sql` → run.

## 3) Déployer sur Cloudflare Pages

1. Dans Cloudflare → **Pages** → Create a project → connecte ton repo GitHub.
2. Lors de la configuration :
    - Build command: `npm run build`
    - Build output dir: `dist`
3. Dans la configuration du projet Pages → **Settings** → **Functions**
    - Assure-toi que le dossier `functions/` est bien détecté.
4. Dans **Settings > Variables**, ajoute un binding pour D1 :
    - Variable name: `DB`
    - Choisis ta D1 database `todo_db` et bind la.

## 4) Tester localement (optionnel)

- Installe `wrangler` si tu veux tester Functions / D1 localement, et suis la doc Cloudflare pour `wrangler pages dev`.

## 5) Mises en garde

- Les noms utilisateurs doivent déjà exister en base (selon ta demande). Si l'utilisateur entre un nom non existant, l'API renvoie `404 User not found`.
- Pour la session on stocke l'objet user (id + name) dans `localStorage` côté client.
