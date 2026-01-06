import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Autocomplete from '@/core/components/Autocomplete';

// Mock data for the autocomplete options
const professionals = [
  { id: '1', name: 'Dr. Juan Perez', specialty: 'Cardiología' },
  { id: '2', name: 'Dra. Ana García', specialty: 'Dermatología' },
  { id: '3', name: 'Dr. Luis Rodriguez', specialty: 'Pediatría' },
  { id: '4.1', name: 'Dr. Carlos Sanchez', specialty: 'Neurología' },
  { id: '4.2', name: 'Dr. Carlos Martinez', specialty: 'Neurología' },
  { id: '5', name: 'Dra. Laura Fernandez', specialty: 'Ginecología' },
];

// Meta configuration for the component
const meta: Meta<typeof Autocomplete> = {
  title: '2-molecules/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    options: { control: false },
    value: { control: false },
    onChange: { action: 'changed' },
    onInputChange: { action: 'inputChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

// Stateful template to manage component state
const AutocompleteTemplate: Story['render'] = args => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<Professional | null>(null);

  return (
    <div style={{ minHeight: '250px' }}>
      <Autocomplete<Professional>
        {...args as any}
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm font-bold">Estado Actual:</p>
        <p className="text-xs">
          <span className="font-semibold">Input Value:</span> {inputValue || 'N/A'}
        </p>
        <p className="text-xs">
          <span className="font-semibold">Selected Value:</span>{' '}
          {value ? JSON.stringify(value) : 'null'}
        </p>
      </div>
    </div>
  );
};

// Default Story
export const Default: Story = {
  args: {
    id: 'professional-autocomplete',
    label: 'Buscar Profesional',
    placeholder: 'Escribe un nombre...',
    options: professionals,
    getOptionLabel: (option: any) => option.name,
    getOptionValue: (option: any) => option.id,
    disabled: false,
  },
  render: AutocompleteTemplate,
};

// Disabled Story
export const Disabled: Story = {
  args: {
    ...Default.args,
    id: 'disabled-autocomplete',
    label: 'Autocomplete Deshabilitado',
    placeholder: 'No se puede escribir aquí',
    disabled: true,
  },
  render: AutocompleteTemplate,
};

// Story with an initial value set
const AutocompleteWithInitialValueTemplate: Story['render'] = args => {
  const initialOption = professionals[2]; // Dr. Luis Rodriguez
  const [inputValue, setInputValue] = useState(initialOption.name);
  const [value, setValue] = useState<typeof professionals[0] | null>(
    initialOption,
  );

  return (
    <div style={{ minHeight: '250px' }}>
      <Autocomplete<Professional>
        {...args as any}
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm font-bold">Estado Actual:</p>
        <p className="text-xs">
          <span className="font-semibold">Input Value:</span> {inputValue || 'N/A'}
        </p>
        <p className="text-xs">
          <span className="font-semibold">Selected Value:</span>{' '}
          {value ? JSON.stringify(value) : 'null'}
        </p>
      </div>
    </div>
  );
};

export const WithInitialValue: Story = {
  args: {
    ...Default.args,
    id: 'initial-value-autocomplete',
    label: 'Profesional Preseleccionado',
  },
  render: AutocompleteWithInitialValueTemplate,
};

// Story with no options
export const NoOptions: Story = {
  args: {
    ...Default.args,
    id: 'no-options-autocomplete',
    label: 'Sin Opciones Disponibles',
    placeholder: 'No hay nada que buscar',
    options: [],
  },
  render: AutocompleteTemplate,
};
