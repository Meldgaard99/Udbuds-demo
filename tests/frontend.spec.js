import { test, expect } from '@playwright/test';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

test('Frontend demo med forskellige assertions', async ({ page }) => {
    // --- 1. Åbn siden ---
    await page.goto(FRONTEND_URL);

    // Tjek side title og URLfff
    await expect(page).toHaveTitle(/UdbudsPortal/);
    await expect(page).toHaveURL(new RegExp(FRONTEND_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

    // --- 2. Tjek synlighed og tekst på elementer ---
    const header = page.locator('text=UdbudsPortal');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('UdbudsPortal');

    const førsteUdbud = page.locator('text=IT-support til kommunal forvaltning');
    await expect(førsteUdbud).toBeVisible();
    await expect(førsteUdbud).toContainText('IT-support');

    // --- 3. Tjek formularen ---
    await page.click('#toggleFormBtn');
    const formContainer = page.locator('#udbudFormContainer');
    await expect(formContainer).toBeVisible();

    // Tjek at inputfelter er enabled
    await expect(page.locator('#titel')).toBeEnabled();
    await expect(page.locator('#deadline')).toBeEnabled();
    await expect(page.locator('#budget')).toBeEnabled();

    // --- 4. Tilføj et nyt udbud ---
    await page.fill('#titel', 'Nyt test-udbud');
    await page.fill('#deadline', '2025-12-01');
    await page.fill('#budget', '500000');
    await page.fill('#organisation', 'Test Kommune');
    await page.selectOption('#kategori', 'Indkøb');

    await page.click('#udbudForm button[type="submit"]');

    const nytUdbud = page.locator('text=Nyt test-udbud');
    await expect(nytUdbud).toBeVisible();
    await expect(nytUdbud).toHaveText('Nyt test-udbud');

    // Tjek budget i det nye udbud - brug en mere specifik locator
    const nytUdbudCard = page.locator('.card.mb-2').filter({ hasText: 'Nyt test-udbud' });
    await expect(nytUdbudCard).toBeVisible();
    await expect(nytUdbudCard).toContainText('500,000 DKK');
    await expect(nytUdbudCard).toContainText('Test Kommune');

    // --- 5. Brug count for at tjekke antal udbud ---
    // Frontend bruger .card.mb-2 class til udbud
    const alleUdbud = page.locator('.card.mb-2');
    await expect(alleUdbud).toHaveCount(4); // 3 prefilled + 1 nyt
});

// Ekstra test uden den bevidst fejlende assertion
test('Søgefunktionalitet', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Test søgning
    await page.fill('#search', 'IT-support');

    // Vent lidt på filtering
    await page.waitForTimeout(100);

    // Skal kun vise 1 resultat
    const results = page.locator('.card.mb-2');
    await expect(results).toHaveCount(1);

    // Clear søgning
    await page.fill('#search', '');
    await page.waitForTimeout(100);

    // Tilbage til 3 resultater
    await expect(results).toHaveCount(3);
});

test('Kategori filter', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Tjek at der er 3 udbud fra start
    const results = page.locator('.card.mb-2');
    await expect(results).toHaveCount(3);

    // Vælg IT & Teknologi
    await page.selectOption('#filterKategori', 'IT & Teknologi');
    await page.waitForTimeout(100);

    // Skal kun vise 1 resultat
    await expect(results).toHaveCount(1);

    // Verificer at det rigtige udbud vises
    await expect(page.locator('text=IT-support til kommunal forvaltning')).toBeVisible();
    await expect(page.locator('text=Bygningsentreprise')).not.toBeVisible();
    await expect(page.locator('text=Levering af kontormøbler')).not.toBeVisible();

    // Vælg Byggeri & Anlæg
    await page.selectOption('#filterKategori', 'Byggeri & Anlæg');
    await page.waitForTimeout(100);

    // Skal også kun vise 1 resultat
    await expect(results).toHaveCount(1);
    await expect(page.locator('text=Bygningsentreprise')).toBeVisible();
    await expect(page.locator('text=IT-support')).not.toBeVisible();

    // Vælg alle
    await page.selectOption('#filterKategori', 'Alle');
    await page.waitForTimeout(100);

    // Tilbage til 3 resultater
    await expect(results).toHaveCount(3);
    await expect(page.locator('text=IT-support til kommunal forvaltning')).toBeVisible();
    await expect(page.locator('text=Bygningsentreprise')).toBeVisible();
    await expect(page.locator('text=Levering af kontormøbler')).toBeVisible();
});