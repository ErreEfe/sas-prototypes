# Documento de Patrones de Diseño y Comportamiento de SAS Connect

**Versión:** 1.0
**Fecha:** 24 de Julio de 2024

## 1. Introducción

Este documento define un conjunto de patrones de diseño y comportamiento reutilizables para la aplicación SAS Connect. El objetivo es asegurar una experiencia de usuario (UX) consistente, predecible y de alta calidad, a la vez que se agiliza el proceso de desarrollo al proporcionar soluciones estandarizadas a problemas comunes.

Adherirse a estos patrones es fundamental para mantener la coherencia visual y funcional de la aplicación a medida que evoluciona.

---

## 2. Patrones de Interacción y UI

### 2.1. Acciones Principales Siempre Habilitadas (Validación Proactiva)

-   **Componentes Afectados:** Drawers, Modales, Formularios.
-   **Patrón:** El botón de acción principal (ej. "Guardar", "Confirmar", "Generar") **debe permanecer siempre habilitado**, incluso si el formulario tiene campos requeridos sin completar.
-   **Comportamiento:**
    1.  El usuario hace clic en el botón de acción principal.
    2.  El sistema realiza la validación de los datos del formulario.
    3.  **Si la validación falla:**
        -   La acción (ej. envío al servidor) se previene.
        -   Se muestra una notificación `Toast` de tipo `warning` o `error` indicando de forma clara y concisa qué campos faltan o son incorrectos (ej. "Necesita completar todos los campos obligatorios.").
        -   Opcionalmente, se puede hacer foco (`focus`) en el primer campo con error para guiar al usuario.
-   **Razón:**
    -   **Accesibilidad:** Los botones deshabilitados pueden ser confusos para los usuarios de lectores de pantalla, ya que a menudo no se anuncia por qué están deshabilitados.
    -   **Feedback Claro:** Este enfoque proporciona un feedback inmediato y explícito sobre lo que se necesita para continuar, en lugar de dejar que el usuario adivine por qué el botón no funciona. Fomenta la interacción y la corrección guiada.

### 2.2. Confirmación de Acciones Destructivas

-   **Componentes Afectados:** Botones, Drawers (ej. "Cancelar Prestación").
-   **Patrón:** Cualquier acción que sea destructiva o irreversible (eliminar, cancelar un registro, etc.) **debe ser confirmada** a través de una vista de confirmación dedicada (un Drawer o un Modal).
-   **Comportamiento:**
    1.  La vista de confirmación debe explicar claramente la acción que se está a punto de realizar y sus consecuencias (ej. "Esta acción no se puede deshacer.").
    2.  El botón de confirmación final debe usar un texto explícito (ej. "Confirmar Cancelación") y, preferiblemente, un estilo visual que indique precaución (ej. el color `status-error-text`).
-   **Razón:** Previene la pérdida accidental de datos y asegura que el usuario sea plenamente consciente del impacto de sus acciones.

### 2.3. Estados de Carga Esqueléticos (Skeleton Loaders)

-   **Componentes Afectados:** Grillas de Datos, Listas, Tarjetas de contenido.
-   **Patrón:** Al cargar datos de forma asíncrona, se debe mostrar un **cargador esquelético (`SkeletonLoader`)** que imite la estructura y el layout del contenido que está por aparecer. Debe preferirse este método sobre un spinner genérico centrado que bloquee toda la vista.
-   **Comportamiento:** El componente `SkeletonLoader` muestra una versión en gris y animada de la tabla (en escritorio) o de las tarjetas (en móvil), manteniendo la estructura de la página estable durante la carga.
-   **Razón:**
    -   **Mejora la Percepción de Velocidad:** El usuario percibe que la aplicación carga más rápido.
    -   **Evita Saltos de Layout (CLS):** Previene que el contenido "salte" cuando los datos finalmente se cargan.
    -   **Contexto:** Informa al usuario qué tipo de contenido está esperando.

### 2.4. Estados Vacíos con Guía

-   **Componentes Afectados:** Grillas de Datos, Listas de resultados.
-   **Patrón:** Cuando una vista de datos está vacía (ya sea porque no hay datos o porque un filtro no arroja resultados), **nunca se debe mostrar un área en blanco**.
-   **Comportamiento:** Se debe mostrar un mensaje claro, centrado y amigable que explique la situación y, si es posible, ofrezca una solución o el siguiente paso.
    -   *Ejemplo:* "No se encontraron prestaciones que coincidan con los filtros. Intente ajustar la búsqueda."
-   **Razón:** Gestiona las expectativas del usuario, evita la confusión de una pantalla vacía y guía al usuario hacia una acción productiva.

---

## 3. Patrones de Arquitectura y No Funcionales

### 3.1. Diseño Responsivo (Tabla a Tarjeta)

-   **Componentes Afectados:** Grillas de Datos complejas (`GestionPrestaciones`, `PreLiquidaciones`).
-   **Patrón:** Las tablas de datos anchas deben transformarse en un layout de **tarjetas apiladas verticalmente** en pantallas pequeñas (móviles).
-   **Comportamiento:**
    -   En `md` y superiores, se muestra el `<table>`.
    -   En pantallas menores a `md`, el `<table>` se oculta (`hidden md:block`) y se muestra un `div` con una lista de tarjetas (`md:hidden`). Cada tarjeta representa una fila de la tabla y organiza los datos de forma vertical para una mejor legibilidad.
-   **Razón:** Asegura que la información sea legible y accesible en cualquier tamaño de dispositivo, evitando el scroll horizontal excesivo en móviles.

### 3.2. Gestión de Estado Centralizada (Context API)

-   **Componentes Afectados:** Toda la aplicación.
-   **Patrón:** El estado global de la aplicación, como los datos de las prestaciones y las funciones para manipularlos, se gestiona de forma centralizada a través de un **Contexto de React (`PrestacionesContext`)**.
-   **Comportamiento:** Los componentes que necesiten acceder o modificar este estado lo hacen a través del hook `usePrestaciones()`, sin necesidad de recibir datos y funciones a través de múltiples niveles de `props` (prop drilling).
-   **Razón:**
    -   **Fuente Única de Verdad (SSoT):** Mantiene los datos consistentes en toda la aplicación.
    -   **Desacoplamiento:** Los componentes no necesitan saber de dónde vienen los datos, solo los consumen.
    -   **Mantenibilidad:** Facilita la depuración y la modificación de la lógica de negocio al estar centralizada.

### 3.3. Componentización Atómica

-   **Componentes Afectados:** Toda la aplicación.
-   **Patrón:** La interfaz de usuario se construye a partir de componentes pequeños, reutilizables y de un solo propósito (Átomos y Moléculas), como `Input`, `Button`, `Select`, `Drawer`.
-   **Comportamiento:** Cada componente encapsula su propio marcado (HTML), estilos (Tailwind CSS) y lógica básica de comportamiento. La lógica de negocio más compleja se extrae a hooks personalizados (`useGestionPrestaciones`).
-   **Razón:** Fomenta la reutilización, la consistencia visual y de comportamiento, y facilita las pruebas y el mantenimiento del código.
