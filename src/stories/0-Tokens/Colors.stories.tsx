import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colord } from 'colord';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/ui/table';

// Define the structure for a color object
interface ColorInfo {
  name: string;
  variable: string;
  hsl: string;
  className: string;
  hex?: string;
}

// Helper to convert HSL string to HEX string
const hslToHex = (hsl: string): string => {
  // colord expects HSL in a specific format, e.g., "hsl(212, 79%, 45%)"
  // Our hsl strings are "212 79% 45%", so we need to transform them.
  const parts = hsl.split(' ');
  if (parts.length === 3) {
    const formattedHsl = `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    return colord(formattedHsl).toHex();
  }
  return ''; // Fallback for invalid HSL
};

// Color data extracted from index.css and tailwind.config.js
const mainColors: ColorInfo[] = [
  { name: 'Primary', variable: '--primary', hsl: '212 79% 45%', className: 'bg-primary' },
  { name: 'Primary Foreground', variable: '--primary-foreground', hsl: '210 40% 98%', className: 'bg-primary-foreground' },
  { name: 'Secondary', variable: '--secondary', hsl: '210 40% 96.1%', className: 'bg-secondary' },
  { name: 'Secondary Foreground', variable: '--secondary-foreground', hsl: '222.2 47.4% 11.2%', className: 'bg-secondary-foreground' },
  { name: 'Destructive', variable: '--destructive', hsl: '0 84.2% 60.2%', className: 'bg-destructive' },
  { name: 'Destructive Foreground', variable: '--destructive-foreground', hsl: '210 40% 98%', className: 'bg-destructive-foreground' },
  { name: 'Muted', variable: '--muted', hsl: '210 40% 96.1%', className: 'bg-muted' },
  { name: 'Muted Foreground', variable: '--muted-foreground', hsl: '215.4 16.3% 46.9%', className: 'bg-muted-foreground' },
  { name: 'Accent', variable: '--accent', hsl: '210 40% 96.1%', className: 'bg-accent' },
  { name: 'Accent Foreground', variable: '--accent-foreground', hsl: '222.2 47.4% 11.2%', className: 'bg-accent-foreground' },
  { name: 'Background', variable: '--background', hsl: '0 0% 100%', className: 'bg-background' },
  { name: 'Foreground', variable: '--foreground', hsl: '222.2 84% 4.9%', className: 'bg-foreground' },
  { name: 'Border', variable: '--border', hsl: '214.3 31.8% 91.4%', className: 'bg-border' },
  { name: 'Input', variable: '--input', hsl: '214.3 31.8% 91.4%', className: 'bg-input' },
  { name: 'Ring', variable: '--ring', hsl: '212 79% 45%', className: 'bg-ring' },
].map(color => ({ ...color, hex: hslToHex(color.hsl) }));

const sidebarColors: ColorInfo[] = [
  { name: 'Sidebar Background', variable: '--sidebar-background', hsl: '0 0% 98%', className: 'bg-sidebar' },
  { name: 'Sidebar Foreground', variable: '--sidebar-foreground', hsl: '240 5.3% 26.1%', className: 'bg-sidebar-foreground' },
  { name: 'Sidebar Primary', variable: '--sidebar-primary', hsl: '240 5.9% 10%', className: 'bg-sidebar-primary' },
  { name: 'Sidebar Primary Foreground', variable: '--sidebar-primary-foreground', hsl: '0 0% 98%', className: 'bg-sidebar-primary-foreground' },
  { name: 'Sidebar Accent', variable: '--sidebar-accent', hsl: '240 4.8% 95.9%', className: 'bg-sidebar-accent' },
  { name: 'Sidebar Accent Foreground', variable: '--sidebar-accent-foreground', hsl: '240 5.9% 10%', className: 'bg-sidebar-accent-foreground' },
  { name: 'Sidebar Border', variable: '--sidebar-border', hsl: '220 13% 91%', className: 'bg-sidebar-border' },
  { name: 'Sidebar Ring', variable: '--sidebar-ring', hsl: '217.2 91.2% 59.8%', className: 'bg-sidebar-ring' },
].map(color => ({ ...color, hex: hslToHex(color.hsl) }));

interface ColorTokensTableProps {
  title: string;
  colors: ColorInfo[];
}

const ColorTokensTable: React.FC<ColorTokensTableProps> = ({ title, colors }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Color</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Variable</TableHead>
          <TableHead>HSL</TableHead>
          <TableHead>Hexadecimal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colors.map((color) => (
          <TableRow key={color.name}>
            <TableCell className="font-medium">
              <div className={`h-8 w-8 rounded-full border border-gray-200 ${color.className}`}></div>
            </TableCell>
            <TableCell>{color.name}</TableCell>
            <TableCell><code>var({color.variable})</code></TableCell>
            <TableCell><code>{color.hsl}</code></TableCell>
            <TableCell><code>{color.hex}</code></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const meta: Meta = {
  title: '0-Tokens/Colors',
  component: ColorTokensTable,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ColorTokensTable>;

export const AllColors: Story = {
  render: () => (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Paleta de Colores</h1>
      <ColorTokensTable title="Colores Principales" colors={mainColors} />
      <ColorTokensTable title="Colores de Sidebar" colors={sidebarColors} />
    </div>
  ),
};