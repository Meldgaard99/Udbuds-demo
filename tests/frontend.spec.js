import { test, expect } from '@playwright/test';

test('Frontend demo med forskellige assertions', async ({ page }) => {
    // --- 1. Åbn siden ---
    await page.goto('http://localhost:3000');

    // Tjek side title og URL
    await expect(page).toHaveTitle(/UdbudsPortal/);
    await expect(page).toHaveURL(/localhost:3000/);

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

    const budget = page.locator('text=500.000');
    await expect(budget).toBeVisible();

    // --- 5. Brug count for at tjekke antal udbud ---
    const alleUdbud = page.locator('.udbud-item'); // sørg for at alle udbud har class="udbud-item"
    await expect(alleUdbud).toHaveCount(4); // 3 prefilled + 1 nyt

    // --- 6. Bevidst fejlet assertion ---
    await expect(page.locator('text=IkkeEksisterendeUdbud')).toBeVisible();
});
