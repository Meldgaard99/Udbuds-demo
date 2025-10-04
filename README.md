# Udbuds-demo med Playwright

En simpel udbudsportal med automatiske end-to-end tests i Playwright og CI/CD via GitHub Actions.

---

## 🚀 Kom i gang lokalt

```bash
# 1. Installer dependencies
npm install
npx playwright install chromium

# 2. Start frontend
npx serve frontend -l 3000

# 3. Kør tests (i ny terminal)
npx playwright test

# Eller kør tests i UI mode
npx playwright test --ui
```

---

## 🧪 Om Playwright tests

### Hvorfor Playwright?
- **Browser automation** - tester rigtig brugeradfærd i browseren
- **Reliable** - automatisk venter på elementer er klar
- **Multiple assertions** - verificerer UI, tekst, synlighed, counts osv.
- **Screenshots & video** - automatisk ved fejl til debugging

### Hvordan er det sat op?

**Tests ligger i:** `tests/frontend.spec.js`

Hver test følger mønsteret:
```javascript
test('beskrivelse', async ({ page }) => {
    // 1. Navigation
    await page.goto(FRONTEND_URL);
    
    // 2. Interaktion (klik, udfyld, vælg)
    await page.fill('#search', 'IT-support');
    
    // 3. Assertions (verificer resultatet)
    await expect(results).toHaveCount(1);
});
```

**Configuration:** `playwright.config.js` - definerer testDir, retries, screenshots, osv.

---

## 🔄 CI/CD Workflow

**Fil:** `.github/workflows/playwright.yml`

### Hvad sker der automatisk?

Ved push eller PR til `main`:

1. **Setup** - Python 3.11 + Node.js 20
2. **Install** - npm packages + Python dependencies
3. **Start services** - Backend (port 8000) + Frontend (port 3000)
4. **Run tests** - Playwright tests i headless mode
5. **Upload artifacts** - Screenshots, video og rapporter ved fejl

### Hvorfor denne workflow?

- ✅ **Automatisk kvalitetskontrol** - catch bugs før deployment
- ✅ **Konsistent testmiljø** - samme setup hver gang
- ✅ **Hurtig feedback** - se med det samme hvis noget går galt
- ✅ **Dokumentation** - test-rapporter viser hvad der virker

---

## 📁 Projektstruktur

```
├── frontend/              # Vanilla JS + Bootstrap UI
├── backend/               # FastAPI (Python)
├── tests/                 # Playwright E2E tests
│   └── frontend.spec.js
├── .github/workflows/     # GitHub Actions
│   └── playwright.yml
└── playwright.config.js   # Test configuration
```

---

## 🛠️ Nyttige kommandoer

```bash
npm run test:ui       # Interaktiv test runner
npm run test:headed   # Se browser køre
npm run test:debug    # Debug mode
npm run codegen       # Generer nye tests automatisk
```