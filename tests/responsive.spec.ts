import { test, expect } from '@playwright/test';
for (const width of [360,768,1024,1440]) {
  test(`Composición y controles a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await expect(page.locator('.resource-notebook')).toHaveCount(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const overflow = await page.locator('button').evaluateAll(elements => elements.filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.getAttribute('aria-label')));
    expect(overflow).toEqual([]);
    await page.screenshot({ path: `artifacts/desktop-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: 'Seleccionar Guías para el fortalecimiento de los aprendizajes 2026', exact: true }).click();
    const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
    expect(await dialog.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
    const bounds = await dialog.boundingBox(); expect(bounds!.width).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `artifacts/panel-${width}.png`, fullPage: true });
  });
}
