import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const borderRadiusValues = {
  lg: '0.5rem', // var(--radius)
  md: 'calc(0.5rem - 2px)', // calc(var(--radius) - 2px)
  sm: 'calc(0.5rem - 4px)', // calc(var(--radius) - 4px)
};

const BorderRadiusItem: React.FC<{ name: string; value: string }> = ({ name, value }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
    <div
      className="w-24 h-24 bg-blue-500 flex items-center justify-center text-white font-bold text-lg"
      style={{ borderRadius: value }}
    >
      {name.toUpperCase()}
    </div>
    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{name}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{value}</p>
  </div>
);

const BorderRadiusDoc: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Border Radius Tokens</h1>
    <p className="mb-8 text-gray-700 dark:text-gray-300">
      These are the border radius tokens used across the application, defined in `tailwind.config.js` and `src/index.css`.
      The base radius is controlled by the CSS variable `--radius`.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(borderRadiusValues).map(([name, value]) => (
        <BorderRadiusItem key={name} name={name} value={value} />
      ))}
    </div>

    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Usage Example</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      You can apply these radii using Tailwind CSS classes like `rounded-lg`, `rounded-md`, and `rounded-sm`.
    </p>
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
      <code className="language-css text-gray-800 dark:text-gray-200">
        {`/* Example for large radius */
.my-element {
  border-radius: theme('borderRadius.lg'); /* Resolves to 0.5rem */
}

/* Example for medium radius */
.another-element {
  border-radius: theme('borderRadius.md'); /* Resolves to calc(0.5rem - 2px) */
}

/* Example for small radius */
.yet-another-element {
  border-radius: theme('borderRadius.sm'); /* Resolves to calc(0.5rem - 4px) */
}`}
      </code>
    </pre>
  </div>
);

const meta: Meta<typeof BorderRadiusDoc> = {
  title: '0-Tokens/Border Radius',
  component: BorderRadiusDoc,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

export const BorderRadius: StoryObj<typeof BorderRadiusDoc> = {
  render: () => <BorderRadiusDoc />,
};
