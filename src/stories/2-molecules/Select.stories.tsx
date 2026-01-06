import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select from '@/core/components/Select';

const meta: Meta<typeof Select> = {
  title: '2-molecules/Select',
  component: Select,
  args: {
    id: 'demo-select',
    options: [
      { value: '', label: '—' },
      { value: 'opt1', label: 'Opción 1' },
      { value: 'opt2', label: 'Opción 2' },
      { value: 'opt3', label: 'Opción 3' },
    ],
    placeholder: 'Seleccione una opción',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: (args) => <Select {...args} />,
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Seleccione...',
  },
  render: (args) => <Select {...args} />,
};

export const Error: Story = {
  args: {
    error: true,
    value: 'opt2',
  },
  render: (args) => <Select {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Select {...args} />,
};
