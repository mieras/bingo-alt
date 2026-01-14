# GitHub Pages Setup Guide - Bingo-Alt

Deze guide legt uit hoe de GitHub Pages setup werkt in dit project en hoe je updates kunt deployen.

## Huidige Setup

### 1. Vite Configuratie (`vite.config.js`)

De `base` path is ingesteld op de repository naam:

```javascript
export default defineConfig({
  base: '/Bingo-Alt/',
  // ... rest van config
})
```

**Belangrijk:** De `base` path moet exact overeenkomen met je repository naam (hoofdlettergevoelig).

### 2. Package.json Scripts

Het deploy script bouwt de app en publiceert naar GitHub Pages:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. Dependencies

De `gh-pages` CLI tool is geïnstalleerd als dev dependency:

```json
{
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

## Deploy naar GitHub Pages

### Stap 1: Zorg dat je op de main branch bent

```bash
git checkout main
```

### Stap 2: Run het deploy commando

```bash
npm run deploy
```

Dit commando:
1. Bouwt je app (`npm run build`)
2. Publiceert de `dist` folder naar de `gh-pages` branch
3. GitHub Pages serveert automatisch vanaf die branch

### Stap 3: Wacht op deployment

Na `npm run deploy` kan het enkele minuten duren voordat GitHub Pages de wijzigingen verwerkt.

Je app is beschikbaar op: **https://mieras.github.io/Bingo-Alt/**

## GitHub Pages Instellingen

Zorg ervoor dat in je GitHub repository settings:

1. Ga naar **Settings** → **Pages**
2. Bij **Source**, selecteer `gh-pages` branch
3. Bij **Folder**, selecteer `/ (root)`
4. Klik op **Save**

## Belangrijke Tips

- ✅ De `base` path (`/Bingo-Alt/`) moet **exact** overeenkomen met je repository naam
- ✅ Na `npm run deploy` kan het enkele minuten duren voordat GitHub Pages de wijzigingen verwerkt
- ✅ De `gh-pages` branch wordt automatisch aangemaakt en bijgewerkt bij elke deploy
- ✅ Je hoeft de `gh-pages` branch niet handmatig te committen - `gh-pages` CLI doet dit automatisch

## Troubleshooting

**Probleem:** Assets laden niet correct
- **Oplossing:** Controleer of de `base` path in `vite.config.js` exact overeenkomt met je repository naam (`/Bingo-Alt/`)

**Probleem:** 404 errors na deploy
- **Oplossing:** Wacht enkele minuten en controleer of de `gh-pages` branch correct is aangemaakt in je repository

**Probleem:** Witte pagina na deploy
- **Oplossing:** 
  - Controleer of GitHub Pages is ingesteld op `gh-pages` branch (niet GitHub Actions)
  - Controleer of de URL correct is: `https://mieras.github.io/Bingo-Alt/` (met trailing slash)
  - Wacht 2-3 minuten en refresh de pagina

**Probleem:** Routes werken niet
- **Oplossing:** Zorg ervoor dat je router is geconfigureerd voor de base path (bijv. React Router met `basename` prop)

## Workflow

1. Maak wijzigingen in je code
2. Test lokaal met `npm run dev`
3. Commit en push naar je `main` branch
4. Run `npm run deploy` om te publiceren naar GitHub Pages
5. Wacht enkele minuten tot de site live is

## Alternatieve Deploy Opties

Als je alleen de `gh-pages` branch wilt updaten zonder te builden (als je al een build hebt):

```bash
gh-pages -d dist
```

Of als je een andere folder wilt deployen:

```bash
gh-pages -d build
```

## Huidige Status

✅ **Vite configuratie:** `base: '/Bingo-Alt/'`  
✅ **Deploy script:** `npm run deploy`  
✅ **gh-pages dependency:** Geïnstalleerd  
✅ **GitHub Pages:** Geconfigureerd op `gh-pages` branch

De setup is compleet en klaar voor gebruik!
