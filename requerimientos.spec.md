# requerimientos.spec.md --- Mochila Digital interactiva

## 1. Propósito

Definir los requerimientos funcionales, visuales, responsive y de
accesibilidad para un prototipo frontend de **Mochila Digital**,
posterior al inicio de sesión.

La experiencia debe sustituir el concepto convencional de portal por una
interfaz inmersiva que represente **el interior de una mochila
escolar**.

## 2. Punto de entrada

Sitio institucional de referencia:

`https://mochiladigital.mep.go.cr/app/`

### REQ-AUTH-001

El prototipo debe representar el estado **posterior a una autenticación
satisfactoria**.

### REQ-AUTH-002

La autenticación real queda fuera del alcance inicial. Debe utilizarse
un usuario ficticio/mock.

### REQ-AUTH-003

La arquitectura debe permitir sustituir posteriormente el mock por el
mecanismo institucional sin rediseñar la interfaz.

------------------------------------------------------------------------

## 3. Concepto visual

### REQ-UI-001

La pantalla principal debe transmitir visualmente la sensación de
observar **el interior de una mochila abierta**.

### REQ-UI-002

Los accesos no se presentarán principalmente como tarjetas
tradicionales. Deben representarse mediante objetos escolares
reconocibles.

### REQ-UI-003

La escena podrá incluir elementos decorativos tales como: -
bolígrafos; - lápices; - caja/estuche de lápices de color; - regla; -
clips; - notas adhesivas; - otros útiles escolares.

### REQ-UI-004

Los objetos decorativos deben diseñarse de forma que en versiones
futuras puedan convertirse en objetos interactivos sin rehacer la
escena.

### REQ-UI-005

Debe existir jerarquía visual, profundidad y superposición controlada,
sin afectar legibilidad ni accesibilidad.

------------------------------------------------------------------------

## 4. Objetos funcionales

  ID       Objeto                 Función
  -------- ---------------------- ------------------------------
  OBJ-01   Carné estudiantil      Perfil de la cuenta
  OBJ-02   Marcadores de página   Favoritos
  OBJ-03   Libreta                Noticias destacadas
  OBJ-04   Tablet                 Sitios más visitados
  OBJ-05   Libro de texto         "Sabías que..."
  OBJ-06   Cuadernos/carpetas     Acceso a recursos educativos
  OBJ-07   Smartphone             "Califícame"

### 4.1 Carné estudiantil

#### REQ-PROFILE-001

Debe mostrar una representación visual de carné.

#### REQ-PROFILE-002

Al activarlo debe mostrar un panel/menú con: - Perfil de la cuenta. -
Acerca de. - Cerrar sesión.

#### REQ-PROFILE-003

Los datos del prototipo serán ficticios.

### 4.2 Marcadores

#### REQ-FAV-001

Los marcadores de página representan los sitios educativos favoritos.

#### REQ-FAV-002

La persona debe poder agregar o quitar recursos de favoritos.

#### REQ-FAV-003

En el prototipo, los favoritos pueden persistirse mediante
`localStorage`.

#### REQ-FAV-004

Debe existir un estado vacío comprensible.

### 4.3 Libreta de noticias

#### REQ-NEWS-001

Una libreta debe presentar las noticias más destacadas de Mochila
Digital.

#### REQ-NEWS-002

Para el prototipo se utilizarán datos simulados/configurables.

#### REQ-NEWS-003

Cada noticia debe admitir como mínimo título, fecha, resumen y enlace
opcional.

### 4.4 Tablet --- sitios más visitados

#### REQ-VISITS-001

La tablet debe mostrar un recuento/ranking de los sitios más visitados.

#### REQ-VISITS-002

En el prototipo los contadores pueden ser simulados o incrementarse
localmente al abrir recursos.

#### REQ-VISITS-003

Debe quedar desacoplada la fuente de datos para futura integración con
analítica real.

### 4.5 Libro "Sabías que..."

#### REQ-DYK-001

El libro debe mostrar el segmento **"Sabías que..."**.

#### REQ-DYK-002

Debe admitir varias cápsulas de información.

#### REQ-DYK-003

La navegación entre cápsulas debe ser accesible mediante teclado y
controles visibles.

### 4.6 Smartphone "Califícame"

#### REQ-RATE-001

Debe existir un teléfono inteligente claramente identificable.

#### REQ-RATE-002

Al activarlo debe abrir la experiencia **"Califícame"**.

#### REQ-RATE-003

Si el endpoint real no está disponible, debe utilizarse una
pantalla/modal mock claramente identificada en código.

------------------------------------------------------------------------

## 5. Recursos educativos

Los recursos se modelarán como datos configurables.

  -----------------------------------------------------------------------------------------------------------------------------------------------------
  ID                      Nombre sugerido         URL
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------
  RES-01                  AprendizUp              `https://aprendizup.mep.go.cr/`

  RES-02                  Colección GESPRO        `https://recursos.mep.go.cr/2021/coleccion_gespro/app/`

  RES-03                  Educ@tico               `https://www.mep.go.cr/educatico`

  RES-04                  Aprendo Pura Vida       `https://aprendo-pura-vida.learningpassport.org/`

  RES-05                  Calendario Escolar 2026 `https://calendario.mep.go.cr/2026/app/`

  RES-06                  Catálogo colectivo de   `https://mep.janium.net/janium-bin/otros_catalogos.pl?Id=20261007082113`
                          bibliotecas del MEP     

  RES-07                  TecnoAula               `https://engage.cloud.microsoft/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIyMDI5NjkwMTQyNzIifQ/all`

  RES-08                  Guías para el           `https://recursos.mep.go.cr/2026/guias-fortalecimiento-aprendizajes/app/`
                          fortalecimiento de los  
                          aprendizajes 2026       
  -----------------------------------------------------------------------------------------------------------------------------------------------------

### REQ-RES-001

Cada recurso debe representarse como carpeta o cuaderno.

### REQ-RES-002

La portada debe mostrar: - nombre del recurso; - icono/logotipo cuando
exista un activo autorizado; - alternativa visual accesible si no existe
icono.

### REQ-RES-003

Al seleccionar un recurso: 1. debe elevarse visualmente sobre los demás;
2. aumentar moderadamente su escala; 3. pasar al primer plano; 4.
revelar claramente nombre e icono; 5. ofrecer una acción explícita
**"Abrir sitio"**; 6. permitir cancelar/cerrar.

### REQ-RES-004

La selección no debe provocar inmediatamente una navegación externa.

### REQ-RES-005

La acción "Abrir sitio" abrirá la URL configurada.

### REQ-RES-006

El estado seleccionado debe ser comprensible sin depender únicamente de
animación o color.

### REQ-RES-007

En escritorio podrá utilizarse `hover` como mejora progresiva, pero
nunca como única forma de mostrar nombre o función.

### REQ-RES-008

En móvil/tablet la interacción equivalente debe funcionar mediante toque
y foco.

------------------------------------------------------------------------

## 6. Búsqueda

### REQ-SEARCH-001

Mantener una función de búsqueda de recursos educativos.

### REQ-SEARCH-002

Debe buscar, como mínimo, por nombre y palabras clave.

### REQ-SEARCH-003

Los resultados deben poder recorrerse con teclado.

### REQ-SEARCH-004

La búsqueda debe reutilizar el mismo catálogo de recursos de la mochila.

------------------------------------------------------------------------

## 7. Temas visuales

### REQ-THEME-001

Incluir: - modo claro; - modo oscuro; - opción de respetar preferencia
del sistema.

### REQ-THEME-002

La preferencia debe persistirse localmente.

### REQ-THEME-003

Ambos modos deben mantener contraste suficiente.

------------------------------------------------------------------------

## 8. Etiquetado y ayudas contextuales

### REQ-TIP-001

Los objetos interactivos deben disponer de nombre accesible y ayuda
contextual.

### REQ-TIP-002

En escritorio, la ayuda puede aparecer al posicionar el cursor y al
recibir foco.

### REQ-TIP-003

En pantallas táctiles debe existir una alternativa que no dependa de
`hover`.

### REQ-TIP-004

Los tooltips no deben contener información imprescindible que no exista
por otro medio.

------------------------------------------------------------------------

## 9. Responsive

### REQ-RWD-001

El prototipo debe funcionar en: - escritorio; - laptop; - tablet; -
teléfono.

### REQ-RWD-002

La metáfora de mochila debe conservarse en todos los tamaños, aunque la
composición de los objetos pueda reorganizarse.

### REQ-RWD-003

No debe existir desplazamiento horizontal accidental.

### REQ-RWD-004

Los controles deben conservar un área táctil adecuada.

### REQ-RWD-005

Como referencia de diseño se validarán anchos aproximados de 360, 768,
1024 y 1440 px, sin depender exclusivamente de breakpoints rígidos.

------------------------------------------------------------------------

## 10. Accesibilidad

### REQ-A11Y-001

Objetivo: WCAG 2.2 AA en los aspectos aplicables al prototipo.

### REQ-A11Y-002

Toda función debe poder utilizarse mediante teclado.

### REQ-A11Y-003

Debe existir indicador de foco visible.

### REQ-A11Y-004

Utilizar HTML semántico y controles nativos siempre que sea viable.

### REQ-A11Y-005

Las imágenes informativas deben disponer de texto alternativo apropiado.
Las decorativas deben ocultarse a tecnologías de asistencia cuando
corresponda.

### REQ-A11Y-006

Debe soportarse zoom/reflow sin pérdida de información o funcionalidad.

### REQ-A11Y-007

Respetar `prefers-reduced-motion`.

### REQ-A11Y-008

No comunicar estados únicamente mediante color.

### REQ-A11Y-009

Los modales/paneles deben gestionar foco correctamente y cerrarse
mediante `Escape` cuando aplique.

### REQ-A11Y-010

Incluir enlace de salto al contenido principal cuando la estructura lo
requiera.

------------------------------------------------------------------------

## 11. Paleta y línea gráfica

Tomar como referencia visual la captura suministrada de Mochila Digital.

Tokens iniciales:

``` css
--color-purple-500: #6C3B7A;
--color-purple-700: #4D2864;
--color-gold-500: #F5C928;
--color-gold-300: #F8D85A;
--color-turquoise-500: #45D4C7;
--color-green-500: #70D93C;
--color-neutral-100: #ECECEC;
--color-white: #FFFFFF;
--color-text: #26222A;
```

### REQ-BRAND-001

La paleta debe centralizarse mediante variables/tokens.

### REQ-BRAND-002

La estética debe ser educativa, amigable, contemporánea y profesional.

### REQ-BRAND-003

No debe infantilizar excesivamente la interfaz: Mochila Digital puede
ser utilizada por diferentes poblaciones educativas.

### REQ-BRAND-004

No alterar ni recrear logotipos institucionales sin activos oficiales.

------------------------------------------------------------------------

## 12. Estados de interfaz

Los componentes interactivos deben contemplar: - default; - hover,
cuando aplique; - focus; - active/pressed; - selected; - disabled,
cuando aplique; - loading, si posteriormente consume datos; - empty; -
error.

------------------------------------------------------------------------

## 13. Modelo mínimo de recurso

``` ts
export interface EducationalResource {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  url: string;
  icon?: string;
  keywords: string[];
  objectType: "notebook" | "folder";
  favorite?: boolean;
  external: true;
}
```

------------------------------------------------------------------------

## 14. Requisitos no funcionales

### REQ-NF-001

No deben existir errores en consola durante el flujo principal.

### REQ-NF-002

La carga inicial debe mantenerse razonable evitando imágenes
innecesariamente pesadas.

### REQ-NF-003

Los activos deben optimizarse.

### REQ-NF-004

Los componentes deben ser reutilizables y mantenibles.

### REQ-NF-005

No introducir secretos en el repositorio.

### REQ-NF-006

La aplicación debe funcionar aun cuando las integraciones
institucionales estén simuladas.

------------------------------------------------------------------------

## 15. Criterios de aceptación globales

El prototipo se acepta cuando: 1. una persona puede ingresar al estado
autenticado simulado; 2. reconoce visualmente el interior de una
mochila; 3. puede identificar y utilizar carné, marcadores, libreta,
tablet, libro, cuadernos/carpetas y smartphone; 4. los ocho recursos
configurados aparecen correctamente; 5. seleccionar un recurso lo trae
al frente antes de abrirlo; 6. los enlaces configurados son correctos;
7. favoritos funcionan localmente; 8. noticias y "Sabías que" se
muestran; 9. tablet muestra visitas simuladas/locales; 10. existe modo
claro/oscuro; 11. funciona mediante teclado; 12. funciona en móvil,
tablet y escritorio; 13. la reducción de movimiento es respetada; 14. no
se han inventado servicios institucionales; 15. build y verificaciones
del proyecto terminan sin errores críticos.

------------------------------------------------------------------------

## 16. Fuera de alcance de la primera versión

-   Autenticación institucional real.
-   Administración CMS.
-   Analítica institucional real.
-   Sincronización de favoritos entre dispositivos.
-   Persistencia en servidor.
-   APIs privadas del MEP.
-   Edición de perfil real.
-   Integración real de "Califícame" si no se suministra su servicio.
