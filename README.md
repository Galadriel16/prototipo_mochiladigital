# Mochila Digital · Prototipo frontend

Experiencia posterior a una autenticación **simulada**, implementada con React, TypeScript y Vite. El interior de una mochila escolar contiene objetos funcionales y ocho cuadernos/carpetas de recursos. No implementa servicios institucionales ni utiliza datos personales reales.

## Instalación y ejecución

Requisitos: Node.js 22.12 o posterior (validado con Node 24.16), npm y Chrome para las pruebas de navegador.

```sh
npm install
npm run dev
```

En Windows PowerShell, si la política bloquea `npm.ps1`, usar `npm.cmd install` y `npm.cmd run dev`. No es necesario cambiar la política de ejecución. Abrir la dirección local que imprime Vite (normalmente `http://127.0.0.1:5173`).

La aplicación comienza con el usuario ficticio Alex Mora. El carné permite cerrar la sesión de demostración y volver a entrar sin credenciales. Al recargar se vuelve al estado autenticado simulado; no se guarda una sesión real.

```sh
npm run build
npm run lint
npm test
```

El build queda en `dist/`. Las pruebas arrancan y cierran su propio servidor en el puerto 5173 y usan Chrome instalado, sin ventana. Ese puerto debe estar libre. En otra plataforma, ajustar el comando `webServer.command` de `playwright.config.ts` de `npm.cmd` a `npm`. Si se prefiere Chromium de Playwright, instalarlo con `npx playwright install chromium` y quitar `channel: 'chrome'` de la configuración.

## Funciones

- Carné: perfil ficticio, acerca de y salida de la sesión mock.
- Marcadores: favoritos locales con estado vacío y acciones para agregar/quitar.
- Libreta: tres noticias configurables de ejemplo, identificadas como simuladas.
- Tablet: ranking de aperturas locales; inicialmente vacío.
- Libro: tres cápsulas “Sabías que…” con controles anterior/siguiente.
- Smartphone: valoración de demostración; no envía ni persiste respuestas.
- Ocho cuadernos/carpetas: selección con elevación y estado explícito, panel de detalle y posterior acción “Abrir sitio”.
- Búsqueda por nombre/palabras clave, sin distinción de acentos o mayúsculas.
- Apariencia clara, oscura o del sistema, con persistencia y actualización reactiva.
- Navegación por teclado/toque, foco visible, diálogo con retorno de foco, Escape y reducción de movimiento.

Los enlaces externos conservan las URL exactas de `requerimientos.spec.md`, abren una pestaña nueva con `noopener noreferrer` y registran una apertura local. Un contador indica la acción de abrir, no que el sitio externo haya cargado correctamente.

## Estructura

```text
src/
  app/App.tsx                 Composición y estado de la experiencia
  components/backpack/        Escena, objetos reutilizables y contenido de paneles
  components/search/          Búsqueda sobre el catálogo
  components/theme/           Selector de apariencia
  components/ui/              Diálogo accesible
  data/                       Recursos, noticias y cápsulas
  hooks/                      Favoritos, visitas y tema
  services/auth/              Contrato y adaptador de autenticación mock
  services/analytics/         Contrato y contadores locales
  services/navigation.ts      Validación de URL y registro de apertura
  services/storage.ts         Lectura validada y escritura tolerante a fallos
  styles/                     Tokens, escena, objetos y temas
  types/                      Modelo de recurso
tests/                        Flujos, responsive y auditorías axe
artifacts/                    Capturas generadas durante las verificaciones
```

Los objetos comparten `BackpackItem`: control semántico, nombre accesible, ayuda visible, estados y estilos comunes. `DecorativeItem` mantiene los útiles decorativos fuera del árbol accesible y puede reutilizar ese control si adquiere una función en el futuro. Los seis objetos principales se componen en `SchoolObjects`; sus paneles reutilizan `AccessibleDialog` y `ToolContent`.

## Agregar un recurso

Añadir un registro a `src/data/resources.ts` con ID único, nombre, descripción, URL HTTPS, palabras clave, `objectType`, `external: true`, color y símbolo textual. No se necesita otro componente. Búsqueda, escena, favoritos y ranking usan ese catálogo. Los colores disponibles son `gold`, `turquoise`, `purple`, `green`, `coral`, `blue`, `pink` y `cream`. Ajustar el texto que indica el número de recursos si cambia el alcance del catálogo. Si se suministran activos oficiales, integrarlos con texto alternativo adecuado; actualmente se usan iniciales textuales y no logotipos institucionales.

## Persistencia y errores

Se guardan únicamente `mochila:v1:theme`, `mochila:v1:favorites` y `mochila:v1:visits` en `localStorage`. No se guardan contraseñas, tokens, perfil ni respuestas de valoración. Datos corruptos vuelven a valores seguros. Si la escritura está bloqueada, aparece un mensaje; favoritos, tema y contadores siguen disponibles durante la sesión en memoria, sin garantía de conservarse al recargar.

## Sustituir los mocks

1. Implementar `AuthService` de `src/services/auth/auth.types.ts` con el mecanismo suministrado por el MEP. Reemplazar la referencia a `mockAuthService` en `App.tsx`, retirar la entrada `enterDemo` exclusiva del prototipo y gestionar los estados/errores del servicio real. No añadir credenciales al repositorio.
2. Implementar el contrato `AnalyticsService` con la fuente autorizada y adaptar el hook de actualización si el servicio es asíncrono. Actualmente no se realizan solicitudes de analítica.
3. Sustituir `src/data/news.ts` por la fuente editorial autorizada, conservando el modelo de noticia y los estados de carga/error si se añade consumo remoto.
4. Reemplazar únicamente el flujo mock de valoración en `ToolContent` cuando se suministren servicio, condiciones y contrato de “Califícame”.

La autenticación, el perfil institucional, CMS, analítica real, sincronización de favoritos, persistencia en servidor y edición real del perfil están fuera del alcance. Ningún servicio de estos se ha inventado.

## Validación y pendientes

Consultar [REPORTE_IMPLEMENTACION.md](REPORTE_IMPLEMENTACION.md) para el resultado por fase, pruebas, limitaciones y pendientes institucionales. Las auditorías automáticas y revisión visual básica no equivalen a una certificación WCAG; queda pendiente validar con lectores de pantalla reales y con la identidad oficial suministrada.
