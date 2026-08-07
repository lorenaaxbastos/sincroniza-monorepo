import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, type SpinnerColor, type SpinnerSize } from './Spinner';

type SpinnerStoryProps = React.ComponentProps<typeof Spinner> &
  Record<string, unknown>;

const meta: Meta<SpinnerStoryProps> = {
  title: 'Componentes/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <ArgTypes />
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['circle', 'dots', 'ring'],
      table: { category: 'Propriedades (Props)' },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { category: 'Propriedades (Props)' },
    },
    color: {
      control: 'select',
      options: [
        'current',
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'light',
        'dark',
        'white',
        'black',
        'surface',
      ],
      table: { category: 'Propriedades (Props)' },
    },
    label: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-spinner-size': {
      control: 'text',
      description: 'Tamanho total do spinner',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: '2.4rem' },
      },
    },
    '--sinc-spinner-color': {
      control: 'text',
      description: 'Cor do spinner',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'currentColor' },
      },
    },
    '--sinc-spinner-speed': {
      control: 'text',
      description: 'Velocidade da animação de rotação/pulso',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: '0.75s' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <span
      style={{
        width: '12rem',
        fontSize: 'var(--font-size-xs, 1.2rem)',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
      }}
    >
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
  </div>
);

export const Padrão: Story = {
  args: {
    variant: 'circle',
    size: 'md',
    color: 'primary',
  },
};

export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <StoryRow label="circle">
        <Spinner variant="circle" size="lg" />
      </StoryRow>
      <StoryRow label="dots">
        <Spinner variant="dots" size="lg" />
      </StoryRow>
      <StoryRow label="ring">
        <Spinner variant="ring" size="lg" />
      </StoryRow>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => {
    const sizes: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sizes.map((sz) => (
          <StoryRow key={sz} label={String(sz)}>
            <Spinner size={sz} />
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Cores: Story = {
  render: () => {
    const colors: SpinnerColor[] = [
      'current',
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'light',
      'dark',
      'white',
      'black',
      'surface',
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {colors.map((clr) => (
          <StoryRow key={clr} label={clr}>
            <Spinner color={clr} size="md" />
          </StoryRow>
        ))}
      </div>
    );
  },
};
