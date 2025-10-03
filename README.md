# Udbuds-demo
# Udbuds-demo med Playwright

Dette er en simpel demo af en udbudsportal frontend med automatiske tests i Playwright. Projektet er lavet til at demonstrere automatiserede tests af både UI og funktionalitet.

---

## Indhold

- `frontend/` – Vanilla JS frontend med Bootstrap
- `tests/` – Playwright tests for frontend
- `.github/workflows/` – GitHub Actions workflow

---

## Køre lokalt

1. **Installer dependencies**
```bash
npm install
npx playwright install
Start frontend
Hvis du bruger en simpel static server:
npx serve .
Hvis du har backend i Python med FastAPI:
uvicorn main:app --reload
Åbn i browser
Frontend bør køre på http://localhost:3000 eller den port, du har sat op.
Kør Playwright tests
npx playwright test
Kør Playwright med browser åbent (headed mode)
npx playwright test --headed