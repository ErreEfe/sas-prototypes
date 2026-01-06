import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const spacingValues = [
  '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16',
  '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'
];

const SpacingItem: React.FC<{ token: string }> = ({ token }) => {
  const size =
    token === 'px'
      ? '1px'
      : token.includes('.')
        ? `${parseFloat(token) * 0.25}rem` // convert to rem
        : `${parseInt(token) * 0.25}rem`; // convert to rem

  return (
    <div className="flex items-center mb-4">
      <div className="w-24 flex-shrink-0">
        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
          {token === '0' ? 'p-0' : `p-${token}`}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">{size}</p>
      </div>
      <div className="flex-grow bg-blue-100 dark:bg-blue-900 rounded-md">
        <div className="bg-blue-500" style={{ width: size, height: '20px' }}></div>
      </div>
    </div>
  );
};

const SpacingDoc: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Spacing Tokens</h1>
    <p className="mb-8 text-gray-700 dark:text-gray-300">
      These are the default spacing tokens provided by Tailwind CSS, which are used for padding, margin, gap, width, and height.
      The values are based on a 4-pixel (0.25rem) grid system.
    </p>

    <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white">Padding/Margin Scale</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      {spacingValues.map((token) => (
        <SpacingItem key={token} token={token} />
      ))}
    </div>

    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Usage Example</h2>
    <p className="mb-4 text-gray-700 dark:text-gray-300">
      You can apply these spacing values using Tailwind CSS utility classes. For example:
    </p>
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
      <code className="language-css text-gray-800 dark:text-gray-200">
        {`/* Apply 16px padding on all sides */
<div className="p-4">...</div>

/* Apply 24px horizontal margin */
<div className="mx-6">...</div>

/* Set a gap of 32px between grid/flex items */
<div className="grid gap-8">...</div>

/* Set an element's width to 1rem (16px) */
<div className="w-4">...</div>`}
      </code>
    </pre>
  </div>
);

const meta: Meta<typeof SpacingDoc> = {
  title: '0-Tokens/Spacing',
  component: SpacingDoc,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

export const Spacing: StoryObj<typeof SpacingDoc> = {
  render: () => <SpacingDoc />,
};
