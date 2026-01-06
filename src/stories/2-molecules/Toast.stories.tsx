import type { Meta, StoryObj } from '@storybook/react';
import Toast from '@/core/components/Toast';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: '2-molecules/Toast',
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onDismiss: { action: 'dismissed' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Success: Story = {
  args: {
    id: 'success-toast',
    message: 'This is a success message!',
    type: 'success',
    duration: 5000,
  },
};

export const Error: Story = {
  args: {
    id: 'error-toast',
    message: 'This is an error message!',
    type: 'error',
    duration: 5000,
  },
};

export const Warning: Story = {
  args: {
    id: 'warning-toast',
    message: 'This is a warning message!',
    type: 'warning',
    duration: 5000,
  },
};

export const Info: Story = {
  args: {
    id: 'info-toast',
    message: 'This is an info message!',
    type: 'info',
    duration: 5000,
  },
};
