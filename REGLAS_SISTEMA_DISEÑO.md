# Reglas y Guía del Sistema de Diseño (SAS Connect)

**Versión:** 1.0
**Propietario:** Equipo de Producto y Desarrollo

## 1. Filosofía y Principios

Este documento es la **fuente única de verdad (Single Source of Truth)** para el sistema de diseño de SAS Connect. Su objetivo es garantizar una experiencia de usuario consistente, agilizar el desarrollo y facilitar la colaboración entre diseño y desarrollo.

Nuestros principios son:
- **Consistencia sobre todas las cosas:** Todos los componentes y vistas deben adherirse a estas reglas.
- **Claridad y Propósito:** Los componentes deben ser intuitivos y su función, evidente.
- **Eficiencia:** Usamos un sistema basado en `shadcn/ui` y `Tailwind CSS` para maximizar la reutilización y la velocidad de desarrollo.

## 2. Tokens de Diseño: El Corazón del Sistema

Los tokens son los valores indivisibles de nuestro diseño (colores, espaciado, tipografía). **NUNCA** se deben usar valores "mágicos" o hardcodeados (ej. `#FFF` o `16px`) en el código.

### 2.1. Fuente de la Verdad Técnica
- **`tailwind.config.js`**: Define qué tokens están disponibles.
- **`src/index.css`**: Asigna los valores (colores en formato HSL, radio de bordes, etc.) a las variables CSS que `tailwind.config.js` utiliza.

### 2.2. Paleta de Colores

La paleta de colores se basa en las **variables CSS definidas en `src/index.css`**, que son el estándar provisto por `shadcn/ui`. Esta es nuestra base.

Los colores deben usarse de forma semántica, aunque no todos los nombres de tokens semánticos del PRD estén implementados aún.

**Regla de Oro:** Siempre usa las clases de Tailwind (ej. `bg-primary`, `text-destructive`). Si necesitas un color o un token semántico que no existe, sigue el proceso en la sección "Cómo Evolucionar el Sistema de Diseño".

### 2.3. Espaciado y Tamaños
- Se basa en una **unidad base de 4px**.
- Usa las utilidades de Tailwind: `p-4` (16px), `gap-2` (8px), `w-1/2` (50%).

### 2.4. Tipografía
- **Fuente:** Roboto.
- **Clases:** Usa `text-lg`, `font-bold`, `text-text-primary`, etc.

### 2.5. Bordes y Sombras
- **Bordes:** `rounded-full` (botones), `rounded-lg` (inputs, tarjetas).
- **Sombras:** `shadow-md` (tarjetas), `shadow-lg` (elementos elevados como drawers).

## 3. Cómo Evolucionar el Sistema de Diseño

Este es un sistema vivo. Para añadir o modificar tokens de forma controlada y gradual, sigue estos pasos:

**Paso 1: Definir la Necesidad**
- Identifica el nuevo token semántico necesario (ej. un color para fondos de alerta de éxito, `status-success-bg`).
- Define su valor HSL (ej. `140 80% 96%`).

**Paso 2: Actualizar la Base (CSS)**
- Abre `src/index.css`.
- Dentro de `:root`, añade la nueva variable CSS:
  ```css
  :root {
    /* ... otros colores ... */
    --status-success-bg: 140 80% 96%;
  }
  ```

**Paso 3: Exponer el Token en Tailwind**
- Abre `tailwind.config.js`.
- En `theme.extend.colors`, añade el nuevo token para que Tailwind pueda crear clases con él:
  ```javascript
  //...
  colors: {
    // ...
    status: {
      'success-bg': 'hsl(var(--status-success-bg))',
      // ... otros status ...
    }
  }
  ```

**Paso 4: Usar el Nuevo Token**
- Ahora puedes usar la nueva clase en tus componentes: `bg-status-success-bg`.

Este proceso asegura que todos los cambios en el diseño sean centralizados, documentados en el código y escalables.

## 4. Componentes y Arquitectura `@/core`

Nuestra librería de componentes se centraliza en `src/core/`, la cual actúa como la librería interna de UI del proyecto.

### 4.1. Jerarquía de Componentes
- **Componentes Base (`@/core/components/ui/`):** Bloques fundamentales (Button, Input, Card). Basados en shadcn/ui.
- **Componentes de Negocio (`@/core/components/`):** Componentes más complejos que resuelven problemas específicos (ej. `DataTable`, `Autocomplete`, `Drawers`).
- **Contextos y Hooks (`@/core/contexts/`, `@/core/hooks/`):** Lógica global compartida que alimenta a los componentes core.

### 4.2. Cómo Consumir Componentes
- Los **Prototipos** (`src/prototypes/`) y **Vistas** (`src/views/`) deben importar componentes exclusivamente desde el core usando el alias `@/core`.
- **NUNCA** crees componentes UI duplicados en las carpetas de prototipos si pueden ser abstraídos al core.

### 4.3. Cómo Agregar Nuevos Componentes
- **NUNCA** copies y pegues código de otro lugar.
- Usa la CLI oficial para asegurar la consistencia:
  ```bash
  npx shadcn-ui@latest add [nombre-del-componente]
  ```
- Esto instalará el componente en `@/core/components/ui/`, listo para ser customizado y utilizado.

## 5. Documentación y Fuente de Verdad (Storybook)

Storybook no es solo documentación, es la **fuente de verdad técnica** para la UI.

- **Obligatorio:** Todo componente en `@/core` debe tener su archivo de historias (`.stories.tsx`).
- **Propósito:**
    1. **Validación Aislada:** Los componentes se desarrollan y prueban en Storybook antes de integrarse en prototipos.
    2. **Documentación Visual:** Permite a los diseñadores validar props, estados (hover, focus, disabled) y variantes sin navegar por la app.
    3. **Contrato de Interfaz:** Storybook define cómo se *debe* usar el componente.

## 6. Patrones Clave a Recordar

- **Acciones Siempre Habilitadas:** Los botones de formulario no se deshabilitan. La validación se muestra con un `Toast` al intentar enviar.
- **Loaders Esqueléticos:** Usa `SkeletonLoader` para cargas de datos, evitando saltos de contenido.
- **Estados Vacíos:** Una tabla o lista sin datos debe mostrar un mensaje amigable.
- **Responsividad (Tabla a Tarjeta):** Las tablas complejas se transforman en tarjetas en vistas móviles.