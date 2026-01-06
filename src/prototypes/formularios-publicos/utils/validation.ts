import { AffiliateData } from '../types';

export const validateAffiliate = (values: AffiliateData): Partial<Record<keyof AffiliateData, string>> => {
    const errors: Partial<Record<keyof AffiliateData, string>> = {};

    if (!values.tipoDocumento) errors.tipoDocumento = 'Requerido';
    if (!values.numeroDocumento) errors.numeroDocumento = 'Requerido'; // Could add regex for numbers only
    else if (!/^\d+$/.test(values.numeroDocumento)) errors.numeroDocumento = 'Solo números';

    if (!values.cuil) errors.cuil = 'Requerido'; // Could add regex
    else if (!/^\d+$/.test(values.cuil)) errors.cuil = 'Solo números, sin guiones';

    if (!values.nombre) errors.nombre = 'Requerido';
    if (!values.apellido) errors.apellido = 'Requerido';
    if (!values.telefono) errors.telefono = 'Requerido';

    if (!values.email) errors.email = 'Requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email inválido';

    return errors;
};
