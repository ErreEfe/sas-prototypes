import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const shadowValues = [
  { name: 'shadow-sm', class: 'shadow-sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  { name: 'shadow', class: 'shadow', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
  { name: 'shadow-md', class: 'shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
  { name: 'shadow-lg', class: 'shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
  { name: 'shadow-xl', class: 'shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
  { name: 'shadow-2xl', class: 'shadow-2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
  { name: 'shadow-inner', class: 'shadow-inner', value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
  { name: 'shadow-none', class: 'shadow-none', value: 'none' },
];

const ShadowItem: React.FC<{ name: string; shadowClass: string; value: string }> = ({ name, shadowClass, value }) => (
  <div className="flex flex-col items-center p-4">
    <div
      className={`w-32 h-32 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2 ${shadowClass}`}
    >
      <span className="text-gray-900 dark:text-white font-medium text-center text-sm">{name}</span>
    </div>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{value}</p>
  </div>
);

const ShadowsDoc: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Shadow Tokens</h1>
    <p className="mb-8 text-gray-700 dark:text-gray-300">
      These are the default box shadow tokens provided by Tailwind CSS. They can be applied to elements
      using the `shadow-*` utility classes.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {shadowValues.map((shadow) => (
        <ShadowItem
          key={shadow.name}
          name={shadow.name}
          shadowClass={shadow.class}
          value={shadow.value}
        />
      ))}
    </div>

    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Usage Example</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      You can apply these shadow values using Tailwind CSS utility classes. For example:
    </p>
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
      <code className="language-css text-gray-800 dark:text-gray-200">
        {`/* Apply a medium shadow */
<div className="shadow-md">...</div>

/* Apply a large shadow with a custom color (if defined in tailwind.config.js) */
<div className="shadow-lg shadow-blue-500/50">...</div>

/* Remove all shadows */
<div className="shadow-none">...</div>`}
      </code>
    </pre>
  </div>
);

const meta: Meta<typeof ShadowsDoc> = {
  title: '0-Tokens/Shadows',
  component: ShadowsDoc,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

export const Shadows: StoryObj<typeof ShadowsDoc> = {
  render: () => <ShadowsDoc />,
};
