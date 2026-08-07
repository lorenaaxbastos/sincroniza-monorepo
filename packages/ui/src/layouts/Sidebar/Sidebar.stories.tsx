import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Sidebar } from './Sidebar';

type SidebarStoryProps = React.ComponentProps<typeof Sidebar> &
  Record<string, unknown>;

const meta: Meta<SidebarStoryProps> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
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
  tags: ['autodocs'],
  argTypes: {
    defaultCollapsed: { table: { category: 'Propriedades (Props)' } },
    toggleProps: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-sidebar-width-expanded': {
      control: 'text',
      description: 'Largura total da Sidebar quando expandida',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: '26rem' },
      },
    },
    '--sinc-sidebar-width-collapsed': {
      control: 'text',
      description: 'Largura da Sidebar quando recolhida',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: '8rem' },
      },
    },
    '--sinc-sidebar-bg': {
      control: 'text',
      description: 'Cor de fundo da Sidebar',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--color-secondary)' },
      },
    },
    '--sinc-sidebar-padding-desktop': {
      control: 'text',
      description: 'Espaçamento interno da Sidebar no Desktop',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-6)' },
      },
    },
    '--sinc-sidebar-padding-mobile': {
      control: 'text',
      description: 'Espaçamento interno da Sidebar no Mobile',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-4)' },
      },
    },
    '--sinc-sidebar-margin': {
      control: 'text',
      description:
        'Espaçamento/margem externa ao redor do contêiner da sidebar',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-4)' },
      },
    },
    '--sinc-sidebar-border-radius': {
      control: 'text',
      description: 'Arredondamento das bordas do contêiner da sidebar',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--radii-md)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContentMock = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 'var(--spacing-6)',
    }}
  >
    <strong
      style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-lg)' }}
    >
      Sincroniza Educação
    </strong>

    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
      }}
    >
      {['Início', 'Projetos', 'Relatórios', 'Configurações'].map((item) => (
        <button
          key={item}
          type="button"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-gray-200)',
            textAlign: 'left',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  </div>
);

export const Padrão: Story = {
  args: {
    defaultCollapsed: false,
    children: <SidebarContentMock />,
  },
  render: (args) => (
    <AppLayout sidebar={<Sidebar {...args} />}>
      <h1>Conteúdo principal</h1>
      <p>
        Interaja com o botão da Sidebar para ver este conteúdo se ajustando
        automaticamente ao espaço disponível.
      </p>
    </AppLayout>
  ),
};

export const Recolhida: Story = {
  args: {
    defaultCollapsed: true,
    children: <SidebarContentMock />,
  },
  render: (args) => (
    <AppLayout sidebar={<Sidebar {...args} />}>
      <h1>Sidebar iniciada recolhida</h1>
      <p>
        Utilizando a prop <code>defaultCollapsed</code>.
      </p>
    </AppLayout>
  ),
};
