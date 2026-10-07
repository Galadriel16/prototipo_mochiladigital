# tareas.spec.md --- Plan de implementación para Codex

## Regla general

Ejecutar las fases en orden. No avanzar ocultando errores de build, lint
o pruebas.

Cada fase debe terminar con: - resumen; - archivos modificados; -
validaciones ejecutadas; - pendientes/mocks.

------------------------------------------------------------------------

## FASE 0 --- Inspección

### TASK-001

Leer `AGENTS.md`, `requerimientos.spec.md`, `arquitectura.spec.md` y
este archivo.

**Aceptación** - No modificar código antes de comprender
restricciones. - Identificar si el repositorio ya contiene React y
respetar su arquitectura cuando sea razonable.

### TASK-002

Inspeccionar assets disponibles.

**Aceptación** - Reutilizar únicamente activos existentes/autorizados. -
No inventar logotipos institucionales.

------------------------------------------------------------------------

## FASE 1 --- Base técnica

### TASK-010

Si no existe aplicación, inicializar React + TypeScript con Vite.

### TASK-011

Crear estructura mínima de carpetas.

### TASK-012

Crear tokens de diseño y estilos globales.

### TASK-013

Crear datos configurables para los ocho recursos.

**Aceptación de fase** - La app compila. - Los ocho recursos existen en
una única fuente de datos. - No hay credenciales ni endpoints
inventados.

------------------------------------------------------------------------

## FASE 2 --- Escena de mochila

### TASK-020

Construir `BackpackScene`.

### TASK-021

Construir `BackpackItem`.

### TASK-022

Crear composición visual inicial del interior de mochila.

### TASK-023

Agregar objetos decorativos no interactivos.

**Aceptación de fase** - Se reconoce conceptualmente una mochila
abierta. - El DOM mantiene un orden lógico. - No hay scroll horizontal
accidental. - Los decorativos no contaminan la experiencia de lector de
pantalla.

------------------------------------------------------------------------

## FASE 3 --- Recursos/cuadernos

### TASK-030

Renderizar los ocho recursos desde `resources.ts`.

### TASK-031

Representarlos como cuadernos/carpetas.

### TASK-032

Implementar selección y primer plano.

### TASK-033

Implementar acción "Abrir sitio".

### TASK-034

Implementar cierre mediante botón y `Escape`.

**Aceptación de fase** - Solo un recurso se selecciona a la vez. -
Primer clic/toque no abandona el portal. - La URL solo se abre mediante
acción explícita. - Teclado y táctil son funcionalmente equivalentes.

------------------------------------------------------------------------

## FASE 4 --- Objetos principales

### TASK-040 --- Carné

Implementar carné con: - perfil mock; - Acerca de; - Cerrar sesión mock.

### TASK-041 --- Marcadores

Implementar favoritos con persistencia local.

### TASK-042 --- Libreta

Implementar noticias destacadas configurables.

### TASK-043 --- Tablet

Implementar ranking de visitas locales/simuladas.

### TASK-044 --- Libro

Implementar "Sabías que..." con varias cápsulas.

### TASK-045 --- Smartphone

Implementar acceso "Califícame" mediante mock si no existe integración.

**Aceptación de fase** Todos los objetos: - tienen nombre accesible; -
pueden activarse con teclado; - disponen de foco visible; - funcionan
mediante toque; - contemplan cierre accesible de paneles.

------------------------------------------------------------------------

## FASE 5 --- Búsqueda

### TASK-050

Crear buscador por nombre y palabras clave.

### TASK-051

Al seleccionar un resultado, enfocar/seleccionar el recurso
correspondiente dentro de la mochila.

**Aceptación** - No duplicar catálogo. - Sin resultados debe existir
mensaje comprensible. - El flujo funciona con teclado.

------------------------------------------------------------------------

## FASE 6 --- Tema

### TASK-060

Implementar claro/oscuro/sistema.

### TASK-061

Persistir preferencia.

### TASK-062

Revisar contraste en ambos temas.

**Aceptación** - La selección se conserva al recargar. - `system` sigue
la preferencia del dispositivo. - No hay texto ilegible.

------------------------------------------------------------------------

## FASE 7 --- Responsive

### TASK-070

Optimizar composición para desktop.

### TASK-071

Adaptar a tablet.

### TASK-072

Adaptar a móvil.

### TASK-073

Validar aproximadamente: - 360 px; - 768 px; - 1024 px; - 1440 px.

**Aceptación** - Sin contenido crítico cortado. - Sin scroll horizontal
accidental. - Todos los controles son utilizables. - La metáfora de
mochila continúa siendo comprensible.

------------------------------------------------------------------------

## FASE 8 --- Accesibilidad

### TASK-080

Auditar semántica.

### TASK-081

Auditar navegación completa por teclado.

### TASK-082

Auditar foco y dialogs.

### TASK-083

Implementar/revisar `prefers-reduced-motion`.

### TASK-084

Revisar alternativas textuales y decorativos.

### TASK-085

Revisar zoom/reflow y targets táctiles.

**Aceptación** - No existe funcionalidad exclusiva de `hover`. - No
existen trampas de teclado. - Foco visible. - Orden de tabulación
coherente. - Estados no dependen solo del color.

------------------------------------------------------------------------

## FASE 9 --- Pruebas

### TASK-090

Agregar pruebas de los flujos críticos si la infraestructura de pruebas
está disponible o incorporarla si es razonable.

Casos prioritarios: 1. carga de ocho recursos; 2. selección; 3. cierre;
4. favoritos; 5. búsqueda; 6. visitas; 7. tema; 8. activación por
teclado.

### TASK-091

Ejecutar build y lint.

### TASK-092

Revisar consola.

------------------------------------------------------------------------

## FASE 10 --- Entrega

### TASK-100

Crear/actualizar `README.md` con: - instalación; - ejecución; - build; -
estructura; - alcance; - mocks; - cómo agregar un recurso; - cómo
sustituir servicios mock.

### TASK-101

Documentar pendientes institucionales.

### TASK-102

Generar reporte final de implementación.

**El reporte debe indicar** - qué se implementó; - qué se simuló; - qué
falta integrar; - pruebas realizadas; - riesgos o decisiones pendientes.

------------------------------------------------------------------------

# Checklist final

-   [ ] React + TypeScript funcional.
-   [ ] Metáfora de interior de mochila.
-   [ ] Carné.
-   [ ] Marcadores/favoritos.
-   [ ] Libreta/noticias.
-   [ ] Tablet/visitas.
-   [ ] Libro "Sabías que".
-   [ ] Smartphone "Califícame".
-   [ ] 8 recursos educativos.
-   [ ] Selección con superposición.
-   [ ] Búsqueda.
-   [ ] Modo claro.
-   [ ] Modo oscuro.
-   [ ] Preferencia del sistema.
-   [ ] Responsive.
-   [ ] Navegación por teclado.
-   [ ] Foco visible.
-   [ ] Reducción de movimiento.
-   [ ] Persistencia local requerida.
-   [ ] Sin credenciales.
-   [ ] Sin APIs institucionales inventadas.
-   [ ] Build correcto.
-   [ ] README actualizado.
