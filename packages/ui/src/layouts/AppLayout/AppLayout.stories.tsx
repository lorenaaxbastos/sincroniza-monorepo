import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from './AppLayout';

type AppLayoutStoryProps = React.ComponentProps<typeof AppLayout> &
  Record<string, unknown>;

const meta: Meta<AppLayoutStoryProps> = {
  title: 'Layouts/AppLayout',
  component: AppLayout,
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
    sidebar: { table: { category: 'Propriedades (Props)' } },
    header: { table: { category: 'Propriedades (Props)' } },
    footer: { table: { category: 'Propriedades (Props)' } },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-app-layout-bg': {
      control: 'text',
      description: 'Cor de fundo da casca da aplicação',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--color-bg-canvas)' },
      },
    },
    '--sinc-app-layout-main-padding': {
      control: 'text',
      description: 'Padding interno do container principal (desktop)',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-6)' },
      },
    },
    '--sinc-app-layout-main-padding-mobile': {
      control: 'text',
      description: 'Padding interno do container principal (mobile)',
      table: {
        category: 'CSS Custom Properties',
        defaultValue: { summary: 'var(--spacing-4)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarMock = () => (
  <div
    style={{
      width: '24rem',
      height: '100%',
      backgroundColor: 'var(--color-gray-100)',
      borderRight: 'var(--spacing-px) solid var(--color-gray-300)',
      padding: 'var(--spacing-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-3)',
    }}
  >
    <strong style={{ color: 'var(--color-text-title)' }}>Logo</strong>
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-2)',
      }}
    >
      <a href="#link1">Dashboard</a>
      <a href="#link2">Projetos</a>
      <a href="#link3">Configurações</a>
    </nav>
  </div>
);

const HeaderMock = () => (
  <div
    style={{
      height: '6.4rem',
      backgroundColor: 'var(--color-gray-100)',
      borderBottom: 'var(--spacing-px) solid var(--color-gray-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--spacing-4)',
    }}
  >
    <strong>header</strong>
    <button data-theme-toggle>Alternar tema</button>
  </div>
);

const FooterMock = () => (
  <div
    style={{
      padding: 'var(--spacing-3) var(--spacing-4)',
      backgroundColor: 'var(--color-gray-100)',
      borderTop: 'var(--spacing-px) solid var(--color-gray-300)',
      textAlign: 'center',
      fontSize: 'var(--font-size-xs)',
    }}
  >
    © 2026 Sincroniza Educação - Todos os direitos reservados.
  </div>
);

export const Padrão: Story = {
  args: {
    sidebar: <SidebarMock />,
    header: <HeaderMock />,
    footer: <FooterMock />,
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        <h1 style={{ margin: 0 }}>Painel principal</h1>
        <p style={{ margin: 0 }}>
          Este é o conteúdo dentro da área <code>main[data-scrollable]</code>.
        </p>
        <div
          style={{
            height: '120rem',
            background: 'var(--color-gray-300)',
            borderRadius: 'var(--radii-md)',
            padding: 'var(--spacing-4)',
          }}
        >
          Conteúdo longo para testar o scroll interno do container principal sem
          rolar a sidebar, a header ou o footer.
        </div>
      </div>
    ),
  },
};

export const SemSidebar: Story = {
  args: {
    header: <HeaderMock />,
    footer: <FooterMock />,
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
          padding: '2rem 0',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Layout sem a Sidebar</h1>
        <p style={{ margin: 0 }}>
          Utilizado em fluxos guiados, configurações ou áreas de edição em tela
          cheia.
        </p>
      </div>
    ),
  },
};
