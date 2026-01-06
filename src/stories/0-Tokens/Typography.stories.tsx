
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Separator } from '@/core/components/ui/separator';

interface TypographySpecimenProps {
  name: string;
  class: string;
  sizeRem: string;
  sizePx: string;
  useCase: string;
  children: React.ReactNode;
}

const TypographySpecimen: React.FC<TypographySpecimenProps> = ({ name, class: className, sizeRem, sizePx, useCase, children }) => (
  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-6">
    <div className="w-full md:w-1/4">
      <h3 className="font-bold text-lg">{name}</h3>
      <code className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-md">{className}</code>
      <p className="text-sm text-muted-foreground mt-2">
        <span className="font-semibold">Size:</span> {sizeRem} ({sizePx})
      </p>
      <p className="text-sm text-muted-foreground italic mt-1">{useCase}</p>
    </div>
    <div className="w-full md:w-3/4">
      {children}
    </div>
  </div>
);

const TypographyDoc: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-2">Tipografía</h1>
    <p className="text-muted-foreground mb-8">
      Guía de uso para los estilos de texto en la aplicación.
    </p>

    <div className="divide-y divide-border">
      <TypographySpecimen
        name="Heading 1"
        class="text-4xl font-extrabold"
        sizeRem="2.25rem"
        sizePx="36px"
        useCase="Títulos principales de página. Usar con moderación.">
        <h1 className="text-4xl font-extrabold tracking-tight">Gestión de Prestaciones</h1>
      </TypographySpecimen>

      <TypographySpecimen
        name="Heading 2"
        class="text-3xl font-bold"
        sizeRem="1.875rem"
        sizePx="30px"
        useCase="Títulos de sección dentro de una página.">
        <h2 className="text-3xl font-bold tracking-tight">Crear Nueva Preliquidación</h2>
      </TypographySpecimen>

      <TypographySpecimen
        name="Heading 3"
        class="text-2xl font-semibold"
        sizeRem="1.5rem"
        sizePx="24px"
        useCase="Subtítulos o cabeceras de áreas importantes.">
        <h3 className="text-2xl font-semibold tracking-tight">Detalles del Paciente</h3>
      </TypographySpecimen>

      <TypographySpecimen
        name="Heading 4"
        class="text-xl font-semibold"
        sizeRem="1.25rem"
        sizePx="20px"
        useCase="Títulos de widgets, tarjetas o modales.">
        <h4 className="text-xl font-semibold tracking-tight">Confirmar Asistencia</h4>
      </TypographySpecimen>

      <TypographySpecimen
        name="Body"
        class="text-base"
        sizeRem="1rem"
        sizePx="16px"
        useCase="Texto principal para párrafos y contenido general.">
        <p>
          El sistema permite la gestión integral de prestaciones médicas, desde la asignación de turnos hasta la generación de preliquidaciones.
        </p>
      </TypographySpecimen>

      <TypographySpecimen
        name="Lead"
        class="text-lg text-muted-foreground"
        sizeRem="1.125rem"
        sizePx="18px"
        useCase="Párrafos introductorios o texto destacado.">
        <p className="text-lg text-muted-foreground">
          Asegúrate de completar todos los campos requeridos antes de guardar los cambios.
        </p>
      </TypographySpecimen>

      <TypographySpecimen
        name="Small"
        class="text-sm font-medium"
        sizeRem="0.875rem"
        sizePx="14px"
        useCase="Texto secundario, captions o etiquetas.">
        <p className="text-sm font-medium">Última actualización: hace 2 minutos</p>
      </TypographySpecimen>

      <TypographySpecimen
        name="Muted"
        class="text-sm text-muted-foreground"
        sizeRem="0.875rem"
        sizePx="14px"
        useCase="Texto con menor énfasis, como placeholders o hints.">
        <p className="text-sm text-muted-foreground">El campo de observaciones es opcional.</p>
      </TypographySpecimen>
    </div>
  </div>
);

const meta: Meta<typeof TypographyDoc> = {
  title: '0-Tokens/Typography',
  component: TypographyDoc,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Typography: StoryObj<typeof TypographyDoc> = {
  render: () => <TypographyDoc />,
};
