import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
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
        category: 'Variáveis CSS',
        defaultValue: { summary: '26rem' },
      },
    },
    '--sinc-sidebar-width-collapsed': {
      control: 'text',
      description: 'Largura da Sidebar quando recolhida',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: '8rem' },
      },
    },
    '--sinc-sidebar-bg': {
      control: 'text',
      description: 'Cor de fundo da Sidebar',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--color-secondary)' },
      },
    },
    '--sinc-sidebar-padding-desktop': {
      control: 'text',
      description: 'Espaçamento interno da Sidebar no Desktop',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-6)' },
      },
    },
    '--sinc-sidebar-padding-mobile': {
      control: 'text',
      description: 'Espaçamento interno da Sidebar no Mobile',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--spacing-4)' },
      },
    },
    '--sinc-sidebar-margin': {
      control: 'text',
      description:
        'Espaçamento/margem externa ao redor do contêiner da sidebar (herda o painel global se não especificado)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-margin)' },
      },
    },
    '--sinc-sidebar-border-radius': {
      control: 'text',
      description:
        'Arredondamento das bordas do contêiner da sidebar (herda o painel global se não especificado)',
      table: {
        category: 'Variáveis CSS',
        defaultValue: { summary: 'var(--sinc-layout-panel-border-radius)' },
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

const StoryWrapper = ({
  children,
  title,
  desc,
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'var(--color-bg-canvas, #f4f4f5)',
      overflow: 'hidden',
    }}
  >
    {children}
    <main
      style={{
        flex: 1,
        padding: '4rem',
        overflowY: 'auto',
      }}
    >
      <h1 style={{ margin: '0 0 1rem 0' }}>{title}</h1>
      <p style={{ margin: 0, color: 'var(--color-gray-600)' }}>{desc}</p>
    </main>
  </div>
);

/* Stories */

export const Padrão: Story = {
  args: {
    defaultCollapsed: false,
    children: <SidebarContentMock />,
  },
  render: (args) => (
    <StoryWrapper
      title="Sidebar expandida (padrão)"
      desc="Interaja com o botão de toggle para colapsar/expandir a barra lateral. Note como ela empurra o conteúdo principal de forma independente."
    >
      <Sidebar {...args} />
    </StoryWrapper>
  ),
};

export const Recolhida: Story = {
  args: {
    defaultCollapsed: true,
    children: <SidebarContentMock />,
  },
  render: (args) => (
    <StoryWrapper
      title="Sidebar iniciada recolhida"
      desc="Iniciada em modo compacto utilizando a propriedade defaultCollapsed={true}."
    >
      <Sidebar {...args} />
    </StoryWrapper>
  ),
};

export const PainelFlutuante: Story = {
  args: {
    defaultCollapsed: false,
    children: <SidebarContentMock />,
    style: {
      '--sinc-sidebar-margin': '1.6rem',
      '--sinc-sidebar-border-radius': 'var(--radii-md)',
    },
  },
  render: (args) => (
    <StoryWrapper
      title="Sidebar flutuante"
      desc="Demonstração da Sidebar isolada em painel flutuante com margens e bordas arredondadas personalizadas via variáveis CSS."
    >
      <Sidebar {...args} />
    </StoryWrapper>
  ),
};
