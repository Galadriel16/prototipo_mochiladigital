import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => { await page.goto('/'); await expect(page.locator('.resource-notebook')).toHaveCount(8); });
test('Ocho URLs suministradas, selección sin navegación y visitas locales', async ({page,context}) => {
  const urls = [
    'https://aprendizup.mep.go.cr/',
    'https://recursos.mep.go.cr/2021/coleccion_gespro/app/',
    'https://www.mep.go.cr/educatico',
    'https://aprendo-pura-vida.learningpassport.org/',
    'https://calendario.mep.go.cr/2026/app/',
    'https://mep.janium.net/janium-bin/otros_catalogos.pl?Id=20261007082113',
    'https://engage.cloud.microsoft/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIyMDI5NjkwMTQyNzIifQ/all',
    'https://recursos.mep.go.cr/2026/guias-fortalecimiento-aprendizajes/app/',
  ];
  // Interceptar sitios externos: no se evalúa ni se afirma una integración real.
  await context.route('https://**/*', route => route.fulfill({contentType:'text/html',body:'<title>Destino externo simulado en prueba</title>'}));
  for (let i=0;i<urls.length;i++) {
    await page.locator('.resource-notebook').nth(i).click();
    expect(context.pages()).toHaveLength(1); await expect(page.locator('.is-selected')).toHaveCount(1);
    const link = page.getByRole('link',{name:/Abrir sitio/}); await expect(link).toHaveAttribute('href',urls[i]); await expect(link).toHaveAttribute('rel','noopener noreferrer');
    const popupPromise = page.waitForEvent('popup'); await link.click(); const popup = await popupPromise; await popup.waitForLoadState(); expect(popup.url()).toBe(urls[i]); await popup.close();
    await page.getByRole('button',{name:'Cerrar panel',exact:true}).click();
  }
  await page.reload(); await page.getByRole('button',{name:'Tablet: sitios más visitados',exact:true}).click();
  await expect(page.locator('.panel-list li')).toHaveCount(8); await expect(page.getByText('1 visita',{exact:true})).toHaveCount(8);
});
test('Favoritos: agregar, persistir, seleccionar y quitar', async ({page}) => {
  await page.getByRole('button',{name:'Marcadores: favoritos',exact:true}).click(); await expect(page.getByText('Tu primer favorito te espera')).toBeVisible(); await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Seleccionar AprendizUp',exact:true}).click(); await page.getByRole('button',{name:'☆ Agregar a favoritos',exact:true}).click(); await expect(page.getByRole('button',{name:'★ Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.reload(); await page.getByRole('button',{name:'Marcadores: favoritos',exact:true}).click(); await page.getByRole('button',{name:'AprendizUp',exact:true}).click(); await expect(page.getByRole('dialog')).toHaveAccessibleName('AprendizUp');
  await page.keyboard.press('Escape'); await expect(page.locator('#resource-aprendizup')).toBeFocused();
  await page.getByRole('button',{name:'Marcadores: favoritos',exact:true}).click(); await page.getByRole('button',{name:'Quitar AprendizUp de favoritos',exact:true}).click(); await expect(page.getByText('Tu primer favorito te espera')).toBeVisible();
});
test('Búsqueda por nombre, palabras clave, acentos y selección con teclado', async ({page}) => {
  const input=page.getByRole('searchbox'); await input.fill('GUIAS fortalecimiento'); await expect(page.getByRole('status')).toHaveText('1 recurso encontrado'); await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Guías para el fortalecimiento de los aprendizajes 2026'); await page.keyboard.press('Escape'); await expect(page.locator('#resource-guias')).toBeFocused();
  await input.fill('docentes'); await expect(page.getByRole('status')).toHaveText('2 recursos encontrados'); await input.fill('zzzzzzz'); await expect(page.getByRole('status')).toContainText('No encontramos recursos');
});
test('Tema persistente y preferencia del sistema reactiva', async ({page}) => {
  await page.getByLabel('Apariencia').selectOption('dark'); await expect(page.locator('html')).toHaveAttribute('data-theme','dark'); await page.reload(); await expect(page.getByLabel('Apariencia')).toHaveValue('dark');
  await page.getByLabel('Apariencia').selectOption('system'); await page.emulateMedia({colorScheme:'light'}); await expect(page.locator('html')).toHaveAttribute('data-theme','light'); await page.emulateMedia({colorScheme:'dark'}); await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
});
test('Noticias, cápsulas, rating y sesión mock mediante teclado', async ({page}) => {
  await page.getByRole('button',{name:'Libreta: noticias destacadas',exact:true}).click(); await expect(page.locator('.news-entry')).toHaveCount(3); await expect(page.getByText('Contenido simulado · No son anuncios oficiales.')).toBeVisible(); await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Libro: Sabías que…',exact:true}).focus(); await page.keyboard.press('Enter'); await expect(page.getByRole('button',{name:'← Anterior',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Siguiente →',exact:true}).click(); await page.getByRole('button',{name:'Siguiente →',exact:true}).click(); await expect(page.getByText('CÁPSULA 3 DE 3')).toBeVisible(); await expect(page.getByRole('button',{name:'Siguiente →',exact:true})).toBeDisabled(); await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Smartphone: Califícame',exact:true}).click(); await expect(page.getByRole('button',{name:'Simular valoración'})).toBeDisabled(); await page.getByRole('radio').last().check(); await page.getByRole('button',{name:'Simular valoración'}).click(); await expect(page.getByRole('status')).toContainText('valoración fue simulada'); await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Carné estudiantil: perfil de la cuenta',exact:true}).click(); await page.getByText('Acerca de Mochila Digital',{exact:true}).click(); await expect(page.getByText(/No existe autenticación institucional/)).toBeVisible(); await page.getByRole('button',{name:'Cerrar sesión de demostración'}).click(); await expect(page.locator('.backpack')).toHaveCount(0); await page.getByRole('button',{name:'Entrar a la demostración'}).click(); await expect(page.locator('.resource-notebook')).toHaveCount(8);
});
test('Persistencia corrupta y almacenamiento bloqueado no impiden usar la mochila', async ({page,context}) => {
  await page.evaluate(() => {localStorage.setItem('mochila:v1:favorites','{incorrecto');localStorage.setItem('mochila:v1:visits','{"aprendizup":-1}');localStorage.setItem('mochila:v1:theme','"no-existe"');});
  await page.reload(); await expect(page.locator('.resource-notebook')).toHaveCount(8); await expect(page.getByLabel('Apariencia')).toHaveValue('system');
  await page.addInitScript(() => { Storage.prototype.setItem = () => {throw new Error('bloqueado en prueba');}; }); await page.reload();
  await page.getByRole('button',{name:'Seleccionar AprendizUp',exact:true}).click(); await page.getByRole('button',{name:'☆ Agregar a favoritos',exact:true}).click(); await expect(page.getByRole('dialog').getByRole('status')).toContainText('No se pudo guardar');
  await context.route('https://**/*',route=>route.fulfill({body:'Prueba externa'})); const popupPromise=page.waitForEvent('popup'); await page.getByRole('link',{name:/Abrir sitio/}).click(); const popup=await popupPromise; await popup.close(); await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Tablet: sitios más visitados',exact:true}).click(); await expect(page.getByText('1 visita',{exact:true})).toBeVisible();
});
test('Todos los objetos se activan mediante toque', async ({browser}) => {
  const context = await browser.newContext({viewport:{width:360,height:800},hasTouch:true,isMobile:true}); const page = await context.newPage(); await page.goto('/'); await expect(page.locator('.resource-notebook')).toHaveCount(8);
  for (const selector of ['.student-card','.bookmark-object','.news-object','.tablet-object','.fact-object','.phone-object','.resource-notebook']) { await page.locator(selector).first().tap(); await expect(page.getByRole('dialog')).toBeVisible(); await page.getByRole('button',{name:'Cerrar panel',exact:true}).tap(); }
  await context.close();
});

