# AGENTS.md --- Prototipo Mochila Digital

## 1. Propósito

Este repositorio contiene un prototipo de **Mochila Digital del
Ministerio de Educación Pública (MEP) de Costa Rica**, desarrollado con
React.

El objetivo es transformar la experiencia posterior a la autenticación
en un entorno visual e interactivo inspirado en **el interior de una
mochila escolar**, donde objetos cotidianos funcionan como accesos a
servicios, información y herramientas educativas.

Este archivo define las reglas que debe seguir Codex o cualquier agente
de desarrollo que trabaje en el repositorio.

## 2. Fuente de verdad

Antes de modificar código, leer en este orden: 1. `AGENTS.md` 2.
`requerimientos.spec.md` 3. `arquitectura.spec.md` 4. `tareas.spec.md`

En caso de contradicción, prevalece este orden.

## 3. Alcance inicial

Construir un **prototipo frontend funcional e interactivo**. No
implementar ni inventar: - APIs institucionales no suministradas. -
Credenciales. - mecanismos reales de SSO/autenticación del MEP. -
endpoints de analítica. - bases de datos institucionales. - información
personal real.

Cuando un servicio real no esté disponible, crear un adaptador/mock
claramente identificado.

## 4. Tecnologías

-   React.
-   TypeScript.
-   CSS moderno mediante CSS Modules, CSS convencional organizado o
    solución equivalente ya presente en el repositorio.
-   HTML semántico.
-   Persistencia local únicamente para datos del prototipo que lo
    requieran.
-   Preferir componentes funcionales y hooks.
-   No agregar dependencias pesadas sin necesidad.
-   No incorporar una biblioteca de UI que sustituya la identidad visual
    solicitada.

Si el repositorio está vacío, se recomienda Vite + React + TypeScript.

## 5. Principios de implementación

1.  Accesibilidad desde el diseño, no como corrección posterior.
2.  Responsive mobile-first.
3.  Separar datos, presentación y comportamiento.
4.  Los recursos educativos deben provenir de configuración/datos, no
    estar codificados como ocho componentes independientes.
5.  Crear componentes reutilizables para los objetos de la mochila.
6.  Evitar valores mágicos repetidos; usar tokens de diseño.
7.  Las animaciones deben ser discretas y respetar
    `prefers-reduced-motion`.
8.  Los enlaces externos deben identificarse como tales.
9.  No sacrificar navegación por teclado en favor de efectos visuales.
10. La metáfora visual nunca debe impedir comprender la interfaz.

## 6. Reglas de interacción

-   Todo objeto interactivo debe ser alcanzable mediante teclado.
-   `Enter` y `Space` deben activar controles cuando corresponda.
-   Debe existir foco visible.
-   El `hover` nunca puede ser el único mecanismo para descubrir una
    función.
-   En dispositivos táctiles debe existir una alternativa equivalente al
    `hover`.
-   Los objetos deben disponer de nombre accesible.
-   Los cuadernos/carpetas de recursos deben admitir estado
    seleccionado.
-   Primera selección: destacar/traer al frente y mostrar información.
-   Acción explícita posterior: abrir el recurso externo.
-   Debe poder cerrarse/cancelarse la selección con botón visible y
    `Escape`.

## 7. Diseño

Tomar la interfaz vigente de Mochila Digital aportada como **referencia
de identidad**, no como layout que deba copiarse.

La nueva experiencia debe representar el interior de una mochila
mediante capas visuales, profundidad moderada y objetos escolares
reconocibles.

Paleta inicial aproximada: - Morado principal: `#6C3B7A` - Morado
profundo: `#4D2864` - Amarillo/dorado: `#F5C928` - Amarillo claro:
`#F8D85A` - Turquesa: `#45D4C7` - Verde: `#70D93C` - Gris claro:
`#ECECEC` - Blanco: `#FFFFFF` - Texto oscuro: `#26222A`

Los valores deben implementarse como tokens CSS y podrán ajustarse
durante validación visual.

## 8. Accesibilidad

Objetivo mínimo: **WCAG 2.2 nivel AA**, en todo aquello aplicable al
prototipo.

Verificar: - contraste; - teclado; - foco; - semántica; - lectores de
pantalla; - zoom/reflow; - texto alternativo; - reducción de
movimiento; - targets táctiles adecuados; - modo claro/oscuro; -
información no dependiente exclusivamente del color.

## 9. Calidad

Antes de dar una tarea por terminada: - ejecutar build; - ejecutar lint
si existe; - ejecutar pruebas si existen; - revisar errores de
consola; - comprobar vista desktop, tablet y móvil; - realizar revisión
básica de teclado y accesibilidad.

No afirmar que una integración institucional funciona si está simulada.

## 10. Criterio de terminado

Una funcionalidad está terminada cuando: - cumple sus criterios de
aceptación; - funciona con teclado y puntero/táctil; - es responsive; -
no genera errores en consola; - no rompe funcionalidades existentes; -
mantiene la identidad visual; - su código es reutilizable y mantenible.

## 11. Seguridad

-   No almacenar contraseñas.
-   No registrar tokens o datos sensibles.
-   No insertar HTML remoto sin sanitización.
-   No inventar mecanismos de autenticación.
-   Aplicar `rel="noopener noreferrer"` cuando corresponda en enlaces
    externos.
-   La información del usuario del prototipo debe ser ficticia.

## 12. Trabajo del agente

Realizar cambios pequeños y verificables. Al finalizar cada bloque: 1.
indicar archivos modificados; 2. resumir lo implementado; 3. indicar
pruebas ejecutadas; 4. señalar pendientes, mocks o supuestos.

No cambiar el alcance sin dejarlo explícito.
