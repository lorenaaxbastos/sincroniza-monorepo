import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { NavToggle } from './NavToggle';

type NavToggleStoryProps = React.ComponentProps<typeof NavToggle> &
  Record<string, unknown>;

const meta: Meta<NavToggleStoryProps> = {
  title: 'Componentes/NavToggle',
  component: NavToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
  args: {
    targetSelector: '#menu-demo',
    ariaLabel: 'Alternar menu de navegação',
  },
  argTypes: {
    targetSelector: { table: { category: 'Propriedades (Props)' } },
    ariaLabel: { table: { category: 'Propriedades (Props)' } },
    buttonProps: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
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
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      width: '100%',
    }}
  >
    <span
      style={{
        width: '12rem',
        fontSize: 'var(--font-size-xs)',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

export const Padrão: Story = {
  args: {},
};

export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <StoryRow label="Inativo (fechado)">
        <NavToggle aria-label="Abrir menu" />
      </StoryRow>
      <StoryRow label="Ativo (aberto)">
        <NavToggle
          data-active="true"
          aria-expanded="true"
          aria-label="Fechar menu"
        />
      </StoryRow>
    </div>
  ),
};

export const VariantesECores: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <StoryRow label="Surface ghost (padrão)">
        <NavToggle buttonProps={{ color: 'surface', variant: 'ghost' }} />
      </StoryRow>
      <StoryRow label="Primary solid">
        <NavToggle buttonProps={{ color: 'primary', variant: 'solid' }} />
      </StoryRow>
      <StoryRow label="Primary outline">
        <NavToggle buttonProps={{ color: 'primary', variant: 'outline' }} />
      </StoryRow>
      <StoryRow label="Primary subtle">
        <NavToggle buttonProps={{ color: 'primary', variant: 'subtle' }} />
      </StoryRow>
    </div>
  ),
};

export const TesteInterativo: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2rem',
        border: 'var(--spacing-px) dashed var(--color-gray-300)',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <NavToggle {...args} targetSelector="#demo-drawer" />

      <div
        id="demo-drawer"
        data-state="closed"
        style={{
          padding: 'var(--spacing-3) var(--spacing-4)',
          backgroundColor: 'var(--color-primary-light)',
          border: 'var(--spacing-px) solid var(--color-primary)',
          borderRadius: 'var(--radii-md)',
          color: 'var(--color-primary)',
          fontWeight: 'var(--font-weight-bold)',
          textAlign: 'center',
        }}
      >
        Elemento alvo (data-state)
      </div>
    </div>
  ),
};
