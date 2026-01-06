# Guía de Interacción con Gemini para Product Designers (Proyecto SAS Connect)

¡Hola! Soy Gemini, tu asistente de IA. Esta guía está diseñada para ayudarte a interactuar conmigo de la manera más eficiente posible, enfocándonos en tus tareas como Product Designer en el proyecto SAS Connect.

## 1. Contexto del Proyecto

-   **Nombre:** SAS Connect
-   **Objetivo:** Aplicación web para la gestión y consulta de prestaciones médicas.
-   **Tecnología Principal:** React, TypeScript y Vite.
-   **Estilos:** Tailwind CSS.
-   **Documentación Clave:**
    -   `PRD.md`: Contiene todo el sistema de diseño (colores, tipografía, espaciado) y los flujos de la aplicación.
    -   `PATTERNS.md`: Define los patrones de interacción y comportamiento (ej. modales de confirmación, estados de carga, diseño responsivo).

## 2. Cómo Visualizar Tus Cambios

Para ver en tiempo real cualquier cambio de diseño, texto o comportamiento que me pidas, puedes pedirme que inicie el servidor de desarrollo.

**Prompt de ejemplo:**
> "Inicia el servidor de desarrollo."

Una vez que lo ejecute, podrás acceder a la aplicación en tu navegador (generalmente en una dirección como `http://localhost:5173`) para validar los cambios.

## 3. Prompts Útiles para Product Designers

Aquí tienes ejemplos de cómo puedes pedirme ayuda. ¡Intenta ser lo más específico posible!

### 3.1. Entender la Interfaz y el Diseño

Puedes pedirme que te muestre el código o te explique cualquier componente o vista.

**Ejemplos:**
> "Muéstrame el código del componente `Header.tsx`."
>
> "Explícame la funcionalidad del drawer `AsignarTurnoDrawer`."
>
> "Lista todos los colores definidos en `tailwind.config.js` que sean para 'status'."
>
> "Quiero ver el `PRD.md` para repasar la paleta de colores de la marca."

### 3.2. UX Writing y Modificación de Textos

Puedo actualizar cualquier texto en la aplicación. Solo necesitas decirme qué texto cambiar, dónde está y cuál es el nuevo texto.

**Ejemplos:**
> "En el componente `CancelarPrestacionDrawer`, cambia el título principal a '¿Estás seguro de que deseas cancelar esta prestación?'."
>
> "Actualiza el texto del botón de confirmación en `ConfirmarAsistenciaModal.tsx` para que diga 'Sí, confirmar asistencia'."
>
> "En la página de `Login`, cambia el texto del enlace 'Activar cuenta' a 'Activa tu cuenta aquí'."

### 3.3. Ajustes Visuales y de Estilo (Tailwind CSS)

Puedes pedirme que modifique estilos directamente usando las clases de Tailwind CSS definidas en el `PRD.md`.

**Ejemplos:**
> "En el `Header`, aumenta la sombra aplicando la clase `shadow-lg`."
>
> "Cambia el color de fondo de la página de `Login` para que use el token `primary-dark` en lugar de `primary-darker`."
>
> "En las tarjetas de la vista `GestionPrestaciones` (versión móvil), aumenta el espaciado interno a `p-6`."
>
> "Asegúrate de que todos los botones de acción principal usen el color `primary` y tengan la forma de píldora (`rounded-full`)."

### 3.4. Verificación de Patrones de Interacción

Puedes pedirme que verifique si un componente sigue los patrones definidos en `PATTERNS.md`.

**Ejemplos:**
> "Verifica que el botón principal en `GenerarTurnoDrawer.tsx` esté siempre habilitado, como se define en `PATTERNS.md`."
>
> "Asegúrate de que la vista `GestionPrestaciones` use el componente `SkeletonLoader` mientras carga los datos."
>
> "Revisa si la vista de `PreLiquidaciones` muestra un estado vacío con un mensaje claro cuando no hay datos, siguiendo las reglas de `PATTERNS.md`."

---

Estoy aquí para agilizar tu trabajo. ¡No dudes en usar estos prompts como base y adaptarlos a tus necesidades!
REsponde siempre en español