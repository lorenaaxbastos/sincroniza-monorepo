import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { NavGroup } from './NavGroup';
import type { NavGroupProps } from './NavGroup';

type NavGroupStoryProps = NavGroupProps & Record<string, unknown>;

const meta: Meta<NavGroupStoryProps> = {
  title: 'Componentes/NavGroup',
  component: NavGroup,
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
    title: 'Menu Principal',
    direction: 'column',
    gap: 'xs',
  },
  argTypes: {
    title: { table: { category: 'Propriedades (Props)' } },
    direction: { table: { category: 'Propriedades (Props)' } },
    gap: { table: { category: 'Propriedades (Props)' } },
    align: { table: { category: 'Propriedades (Props)' } },
    justify: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    '--sinc-nav-group-title-color': {
      control: 'text',
      description: 'Cor do texto do título do grupo',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-group-title-font-size': {
      control: 'text',
      description: 'Tamanho da fonte do título',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-group-title-font-family': {
      control: 'text',
      description: 'Família tipográfica do título',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-group-title-font-weight': {
      control: 'text',
      description: 'Peso da fonte do título',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-group-title-margin-bottom': {
      control: 'text',
      description: 'Margem inferior do título',
      table: { category: 'Variáveis CSS' },
    },
    '--sinc-nav-group-title-border-bottom': {
      control: 'text',
      description: 'Estilo da linha divisória abaixo do título',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const dummyItemStyle: React.CSSProperties = {
  padding: '0.8rem 1.2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'var(--color-white)',
  borderRadius: '0.4rem',
  fontSize: '1.4rem',
  listStyle: 'none',
};

export const Padrão: Story = {
  render: (args) => (
    <div
      style={{
        width: '26rem',
        padding: '1.6rem',
        backgroundColor: 'var(--color-gray-900)',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <NavGroup {...args}>
        <li style={dummyItemStyle}>Item de navegação 1</li>
        <li style={dummyItemStyle}>Item de navegação 2</li>
        <li style={dummyItemStyle}>Item de navegação 3</li>
      </NavGroup>
    </div>
  ),
};

export const OrientaçãoHorizontal: Story = {
  args: {
    title: 'Navegação Rápida',
    direction: 'row',
    gap: 'md',
  },
  render: (args) => (
    <div
      style={{
        padding: '1.6rem',
        backgroundColor: 'var(--color-gray-900)',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <NavGroup {...args}>
        <li style={dummyItemStyle}>Item 1</li>
        <li style={dummyItemStyle}>Item 2</li>
        <li style={dummyItemStyle}>Item 3</li>
      </NavGroup>
    </div>
  ),
};

export const CustomizaçãoTitulo: Story = {
  render: () => (
    <div
      style={{
        width: '26rem',
        padding: '1.6rem',
        backgroundColor: 'var(--color-gray-100)',
        borderRadius: 'var(--radii-md)',
      }}
    >
      <NavGroup
        title="Gestão de Usuários"
        style={
          {
            '--sinc-nav-group-title-color': 'var(--color-primary)',
            '--sinc-nav-group-title-border-bottom':
              '2px solid var(--color-primary)',
            '--sinc-nav-group-title-font-size': 'var(--font-size-sm)',
          } as React.CSSProperties
        }
      >
        <li
          style={{
            ...dummyItemStyle,
            backgroundColor: 'var(--color-gray-200)',
            color: 'var(--color-gray-900)',
          }}
        >
          Item A
        </li>
        <li
          style={{
            ...dummyItemStyle,
            backgroundColor: 'var(--color-gray-200)',
            color: 'var(--color-gray-900)',
          }}
        >
          Item B
        </li>
      </NavGroup>
    </div>
  ),
};

export const ColapsoComContainerQuery: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2.4rem',
        alignItems: 'flex-start',
      }}
    >
      {/* Sidebar Expandida */}
      <div
        style={{
          containerType: 'inline-size',
          width: '22rem',
          padding: '1.2rem',
          backgroundColor: 'var(--color-gray-900)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-gray-400)',
            marginBottom: '1rem',
          }}
        >
          Expandido (&gt; 8rem)
        </p>
        <NavGroup title="CONFIGURAÇÕES">
          <li style={dummyItemStyle}>Item 1</li>
          <li style={dummyItemStyle}>Item 2</li>
        </NavGroup>
      </div>

      {/* Sidebar Colapsada */}
      <div
        style={{
          containerType: 'inline-size',
          width: '5.6rem',
          padding: '0.8rem',
          backgroundColor: 'var(--color-gray-900)',
          borderRadius: 'var(--radii-md)',
        }}
      >
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-gray-400)',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          &lt; 8rem
        </p>
        <NavGroup title="CONFIGURAÇÕES">
          <li
            style={{
              ...dummyItemStyle,
              padding: '0.8rem',
              textAlign: 'center',
            }}
          >
            1
          </li>
          <li
            style={{
              ...dummyItemStyle,
              padding: '0.8rem',
              textAlign: 'center',
            }}
          >
            2
          </li>
        </NavGroup>
      </div>
    </div>
  ),
};
