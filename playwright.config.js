import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 1,
    reporter: [
        ['list'],
        ['html', { open: 'never' }]  // ← Tilføj denne linje
    ],
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    }
});