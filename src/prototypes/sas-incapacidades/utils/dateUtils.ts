/**
 * Utilidades para manejo de fechas en gestiones
 */

/**
 * Calcula la fecha de vencimiento (fecha inicio + 5 días)
 * @param fechaInicio - Fecha de inicio en formato DD/MM/YYYY
 * @returns Fecha de vencimiento en formato DD/MM/YYYY
 */
export const calcularFechaVencimiento = (fechaInicio: string): string => {
    if (!fechaInicio) return '';

    // Parse DD/MM/YYYY
    const parts = fechaInicio.split('/');
    if (parts.length !== 3) return '';

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);

    // Validate date
    const fecha = new Date(year, month, day);
    if (isNaN(fecha.getTime())) return '';

    fecha.setDate(fecha.getDate() + 5);

    return fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

/**
 * Mantiene la fecha en formato DD/MM/YYYY (no-op si ya viene en ese formato)
 * o formatea si viene en ISO
 * @param fecha - Fecha en formato YYYY-MM-DD o DD/MM/YYYY
 * @returns Fecha en formato DD/MM/YYYY
 */
export const formatearFecha = (fecha: string): string => {
    if (!fecha) return '';
    if (fecha.includes('/')) return fecha; // Already DD/MM/YYYY

    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

/**
 * Obtiene la fecha actual en formato DD/MM/YYYY
 * @returns Fecha actual
 */
export const obtenerFechaActual = (): string => {
    return new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

/**
 * Convierte fecha de DD/MM/YYYY a YYYY-MM-DD (para input date)
 */
export const displayToIso = (fecha: string): string => {
    if (!fecha || !fecha.includes('/')) return '';
    const [day, month, year] = fecha.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Convierte fecha de YYYY-MM-DD a DD/MM/YYYY (para guardar)
 */
export const isoToDisplay = (fecha: string): string => {
    if (!fecha || !fecha.includes('-')) return '';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

/**
 * Obtiene el nombre del usuario logueado (mock por ahora)
 * TODO: Reemplazar con lógica real de autenticación
 * @returns Nombre del usuario
 */
export const obtenerUsuarioLogueado = (): string => {
    // Por ahora retornamos un valor mock
    // En el futuro, esto debería obtener el usuario real del contexto de autenticación
    return 'Usuario Sistema';
};
