## **Documento de Requisitos del Producto (PRD): SAS Connect**

**Versión:** 1.0
**Fecha:** 24 de Julio de 2024

### 1. Introducción y Visión General

#### 1.1. Nombre del Producto
SAS Connect.

#### 1.2. Objetivo
SAS Connect es una aplicación web diseñada para facilitar la gestión y consulta de prestaciones médicas. Su propósito es proporcionar una interfaz segura, eficiente e intuitiva para que los usuarios autorizados puedan buscar, filtrar y visualizar el estado de diversas solicitudes, mejorando la trazabilidad y la organización de los procesos administrativos.

### 2. Sistema de Diseño y Estética General

La aplicación se rige por un sistema de diseño unificado para garantizar una experiencia de usuario consistente, profesional y accesible.

#### 2.1. Paleta de Colores (Tokens Semánticos)
La paleta de colores se gestiona a través de un sistema de tokens semánticos. Esto significa que los colores se nombran según su propósito en la interfaz, no por su valor de color.

*   **Tokens de Marca (Brand / Primary):** Definen la identidad visual principal.
    *   `primary` (#1269d1): Color principal para acciones (botones, enlaces, focos).
    *   `primary-dark` (#083061): Fondos de elementos principales como el menú lateral.
    *   `primary-darker` (#0b3f7f): Fondo para la pantalla de Login.
    *   `primary-hover` (#0f5ab1): Estado hover para acciones primarias.
    *   `text-on-primary` (#FFFFFF): Color de texto para usar sobre fondos `primary`.

*   **Tokens de Interfaz (UI / Neutral):** Colores para la estructura y superficies.
    *   `background` (#F9FAFB): Color de fondo principal de las páginas.
    *   `surface` (#FFFFFF): Color para superficies elevadas (tarjetas, modales, inputs).
    *   `border` (#E5E7EB): Color para bordes sutiles y separadores.
    *   `border-strong` (#D1D5DB): Color para bordes más prominentes.

*   **Tokens de Texto (Text):** Definen la jerarquía y color del texto.
    *   `text-primary` (#111827): Texto principal para máxima legibilidad.
    *   `text-secondary` (#6B7280): Texto secundario para subtítulos, información de apoyo.
    *   `text-placeholder` (#6B7280): Color para el texto de los placeholders en inputs.
    *   `text-disabled` (#9CA3AF): Color para texto en elementos deshabilitados.

*   **Tokens de Estado (Status):** Colores para comunicar estados específicos.
    *   `status-success-bg` / `status-success-text`: Colores para indicar éxito.
    *   `status-warning-bg` / `status-warning-text`: Colores para indicar advertencia.
    *   `status-error-bg` / `status-error-text`: Colores para indicar error.
    *   `status-info-bg` / `status-info-text`: Colores para comunicar información.

#### 2.2. Tipografía
*   **Fuente Principal:** Roboto en sus variantes (Regular, Medium, Bold).
*   **Jerarquía:**
    *   Títulos: Peso `Bold`.
    *   Cuerpo de texto: Peso `Regular`.
    *   Botones: Peso `Medium`.

#### 2.3. Formas y Bordes (Radius)
*   **Botones:** Completamente redondeados (`rounded-full`) para crear una forma de "píldora".
*   **Campos de Entrada (Inputs):** Radio de borde sutil (`rounded-lg`) para una apariencia moderna.
*   **Tarjetas y Contenedores:** Esquinas suavemente redondeadas (`rounded-lg`, `rounded-2xl`).

#### 2.4. Espaciado (Spacing)
*   El sistema de espaciado se basa en una **unidad base de 4px**.
*   Todos los márgenes, paddings y espaciados entre elementos (`gap`) deben utilizar múltiplos de esta unidad para mantener un ritmo vertical y horizontal consistente.
*   Se utilizan las utilidades de Tailwind (ej. `p-4` para 16px, `m-2` para 8px) para aplicar esta escala de forma sistemática.

#### 2.5. Elevación (Shadows)
*   Las sombras se utilizan para crear una jerarquía visual y diferenciar capas en la interfaz.
*   **`shadow-md`:** Es la sombra estándar para elementos de superficie como tarjetas y paneles de filtros.
*   **`shadow-lg` / `shadow-2xl`:** Se reservan para elementos que requieren mayor prominencia, como paneles laterales (drawers) y diálogos modales, para indicar que están por encima del resto del contenido.

#### 2.6. Sistema de Grilla (Grid)
*   La maquetación de la aplicación se basa en un **sistema de grilla flexible de 12 columnas**.
*   Los contenedores principales utilizan `grid` y `grid-cols-12` para definir la estructura.
*   Los elementos internos utilizan `col-span-*` para definir su ancho dentro de la grilla.
*   El espaciado entre columnas y filas (`gap`) sigue la escala de espaciado definida.

#### 2.7. Regla de Negocio Clave: Modo de Interfaz
*   **Estado Actual (V1):** La aplicación opera por defecto en **Modo Claro**. Toda la fase de diseño, desarrollo y pruebas de la versión inicial se centrará exclusivamente en este modo para garantizar la máxima consistencia y calidad visual.
*   **Visión a Futuro:** El código base está preparado para soportar un **Modo Oscuro**. Su implementación y activación se considerarán en futuras versiones del producto.

### 3. Funcionalidades y Flujos de Usuario

#### 3.1. Flujo de Autenticación
*   **Inicio de Sesión:**
    *   **Vista:** Un formulario centrado sobre un fondo `primary-darker`.
    *   **Componentes:** Logo "SAS Connect", campo "Correo Electrónico" con ícono, campo "Contraseña" con ícono y toggle de visibilidad, checkbox "Recuérdame", botón principal "Iniciar Sesión" y enlace "Activar cuenta".
    *   **Reglas:** Campos requeridos, con manejo de errores. En caso de éxito, redirige al `MainLayout`.
*   **Activación de Cuenta:**
    *   **Acceso:** A través del enlace "Activar cuenta" en la pantalla de Login.
    *   **Vista:** Formulario para "Usuario", "Código de verificación", "Contraseña" y "Confirmar contraseña".
    *   **Éxito:** Muestra un diálogo de confirmación y redirige a la pantalla de Login.

#### 3.2. Navegación Principal y Dashboard
*   **Estructura Visual:**
    *   **Barra Superior (AppBar):** Fija, muestra el título de la página activa y un botón "Cerrar Sesión".
    *   **Menú Lateral (Drawer):** Persistente, con fondo `primary-dark`, con estados abierto (260px) y cerrado (70px).
*   **Elementos del Menú:** "Inicio", "Gestión de prestaciones", "Pre liquidaciones", y "Documentación". La navegación actualiza el contenido principal y el título de la AppBar.

#### 3.3. Módulo de Inicio (Dashboard)
*   **Indicadores Clave:** Tarjetas que muestran métricas importantes:
    *   **Solicitadas:** Prestaciones pendientes de aprobación.
    *   **Aprobadas sin Turno:** Prestaciones que necesitan agendamiento.
    *   **Pendientes de Informe:** Prestaciones realizadas que requieren la carga del informe.
    *   **Listas para Preliquidar:** Prestaciones con informe, listas para ser facturadas.
*   **Turnos del Día:**
    *   **Vista:** Panel con dos pestañas: "Próximos" y "Realizados".
    *   **Funcionalidad:** Permite buscar turnos por nombre o DNI del afiliado.
    *   **Acciones (Turnos Próximos):**
        *   **Confirmar Asistencia:** Marca que el paciente asistió.
        *   **Reprogramar/Cancelar:** Para turnos vencidos.
        *   **Ver Detalle:** Abre un panel con la información completa.
    *   **Acciones (Turnos Realizados):** Muestra los turnos cuya asistencia ya fue confirmada.

#### 3.4. Módulo de Gestión de Prestaciones
*   **Panel de Filtros:** Permite una búsqueda avanzada por:
    *   Afiliado (Nombre o DNI).
    *   ID de Autorización.
    *   Número de Denuncia.
    *   Tipo de Prestación.
    *   Estado del Turno (con/sin turno).
    *   Estado de la Prestación.
*   **Grilla de Datos:**
    *   **Estructura:** Tabla paginada en escritorio y tarjetas en móvil.
    *   **Columnas:** Nro. Denuncia, Afiliado, ID Autorización, Prestación, CIE10 (con tooltip descriptivo), Estado (con chip de color) y Turno.
*   **Acciones Contextuales:** Los botones de acción varían según el estado de la prestación:
    *   **Solicitada:** Cancelar o Ver Detalle.
    *   **Aprobado (sin turno):** Agendar Turno.
    *   **Aprobado (con turno a futuro):** Reprogramar Turno.
    *   **Pendiente Informe:** Cargar Informe o Agregar Prestación Asociada.

#### 3.5. Módulo de Pre-liquidaciones
*   **Vista Principal:**
    *   Lista las pre-liquidaciones generadas con su ID, período, cantidad de prestaciones, monto total y estado (Pendiente/Liquidado).
    *   Permite filtrar por período y estado.
    *   Botón para navegar a la creación de una "Nueva Preliquidación".
*   **Acciones:**
    *   **Ver Detalle:** Abre un panel con el desglose de las prestaciones incluidas.
    *   **Descargar PDF:** Genera un resumen de la pre-liquidación.
*   **Creación de Pre-liquidación:**
    *   **Filtros:** Permite buscar y seleccionar prestaciones "Con Informe" por afiliado, ID, denuncia, tipo de prestación y rango de fechas.
    *   **Selección:** El usuario puede marcar las prestaciones que desea incluir.
    *   **Resumen:** Muestra el monto total y la cantidad de items seleccionados.
    *   **Generación:** Crea el lote de pre-liquidación.

#### 3.6. Módulo de Documentación
*   **Propósito:** Página de ayuda interna para entender el funcionamiento de la aplicación.
*   **Secciones:**
    *   **Estados de Prestaciones:** Explica el ciclo de vida de una prestación.
    *   **Guía de Acciones:** Detalla el propósito de cada ícono de acción.
    *   **Glosario de Términos:** Define conceptos clave como "Preliquidación" o "CIE10".
    *   **Flujos de Trabajo:** Guías paso a paso para tareas comunes (ej. "Cómo gestionar una prestación de principio a fin").

### 4. Requisitos No Funcionales
*   **Accesibilidad:** Utilizar atributos ARIA (e.g., `aria-label`) para mejorar la accesibilidad de elementos no textuales.
*   **Consistencia Visual:** Adherencia estricta al sistema de diseño definido en todas las vistas y componentes.
*   **Compatibilidad:** La aplicación debe funcionar correctamente en las últimas versiones de los navegadores web modernos (Chrome, Firefox, Safari, Edge).

### 5. Directrices de Arquitectura y Buenas Prácticas de Desarrollo

Esta sección define los estándares técnicos y patrones de arquitectura que deben seguirse durante el desarrollo para asegurar la calidad, mantenibilidad y escalabilidad del código.

#### 5.1. Arquitectura y Organización del Código
*   **Separación de Responsabilidades (Separation of Concerns):**
    *   **Datos:** Los datos estáticos, como data de prueba (`mock-data`) o configuraciones fijas, deben residir en una carpeta dedicada (`/data`).
    *   **Lógica de Negocio:** Las funciones puras y reutilizables que encapsulan la lógica de negocio (ej. formateadores, validadores, funciones de cálculo) deben ubicarse en una carpeta de utilidades (`/utils`).
    *   **Contextos de React:** Los contextos deben limitarse a su propósito principal: gestionar y proveer estado global. No deben contener lógica de negocio compleja ni datos estáticos.
*   **Modularidad de Componentes:**
    *   Cada componente de React, por pequeño que sea (incluyendo iconos), debe residir en su propio archivo con un nombre descriptivo (ej. `FilterPanel.tsx`). Esto mejora la organización, facilita las pruebas y optimiza el empaquetado final de la aplicación (`tree-shaking`).

#### 5.2. Lógica de Componentes y Hooks Personalizados
*   **Componentes Declarativos:** Los componentes de React, especialmente los que representan vistas completas, deben ser lo más "declarativos" posible. Su responsabilidad principal es renderizar la UI basándose en las props que reciben.
*   **Hooks para la Lógica de Estado:** Toda la lógica de estado compleja de una vista (manejo de filtros, paginación, efectos secundarios) debe ser extraída a un **Hook personalizado** (ej. `useGestionPrestaciones`). Esto centraliza la lógica, la hace reutilizable y mantiene los componentes de la vista limpios y fáciles de leer.