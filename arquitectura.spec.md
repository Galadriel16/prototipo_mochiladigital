# arquitectura.spec.md --- Arquitectura del prototipo

## 1. Objetivo

Definir una arquitectura frontend modular para que la metáfora visual de
Mochila Digital pueda crecer sin acoplar cada objeto a una
implementación independiente.

## 2. Stack recomendado

-   Vite
-   React
-   TypeScript
-   CSS con tokens
-   React Router solo si la experiencia requiere rutas internas
-   Testing Library + Vitest si se habilitan pruebas

No agregar librerías si una solución nativa es suficiente.

## 3. Estructura sugerida

``` text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── components/
│   ├── backpack/
│   │   ├── BackpackScene.tsx
│   │   ├── BackpackItem.tsx
│   │   ├── ResourceNotebook.tsx
│   │   └── DecorativeItem.tsx
│   ├── profile/
│   │   └── StudentIdCard.tsx
│   ├── favorites/
│   │   └── BookmarkPanel.tsx
│   ├── news/
│   │   └── NewsNotebook.tsx
│   ├── visits/
│   │   └── VisitsTablet.tsx
│   ├── did-you-know/
│   │   └── DidYouKnowBook.tsx
│   ├── rating/
│   │   └── RatingPhone.tsx
│   ├── search/
│   │   └── ResourceSearch.tsx
│   ├── theme/
│   │   └── ThemeControl.tsx
│   └── ui/
│       ├── AccessibleDialog.tsx
│       └── Tooltip.tsx
├── data/
│   ├── resources.ts
│   ├── news.ts
│   └── didYouKnow.ts
├── hooks/
│   ├── useFavorites.ts
│   ├── useVisitCounts.ts
│   └── useTheme.ts
├── services/
│   ├── auth/
│   │   ├── auth.types.ts
│   │   └── mockAuthService.ts
│   └── analytics/
│       └── localAnalyticsService.ts
├── styles/
│   ├── tokens.css
│   ├── global.css
│   └── themes.css
├── types/
│   └── resource.ts
└── assets/
```

La estructura puede adaptarse a un repositorio existente sin
reorganizaciones innecesarias.

## 4. Componente base: BackpackItem

`BackpackItem` debe resolver comportamiento común: -
posición/composición; - nombre accesible; - foco; - tooltip; -
estados; - selección; - `z-index`; - animación; - reducción de
movimiento.

No debe asumir una función específica. Un bolígrafo decorativo podrá
convertirse posteriormente en acceso funcional reutilizando esta
abstracción.

## 5. Catálogo de recursos

Los ocho recursos se almacenarán en `data/resources.ts`.

Ejemplo:

``` ts
export const resources: EducationalResource[] = [
  {
    id: "aprendizup",
    name: "AprendizUp",
    url: "https://aprendizup.mep.go.cr/",
    keywords: ["aprendizaje", "formación"],
    objectType: "notebook",
    external: true
  }
];
```

Agregar un recurso nuevo no debe requerir crear un nuevo componente
React.

## 6. Estado

Priorizar estado local y hooks.

Estado mínimo: - `selectedResourceId` - favoritos - visitas locales -
tema - panel/modal activo - término de búsqueda

Evitar un gestor de estado global adicional mientras no sea necesario.

## 7. Persistencia

`localStorage` puede almacenar: - tema; - favoritos; - visitas del
prototipo.

Usar claves versionadas, por ejemplo: - `mochila:v1:theme` -
`mochila:v1:favorites` - `mochila:v1:visits`

No almacenar credenciales.

## 8. Selección de cuaderno/carpeta

Flujo:

``` text
idle
  ↓ seleccionar
selected
  ├─→ cerrar/Escape → idle
  └─→ Abrir sitio → registrar visita → navegación externa
```

Solo un recurso puede ocupar el primer plano a la vez.

## 9. Capas visuales

Definir capas consistentes: 1. fondo/interior de mochila; 2. elementos
decorativos; 3. objetos funcionales; 4. objeto seleccionado; 5.
overlays; 6. modal/diálogo; 7. tooltip.

No distribuir valores arbitrarios de `z-index` por todo el CSS.

## 10. Adaptación responsive

Desktop: - escena amplia con distribución espacial de objetos.

Tablet: - reducir solapamientos; - conservar sensación de profundidad; -
ampliar targets táctiles.

Móvil: - reorganizar objetos en una composición vertical/compacta; -
conservar metáfora visual; - no exigir precisión de arrastre; - paneles
pueden ocupar gran parte de la pantalla.

No es obligatorio mantener exactamente la misma coordenada física de
cada objeto entre breakpoints.

## 11. Tema

Implementar mediante atributos/clases y custom properties.

``` html
<html data-theme="light">
```

Estados: - `light` - `dark` - `system`

Si se selecciona `system`, reaccionar a `prefers-color-scheme`.

## 12. Movimiento

Animaciones permitidas: - elevación; - escala moderada; - sombra; -
desplazamiento corto; - apertura visual de paneles.

Con `prefers-reduced-motion: reduce`, eliminar transformaciones no
esenciales y usar cambios inmediatos/discretos.

## 13. Servicios intercambiables

Definir contratos para evitar acoplamiento.

``` ts
interface AuthService {
  getCurrentUser(): Promise<User | null>;
  signOut(): Promise<void>;
}
```

El prototipo usa `MockAuthService`. La futura implementación
institucional deberá cumplir el mismo contrato.

Aplicar patrón equivalente para analítica/noticias si posteriormente se
conectan a servicios.

## 14. Seguridad de navegación

Centralizar la apertura de recursos externos.

La función debe: 1. validar que exista URL; 2. registrar visita local;
3. abrir de forma segura; 4. evitar interpolar HTML; 5. tratar todos los
recursos configurados como externos.

## 15. Accesibilidad arquitectónica

-   Preferir `<button>` para acciones.
-   Preferir `<a>` para navegación real.
-   No convertir `<div>` en botones salvo necesidad justificada.
-   El objeto gráfico puede envolver/acompañar un control semántico.
-   Dialogs deben gestionar foco.
-   Tooltips deben vincularse correctamente cuando aporten descripción.
-   Mantener orden DOM lógico aunque la composición visual sea libre.

## 16. Assets

Los iconos/logotipos oficiales deben almacenarse como activos
suministrados o autorizados.

Si un logo no está disponible: - usar placeholder neutro; - mostrar el
nombre textual; - dejar un TODO documentado.

No descargar ni falsificar logotipos automáticamente.

## 17. Preparación para crecimiento

El modelo deberá admitir posteriormente: - nuevos tipos de objetos; -
categorías; - roles de usuario; - recursos personalizados; - noticias
reales; - analítica; - administración; - contenidos por ciclo/nivel; -
internacionalización si se requiere.

## 18. Pruebas mínimas sugeridas

-   render de recursos;
-   búsqueda;
-   favoritos;
-   selección/cierre;
-   persistencia de tema;
-   apertura de URL;
-   incremento de visitas;
-   navegación por teclado de funciones críticas.

## 19. Rendimiento

-   lazy-load cuando aporte valor;
-   optimizar imágenes;
-   preferir SVG para ilustraciones simples;
-   evitar re-renderizados globales por animaciones;
-   no usar video de fondo;
-   evitar efectos de paralaje costosos como requisito.

## 20. Decisiones pendientes de integración

Mantener documentados como TODO: - SSO/autenticación MEP; - origen real
de perfil; - API/fuente de noticias; - analítica real; - URL/servicio
definitivo de "Califícame"; - activos oficiales de cada recurso.
