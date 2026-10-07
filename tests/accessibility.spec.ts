import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const objects = ['Carné estudiantil: perfil de la cuenta', 'Marcadores: favoritos', 'Libreta: noticias destacadas', 'Tablet: sitios más visitados', 'Libro: Sabías que…', 'Smartphone: Califícame'];
for (const theme of ['light','dark']) {
  test(`Auditoría WCAG automatizada: ${theme}, escena y paneles`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('/'); await expect(page.locator('.resource-notebook')).toHaveCount(8);
    await page.getByLabel('Apariencia').selectOption(theme);
    const audit = async () => { const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze(); expect(result.violations).toEqual([]); };
    await audit();
    await page.screenshot({ path: `artifacts/theme-${theme}.png`, fullPage: true });
    for (const name of objects) { await page.getByRole('button',{name,exact:true}).click(); await audit(); await page.keyboard.press('Escape'); }
    await page.getByRole('button',{name:'Seleccionar Educ@tico',exact:true}).click(); await audit();
    expect(errors).toEqual([]);
  });
}
test('Teclado, foco del diálogo, Escape y retorno al cuaderno', async ({ page }) => {
  await page.goto('/'); await expect(page.locator('.resource-notebook')).toHaveCount(8);
  await page.keyboard.press('Tab'); await expect(page.getByText('Saltar al contenido')).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('#contenido')).toBeFocused();
  const button = page.getByRole('button', { name:'Seleccionar AprendizUp',exact:true }); await button.focus(); await page.keyboard.press('Space');
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i=0;i<8;i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true); }
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(button).toBeFocused();
  await page.keyboard.press('Enter'); await page.getByRole('button', {name:'Cerrar panel',exact:true}).click(); await expect(button).toBeFocused();
});
test('Reflow a 320px, targets y movimiento reducido', async ({ page }) => {
  await page.setViewportSize({width:320,height:800}); await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/'); await expect(page.locator('.resource-notebook')).toHaveCount(8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const sizes = await page.locator('button,input,select').evaluateAll(es => es.map(e => e.getBoundingClientRect().height)); expect(sizes.every(h => h>=44)).toBe(true);
  const notebook = page.locator('.resource-notebook').first(); await notebook.hover(); expect(await notebook.evaluate(e => getComputedStyle(e).transform)).toBe('none'); expect(await notebook.evaluate(e => getComputedStyle(e).transitionDuration)).toBe('0s');
  await page.screenshot({path:'artifacts/reflow-320.png',fullPage:true});
});
