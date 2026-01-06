# Guía de Migración a la Librería de Íconos `lucide-react`

Esta guía describe el proceso para migrar nuestro sistema de íconos local (`src/components/icons.tsx`) a la librería `lucide-react`.

**Motivación:** Adoptar `lucide-react` nos alinea con el ecosistema de **ShadCN**, mejora la consistencia del diseño, optimiza el rendimiento de la aplicación y simplifica el proceso de añadir nuevos íconos.

---

### Paso 1: Instalar la Librería

Abre tu terminal y ejecuta el siguiente comando para añadir `lucide-react` a las dependencias del proyecto:

```bash
npm install lucide-react
```

---

### Paso 2: Reemplazar un Ícono Existente (Ejemplo Práctico)

Vamos a reemplazar los íconos del formulario de `Login` como ejemplo.

1.  **Abre el archivo:** `src/views/Login.tsx`.

2.  **Identifica los íconos actuales:** Verás que se importan íconos como `EmailOutlinedIcon` y `LockOutlinedIcon` desde nuestro archivo local.

    ```tsx
    // Antes
    import { EmailOutlinedIcon, LockOutlinedIcon } from '@/components/icons';
    ```

3.  **Reemplaza la importación:** Cambia la importación para usar los íconos equivalentes de `lucide-react`. Los nombres pueden variar ligeramente.

    *   `EmailOutlinedIcon` se convierte en `Mail`.
    *   `LockOutlinedIcon` se convierte en `Lock`.

    ```tsx
    // Después
    import { Mail, Lock } from 'lucide-react';
    ```

4.  **Actualiza el JSX:** En el cuerpo del componente, reemplaza los nombres de los componentes de los íconos. Las `props` como `className` seguirán funcionando exactamente igual.

    ```tsx
    // Antes
    <EmailOutlinedIcon className="w-5 h-5 text-gray-400" />
    <LockOutlinedIcon className="w-5 h-5 text-gray-400" />

    // Después
    <Mail className="w-5 h-5 text-gray-400" />
    <Lock className="w-5 h-5 text-gray-400" />
    ```

---

### Paso 3: Limpieza y Nuevos Estándares

Con la librería ya instalada y probada, seguiremos una estrategia de migración gradual:

1.  **Nuevo Estándar:** Para cualquier nueva funcionalidad o componente, utiliza siempre los íconos de `lucide-react`.
2.  **Migración Gradual:** Cuando modifiques un componente o vista que aún use íconos del archivo `icons.tsx`, aprovecha para reemplazarlos por sus equivalentes de `lucide-react`.
3.  **Depreciación:** Con el tiempo, el archivo `src/components/icons.tsx` dejará de ser utilizado. Una vez que ninguna parte del código lo importe, podremos eliminarlo de forma segura.

---

### Paso 4: (Opcional) Mejorar la Historia del Botón

Podemos aplicar esto inmediatamente a la historia de Storybook que creamos para el botón de `shadcn`.

1.  **Abre el archivo:** `src/stories/ShadcnButton.stories.tsx`.
2.  **Reemplaza el emoji:** Cambia el emoji '⚙️' por un ícono real de `lucide-react`.

    ```tsx
    // Antes
    export const Icon: Story = {
      args: {
        size: 'icon',
        children: '⚙️', // Example icon
      },
    };

    // Después
    import { Settings } from 'lucide-react'; // Añade esta importación al inicio del archivo

    export const Icon: Story = {
      args: {
        size: 'icon',
        children: <Settings className="w-4 h-4" />,
      },
    };
    ```

¡Y eso es todo! Con estos pasos, el proyecto estará en camino hacia un sistema de íconos más robusto y moderno.
