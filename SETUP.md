# Edituno setup

## Local development

1. Install Node.js 22 LTS.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

## Production

Run `npm run build`. The production app is generated in `dist/`.

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`.

In GitHub open Settings > Pages and choose `GitHub Actions` as the source. Push to `main`. The workflow will build and deploy the app.

## Custom domain

After buying and configuring `edituno.com`, add the custom domain in GitHub Pages settings. A CNAME file is intentionally not included yet because DNS ownership and final hosting have not been confirmed.

## PWA

The app includes a web app manifest, service worker, 192 px and 512 px app icons, standalone display mode and offline shell caching.
