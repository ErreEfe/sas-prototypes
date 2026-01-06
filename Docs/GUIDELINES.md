# Guías de Desarrollo

Este documento describe las mejores prácticas y estándares que seguimos en nuestro proyecto.

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── contexts/      # Contextos de React
├── hooks/         # Hooks personalizados
├── utils/         # Funciones auxiliares
├── views/         # Páginas y layouts
│   └── pages/     # Páginas específicas
└── stories/       # Stories de Storybook
```

## Convenciones de Nomenclatura

### Archivos y Carpetas

- Componentes React: PascalCase (ej: `Button.tsx`, `AlertDialog.tsx`)
- Hooks: camelCase con prefijo "use" (ej: `useToast.ts`, `useAuth.ts`)
- Utilidades: kebab-case (ej: `date-helpers.ts`, `string-utils.ts`)
- Stories: `[ComponentName].stories.tsx`
- Tipos y interfaces: PascalCase (ej: `UserProfile.types.ts`)

### Componentes

- Nombres descriptivos y específicos
- Sufijo descriptivo para variantes (ej: `ButtonPrimary`, `ButtonSecondary`)
- Prefix para componentes relacionados (ej: `TableHeader`, `TableRow`, `TableCell`)

## Importaciones y Path Aliases

### Uso del Alias `@`

Nuestro proyecto está configurado para usar el alias `@` que apunta a la carpeta `src/`. Este alias debe ser usado en lugar de rutas relativas (`./` o `../`) siempre que sea posible.

#### ✅ Ejemplos Correctos

```typescript
// Importaciones usando el alias @
import Alert from '@/components/Alert';
import { useToast } from '@/hooks/useToast';
import { mockData } from '@/data/mock-data';
import type { PrestacionData } from '@/utils/prestaciones-helpers';
```

#### ❌ Ejemplos a Evitar

```typescript
// Evitar rutas relativas
import Alert from '../components/Alert';
import { useToast } from '../../hooks/useToast';
import { mockData } from '../data/mock-data';
```

### Excepciones

Hay algunos casos donde es aceptable (o necesario) usar rutas relativas:

1. **Importaciones dentro del mismo directorio**
   ```typescript
   // ✅ Aceptable para archivos en el mismo directorio
   import { Button } from './Button';
   import styles from './Component.module.css';
   ```

2. **Importaciones de archivos fuera de `src/`**
   ```typescript
   // ✅ Necesario para archivos fuera de src
   import { config } from '../../config/app.config';
   ```

3. **Importaciones en archivos de configuración**
   ```typescript
   // ✅ Necesario en archivos como vite.config.ts, .storybook/main.ts, etc.
   import { defineConfig } from '../vite.config';
   ```

### Configuración

El alias `@` está configurado en varios lugares para asegurar consistencia:

1. **tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       },
       "baseUrl": "."
     }
   }
   ```

2. **vite.config.ts**
   ```typescript
   {
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       }
     }
   }
   ```

3. **.storybook/main.ts**
   ```typescript
   {
     viteFinal: (config) => {
       if (config.resolve) {
         config.resolve.alias = {
           ...config.resolve.alias,
           '@': path.resolve(__dirname, '../src'),
         };
       }
       return config;
     }
   }
   ```

### Beneficios

1. **Claridad**: Las importaciones son más legibles y es inmediatamente obvio de dónde viene cada módulo
2. **Mantenibilidad**: Al mover archivos entre carpetas, las importaciones con `@` requieren menos actualizaciones
3. **Consistencia**: Todas las importaciones siguen el mismo patrón, independientemente de la profundidad del archivo
4. **Prevención de errores**: Elimina la confusión con múltiples niveles de rutas relativas (`../../../`)

### Herramientas de Ayuda

- **VS Code**: La configuración del proyecto incluye la resolución de rutas para autocompletado
- **ESLint**: Se recomienda configurar reglas para forzar el uso de alias cuando sea posible

## Script de Migración

Para ayudar a mantener la consistencia, aquí hay un comando que puede ayudar a identificar importaciones relativas que podrían cambiarse a usar `@`:

```bash
# Buscar importaciones relativas
npm run lint:imports
```

O manualmente usando grep:
```bash
grep -r "from '\.\." src/
```

## TypeScript y Props

### Tipos e Interfaces

- Usar `interface` para objetos que pueden ser extendidos
- Usar `type` para uniones, intersecciones y tipos simples
- Sufijo `Props` para props de componentes
- Exportar tipos y interfaces que se usan en múltiples archivos

```typescript
// ✅ Buenas prácticas
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

type ButtonSize = 'small' | 'medium' | 'large';
type Status = 'idle' | 'loading' | 'success' | 'error';

// ❌ Evitar
interface props {  // Nombre no descriptivo
  text: any;      // Evitar 'any'
}
```

### Props de Componentes

- Definir interfaces para props
- Usar React.FC<Props> para componentes funcionales
- Documentar props complejas
- Proporcionar valores por defecto cuando tenga sentido

```typescript
interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  message, 
  type = 'info',  // Valor por defecto
  onClose 
}) => {
  // ...
};
```

## Estilos y Tailwind

### Convenciones de Clases

- Ordenar clases por categorías:
  1. Layout (flex, grid, position)
  2. Espaciado (margin, padding)
  3. Dimensiones (width, height)
  4. Tipografía
  5. Colores y fondos
  6. Bordes y sombras
  7. Estados (hover, focus, etc.)

```typescript
// ✅ Clases ordenadas por categoría
<div className="
  flex items-center justify-between  // Layout
  p-4 my-2                          // Espaciado
  w-full min-h-[48px]               // Dimensiones
  text-sm font-medium               // Tipografía
  bg-white text-gray-800           // Colores
  rounded-lg border border-gray-200 // Bordes
  hover:bg-gray-50                  // Estados
">
```

### Tokens y Variables

- Usar tokens semánticos definidos en `tailwind.config.js`
- Evitar valores hardcodeados de colores/tamaños
- Mantener consistencia con el sistema de diseño

```typescript
// ✅ Usar tokens semánticos
className="text-status-error-text bg-status-error-bg"

// ❌ Evitar valores hardcodeados
className="text-red-500 bg-red-100"
```

## Hooks y Estado

### Hooks Personalizados

- Extraer lógica reutilizable en hooks
- Nombres descriptivos que indiquen su propósito
- Documentar parámetros y retorno
- Manejar casos de error

```typescript
// ✅ Hook bien diseñado
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // ...
}
```

### Contextos

- Usar para estado global o datos compartidos
- Proporcionar hooks personalizados para acceder al contexto
- Documentar el propósito y uso del contexto

```typescript
// ✅ Patrón recomendado para contextos
export const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

## Testing y Stories

### Stories de Storybook

- Crear stories para todos los componentes reutilizables
- Documentar props y variantes
- Incluir casos de uso comunes y edge cases
- Usar controles para props interactivas

```typescript
// ✅ Story bien estructurada
export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button Text',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} as Meta<typeof Button>;
```

## Accesibilidad (a11y)

### Prácticas Básicas

- Usar elementos semánticos (nav, main, article, etc.)
- Proporcionar textos alternativos para imágenes
- Asegurar contraste de color adecuado
- Implementar navegación por teclado
- Usar ARIA labels cuando sea necesario

```typescript
// ✅ Componente accesible
<button
  aria-label="Cerrar diálogo"
  onClick={onClose}
  className="p-2 hover:bg-gray-100 rounded-full"
>
  <CloseIcon className="w-5 h-5" aria-hidden="true" />
</button>
```

## Control de Versiones

### Commits

- Usar mensajes descriptivos y concisos
- Seguir formato convencional:
  - feat: nueva característica
  - fix: corrección de bug
  - docs: cambios en documentación
  - style: cambios de formato
  - refactor: refactorización de código
  - test: añadir o modificar tests

### Pull Requests

- Describir cambios claramente
- Incluir contexto y razón de los cambios
- Mantener PRs pequeños y enfocados
- Actualizar documentación si es necesario

## Recursos y Herramientas Recomendadas

### VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Error Lens
- GitLens

### Desarrollo

- Chrome DevTools React Developer Tools
- React DevTools
- Storybook
- Lighthouse para auditorías

## Componentes: Alert (buenas prácticas)

- Propósito: mensajes persistentes y contextuales dentro de una vista (ej. sobre un formulario o dentro de un Drawer). No reemplaza a `Toast`.
- Severidad vs variante:
  - `default` (info): mensajes neutrales o informativos.
  - `success`: confirmaciones de acción completada dentro del flujo (p. ej., "Se guardaron los cambios").
  - `warning`: acciones riesgosas o atención requerida (p. ej., "Faltan campos obligatorios").
  - `destructive` (error): errores bloqueantes o fallos al procesar.
- Estilo visual: fondos sutiles (50), texto 700 y borde 200 para evitar confusión con `Toast`.
- Contenido:
  - Título breve y descriptivo (`AlertTitle`).
  - Mensaje claro con acciones o próximos pasos (`AlertDescription`).
  - Evitar párrafos largos; usar listas si es necesario.
- Accesibilidad:
  - Siempre renderiza con `role="alert"` (ya implementado).
  - Mantener contraste AA entre fondo y texto.
- Ubicación y espaciado:
  - Colocar al inicio de la sección que afecta.
  - Usar `mb-3`/`mb-4` para separación del contenido.

Ejemplo:

```tsx
<Alert variant="warning" className="mb-4">
  <AlertTitle>Faltan datos</AlertTitle>
  <AlertDescription>
    Revisa los campos marcados en amarillo antes de continuar.
  </AlertDescription>
 </Alert>
```