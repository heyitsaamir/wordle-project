const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  await page.goto('http://localhost:1234', { waitUntil: 'networkidle' });

  // Type a guess and submit via keyboard clicks so the keys show color states.
  const guess = 'CRANE';
  for (const letter of guess) {
    await page.getByRole('button', { name: `Letter ${letter}` }).click();
  }
  await page.getByRole('button', { name: 'Submit guess' }).click();
  await page.waitForTimeout(150);

  const styles = ['classic', 'minimal', 'pill'];
  for (const style of styles) {
    await page.evaluate((s) => {
      document.body.className = `keyboard-style-${s}`;
    }, style);
    await page.waitForTimeout(150);
    await page.screenshot({ path: `/tmp/keyboard-${style}.png`, fullPage: true });
    console.log(`Saved /tmp/keyboard-${style}.png`);
  }

  await browser.close();
})();
