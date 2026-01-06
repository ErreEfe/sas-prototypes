# Guía para la Creación de Nuevos Prototipos

Este documento define los estándares y buenas prácticas para agregar nuevos prototipos funcionales al proyecto `PDP_LocalTest`. El objetivo es mantener la independencia entre los distintos flujos de trabajo (prototipos) mientras se asegura la coherencia visual y técnica a través del uso compartido del Sistema de Diseño (Core).

## 1. Filosofía de "Burbuja" (Aislamiento)

Cada prototipo debe ser **autocontenido**. Debe funcionar como una "mini-aplicación" que vive dentro de su propia carpeta. Esto permite que múltiples prototipos coexistan sin generar conflictos de nombres o lógica.

### Estructura de Directorios

Todo nuevo prototipo debe crearse dentro de `src/prototypes/` con la siguiente estructura:

```text
src/
  prototypes/
    [nombre-del-prototipo]/      <-- snake-case (ej: sas-auditoria-medica)
      ├── components/            <-- Componentes exclusivos de este prototipo
      ├── views/                 <-- Pantallas completas (Pages)
      ├── data/                  <-- Datos simulados (Mock Data)
      ├── types/                 <-- Definiciones TypeScript locales
      ├── utils/                 <-- Funciones auxiliares específicas
      └── index.tsx              <-- Punto de entrada (Rutas)
```

## 2. Uso del Sistema de Diseño (Core)

Antes de crear un componente de interfaz desde cero, **verifica siempre** si ya existe en el núcleo compartido.

*   **Ubicación del Core:** `src/core/`
*   **Importación:** Utiliza el alias `@/core/...`

### Reglas:
1.  **Reutilización:** Si necesitas un botón, input, tarjeta, modal o spinner, impórtalo de `@/core/components/ui`.
    *   ✅ `import { Button } from '@/core/components/ui/button';`
    *   ❌ `import { Button } from '../../../../components/ui/button';`
2.  **Shadcn/UI:** Si requieres un componente de la librería **shadcn/ui** que no está instalado (por ejemplo, un Acordeón), instálalo globalmente en `@/core` para que esté disponible para todos los prototipos. **No crees copias locales**.

## 3. Iconografía

Para garantizar la consistencia visual y el rendimiento:

*   **Librería Exclusiva:** `lucide-react`.
*   **Uso:** Importa los iconos de manera individual (tree-shaking).
    *   ✅ `import { User, Settings, ArrowRight } from 'lucide-react';`

## 4. Datos y Estado (Mocking)

Los prototipos no deben depender de un backend real en esta etapa. Deben ser totalmente funcionales de forma aislada.

*   **Mock Data:** Crea archivos `.ts` en la carpeta `data/` de tu prototipo exportando arrays o objetos constantes.
    *   Ejemplo: `export const listaPacientes = [...]` en `data/pacientesData.ts`.
*   **Simulación:** Si necesitas simular tiempos de carga o procesos asíncronos, utiliza `setTimeout` dentro de tus componentes o hooks.

## 5. Enrutamiento (Routing)

Cada prototipo debe exponer sus propias rutas para ser consumidas por la aplicación principal.

1.  Crea un archivo `index.tsx` en la raíz de tu prototipo (`src/prototypes/[nombre]/index.tsx`).
2.  Define y exporta un componente de Rutas.

**Ejemplo de `index.tsx`:**

```tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import DetailView from './views/DetailView';

export const MiNuevoPrototipoRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardView />} />
    <Route path="/detalle/:id" element={<DetailView />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
```

3.  Registra el prototipo en el enrutador principal en `src/App.tsx`.

## 6. Estilos y CSS

*   **Tailwind CSS:** Es la única herramienta permitida para estilos. Evita archivos `.css` o `.scss` locales a menos que sea estrictamente necesario para una animación compleja.
*   **Tokens Semánticos:** Prefiere los colores semánticos del tema sobre los colores crudos para asegurar soporte de temas (Dark Mode en el futuro).
    *   Usa `bg-primary`, `text-muted-foreground`, `border-border`.
    *   Evita `bg-blue-600` (a menos que sea un estado de error/éxito específico).

## Checklist de Creación

1. [ ] Crear carpeta en `src/prototypes/`.
2. [ ] Crear estructura base (`components`, `views`, `data`).
3. [ ] Definir rutas en `index.tsx`.
4. [ ] Conectar rutas en `src/App.tsx`.
5. [ ] Validar que los componentes UI se importen desde `@/core`.
