Aquí te presento un plan detallado para instalar, configurar y documentar nuestro primer componente de shadcn en Storybook.

  Plan de Integración de ShadCN

   1. Inicializar ShadCN en el Proyecto:
       * Ejecutaré el comando npx shadcn-ui@latest init.
       * Este comando me hará una serie de preguntas para configurar la librería. Responderé basándome en la estructura de nuestro proyecto (TypeScript, tailwind.config.js, alias para rutas como @/components).
       * Esto modificará archivos como tsconfig.json y tailwind.config.js para que funcionen correctamente con los componentes.
    
    1. Would you like to use TypeScript (recommended)?
       * Respuesta: Yes (Nuestro proyecto usa TypeScript).

   2. Which style would you like to use?
       * Respuesta: Default (Es un buen punto de partida y se integra bien).    

   3. Which color would you like to use as base color?
       * Respuesta: Slate (Un color base neutro y común).

   4. Where is your global CSS file?
       * Respuesta: src/index.css

   5. Would you like to use CSS variables for colors?
       * Respuesta: Yes (Recomendado para una mejor integración con Tailwind y
         theming).

   6. Where is your `tailwind.config.js` located?
       * Respuesta: tailwind.config.js (Está en la raíz del proyecto).

   7. Configure the import alias for components:
       * Respuesta: @/components

   8. Configure the import alias for utils:
       * Respuesta: @/lib/utils

   9. Are you using React Server Components?
       * Respuesta: No (Estamos usando Vite para una aplicación de cliente).

   10. Write components to:
       * Respuesta: src/components/ui (Esta es la ubicación estándar de shadcn
         para los componentes de UI).

   2. Agregar un Componente de Prueba (`Button`):
       * Usaré el CLI de shadcn para agregar el componente Button: npx shadcn-ui@latest add button.
       * Esto no es una instalación normal. El comando creará el archivo Button.tsx directamente en nuestro directorio de componentes (probablemente en src/components/ui/Button.tsx), junto con las dependencias
         que necesite.

   3. Crear la Documentación en Storybook:
       * Crearé un nuevo archivo src/stories/ShadcnButton.stories.tsx.
       * En este archivo, importaré el nuevo componente Button y crearé historias para visualizar sus diferentes variantes (primario, secundario, destructivo, etc.), tal como lo define shadcn.

   4. Verificación:
       * Iniciar el servidor de Storybook con npm run storybook para que puedas revisar el nuevo componente y sus variantes en el catálogo.
       * Integraré el botón en una vista existente (por ejemplo, en Inicio.tsx) para confirmar que funciona correctamente dentro de la aplicación.