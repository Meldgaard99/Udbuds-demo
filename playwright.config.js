import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 1,
    reporter: 'list',
    use: {
        headless: false,           // altid synlig browser
        launchOptions: {
            slowMo: 500              // 500ms pause mellem handlinger
        }
    }
});
