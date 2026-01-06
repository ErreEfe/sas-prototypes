<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PDP_LocalTest

Repositorio de ejemplo con React + Vite, Tailwind y Storybook.

Este README resume cómo ejecutar el proyecto localmente, cómo abrir Storybook y algunas decisiones de configuración del repositorio.

## Requisitos

- Node.js (16+ recomendado)

## Instalación y ejecución

1. Instalar dependencias:

```powershell
npm install
```

2. Variables de entorno (opcional):

- Si usás la integración con Gemini, configura `GEMINI_API_KEY` en un archivo `.env.local` en la raíz.

3. Ejecutar la app en desarrollo:

```powershell
npm run dev
```

4. Ejecutar Storybook (componentes):

```powershell
npm run storybook
```

Abrir http://localhost:6006

5. Construir la app y Storybook (opcional):

```powershell
npm run build
npm run build-storybook
```

## Notas de configuración importantes

- **Arquitectura `@/core`**: El proyecto utiliza el alias `@/core` para referirse a la librería central de componentes, hooks y utilidades. **Storybook** es la fuente de verdad para estos componentes. Usá siempre `@/core/...` en lugar de rutas relativas. Ejemplo:

```ts
import Alert from '@/core/components/Alert';
```

- **Separación de Prototipos**: Las carpetas dentro de `src/prototypes/` contienen flujos experimentales. Estos deben consumir componentes de `@/core`, asegurando que la UI sea consistente en todo el proyecto.

- **Vistas**: Se utiliza `src/views/` para las páginas principales de la aplicación estable.

- ESLint / Prettier: se eliminaron de las dependencias y de la configuración del repositorio (no se usan por ahora). Si querés volver a activarlos, podemos reañadirlos y configurar reglas mínimas.

## Guías y buenas prácticas

- Revisa `GUIDELINES.md` en la raíz para convenciones del proyecto (naming, alias, Tailwind, testing, accesibilidad y más).

## Estructura relevante

```
src/
├── core/             # Librería central (Source of Truth)
│   ├── components/   # Componentes UI (ej. Button, DataTable)
│   ├── contexts/     # Contextos globales (ej. PrestacionesContext)
│   ├── hooks/        # Hooks reutilizables
│   └── utils/        # Funciones de ayuda y helpers
├── prototypes/       # Experimentos y flujos específicos
├── views/            # Vistas estables de la aplicación
└── stories/          # Documentación de Storybook
```

## Si algo falla

- Ejecutá `npm install` de nuevo.
- Revisá errores en la consola al iniciar `vite` o `storybook` y pegamelos si querés que los revise.


Si querés que modifique o añada algo más en este `README.md`, decime qué querés incluir y lo incorporo.
