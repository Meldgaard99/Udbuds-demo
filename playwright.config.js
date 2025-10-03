import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 1,
    reporter: 'list',
    use: {
        headless: true,           // headless i CI
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        }
});
